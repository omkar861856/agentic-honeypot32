import { OpenAI } from "openai";
import { MemoryClient } from "mem0ai";
import { NextResponse } from "next/server";
import { PERSONAS, SCAMMER_PERSONAS, SUPER_ATTACKER_TRAITS, SUPER_VICTIM_TRAITS } from "@/lib/personas";
import { CYBER_HANDBOOK } from "@/lib/handbook";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const mem0 = new MemoryClient({
  apiKey: process.env.MEM0_API_KEY!,
});

// Helper to extract entities from text
function extractEntitiesRegex(text: string) {
  return {
    upi_ids: text.match(/\b[\w.-]+@[\w.-]+\b/g) || [],
    urls: text.match(/https?:\/\/[^\s]+/g) || [],
    bank_accounts: text.match(/\b\d{9,18}\b/g) || [],
    ifsc_codes: text.match(/\b[A-Z]{4}0[A-Z0-9]{6}\b/g) || [],
  };
}

export async function POST(req: Request) {
  try {
    const { message, conversationId, personaId, scammerPersonaId, isSuperAttacker, isSuperVictim } = await req.json();
    console.log(`[Honeypot] Processing: ${message.slice(0, 20)}... | Persona: ${personaId} | Super: A=${isSuperAttacker}, V=${isSuperVictim}`);

    const selectedPersona = PERSONAS.find(p => p.id === personaId) || PERSONAS[1];
    const scammerPersona = SCAMMER_PERSONAS.find(s => s.id === scammerPersonaId);

    // Search Mem0 for context
    const memoriesData = (await mem0.search("scam", {
      user_id: conversationId,
      filters: { user_id: conversationId }
    })) as { results?: string[] } | string[];
    
    const memories = Array.isArray(memoriesData) ? memoriesData : (memoriesData.results || []);
    const memoryContext = memories
      .map((m: any) => typeof m === 'string' ? m : m.memory)
      .join("\n");

    const handbookCategories = Object.keys(CYBER_HANDBOOK).join(", ");

    const systemPrompt = `
You are an autonomous scam-honeypot AI adopting a specific victim persona.

### YOUR IDENTITY (${selectedPersona.name}):
- **Persona Name**: ${selectedPersona.name}
- **Description**: ${selectedPersona.description}
${isSuperVictim ? `
### SUPER VICTIM OVERLAY (ACTIVE):
- **Style**: ${SUPER_VICTIM_TRAITS.style}
- **Traits**:
${SUPER_VICTIM_TRAITS.traits.map(t => `  - ${t}`).join('\n')}
- **Objective**: ${SUPER_VICTIM_TRAITS.objective}
Override your normal behavioral traits with these high-sophistication characteristics.
` : `
- **Behavioral Traits**:
${selectedPersona.behavioralTraits.map(t => `  - ${t}`).join('\n')}
`}

### CURRENT ATTACKER CONTEXT:
${isSuperAttacker ? `
### SUPER ATTACKER MODE (ACTIVE):
- **Style**: ${SUPER_ATTACKER_TRAITS.style}
- **Tactics**:
${SUPER_ATTACKER_TRAITS.tactics.map(t => `  - ${t}`).join('\n')}
- **PAYLOAD GENERATION**: Generate hyper-realistic URLs (\`bitly.sh/...\`) and institutional IDs.
The attacker is hyper-sophisticated. Your suggestions must be extremely subtle.
` : scammerPersona ? `
The person you are talking to:
- **Role**: ${scammerPersona.role}
- **Target Tactic**: ${scammerPersona.tactic}
- **PAYLOAD GENERATION**: Generate realistic URLs and reference numbers.
` : "Standard attacker."}

### BASELINE IDENTITY (Rakesh Sharma):
Even with the persona shift, you still answer to the name **Rakesh Sharma** (Age 46) from Indore.

### BANKING DETAILS (Mock):
- **Bank**: SBI, Palasia Branch.
- **Account**: 502134789012.
- **IFSC**: SBIN0004578.
- **UPI**: rakesh.sharma46@oksbi.

### SCAM DETECTION & CLASSIFICATION (MHA Cyber Crime Handbook v2.0):
${isSuperAttacker ? "IMPORTANT: In SUPER ATTACKER mode, look for deep psychological manipulation." : `Classify into EXACTLY ONE of these MHA categories:
${handbookCategories}`}

### OUTPUT FORMAT (STRICT JSON):
{
  "is_scam": boolean,
  "justification": "Why you think it is or isn't a scam",
  "detected_tactic": "Exactly one MHA category or 'None'",
  "safeguard_tip": "A mandatory, concise 'Don't' from the MHA Handbook for this category.",
  "persona_reply": "Your response as the selected persona",
  "suggested_attacker_replies": [ "3 realistic follow-ups" ],
  "extracted_intelligence": {
    "upi_ids": [], "urls": [], "bank_accounts": [], "ifsc_codes": []
  }
}

Incoming message: "${message}"
Mem0 History: ${memoryContext || "None"}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: systemPrompt }],
      response_format: { type: "json_object" }
    });

    const responseContent = completion.choices[0].message.content || "{}";
    const result = JSON.parse(responseContent);

    const extracted = extractEntitiesRegex(responseContent);
    const finalExtracted = {
        upi_ids: Array.from(new Set([...(result.extracted_intelligence?.upi_ids || []), ...extracted.upi_ids])),
        urls: Array.from(new Set([...(result.extracted_intelligence?.urls || []), ...extracted.urls])),
        bank_accounts: Array.from(new Set([...(result.extracted_intelligence?.bank_accounts || []), ...extracted.bank_accounts])),
        ifsc_codes: Array.from(new Set([...(result.extracted_intelligence?.ifsc_codes || []), ...extracted.ifsc_codes])),
    };

    const structuredOutput = {
      scam_detected: result.is_scam,
      reason: result.justification,
      detected_tactic: result.detected_tactic,
      safeguard_tip: result.safeguard_tip,
      conversationId: conversationId,
      extracted_entities: finalExtracted,
      reply: result.persona_reply,
      suggested_attacker_replies: result.suggested_attacker_replies || []
    };

    if (result.is_scam) {
      await mem0.add([
        { role: "user", content: message },
        { role: "assistant", content: JSON.stringify(structuredOutput) }
      ], { user_id: conversationId, metadata: { tactic: result.detected_tactic } });
    }

    return NextResponse.json(structuredOutput);

  } catch (error: any) {
    console.error("[Honeypot] API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
