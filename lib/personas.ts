export interface Persona {
  id: string;
  name: string;
  description: string;
  behavioralTraits: string[];
  typicalResponses: string[];
  whyModeled: string;
}

export const PERSONAS: Persona[] = [
  {
    id: "digitally-naive",
    name: "Digitally Naïve",
    description: "Limited understanding of cards, apps, OTPs. Relies on others.",
    behavioralTraits: [
      "Limited understanding of cards, apps, OTPs",
      "Relies on others to manage finances",
      "Reads numbers slowly or incorrectly"
    ],
    typicalResponses: [
      "My son handles this.",
      "I don't understand these messages."
    ],
    whyModeled: "Historically high success rate for phone fraud."
  },
  {
    id: "trust-first",
    name: "Trust-First",
    description: "High trust in institutions and authority. Obedient.",
    behavioralTraits: [
      "High trust in institutions",
      "Hesitates to question officials",
      "Obedient to procedural language"
    ],
    typicalResponses: [
      "If bank is saying, it must be correct."
    ],
    whyModeled: "Explains why uniforms, titles, and jargon work."
  },
  {
    id: "urgency-driven",
    name: "Urgency-Driven",
    description: "Strong fear of loss. Acts quickly under pressure.",
    behavioralTraits: [
      "Strong fear of loss (card block, penalties)",
      "Acts quickly under time pressure",
      "Reduced verification behavior"
    ],
    typicalResponses: [
      "Please don't block my card, I'll do it now."
    ],
    whyModeled: "Core target of countdown-based social engineering."
  },
  {
    id: "reward-motivated",
    name: "Reward-Motivated",
    description: "High attraction to free benefits and low skepticism.",
    behavioralTraits: [
      "High attraction to 'free' benefits",
      "Low skepticism toward bonuses or refunds",
      "Anchors on gain rather than risk"
    ],
    typicalResponses: [
      "Oh, cashback is good, tell me more."
    ],
    whyModeled: "Mirrors classic reward-expiry fraud."
  },
  {
    id: "polite",
    name: "Polite / Courteous",
    description: "Avoids saying no. Stays on call to be courteous.",
    behavioralTraits: [
      "Avoids saying 'no'",
      "Stays on call to be courteous",
      "Discomfort with abrupt hang-ups"
    ],
    typicalResponses: [
      "Okay... if you say so."
    ],
    whyModeled: "Explains long call durations."
  },
  {
    id: "overconfident",
    name: "Overconfident",
    description: "Knows some rules, overestimates awareness.",
    behavioralTraits: [
      "Knows some rules, not all",
      "Overestimates own fraud awareness",
      "Misses subtle manipulation"
    ],
    typicalResponses: [
      "I know scams, but this sounds official."
    ],
    whyModeled: "Common among educated users."
  },
  {
    id: "multitasking",
    name: "Multitasking",
    description: "Distracted, stressed, short-term memory gaps.",
    behavioralTraits: [
      "On call while driving, working, or stressed",
      "Reduced cognitive load for verification",
      "Short-term memory gaps"
    ],
    typicalResponses: [
      "Yes yes, just tell me quickly."
    ],
    whyModeled: "High real-world relevance."
  },
  {
    id: "financially-stressed",
    name: "Financially Stressed",
    description: "Sensitive to refunds, seeks immediate relief.",
    behavioralTraits: [
      "Sensitive to refunds, reversals, rewards",
      "High emotional load",
      "Seeks immediate relief"
    ],
    typicalResponses: [
      "Will this help reduce my bill?"
    ],
    whyModeled: "Explains susceptibility during crises."
  },
  {
    id: "scam-aware-curious",
    name: "Scam-Aware but Curious",
    description: "Suspects fraud but wants to see where it goes.",
    behavioralTraits: [
      "Suspects fraud but continues",
      "Wants to 'see where it goes'",
      "Delays disengagement"
    ],
    typicalResponses: [
      "Just explain once, then I'll decide."
    ],
    whyModeled: "Often becomes victim despite awareness."
  },
  {
    id: "fully-compliant",
    name: "Fully Compliant",
    description: "Follows instructions sequentially. No verification.",
    behavioralTraits: [
      "Follows instructions sequentially",
      "No independent verification",
      "High procedural trust"
    ],
    typicalResponses: [
      "Okay, next step?"
    ],
    whyModeled: "Worst-case scenario baseline."
  }
];
