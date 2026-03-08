# Terms of Service

**Effective Date:** February 27, 2026
**Last Updated:** March 5, 2026

These Terms of Service ("Terms") govern your access to and use of ForgeOS, the AI-powered software governance platform operated by SyncTek LLC ("SyncTek," "we," "us," or "our"), available at synctek.io and forgeos.synctek.io. By creating an account or using ForgeOS, you ("User," "you," or "your") agree to be bound by these Terms. If you are accepting on behalf of an organization, you represent that you have authority to bind that organization.

Please read these Terms carefully. They contain important provisions including a binding arbitration clause and class action waiver in Section 17.

---

## 1. About ForgeOS

ForgeOS is an AI-powered code intelligence, trust scoring, and governance automation platform ("Service"). The Service leverages multiple large language model providers and autonomous software agents to analyze codebases, generate trust scores, produce governance artifacts, and automate software development lifecycle workflows.

ForgeOS is a **software tool**. It is not a law firm, accounting firm, security consultancy, or professional services provider of any kind. Nothing in the Service constitutes professional legal, financial, engineering, or security advice.

---

## 2. Eligibility

You must be at least 18 years of age and capable of entering a binding contract to use the Service. If you are using the Service on behalf of a company or other legal entity, you represent and warrant that you have the authority to bind that entity to these Terms.

The Service is not available to users previously terminated from the Service for cause or to users in jurisdictions where the Service is prohibited by applicable law.

---

## 3. Account Registration

To access paid features, you must register for an account. You agree to:

- Provide accurate, current, and complete registration information
- Maintain and promptly update your account information
- Keep your login credentials confidential and not share them with third parties
- Notify us immediately at info@synctek.io of any suspected unauthorized access to your account
- Accept responsibility for all activity that occurs under your account

SyncTek reserves the right to refuse registration or cancel accounts at our discretion.

---

## 4. Service Tiers and Subscriptions

### 4.1 Free Tier

The Free Tier provides access to local code analysis and trust scoring features at no charge. Free Tier features may be modified, limited, or discontinued at any time without notice.

### 4.2 Paid Subscription Plans

We offer the following paid subscription tiers for the ForgeOS governance platform:

| Plan | Price | Description |
|------|-------|-------------|
| Free | $0/month | 1,000 API requests/month - local analysis and trust scoring |
| Pro | $49/month | Individual developers - full platform access, 50,000 API calls/month |
| Team | $29/seat/month (3-seat minimum, $87/month base) | Collaborative governance workflows, 200,000 API calls/month |
| Enterprise | Custom pricing | Dedicated tenant, 4h SLA, security questionnaire support, DPA on request |

Pricing is subject to change with 30 days' notice as described in Section 14.

### 4.2a ForgeOS Trust Index (FTI) Access

The ForgeOS Trust Index (FTI) is bundled with all ForgeOS subscription plans. FTI scoring is available at the following levels depending on your ForgeOS plan:

| ForgeOS Plan | FTI Scoring | FTI Recommendations & Comparisons |
|-------------|-------------|-----------------------------------|
| Free | 5 scores/day | Not included |
| Pro | Unlimited | Included |
| Team | Unlimited | Included |
| Enterprise | Unlimited | Included |

FTI badge embeds are and will remain permanently free with no API key required.

**Standalone FTI API (Metered Access)**

For AI agents, CI/CD pipelines, and external integrations that require FTI access without a ForgeOS subscription, a standalone metered API is available:

| Endpoint | Price per call |
|----------|---------------|
| POST /v1/score - Basic trust score | $0.003 |
| POST /v1/recommend - Recommendations | $0.005 |
| POST /v1/compare - Comparative analysis | $0.008 |
| GET /v1/methodology - Dimension definitions | Free (public) |

Standalone API access requires API key authentication and usage-based billing via Stripe. Usage is billed monthly based on actual calls made. Volume discounts are available at 100,000+ scores per month - contact us for pricing.

### 4.3 Auto-Renewal

Subscriptions automatically renew at the end of each billing period (monthly or annual) unless cancelled before the renewal date. By subscribing, you authorize SyncTek to charge your payment method on a recurring basis.

### 4.4 Annual Plans

Annual subscriptions are billed upfront for the full year. Cancellation of an annual plan entitles you to a pro-rata refund for the unused portion of the subscription term, calculated on a daily basis from the effective date of cancellation.

### 4.5 Monthly Plans

Monthly subscriptions are billed at the start of each billing period. Monthly subscriptions are non-refundable once a billing period has commenced. Cancellation takes effect at the end of the current billing period, after which no further charges will be made.

