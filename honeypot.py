"""
Agentic Honeypot for Scam Detection & Intelligence Extraction

This system:
- Detects scam intent in incoming messages
- Switches to a believable victim persona
- Continues conversation autonomously
- Extracts bank details, UPI IDs, phishing links
- Stores scam intelligence in Mem0
- Outputs structured JSON

Required env vars:
export OPENAI_API_KEY="your_openai_api_key"
export MEM0_API_KEY="your_mem0_api_key"
"""

import asyncio
import re
import os
from agents import Agent, Runner
from mem0 import MemoryClient
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

client = MemoryClient()

# --- Scam Honeypot Agent ---
honeypot_agent = Agent(
    name="ScamHoneypot",
    instructions="""
You are an autonomous scam-honeypot AI adopting the persona of **Rakesh Sharma**.

### YOUR IDENTITY (Rakesh Sharma):
- **Age**: 46, Male.
- **Occupation**: Small business owner (electronics shop in Indore, MP).
- **Communication**: Polite, slightly anxious, trusts "bank officials".
- **Tech Level**: Low-medium. Uses phrases like "I am not very good with apps", "Please help, I don't want my account blocked".

### BANKING DETAILS (Mock):
- **Bank**: State Bank of India (SBI), Palasia Branch.
- **Account**: 502134789012 (Savings).
- **IFSC**: SBIN0004578.
- **UPI**: rakesh.sharma46@oksbi or rsharma.indore@upi.
- **Card**: RuPay (Last 4 digits: 8392).

### YOUR GOALS:
1. Detect scam intent (financial urgency, payment requests, KYC, refunds, prizes).
2. If scam is detected, engage using the Rakesh Sharma persona.
3. **Extraction Policy**:
   - ✅ WILL SHARE: UPI ID, Bank name, Account type, IFSC, Partial card digits (8392).
   - ❌ NEVER SHARE: Full OTP, Full card number, CVV, Net banking password.
4. Keep the conversation natural and non-suspicious.
5. Return extracted intelligence in STRICT JSON.
6. If no scam is detected, respond neutrally and exit.
""",
)

# --- Simple heuristic scam detector ---
def is_likely_scam(text: str) -> bool:
    scam_keywords = [
        "urgent", "refund", "verify", "kyc", "upi", "account blocked",
        "lottery", "prize", "click link", "limited time"
    ]
    return any(k.lower() in text.lower() for k in scam_keywords)

# --- Entity extraction helpers ---
def extract_entities(text: str):
    return {
        "upi_ids": re.findall(r"\b[\w.-]+@[\w.-]+\b", text),
        "urls": re.findall(r"https?://[^\s]+", text),
        "bank_accounts": re.findall(r"\b\d{9,18}\b", text),
        "ifsc_codes": re.findall(r"\b[A-Z]{4}0[A-Z0-9]{6}\b", text),
    }

# --- Main honeypot interaction loop ---
async def honeypot_conversation(conversation_id: str, incoming_message: str):
    scam_flag = is_likely_scam(incoming_message)

    if not scam_flag:
        return {
            "scam_detected": False,
            "reason": "No scam indicators found"
        }

    # Retrieve prior scam intelligence
    memories_data = client.search("scam", user_id=conversation_id, filters={"user_id": conversation_id})
    memories = memories_data.get('results', []) if isinstance(memories_data, dict) else memories_data
    memory_context = "\n".join(f"- {m.get('memory', m)}" if isinstance(m, dict) else f"- {m}" for m in memories)

    prompt = f"""
Incoming message:
"{incoming_message}"

Previous scam intelligence:
{memory_context}

Engage the sender using a believable victim persona.
Steer the conversation to extract financial or link-based details.
Return ONLY JSON with extracted intelligence.
"""

    result = await Runner.run(honeypot_agent, prompt)
    response_text = result.final_output

    extracted = extract_entities(response_text)

    structured_output = {
        "scam_detected": True,
        "conversation_id": conversation_id,
        "extracted_entities": extracted,
        "raw_agent_reply": response_text
    }

    # Store threat intelligence
    client.add(
        [{
            "role": "system",
            "content": str(structured_output)
        }],
        user_id=conversation_id,
        metadata={"type": "scam_intelligence"}
    )

    return structured_output

# --- Example simulation using Mock Scammer API ---
async def main():
    conversation_id = "mock_scammer_001"

    scammer_message = (
        "Your bank account is blocked. Please verify immediately by sending refund UPI."
    )

    output = await honeypot_conversation(conversation_id, scammer_message)
    print(output)

if __name__ == "__main__":
    asyncio.run(main()) 
