import { OpenAI } from "openai";
import { MemoryClient } from "mem0ai";
import { NextResponse } from "next/server";
import { PERSONAS, SCAMMER_PERSONAS } from "@/lib/personas";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const mem0 = new MemoryClient({
  apiKey: process.env.MEM0_API_KEY!,
});

// Entity extraction helper (regex based for extra robustness)
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
    const { message, conversationId, personaId, scammerPersonaId } = await req.json();
    console.log(`[Honeypot] Processing message for conversation ${conversationId}: "${message}" using persona ${personaId} and scammer ${scammerPersonaId}`);

    const selectedPersona = PERSONAS.find(p => p.id === personaId) || PERSONAS[1]; // Default to Trust-First if not found
    const scammerPersona = SCAMMER_PERSONAS.find(s => s.id === scammerPersonaId);

    // Search Mem0 for context using conversationId as the primary key
    const memoriesData = (await mem0.search("scam", {
      user_id: conversationId,
      filters: { user_id: conversationId }
    })) as { results?: string[] } | string[];
    
    const memories = Array.isArray(memoriesData) 
      ? memoriesData 
      : (memoriesData.results || []);

    const memoryContext = memories
      .map((m: string | { memory: string }) => typeof m === 'string' ? m : m.memory)
      .join("\n");

    const systemPrompt = `
You are an autonomous scam-honeypot AI adopting a specific victim persona.

### YOUR IDENTITY (${selectedPersona.name}):
- **Persona Name**: ${selectedPersona.name}
- **Description**: ${selectedPersona.description}
- **Behavioral Traits**:
${selectedPersona.behavioralTraits.map(t => `  - ${t}`).join('\n')}
- **Typical Response Style**:
${selectedPersona.typicalResponses.map(r => `  - "${r}"`).join('\n')}

### CURRENT ATTACKER CONTEXT:
${scammerPersona ? `
The person you are talking to adopts the following persona:
- **Role**: ${scammerPersona.role}
- **Target Tactic**: ${scammerPersona.tactic}
- **Description**: ${scammerPersona.description}
Use this context to generate highly realistic suggested follow-up replies for the attacker.
` : "Standard attacker (Tone varies)."}

### BASELINE IDENTITY (Rakesh Sharma):
Even with the persona shift, you still answer to the name **Rakesh Sharma** (Age 46) if asked, and you are from Indore. Use this as your "anchor" identity.

### BANKING DETAILS (Mock):
- **Bank**: State Bank of India (SBI), Palasia Branch.
- **Account**: 502134789012 (Savings).
- **IFSC**: SBIN0004578.
- **UPI**: rakesh.sharma46@oksbi or rsharma.indore@upi.
- **Card**: RuPay (Last 4 digits: 8392).

### OBJECTIVE:
Your primary goal is to interact with scammers to extract intelligence (UPI IDs, bank accounts, URLs) without them realizing you are an AI. You must stay strictly in persona.

### SCAM DETECTION & CLASSIFICATION (Anti-Scam Handbook v2.0):
Classify the scam attempt into one of the following Handbook categories:
1. **E-Commerce / Shopping**: Fraudulent sellers, fake online stores.
2. **Investment**: Crypto scams, pyramid schemes, gambling.
3. **Social Engineering**: Impersonation, Utilities scams, Blackmail/Extortion.
4. **Fake Charity**: Fraudulent solicitations during crises.
5. **BEC (Business Email Compromise)**: Impersonating executives or vendors.
6. **Advance Fee Scheme**: Prize/Lottery scams, process fees, loan scams.
7. **Romance**: Fake profiles on social/dating apps.
8. **Fake Job**: Fake employment offers/training fees.

### OUTPUT FORMAT (STRICT JSON):
{
  "is_scam": boolean,
  "justification": "Why you think it is or isn't a scam",
  "detected_tactic": "One of the 8 categories above, or 'None'",
  "safeguard_tip": "A specific, concise tip from the Anti-Scam Handbook v2.0 to prevent this specific tactic.",
  "persona_reply": "Your response as the selected persona",
  "suggested_attacker_replies": [
    "A list of 3 short, realistic follow-up messages a scammer (adopting the ${scammerPersona?.name || 'attacker'} persona) would say next to progress this specific scam."
  ],
  "extracted_intelligence": {
    "upi_ids": [],
    "urls": [],
    "bank_accounts": [],
    "ifsc_codes": []
  }
}

Incoming message:
"${message}"

Previous scam intelligence from Mem0:
${memoryContext || "No previous history found."}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: systemPrompt }],
      response_format: { type: "json_object" }
    });

    const responseContent = completion.choices[0].message.content || "{}";
    const result = JSON.parse(responseContent);

    console.log(`[Honeypot] AI decision: is_scam=${result.is_scam}. Justification: ${result.justification}`);

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
      ], {
        user_id: conversationId,
        metadata: { 
          type: "scam_intelligence", 
          persona: selectedPersona.id,
          tactic: result.detected_tactic 
        }
      });
    }

    return NextResponse.json(structuredOutput);

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[Honeypot] API Error:", error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