### 4.6 Payment Processing

All payments are processed by Stripe, Inc. By providing payment information, you agree to Stripe's Terms of Service (available at stripe.com/legal). SyncTek does not store full payment card details on our systems. You authorize SyncTek to have Stripe charge your selected payment method for all applicable fees.

### 4.7 Taxes

Prices do not include applicable taxes. You are responsible for all taxes, levies, or duties imposed by taxing authorities, excluding taxes on SyncTek's net income.

### 4.8 Failed Payments

If a payment fails, we will attempt to notify you and may retry the charge. Failure to resolve a payment issue within 7 days may result in suspension or termination of your subscription.

---

## 5. AI-Generated Outputs - Intellectual Property and Licensing

### 5.1 Nature of AI-Generated Outputs

ForgeOS uses multiple AI providers, including Anthropic (Claude), OpenAI (GPT models), and Google (Gemini), to produce outputs including but not limited to: code analysis reports, trust scores, governance artifacts, gate evaluation summaries, and recommended remediations ("AI Outputs").

**The intellectual property status of AI-generated outputs is legally unsettled.** Courts, including the United States District Court for the District of Columbia in *Thaler v. Perlmutter* (2023) and subsequent decisions, have held that works produced autonomously by AI systems without sufficient human creative control may not qualify for copyright protection. SyncTek makes no warranty or representation that any AI Output generated by the Service is protectable by copyright, patent, trade secret, or any other form of intellectual property right.

### 5.2 License to Use AI Outputs

Subject to your compliance with these Terms and payment of applicable fees, SyncTek grants you a limited, non-exclusive, non-transferable, revocable license to use AI Outputs solely for your internal business and development purposes.

**This license is not an assignment of ownership.** You receive a license to use outputs, not title to them. SyncTek does not warrant that you are the exclusive recipient of substantially similar AI Outputs or that other users may not receive comparable results.

### 5.3 Your Content and Outputs

You retain all ownership rights in the source code, configuration files, and other materials you submit to the Service ("Your Content"). You grant SyncTek a limited, non-exclusive license to process Your Content solely to provide the Service.

### 5.4 No IP Guarantee

**SyncTek expressly disclaims any guarantee that AI Outputs are original, non-infringing, or protectable as intellectual property.** You assume full responsibility for any reliance on AI Outputs and for conducting your own review before incorporating AI-generated analysis or recommendations into business, legal, or engineering decisions.

---

## 6. AI Agents and Autonomous Operations

### 6.1 Autonomous Agent Functionality

ForgeOS includes autonomous software agents ("Agents") that may perform actions including: evaluating and advancing governance gates, modifying governance ledgers, generating and classifying artifacts, dispatching tasks to specialized workflows, and coordinating multi-step execution pipelines.

### 6.2 Software Tool - Not Professional Services

**ForgeOS Agents are software automation tools.** Their operation does not constitute professional engineering, legal, security, compliance, or other professional services. Gate approvals, trust scores, and governance decisions produced by Agents are automated outputs of software logic - they do not represent the opinion or endorsement of any licensed professional.

### 6.3 User Responsibility for Agent Actions

You are solely responsible for configuring, supervising, and reviewing the actions of Agents operating within your ForgeOS environment. You acknowledge that:

- Agents may produce incorrect, incomplete, or misleading outputs
- Automated gate approvals do not guarantee code quality, security, or regulatory compliance
- You must apply your own professional judgment before acting on Agent outputs
- SyncTek is not responsible for any losses, damages, or liabilities arising from your reliance on Agent-generated outputs or actions

### 6.4 Human Oversight

SyncTek strongly recommends maintaining human oversight over all material decisions informed by Agent outputs. Critical gates, security approvals, and compliance certifications should involve qualified human review.

---

## 7. Multi-Provider AI Model Disclosure

### 7.1 Provider Routing

ForgeOS routes requests through multiple third-party AI providers. The specific provider used for a given request may vary based on availability, task type, and routing configuration. Current providers include Anthropic, OpenAI, and Google. This list may change over time.

### 7.2 Provider Data Handling

Each AI provider operates under its own terms of service, privacy policy, and data handling practices. SyncTek is not responsible for the data handling, retention, or model training practices of third-party AI providers.

### 7.3 Training Data Opt-Out

Where AI providers offer mechanisms to opt out of using customer data for model training, SyncTek opts out of such data use on your behalf. However, SyncTek cannot guarantee that all providers offer such opt-out options, and provider policies are subject to change.

