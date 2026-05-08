/* ============================================
   Security Posture & Operations Check
   Application Logic – 8-Step Wizard
   ============================================ */

// ============================================
// Checklist Data per Step
// ============================================

const checklistData = {
    // Step 3: Defender for Cloud
    defender: {
        "def-access": [
            { id: "def-access-1", title: "Security team heeft minimaal leesrechten op Defender for Cloud", desc: "Controleer of het security team (bijv. het Security Operations Center) ten minste de rol 'Security Reader' heeft op alle relevante subscriptions in Defender for Cloud. Zonder deze toegang kunnen alerts, recommendations en de secure score niet worden ingezien.", type: "question", options: [{ value: "on", label: "Ja, op alle subscriptions" }, { value: "partial", label: "Gedeeltelijk" }, { value: "off", label: "Nee" }] }
        ],
        "def-coverage": [
            { id: "def-cov-1a", title: "Foundational CSPM", desc: "Gratis plan met basale security recommendations, Secure Score en resource security posture." },
            { id: "def-cov-1b", title: "Defender CSPM", desc: "Betaald plan met agentless vulnerability scanning, data-aware security posture, cloud security graph, attack path analysis en advanced threat hunting.", link: "section-def-cspm-config" },
            { id: "def-cov-2", title: "Defender for Servers", desc: "Threat detection en geavanceerde bescherming voor Windows en Linux machines in Azure, AWS, GCP en on-premises omgevingen.", planOptions: ["P1", "P2"], link: "section-def-servers-config" },
            { id: "def-cov-3", title: "Defender for Containers", desc: "Environment hardening, vulnerability assessment en run-time protection van Kubernetes nodes en clusters." },
            { id: "def-cov-4", title: "Defender for Resource Manager", desc: "Detecteert ongebruikelijke en potentieel schadelijke activiteiten door automatische monitoring van resource management-operaties." },
            { id: "def-cov-5", title: "Defender for Storage", desc: "Bescherming tegen malware, storage-specifieke dreigingen, gevoelige data-lekkage en misbruik van Shared Access Signature (SAS) tokens.", link: "section-def-storage-config" },
            { id: "def-cov-6", title: "Defender for App Service", desc: "Identificeert aanvallen gericht op applicaties die draaien op App Service (web apps en API's)." },
            { id: "def-cov-7", title: "Defender for Databases", desc: "Beschermt het volledige database-landschap: Azure SQL, open-source relationele databases en Azure Cosmos DB." },
            { id: "def-cov-8", title: "Defender for Key Vault", desc: "Detecteert ongebruikelijke en potentieel schadelijke pogingen om Key Vault-accounts te benaderen of te misbruiken." },
            { id: "def-cov-9", title: "Defender for APIs", desc: "Zichtbaarheid in bedrijfskritische API's, verbetert API security posture, prioriteert vulnerability fixes en detecteert real-time dreigingen." },
            { id: "def-cov-10", title: "AI Services", desc: "Identificeert dreigingen voor generatieve AI-applicaties in real-time en helpt bij het reageren op beveiligingsincidenten.", link: "section-def-ai-config" }
        ],
        "def-cspm": [
            { id: "def-cspm-2", title: "Secure Score dashboard geeft actueel beeld", desc: "Open het Secure Score dashboard en controleer of de data recent is en het verwachte aantal resources toont.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "partial", label: "Enigszins" }, { value: "off", label: "Nee" }] },
            { id: "def-cspm-3", title: "Regulatory compliance is geconfigureerd", desc: "Controleer of relevante compliance standards (bijv. NIS2, ISO 27001, BIO) zijn toegewezen." },
            { id: "def-cspm-4", title: "Attack path analysis is beschikbaar en toont resultaten", desc: "Bekijk of er attack paths zijn geïdentificeerd (vereist Defender CSPM plan)." }
        ],
        "def-cspm-config": [
            { id: "def-cspm-cfg-1", title: "Agentless scanning for machines", desc: "Scant machines op geïnstalleerde software, kwetsbaarheden en secrets zonder agents of impact op machine performance.", type: "toggle" },
            { id: "def-cspm-cfg-2", title: "Kubernetes API access", desc: "Vereist voor agentless container posture, runtime vulnerability assessment en response actions.", type: "toggle" },
            { id: "def-cspm-cfg-3", title: "Registry access", desc: "Schakelt agentless vulnerability assessment in voor container registry images.", type: "toggle" },
            { id: "def-cspm-cfg-4", title: "Sensitive data threat detection", desc: "Verrijkt security alerts met data-gevoeligheid en risico, zodat security teams incidenten beter kunnen prioriteren.", type: "toggle" },
            { id: "def-cspm-cfg-5", title: "Cloud Infrastructure and Entitlements Management (CIEM)", desc: "Biedt zichtbaarheid in wie toegang heeft tot wat in cloud-omgevingen. Analyseert inactieve, excessieve en risicovolle toegangsrechten.", type: "toggle" },
            { id: "def-cspm-cfg-6", title: "API Security Posture Management", desc: "Uniforme zichtbaarheid in alle API's gepubliceerd via Azure API Management, App Services, Functions en Logic Apps.", type: "toggle" },
            { id: "def-cspm-cfg-7", title: "Serverless protection", desc: "Beschermt serverless workloads door continu resources te ontdekken, configuratie-posture te beoordelen en beveiligingsrisico's te detecteren.", type: "toggle" }
        ],
        "def-ai-config": [
            { id: "def-ai-cfg-1", title: "Enable suspicious prompt evidence", desc: "Toont de prompts tussen gebruiker en model voor diepere analyse van AI-gerelateerde alerts. Alleen verdachte segmenten worden opgenomen; gevoelige data wordt geredacteerd. Beschikbaar via Defender portal bij elke alert.", type: "toggle" },
            { id: "def-ai-cfg-2", title: "Enable data security for AI interactions", desc: "Geeft Microsoft Purview toegang tot prompts en responses (incl. metadata) voor data security en compliance: SIT-classificatie, DSPM for AI, Audit, Insider Risk Management, Communication Compliance en eDiscovery. Dit is een betaalde Purview-capability, niet inbegrepen in Defender for AI Services.", type: "toggle" },
            { id: "def-ai-cfg-3", title: "AI Model Security (Preview)", desc: "Biedt beveiligingsbeoordeling en bescherming van AI-modellen tegen aanvallen en misbruik.", type: "toggle" }
        ],
        "def-storage-config": [
            { id: "def-stor-cfg-1", title: "Malware scanning", desc: "Beschermt Azure Blob Storage door elke ge\u00fcploade blob in near real-time te scannen op malware. Pricing: $0.15/GB gescand, limiet: 5000 GB.", type: "toggle" },
            { id: "def-stor-cfg-2", title: "Sensitive data threat detection", desc: "Detecteert bedreigingen gericht op gevoelige data in Azure Storage accounts.", type: "toggle" }
        ],
        "def-servers-config": [
            { id: "def-srv-cfg-1", title: "Vulnerability assessment for machines", desc: "Schakelt vulnerability assessment in op Azure en hybride machines. VA tool: Microsoft Defender vulnerability management.", type: "toggle" },
            { id: "def-srv-cfg-2", title: "Guest Configuration agent (preview)", desc: "Controleert machines op security misconfiguraties in OS, applicaties en omgevingsinstellingen. Deployt de agent op Azure VM's; hybride machines via Azure Arc bevatten deze agent al.", type: "toggle" },
            { id: "def-srv-cfg-3", title: "Endpoint protection", desc: "Bescherming via Microsoft Defender for Endpoint, inclusief automatische agent deployment naar servers en security data-integratie met Defender for Cloud.", type: "toggle" },
            { id: "def-srv-cfg-4", title: "Agentless scanning for machines", desc: "Scant machines op ge\u00efnstalleerde software, kwetsbaarheden en secrets zonder agents of impact op machine performance.", type: "toggle" },
            { id: "def-srv-cfg-5", title: "File Integrity Monitoring", desc: "Monitoring van wijzigingen in kritieke bestanden, registry-waarden en configuraties op servers.", type: "toggle" }

        ],
        "def-verdict": [
            { id: "def-verdict", title: "Gezamenlijke conclusie", desc: "Geef een algehele beoordeling van de Defender for Cloud configuratie.", type: "question", options: [{ value: "on", label: "Bescherming is op orde" }, { value: "partial", label: "Bescherming behoeft aandacht" }, { value: "off", label: "Bescherming is niet op orde" }] }
        ]
    },

    // Step 4: XDR Data
    xdr: {
        "xdr-intake": [
            { id: "xdr-q-0", title: "Zitten jullie op de Unified portal?", desc: "De Unified Security Operations portal combineert Defender XDR en Sentinel in één interface.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }], link: "section-xdr-datalake", linkOff: "section-xdr-sentinel" },
            { id: "xdr-q-1", title: "Hebben jullie E5?", desc: "Microsoft 365 E5 licentie bevat Defender for Endpoint, Identity, Office 365 en Cloud Apps.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "partial", label: "Gedeeltelijk" }, { value: "off", label: "Nee" }] }
        ],
        "xdr-sentinel": [
            { id: "xdr-q-2", title: "Wordt er XDR data naar Sentinel gestuurd?", desc: "Controleer of de Microsoft Defender XDR connector is geconfigureerd om data naar Sentinel te sturen.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }] }
        ],
        "xdr-datalake": [
            { id: "xdr-q-dl", title: "Is Data Lake al enabled?", desc: "De Security Data Lake in de Unified portal maakt geavanceerde hunting en langetermijnopslag mogelijk.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }] }
        ],
        "xdr-verdict": [
            { id: "xdr-verdict", title: "Gezamenlijke conclusie", desc: "Geef een algehele beoordeling van de XDR Data configuratie.", type: "question", options: [{ value: "on", label: "Bescherming is op orde" }, { value: "partial", label: "Bescherming behoeft aandacht" }, { value: "off", label: "Bescherming is niet op orde" }] }
        ]
    },

    // Step 5: Retentie
    retentie: {
        "ret-intake": [
            { id: "ret-q-policy", title: "Hebben jullie een retentie policy?", desc: "Een retentie policy bepaalt hoelang data bewaard wordt.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }], link: "section-ret-policy" }
        ],
        "ret-policy": [
            { id: "ret-q-analytics", title: "Hoeveel dagen voor Analytics retentie?", desc: "De Analytics retentie bepaalt hoe lang data beschikbaar is voor queries en detectieregels.", type: "input", placeholder: "Aantal dagen", suffix: "dagen" },
            { id: "ret-q-total", title: "Hoeveel dagen in totaal?", desc: "De totale retentie bepaalt hoe lang data bewaard wordt inclusief Data Lake, Archive, ADX en andere oplossingen.", type: "input", placeholder: "Aantal dagen", suffix: "dagen" }
        ],
        "ret-check": [
            { id: "ret-q-match", title: "Kijkend naar de retentietijd in Sentinel, komt dit overeen met je verwachting?", desc: "Vergelijk de ingestelde retentie in Sentinel met de verwachting.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "partial", label: "Enigszins" }, { value: "off", label: "Nee" }] }
        ],
        "ret-xdr": [
            { id: "xdr-q-ret-analytics", title: "Wat is de Analytics retentie?", desc: "De Analytics retentie bepaalt hoe lang data beschikbaar is voor queries en detectieregels.", type: "input", placeholder: "Aantal dagen", suffix: "dagen" },
            { id: "xdr-q-ret-total", title: "Wat is de Total retentie?", desc: "De totale retentie bepaalt hoe lang data bewaard wordt inclusief Data Lake, Archive, ADX en andere oplossingen.", type: "input", placeholder: "Aantal dagen", suffix: "dagen" }
        ],
        "ret-verdict": [
            { id: "ret-verdict", title: "Gezamenlijke conclusie", desc: "Geef een algehele beoordeling van de Retentie configuratie.", type: "question", options: [{ value: "on", label: "Bescherming is op orde" }, { value: "partial", label: "Bescherming behoeft aandacht" }, { value: "off", label: "Bescherming is niet op orde" }] }
        ]
    },

    // Step 6: AMA Coverage
    ama: {
        "ama-intake": [
            { id: "ama-q-mde", title: "Zijn alle servers onboarded naar MDE?", desc: "Controleer of alle servers (Windows en Linux) zijn onboarded naar Microsoft Defender for Endpoint.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "partial", label: "Gedeeltelijk" }, { value: "off", label: "Nee" }] },
            { id: "ama-q-plan", title: "Welk MDE plan wordt gebruikt?", desc: "P1 biedt basis endpoint protection, P2 voegt EDR, automated investigation en advanced hunting toe.", type: "question", options: [{ value: "on", label: "P2" }, { value: "partial", label: "Mix" }, { value: "off", label: "P1" }], showWhen: { item: "ama-q-mde", values: ["on", "partial"] } },
            { id: "ama-q-agent", title: "Hebben de servers een AMA agent draaien voor extra informatie?", desc: "De Azure Monitor Agent verzamelt aanvullende logs zoals Security Events en Syslog.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }] },
            { id: "ama-q-sentinel", title: "Sturen jullie dit naar Sentinel?", desc: "Worden de door AMA verzamelde logs doorgestuurd naar de Sentinel workspace?", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }], showWhen: { item: "ama-q-agent", values: ["on"] } },
            { id: "ama-q-workbook", title: "Laat het coverage workbook dit zien?", desc: "Controleer in het Coverage workbook of alle servers zichtbaar zijn en data leveren.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "partial", label: "Gedeeltelijk" }, { value: "off", label: "Nee" }], showWhen: { item: "ama-q-sentinel", values: ["on"] } }
        ],
        "ama-verdict": [
            { id: "ama-verdict", title: "Gezamenlijke conclusie", desc: "Geef een algehele beoordeling van de AMA Coverage configuratie.", type: "question", options: [{ value: "on", label: "Bescherming is op orde" }, { value: "partial", label: "Bescherming behoeft aandacht" }, { value: "off", label: "Bescherming is niet op orde" }] }
        ]
    },

    // Step 7: Logbronnen
    logbronnen: {
        "log-tier1": [
            { id: "log-t1-xdr", title: "Microsoft Defender XDR", desc: "Levert DeviceEvents, AlertInfo, EmailEvents, IdentityLogonEvents en CloudAppEvents. Gratis ingestie naar Analytics tier voor M365 E5 klanten.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] },
            { id: "log-t1-entra", title: "Microsoft Entra ID", desc: "Levert SigninLogs, AuditLogs, AADNonInteractiveUserSignInLogs en RiskyUsers. Gratis data connector (Entra ID P2 vereist).", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] },
            { id: "log-t1-office", title: "Office 365", desc: "Levert OfficeActivity logs voor Exchange, SharePoint en Teams. Gratis data connector.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] },
            { id: "log-t1-activity", title: "Azure Activity Logs", desc: "Levert AzureActivity logs voor Azure resource management. Gratis data connector.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] },
            { id: "log-t1-secevt", title: "Windows Security Events", desc: "Levert SecurityEvent/WindowsEvent tabellen. 500 MB/dag per server gratis via Defender for Servers P2.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] },
            { id: "log-t1-syslog", title: "Syslog voor Linux", desc: "Levert Syslog tabel van Linux servers. Geen gratis ingestie, kosten op basis van volume.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] },
            { id: "log-t1-health", title: "Sentinel Health & Audit Diagnostics", desc: "Levert SentinelHealth en SentinelAudit tabellen. SentinelHealth is niet-factureerbaar.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] }
        ],
        "log-analytics": [
            { id: "log-an-3", title: "Geen rules met errors of disabled vanwege fouten", desc: "Controleer of alle analytics rules actief staan en er geen regels automatisch zijn uitgeschakeld door errors.", type: "question", options: [{ value: "off", label: "Nee" }, { value: "partial", label: "Gedeeltelijk" }, { value: "on", label: "Ja" }] }
        ],
        "log-verdict": [
            { id: "log-verdict", title: "Gezamenlijke conclusie", desc: "Geef een algehele beoordeling van de Sentinel Logbronnen configuratie.", type: "question", options: [{ value: "on", label: "Bescherming is op orde" }, { value: "partial", label: "Bescherming behoeft aandacht" }, { value: "off", label: "Bescherming is niet op orde" }] }
        ],
        "log-tier2": [
            { id: "log-t2-dfc", title: "Microsoft Defender for Cloud", desc: "SecurityAlert en SecurityRecommendation. SecurityAlert is gratis.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] },
            { id: "log-t2-akv", title: "Azure Key Vault", desc: "AKVAuditLogs voor toegang tot secrets, keys en certificaten.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] },
            { id: "log-t2-copilot", title: "Microsoft Copilot / AI Governance", desc: "OfficeActivity (Copilot) en AzureDiagnostics (OpenAI) voor AI-gebruik monitoring.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] },
            { id: "log-t2-purview", title: "Microsoft Purview (DLP & Information Protection)", desc: "MicrosoftPurviewInformationProtection voor data governance en DLP events.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] },
            { id: "log-t2-ti", title: "Threat Intelligence Platforms", desc: "ThreatIntelligenceIndicator voor IOC verrijking. Gratis data source.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] },
            { id: "log-t2-intune", title: "Microsoft Intune (Endpoint Management)", desc: "IntuneAuditLogs, IntuneOperationalLogs en IntuneDevices. Audit/operational logs gedeeltelijk gratis.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] },
            { id: "log-t2-3pid", title: "Third-Party Identity (Okta, CyberArk, etc.)", desc: "Vendor-specifieke tabellen via API of CEF/Syslog. Conditioneel — alleen bij gebruik.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] },
            { id: "log-t2-aws", title: "Amazon Web Services (AWS)", desc: "AWSCloudTrail, AWSGuardDuty en AWSVPCFlow voor multi-cloud zichtbaarheid.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] },
            { id: "log-t2-gcp", title: "Google Cloud Platform (GCP)", desc: "GCPAuditLogs voor multi-cloud zichtbaarheid.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] },
            { id: "log-t2-azfw", title: "Azure Firewall", desc: "AZFWNetworkRule, AZFWApplicationRule, AZFWDnsQuery en AZFWThreatIntel.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] },
            { id: "log-t2-waf", title: "Azure WAF (Application Gateway / Front Door)", desc: "ApplicationGatewayFirewallLog en FrontDoorWebApplicationFirewallLog.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] },
            { id: "log-t2-dns", title: "DNS Security Logs", desc: "DnsEvents en DnsInventory voor detectie van C2 en data exfiltratie.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] },
            { id: "log-t2-gsa", title: "Microsoft Global Secure Access", desc: "NetworkAccessTraffic voor ZTNA en Secure Service Edge monitoring.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] },
            { id: "log-t2-vnet", title: "VNet Flow Logs & Traffic Analytics", desc: "NTANetAnalytics en NTAIpDetails voor netwerk verkeer analyse.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] },
            { id: "log-t2-cef", title: "Third-Party Network & Proxy (CEF/Syslog)", desc: "CommonSecurityLog van firewalls en security appliances. 500 MB/dag via DfS P2.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] }
        ],
        "log-tier3": [
            { id: "log-t3-iis", title: "IIS / Web Server Logs", desc: "W3CIISLog voor web server monitoring. 500 MB/dag via DfS P2.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] },
            { id: "log-t3-mcas", title: "Defender for Cloud Apps (Standalone)", desc: "McasShadowItReporting voor shadow IT discovery.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] },
            { id: "log-t3-sap", title: "SAP", desc: "SAPAuditLog, ABAPAuditLog en SAPChangeDocuments. Apart gelicenseerd.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] },
            { id: "log-t3-sql", title: "SQL / Database Audit Logs", desc: "SQLSecurityAuditEvents en CDBDataPlaneRequests.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] },
            { id: "log-t3-3papp", title: "Third-Party Applications (ServiceNow, Salesforce, etc.)", desc: "Vendor-specifieke tabellen via API of CEF/Syslog. Conditioneel.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] },
            { id: "log-t3-collab", title: "Third-Party Collaboration (Slack, Zoom, etc.)", desc: "Vendor-specifieke tabellen via API of webhook. Conditioneel.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] },
            { id: "log-t3-custom", title: "Custom Applications (Crown Jewels)", desc: "Custom tabellen ({AppName}_CL) voor bedrijfskritische applicaties.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] },
            { id: "log-t3-devops", title: "Azure DevOps", desc: "AzureDevOpsAuditing voor CI/CD pipeline security.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] },
            { id: "log-t3-github", title: "GitHub Enterprise", desc: "GitHubAuditLogPolling voor source code en supply chain security.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] },
            { id: "log-t3-3pdevops", title: "Third-Party DevOps (GitLab, Jenkins, etc.)", desc: "Vendor-specifieke tabellen via API of webhook. Conditioneel.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] },
            { id: "log-t3-aks", title: "Azure Kubernetes Service (AKS) Audit", desc: "AKSAudit en AKSAuditAdmin voor container platform security.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] },
            { id: "log-t3-storage", title: "Azure Storage Analytics", desc: "StorageBlobLogs en StorageFileLogs voor data access monitoring.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] },
            { id: "log-t3-azdns", title: "Microsoft Defender for DNS (Azure DNS)", desc: "AzureDiagnostics (DNS) en DNSQueryLogs.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] },
            { id: "log-t3-wef", title: "Windows Forwarded Events (Advanced)", desc: "WindowsEvent voor PowerShell, Sysmon en AppLocker. 500 MB/dag via DfS P2.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] },
            { id: "log-t3-iot", title: "Microsoft Defender for IoT", desc: "SecurityAlert (IoT) voor OT/IoT monitoring. SecurityAlert is gratis.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] },
            { id: "log-t3-3pot", title: "Third-Party OT/IoT (Claroty, Nozomi, Armis)", desc: "Vendor-specifieke tabellen via CEF/Syslog. Conditioneel.", type: "question", options: [{ value: "on", label: "Ja" }, { value: "off", label: "Nee" }, { value: "partial", label: "Weet ik niet" }, { value: "oos", label: "Buiten scope" }] }
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
const STORAGE_KEY = "cloud-security-posture-check-assessments";
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

    // Auto-save notes (debounced)
    for (const field of ["positive", "attention", "critical", "actions"]) {
        const el = document.getElementById(`notes-${field}`);
        if (el) el.addEventListener("input", () => {
            state.notes[field] = el.value;
            debouncedAutoSave();
        });
    }

    // Auto-save on form input (debounced)
    for (const id of ["customerName", "customerContact", "sessionDate", "consultant"]) {
        const el = document.getElementById(id);
        if (el) el.addEventListener("input", () => debouncedAutoSave());
    }

    // Warn before closing with unsaved changes
    window.addEventListener("beforeunload", (e) => {
        if (currentAssessmentId) {
            e.preventDefault();
            e.returnValue = "";
        }
    });

    // Dev mode: auto-load first assessment and open report with ?test
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
    // Ensure customer data is fresh from form
    const nameEl = document.getElementById("customerName");
    if (nameEl) state.customer.name = nameEl.value.trim();
    const contactEl = document.getElementById("customerContact");
    if (contactEl) state.customer.contact = contactEl.value.trim();
    const dateEl = document.getElementById("sessionDate");
    if (dateEl) state.customer.date = dateEl.value;
    const consultEl = document.getElementById("consultant");
    if (consultEl) state.customer.consultant = consultEl.value.trim();

    // Capture notes
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

    // Need a name to save
    if (!state.customer.name) {
        goToStep(1);
        document.getElementById("customerName").focus();
        document.getElementById("customerName").style.borderColor = "var(--danger)";
        return;
    }

    // Create ID if new
    if (!currentAssessmentId) {
        currentAssessmentId = "apk-" + Date.now();
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

    // Restore customer
    state.customer = { ...data.customer };
    document.getElementById("customerName").value = state.customer.name || "";
    document.getElementById("customerContact").value = state.customer.contact || "";
    document.getElementById("sessionDate").value = state.customer.date || "";
    document.getElementById("consultant").value = state.customer.consultant || "";

    // Restore checks
    initChecksState();
    for (const [key, val] of Object.entries(data.checks || {})) {
        if (state.checks[key]) {
            state.checks[key] = { ...val };
        }
    }

    // Migrate old toggle items: null status → "off" (old code stored off as null)
    for (const categories of Object.values(checklistData)) {
        for (const items of Object.values(categories)) {
            for (const item of items) {
                if (item.type === "toggle" && !state.checks[item.id]?.status && data.checks?.[item.id]) {
                    state.checks[item.id].status = "off";
                }
            }
        }
    }

    // Restore notes
    state.notes = { ...data.notes };
    for (const field of ["positive", "attention", "critical", "actions"]) {
        const el = document.getElementById(`notes-${field}`);
        if (el) el.value = state.notes[field] || "";
    }

    // Restore scope
    state.scope = { defender: "", xdr: "", retentie: "", ama: "", logbronnen: "", ...data.scope };

    // Restore section notes
    state.sectionNotes = { ...data.sectionNotes };
    for (const sec of ["defender", "xdr", "ama", "retentie", "logbronnen"]) {
        const el = document.getElementById(`${sec}-general-notes`);
        if (el) el.value = state.sectionNotes[sec] || "";
    }

    // Restore category scope & followup
    state.catScope = { ...data.catScope };
    state.catFollowup = { ...data.catFollowup };

    // Re-render
    renderAllItems();
    updateAllCounts();
    renderSavedList();

    // Go to last step
    goToStep(data.currentStep || 2);
}

function deleteAssessment(id, event) {
    event.stopPropagation();
    const assessments = getAllAssessments();
    const name = assessments[id]?.customer?.name || "dit assessment";
    if (!confirm(`Weet je zeker dat je het assessment voor "${name}" wilt verwijderen?`)) return;

    delete assessments[id];
    saveAllAssessments(assessments);

    if (currentAssessmentId === id) {
        currentAssessmentId = null;
    }

    renderSavedList();
}

function startNewAssessment() {
    currentAssessmentId = null;

    // Reset state
    state.customer = { name: "", contact: "", date: "", consultant: "" };
    state.notes = { positive: "", attention: "", critical: "", actions: "" };
    state.scope = { defender: "", xdr: "", retentie: "", ama: "", logbronnen: "" };
    state.sectionNotes = {};
    for (const key of Object.keys(state.checks)) {
        state.checks[key] = { status: null, note: "" };
    }

    // Reset form
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
        container.innerHTML = '<p class="saved-empty">Geen opgeslagen assessments gevonden.</p>';
        return;
    }

    container.innerHTML = entries.map(([id, data]) => {
        const name = escapeHtml(data.customer?.name || "Onbekend");
        const date = data.customer?.date
            ? new Date(data.customer.date).toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric" })
            : "";
        const savedAt = data.savedAt
            ? new Date(data.savedAt).toLocaleString("nl-NL", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })
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
                        <span class="saved-item-progress">${pct}% voltooid</span>
                    </div>
                </div>
                <div class="saved-item-actions">
                    <div class="saved-item-bar">
                        <div class="saved-item-bar-fill" style="width:${pct}%"></div>
                    </div>
                    <button class="btn btn-danger-small" onclick="deleteAssessment('${id}', event)" title="Verwijderen">🗑️</button>
                </div>
            </div>`;
    }).join("") + `
        <div style="margin-top: 12px; text-align: center;">
            <button class="btn btn-secondary" onclick="startNewAssessment()">+ Nieuwe assessment starten</button>
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
    const original = btn.textContent;
    btn.textContent = manual ? "✅ Opgeslagen!" : "💾 Opgeslagen";
    btn.classList.add("save-flash");
    setTimeout(() => {
        btn.textContent = "💾 Opslaan";
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

    // Validate step 1 before proceeding
    if (currentStep === 1 && step > 1) {
        const name = document.getElementById("customerName").value.trim();
        if (!name) {
            document.getElementById("customerName").focus();
            document.getElementById("customerName").style.borderColor = "var(--danger)";
            return;
        }
        saveCustomerData();
    }

    // Save customer data when leaving step 1
    if (currentStep === 1) saveCustomerData();

    // Auto-create assessment ID when leaving step 1
    if (currentStep === 1 && !currentAssessmentId && state.customer.name) {
        currentAssessmentId = "apk-" + Date.now();
    }

    // Auto-save on step change
    autoSave();

    // Update result summary when entering step 8
    if (step === 8) updateResultSummary();

    // Update overview when entering step 2
    if (step === 2) updateOverviewCards();

    currentStep = step;

    // Update panels
    document.querySelectorAll(".step-panel").forEach(p => p.classList.remove("active"));
    document.getElementById(`step-${step}`).classList.add("active");

    // Update stepper
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
    document.getElementById("stepIndicator").textContent = `Stap ${currentStep} van ${TOTAL_STEPS}`;
    document.getElementById("btnPrev").style.visibility = currentStep === 1 ? "hidden" : "visible";

    const btnNext = document.getElementById("btnNext");
    if (currentStep === TOTAL_STEPS) {
        btnNext.style.visibility = "hidden";
    } else {
        btnNext.style.visibility = "visible";
        btnNext.textContent = "Volgende →";
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
    // Find all plan items that link to a config section
    for (const categories of Object.values(checklistData)) {
        for (const items of Object.values(categories)) {
            for (const item of items) {
                const s = state.checks[item.id];
                // link: show section when status is on/partial
                if (item.link) {
                    const sectionEl = document.getElementById(item.link);
                    if (sectionEl) {
                        const visible = s?.status === 'on' || s?.status === 'partial';
                        sectionEl.style.display = visible ? '' : 'none';
                    }
                }
                // linkOff: show section when status is off
                if (item.linkOff) {
                    const sectionEl = document.getElementById(item.linkOff);
                    if (sectionEl) {
                        sectionEl.style.display = s?.status === 'off' ? '' : 'none';
                    }
                }
            }
        }
    }
    // OR logic: section-ret-xdr visible when xdr-q-0=on OR xdr-q-2=on
    const retentieEl = document.getElementById('section-ret-xdr');
    if (retentieEl) {
        const q0 = state.checks['xdr-q-0']?.status;
        const q2 = state.checks['xdr-q-2']?.status;
        retentieEl.style.display = (q0 === 'on' || q2 === 'on') ? '' : 'none';
    }

    // Item-level showWhen visibility
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

// Build a map of config catKey -> parent item id from link/linkOff properties
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
    // OR logic for ret-xdr (XDR retentie in retentie tab)
    if (catKey === 'ret-xdr') {
        const q0 = state.checks['xdr-q-0']?.status;
        const q2 = state.checks['xdr-q-2']?.status;
        return q0 === 'on' || q2 === 'on';
    }
    const map = getConfigCatParentMap();
    const parent = map[catKey];
    if (!parent) return true; // not a config category, always active
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
                        ${s?.note ? '📝 Notitie bewerken' : '+ Notitie toevoegen'}
                    </button>
                    <div class="check-item-note" id="note-${item.id}" style="display:${s?.note ? 'block' : 'none'}">
                        <textarea rows="2" placeholder="Notitie bij dit controlepunt..." oninput="updateNote('${item.id}',this.value)">${escapeHtml(s?.note || '')}</textarea>
                    </div>
                </div>
                <div class="question-buttons">
                    ${buttons}
                    <button class="followup-btn ${s?.followup ? 'followup-active' : ''}" onclick="toggleFollowup('${item.id}')" title="Markeer voor vervolgsessie">🔄</button>
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
                        ${s?.note ? '📝 Notitie bewerken' : '+ Notitie toevoegen'}
                    </button>
                    <div class="check-item-note" id="note-${item.id}" style="display:${s?.note ? 'block' : 'none'}">
                        <textarea rows="2" placeholder="Notitie bij dit controlepunt..." oninput="updateNote('${item.id}',this.value)">${escapeHtml(s?.note || '')}</textarea>
                    </div>
                </div>
                <div class="input-field">
                    <input type="number" min="0" placeholder="${escapeHtml(item.placeholder || '')}" value="${escapeHtml(s?.inputValue || '')}" oninput="setInputValue('${item.id}', this.value)">
                    ${item.suffix ? `<span class="input-suffix">${escapeHtml(item.suffix)}</span>` : ''}
                    <button class="followup-btn ${s?.followup ? 'followup-active' : ''}" onclick="toggleFollowup('${item.id}')" title="Markeer voor vervolgsessie">🔄</button>
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
                        ${s?.note ? '📝 Notitie bewerken' : '+ Notitie toevoegen'}
                    </button>
                    <div class="check-item-note" id="note-${item.id}" style="display:${s?.note ? 'block' : 'none'}">
                        <textarea rows="2" placeholder="Notitie bij dit controlepunt..." oninput="updateNote('${item.id}',this.value)">${escapeHtml(s?.note || '')}</textarea>
                    </div>
                </div>
                <div class="check-item-status">
                    <button class="cycle-btn ${cycleClass}" onclick="cycleStatus('${item.id}')" title="Klik om status te wijzigen"></button>
                </div>
            </div>`;
    }

    if (item.type === "toggle") {
        const toggleState = s?.status === "on" ? "on" : s?.status === "off" ? "off" : s?.status === "na" ? "na" : "unassessed";
        const toggleLabel = { on: "Aan", off: "Uit", na: "N.v.t.", unassessed: "–" }[toggleState];
        return `
            <div class="check-item toggle-item" id="item-${item.id}" ${statusAttr}>
                <div class="check-item-content">
                    <div class="check-item-title">${escapeHtml(item.title)}</div>
                    <div class="check-item-desc">${escapeHtml(item.desc)}</div>
                    <button class="check-item-note-toggle" onclick="toggleNote('${item.id}')">
                        ${s?.note ? '📝 Notitie bewerken' : '+ Notitie toevoegen'}
                    </button>
                    <div class="check-item-note" id="note-${item.id}" style="display:${s?.note ? 'block' : 'none'}">
                        <textarea rows="2" placeholder="Notitie bij dit controlepunt..." oninput="updateNote('${item.id}',this.value)">${escapeHtml(s?.note || '')}</textarea>
                    </div>
                </div>
                <div class="toggle-switch" onclick="cycleToggleStatus('${item.id}')">
                    <span class="toggle-slider ${toggleState}" ></span>
                    <span class="toggle-label">${toggleLabel}</span>
                </div>
                <button class="followup-btn ${s?.followup ? 'followup-active' : ''}" onclick="toggleFollowup('${item.id}')" title="Markeer voor vervolgsessie">🔄</button>
            </div>`;
    }

    const linkHtml = item.link ? `<button class="link-badge" onclick="event.stopPropagation(); scrollToSection('${item.link}')" title="Ga naar configuratie">⚙️ Config</button>` : '';

    return `
        <div class="check-item" id="item-${item.id}" ${statusAttr}>
            <div class="check-item-content">
                <div class="check-item-title">${escapeHtml(item.title)}${item.planOptions ? `<button class="plan-badge ${s?.plan ? 'plan-active' : ''}" id="plan-${item.id}" onclick="cyclePlan('${item.id}', ${JSON.stringify(item.planOptions).replace(/"/g, '&quot;')})">${s?.plan || 'Plan?'}</button>` : ''}${linkHtml}</div>
                <div class="check-item-desc">${escapeHtml(item.desc)}</div>
                <button class="check-item-note-toggle" onclick="toggleNote('${item.id}')">
                    ${s?.note ? '📝 Notitie bewerken' : '+ Notitie toevoegen'}
                </button>
                <div class="check-item-note" id="note-${item.id}" style="display:${s?.note ? 'block' : 'none'}">
                    <textarea rows="2" placeholder="Notitie bij dit controlepunt..." oninput="updateNote('${item.id}',this.value)">${escapeHtml(s?.note || '')}</textarea>
                </div>
            </div>
            <div class="check-item-status">
                <button class="status-btn ${s?.status === 'na' ? 'na' : ''}" onclick="setStatus('${item.id}','na')" title="Niet van toepassing" aria-label="Niet van toepassing"></button>
                <button class="status-btn ${s?.status === 'off' ? 'off' : ''}" onclick="setStatus('${item.id}','off')" title="Overal uit" aria-label="Overal uit"></button>
                <button class="status-btn ${s?.status === 'partial' ? 'partial' : ''}" onclick="setStatus('${item.id}','partial')" title="Niet op alle subscripties" aria-label="Niet op alle subscripties"></button>
                <button class="status-btn ${s?.status === 'on' ? 'on' : ''}" onclick="setStatus('${item.id}','on')" title="Op alle subscriptions aan" aria-label="Op alle subscriptions aan"></button>
                <div class="result-box ${s?.result ? 'result-' + s.result : ''}" onclick="cycleResult('${item.id}')" title="Resultaat: ${s?.result === 'green' ? 'Zoals verwacht' : s?.result === 'yellow' ? 'Niet helemaal zoals verwacht' : s?.result === 'red' ? 'Niet zoals verwacht, actie vereist' : 'Niet beoordeeld'}"></div>
                <button class="followup-btn ${s?.followup ? 'followup-active' : ''}" onclick="toggleFollowup('${item.id}')" title="Markeer voor vervolgsessie">🔄</button>
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
    // Auto-set result for Defender coverage items
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
    // Cycle: null (unassessed) → off → on → na → off → on → na ...
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
        const labelMap = { on: "Aan", off: "Uit", na: "N.v.t." };
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

    // Cycle button
    const cycleBtn = row.querySelector(".cycle-btn");
    if (cycleBtn) {
        cycleBtn.className = `cycle-btn ${cur.status ? 'cycle-' + cur.status : ''}`;
        return;
    }

    // Toggle switch (3-state)
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

    // Standard buttons
    const buttons = row.querySelectorAll(".status-btn");
    const statuses = ["na", "off", "partial", "on"];
    buttons.forEach((btn, i) => {
        btn.className = `status-btn ${cur.status === statuses[i] ? statuses[i] : ''}`;
    });

    // Result box
    const resultBox = row.querySelector(".result-box");
    if (resultBox) {
        resultBox.className = `result-box ${cur.result ? 'result-' + cur.result : ''}`;
        const resultTitles = { green: "Zoals verwacht", yellow: "Niet helemaal zoals verwacht", red: "Niet zoals verwacht, actie vereist" };
        resultBox.title = `Resultaat: ${resultTitles[cur.result] || 'Niet beoordeeld'}`;
    }
}

function updateNote(itemId, value) {
    state.checks[itemId].note = value;
    const toggle = document.querySelector(`#item-${itemId} .check-item-note-toggle`);
    if (toggle) toggle.textContent = value ? "📝 Notitie bewerken" : "+ Notitie toevoegen";
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
                    el.textContent = 'Buiten scope';
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

    // Show/hide OOS banners on step panels
    for (const section of ["defender", "xdr", "ama", "retentie", "logbronnen"]) {
        const banner = document.getElementById(`oos-banner-${section}`);
        if (banner) {
            banner.style.display = state.scope[section] === "out-of-scope" ? "block" : "none";
        }
    }

    // Render category-level scope buttons
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
        { key: "retentie", icon: "🕐", title: "Retentie" },
        { key: "logbronnen", icon: "🔌", title: "Sentinel Logbronnen" }
    ];

    const verdictMap = {
        defender: "def-verdict",
        xdr: "xdr-verdict",
        ama: "ama-verdict",
        retentie: "ret-verdict",
        logbronnen: "log-verdict"
    };
    const verdictLabels = {
        on: { text: "Bescherming is op orde", cls: "verdict-green" },
        partial: { text: "Bescherming behoeft aandacht", cls: "verdict-yellow" },
        off: { text: "Bescherming is niet op orde", cls: "verdict-red" }
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

        // Get verdict
        const verdictId = verdictMap[sec.key];
        const verdictStatus = state.checks[verdictId]?.status;
        const verdict = verdictLabels[verdictStatus];

        if (isOOS) {
            html += `<div class="result-section-row result-section-oos">
                <div class="result-section-title">${sec.icon} ${sec.title}</div>
                <div class="result-section-oos-label">Out of Scope</div>
            </div>`;
        } else {
            const answered = counts.on + counts.off + counts.partial + counts.na;
            const unanswered = counts.total - answered;
            const pillLabels = sec.key === "defender"
                ? { on: "Op alle subscriptions aan", partial: "Niet op alle subscripties", off: "Overal uit", na: "Niet van toepassing" }
                : { on: "Ja", partial: "Deels/Onbekend", off: "Nee", na: "N.v.t." };
            const totalFollowup = followupCount + catFollowupCount;
            html += `<div class="result-section-row">
                <div class="result-section-title">${sec.icon} ${sec.title}</div>
                <div class="result-section-pills">
                    ${verdict ? `<span class="verdict-badge ${verdict.cls}">${verdict.text}</span>` : '<span class="verdict-badge verdict-none">Nog geen conclusie</span>'}
                    ${totalFollowup ? `<span class="result-pill pill-followup">🔄 ${totalFollowup} items geïdentificeerd voor een vervolgsessie</span>` : ''}
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
    const statusLabels = { on: "Op alle subscriptions aan", partial: "Niet op alle subscripties", off: "Overal uit", na: "N.v.t.", oos: "Buiten scope" };
    const resultLabels = { green: "Zoals verwacht", yellow: "Niet helemaal zoals verwacht", red: "Niet zoals verwacht, actie vereist" };
    const sectionTitles = {
        defender: "Defender for Cloud",
        xdr: "XDR Data",
        ama: "AMA Coverage",
        retentie: "Retentie",
        logbronnen: "Sentinel Logbronnen"
    };

    const sep = ";";
    const esc = (v) => {
        if (v == null) return "";
        const s = String(v);
        return s.includes(sep) || s.includes('"') || s.includes('\n')
            ? '"' + s.replace(/"/g, '""') + '"' : s;
    };

    let rows = [];

    // Header info
    rows.push(["Security Posture & Operations Check"].map(esc).join(sep));
    rows.push(["Organisatie", state.customer.name].map(esc).join(sep));
    rows.push(["Uitgevoerd met", state.customer.contact].map(esc).join(sep));
    rows.push(["Microsoft contactpersoon", state.customer.consultant].map(esc).join(sep));
    rows.push(["Datum", state.customer.date].map(esc).join(sep));
    rows.push("");

    // Checklist items
    rows.push(["Onderdeel", "Categorie", "Item", "Status", "Beoordeling", "Vervolgsessie", "Notitie"].map(esc).join(sep));

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
                    "Buiten scope voor nu",
                    "", "", state.catFollowup[catKey] ? "Ja" : "", ""
                ].map(esc).join(sep));
                continue;
            }
            for (const item of items) {
                if (item.showWhen) {
                    const parentStatus = state.checks[item.showWhen.item]?.status;
                    if (!item.showWhen.values.includes(parentStatus)) continue;
                }
                const s = state.checks[item.id];
                const toggleLabels = { on: "Aan", off: "Uit", na: "N.v.t." };
                const statusLabel = item.type === "toggle"
                    ? (toggleLabels[s?.status] || "Niet gecontroleerd")
                    : item.type === "input"
                        ? (s?.inputValue ? `${s.inputValue} ${item.suffix || ''}`.trim() : "Niet ingevuld")
                        : item.type === "question"
                            ? (item.options?.find(o => o.value === s?.status)?.label || "Niet beantwoord")
                            : (statusLabels[s?.status] || "Niet ingevuld");
                rows.push([
                    sectionTitles[sectionKey] || sectionKey,
                    reportCategoryTitles[catKey] || catKey,
                    item.title,
                    statusLabel,
                    resultLabels[s?.result] || "",
                    s?.followup ? "Ja" : "",
                    s?.note || ""
                ].map(esc).join(sep));
            }
        }
    }

    rows.push("");

    // Notes
    if (state.notes.positive) { rows.push(["Positieve bevindingen", state.notes.positive].map(esc).join(sep)); }
    if (state.notes.attention) { rows.push(["Aandachtspunten", state.notes.attention].map(esc).join(sep)); }
    if (state.notes.critical) { rows.push(["Kritieke bevindingen", state.notes.critical].map(esc).join(sep)); }
    if (state.notes.actions) { rows.push(["Actiepunten", state.notes.actions].map(esc).join(sep)); }

    // BOM for Excel UTF-8 recognition
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
        ? new Date(state.customer.date).toLocaleDateString("nl-NL", { year: "numeric", month: "long", day: "numeric" })
        : "Niet opgegeven";

    const sections = [
        { key: "defender", icon: "🛡️", title: "Defender for Cloud" },
        { key: "xdr", icon: "⚔️", title: "XDR Data" },
        { key: "ama", icon: "📡", title: "AMA Coverage" },
        { key: "retentie", icon: "🕐", title: "Retentie" },
        { key: "logbronnen", icon: "🔌", title: "Sentinel Logbronnen" }
    ];

    const verdictMap = {
        defender: "def-verdict",
        xdr: "xdr-verdict",
        ama: "ama-verdict",
        retentie: "ret-verdict",
        logbronnen: "log-verdict"
    };
    const verdictLabelsReport = {
        on: { text: "Bescherming is op orde", cls: "color:#107c10" },
        partial: { text: "Bescherming behoeft aandacht", cls: "color:#ff8c00" },
        off: { text: "Bescherming is niet op orde", cls: "color:#d13438" }
    };

    let summaryRows = '';
    for (const sec of sections) {
        const isOOS = state.scope[sec.key] === "out-of-scope";
        const categories = checklistData[sec.key];

        if (isOOS) {
            summaryRows += `<tr style="opacity:0.5"><td style="font-weight:700">${sec.icon} ${sec.title}</td><td colspan="2" style="font-style:italic;color:#6d4c00">Out of Scope</td></tr>`;
        } else {
            // Get verdict
            const verdictId = verdictMap[sec.key];
            const verdictStatus = state.checks[verdictId]?.status;
            const verdict = verdictLabelsReport[verdictStatus];

            // Count followups
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
                <td>${verdict ? `<span style="${verdict.cls};font-weight:600">${verdict.text}</span>` : '<span style="color:#605e5c;font-style:italic">Nog geen conclusie</span>'}</td>
                <td>${totalFollowup ? `🔄 ${totalFollowup} items geïdentificeerd voor een vervolgsessie` : ''}</td>
            </tr>`;
        }
    }

    let html = `<div class="report-page">
        <div class="report-header">

            <h1>🛡️ Security Posture &amp; Operations Check</h1>
            <h2>${escapeHtml(state.customer.name)}</h2>
            <div class="report-meta">
                <span><strong>Datum check:</strong> ${escapeHtml(dateStr)}</span>
                <span><strong>Contactpersoon klant:</strong> ${escapeHtml(state.customer.contact || "–")}</span>
                <span><strong>Consultant:</strong> ${escapeHtml(state.customer.consultant || "–")}</span>
            </div>
        </div>
        <h3 style="margin-bottom:12px;font-size:18px;">Overzicht per onderdeel</h3>
        <table class="report-overview-table">
            <thead><tr>
                <th>Onderdeel</th><th>Conclusie</th><th>Vervolgsessie</th>
            </tr></thead>
            <tbody>${summaryRows}</tbody>
        </table>`;

    const sectionTitles = {
        defender: "🛡️ Defender for Cloud",
        xdr: "⚔️ XDR Data",
        ama: "📡 AMA Coverage",
        retentie: "🕐 Retentie",
        logbronnen: "🔌 Sentinel Logbronnen"
    };

    for (const [key, title] of Object.entries(sectionTitles)) {
        if (state.scope[key] === "out-of-scope") continue;
        // Add Defender coverage summary table
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
            if (covCounts.on) statusParts.push(`<span style="color:#107c10;font-weight:600">${covCounts.on} Aan</span>`);
            if (covCounts.partial) statusParts.push(`<span style="color:#ff8c00;font-weight:600">${covCounts.partial} Niet overal</span>`);
            if (covCounts.off) statusParts.push(`<span style="color:#d13438;font-weight:600">${covCounts.off} Uit</span>`);
            if (covCounts.na) statusParts.push(`<span style="color:#605e5c;font-weight:600">${covCounts.na} N.v.t.</span>`);
            if (covCounts.unchecked) statusParts.push(`<span style="color:#a19f9d;font-weight:600">${covCounts.unchecked} Niet ingevuld</span>`);
            const resParts = [];
            if (resCounts.green) resParts.push(`<span style="color:#107c10;font-weight:600">🟢 ${resCounts.green} Zoals verwacht</span>`);
            if (resCounts.yellow) resParts.push(`<span style="color:#ff8c00;font-weight:600">🟡 ${resCounts.yellow} Niet helemaal zoals verwacht</span>`);
            if (resCounts.red) resParts.push(`<span style="color:#d13438;font-weight:600">🔴 ${resCounts.red} Actie vereist</span>`);
            if (resCounts.none) resParts.push(`<span style="color:#a19f9d">${resCounts.none} Niet beoordeeld</span>`);
            html += `<div class="report-section"><h3>${title}</h3>
                <h4 style="margin:0 0 8px;font-size:15px;color:#323130;border-bottom:1px solid #edebe9;padding-bottom:6px">📊 Overzicht Beveiligingsdekking (${covItems.length} plannen)</h4>
                <div style="margin-bottom:8px;font-size:14px"><strong>Status:</strong> ${statusParts.join(' &nbsp;·&nbsp; ')}</div>
                <div style="margin-bottom:20px;font-size:14px"><strong>Beoordeling:</strong> ${resParts.join(' &nbsp;·&nbsp; ')}</div>`;
            // Continue building the rest of Defender inside this section
            html += buildReportSectionContent(checklistData[key], key);
            html += `</div>`;
            continue;
        }
        html += buildReportSection(title, checklistData[key], key);
    }

    // Notes
    html += `<div class="report-section"><h3>📝 Bevindingen & Actiepunten</h3>`;
    if (state.notes.positive) html += `<div class="report-notes"><h4>🟢 Positieve bevindingen</h4>${escapeHtml(state.notes.positive)}</div>`;
    if (state.notes.attention) html += `<div class="report-notes" style="margin-top:8px"><h4>🟡 Aandachtspunten</h4>${escapeHtml(state.notes.attention)}</div>`;
    if (state.notes.critical) html += `<div class="report-notes" style="margin-top:8px"><h4>🔴 Kritieke bevindingen</h4>${escapeHtml(state.notes.critical)}</div>`;
    if (state.notes.actions) html += `<div class="report-notes" style="margin-top:8px"><h4>📌 Actiepunten & Vervolgstappen</h4>${escapeHtml(state.notes.actions)}</div>`;
    if (!state.notes.positive && !state.notes.attention && !state.notes.critical && !state.notes.actions) {
        html += `<p style="color:var(--neutral-secondary);font-style:italic">Geen notities vastgelegd.</p>`;
    }
    html += `</div>`;

    // Follow-up items
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
        html += `<div class="report-section"><h3>🔄 Vervolgsessie</h3>`;
        html += `<p style="margin-bottom:12px;color:var(--neutral-secondary)">De volgende ${totalFollowups} punt(en) zijn gemarkeerd voor een vervolgsessie:</p>`;
        for (const fc of followupCategories) {
            html += `<div class="report-item">
                <span class="report-followup-badge">🔄 Vervolg</span>
                <div class="report-item-text">
                    <div class="report-item-title">${escapeHtml(fc.catTitle)}</div>
                    <div class="report-item-note" style="color:var(--neutral-secondary);font-size:12px">${escapeHtml(fc.section)} — Buiten scope voor nu</div>
                </div>
            </div>`;
        }
        for (const fi of followupItems) {
            const s = state.checks[fi.item.id];
            html += `<div class="report-item">
                <span class="report-followup-badge">🔄 Vervolg</span>
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
        <p>Dit rapport is gegenereerd via de Security Posture &amp; Operations Check.</p>
        <p>Geen audit, geen rapportcijfer – maar samen kijken of wat ingeschakeld is, ook écht beschermd.</p>
        <p class="report-disclaimer">⚠️ <strong>Disclaimer:</strong> This report is generated by a configuration helper tool and is intended as a structured conversation aid only. It does not constitute a security audit, penetration test, or compliance assessment. No rights or guarantees of any kind can be derived from its contents. Always consult a qualified security professional for formal assessments.</p>
    </div></div>`;

    return html;
}

const reportCategoryTitles = {
    "def-access": "🔑 Toegang & Rechten",
    "def-coverage": "📊 Beveiligingsdekking & Plannen",
    "def-cspm": "🔍 Cloud Security Posture Management (CSPM)",
    "def-cspm-config": "⚙️ Defender CSPM Configuratie",
    "def-ai-config": "🤖 AI Services Configuratie",
    "def-storage-config": "📦 Defender for Storage Configuratie",
    "def-servers-config": "🖥️ Defender for Servers Configuratie",
    "def-verdict": "📋 Beoordeling",
    "xdr-intake": "⚡ Setup",
    "xdr-sentinel": "📡 XDR Data naar Sentinel",
    "xdr-datalake": "🗄️ Data Lake",
    "xdr-verdict": "📋 Beoordeling",
    "ret-intake": "📋 Retentie Policy",
    "ret-policy": "⏱️ Retentie Periodes",
    "ret-check": "✅ Retentie Controle",
    "ret-xdr": "⏱️ XDR Data Retentie",
    "ret-verdict": "📋 Beoordeling",


    "ama-intake": "💻 Setup",
    "ama-verdict": "📋 Beoordeling",
    "log-tier1": "⭐ Tier 1 - Minimaal Aanbevolen Connectors",
    "log-tier2": "🔷 Tier 2 - Extended Visibility",
    "log-tier3": "🔶 Tier 3 - Advanced / Specialised",
    "log-analytics": "🎯 Analytics Rules & Werkboeken",
    "log-verdict": "📋 Beoordeling"
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
                html += `<div class="report-item"><div class="report-item-text"><div class="report-item-title" style="color:var(--neutral-secondary)">⛔ Buiten scope voor nu${state.catFollowup[catKey] ? ' — 🔄 Vervolgsessie' : ''}</div></div></div>`;
            }
            continue;
        }
        const catTitle = reportCategoryTitles[catKey];
        if (catTitle) {
            const pageBreakClass = catKey === 'def-cspm-config' ? ' print-page-break' : '';
            html += `<h4 class="${pageBreakClass}" style="margin:18px 0 8px;font-size:15px;color:#323130;border-bottom:1px solid #edebe9;padding-bottom:6px">${catTitle}</h4>`;
        }
        for (const item of items) {
            // Skip items whose showWhen condition is not met
            if (item.showWhen) {
                const parentStatus = state.checks[item.showWhen.item]?.status;
                if (!item.showWhen.values.includes(parentStatus)) continue;
            }
            const s = state.checks[item.id];
            const status = s?.status || "unchecked";
            let label;
            if (item.type === "input") {
                label = s?.inputValue ? `${escapeHtml(s.inputValue)} ${item.suffix || ''}`.trim() : "Niet ingevuld";
            } else if (item.type === "question") {
                const opt = item.options?.find(o => o.value === status);
                label = opt ? opt.label : "Niet beantwoord";
            } else if (item.type === "toggle") {
                label = { on: "Aan", off: "Uit", na: "N.v.t.", unchecked: "Niet gecontroleerd" }[status] || "Niet gecontroleerd";
            } else {
                label = { on: "Op alle subscriptions aan", partial: "Niet op alle subscripties", off: "Overal uit", na: "N.v.t.", unchecked: "Niet gecontroleerd" }[status];
            }
            const resultLabel = s?.result ? { green: "🟢 Zoals verwacht", yellow: "🟡 Niet helemaal zoals verwacht", red: "🔴 Actie vereist" }[s.result] : "";
            const followupLabel = s?.followup ? '<span class="report-followup-badge">🔄 Vervolgsessie</span>' : '';
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
