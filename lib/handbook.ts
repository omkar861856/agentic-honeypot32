export interface ScamHandbookEntry {
  category: string;
  description: string;
  dos: string[];
  donts: string[];
}

export const CYBER_HANDBOOK: Record<string, ScamHandbookEntry> = {
  "KYC Scam": {
    category: "KYC Scam",
    description: "Fraudsters exploit identity verification processes to steal personal information or access financial accounts illegally.",
    dos: [
      "Contact your bank directly to confirm KYC update requests.",
      "Use official contact details from official websites.",
      "Inform bank immediately if you suspect fraud.",
      "Enquire with bank about available KYC update methods."
    ],
    donts: [
      "Never share PINs, passwords, or OTPs with anyone.",
      "Do not share KYC documents with unidentified individuals.",
      "Do not click on suspicious links in SMS or email."
    ]
  },
  "Online Job Scam": {
    category: "Online Job Scam",
    description: "Fake jobs offering high pay and easy work to steal money or personal information.",
    dos: [
      "Use trusted sources like newspapers or government portals.",
      "Verify company credentials for international offers.",
      "Ask detailed questions during online interviews.",
      "Verify email addresses for mimicry (e.g., .net vs .com)."
    ],
    donts: [
      "Do not pay upfront consulting fees.",
      "Do not trust sponsored search results blindly.",
      "Never apply without verifying advertisement authenticity."
    ]
  },
  "Online Shopping Fraud": {
    category: "Online Shopping Fraud",
    description: "Fake websites or deals used to steal personal and financial information.",
    dos: [
      "Compare prices on different websites.",
      "Opt for Cash-on-Delivery if suspicious.",
      "Prefer Verified/Trusted sellers.",
      "Be cautious of 'too good to be true' offers."
    ],
    donts: [
      "Never enter PIN/OTP to receive money.",
      "Avoid public networks for transactions.",
      "Do not save card details on unreliable sites.",
      "Do not scan QR codes to 'receive' money."
    ]
  },
  "Digital Arrest": {
    category: "Digital Arrest",
    description: "Scammers impersonate government officials to restrict/detain victims via video call to extort money.",
    dos: [
      "Know that police/officials never interrogate via video calls.",
      "Report suspect calls on cybercrime.gov.in.",
      "Stay calm and understand there is no such thing as Digital Arrest in India."
    ],
    donts: [
      "Do not share personal info or send money on video calls.",
      "Do not engage for long in suspicious video calls.",
      "Do not trust unverified calls claiming to be authorities."
    ]
  },
  "Investment Scam": {
    category: "Investment Scam",
    description: "Fraudulent schemes (Ponzi) promising high returns with no risk.",
    dos: [
      "Deal only with SEBI-registered intermediaries.",
      "Invest through regulated financial entities.",
      "Follow trusted information sources."
    ],
    donts: [
      "Do not trust unbelievable returns.",
      "Stay away from social media groups promoting trading apps.",
      "Do not ignore red flags like consistent high returns."
    ]
  },
  "Online Gaming": {
    category: "Online Gaming",
    description: "Attackers exploit platforms for virtual theft, financial fraud, and identity theft.",
    dos: [
      "Supervise gaming access for children.",
      "Be cautious with real money gaming apps.",
      "Check app permissions (Contacts, Storage, Location)."
    ],
    donts: [
      "Do not download apps from unreliable sources.",
      "Do not share confidential info with fellow players.",
      "Avoid oversharing achievements on social media."
    ]
  },
  "Lottery Fraud": {
    category: "Lottery Fraud",
    description: "Deceiving people into believing they've won a prize to trick them into sending money.",
    dos: [
      "Question unsolicited claims of winning.",
      "Report fraud to authorities.",
      "Stay skeptical: no one gives huge money for free."
    ],
    donts: [
      "Never pay taxes/fees to claim a prize.",
      "Do not share credentials for lottery claims.",
      "Ignore offers promising govt aid or prizes."
    ]
  },
  "Phishing": {
    category: "Phishing",
    description: "Fake links designed to steal data or install malware.",
    dos: [
      "Check URLs by hovering to reveal destination.",
      "Verify senders through trusted methods.",
      "Keep software and systems up-to-date."
    ],
    donts: [
      "Do not click on suspicious links; delete the message.",
      "Unsubscribe from emails with suspicious links.",
      "Always go directly to official websites."
    ]
  },
  "Spam/Vishing Calls": {
    category: "Spam/Vishing Calls",
    description: "Voice phishing using social engineering to trick victims.",
    dos: [
      "Use call-blocking apps.",
      "Exercise caution with unknown numbers.",
      "Use voicemail passwords."
    ],
    donts: [
      "Never share info with unknown callers.",
      "Do not trust Caller ID (can be spoofed).",
      "Avoid returning calls to unfamiliar international numbers."
    ]
  },
  "Quishing": {
    category: "Quishing",
    description: "Malicious QR codes redirecting to phishing sites or initiating unauthorized transfers.",
    dos: [
      "Only scan QR codes from official/verified sources.",
      "Take time to verify QR-led requests.",
      "Report suspicious codes."
    ],
    donts: [
      "Never scan QR codes to receive money.",
      "Avoid scanning codes for payments without verifying.",
      "Do not scan codes from unknown texts/emails."
    ]
  },
  "Search Engine Fraud": {
    category: "Search Engine Fraud",
    description: "Manipulating search results to display fake contact info for legitimate entities.",
    dos: [
      "Always check official websites for contact details.",
      "Double-check numbers using trusted directories.",
      "Watch for red flags like urgency or scare tactics."
    ],
    donts: [
      "Never call numbers listed in search results blindly.",
      "Only share details if you initiated the contact."
    ]
  },
  "Social Media Impersonation": {
    category: "Social Media Impersonation",
    description: "Fake accounts mimicking real people/orgs to deceive others.",
    dos: [
      "Verify accounts (blue checks, consistent usernames).",
      "Report impersonation to the platform.",
      "Confirm fund requests from friends via a call."
    ],
    donts: [
      "Avoid paying unknown individuals online.",
      "Never share confidential details on social media."
    ]
  },
  "SMS, Email & Call Scams": {
    category: "SMS, Email & Call Scams",
    description: "Impersonating trusted NBFCs/Lenders with fake offers.",
    dos: [
      "Cross-check sender details with official sources.",
      "Forward fake messages to reporting channels.",
      "Report suspicious loan offers."
    ],
    donts: [
      "Never trust unsolicited loan offers.",
      "Do not pay upfront fees for loan processing.",
      "Do not open attachments from unknown sources."
    ]
  },
  "Debit/Credit Card Fraud": {
    category: "Debit/Credit Card Fraud",
    description: "Unauthorized transactions using stolen card details or phishing.",
    dos: [
      "Deactivate unused features (NFC, International).",
      "Keep card in sight and shield PIN.",
      "Check POS machine for skimming devices."
    ],
    donts: [
      "Never share card info or PIN.",
      "Do not store/save PIN in accessible places.",
      "Avoid card use on unsecured public Wi-Fi."
    ]
  },
  "Mobile App APK Scam": {
    category: "Mobile App APK Scam",
    description: "Fake banking apps distributed via links to steal credentials.",
    dos: [
      "Download apps only from official stores.",
      "Enable Two-Factor Authentication (2FA).",
      "Regularly monitor bank statements."
    ],
    donts: [
      "Do not download from unofficial links.",
      "Do not jailbreak/root your device.",
      "Never share PIN/OTP with 'support' staff."
    ]
  },
  "Cyber Slavery": {
    category: "Cyber Slavery",
    description: "Exploitation through digital platforms, coerced/forced labor.",
    dos: [
      "Apply through government-approved agencies only.",
      "Verify job legitimacy before accepting.",
      "Report exploitation on cybercrime.gov.in."
    ],
    donts: [
      "Do not trust 'easy money/high pay' online offers.",
      "Never use a tourist visa for work in foreign countries.",
      "Avoid ads from unknown groups on social media."
    ]
  },
  "Sim Swapping": {
    category: "Sim Swapping",
    description: "Transferring phone number to fraudster's SIM to access 2FA codes.",
    dos: [
      "Contact provider if you lose network access unexpectedly.",
      "Use unique, strong PINs for your SIM.",
      "Enable multi-factor security."
    ],
    donts: [
      "Never share OTPs or identity details via calls.",
      "Do not ignore extended loss of network."
    ]
  },
  "Money Mules": {
    category: "Money Mules",
    description: "Using individuals to receive/transfer stolen money for commission.",
    dos: [
      "Research legitimacy of jobs involving money transfers.",
      "Report suspect schemes to authorities.",
      "Understand that laundering stolen funds is a crime."
    ],
    donts: [
      "Never let others use your account for transfers.",
      "Reject offers to handle unauthorized money for a fee."
    ]
  },
  "Juice Jacking": {
    category: "Juice Jacking",
    description: "Compromised public USB charging stations used to install malware.",
    dos: [
      "Carry your own charger and cable.",
      "Choose AC outlets over USB ports.",
      "Be cautious of 'trust this device' prompts."
    ],
    donts: [
      "Do not use unknown public USB ports."
    ]
  },
  "Deepfake Cybercrime": {
    category: "Deepfake Cybercrime",
    description: "Advanced AI used to create fake media for manipulation or false info.",
    dos: [
      "Check authenticity of media before sharing.",
      "Rely on reputable platforms for news.",
      "Report potential deepfakes to platforms."
    ],
    donts: [
      "Do not trust content that seems exaggerated.",
      "Limit personal info sharing to avoid being a target."
    ]
  },
  "Remote Access Fraud": {
    category: "Remote Access Fraud",
    description: "Trick victims into granting screen-sharing access to steal data.",
    dos: [
      "Confirm caller identity independently.",
      "Only install screen-sharing apps if required.",
      "Uninstall app immediately after use."
    ],
    donts: [
      "Never grant remote access to unknown people.",
      "Log out of payment apps before sharing screen.",
      "Avoid entering credentials during screen access."
    ]
  },
  "Secure Browsing": {
    category: "Secure Browsing",
    description: "Protecting against online threats while surfing.",
    dos: [
      "Use updated browsers and HTTPS sites.",
      "Install trusted antivirus and enable firewalls.",
      "Verify URLs before entering info."
    ],
    donts: [
      "Avoid public Wi-Fi without protection.",
      "Do not save passwords on public devices.",
      "Skip websites with browser warnings."
    ]
  },
  "Ransomware": {
    category: "Ransomware",
    description: "Malware that locks files and demands ransom for decryption.",
    dos: [
      "Regularly back up data.",
      "Isolate affected systems immediately.",
      "Keep software up to date."
    ],
    donts: [
      "Do not pay the ransom.",
      "Do not run backups during an attack."
    ]
  },
  "Smartphone Scams": {
    category: "Smartphone Scams",
    description: "Fake calls, malicious apps, and SIM fraud targeting mobile users.",
    dos: [
      "Report lost/stolen phones immediately.",
      "Regularly check SIM registrations in your name.",
      "Enable 'Silence Unknown Callers' on WhatsApp."
    ],
    donts: [
      "Never attend or engage with spam calls.",
      "Do not exceed the allowed limit of SIMs (9)."
    ]
  },
  "Medicare Card Scam": {
    category: "Medicare Card Scam",
    description: "Scammers claim to be from Medicare's new card department to steal SSN, DOB, and bank details.",
    dos: [
      "Wait for your card to arrive in the mail (Medicare won't call you about it).",
      "Call 1-800-MEDICARE if you have questions about your card.",
      "Keep your Medicare card safe like a credit card."
    ],
    donts: [
      "Never give your SSN, bank info, or DOB to an unsolicited caller.",
      "Medicare will never call you to sell you anything or verify info for a 'new' card.",
      "Do not give out your 'badge number' if asked; it's a common scam tactic."
    ]
  }
};