### 7.4 No Data Transmission Guarantee

You should not submit to the Service any information that you consider to be highly sensitive, subject to heightened regulatory protection (e.g., PHI under HIPAA, payment card data under PCI-DSS), or that you are contractually prohibited from sharing with third-party AI services, unless you have independently confirmed that such use complies with applicable obligations.

---

## 8. Data, Privacy, and Federation

### 8.1 Privacy Policy

SyncTek's collection and use of personal information is governed by our Privacy Policy, available at synctek.io/privacy, which is incorporated into these Terms by reference.

### 8.2 Your Data

You own Your Content. SyncTek processes Your Content only as necessary to provide the Service and as described in the Privacy Policy. We do not sell Your Content to third parties.

### 8.3 Federation Features

ForgeOS supports federation, which enables your ForgeOS instance to connect and exchange data with other ForgeOS instances operated by third parties ("Federated Peers"). By enabling federation, you authorize data flows between your instance and connected Federated Peers.

You acknowledge and agree that:

- **You control federation settings.** You are responsible for configuring which instances you federate with.
- **SyncTek is not responsible for Federated Peers.** SyncTek has no control over, and assumes no liability for, the data handling, security practices, or terms of service of Federated Peers.
- **Data shared with Federated Peers is subject to their terms.** Once data leaves your instance through federation, it is governed by the receiving party's policies.
- **Use federation at your own risk.** Review the data handling practices of any Federated Peer before enabling a connection.

### 8.4 Data Residency

SyncTek's primary infrastructure is hosted in the United States. By using the Service, you consent to the transfer and processing of your data in the United States and other countries where SyncTek or its providers operate.

---

## 9. Service Availability and SLA

### 9.1 Beta and Early Access

ForgeOS is currently offered as a beta or early-access service. **No uptime service level agreement (SLA) applies.** The Service is provided on a best-effort basis. SyncTek does not guarantee any minimum availability, uptime percentage, or response time.

### 9.2 Maintenance and Downtime

SyncTek may take the Service offline for maintenance, upgrades, security patching, or other operational needs at any time, with or without advance notice. Where reasonably practicable, we will provide advance notice of planned maintenance.

### 9.3 No Availability Warranty

**SyncTek expressly disclaims any warranty of uninterrupted, error-free, or timely availability of the Service.** Downtime, data delays, or service interruptions do not entitle you to a refund unless expressly provided in a separate written agreement.

---

## 10. Acceptable Use Policy

You agree that you will not use the Service to:

1. **Engage in illegal activity** - violate any applicable law, regulation, or third-party right
2. **Circumvent security controls** - attempt to disable, bypass, or undermine security features of the Service, connected systems, or third-party software
3. **Generate malicious code** - produce, analyze for offensive purposes, or distribute malware, ransomware, spyware, or any code designed to harm systems or users
4. **Abuse AI provider rate limits** - artificially inflate requests, scrape model outputs at scale, or otherwise abuse the API quotas or rate limits of underlying AI providers
5. **Reverse engineer AI models** - attempt to extract, replicate, or reverse-engineer the weights, architecture, or training data of underlying AI models
6. **Misrepresent outputs** - represent AI-generated trust scores or governance artifacts as certified professional opinions, regulatory approvals, or legally binding determinations
7. **Harm others** - harass, threaten, defame, or otherwise harm individuals
8. **Unauthorized access** - access accounts, systems, or data that you are not authorized to access
9. **Competitive intelligence abuse** - use the Service to build a competing product or to systematically benchmark and replicate ForgeOS functionality
10. **Violate third-party terms** - use the Service in a manner that violates the terms of service of your employer, customers, or any third party

SyncTek reserves the right to investigate and terminate accounts suspected of violating this Acceptable Use Policy, with or without prior notice.

---

## 11. Confidentiality

Each party agrees to hold the other's Confidential Information in strict confidence using at least the same degree of care used to protect its own confidential information, but no less than reasonable care. "Confidential Information" means any non-public information disclosed by one party to the other that is designated as confidential or that reasonably should be understood to be confidential given the nature of the information.

Confidential Information does not include information that: (a) is or becomes publicly known without breach of this obligation; (b) was rightfully known before receipt; (c) is rightfully received from a third party without restriction; or (d) is independently developed without use of the other party's Confidential Information.

---

## 12. Intellectual Property Rights in the Service

All rights, title, and interest in and to ForgeOS - including the platform, software, algorithms, user interface, documentation, branding, and underlying technology - are and remain the exclusive property of SyncTek LLC and its licensors. These Terms do not grant you any rights to SyncTek's intellectual property except the limited right to use the Service as expressly set forth herein.

