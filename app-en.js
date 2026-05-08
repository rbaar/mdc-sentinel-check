/* ============================================
   Security Posture & Operations Check
   Application Logic – 8-Step Wizard (English)
   ============================================ */

// ============================================
// Checklist Data per Step
// ============================================

const checklistData = {
    // Step 3: Defender for Cloud
    defender: {
        "def-access": [
            { id: "def-access-1", title: "Security team has at least read access to Defender for Cloud", desc: "Check that the security team (e.g. the Security Operations Center) has at least the 'Security Reader' role on all relevant subscriptions in Defender for Cloud. Without this access, alerts, recommendations and the secure score cannot be viewed.", type: "question", options: [{ value: "on", label: "Yes, on all subscriptions" }, { value: "partial", label: "Partially" }, { value: "off", label: "No" }] }
        ],
        "def-coverage": [
            { id: "def-cov-1a", title: "Foundational CSPM", desc: "Free plan with basic security recommendations, Secure Score and resource security posture." },
            { id: "def-cov-1b", title: "Defender CSPM", desc: "Paid plan with agentless vulnerability scanning, data-aware security posture, cloud security graph, attack path analysis and advanced threat hunting.", link: "section-def-cspm-config" },
            { id: "def-cov-2", title: "Defender for Servers", desc: "Threat detection and advanced protection for Windows and Linux machines in Azure, AWS, GCP and on-premises environments.", planOptions: ["P1", "P2"], link: "section-def-servers-config" },
            { id: "def-cov-3", title: "Defender for Containers", desc: "Environment hardening, vulnerability assessment and run-time protection of Kubernetes nodes and clusters." },
            { id: "def-cov-4", title: "Defender for Resource Manager", desc: "Detects unusual and potentially harmful activities by automatically monitoring resource management operations." },
            { id: "def-cov-5", title: "Defender for Storage", desc: "Protection against malware, storage-specific threats, sensitive data leakage and misuse of Shared Access Signature (SAS) tokens.", link: "section-def-storage-config" },
            { id: "def-cov-6", title: "Defender for App Service", desc: "Identifies attacks targeting applications running on App Service (web apps and APIs)." },
            { id: "def-cov-7", title: "Defender for Databases", desc: "Protects the full database landscape: Azure SQL, open-source relational databases and Azure Cosmos DB." },
            { id: "def-cov-8", title: "Defender for Key Vault", desc: "Detects unusual and potentially harmful attempts to access or exploit Key Vault accounts." },
            { id: "def-cov-9", title: "Defender for APIs", desc: "Visibility into business-critical APIs, improves API security posture, prioritises vulnerability fixes and detects real-time threats." },
            { id: "def-cov-10", title: "AI Services", desc: "Identifies threats to generative AI applications in real-time and helps respond to security incidents.", link: "section-def-ai-config" }
        ],
        "def-cspm": [
            { id: "def-cspm-2", title: "Secure Score dashboard shows current state", desc: "Open the Secure Score dashboard and check that the data is recent and shows the expected number of resources.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "partial", label: "Partially" }, { value: "off", label: "No" }] },
            { id: "def-cspm-3", title: "Regulatory compliance is configured", desc: "Check that relevant compliance standards (e.g. NIS2, ISO 27001, CIS) have been assigned." },
            { id: "def-cspm-4", title: "Attack path analysis is available and shows results", desc: "Check whether attack paths have been identified (requires Defender CSPM plan)." }
        ],
        "def-cspm-config": [
            { id: "def-cspm-cfg-1", title: "Agentless scanning for machines", desc: "Scans machines for installed software, vulnerabilities and secrets without agents or impact on machine performance.", type: "toggle" },
            { id: "def-cspm-cfg-2", title: "Kubernetes API access", desc: "Required for agentless container posture, runtime vulnerability assessment and response actions.", type: "toggle" },
            { id: "def-cspm-cfg-3", title: "Registry access", desc: "Enables agentless vulnerability assessment for container registry images.", type: "toggle" },
            { id: "def-cspm-cfg-4", title: "Sensitive data threat detection", desc: "Enriches security alerts with data sensitivity and risk, so security teams can better prioritise incidents.", type: "toggle" },
            { id: "def-cspm-cfg-5", title: "Cloud Infrastructure and Entitlements Management (CIEM)", desc: "Provides visibility into who has access to what in cloud environments. Analyses inactive, excessive and risky access rights.", type: "toggle" },
            { id: "def-cspm-cfg-6", title: "API Security Posture Management", desc: "Unified visibility into all APIs published via Azure API Management, App Services, Functions and Logic Apps.", type: "toggle" },
            { id: "def-cspm-cfg-7", title: "Serverless protection", desc: "Protects serverless workloads by continuously discovering resources, assessing configuration posture and detecting security risks.", type: "toggle" }
        ],
        "def-ai-config": [
            { id: "def-ai-cfg-1", title: "Enable suspicious prompt evidence", desc: "Shows the prompts between user and model for deeper analysis of AI-related alerts. Only suspicious segments are included; sensitive data is redacted. Available via Defender portal for each alert.", type: "toggle" },
            { id: "def-ai-cfg-2", title: "Enable data security for AI interactions", desc: "Gives Microsoft Purview access to prompts and responses (incl. metadata) for data security and compliance: SIT classification, DSPM for AI, Audit, Insider Risk Management, Communication Compliance and eDiscovery. This is a paid Purview capability, not included in Defender for AI Services.", type: "toggle" },
            { id: "def-ai-cfg-3", title: "AI Model Security (Preview)", desc: "Provides security assessment and protection of AI models against attacks and misuse.", type: "toggle" }
        ],
        "def-storage-config": [
            { id: "def-stor-cfg-1", title: "Malware scanning", desc: "Protects Azure Blob Storage by scanning every uploaded blob for malware in near real-time. Pricing: $0.15/GB scanned, limit: 5000 GB.", type: "toggle" },
            { id: "def-stor-cfg-2", title: "Sensitive data threat detection", desc: "Detects threats targeting sensitive data in Azure Storage accounts.", type: "toggle" }
        ],
        "def-servers-config": [
            { id: "def-srv-cfg-1", title: "Vulnerability assessment for machines", desc: "Enables vulnerability assessment on Azure and hybrid machines. VA tool: Microsoft Defender vulnerability management.", type: "toggle" },
            { id: "def-srv-cfg-2", title: "Guest Configuration agent (preview)", desc: "Checks machines for security misconfigurations in OS, applications and environment settings. Deploys the agent on Azure VMs; hybrid machines via Azure Arc already include this agent.", type: "toggle" },
            { id: "def-srv-cfg-3", title: "Endpoint protection", desc: "Protection via Microsoft Defender for Endpoint, including automatic agent deployment to servers and security data integration with Defender for Cloud.", type: "toggle" },
            { id: "def-srv-cfg-4", title: "Agentless scanning for machines", desc: "Scans machines for installed software, vulnerabilities and secrets without agents or impact on machine performance.", type: "toggle" },
            { id: "def-srv-cfg-5", title: "File Integrity Monitoring", desc: "Monitoring of changes to critical files, registry values and configurations on servers.", type: "toggle" }
        ],
        "def-verdict": [
            { id: "def-verdict", title: "Joint conclusion", desc: "Provide an overall assessment of the Defender for Cloud configuration.", type: "question", options: [{ value: "on", label: "Protection is in order" }, { value: "partial", label: "Protection needs attention" }, { value: "off", label: "Protection is not in order" }] }
        ]
    },

    // Step 4: XDR Data
    xdr: {
        "xdr-intake": [
            { id: "xdr-q-0", title: "Are you on the Unified portal?", desc: "The Unified Security Operations portal combines Defender XDR and Sentinel in one interface.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }], link: "section-xdr-datalake", linkOff: "section-xdr-sentinel" },
            { id: "xdr-q-1", title: "Do you have E5?", desc: "Microsoft 365 E5 licence includes Defender for Endpoint, Identity, Office 365 and Cloud Apps.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "partial", label: "Partially" }, { value: "off", label: "No" }] }
        ],
        "xdr-sentinel": [
            { id: "xdr-q-2", title: "Is XDR data being sent to Sentinel?", desc: "Check that the Microsoft Defender XDR connector is configured to send data to Sentinel.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }] }
        ],
        "xdr-datalake": [
            { id: "xdr-q-dl", title: "Is Data Lake already enabled?", desc: "The Security Data Lake in the Unified portal enables advanced hunting and long-term storage.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }] }
        ],
        "xdr-verdict": [
            { id: "xdr-verdict", title: "Joint conclusion", desc: "Provide an overall assessment of the XDR Data configuration.", type: "question", options: [{ value: "on", label: "Protection is in order" }, { value: "partial", label: "Protection needs attention" }, { value: "off", label: "Protection is not in order" }] }
        ]
    },

    // Step 5: Retention
    retentie: {
        "ret-intake": [
            { id: "ret-q-policy", title: "Do you have a retention policy?", desc: "A retention policy determines how long data is kept.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }], link: "section-ret-policy" }
        ],
        "ret-policy": [
            { id: "ret-q-analytics", title: "How many days for Analytics retention?", desc: "Analytics retention determines how long data is available for queries and detection rules.", type: "input", placeholder: "Number of days", suffix: "days" },
            { id: "ret-q-total", title: "How many days in total?", desc: "Total retention determines how long data is kept including Data Lake, Archive, ADX and other solutions.", type: "input", placeholder: "Number of days", suffix: "days" }
        ],
        "ret-check": [
            { id: "ret-q-match", title: "Looking at the retention period in Sentinel, does it match your expectation?", desc: "Compare the configured retention in Sentinel with the expectation.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "partial", label: "Partially" }, { value: "off", label: "No" }] }
        ],
        "ret-xdr": [
            { id: "xdr-q-ret-analytics", title: "What is the Analytics retention?", desc: "Analytics retention determines how long data is available for queries and detection rules.", type: "input", placeholder: "Number of days", suffix: "days" },
            { id: "xdr-q-ret-total", title: "What is the Total retention?", desc: "Total retention determines how long data is kept including Data Lake, Archive, ADX and other solutions.", type: "input", placeholder: "Number of days", suffix: "days" }
        ],
        "ret-verdict": [
            { id: "ret-verdict", title: "Joint conclusion", desc: "Provide an overall assessment of the Retention configuration.", type: "question", options: [{ value: "on", label: "Protection is in order" }, { value: "partial", label: "Protection needs attention" }, { value: "off", label: "Protection is not in order" }] }
        ]
    },

    // Step 6: AMA Coverage
    ama: {
        "ama-intake": [
            { id: "ama-q-mde", title: "Are all servers onboarded to MDE?", desc: "Check that all servers (Windows and Linux) are onboarded to Microsoft Defender for Endpoint.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "partial", label: "Partially" }, { value: "off", label: "No" }] },
            { id: "ama-q-plan", title: "Which MDE plan is being used?", desc: "P1 offers basic endpoint protection, P2 adds EDR, automated investigation and advanced hunting.", type: "question", options: [{ value: "on", label: "P2" }, { value: "partial", label: "Mix" }, { value: "off", label: "P1" }], showWhen: { item: "ama-q-mde", values: ["on", "partial"] } },
            { id: "ama-q-agent", title: "Do the servers have an AMA agent running for additional information?", desc: "The Azure Monitor Agent collects additional logs such as Security Events and Syslog.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }] },
            { id: "ama-q-sentinel", title: "Are you sending this to Sentinel?", desc: "Are the logs collected by AMA being forwarded to the Sentinel workspace?", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }], showWhen: { item: "ama-q-agent", values: ["on"] } },
            { id: "ama-q-workbook", title: "Does the coverage workbook show this?", desc: "Check in the Coverage workbook that all servers are visible and delivering data.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "partial", label: "Partially" }, { value: "off", label: "No" }], showWhen: { item: "ama-q-sentinel", values: ["on"] } }
        ],
        "ama-verdict": [
            { id: "ama-verdict", title: "Joint conclusion", desc: "Provide an overall assessment of the AMA Coverage configuration.", type: "question", options: [{ value: "on", label: "Protection is in order" }, { value: "partial", label: "Protection needs attention" }, { value: "off", label: "Protection is not in order" }] }
        ]
    },

    // Step 7: Log Sources
    logbronnen: {
        "log-tier1": [
            { id: "log-t1-xdr", title: "Microsoft Defender XDR", desc: "Provides DeviceEvents, AlertInfo, EmailEvents, IdentityLogonEvents and CloudAppEvents. Free ingestion to Analytics tier for M365 E5 customers.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] },
            { id: "log-t1-entra", title: "Microsoft Entra ID", desc: "Provides SigninLogs, AuditLogs, AADNonInteractiveUserSignInLogs and RiskyUsers. Free data connector (Entra ID P2 required).", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] },
            { id: "log-t1-office", title: "Office 365", desc: "Provides OfficeActivity logs for Exchange, SharePoint and Teams. Free data connector.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] },
            { id: "log-t1-activity", title: "Azure Activity Logs", desc: "Provides AzureActivity logs for Azure resource management. Free data connector.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] },
            { id: "log-t1-secevt", title: "Windows Security Events", desc: "Provides SecurityEvent/WindowsEvent tables. 500 MB/day per server free via Defender for Servers P2.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] },
            { id: "log-t1-syslog", title: "Syslog for Linux", desc: "Provides Syslog table from Linux servers. No free ingestion, costs based on volume.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] },
            { id: "log-t1-health", title: "Sentinel Health & Audit Diagnostics", desc: "Provides SentinelHealth and SentinelAudit tables. SentinelHealth is non-billable.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] }
        ],
        "log-analytics": [
            { id: "log-an-3", title: "No rules with errors or disabled due to failures", desc: "Check that all analytics rules are active and no rules have been automatically disabled due to errors.", type: "question", options: [{ value: "off", label: "No" }, { value: "partial", label: "Partially" }, { value: "on", label: "Yes" }] }
        ],
        "log-verdict": [
            { id: "log-verdict", title: "Joint conclusion", desc: "Provide an overall assessment of the Sentinel Log Sources configuration.", type: "question", options: [{ value: "on", label: "Protection is in order" }, { value: "partial", label: "Protection needs attention" }, { value: "off", label: "Protection is not in order" }] }
        ],
        "log-tier2": [
            { id: "log-t2-dfc", title: "Microsoft Defender for Cloud", desc: "SecurityAlert and SecurityRecommendation. SecurityAlert is free.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] },
            { id: "log-t2-akv", title: "Azure Key Vault", desc: "AKVAuditLogs for access to secrets, keys and certificates.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] },
            { id: "log-t2-copilot", title: "Microsoft Copilot / AI Governance", desc: "OfficeActivity (Copilot) and AzureDiagnostics (OpenAI) for AI usage monitoring.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] },
            { id: "log-t2-purview", title: "Microsoft Purview (DLP & Information Protection)", desc: "MicrosoftPurviewInformationProtection for data governance and DLP events.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] },
            { id: "log-t2-ti", title: "Threat Intelligence Platforms", desc: "ThreatIntelligenceIndicator for IOC enrichment. Free data source.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] },
            { id: "log-t2-intune", title: "Microsoft Intune (Endpoint Management)", desc: "IntuneAuditLogs, IntuneOperationalLogs and IntuneDevices. Audit/operational logs partially free.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] },
            { id: "log-t2-3pid", title: "Third-Party Identity (Okta, CyberArk, etc.)", desc: "Vendor-specific tables via API or CEF/Syslog. Conditional — only when in use.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] },
            { id: "log-t2-aws", title: "Amazon Web Services (AWS)", desc: "AWSCloudTrail, AWSGuardDuty and AWSVPCFlow for multi-cloud visibility.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] },
            { id: "log-t2-gcp", title: "Google Cloud Platform (GCP)", desc: "GCPAuditLogs for multi-cloud visibility.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] },
            { id: "log-t2-azfw", title: "Azure Firewall", desc: "AZFWNetworkRule, AZFWApplicationRule, AZFWDnsQuery and AZFWThreatIntel.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] },
            { id: "log-t2-waf", title: "Azure WAF (Application Gateway / Front Door)", desc: "ApplicationGatewayFirewallLog and FrontDoorWebApplicationFirewallLog.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] },
            { id: "log-t2-dns", title: "DNS Security Logs", desc: "DnsEvents and DnsInventory for detection of C2 and data exfiltration.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] },
            { id: "log-t2-gsa", title: "Microsoft Global Secure Access", desc: "NetworkAccessTraffic for ZTNA and Secure Service Edge monitoring.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] },
            { id: "log-t2-vnet", title: "VNet Flow Logs & Traffic Analytics", desc: "NTANetAnalytics and NTAIpDetails for network traffic analysis.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] },
            { id: "log-t2-cef", title: "Third-Party Network & Proxy (CEF/Syslog)", desc: "CommonSecurityLog from firewalls and security appliances. 500 MB/day via DfS P2.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] }
        ],
        "log-tier3": [
            { id: "log-t3-iis", title: "IIS / Web Server Logs", desc: "W3CIISLog for web server monitoring. 500 MB/day via DfS P2.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] },
            { id: "log-t3-mcas", title: "Defender for Cloud Apps (Standalone)", desc: "McasShadowItReporting for shadow IT discovery.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] },
            { id: "log-t3-sap", title: "SAP", desc: "SAPAuditLog, ABAPAuditLog and SAPChangeDocuments. Separately licensed.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] },
            { id: "log-t3-sql", title: "SQL / Database Audit Logs", desc: "SQLSecurityAuditEvents and CDBDataPlaneRequests.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] },
            { id: "log-t3-3papp", title: "Third-Party Applications (ServiceNow, Salesforce, etc.)", desc: "Vendor-specific tables via API or CEF/Syslog. Conditional.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] },
            { id: "log-t3-collab", title: "Third-Party Collaboration (Slack, Zoom, etc.)", desc: "Vendor-specific tables via API or webhook. Conditional.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] },
            { id: "log-t3-custom", title: "Custom Applications (Crown Jewels)", desc: "Custom tables ({AppName}_CL) for business-critical applications.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] },
            { id: "log-t3-devops", title: "Azure DevOps", desc: "AzureDevOpsAuditing for CI/CD pipeline security.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] },
            { id: "log-t3-github", title: "GitHub Enterprise", desc: "GitHubAuditLogPolling for source code and supply chain security.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] },
            { id: "log-t3-3pdevops", title: "Third-Party DevOps (GitLab, Jenkins, etc.)", desc: "Vendor-specific tables via API or webhook. Conditional.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] },
            { id: "log-t3-aks", title: "Azure Kubernetes Service (AKS) Audit", desc: "AKSAudit and AKSAuditAdmin for container platform security.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] },
            { id: "log-t3-storage", title: "Azure Storage Analytics", desc: "StorageBlobLogs and StorageFileLogs for data access monitoring.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] },
            { id: "log-t3-azdns", title: "Microsoft Defender for DNS (Azure DNS)", desc: "AzureDiagnostics (DNS) and DNSQueryLogs.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] },
            { id: "log-t3-wef", title: "Windows Forwarded Events (Advanced)", desc: "WindowsEvent for PowerShell, Sysmon and AppLocker. 500 MB/day via DfS P2.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] },
            { id: "log-t3-iot", title: "Microsoft Defender for IoT", desc: "SecurityAlert (IoT) for OT/IoT monitoring. SecurityAlert is free.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] },
            { id: "log-t3-3pot", title: "Third-Party OT/IoT (Claroty, Nozomi, Armis)", desc: "Vendor-specific tables via CEF/Syslog. Conditional.", type: "question", options: [{ value: "on", label: "Yes" }, { value: "off", label: "No" }, { value: "partial", label: "Don't know" }, { value: "oos", label: "Out of scope" }] }
        ]
    }
};

// Section-to-step mapping for overview cards
const sectionStepMap = {
    defender: 3,
    xdr: 4,
    ama: 5,
    retentie: 6,
    logbronnen: 7
};

// ============================================
// State
// ============================================

let currentStep = 1;
const TOTAL_STEPS = 8;
const STORAGE_KEY = "security-posture-operations-check-en-assessments";
let currentAssessmentId = null;

const state = {
    customer: { name: "", contact: "", date: "", consultant: "" },
    checks: {},
    notes: { positive: "", attention: "", critical: "", actions: "" },
    scope: { defender: "", xdr: "", retentie: "", ama: "", logbronnen: "" },
    sectionNotes: {},
    catScope: {},
    catFollowup: {}
};

// ============================================
// Initialize
// ============================================

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("sessionDate").value = new Date().toISOString().split("T")[0];

    initChecksState();
    renderAllItems();
    updateStepNav();
    renderSavedList();

    for (const field of ["positive", "attention", "critical", "actions"]) {
        const el = document.getElementById(`notes-${field}`);
        if (el) el.addEventListener("input", () => {
            state.notes[field] = el.value;
            debouncedAutoSave();
        });
    }

    for (const id of ["customerName", "customerContact", "sessionDate", "consultant"]) {
        const el = document.getElementById(id);
        if (el) el.addEventListener("input", () => debouncedAutoSave());
    }

    window.addEventListener("beforeunload", (e) => {
        if (currentAssessmentId) {
            e.preventDefault();
            e.returnValue = "";
        }
    });

    if (new URLSearchParams(window.location.search).has("test")) {
        const assessments = getAllAssessments();
        const firstId = Object.keys(assessments)[0];
        if (firstId) {
            loadAssessment(firstId);
            setTimeout(() => showReport(), 100);
        }
    }
});

function initChecksState() {
    for (const section of Object.values(checklistData)) {
        for (const items of Object.values(section)) {
            for (const item of items) {
                if (!state.checks[item.id]) {
                    state.checks[item.id] = { status: null, note: "" };
                }
            }
        }
    }
}

// ============================================
// Save / Load (localStorage)
// ============================================

function getAllAssessments() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch { return {}; }
}

function saveAllAssessments(assessments) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(assessments));
}

function captureState() {
    const nameEl = document.getElementById("customerName");
    if (nameEl) state.customer.name = nameEl.value.trim();
    const contactEl = document.getElementById("customerContact");
    if (contactEl) state.customer.contact = contactEl.value.trim();
    const dateEl = document.getElementById("sessionDate");
    if (dateEl) state.customer.date = dateEl.value;
    const consultEl = document.getElementById("consultant");
    if (consultEl) state.customer.consultant = consultEl.value.trim();

    for (const field of ["positive", "attention", "critical", "actions"]) {
        const el = document.getElementById(`notes-${field}`);
        if (el) state.notes[field] = el.value;
    }

    return {
        customer: { ...state.customer },
        checks: JSON.parse(JSON.stringify(state.checks)),
        notes: { ...state.notes },
        scope: { ...state.scope },
        sectionNotes: { ...state.sectionNotes },
        catScope: { ...state.catScope },
        catFollowup: { ...state.catFollowup },
        currentStep,
        savedAt: new Date().toISOString()
    };
}

let _autoSaveTimer = null;
function debouncedAutoSave() {
    clearTimeout(_autoSaveTimer);
    _autoSaveTimer = setTimeout(() => autoSave(), 300);
}

function autoSave() {
    if (!currentAssessmentId) return;
    const assessments = getAllAssessments();
    assessments[currentAssessmentId] = captureState();
    saveAllAssessments(assessments);
    showSaveIndicator();
}

function manualSave() {
    captureState();

    if (!state.customer.name) {
        goToStep(1);
        document.getElementById("customerName").focus();
        document.getElementById("customerName").style.borderColor = "var(--danger)";
        return;
    }

    if (!currentAssessmentId) {
        currentAssessmentId = "spoc-" + Date.now();
    }

    const assessments = getAllAssessments();
    assessments[currentAssessmentId] = captureState();
    saveAllAssessments(assessments);
    renderSavedList();
    showSaveIndicator(true);
}

function loadAssessment(id) {
    const assessments = getAllAssessments();
    const data = assessments[id];
    if (!data) return;

    currentAssessmentId = id;

    state.customer = { ...data.customer };
    document.getElementById("customerName").value = state.customer.name || "";
    document.getElementById("customerContact").value = state.customer.contact || "";
    document.getElementById("sessionDate").value = state.customer.date || "";
    document.getElementById("consultant").value = state.customer.consultant || "";

    initChecksState();
    for (const [key, val] of Object.entries(data.checks || {})) {
        if (state.checks[key]) {
            state.checks[key] = { ...val };
        }
    }

    for (const categories of Object.values(checklistData)) {
        for (const items of Object.values(categories)) {
            for (const item of items) {
                if (item.type === "toggle" && !state.checks[item.id]?.status && data.checks?.[item.id]) {
                    state.checks[item.id].status = "off";
                }
            }
        }
    }

    state.notes = { ...data.notes };
    for (const field of ["positive", "attention", "critical", "actions"]) {
        const el = document.getElementById(`notes-${field}`);
        if (el) el.value = state.notes[field] || "";
    }

    state.scope = { defender: "", xdr: "", retentie: "", ama: "", logbronnen: "", ...data.scope };

    state.sectionNotes = { ...data.sectionNotes };
    for (const sec of ["defender", "xdr", "ama", "retentie", "logbronnen"]) {
        const el = document.getElementById(`${sec}-general-notes`);
        if (el) el.value = state.sectionNotes[sec] || "";
    }

    state.catScope = { ...data.catScope };
    state.catFollowup = { ...data.catFollowup };

    renderAllItems();
    updateAllCounts();
    renderSavedList();

    goToStep(data.currentStep || 2);
}

function deleteAssessment(id, event) {
    event.stopPropagation();
    const assessments = getAllAssessments();
    const name = assessments[id]?.customer?.name || "this assessment";
    if (!confirm(`Are you sure you want to delete the assessment for "${name}"?`)) return;

    delete assessments[id];
    saveAllAssessments(assessments);

    if (currentAssessmentId === id) {
        currentAssessmentId = null;
    }

    renderSavedList();
}

function startNewAssessment() {
    currentAssessmentId = null;

    state.customer = { name: "", contact: "", date: "", consultant: "" };
    state.notes = { positive: "", attention: "", critical: "", actions: "" };
    state.scope = { defender: "", xdr: "", retentie: "", ama: "", logbronnen: "" };
    state.sectionNotes = {};
    for (const key of Object.keys(state.checks)) {
        state.checks[key] = { status: null, note: "" };
    }

    document.getElementById("customerName").value = "";
    document.getElementById("customerContact").value = "";
    document.getElementById("sessionDate").value = new Date().toISOString().split("T")[0];
    document.getElementById("consultant").value = "";
    for (const field of ["positive", "attention", "critical", "actions"]) {
        const el = document.getElementById(`notes-${field}`);
        if (el) el.value = "";
    }
    const defNotes = document.getElementById("defender-general-notes");
    if (defNotes) defNotes.value = "";
    for (const sec of ["xdr", "ama", "retentie", "logbronnen"]) {
        const el = document.getElementById(`${sec}-general-notes`);
        if (el) el.value = "";
    }

    renderAllItems();
    updateAllCounts();
    goToStep(1);
}

function renderSavedList() {
    const container = document.getElementById("saved-list");
    const assessments = getAllAssessments();
    const entries = Object.entries(assessments).sort((a, b) => (b[1].savedAt || "").localeCompare(a[1].savedAt || ""));

    if (entries.length === 0) {
        container.innerHTML = '<p class="saved-empty">No saved assessments found.</p>';
        return;
    }

    container.innerHTML = entries.map(([id, data]) => {
        const name = escapeHtml(data.customer?.name || "Unknown");
        const date = data.customer?.date
            ? new Date(data.customer.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
            : "";
        const savedAt = data.savedAt
            ? new Date(data.savedAt).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })
            : "";
        const counts = getCountsForData(data);
        const pct = counts.total > 0 ? Math.round(((counts.total - counts.unchecked) / counts.total) * 100) : 0;
        const isActive = id === currentAssessmentId;

        return `
            <div class="saved-item ${isActive ? 'saved-item-active' : ''}" onclick="loadAssessment('${id}')">
                <div class="saved-item-info">
                    <div class="saved-item-name">${name}</div>
                    <div class="saved-item-meta">
                        ${date ? `<span>📅 ${date}</span>` : ""}
                        <span>💾 ${savedAt}</span>
                        <span class="saved-item-progress">${pct}% completed</span>
                    </div>
                </div>
                <div class="saved-item-actions">
                    <div class="saved-item-bar">
                        <div class="saved-item-bar-fill" style="width:${pct}%"></div>
                    </div>
                    <button class="btn btn-danger-small" onclick="deleteAssessment('${id}', event)" title="Delete">🗑️</button>
                </div>
            </div>`;
    }).join("") + `
        <div style="margin-top: 12px; text-align: center;">
            <button class="btn btn-secondary" onclick="startNewAssessment()">+ Start new assessment</button>
        </div>`;
}

function getCountsForData(data) {
    const counts = { on: 0, partial: 0, off: 0, na: 0, oos: 0, unchecked: 0, total: 0 };
    const scope = data.scope || {};
    const catScope = data.catScope || {};
    for (const [sectionKey, categories] of Object.entries(checklistData)) {
        if (scope[sectionKey] === "out-of-scope") continue;
        for (const [catKey, items] of Object.entries(categories)) {
            if (catKey.endsWith('-verdict')) continue;
            if (catScope[catKey]) continue;
            if (!isConfigCategoryActive(catKey)) continue;
            for (const item of items) {
                if (item.showWhen) {
                    const parentStatus = data.checks?.[item.showWhen.item]?.status;
                    if (!item.showWhen.values.includes(parentStatus)) continue;
                }
                counts.total++;
                const s = data.checks?.[item.id];
                if (s?.status && counts.hasOwnProperty(s.status)) counts[s.status]++;
                else counts.unchecked++;
            }
        }
    }
    return counts;
}

function showSaveIndicator(manual) {
    const btn = document.getElementById("btnSave");
    if (!btn) return;
    btn.textContent = manual ? "✅ Saved!" : "💾 Saved";
    btn.classList.add("save-flash");
    setTimeout(() => {
        btn.textContent = "💾 Save";
        btn.classList.remove("save-flash");
    }, manual ? 2000 : 1000);
}

function toggleSavedPanel() {
    const panel = document.getElementById("saved-assessments-card");
    const btn = panel.previousElementSibling;
    const isHidden = panel.classList.toggle("saved-panel-hidden");
    btn.style.display = isHidden ? "" : "none";
    if (!isHidden) renderSavedList();
}

// ============================================
// Step Navigation
// ============================================

function goToStep(step) {
    if (step < 1 || step > TOTAL_STEPS) return;

    if (currentStep === 1 && step > 1) {
        const name = document.getElementById("customerName").value.trim();
        if (!name) {
            document.getElementById("customerName").focus();
            document.getElementById("customerName").style.borderColor = "var(--danger)";
            return;
        }
        saveCustomerData();
    }

    if (currentStep === 1) saveCustomerData();

    if (currentStep === 1 && !currentAssessmentId && state.customer.name) {
        currentAssessmentId = "spoc-" + Date.now();
    }

    autoSave();

    if (step === 8) updateResultSummary();
    if (step === 2) updateOverviewCards();

    currentStep = step;

    document.querySelectorAll(".step-panel").forEach(p => p.classList.remove("active"));
    document.getElementById(`step-${step}`).classList.add("active");

    document.querySelectorAll(".stepper .step").forEach(s => {
        const sStep = parseInt(s.dataset.step);
        s.classList.toggle("active", sStep === step);
        s.classList.toggle("completed", sStep < step);
    });

    updateStepNav();
    window.scrollTo({ top: document.querySelector(".stepper").offsetTop - 10, behavior: "smooth" });
}

function nextStep() { goToStep(currentStep + 1); }
function prevStep() { goToStep(currentStep - 1); }

function updateStepNav() {
    document.getElementById("stepIndicator").textContent = `Step ${currentStep} of ${TOTAL_STEPS}`;
    document.getElementById("btnPrev").style.visibility = currentStep === 1 ? "hidden" : "visible";

    const btnNext = document.getElementById("btnNext");
    if (currentStep === TOTAL_STEPS) {
        btnNext.style.visibility = "hidden";
    } else {
        btnNext.style.visibility = "visible";
        btnNext.textContent = "Next →";
    }
}

function saveCustomerData() {
    state.customer.name = document.getElementById("customerName").value.trim();
    state.customer.contact = document.getElementById("customerContact").value.trim();
    state.customer.date = document.getElementById("sessionDate").value;
    state.customer.consultant = document.getElementById("consultant").value.trim();
}

// ============================================
// Rendering Check Items
// ============================================

function renderAllItems() {
    for (const [sectionKey, categories] of Object.entries(checklistData)) {
        for (const [catKey, items] of Object.entries(categories)) {
            const container = document.getElementById(`cat-${catKey}`);
            if (!container) continue;
            container.innerHTML = items.map(item => createCheckItemHTML(item)).join("");
        }
    }
    updateAllCounts();
    updateConfigVisibility();
}

function updateConfigVisibility() {
    for (const categories of Object.values(checklistData)) {
        for (const items of Object.values(categories)) {
            for (const item of items) {
                const s = state.checks[item.id];
                if (item.link) {
                    const sectionEl = document.getElementById(item.link);
                    if (sectionEl) {
                        const visible = s?.status === 'on' || s?.status === 'partial';
                        sectionEl.style.display = visible ? '' : 'none';
                    }
                }
                if (item.linkOff) {
                    const sectionEl = document.getElementById(item.linkOff);
                    if (sectionEl) {
                        sectionEl.style.display = s?.status === 'off' ? '' : 'none';
                    }
                }
            }
        }
    }
    const retentieEl = document.getElementById('section-ret-xdr');
    if (retentieEl) {
        const q0 = state.checks['xdr-q-0']?.status;
        const q2 = state.checks['xdr-q-2']?.status;
        retentieEl.style.display = (q0 === 'on' || q2 === 'on') ? '' : 'none';
    }

    for (const categories of Object.values(checklistData)) {
        for (const items of Object.values(categories)) {
            for (const item of items) {
                if (!item.showWhen) continue;
                const el = document.getElementById(`item-${item.id}`);
                if (!el) continue;
                const parentStatus = state.checks[item.showWhen.item]?.status;
                el.style.display = item.showWhen.values.includes(parentStatus) ? '' : 'none';
            }
        }
    }
}

function getConfigCatParentMap() {
    const map = {};
    for (const categories of Object.values(checklistData)) {
        for (const items of Object.values(categories)) {
            for (const item of items) {
                if (item.link) {
                    const catKey = item.link.replace('section-', '');
                    map[catKey] = { id: item.id, mode: 'on' };
                }
                if (item.linkOff) {
                    const catKey = item.linkOff.replace('section-', '');
                    map[catKey] = { id: item.id, mode: 'off' };
                }
            }
        }
    }
    return map;
}

function isConfigCategoryActive(catKey) {
    if (catKey === 'ret-xdr') {
        const q0 = state.checks['xdr-q-0']?.status;
        const q2 = state.checks['xdr-q-2']?.status;
        return q0 === 'on' || q2 === 'on';
    }
    const map = getConfigCatParentMap();
    const parent = map[catKey];
    if (!parent) return true;
    const s = state.checks[parent.id];
    if (parent.mode === 'off') return s?.status === 'off';
    return s?.status === 'on' || s?.status === 'partial';
}

function createCheckItemHTML(item) {
    const s = state.checks[item.id];
    const statusAttr = s && s.status ? `data-status="${s.status}"` : "";

    if (item.type === "question") {
        const isVerdict = item.id.endsWith('-verdict');
        const buttons = item.options.map(opt =>
            `<button class="question-btn ${isVerdict ? 'verdict-q-' + opt.value : ''} ${s?.status === opt.value ? 'question-active question-' + opt.value : ''}" onclick="setQuestionStatus('${item.id}','${opt.value}')">${escapeHtml(opt.label)}</button>`
        ).join("");
        return `
            <div class="check-item question-item${isVerdict ? ' verdict-item' : ''}" id="item-${item.id}" ${statusAttr}>
                <div class="check-item-content">
                    <div class="check-item-title">${escapeHtml(item.title)}</div>
                    <div class="check-item-desc">${escapeHtml(item.desc)}</div>
                    <button class="check-item-note-toggle" onclick="toggleNote('${item.id}')">
                        ${s?.note ? '📝 Edit note' : '+ Add note'}
                    </button>
                    <div class="check-item-note" id="note-${item.id}" style="display:${s?.note ? 'block' : 'none'}">
                        <textarea rows="2" placeholder="Note for this check item..." oninput="updateNote('${item.id}',this.value)">${escapeHtml(s?.note || '')}</textarea>
                    </div>
                </div>
                <div class="question-buttons">
                    ${buttons}
                    <button class="followup-btn ${s?.followup ? 'followup-active' : ''}" onclick="toggleFollowup('${item.id}')" title="Mark for follow-up session">🔄</button>
                </div>
            </div>`;
    }

    if (item.type === "input") {
        return `
            <div class="check-item question-item" id="item-${item.id}" ${statusAttr}>
                <div class="check-item-content">
                    <div class="check-item-title">${escapeHtml(item.title)}</div>
                    <div class="check-item-desc">${escapeHtml(item.desc)}</div>
                    <button class="check-item-note-toggle" onclick="toggleNote('${item.id}')">
                        ${s?.note ? '📝 Edit note' : '+ Add note'}
                    </button>
                    <div class="check-item-note" id="note-${item.id}" style="display:${s?.note ? 'block' : 'none'}">
                        <textarea rows="2" placeholder="Note for this check item..." oninput="updateNote('${item.id}',this.value)">${escapeHtml(s?.note || '')}</textarea>
                    </div>
                </div>
                <div class="input-field">
                    <input type="number" min="0" placeholder="${escapeHtml(item.placeholder || '')}" value="${escapeHtml(s?.inputValue || '')}" oninput="setInputValue('${item.id}', this.value)">
                    ${item.suffix ? `<span class="input-suffix">${escapeHtml(item.suffix)}</span>` : ''}
                    <button class="followup-btn ${s?.followup ? 'followup-active' : ''}" onclick="toggleFollowup('${item.id}')" title="Mark for follow-up session">🔄</button>
                </div>
            </div>`;
    }

    if (item.type === "cycle") {
        const cycleClass = s?.status ? `cycle-${s.status}` : "";
        return `
            <div class="check-item" id="item-${item.id}" ${statusAttr}>
                <div class="check-item-content">
                    <div class="check-item-title">${escapeHtml(item.title)}</div>
                    <div class="check-item-desc">${escapeHtml(item.desc)}</div>
                    <button class="check-item-note-toggle" onclick="toggleNote('${item.id}')">
                        ${s?.note ? '📝 Edit note' : '+ Add note'}
                    </button>
                    <div class="check-item-note" id="note-${item.id}" style="display:${s?.note ? 'block' : 'none'}">
                        <textarea rows="2" placeholder="Note for this check item..." oninput="updateNote('${item.id}',this.value)">${escapeHtml(s?.note || '')}</textarea>
                    </div>
                </div>
                <div class="check-item-status">
                    <button class="cycle-btn ${cycleClass}" onclick="cycleStatus('${item.id}')" title="Click to change status"></button>
                </div>
            </div>`;
    }

    if (item.type === "toggle") {
        const toggleState = s?.status === "on" ? "on" : s?.status === "off" ? "off" : s?.status === "na" ? "na" : "unassessed";
        const toggleLabel = { on: "On", off: "Off", na: "N/A", unassessed: "–" }[toggleState];
        return `
            <div class="check-item toggle-item" id="item-${item.id}" ${statusAttr}>
                <div class="check-item-content">
                    <div class="check-item-title">${escapeHtml(item.title)}</div>
                    <div class="check-item-desc">${escapeHtml(item.desc)}</div>
                    <button class="check-item-note-toggle" onclick="toggleNote('${item.id}')">
                        ${s?.note ? '📝 Edit note' : '+ Add note'}
                    </button>
                    <div class="check-item-note" id="note-${item.id}" style="display:${s?.note ? 'block' : 'none'}">
                        <textarea rows="2" placeholder="Note for this check item..." oninput="updateNote('${item.id}',this.value)">${escapeHtml(s?.note || '')}</textarea>
                    </div>
                </div>
                <div class="toggle-switch" onclick="cycleToggleStatus('${item.id}')">
                    <span class="toggle-slider ${toggleState}" ></span>
                    <span class="toggle-label">${toggleLabel}</span>
                </div>
                <button class="followup-btn ${s?.followup ? 'followup-active' : ''}" onclick="toggleFollowup('${item.id}')" title="Mark for follow-up session">🔄</button>
            </div>`;
    }

    const linkHtml = item.link ? `<button class="link-badge" onclick="event.stopPropagation(); scrollToSection('${item.link}')" title="Go to configuration">⚙️ Config</button>` : '';

    return `
        <div class="check-item" id="item-${item.id}" ${statusAttr}>
            <div class="check-item-content">
                <div class="check-item-title">${escapeHtml(item.title)}${item.planOptions ? `<button class="plan-badge ${s?.plan ? 'plan-active' : ''}" id="plan-${item.id}" onclick="cyclePlan('${item.id}', ${JSON.stringify(item.planOptions).replace(/"/g, '&quot;')})">${s?.plan || 'Plan?'}</button>` : ''}${linkHtml}</div>
                <div class="check-item-desc">${escapeHtml(item.desc)}</div>
                <button class="check-item-note-toggle" onclick="toggleNote('${item.id}')">
                    ${s?.note ? '📝 Edit note' : '+ Add note'}
                </button>
                <div class="check-item-note" id="note-${item.id}" style="display:${s?.note ? 'block' : 'none'}">
                    <textarea rows="2" placeholder="Note for this check item..." oninput="updateNote('${item.id}',this.value)">${escapeHtml(s?.note || '')}</textarea>
                </div>
            </div>
            <div class="check-item-status">
                <button class="status-btn ${s?.status === 'na' ? 'na' : ''}" onclick="setStatus('${item.id}','na')" title="Not applicable" aria-label="Not applicable"></button>
                <button class="status-btn ${s?.status === 'off' ? 'off' : ''}" onclick="setStatus('${item.id}','off')" title="Off everywhere" aria-label="Off everywhere"></button>
                <button class="status-btn ${s?.status === 'partial' ? 'partial' : ''}" onclick="setStatus('${item.id}','partial')" title="Not on all subscriptions" aria-label="Not on all subscriptions"></button>
                <button class="status-btn ${s?.status === 'on' ? 'on' : ''}" onclick="setStatus('${item.id}','on')" title="On all subscriptions" aria-label="On all subscriptions"></button>
                <div class="result-box ${s?.result ? 'result-' + s.result : ''}" onclick="cycleResult('${item.id}')" title="Result: ${s?.result === 'green' ? 'As expected' : s?.result === 'yellow' ? 'Not quite as expected' : s?.result === 'red' ? 'Not as expected, action required' : 'Not assessed'}"></div>
                <button class="followup-btn ${s?.followup ? 'followup-active' : ''}" onclick="toggleFollowup('${item.id}')" title="Mark for follow-up session">🔄</button>
            </div>
        </div>`;
}

// ============================================
// Status Management
// ============================================

function setStatus(itemId, status) {
    const cur = state.checks[itemId];
    if (status === 'off' && cur.status === 'off') {
        cur.status = 'on';
    } else {
        cur.status = cur.status === status ? null : status;
    }
    if (itemId.startsWith('def-cov')) {
        cur.result = cur.status === 'on' ? 'green' : null;
    }
    updateItemUI(itemId);
    updateAllCounts();
    updateConfigVisibility();
    autoSave();
}

function setQuestionStatus(itemId, value) {
    const cur = state.checks[itemId];
    cur.status = cur.status === value ? null : value;
    const isVerdict = itemId.endsWith('-verdict');
    const row = document.getElementById(`item-${itemId}`);
    if (row) {
        if (cur.status) row.setAttribute("data-status", cur.status);
        else row.removeAttribute("data-status");
        row.querySelectorAll('.question-btn').forEach(btn => {
            const btnValue = btn.getAttribute('onclick').match(/'([^']+)'\)$/)?.[1];
            const verdictCls = isVerdict ? ' verdict-q-' + btnValue : '';
            btn.className = `question-btn${verdictCls} ${cur.status === btnValue ? 'question-active question-' + btnValue : ''}`;
        });
    }
    updateAllCounts();
    updateConfigVisibility();
    autoSave();
}

function setInputValue(itemId, value) {
    const cur = state.checks[itemId];
    cur.inputValue = value;
    cur.status = value ? "on" : null;
    const row = document.getElementById(`item-${itemId}`);
    if (row) {
        if (cur.status) row.setAttribute("data-status", cur.status);
        else row.removeAttribute("data-status");
    }
    updateAllCounts();
    debouncedAutoSave();
}

function cycleResult(itemId) {
    const cur = state.checks[itemId];
    const cycle = [null, "green", "yellow", "red"];
    const idx = cycle.indexOf(cur.result || null);
    cur.result = cycle[(idx + 1) % cycle.length];
    updateItemUI(itemId);
    autoSave();
}

function toggleFollowup(itemId) {
    const cur = state.checks[itemId];
    cur.followup = !cur.followup;
    const row = document.getElementById(`item-${itemId}`);
    if (row) {
        const btn = row.querySelector('.followup-btn');
        if (btn) btn.classList.toggle('followup-active', cur.followup);
    }
    autoSave();
}

function toggleItemStatus(itemId, isOn) {
    const cur = state.checks[itemId];
    cur.status = isOn ? "on" : null;
    const row = document.getElementById(`item-${itemId}`);
    if (row) {
        if (cur.status) row.setAttribute("data-status", cur.status);
        else row.removeAttribute("data-status");
        const label = row.querySelector(".toggle-label");
        if (label) label.textContent = isOn ? "On" : "Off";
    }
    updateAllCounts();
    autoSave();
}

function cycleToggleStatus(itemId) {
    const cur = state.checks[itemId];
    if (!cur.status) {
        cur.status = "off";
    } else if (cur.status === "off") {
        cur.status = "on";
    } else if (cur.status === "on") {
        cur.status = "na";
    } else {
        cur.status = "off";
    }
    const row = document.getElementById(`item-${itemId}`);
    if (row) {
        if (cur.status) row.setAttribute("data-status", cur.status);
        else row.removeAttribute("data-status");
        const slider = row.querySelector('.toggle-slider');
        if (slider) {
            slider.classList.remove('unassessed', 'on', 'off', 'na');
            slider.classList.add(cur.status);
        }
        const label = row.querySelector(".toggle-label");
        const labelMap = { on: "On", off: "Off", na: "N/A" };
        if (label) label.textContent = labelMap[cur.status] || "–";
    }
    updateAllCounts();
    updateConfigVisibility();
    autoSave();
}

function scrollToSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        el.classList.add("highlight-flash");
        setTimeout(() => el.classList.remove("highlight-flash"), 1500);
    }
}

function updateSectionNote(section, value) {
    if (!state.sectionNotes) state.sectionNotes = {};
    state.sectionNotes[section] = value;
    debouncedAutoSave();
}

function cyclePlan(itemId, options) {
    const cur = state.checks[itemId];
    const cycle = [null, ...options];
    const idx = cycle.indexOf(cur.plan || null);
    cur.plan = cycle[(idx + 1) % cycle.length];
    const btn = document.getElementById(`plan-${itemId}`);
    if (btn) {
        btn.textContent = cur.plan || 'Plan?';
        btn.classList.toggle('plan-active', !!cur.plan);
    }
    autoSave();
}

function cycleStatus(itemId) {
    const cur = state.checks[itemId];
    const cycle = [null, "ok", "fail", "warning"];
    const idx = cycle.indexOf(cur.status);
    cur.status = cycle[(idx + 1) % cycle.length];
    updateItemUI(itemId);
    updateAllCounts();
    autoSave();
}

function updateItemUI(itemId) {
    const cur = state.checks[itemId];
    const row = document.getElementById(`item-${itemId}`);
    if (!row) return;

    if (cur.status) row.setAttribute("data-status", cur.status);
    else row.removeAttribute("data-status");

    const cycleBtn = row.querySelector(".cycle-btn");
    if (cycleBtn) {
        cycleBtn.className = `cycle-btn ${cur.status ? 'cycle-' + cur.status : ''}`;
        return;
    }

    const toggleSwitch = row.querySelector(".toggle-switch");
    if (toggleSwitch) {
        const slider = toggleSwitch.querySelector('.toggle-slider');
        if (slider) {
            slider.classList.remove('unassessed', 'on', 'off');
            if (cur.status) slider.classList.add(cur.status);
            else slider.classList.add('unassessed');
        }
        const label = toggleSwitch.querySelector('.toggle-label');
        if (label) label.textContent = cur.status === "on" ? "On" : cur.status === "off" ? "Off" : "–";
        return;
    }

    const buttons = row.querySelectorAll(".status-btn");
    const statuses = ["na", "off", "partial", "on"];
    buttons.forEach((btn, i) => {
        btn.className = `status-btn ${cur.status === statuses[i] ? statuses[i] : ''}`;
    });

    const resultBox = row.querySelector(".result-box");
    if (resultBox) {
        resultBox.className = `result-box ${cur.result ? 'result-' + cur.result : ''}`;
        const resultTitles = { green: "As expected", yellow: "Not quite as expected", red: "Not as expected, action required" };
        resultBox.title = `Result: ${resultTitles[cur.result] || 'Not assessed'}`;
    }
}

function updateNote(itemId, value) {
    state.checks[itemId].note = value;
    const toggle = document.querySelector(`#item-${itemId} .check-item-note-toggle`);
    if (toggle) toggle.textContent = value ? "📝 Edit note" : "+ Add note";
    debouncedAutoSave();
}

function toggleNote(itemId) {
    const noteEl = document.getElementById(`note-${itemId}`);
    if (noteEl) {
        const vis = noteEl.style.display !== "none";
        noteEl.style.display = vis ? "none" : "block";
        if (!vis) noteEl.querySelector("textarea").focus();
    }
}

// ============================================
// Counts & Progress
// ============================================

function updateAllCounts() {
    for (const [sectionKey, categories] of Object.entries(checklistData)) {
        for (const [catKey, items] of Object.entries(categories)) {
            const active = isConfigCategoryActive(catKey);
            let checked = 0;
            for (const item of items) {
                if (state.checks[item.id]?.status) checked++;
            }
            const el = document.getElementById(`cat-count-${catKey}`);
            if (el) {
                if (!active) {
                    el.textContent = '';
                } else if (state.catScope[catKey]) {
                    el.textContent = 'Out of scope';
                    el.style.background = "#fbe9e7";
                    el.style.color = "#d32f2f";
                } else {
                    el.textContent = `${checked}/${items.length}`;
                    if (checked === items.length && items.length > 0) {
                        el.style.background = "var(--success-light)";
                        el.style.color = "var(--success)";
                    } else {
                        el.style.background = "";
                        el.style.color = "";
                    }
                }
            }
        }
    }
}

function getSectionCounts(sectionKey) {
    const categories = checklistData[sectionKey];
    let checked = 0, total = 0;
    for (const [catKey, items] of Object.entries(categories)) {
        if (!isConfigCategoryActive(catKey)) continue;
        if (state.catScope[catKey]) continue;
        for (const item of items) {
            total++;
            if (state.checks[item.id]?.status) checked++;
        }
    }
    return { checked, total };
}

function updateOverviewCards() {
    const map = { defender: "defender", xdr: "xdr", retentie: "retentie", ama: "ama", logbronnen: "logbronnen" };
    for (const [key, section] of Object.entries(map)) {
        const { checked, total } = getSectionCounts(section);
        const el = document.getElementById(`overview-progress-${key}`);
        if (el) {
            const pct = total > 0 ? Math.round((checked / total) * 100) : 0;
            el.querySelector(".overview-bar-fill").style.width = `${pct}%`;
            el.querySelector(".overview-count").textContent = `${checked}/${total}`;
        }
    }
    renderScopeToggles();
}

function toggleScope(event, section) {
    event.stopPropagation();
    state.scope[section] = state.scope[section] === "out-of-scope" ? "" : "out-of-scope";
    renderScopeToggles();
    autoSave();
}

function toggleScopeFromResult(section) {
    const isOOS = state.scope[section] === "out-of-scope";
    state.scope[section] = isOOS ? "" : "out-of-scope";
    renderScopeToggles();
    updateResultSummary();
    autoSave();
}

function renderScopeToggles() {
    document.querySelectorAll(".scope-toggle").forEach(el => {
        const section = el.dataset.section;
        const val = state.scope[section] || "";
        el.className = "scope-toggle" + (val === "out-of-scope" ? " scope-out-of-scope" : "");
        const card = el.closest(".overview-card");
        if (card) card.classList.toggle("overview-card-oos", val === "out-of-scope");
    });

    for (const section of ["defender", "xdr", "ama", "retentie", "logbronnen"]) {
        const banner = document.getElementById(`oos-banner-${section}`);
        if (banner) {
            banner.style.display = state.scope[section] === "out-of-scope" ? "block" : "none";
        }
    }

    renderCatScopeToggles();
}

function toggleCatScope(catKey) {
    state.catScope[catKey] = !state.catScope[catKey];
    const items = document.getElementById(`cat-${catKey}`);
    if (items) {
        const chevron = items.closest('.category-group')?.querySelector('.chevron');
        if (state.catScope[catKey]) {
            items.classList.remove('expanded');
            if (chevron) chevron.textContent = '▸';
        } else {
            items.classList.add('expanded');
            if (chevron) chevron.textContent = '▾';
        }
    }
    renderCatScopeToggles();
    updateAllCounts();
    autoSave();
}

function toggleCatFollowup(catKey) {
    state.catFollowup[catKey] = !state.catFollowup[catKey];
    renderCatScopeToggles();
    autoSave();
}

function renderCatScopeToggles() {
    for (const catKey of ["log-tier2", "log-tier3"]) {
        const group = document.getElementById(`catgroup-${catKey}`);
        const scopeBtn = document.getElementById(`cat-scope-btn-${catKey}`);
        const followupBtn = document.getElementById(`cat-followup-btn-${catKey}`);
        if (!group) continue;
        const scoped = !!state.catScope[catKey];
        group.classList.toggle("catgroup-scoped", scoped);
        if (scopeBtn) scopeBtn.classList.toggle("active", scoped);
        if (followupBtn) followupBtn.classList.toggle("active", !!state.catFollowup[catKey]);
    }
}

function updateResultSummary() {
    const grid = document.getElementById("result-summary-grid");
    if (!grid) return;

    const sections = [
        { key: "defender", icon: "🛡️", title: "Defender for Cloud" },
        { key: "xdr", icon: "⚔️", title: "XDR Data" },
        { key: "ama", icon: "📡", title: "AMA Coverage" },
        { key: "retentie", icon: "🕐", title: "Retention" },
        { key: "logbronnen", icon: "🔌", title: "Sentinel Log Sources" }
    ];

    const verdictMap = {
        defender: "def-verdict",
        xdr: "xdr-verdict",
        ama: "ama-verdict",
        retentie: "ret-verdict",
        logbronnen: "log-verdict"
    };
    const verdictLabels = {
        on: { text: "Protection is in order", cls: "verdict-green" },
        partial: { text: "Protection needs attention", cls: "verdict-yellow" },
        off: { text: "Protection is not in order", cls: "verdict-red" }
    };

    let html = '';
    for (const sec of sections) {
        const isOOS = state.scope[sec.key] === "out-of-scope";
        const categories = checklistData[sec.key];
        const counts = { on: 0, partial: 0, off: 0, na: 0, total: 0 };

        let followupCount = 0;
        let catScopeCount = 0;
        let catFollowupCount = 0;
        for (const [catKey, items] of Object.entries(categories)) {
            if (!isConfigCategoryActive(catKey)) continue;
            if (catKey.endsWith('-verdict')) continue;
            if (state.catScope[catKey]) {
                catScopeCount++;
                if (state.catFollowup[catKey]) catFollowupCount++;
                continue;
            }
            for (const item of items) {
                if (item.showWhen) {
                    const parentStatus = state.checks[item.showWhen.item]?.status;
                    if (!item.showWhen.values.includes(parentStatus)) continue;
                }
                counts.total++;
                const s = state.checks[item.id];
                if (s?.status && counts.hasOwnProperty(s.status)) counts[s.status]++;
                if (s?.followup) followupCount++;
            }
        }

        const verdictId = verdictMap[sec.key];
        const verdictStatus = state.checks[verdictId]?.status;
        const verdict = verdictLabels[verdictStatus];

        if (isOOS) {
            html += `<div class="result-section-row result-section-oos">
                <div class="result-section-title">${sec.icon} ${sec.title}</div>
                <div class="result-section-oos-label">Out of Scope</div>
            </div>`;
        } else {
            const totalFollowup = followupCount + catFollowupCount;
            html += `<div class="result-section-row">
                <div class="result-section-title">${sec.icon} ${sec.title}</div>
                <div class="result-section-pills">
                    ${verdict ? `<span class="verdict-badge ${verdict.cls}">${verdict.text}</span>` : '<span class="verdict-badge verdict-none">No conclusion yet</span>'}
                    ${totalFollowup ? `<span class="result-pill pill-followup">🔄 ${totalFollowup} items identified for a follow-up session</span>` : ''}
                </div>
            </div>`;
        }
    }
    grid.innerHTML = html;
}

function getStatusCounts() {
    const counts = { on: 0, partial: 0, off: 0, na: 0, unchecked: 0, total: 0 };
    for (const s of Object.values(state.checks)) {
        counts.total++;
        if (s.status) counts[s.status]++;
        else counts.unchecked++;
    }
    return counts;
}

// ============================================
// Category Toggle
// ============================================

function toggleCategory(catKey) {
    const items = document.getElementById(`cat-${catKey}`);
    const header = items.previousElementSibling;
    const chevron = header.querySelector(".chevron");
    if (items.classList.contains("expanded")) {
        items.classList.remove("expanded");
        chevron.textContent = "▸";
    } else {
        items.classList.add("expanded");
        chevron.textContent = "▾";
    }
}

// ============================================
// Report
// ============================================

function generateReport() {
    state.notes.positive = document.getElementById("notes-positive")?.value || "";
    state.notes.attention = document.getElementById("notes-attention")?.value || "";
    state.notes.critical = document.getElementById("notes-critical")?.value || "";
    state.notes.actions = document.getElementById("notes-actions")?.value || "";

    document.getElementById("report-content").innerHTML = buildReportHTML();
    document.getElementById("screen-report").classList.add("active");
    window.scrollTo(0, 0);
}

function closeReport() {
    document.getElementById("screen-report").classList.remove("active");
}

function printReport() { window.print(); }

function exportJSON() {
    const data = captureState();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const name = (state.customer.name || "assessment").replace(/[^a-zA-Z0-9_-]/g, "_");
    const date = state.customer.date || new Date().toISOString().split("T")[0];
    a.download = `SecurityCheck_${name}_${date}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function exportExcel() {
    const statusLabels = { on: "On all subscriptions", partial: "Not on all subscriptions", off: "Off everywhere", na: "N/A", oos: "Out of scope" };
    const resultLabels = { green: "As expected", yellow: "Not quite as expected", red: "Not as expected, action required" };
    const sectionTitles = {
        defender: "Defender for Cloud",
        xdr: "XDR Data",
        ama: "AMA Coverage",
        retentie: "Retention",
        logbronnen: "Sentinel Log Sources"
    };

    const sep = ";";
    const esc = (v) => {
        if (v == null) return "";
        const s = String(v);
        return s.includes(sep) || s.includes('"') || s.includes('\n')
            ? '"' + s.replace(/"/g, '""') + '"' : s;
    };

    let rows = [];

    rows.push(["Security Posture & Operations Check"].map(esc).join(sep));
    rows.push(["Organisation", state.customer.name].map(esc).join(sep));
    rows.push(["Customer contact", state.customer.contact].map(esc).join(sep));
    rows.push(["Consultant", state.customer.consultant].map(esc).join(sep));
    rows.push(["Date", state.customer.date].map(esc).join(sep));
    rows.push("");

    rows.push(["Section", "Category", "Item", "Status", "Assessment", "Follow-up", "Note"].map(esc).join(sep));

    for (const [sectionKey, categories] of Object.entries(checklistData)) {
        if (state.scope[sectionKey] === "out-of-scope") {
            rows.push([sectionTitles[sectionKey] || sectionKey, "Out of Scope", "", "", "", "", ""].map(esc).join(sep));
            continue;
        }
        for (const [catKey, items] of Object.entries(categories)) {
            if (!isConfigCategoryActive(catKey)) continue;
            if (state.catScope[catKey]) {
                rows.push([
                    sectionTitles[sectionKey] || sectionKey,
                    reportCategoryTitles[catKey] || catKey,
                    "Out of scope for now",
                    "", "", state.catFollowup[catKey] ? "Yes" : "", ""
                ].map(esc).join(sep));
                continue;
            }
            for (const item of items) {
                if (item.showWhen) {
                    const parentStatus = state.checks[item.showWhen.item]?.status;
                    if (!item.showWhen.values.includes(parentStatus)) continue;
                }
                const s = state.checks[item.id];
                const toggleLabels = { on: "On", off: "Off", na: "N/A" };
                const statusLabel = item.type === "toggle"
                    ? (toggleLabels[s?.status] || "Not checked")
                    : item.type === "input"
                        ? (s?.inputValue ? `${s.inputValue} ${item.suffix || ''}`.trim() : "Not filled in")
                        : item.type === "question"
                            ? (item.options?.find(o => o.value === s?.status)?.label || "Not answered")
                            : (statusLabels[s?.status] || "Not filled in");
                rows.push([
                    sectionTitles[sectionKey] || sectionKey,
                    reportCategoryTitles[catKey] || catKey,
                    item.title,
                    statusLabel,
                    resultLabels[s?.result] || "",
                    s?.followup ? "Yes" : "",
                    s?.note || ""
                ].map(esc).join(sep));
            }
        }
    }

    rows.push("");

    if (state.notes.positive) { rows.push(["Positive findings", state.notes.positive].map(esc).join(sep)); }
    if (state.notes.attention) { rows.push(["Points of attention", state.notes.attention].map(esc).join(sep)); }
    if (state.notes.critical) { rows.push(["Critical findings", state.notes.critical].map(esc).join(sep)); }
    if (state.notes.actions) { rows.push(["Action items", state.notes.actions].map(esc).join(sep)); }

    const bom = "\uFEFF";
    const csv = bom + rows.join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const name = (state.customer.name || "assessment").replace(/[^a-zA-Z0-9_-]/g, "_");
    const date = state.customer.date || new Date().toISOString().split("T")[0];
    a.download = `SecurityCheck_${name}_${date}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

function buildReportHTML() {
    const dateStr = state.customer.date
        ? new Date(state.customer.date).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })
        : "Not specified";

    const sections = [
        { key: "defender", icon: "🛡️", title: "Defender for Cloud" },
        { key: "xdr", icon: "⚔️", title: "XDR Data" },
        { key: "ama", icon: "📡", title: "AMA Coverage" },
        { key: "retentie", icon: "🕐", title: "Retention" },
        { key: "logbronnen", icon: "🔌", title: "Sentinel Log Sources" }
    ];

    const verdictMap = {
        defender: "def-verdict",
        xdr: "xdr-verdict",
        ama: "ama-verdict",
        retentie: "ret-verdict",
        logbronnen: "log-verdict"
    };
    const verdictLabelsReport = {
        on: { text: "Protection is in order", cls: "color:#107c10" },
        partial: { text: "Protection needs attention", cls: "color:#ff8c00" },
        off: { text: "Protection is not in order", cls: "color:#d13438" }
    };

    let summaryRows = '';
    for (const sec of sections) {
        const isOOS = state.scope[sec.key] === "out-of-scope";
        const categories = checklistData[sec.key];

        if (isOOS) {
            summaryRows += `<tr style="opacity:0.5"><td style="font-weight:700">${sec.icon} ${sec.title}</td><td colspan="2" style="font-style:italic;color:#6d4c00">Out of Scope</td></tr>`;
        } else {
            const verdictId = verdictMap[sec.key];
            const verdictStatus = state.checks[verdictId]?.status;
            const verdict = verdictLabelsReport[verdictStatus];

            let followupCount = 0;
            let catFollowupCount = 0;
            for (const [catKey, items] of Object.entries(categories)) {
                if (!isConfigCategoryActive(catKey)) continue;
                if (catKey.endsWith('-verdict')) continue;
                if (state.catScope[catKey]) {
                    if (state.catFollowup[catKey]) catFollowupCount++;
                    continue;
                }
                for (const item of items) {
                    if (item.showWhen) {
                        const parentStatus = state.checks[item.showWhen.item]?.status;
                        if (!item.showWhen.values.includes(parentStatus)) continue;
                    }
                    const s = state.checks[item.id];
                    if (s?.followup) followupCount++;
                }
            }
            const totalFollowup = followupCount + catFollowupCount;

            summaryRows += `<tr>
                <td style="font-weight:700">${sec.icon} ${sec.title}</td>
                <td>${verdict ? `<span style="${verdict.cls};font-weight:600">${verdict.text}</span>` : '<span style="color:#605e5c;font-style:italic">No conclusion yet</span>'}</td>
                <td>${totalFollowup ? `🔄 ${totalFollowup} items identified for a follow-up session` : ''}</td>
            </tr>`;
        }
    }

    let html = `<div class="report-page">
        <div class="report-header">
            <h1>🛡️ Security Posture &amp; Operations Check</h1>
            <h2>${escapeHtml(state.customer.name)}</h2>
            <div class="report-meta">
                <span><strong>Date:</strong> ${escapeHtml(dateStr)}</span>
                <span><strong>Customer contact:</strong> ${escapeHtml(state.customer.contact || "–")}</span>
                <span><strong>Consultant:</strong> ${escapeHtml(state.customer.consultant || "–")}</span>
            </div>
        </div>
        <h3 style="margin-bottom:12px;font-size:18px;">Overview per section</h3>
        <table class="report-overview-table">
            <thead><tr>
                <th>Section</th><th>Conclusion</th><th>Follow-up</th>
            </tr></thead>
            <tbody>${summaryRows}</tbody>
        </table>`;

    const sectionTitles = {
        defender: "🛡️ Defender for Cloud",
        xdr: "⚔️ XDR Data",
        ama: "📡 AMA Coverage",
        retentie: "🕐 Retention",
        logbronnen: "🔌 Sentinel Log Sources"
    };

    for (const [key, title] of Object.entries(sectionTitles)) {
        if (state.scope[key] === "out-of-scope") continue;
        if (key === "defender") {
            const covItems = checklistData.defender["def-coverage"] || [];
            const covCounts = { on: 0, partial: 0, off: 0, na: 0, unchecked: 0 };
            const resCounts = { green: 0, yellow: 0, red: 0, none: 0 };
            for (const item of covItems) {
                const s = state.checks[item.id];
                const status = s?.status || "unchecked";
                covCounts[status]++;
                if (s?.result) resCounts[s.result]++;
                else resCounts.none++;
            }
            const statusParts = [];
            if (covCounts.on) statusParts.push(`<span style="color:#107c10;font-weight:600">${covCounts.on} On</span>`);
            if (covCounts.partial) statusParts.push(`<span style="color:#ff8c00;font-weight:600">${covCounts.partial} Not everywhere</span>`);
            if (covCounts.off) statusParts.push(`<span style="color:#d13438;font-weight:600">${covCounts.off} Off</span>`);
            if (covCounts.na) statusParts.push(`<span style="color:#605e5c;font-weight:600">${covCounts.na} N/A</span>`);
            if (covCounts.unchecked) statusParts.push(`<span style="color:#a19f9d;font-weight:600">${covCounts.unchecked} Not filled in</span>`);
            const resParts = [];
            if (resCounts.green) resParts.push(`<span style="color:#107c10;font-weight:600">🟢 ${resCounts.green} As expected</span>`);
            if (resCounts.yellow) resParts.push(`<span style="color:#ff8c00;font-weight:600">🟡 ${resCounts.yellow} Not quite as expected</span>`);
            if (resCounts.red) resParts.push(`<span style="color:#d13438;font-weight:600">🔴 ${resCounts.red} Action required</span>`);
            if (resCounts.none) resParts.push(`<span style="color:#a19f9d">${resCounts.none} Not assessed</span>`);
            html += `<div class="report-section"><h3>${title}</h3>
                <h4 style="margin:0 0 8px;font-size:15px;color:#323130;border-bottom:1px solid #edebe9;padding-bottom:6px">📊 Security Coverage Overview (${covItems.length} plans)</h4>
                <div style="margin-bottom:8px;font-size:14px"><strong>Status:</strong> ${statusParts.join(' &nbsp;·&nbsp; ')}</div>
                <div style="margin-bottom:20px;font-size:14px"><strong>Assessment:</strong> ${resParts.join(' &nbsp;·&nbsp; ')}</div>`;
            html += buildReportSectionContent(checklistData[key], key);
            html += `</div>`;
            continue;
        }
        html += buildReportSection(title, checklistData[key], key);
    }

    html += `<div class="report-section"><h3>📝 Findings &amp; Action Items</h3>`;
    if (state.notes.positive) html += `<div class="report-notes"><h4>🟢 Positive findings</h4>${escapeHtml(state.notes.positive)}</div>`;
    if (state.notes.attention) html += `<div class="report-notes" style="margin-top:8px"><h4>🟡 Points of attention</h4>${escapeHtml(state.notes.attention)}</div>`;
    if (state.notes.critical) html += `<div class="report-notes" style="margin-top:8px"><h4>🔴 Critical findings</h4>${escapeHtml(state.notes.critical)}</div>`;
    if (state.notes.actions) html += `<div class="report-notes" style="margin-top:8px"><h4>📌 Action items &amp; Next steps</h4>${escapeHtml(state.notes.actions)}</div>`;
    if (!state.notes.positive && !state.notes.attention && !state.notes.critical && !state.notes.actions) {
        html += `<p style="color:var(--neutral-secondary);font-style:italic">No notes recorded.</p>`;
    }
    html += `</div>`;

    let followupItems = [];
    let followupCategories = [];
    for (const sec of sections) {
        if (state.scope[sec.key] === "out-of-scope") continue;
        const categories = checklistData[sec.key];
        for (const [catKey, items] of Object.entries(categories)) {
            if (!isConfigCategoryActive(catKey)) continue;
            if (state.catScope[catKey]) {
                if (state.catFollowup[catKey]) {
                    followupCategories.push({ section: sec.title, catKey, catTitle: reportCategoryTitles[catKey] || catKey });
                }
                continue;
            }
            for (const item of items) {
                if (item.showWhen) {
                    const parentStatus = state.checks[item.showWhen.item]?.status;
                    if (!item.showWhen.values.includes(parentStatus)) continue;
                }
                const s = state.checks[item.id];
                if (s?.followup) followupItems.push({ section: sec.title, item });
            }
        }
    }
    const totalFollowups = followupItems.length + followupCategories.length;
    if (totalFollowups > 0) {
        html += `<div class="report-section"><h3>🔄 Follow-up Session</h3>`;
        html += `<p style="margin-bottom:12px;color:var(--neutral-secondary)">The following ${totalFollowups} item(s) are marked for a follow-up session:</p>`;
        for (const fc of followupCategories) {
            html += `<div class="report-item">
                <span class="report-followup-badge">🔄 Follow-up</span>
                <div class="report-item-text">
                    <div class="report-item-title">${escapeHtml(fc.catTitle)}</div>
                    <div class="report-item-note" style="color:var(--neutral-secondary);font-size:12px">${escapeHtml(fc.section)} — Out of scope for now</div>
                </div>
            </div>`;
        }
        for (const fi of followupItems) {
            const s = state.checks[fi.item.id];
            html += `<div class="report-item">
                <span class="report-followup-badge">🔄 Follow-up</span>
                <div class="report-item-text">
                    <div class="report-item-title">${escapeHtml(fi.item.title)}</div>
                    <div class="report-item-note" style="color:var(--neutral-secondary);font-size:12px">${escapeHtml(fi.section)}</div>
                    ${s?.note ? `<div class="report-item-note">${escapeHtml(s.note)}</div>` : ""}
                </div>
            </div>`;
        }
        html += `</div>`;
    }

    html += `<div class="report-footer">
        <p>This report was generated using the Security Posture &amp; Operations Check.</p>
        <p>Not an audit, not a score — just a structured review of what is enabled and whether it actually protects.</p>
        <p class="report-disclaimer">⚠️ <strong>Disclaimer:</strong> This report is generated by a configuration helper tool and is intended as a structured conversation aid only. It does not constitute a security audit, penetration test, or compliance assessment. No rights or guarantees of any kind can be derived from its contents. Always consult a qualified security professional for formal assessments.</p>
    </div></div>`;

    return html;
}

const reportCategoryTitles = {
    "def-access": "🔑 Access & Permissions",
    "def-coverage": "📊 Security Coverage & Plans",
    "def-cspm": "🔍 Cloud Security Posture Management (CSPM)",
    "def-cspm-config": "⚙️ Defender CSPM Configuration",
    "def-ai-config": "🤖 AI Services Configuration",
    "def-storage-config": "📦 Defender for Storage Configuration",
    "def-servers-config": "🖥️ Defender for Servers Configuration",
    "def-verdict": "📋 Assessment",
    "xdr-intake": "⚡ Setup",
    "xdr-sentinel": "📡 XDR Data to Sentinel",
    "xdr-datalake": "🗄️ Data Lake",
    "xdr-verdict": "📋 Assessment",
    "ret-intake": "📋 Retention Policy",
    "ret-policy": "⏱️ Retention Periods",
    "ret-check": "✅ Retention Check",
    "ret-xdr": "⏱️ XDR Data Retention",
    "ret-verdict": "📋 Assessment",
    "ama-intake": "💻 Setup",
    "ama-verdict": "📋 Assessment",
    "log-tier1": "⭐ Tier 1 - Minimum Recommended Connectors",
    "log-tier2": "🔷 Tier 2 - Extended Visibility",
    "log-tier3": "🔶 Tier 3 - Advanced / Specialised",
    "log-analytics": "🎯 Analytics Rules & Workbooks",
    "log-verdict": "📋 Assessment"
};

function buildReportSection(title, categories, sectionKey) {
    let html = `<div class="report-section"><h3>${title}</h3>`;
    html += buildReportSectionContent(categories, sectionKey);
    return html + `</div>`;
}

function buildReportSectionContent(categories, sectionKey) {
    let html = '';
    const sectionNote = state.sectionNotes?.[sectionKey];
    if (sectionNote) {
        html += `<div class="report-section-note"><em>${escapeHtml(sectionNote)}</em></div>`;
    }
    for (const [catKey, items] of Object.entries(categories)) {
        if (!isConfigCategoryActive(catKey)) continue;
        if (state.catScope[catKey]) {
            const catTitle = reportCategoryTitles[catKey];
            if (catTitle) {
                html += `<h4 style="margin:18px 0 8px;font-size:15px;color:#323130;border-bottom:1px solid #edebe9;padding-bottom:6px">${catTitle}</h4>`;
                html += `<div class="report-item"><div class="report-item-text"><div class="report-item-title" style="color:var(--neutral-secondary)">⛔ Out of scope for now${state.catFollowup[catKey] ? ' — 🔄 Follow-up session' : ''}</div></div></div>`;
            }
            continue;
        }
        const catTitle = reportCategoryTitles[catKey];
        if (catTitle) {
            const pageBreakClass = catKey === 'def-cspm-config' ? ' print-page-break' : '';
            html += `<h4 class="${pageBreakClass}" style="margin:18px 0 8px;font-size:15px;color:#323130;border-bottom:1px solid #edebe9;padding-bottom:6px">${catTitle}</h4>`;
        }
        for (const item of items) {
            if (item.showWhen) {
                const parentStatus = state.checks[item.showWhen.item]?.status;
                if (!item.showWhen.values.includes(parentStatus)) continue;
            }
            const s = state.checks[item.id];
            const status = s?.status || "unchecked";
            let label;
            if (item.type === "input") {
                label = s?.inputValue ? `${escapeHtml(s.inputValue)} ${item.suffix || ''}`.trim() : "Not filled in";
            } else if (item.type === "question") {
                const opt = item.options?.find(o => o.value === status);
                label = opt ? opt.label : "Not answered";
            } else if (item.type === "toggle") {
                label = { on: "On", off: "Off", na: "N/A", unchecked: "Not checked" }[status] || "Not checked";
            } else {
                label = { on: "On all subscriptions", partial: "Not on all subscriptions", off: "Off everywhere", na: "N/A", unchecked: "Not checked" }[status];
            }
            const resultLabel = s?.result ? { green: "🟢 As expected", yellow: "🟡 Not quite as expected", red: "🔴 Action required" }[s.result] : "";
            const followupLabel = s?.followup ? '<span class="report-followup-badge">🔄 Follow-up</span>' : '';
            html += `<div class="report-item">
                <div class="report-item-text">
                    <div class="report-item-title">${escapeHtml(item.title)}</div>
                    ${s?.note ? `<div class="report-item-note">${escapeHtml(s.note)}</div>` : ""}
                </div>
                <div class="report-item-badges">
                    <span class="report-badge ${status}">${escapeHtml(label)}</span>
                    ${resultLabel ? `<span class="report-result-badge">${resultLabel}</span>` : ''}
                    ${followupLabel}
                </div>
            </div>`;
        }
    }
    return html;
}

// ============================================
// Utilities
// ============================================

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}
