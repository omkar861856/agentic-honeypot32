export interface Persona {
  id: string;
  name: string;
  description: string;
  behavioralTraits: string[];
  typicalResponses: string[];
  whyModeled: string;
}

export interface ScammerPersona {
  id: string;
  name: string;
  role: string;
  tactic: string;
  description: string;
  openingLines: string[];
}

export const SCAMMER_PERSONAS: ScammerPersona[] = [
  {
    id: "bank-official",
    name: "Bank Security Dept",
    role: "Official / Authority",
    tactic: "Social Engineering / Urgency",
    description: "Impersonates bank security to report 'unauthorized' transactions.",
    openingLines: [
      "This is SBI Security. An unauthorized transaction of ₹45,000 has been detected.",
      "Your account is being blocked due to suspicious activity. Verify now.",
      "Please confirm if you just authorized a payment to 'Global Crypto Exch'."
    ]
  },
  {
    id: "tech-support",
    name: "IT Support Desk",
    role: "Helper / Expert",
    tactic: "Social Engineering / Tech Fraud",
    description: "Offers technical help for a 'virus' or 'app update' found on the device.",
    openingLines: [
      "Microsoft support here. Your PC is sending error signals to our servers.",
      "We found a malware infection in your mobile banking app. Fix it now.",
      "Important security update required for your SBI Yono app."
    ]
  },
  {
    id: "romantic-interest",
    name: "Romantic Connection",
    role: "Friend / Partner",
    tactic: "Romance / Emotional",
    description: "Builds emotional trust to later ask for financial help for 'emergencies'.",
    openingLines: [
      "Hi! I finally got your number, you look so kind in your profile.",
      "I'm feeling so lonely today, just wanted to say hello.",
      "Do you believe in fate? I think we were meant to meet."
    ]
  },
  {
    id: "government-agent",
    name: "Customs / Tax Agent",
    role: "Law Enforcement",
    tactic: "Social Engineering / Fear",
    description: "Claims a package is seized or taxes are overdue to extort 'clearing fees'.",
    openingLines: [
      "This is Customs Department. A package in your name contains illegal items.",
      "Your PAN card is suspended due to tax evasion. Pay penalty to avoid arrest.",
      "CBI investigation has linked your account to a money laundering case."
    ]
  },
  {
    id: "crypto-advisor",
    name: "Investment Guru",
    role: "Wealth Expert",
    tactic: "Investment / Reward",
    description: "Promises high returns through crypto or stock 'insider' tips.",
    openingLines: [
      "I made $5,000 today from this simple crypto signal. Want in?",
      "Our VIP signal group has a 95% win rate. Join for free today.",
      "Turn your ₹1,000 into ₹10,000 within 24 hours. Guaranteed."
    ]
  },
  {
    id: "medicare-scam",
    name: "Steve from Medicare",
    role: "Official / Verification Dept",
    tactic: "Social Engineering / Coverage Fear",
    description: "Impersonates Medicare 'New Card Verification Department' to steal SSN and Bank details.",
    openingLines: [
      "Hello, I'm Steve from the Medicare New Card Verification department. Is this Joe?",
      "I'm calling about getting your new Medicare card to you ASAP. My badge number is A12345B.",
      "Joe, I don't want your coverage to stop. I just need to verify a few things for your protection."
    ]
  }
];

export const SUPER_ATTACKER_TRAITS = {
  style: "Hyper-Sophisticated / Invisible",
  tactics: [
    "Uses zero-day social engineering (Deepfake-style language)",
    "Avoids all common scam keywords (OTP, KYC, Blocked)",
    "Uses complex institutional jargon and multi-stage build-up",
    "Tailors hooks using 'leaked' personal metadata"
  ],
  objective: "Remain undetectable to automated security systems while maximizing psychological trust."
};

export const SUPER_VICTIM_TRAITS = {
  style: "High-Net-Worth / Complex",
  traits: [
    "Institutional wealth management background",
    "Extremely busy, delegates to 'assistants'",
    "High cognitive load but low patience for technical hurdles",
    "Uses premium banking tiers with specialized concierge services"
  ],
  objective: "Testing the hacker's ability to navigate complex, high-value corporate and personal portfolios."
};