The ForgeOS name, logos, and product marks are trademarks of SyncTek LLC. You may not use SyncTek's marks without prior written consent.

---

## 13. Disclaimer of Warranties

**THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTY OF ANY KIND.**

TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, SYNCTEK HEREBY DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:

- WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT
- WARRANTIES THAT THE SERVICE WILL MEET YOUR REQUIREMENTS OR BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE
- WARRANTIES REGARDING THE ACCURACY, COMPLETENESS, OR RELIABILITY OF ANY AI OUTPUTS, TRUST SCORES, GOVERNANCE DETERMINATIONS, OR OTHER RESULTS OBTAINED THROUGH THE SERVICE
- WARRANTIES THAT AI-GENERATED OUTPUTS ARE ORIGINAL, PROTECTABLE AS INTELLECTUAL PROPERTY, OR FREE FROM THIRD-PARTY CLAIMS
- WARRANTIES REGARDING THE DATA HANDLING PRACTICES OF THIRD-PARTY AI PROVIDERS

No advice or information, whether oral or written, obtained from SyncTek or through the Service shall create any warranty not expressly stated in these Terms.

---

## 14. Limitation of Liability

### 14.1 Exclusion of Consequential Damages

**TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL SYNCTEK, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, OR LICENSORS BE LIABLE FOR ANY:**

- INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES
- LOSS OF PROFITS, REVENUE, BUSINESS, GOODWILL, DATA, OR ANTICIPATED SAVINGS
- COSTS OF PROCUREMENT OF SUBSTITUTE SERVICES
- DAMAGES ARISING FROM UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR CONTENT
- DAMAGES ARISING FROM ACTIONS OF AUTONOMOUS AGENTS OR AI-GENERATED OUTPUTS

**REGARDLESS OF THE CAUSE OF ACTION OR THE THEORY OF LIABILITY, EVEN IF SYNCTEK HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.**

### 14.2 Cap on Liability

**TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, SYNCTEK'S TOTAL CUMULATIVE LIABILITY ARISING OUT OF OR RELATED TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE GREATER OF: (A) THE TOTAL FEES PAID BY YOU TO SYNCTEK IN THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE CLAIM, OR (B) ONE HUNDRED U.S. DOLLARS ($100).**

### 14.3 Essential Basis

The limitations in this Section reflect an allocation of risk between the parties. SyncTek would not have entered into these Terms without these limitations. These limitations apply even if any limited remedy fails of its essential purpose.

### 14.4 Jurisdictional Limitations

Some jurisdictions do not allow the exclusion or limitation of certain damages. In such jurisdictions, SyncTek's liability shall be limited to the maximum extent permitted by law.

---

## 15. Indemnification

You agree to indemnify, defend, and hold harmless SyncTek and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable attorneys' fees) arising out of or in connection with:

1. Your use of the Service in violation of these Terms
2. Your Content or any materials you submit to the Service
3. Your violation of any third-party right, including intellectual property or privacy rights
4. Your violation of any applicable law or regulation
5. Any actions taken by autonomous Agents operating under your account configuration
6. Data shared by your instance through federation with third-party Federated Peers

---

## 16. Termination

### 16.1 Termination by You

You may terminate your account at any time by visiting your account settings or contacting info@synctek.io. Termination is effective at the end of your current billing period for paid plans. No pro-rata refunds are issued for monthly plans; pro-rata refunds apply to unused annual plan periods.

### 16.2 Termination by SyncTek

SyncTek may suspend or terminate your account immediately and without prior notice if:

- You violate these Terms or the Acceptable Use Policy
- We are required to do so by law or legal process
- You engage in fraudulent, abusive, or illegal activity
- Continued service poses a risk to SyncTek, the Service, or other users

SyncTek may also terminate accounts with 30 days' notice for any other reason.

### 16.3 Effect of Termination

Upon termination: (a) your license to use the Service immediately ceases; (b) SyncTek may delete your data; (c) you remain liable for all outstanding fees.

### 16.4 Data Export

Following termination, SyncTek will make your data available for export for a period of **30 days**. After this period, SyncTek may permanently delete your data without further notice. It is your responsibility to export your data before termination takes effect or within the 30-day post-termination window.

### 16.5 Survival

Sections 5 (AI-Generated Outputs), 6 (Autonomous Agents), 12 (IP Rights), 13 (Disclaimer of Warranties), 14 (Limitation of Liability), 15 (Indemnification), 17 (Dispute Resolution), and 18 (General Provisions) survive termination.

---

## 17. Dispute Resolution

### 17.1 Informal Resolution

Before initiating formal proceedings, you agree to first contact SyncTek at info@synctek.io and provide a written description of the dispute, your desired resolution, and your contact information. Both parties agree to negotiate in good faith for **30 days** following receipt of such notice before pursuing formal proceedings.

### 17.2 Binding Arbitration

**If informal resolution fails, any dispute, claim, or controversy arising out of or relating to these Terms or the Service - including questions of arbitrability - shall be resolved by binding arbitration administered by the American Arbitration Association ("AAA") under its Consumer Arbitration Rules or Commercial Arbitration Rules (as applicable), as then in effect.**

Arbitration shall be conducted:
- By a single arbitrator
- In Wilmington, Delaware, or by video/telephone upon mutual agreement
- In the English language

The arbitrator's decision shall be final and binding and may be entered as a judgment in any court of competent jurisdiction.

### 17.3 Class Action Waiver

**YOU AND SYNCTEK EACH WAIVE THE RIGHT TO PARTICIPATE IN CLASS ACTION LITIGATION OR CLASS-WIDE ARBITRATION.** All disputes must be brought in your individual capacity. You may not bring or participate in a class, collective, or representative action against SyncTek.

### 17.4 Exceptions

Notwithstanding the above, either party may seek emergency injunctive or equitable relief from a court of competent jurisdiction to prevent irreparable harm pending arbitration. SyncTek may also pursue collection of unpaid fees in any court of competent jurisdiction.

### 17.5 Governing Law

These Terms and any disputes arising hereunder shall be governed by and construed in accordance with the laws of the **State of Delaware**, without regard to its conflict of law principles. For matters not subject to arbitration, you consent to the exclusive jurisdiction of the state and federal courts located in Delaware.

### 17.6 Time Limitation

Any claim arising out of these Terms must be brought within **one (1) year** of the event giving rise to the claim, or the claim is permanently waived.

---

## 18. General Provisions

### 18.1 Modifications to Terms

SyncTek may modify these Terms at any time. For **material changes**, we will provide at least **30 days' advance notice** by: (a) posting updated Terms at synctek.io/terms, (b) sending notice to the email address associated with your account, or (c) displaying a prominent notice within the Service.

Your continued use of the Service after the effective date of modified Terms constitutes acceptance of the modified Terms. If you do not agree to modified Terms, you must stop using the Service and cancel your subscription before the effective date of the changes.

Non-material changes (e.g., clarifications, typographical corrections, contact information updates) may be made without notice.

### 18.2 Entire Agreement

These Terms, together with the Privacy Policy and any other policies incorporated by reference, constitute the entire agreement between you and SyncTek regarding the Service and supersede all prior and contemporaneous agreements, representations, and understandings.

### 18.3 Severability

If any provision of these Terms is found to be unenforceable or invalid by a court of competent jurisdiction, that provision shall be modified to the minimum extent necessary to make it enforceable, and the remaining provisions shall continue in full force and effect.

### 18.4 Waiver

SyncTek's failure to enforce any right or provision of these Terms shall not constitute a waiver of that right or provision.

### 18.5 Assignment

You may not assign or transfer your rights under these Terms without SyncTek's prior written consent. SyncTek may assign its rights and obligations under these Terms without restriction, including in connection with a merger, acquisition, or sale of assets.

### 18.6 Force Majeure

SyncTek shall not be liable for any delay or failure to perform resulting from causes beyond its reasonable control, including acts of God, natural disasters, pandemics, war, terrorism, governmental action, labor disputes, or failures of third-party infrastructure providers.

### 18.7 Notices

Notices to SyncTek must be sent in writing to info@synctek.io. SyncTek may provide notices to you via the email address associated with your account or through in-Service notifications.

### 18.8 No Third-Party Beneficiaries

These Terms do not create any third-party beneficiary rights.

### 18.9 Export Compliance

You agree to comply with all applicable U.S. and international export control laws and regulations. You represent that you are not located in a country subject to U.S. government embargo or designated as a terrorist-supporting country, and that you are not listed on any U.S. government restricted party list.

---

## 19. Contact Information

For questions about these Terms, please contact us:

**SyncTek LLC**
Email: info@synctek.io
Website: synctek.io

For billing inquiries: info@synctek.io
For privacy inquiries: info@synctek.io
For legal notices: info@synctek.io

---

*These Terms of Service were last updated on March 5, 2026. Previous versions are available upon request.*