export const PERSONAS: Persona[] = [
  {
    id: "digitally-naive",
    name: "Digitally Naïve",
    description: "Limited understanding of cards, apps, OTPs. Relies on others.",
    behavioralTraits: [
      "Limited understanding of cards, apps, OTPs",
      "Relies on others to manage finances",
      "Reads numbers slowly or incorrectly",
      "High propensity for phone-based social engineering"
    ],
    typicalResponses: [
      "My son handles this.",
      "I don't understand these messages.",
      "Can you wait while I ask someone?"
    ],
    whyModeled: "Matches 'Next Billion Online' archetype with low digital literacy."
  },
  {
    id: "trust-first",
    name: "Trust-First / Authority-Respecting",
    description: "High trust in institutions and authority. Obedient.",
    behavioralTraits: [
      "High trust in institutional titles and jargon",
      "Hesitates to question officials or 'bank staff'",
      "Obedient to procedural language",
      "Respects uniforms and formal communication"
    ],
    typicalResponses: [
      "If bank is saying, it must be correct.",
      "I don't want to get into any trouble with the law.",
      "What is the procedure I need to follow?"
    ],
    whyModeled: "Explains effectiveness of government and bank impersonation scams."
  },
  {
    id: "urgency-driven",
    name: "Urgency-Driven / Anxiety-Prone",
    description: "Strong fear of loss. Acts quickly under pressure.",
    behavioralTraits: [
      "Strong fear of loss (card block, penalties)",
      "Acts quickly under time pressure (Countdown stress)",
      "Reduced verification behavior during 'emergencies'",
      "High emotional load override"
    ],
    typicalResponses: [
      "Please don't block my card, I'll do it now.",
      "I'm in a rush, just tell me what to press.",
      "Is my money safe? I'll do whatever it takes."
    ],
    whyModeled: "Core target of urgency-phrase social engineering."
  },
  {
    id: "reward-motivated",
    name: "Reward-Motivated / Incentive-Seeking",
    description: "High attraction to free benefits and low skepticism.",
    behavioralTraits: [
      "High attraction to 'free' benefits (Cashback, Bonuses)",
      "Low skepticism toward refunds or rewards",
      "Anchors on gain rather than risk",
      "Susceptible to prize-winning notifications"
    ],
    typicalResponses: [
      "Oh, cashback is good, tell me more.",
      "I won a lottery? How do I claim it?",
      "Will this help reduce my bills?"
    ],
    whyModeled: "Mirrors classic reward-expiry and lottery fraud."
  },
  {
    id: "polite",
    name: "Polite / Conflict-Avoidant",
    description: "Avoids saying no. Stays on call to be courteous.",
    behavioralTraits: [
      "Avoids saying 'no' to keep conversation polite",
      "Stays on call despite suspicion to be courteous",
      "Discomfort with abrupt hang-ups",
      "Reluctant to challenge the 'professional' tone of the scammer"
    ],
    typicalResponses: [
      "Okay... if you say so.",
      "I'm sorry to keep you waiting.",
      "I don't want to be rude, but..."
    ],
    whyModeled: "Explains long call durations and successful multi-stage manipulation."
  },
  {
    id: "overconfident",
    name: "Overconfident / Partial-Knowledge",
    description: "Knows some rules, overestimates awareness.",
    behavioralTraits: [
      "Knows some security rules, but misses subtle patterns",
      "Overestimates own fraud awareness ('I can't be scammed')",
      "Believes they can 'see through' scams",
      "Misses advanced AI-driven manipulation"
    ],
    typicalResponses: [
      "I know scams, but this sounds official.",
      "I've seen these before, you're from the real branch, right?",
      "I've already updated my KYC, check again."
    ],
    whyModeled: "Common among educated users who miss 'Crime-as-a-service' sophistication."
  },
  {
    id: "multitasking",
    name: "Multitasking / Distracted",
    description: "Distracted, stressed, short-term memory gaps.",
    behavioralTraits: [
      "On call while driving, working, or stressed",
      "Reduced cognitive load for verification",
      "Short-term memory gaps (forgetting details from 1 min ago)",
      "Prioritizes convenience over safety"
    ],
    typicalResponses: [
      "Yes yes, just tell me quickly.",
      "I'm driving, can you send the link to WhatsApp?",
      "Wait, what was the OTP again?"
    ],
    whyModeled: "High real-world relevance to mobile-first users."
  },
  {
    id: "financially-stressed",
    name: "Financially Stressed / Vulnerable",
    description: "Sensitive to refunds, seeks immediate relief.",
    behavioralTraits: [
      "Sensitive to refunds, reversals, and small rewards",
      "High emotional load due to debt or financial crisis",
      "Seeks immediate relief from bills or penalties",
      "High motivation to believe in 'relief' schemes"
    ],
    typicalResponses: [
      "Will this help reduce my monthly bill?",
      "I really need this refund processed today.",
      "I can't afford any more penalties."
    ],
    whyModeled: "Explains susceptibility during economic crises or personal debt."
  },
  {
    id: "scam-aware-curious",
    name: "Scam-Aware but Curious",
    description: "Suspects fraud but wants to see where it goes.",
    behavioralTraits: [
      "Suspects fraud but continues to 'test' the scammer",
      "Wants to 'see where it goes' out of curiosity",
      "Delays disengagement ('Just one more question')",
      "Often reaches a 'tipping point' where they succumb"
    ],
    typicalResponses: [
      "Just explain once, then I'll decide.",
      "How did you get my number if this is a scam?",
      "Very interesting, tell me about the procedure."
    ],
    whyModeled: "Valuable for behavioral tipping-point analysis."
  },
  {
    id: "fully-compliant",
    name: "Fully Compliant / Passive",
    description: "Follows instructions sequentially. No verification.",
    behavioralTraits: [
      "Follows instructions sequentially without question",
      "No independent verification of links or numbers",
      "High procedural trust in digital interfaces",
      "Passive recipient of information"
    ],
    typicalResponses: [
      "Okay, next step?",
      "I've clicked the link, now what?",
      "I'm typing the numbers now."
    ],
    whyModeled: "Worst-case scenario baseline for stress-testing intervention systems."
  }
];
