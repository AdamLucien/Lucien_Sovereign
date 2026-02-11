import React, { useState, useEffect, useRef } from 'react';
import { Shield, Lock, ChevronRight, ArrowRight, X, Scan, Zap, Activity, Hexagon, Terminal, Cpu, AlertTriangle, CheckCircle, User, GitCommit, Layers, Crosshair, Fingerprint, Globe, Mail, Linkedin, Twitter, Database, Network, Eye, Building2, Map, Briefcase, FileText, Check, Send, ExternalLink, ClipboardCheck, Calendar, CreditCard, ShieldCheck, Box, Workflow, Target, Cog } from 'lucide-react';

// GLOBAL STATIC CONTENT - ABSOLUTE 1:1 PARITY ACROSS ALL LANGUAGES
const CONTENT_MAP = {
  en: {
    nav: { role: "System Architect", status: "SYSTEM ONLINE", slots: "SLOTS" },
    hero: { badge: "Architecture for Chaos", title1: "IMPOSE", title2: "ORDER.", subtitle: "Stop pretending you have control. You are just reacting.", subtitle_accent: "I architect true sovereignty.", cta: "Run Diagnostics" },
    audit: { phase: "Phase 01", title: "Identify The Fracture.", desc: "Describe the single biggest operational bottleneck holding you back.", promise: "I will reveal the hidden causality of your system's failure.", placeholder: "e.g. Information flows up, but decisions don't flow down...", button: "Execute Protocol", analyzing: "analyzing_structure...", outputHeader: "System Output", waiting: "Awaiting Input Data", deploy: "Deploy The Cure", connecting: "Connecting to core...", scanning: "Scanning for entropy...", calculating: "Calculating cost of failure...", complete: "DIAGNOSTIC COMPLETE", symptom: "This is just a symptom." },
    identity: { 
      phase: "Phase 02", title: "Identity Core.", role: "System Architect", 
      p1_title: "Perspective", p1_quote: "I have calibrated my baseline at absolute zero.", p1_desc: "While you panic about quarterly earnings, I operate with existential calm. High stakes for you are standard operations for me.", 
      p2_title: "Foundation", p2_head: "Unbreakable.", p2_desc: "I don't build for fair weather. I build systems designed to survive total collapse. Functionality over aesthetics. Always.", 
      p3_title: "Contract", p3_head: "Ownership.", p3_desc: "This isn't consulting. It's an alliance. If you enter my protocol, your problems become my mission. I bring solutions, not excuses.",
      bio: [
          { label: "Current Command", value: "Chief Architect @ ΛRCHΞON | Architect of Autonomy" },
          { label: "Engineering Core", value: "Causal AI / Structural Lean / Entropy Elimination" },
          { label: "Operational Scope", value: "Strategic Global Interventions" },
          { label: "Philosophy", value: "Antifragile Autonomy | Finding signal in chaos" }
      ],
      id_card: { status: "Status", active: "Operational", base: "Base", prague: "Prague / Global", id: "ID", code: "ΛRCH-SYS-26" }
    },
    capabilities: {
        phase: "Phase 03",
        title: "Operational Capabilities.",
        items: [
            { icon: "layers", title: "Systemic Reconstruction", desc: "Surgical realignment of operational structures. We strip the rot and build a lean, high-agency architecture." },
            { icon: "cpu", title: "Causal AI Backbone", desc: "Implementing AI that doesn't just predict, but understands causality. Turning data noise into decisive signal." },
            { icon: "shield", title: "Entropy Elimination", desc: "Identifying and removing human and procedural bottlenecks. Restoring flow where chaos resides." },
            { icon: "target", title: "Sovereign Frameworks", desc: "Designing self-governing business units that function without constant supervision. True autonomy." }
        ]
    },
    modus: { phase: "Phase 04", title: "The Protocol.", s1_title: "INFILTRATION", s1_desc: "Deep dive audit. I strip away the illusions and look at the raw data. We identify the single point of failure.", s2_title: "ARCHITECTURE", s2_desc: "Strategic design. We build the new protocol. Not a patch, but a complete structural realignment.", s3_title: "EXECUTION", s3_desc: "Ruthless implementation. We deploy the system. We test under pressure. I do not leave until the machine runs." },
    pricing: { 
      phase: "Phase 05", title: "Engagement.", 
      tiers: [
        { name: "Diagnosis", subtitle: "The Audit", price: "€499", desc: "90 minutes of structural analysis. Detection of leaks and inefficiencies.", features: ["Leak Detection", "Authority Check", "Immediate Triage"], btn: "Initiate" },
        { name: "Architect", subtitle: "The Blueprint", price: "€2,499", desc: "Complete reconstruction blueprint. Systematic guidance from fracture to autonomy.", features: ["Full System Documentation", "30-Day Execution Roadmap", "Direct Async Channel", "Structural Integrity Audit"], btn: "Initiate" },
        { name: "Sovereign", subtitle: "Total Control", price: "€7,500", desc: "Permanent operational overhaul. Direct intervention and onsite system takeover.", features: ["On-Site Strategic Deployment", "Shadow CEO Integration", "Absolute System Sovereignty", "Total Team & Protocol Purge"], btn: "Initiate" }
      ]
    },
    contact: { title: "Secure Channel.", desc: "Direct encrypted line. For high-value inquiries only.", loc: "Prague / Global Operations" },
    modal: { secure: "Secure Channel", email: "Business Email", placeholder: "name@company.com", processing: "Processing...", confirm: "Confirm Selection", encrypted: "256-Bit Encrypted", close: "Close Terminal" },
    briefing: {
        title: "Transmission Success.",
        subtitle: "Deployment Protocol Active",
        steps: [
            { icon: "credit", head: "01. Settlement", desc: "Digital invoice dispatched. Complete payment to secure the operational slot." },
            { icon: "shield", head: "02. Intel Protocol", desc: "A list of required structural data will be sent to your secure node. Prepare for transfer." },
            { icon: "calendar", head: "03. Strategic Uplink", desc: "Use the coordinated link in the follow-up to finalize the first tactical session." }
        ]
    },
    contactModal: { title: "Direct Uplink", nameLabel: "Identification", msgLabel: "Transmission Content", send: "Transmit Message", sent: "Message Encrypted & Sent." },
    footer: { linkText: "ΛRCHΞON Protocol", rights: "All Rights Reserved.", legal: "High-Integrity Sovereignty. Fair Use Applied. Secured by Lucien Systems." }
  },
  cs: {
    nav: { role: "Systémový Architekt", status: "SYSTÉM ONLINE", slots: "MÍSTA" },
    hero: { badge: "Architektura pro Chaos", title1: "NASTOLIT", title2: "ŘÁD.", subtitle: "Přestaňte předstírat kontrolu. Jen reagujete na chaos.", subtitle_accent: "Já projektuji skutečnou suverenitu.", cta: "Spustit Diagnostiku" },
    audit: { phase: "Fáze 01", title: "Identifikace Fraktury.", desc: "Popište to kritické úzké hrdlo, které brzdí celou operaci.", promise: "Odhalím skrytou kauzalitu selhání vašeho systému.", placeholder: "např. Můj tým čeká na schválení každé maličkosti...", button: "Spustit Protokol", analyzing: "analyzuji_strukturu...", outputHeader: "Výstup Systému", waiting: "Čekám na Vstupní Data", deploy: "Nasadit Léčbu", connecting: "Připojování k jádru...", scanning: "Skenování entropie...", calculating: "Kalkulace ceny selhání...", complete: "DIAGNOSTIKA DOKONČENA", symptom: "Toto je pouze symptom." },
    identity: { 
      phase: "Fáze 02", title: "Jádro Identity.", role: "Systémový Architekt", 
      p1_title: "Perspektiva", p1_quote: "Kalibroval jsem svou normu na absolutní nulu.", p1_desc: "Zatímco vy panikaříte nad kvartálními výsledky, já operuji s existenciálním klidem. Co je pro vás stres, to je pro mě standard.", 
      p2_title: "Základy", p2_head: "Nezničitelnost.", p2_desc: "Nestavím pro hezké počasí. Stavím systémy designované tak, aby přežily totální kolaps. Funkčnost nad formou. Vždy.", 
      p3_title: "Kontrakt", p3_head: "Vlastnictví.", p3_desc: "Toto není poradenství, ale anexe problému. Vstupem do protokolu přebírám odpovědnost za eliminaci chyby. Přináším řešení, ne výmluvy.",
      bio: [
          { label: "Aktuální Velení", value: "Chief Architect @ ΛRCHΞON | Architekt Autonomie" },
          { label: "Inženýrské Jádro", value: "Kauzální AI / Strukturální Lean / Eliminace Entropie" },
          { label: "Operační Dosah", value: "Globální Strategické Intervence" },
          { label: "Filozofie", value: "Antifragilní Autonomie | Hledání signálu v chaosu" }
      ],
      id_card: { status: "Status", active: "Operační", base: "Základna", prague: "Praha / Globální", id: "ID", code: "AKL-SYS-26" }
    },
    capabilities: {
        phase: "Fáze 03",
        title: "Operační Kapacity.",
        items: [
            { icon: "layers", title: "Systémová Rekonstrukce", desc: "Chirurgické srovnání operačních struktur. Odstraníme hnilobu a postavíme štíhlou, akceschopnou architekturu." },
            { icon: "cpu", title: "Kauzální AI Integrace", desc: "Implementace AI, která nejen predikuje, ale chápe kauzalitu. Přeměna datového šumu na rozhodující signál." },
            { icon: "shield", title: "Eliminace Entropie", desc: "Identifikace a odstranění lidských a procesních úzkých hrdel. Obnova průtoku tam, kde vládne chaos." },
            { icon: "target", title: "Suverénní Frameworky", desc: "Projektování samosprávných byznys jednotek, které fungují bez neustálého dohledu. Skutečná autonomie." }
        ]
    },
    modus: { phase: "Fáze 04", title: "Protokol.", s1_title: "INFILTRACE", s1_desc: "Forenzní dekonstrukce dat. Odstraním nánosy domněnek a jdu po tvrdých datech.", s2_title: "ARCHITEKTURA", s2_desc: "Strategický design nového řádu. Ne záplatu, ale kompletní strukturální přestavbu.", s3_title: "EXEKUCE", s3_desc: "Nemilosrdná implementace systému. Neodejdu, dokud stroj neběží sám." },
    pricing: { 
      phase: "Fáze 05", title: "Spolupráce.", 
      tiers: [ 
        { name: "Diagnóza", subtitle: "Audit", price: "€499", desc: "90 minut strukturální analýzy. Detekce úniků a neefektivity.", features: ["Detekce Úniků", "Okamžitá Triage"], btn: "Iniciovat" }, 
        { name: "Architekt", subtitle: "Blueprint", price: "€2,499", desc: "Kompletní blueprint rekonstrukce. Systematické vedení od fraktury k autonomii.", features: ["Kompletní systémová dokumentace", "30-denní roadmapa exekuce", "Přímý asynchronní kanál", "Audit strukturální integrity"], btn: "Iniciovat" }, 
        { name: "Suverén", subtitle: "Kontrola", price: "€7,500", desc: "Permanentní operační převrat. Přímá intervence a on-site převzetí systému.", features: ["On-Site strategické nasazení", "Integrace stínového CEO", "Absolutní suverenita systému", "Totální čistka týmu a protokolů"], btn: "Iniciovat" } 
      ] 
    },
    contact: { title: "Zabezpečený Kanál.", desc: "Přímá linka. Pouze pro bonitní poptávky.", loc: "Praha / Globální" },
    modal: { secure: "Zabezpečený Kanál", email: "Pracovní Email", placeholder: "jmeno@firma.cz", processing: "Zpracovávám...", confirm: "Potvrdit Výběr", encrypted: "256-Bit Šifrování", close: "Ukončit Terminál" },
    briefing: {
        title: "Přenos Úspěšný.",
        subtitle: "Protokol Nasazení Aktivní",
        steps: [
            { icon: "credit", head: "01. Vyrovnání", desc: "Digitální faktura odeslána. Proveďte úhradu pro blokaci operačního okna." },
            { icon: "shield", head: "02. Intel Protokol", desc: "Seznam požadovaných strukturálních dat bude odeslán na váš uzel. Připravte data k přenosu." },
            { icon: "calendar", head: "03. Strategické Spojení", desc: "Použijte koordinovaný odkaz v následné zprávě k finalizaci termínu intervence." }
        ]
    },
    contactModal: { title: "Přímé Spojení", nameLabel: "Identifikace", msgLabel: "Obsah Přenosu", send: "Vyslat Zprávu", sent: "Zpráva Zašifrována & Odeslána." },
    footer: { linkText: "ΛRCHΞON Protokol", rights: "Všechna práva vyhrazena.", legal: "Suverenita s vysokou integritou. Fair Use uplatněno. Pod záštitou Lucien Systems." }
  },
  de: {
    nav: { role: "Systemarchitekt", status: "SYSTEM ONLINE", slots: "PLÄTZE" },
    hero: { badge: "Architektur für Chaos", title1: "ORDNUNG", title2: "ERZWINGEN.", subtitle: "Hören Sie auf, Kontrolle vorzutäuschen. Sie reagieren nur.", subtitle_accent: "Ich entwerfe wahre Souveränität.", cta: "Diagnose Starten" },
    audit: { phase: "Phase 01", title: "Bruchstelle.", desc: "Engpass beschreiben.", promise: "Ich werde die Kausalität aufdecken.", placeholder: "z.B. Mein Team...", button: "Protokoll Ausführen", analyzing: "analysiere...", outputHeader: "Systemausgabe", waiting: "Warten...", deploy: "Lösung...", connecting: "Verbindung...", scanning: "Scan...", calculating: "Berechnung...", complete: "DIAGNOSE BEENDET", symptom: "Nur ein Symptom." },
    identity: { 
      phase: "Phase 02", title: "Identitätskern.", role: "Systemarchitekt", 
      p1_title: "Perspective", p1_quote: "Basislinie auf absolut Null kalibriert.", p1_desc: "Während Sie in Panik geraten, operiere ich s calm.", 
      p2_title: "Fundament", p2_head: "Unzerbrechlich.", p2_desc: "Ich baue Systeme, die den Zusammenbruch überleben. Funktionalität vor Ästhetik.", 
      p3_title: "Contract", p3_head: "Eigentum.", p3_desc: "Keine Beratung, sondern Allianz.",
      bio: [
          { label: "Aktuelles Kommando", value: "Chief Architect @ ΛRCHΞON | Architect of Autonomy" },
          { label: "Kernkompetenz", value: "Causal AI / Structural Lean / Entropy Elimination" },
          { label: "Reichweite", value: "Strategische Globale Interventionen" },
          { label: "Philosophie", value: "Antifragile Autonomie | Signale im Chaos finden" }
      ],
      id_card: { status: "Status", active: "Operativ", base: "Basis", prague: "Prag / Global", id: "ID", code: "ΛRCH-SYS-01" }
    },
    capabilities: {
        phase: "Phase 03",
        title: "Operative Kapazitäten.",
        items: [
            { icon: "layers", title: "Systemische Rekonstruktion", desc: "Chirurgische Neuausrichtung operativer Strukturen. Wir bauen eine schlanke, handlungsfähige Architektur." },
            { icon: "cpu", title: "Causal AI Backbone", desc: "Implementierung von KI, die Kausalität versteht. Verwandlung von Datenrauschen in Signale." },
            { icon: "shield", title: "Entropie-Eliminierung", desc: "Identifizierung und Beseitigung menschlicher und prozeduraler Engpässe." },
            { icon: "target", title: "Souveräne Frameworks", desc: "Entwurf selbstverwalteter Geschäftseinheiten, die ohne ständige Aufsicht funktionieren." }
        ]
    },
    modus: { phase: "Phase 04", title: "Das Protokoll.", s1_title: "INFILTRATION", s1_desc: "Datenprüfung.", s2_title: "ARCHITEKTUR", s2_desc: "Design.", s3_title: "EXEKUTION", s3_desc: "Umsetzung." },
    pricing: { 
      phase: "Phase 05", title: "Mandat.", 
      tiers: [
        { name: "Diagnose", subtitle: "Audit", price: "€499", desc: "Analyse.", features: ["Leckerkennung", "Immediate Triage"], btn: "Initiieren" }, 
        { name: "Architect", subtitle: "Blueprint", price: "€2,499", desc: "Komplett.", features: ["Vollständige Systemdokumentation", "30-Tage Roadmap", "Direkter asynchroner Kanal", "Strukturelle Verifizierung"], btn: "Initiieren" }, 
        { name: "Sovereign", subtitle: "Total Control", price: "€7,500", desc: "Übernahme.", features: ["Vor-Ort Strategischer Einsatz", "Shadow CEO Integration", "Absolute Systemsouveränität", "Total-Purge"], btn: "Initiieren" }
      ] 
    },
    contact: { title: "Sicherer Kanal.", desc: "Direktleitung.", loc: "Prag / Global" },
    modal: { secure: "Sicherer Kanal", email: "E-Mail", placeholder: "name@company.com", processing: "Verarbeitung...", confirm: "Bestätigen", encrypted: "256-Bit", close: "Schließen" },
    briefing: {
        title: "Übertragung Erfolgreich.",
        subtitle: "Einsatzprotokoll Aktiv",
        steps: [
            { icon: "credit", head: "01. Abrechnung", desc: "Rechnung gesendet. Zahlung abschließen, um den Slot zu sichern." },
            { icon: "shield", head: "02. Intel Protokoll", desc: "Anforderung für Strukturdaten folgt auf Ihren sicheren Knoten." },
            { icon: "calendar", head: "03. Strategische Verbindung", desc: "Koordinationslink zur Terminierung der Sitzung nutzen." }
        ]
    },
    contactModal: { title: "Direkte Verbindung", nameLabel: "Identifikation", msgLabel: "Inhalt", send: "Senden", sent: "Gesendet." },
    footer: { linkText: "ΛRCHΞON Protokoll", rights: "Alle Rechte vorbehalten.", legal: "Hochintegre Souveränität. Fair Use. Lucien Systems." }
  },
  uk: {
    nav: { role: "Системний Архітектор", status: "СИСТЕМА ОНЛАЙН", slots: "МІСЦЯ" },
    hero: { badge: "Архітектура для Хаосу", title1: "ВСТАНОВИТИ", title2: "ПОРЯДОК.", subtitle: "Припиніть вдавати контроль. Ви просто реагуєте на хаос.", subtitle_accent: "Я проектую справжній суверенітет.", cta: "Діагностика" },
    audit: { phase: "Фаза 01", title: "Розпізнавання Розлому.", desc: "Опишіть головне вузьке місце, що вас стримує.", promise: "Я розкрию причинність невдачі.", placeholder: "напр. Інформація...", button: "Виконати Протокол", analyzing: "аналіз...", outputHeader: "Вивід Системи", waiting: "Очікування...", deploy: "Рішення...", connecting: "Підключення...", scanning: "Сканування...", calculating: "Розрахунок...", complete: "ЗАВЕРШЕНО", symptom: "Це лише симптом." },
    identity: { 
      phase: "Фаза 02", title: "Ядро Ідентичності.", role: "Системний Архітектор", 
      p1_title: "Перспектива", p1_quote: "Я відкалібрував свою норму на абсолютний нуль.", p1_desc: "Поки ви панікуєте через звіти, я дію з екзистенційним спокоєм.", 
      p2_title: "Фундамент", p2_head: "Незламність.", p2_desc: "Я будую системи для виживання після повного колапсу.", 
      p3_title: "Контракт", p3_head: "Власність.", p3_desc: "Відповідальність.",
      bio: [
          { label: "Командування", value: "Chief Architect @ ΛRCHΞON | Architect of Autonomy" },
          { label: "Ядро", value: "Causal AI / Structural Lean / Entropy Elimination" },
          { label: "Масштаб", value: "Стратегічні Глобальні Інтервенції" },
          { label: "Філософія", value: "Антикрихка Автономія | Сигнал у Хаосі" }
      ],
      id_card: { status: "Status", active: "Активний", base: "База", prague: "Прага / Global", id: "ID", code: "ΛRCH-SYS-26" }
    },
    capabilities: {
        phase: "Фаза 03",
        title: "Операційні Можливості.",
        items: [
            { icon: "layers", title: "Системна Реконструкція", desc: "Хірургічне вирівнювання операційних структур. Ми прибираємо гниль і будуємо чітку архітектуру." },
            { icon: "cpu", title: "Causal AI Backbone", desc: "Впровадження ШІ, який розуміє причинно-наслідкові зв'язки. Перетворення шуму на сигнал." },
            { icon: "shield", title: "Елімінація Ентропії", desc: "Виявлення та усунення людських та процедурних вузьких місць. Відновлення потоку." },
            { icon: "target", title: "Суверенні Фреймворки", desc: "Проектування самоврядних бізнес-одиниць, що працюють без нагляду." }
        ]
    },
    modus: { phase: "Фаза 04", title: "Протокол.", s1_title: "ІНФІЛЬТРАЦІЯ", s1_desc: "Аудит.", s2_title: "АРХІТЕКТУРА", s2_desc: "Дизайн.", s3_title: "ВИКОНАННЯ", s3_desc: "Реалізація." },
    pricing: { phase: "Фаза 05", title: "Співпраця.", tiers: [
      { name: "Діагноз", subtitle: "Audit", price: "€499", desc: "Аналіз.", features: ["Triage", "Leak Detection"], btn: "Ініціювати" }, 
      { name: "Архітектор", subtitle: "План", price: "€2,499", desc: "Реконструкція.", features: ["Повна документація", "Roadmap", "Async", "Верифікація"], btn: "Ініціювати" }, 
      { name: "Суверен", subtitle: "Kontrol", price: "€7,500", desc: "CEO.", features: ["На місці", "Shadow CEO", "Суверенітет", "Чистка команди"], btn: "Ініціювати" }
    ] },
    contact: { title: "Захищений Канал.", desc: "Пряма лінія.", loc: "Прага / Глобально" },
    modal: { secure: "Захищений Канал", email: "Email", placeholder: "name@company.com", processing: "Обробка...", confirm: "Підтвердити", encrypted: "256-біт", close: "Закрити" },
    briefing: {
        title: "Передача Успішна.",
        subtitle: "Протокол Розгортання Активний",
        steps: [
            { icon: "credit", head: "01. Розрахунок", desc: "Рахунок надіслано. Оплатіть для бронювання операційного вікна." },
            { icon: "shield", head: "02. Intel Протокол", desc: "Список необхідних даних буде надіслано на ваш вузол." },
            { icon: "calendar", head: "03. Стратегічний Зв'язок", desc: "Використовуйте посилання для фіналізації терміну сесії." }
        ]
    },
    contactModal: { title: "Зв'язок", nameLabel: "Ідентифікація", msgLabel: "Зміст", send: "Надіслати", sent: "Надіслано." },
    footer: { linkText: "ΛRCHΞON Протокол", rights: "Всі права захищені.", legal: "Суверенітет. Fair Use. Lucien Systems." }
  },
  zh: {
    nav: { role: "系统架构师", status: "系统在线", slots: "名额" },
    hero: { badge: "混沌架构", title1: "强制", title2: "秩序.", subtitle: "停止假装控制。你只是在反应。", subtitle_accent: "我构建真正的主权。", cta: "运行诊断" },
    audit: { phase: "第一阶段", title: "识别断裂.", desc: "描述阻碍你发展的最大运营瓶颈。", promise: "我将揭示你系统失败背后的隐藏因果关系。", placeholder: "例如：信息向上流动...", button: "执行协议", analyzing: "分析中...", outputHeader: "系统输出", waiting: "等待中...", deploy: "部署方案", connecting: "连接中...", scanning: "扫描中...", calculating: "计算中...", complete: "诊断完成", symptom: "这只是一个症状。" },
    identity: { 
      phase: "第二阶段", title: "身份核心.", role: "系统架构师", 
      p1_title: "视角", p1_quote: "我将基准校准在绝对零度。", p1_desc: "当你为季度收益恐慌时，我以存在的平静运作。", 
      p2_title: "基础", p2_head: "坚不可摧。", p2_desc: "我不为风 and 日丽构建。我构建的系统旨在在全面崩溃中生存。", 
      p3_title: "契约", p3_head: "所有权.", p3_desc: "聯盟。",
      bio: [
          { label: "当前指挥", value: "首席架构师 @ ΛRCHΞON | 自主架构师" },
          { label: "工程核心", value: "因果人工智能 / 结构化精益 / 消除熵" },
          { label: "业务范围", value: "全球战略干预" },
          { label: "哲学", value: "反脆弱自主性 | 在混沌中寻找信号" }
      ],
      id_card: { status: "Status", active: "活跃", base: "基地", prague: "布拉格 / 全球", id: "代号", code: "ΛRCH-SYS-01" }
    },
    capabilities: {
        phase: "第三阶段",
        title: "运营能力.",
        items: [
            { icon: "layers", title: "系统重建", desc: "手术式调整运营结构。剔除腐败部分，构建高效的自主架构。" },
            { icon: "cpu", title: "因果 AI 骨干", desc: "部署能够理解因果关系的 AI。将数据噪声转化为决定性的信号。" },
            { icon: "shield", title: "消除熵", desc: "识别并移除人员和流程瓶颈。在混沌统治的地方恢复流动性。" },
            { icon: "target", title: "主权框架", desc: "设计无需持续监督即可运行的自治业务单元。实现真正的自主。" }
        ]
    },
    modus: { phase: "第四阶段", title: "协议.", s1_title: "渗透", s1_desc: "审计。", s2_title: "架构", s2_desc: "设计。", s3_title: "执行", s3_desc: "执行。" },
    pricing: { phase: "第五阶段", title: "合作.", tiers: [
      { name: "诊断", subtitle: "审计", price: "€499", desc: "分析。", features: ["漏洞检测", "即时分流"], btn: "启动" }, 
      { name: "架构师", subtitle: "蓝图", price: "€2,499", desc: "重建。", features: ["完整系统文档", "30天执行路线图", "直接异步通道", "结构验证"], btn: "启动" }, 
      { name: "主权者", subtitle: "控制", price: "€7,500", desc: "改革。", features: ["现场战略部署", "影子执行官集成", "绝对系统主权", "团队全面清洗"], btn: "启动" }
    ] },
    contact: { title: "安全频道.", desc: "建立连接。", loc: "布拉格 / 全球" },
    modal: { secure: "安全频道", email: "邮箱", placeholder: "name@company.com", processing: "处理中...", confirm: "确认选择", encrypted: "256位加密", success_title: "传输已接收。", success_desc_low: "发票已发送。", success_desc_high: "申请已记录。", close: "关闭终端" },
    briefing: {
        title: "传输成功。",
        subtitle: "部署协议已激活",
        steps: [
            { icon: "credit", head: "01. 结算", desc: "电子发票已发送。完成支付以锁定操作时段。" },
            { icon: "shield", head: "02. 情报协议", desc: "所需结构数据列表将发送至您的节点。请准备进行直接传输。" },
            { icon: "calendar", head: "03. 战略连接", desc: "使用后续消息中的协调链接确定首次战术会议的时间。" }
        ]
    },
    contactModal: { title: "直接上行", nameLabel: "身份", msgLabel: "内容", send: "发送", sent: "已发送。" },
    footer: { linkText: "ΛRCHΞON 协议", rights: "版权所有。", legal: "高诚信主权。公平使用。Lucien Systems 支持。" }
  }
};

const SUPPORTED_LANGS = ['en', 'cs', 'de', 'uk', 'zh'];

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);
  const [selectedTierIndex, setSelectedTierIndex] = useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('idle');
  const [purchaseError, setPurchaseError] = useState('');
  const [contactStatus, setContactStatus] = useState('idle');
  const [slotsLeft, setSlotsLeft] = useState(5);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [lang, setLang] = useState('en');
  const [identityFlipped, setIdentityFlipped] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [activeCapability, setActiveCapability] = useState(null);
  const [activeProtocol, setActiveProtocol] = useState(null);
  const [activePricing, setActivePricing] = useState(null);
  const [contactActive, setContactActive] = useState(false);
  
  const [logoError, setLogoError] = useState(false);

  // AI State
  const [auditInput, setAuditInput] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const t = CONTENT_MAP[lang] || CONTENT_MAP['en'];

  useEffect(() => {
    const pathLang = window.location.pathname.split('/').filter(Boolean)[0];
    if (SUPPORTED_LANGS.includes(pathLang)) {
      setLang(pathLang);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlotsLeft((prev) => (prev > 1 ? prev - 1 : 1));
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(hover: none)');
    const update = () => setIsTouch(media.matches);
    update();
    if (media.addEventListener) {
      media.addEventListener('change', update);
      return () => media.removeEventListener('change', update);
    }
    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  useEffect(() => {
    let animationFrameId;
    const handleMouseMove = (e) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const openModal = (tier, tierIndex) => {
    setSelectedTier(tier);
    setSelectedTierIndex(tierIndex);
    setSubmissionStatus('idle');
    setPurchaseError('');
    setIsModalOpen(true);
  };

  const handlePurchase = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    if (selectedTierIndex === null || selectedTierIndex === undefined) {
      setPurchaseError('SYSTEM ERROR: Tier selection missing.');
      return;
    }
    setLoading(true);
    setPurchaseError('');

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          tierIndex: selectedTierIndex,
          lang,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.url) {
        setPurchaseError(data?.error || 'SYSTEM ERROR: Checkout session failed.');
        return;
      }
      window.location.href = data.url;
    } catch (error) {
      setPurchaseError('SYSTEM ERROR: Network failure.');
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setContactStatus('success');
      setTimeout(() => {
          setIsContactModalOpen(false);
          setContactStatus('idle');
      }, 2000);
    }, 1500);
  };

  const handleLangChange = (nextLang) => {
    if (nextLang === lang) return;
    window.location.href = `/${nextLang}/`;
  };

  const runAiAudit = async (e) => {
    e.preventDefault();
    if (!auditInput.trim()) return;

    setIsAnalyzing(true);
    setAiAnalysis('');

    const prompt = `
      Act as Adam Karl Lucien, Chief Architect of ΛRCHΞON.
      Archetype: The Dragon. Surgical, direct, cold, uncompromising.
      Tone: High-agency professional, authoritative, devoid of fluff.
      CRITICAL INSTRUCTION: Analyze the problem below. 
      DO NOT repeat the user's input. DO NOT mirror their messy formatting.
      YOU ARE THE SOLVER. Use perfect grammar and professional terminology.
      You MUST respond in the EXACT SAME LANGUAGE as the User's Problem (CS/EN/DE/UK/ZH).
      User's Problem: "${auditInput}"
      Task:
      1. THE DIAGNOSIS: Identify the structural rot or systematic failure in one surgical sentence.
      2. THE COST: Predict the systematic collapse or hemorrhaging if ignored.
      3. THE DIRECTIVE: One immediate architectural command to stop the bleeding.
      Format: 3 short paragraphs.
    `;

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (!response.ok) {
        setAiAnalysis("SYSTEM ERROR: Neural Link Disconnected (Server Key Missing or API Failure).");
      } else if (data.candidates && data.candidates[0].content) {
        setAiAnalysis(data.candidates[0].content.parts[0].text);
      } else {
        setAiAnalysis("Error: Signal lost in the void.");
      }
    } catch (error) {
      setAiAnalysis("Error: Neural connection failure.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-gray-200 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden relative font-sans">
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.04] mix-blend-overlay"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      <div 
        className="fixed inset-0 z-0 opacity-10 pointer-events-none transition-transform duration-100 ease-out"
        style={{
            backgroundImage: `
                radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.08) 0%, transparent 30%),
                linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 80px 80px, 80px 80px',
            transform: `translate(${mousePos.x * -0.005}px, ${mousePos.y * -0.005}px)`
        }}
      ></div>

      <nav className="fixed w-full z-50 border-b border-white/10 bg-[#030303]/80 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {/* LOGO CONTAINER WITH 1.png */}
            <div className="relative group w-12 h-12 flex items-center justify-center overflow-hidden bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0)] hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] rounded-lg">
               {!logoError ? (
                  <img 
                    src="image1.svg" 
                    alt="Lucien" 
                    className="h-8 md:h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-110" 
                    onError={() => setLogoError(true)} 
                  />
              ) : (
                  <div className="font-bold text-xs tracking-tighter text-white uppercase font-sans">ΛRCH</div>
              )}
            </div>
            <div className="flex flex-col justify-center">
               <span className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-mono">{t.nav.role}</span>
               <span className="text-sm font-bold tracking-widest text-white uppercase font-sans">LUCIEN</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
             <div className="hidden md:flex items-center gap-2 text-indigo-400/80 text-[10px] font-mono tracking-widest">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500"></span>
                </span>
                <span>{t.nav.status}</span>
             </div>
             
             <div className="flex items-center border border-white/10 rounded-sm overflow-hidden bg-black/50">
                {SUPPORTED_LANGS.map((l) => (
                    <button key={l} onClick={() => handleLangChange(l)} className={`px-3 py-1.5 text-[10px] font-bold transition-colors uppercase ${lang === l ? 'bg-white text-black' : 'bg-transparent text-gray-400 hover:text-white'}`}>{l}</button>
                ))}
             </div>
          </div>
        </div>
      </nav>

      <header className="relative pt-48 pb-32 px-6 border-b border-white/10 overflow-hidden z-10">
        <div className="max-w-[1200px] mx-auto text-center">
            <div className="inline-flex items-center justify-center gap-2 mb-12 px-4 py-1 border border-white/10 bg-white/5 backdrop-blur-md rounded-full"><span className="text-[10px] uppercase tracking-[0.2em] text-indigo-300 font-bold">{t.hero.badge}</span></div>
            <h1 className={`text-7xl md:text-[10rem] font-bold tracking-tighter text-white mb-12 ${lang === 'cs' ? 'leading-normal' : 'leading-[0.85]'}`}>{t.hero.title1}<br/><span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-700">{t.hero.title2}</span></h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto mb-16">{t.hero.subtitle} <span className="text-white font-medium border-b border-indigo-500/50 pb-1">{t.hero.subtitle_accent}</span></p>
            <div className="flex justify-center gap-4"><button onClick={() => document.getElementById('ai-scanner').scrollIntoView({ behavior: 'smooth' })} className="group bg-white text-black px-12 py-5 font-bold text-sm uppercase tracking-widest transition-all hover:bg-indigo-500 hover:text-white hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] flex items-center gap-3 rounded-sm">{t.hero.cta} <ArrowRight className="w-4 h-4" /></button></div>
        </div>
      </header>

      {/* PHASE 01: AUDIT */}
      <section id="ai-scanner" className="py-32 px-6 bg-[#050505] border-b border-white/10 relative z-10">
        <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-24">
                <h2 className="text-xs font-mono text-gray-400 tracking-[0.4em] uppercase mb-4"><Scan className="w-4 h-4 inline-block mr-2 mb-1 text-indigo-500" />{t.audit.phase}</h2>
                <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{t.audit.title}</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6 items-stretch">
                <div className="rounded-3xl bg-[#0c0c0c] border border-white/10 p-8 flex flex-col hover:border-white/20 transition-all duration-300">
                    <div className="mb-8 space-y-4">
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 shadow-inner">
                            <Activity className="w-6 h-6 text-white" />
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-white text-lg font-semibold tracking-tight leading-snug">
                                {t.audit.desc}
                            </h4>
                            <div className="flex items-center gap-2">
                                <div className="w-1 h-1 bg-indigo-500 rounded-full animate-pulse" />
                                <p className="text-xs uppercase tracking-[0.15em] text-indigo-400/90 font-bold">
                                    {t.audit.promise}
                                </p>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={runAiAudit} className="flex-grow flex flex-col"><textarea value={auditInput} onChange={(e) => setAuditInput(e.target.value)} placeholder={t.audit.placeholder} className="flex-grow bg-[#080808] border border-white/10 rounded-xl p-6 text-white font-mono text-sm focus:border-indigo-500/50 focus:outline-none transition-all resize-none placeholder-gray-700 hover:border-white/20 mb-4 min-h-[200px]" /><button type="submit" disabled={isAnalyzing || !auditInput} className="w-full py-4 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all flex justify-center items-center gap-3 disabled:opacity-50 rounded-xl">{isAnalyzing ? <span className="animate-pulse">{t.audit.analyzing}</span> : <>{t.audit.button} <Zap className="w-4 h-4" /></>}</button></form>
                </div>
                <div id="ai-results" className="rounded-3xl bg-[#0c0c0c] border border-white/10 p-8 flex flex-col hover:border-white/20 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5"><Terminal className="w-48 h-48 text-white" /></div>
                    <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-6 relative z-10"><span className="text-[10px] uppercase tracking-widest text-gray-400 font-mono">{t.audit.outputHeader}</span><div className="flex gap-2"><div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div></div></div>
                    <div className="relative flex-grow font-mono text-sm z-10 flex flex-col">
                        {!aiAnalysis && !isAnalyzing && (<div className="text-gray-500 flex-grow flex flex-col items-center justify-center text-center space-y-4 min-h-[250px]"><p className="opacity-60 tracking-widest text-xs uppercase">{t.audit.waiting}</p></div>)}
                        {isAnalyzing && (<div className="space-y-4 text-indigo-400/70 flex-grow pt-10"><div className="flex items-center gap-3 border-l border-indigo-500/20 pl-4"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></div> &gt; {t.audit.connecting}</div><div className="flex items-center gap-3 border-l border-indigo-500/20 pl-4 delay-75"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></div> &gt; {t.audit.scanning}</div><div className="flex items-center gap-3 border-l border-indigo-500/20 pl-4 delay-150 text-white animate-pulse"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></div> &gt; {t.audit.calculating}</div></div>)}
                        {aiAnalysis && (
                            <div className="animate-[fadeIn_0.3s_ease-out] flex flex-col h-full"><div className="text-gray-300 space-y-6 mb-8 leading-relaxed flex-grow overflow-y-auto max-h-[400px] pr-2 custom-scrollbar"><p className="text-white font-bold bg-indigo-900/30 inline-block px-2 py-1 text-xs border border-indigo-500/30 rounded-sm">&gt; {t.audit.complete}</p><p className="whitespace-pre-line border-l-2 border-indigo-500/20 pl-6">{aiAnalysis}</p></div><div className="p-6 bg-white/5 border border-white/10 rounded-xl flex flex-col items-center text-center gap-3 mt-auto"><h4 className="text-white font-bold uppercase tracking-widest text-[10px]">{t.audit.symptom}</h4><button onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })} className="w-full py-3 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors rounded-lg">{t.audit.deploy}</button></div></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* PHASE 02: IDENTITY */}
      <section className="py-40 px-6 border-b border-white/10 relative overflow-hidden bg-[#050505] z-10">
        <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-24"><h2 className="text-xs font-mono text-gray-400 tracking-[0.4em] uppercase mb-4"><User className="w-4 h-4 inline-block mr-2 mb-1 text-indigo-500" />{t.identity.phase}</h2><h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{t.identity.title}</h3></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  className="group md:col-span-1 md:row-span-2 relative h-[520px] bg-[#0c0c0c] border border-white/10 p-8 flex flex-col justify-between hover:border-indigo-500/30 transition-all duration-300 rounded-3xl overflow-hidden cursor-pointer"
                  onClick={() => setIdentityFlipped((prev) => !prev)}
                  onMouseLeave={() => setIdentityFlipped(false)}
                  aria-pressed={identityFlipped}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setIdentityFlipped((prev) => !prev);
                    }
                  }}
                >
                    <div className={`relative z-10 h-full flex flex-col justify-between transition-opacity duration-300 group-hover:opacity-0 ${identityFlipped ? 'opacity-0 pointer-events-none' : ''}`}>
                        <div><div className="w-16 h-16 bg-white text-black flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,255,255,0.1)] rounded-2xl"><User className="w-8 h-8" /></div><h3 className="text-4xl text-white font-bold mb-2 tracking-tighter uppercase font-sans">ADAM<br/>KARL<br/>LUCIEN</h3><p className="text-xs text-indigo-400 uppercase tracking-widest mt-4">{t.identity.role}</p></div>
                        <div className="space-y-4 font-mono text-[10px] uppercase tracking-widest">
                            <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-gray-400">{t.identity.id_card.status}</span><span className="text-white">{t.identity.id_card.active}</span></div>
                            <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-gray-400">{t.identity.id_card.base}</span><span className="text-white">{t.identity.id_card.prague}</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">{t.identity.id_card.id}</span><span className="text-white uppercase font-bold tracking-tighter text-indigo-400">ΛRCHΞON</span></div>
                        </div>
                    </div>
                    <div className={`absolute inset-0 bg-[#080808] p-8 flex flex-col justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 ${identityFlipped ? 'opacity-100' : 'pointer-events-none'}`}>
                        {t.identity.bio.map((stat, idx) => (<div key={idx} className="border-l-2 border-indigo-500/50 pl-4"><div className="text-[10px] uppercase tracking-widest text-gray-400 mb-1 flex items-center gap-2">{idx === 0 && <Briefcase className="w-3 h-3" />} {idx === 1 && <Cpu className="w-3 h-3" />} {idx === 2 && <Globe className="w-3 h-3" />} {idx === 3 && <Zap className="w-3 h-3" />} {stat.label}</div><div className="text-sm font-bold text-white">{stat.value}</div></div>))}
                        <div className="pt-4">
                            <a href="https://adamkarl.lucien.technology" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 border border-indigo-500/40 text-indigo-300 text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-colors rounded-xl">
                                AdamKarl Profile <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="group md:col-span-2 bg-[#0c0c0c] border border-white/10 p-10 hover:border-indigo-500/30 transition-all duration-300 relative overflow-hidden rounded-3xl">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity"><Activity className="w-40 h-40 text-white" /></div>
                    <div className="flex items-center gap-2 mb-6"><Eye className="w-4 h-4 text-gray-400" /><h4 className="text-gray-400 font-mono text-[10px] uppercase tracking-[0.2em]">01 // {t.identity.p1_title}</h4></div>
                    <h3 className="text-2xl text-white font-medium leading-relaxed max-w-lg mb-6">"{t.identity.p1_quote}"</h3>
                    <p className="text-gray-400 font-light leading-relaxed max-w-md">{t.identity.p1_desc}</p>
                </div>
                <div className="group bg-[#0c0c0c] border border-white/10 p-10 hover:border-indigo-500/30 transition-all duration-300 rounded-3xl"><div className="flex items-center gap-2 mb-6"><Hexagon className="w-4 h-4 text-gray-400" /><h4 className="text-gray-400 font-mono text-[10px] uppercase tracking-[0.2em]">02 // {t.identity.p2_title}</h4></div><h3 className="text-xl text-white font-bold mb-4">{t.identity.p2_head}</h3><p className="text-sm text-gray-300 leading-relaxed">{t.identity.p2_desc}</p></div>
                <div className="group bg-[#0c0c0c] border border-white/10 p-10 hover:border-indigo-500/30 transition-all duration-300 rounded-3xl"><div className="flex items-center gap-2 mb-6"><FileText className="w-4 h-4 text-gray-400" /><h4 className="text-gray-400 font-mono text-[10px] uppercase tracking-[0.2em]">03 // {t.identity.p3_title}</h4></div><h3 className="text-xl text-white font-bold mb-4">{t.identity.p3_head}</h3><p className="text-sm text-gray-300 leading-relaxed">{t.identity.p3_desc}</p></div>
            </div>
        </div>
      </section>

      {/* PHASE 03: OPERATIONAL CAPABILITIES */}
      <section className="py-32 px-6 border-b border-white/10 bg-[#030303] z-10 relative">
        <div className="max-w-[1200px] mx-auto text-center">
            <div className="mb-24 text-center">
                <h2 className="text-xs font-mono text-gray-400 tracking-[0.4em] uppercase mb-4">
                    <Workflow className="w-4 h-4 inline-block mr-2 mb-1 text-indigo-500" />
                    {t.capabilities.phase}
                </h2>
                <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{t.capabilities.title}</h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
                {t.capabilities.items.map((item, idx) => (
                    <div
                      key={idx}
                      className={`group p-8 bg-[#0c0c0c] border border-white/5 rounded-3xl transition-all duration-500 hover:border-indigo-500/30 hover:-translate-y-1 ${isTouch && activeCapability === idx ? 'border-indigo-500/30 -translate-y-1' : ''}`}
                      onClick={() => {
                        if (!isTouch) return;
                        setActiveCapability((prev) => (prev === idx ? null : idx));
                      }}
                    >
                        <div className={`w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 transition-transform border border-white/5 group-hover:scale-110 group-hover:border-indigo-500/20 ${isTouch && activeCapability === idx ? 'scale-110 border-indigo-500/20' : ''}`}>
                            {item.icon === 'layers' && <Layers className="w-6 h-6 text-white" />}
                            {item.icon === 'cpu' && <Cpu className="w-6 h-6 text-white" />}
                            {item.icon === 'shield' && <ShieldCheck className="w-6 h-6 text-white" />}
                            {item.icon === 'target' && <Target className="w-6 h-6 text-white" />}
                        </div>
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4 leading-tight">{item.title}</h4>
                        <p className={`text-gray-400 text-xs leading-relaxed font-light group-hover:text-gray-200 transition-colors ${isTouch && activeCapability === idx ? 'text-gray-200' : ''}`}>{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* PHASE 04: THE PROTOCOL */}
      <section className="py-32 px-6 border-b border-white/10 bg-[#020405] z-10 relative">
        <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-24"><h2 className="text-xs font-mono text-gray-400 tracking-[0.4em] uppercase mb-4"><GitCommit className="w-4 h-4 inline-block mr-2 mb-1 text-indigo-500" />{t.modus.phase}</h2><h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{t.modus.title}</h3></div>
            <div className="grid md:grid-cols-3 gap-0 border-t border-l border-white/10">
                {[{ step: "01", title: t.modus.s1_title, desc: t.modus.s1_desc, icon: <Scan className="w-5 h-5" /> }, { step: "02", title: t.modus.s2_title, desc: t.modus.s2_desc, icon: <Layers className="w-5 h-5" /> }, { step: "03", title: t.modus.s3_title, desc: t.modus.s3_desc, icon: <Crosshair className="w-5 h-5" /> }].map((item, idx) => (
                    <div
                      key={idx}
                      className={`group border-r border-b border-white/10 p-12 transition-colors relative hover:bg-white/5 ${isTouch && activeProtocol === idx ? 'bg-white/5' : ''}`}
                      onClick={() => {
                        if (!isTouch) return;
                        setActiveProtocol((prev) => (prev === idx ? null : idx));
                      }}
                    >
                      <div className={`absolute top-6 right-6 text-gray-500 font-bold text-6xl opacity-20 transition-opacity select-none group-hover:opacity-10 ${isTouch && activeProtocol === idx ? 'opacity-10' : ''}`}>{item.step}</div>
                      <div className={`mb-8 text-white group-hover:text-indigo-400 transition-colors ${isTouch && activeProtocol === idx ? 'text-indigo-400' : ''}`}>{item.icon}</div>
                      <h3 className="text-lg font-bold text-white mb-4 tracking-widest uppercase">{item.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed font-light">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* PHASE 05: ENGAGEMENT */}
      <section id="pricing" className="py-40 px-6 z-10 relative">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-24"><h2 className="text-xs font-mono text-gray-400 tracking-[0.4em] uppercase mb-4"><Shield className="w-4 h-4 inline-block mr-2 mb-1 text-indigo-500" />{t.pricing.phase}</h2><h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{t.pricing.title}</h3></div>
          <div className="grid lg:grid-cols-3 gap-8">
            {t.pricing.tiers.map((tier, idx) => (
              <div
                key={idx}
                className={`relative p-10 flex flex-col justify-between group transition-all duration-300 rounded-2xl ${idx === 1 ? 'bg-white text-black border-none scale-105 z-20 shadow-[0_0_50px_rgba(99,102,241,0.2)]' : 'bg-[#0a0a0a] border border-white/10 text-white hover:border-indigo-500/50'} ${isTouch && activePricing === idx && idx !== 1 ? 'border-indigo-500/50' : ''}`}
                onClick={() => {
                  if (!isTouch) return;
                  setActivePricing((prev) => (prev === idx ? null : idx));
                }}
              >
                <div><div className="flex justify-between items-start mb-10"><div className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${idx === 1 ? 'bg-black text-white' : 'bg-white/10 text-white'}`}>{tier.subtitle}</div></div><h3 className="text-3xl font-bold mb-2 tracking-tight">{tier.name}</h3><div className={`text-2xl font-light mb-8 ${idx === 1 ? 'text-gray-700' : 'text-gray-300'}`}>{tier.price}</div><p className={`text-sm leading-relaxed mb-12 font-medium ${idx === 1 ? 'text-gray-700' : 'text-gray-300'}`}>{tier.desc}</p><ul className="space-y-5 mb-12">{tier.features.map((feat, i) => (<li key={i} className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider"><div className={`w-1.5 h-1.5 ${idx === 1 ? 'bg-black' : 'bg-indigo-500'}`}></div>{feat}</li>))}</ul></div>
                <button onClick={() => openModal(tier, idx)} className={`w-full py-5 font-bold uppercase tracking-widest text-xs transition-all border rounded-xl ${idx === 1 ? 'bg-black text-white border-black hover:bg-gray-800' : 'bg-transparent text-white border-white/20 hover:border-indigo-500 hover:text-indigo-400'}`}>{tier.btn}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-t border-white/10 bg-[#020405] z-10 relative">
        <div className="max-w-[1000px] mx-auto">
            <div
              className="flex flex-col md:flex-row justify-between items-center gap-12 p-12 border border-white/10 bg-[#050505] relative overflow-hidden group rounded-3xl"
              onClick={() => {
                if (!isTouch) return;
                setContactActive((prev) => !prev);
              }}
            >
                <div className={`absolute inset-0 bg-indigo-900/5 translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out ${isTouch && contactActive ? 'translate-x-0' : ''}`}></div>
                <div className="relative z-10 text-center md:text-left"><h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center md:justify-start gap-3"><Lock className="w-5 h-5 text-indigo-500" />{t.contact.title}</h3><p className="text-gray-400 text-sm max-w-md">{t.contact.desc}</p></div>
                <div className="relative z-10 flex gap-6">
                    <button onClick={() => setIsContactModalOpen(true)} className="p-4 border border-white/20 bg-black hover:border-indigo-500 hover:text-indigo-400 text-white transition-all rounded-xl group/icon cursor-pointer"><Mail className="w-5 h-5 group-hover/icon:scale-110 transition-transform" /></button>
                    <a href="https://www.linkedin.com/in/adam-karl-lucien" target="_blank" rel="noopener noreferrer" className="p-4 border border-white/20 bg-black hover:border-indigo-500 hover:text-indigo-400 text-white transition-all rounded-xl group/icon"><Linkedin className="w-5 h-5 group-hover/icon:scale-110 transition-transform" /></a>
                </div>
            </div>
        </div>
      </section>

      <footer className="py-16 px-6 bg-black z-10 relative border-t border-white/10 overflow-hidden text-sans">
        <div className="absolute -bottom-4 -right-4 text-[120px] font-bold text-white/[0.04] select-none pointer-events-none tracking-tighter uppercase">LUCIEN</div>
        
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-bold text-xs">Λ</div>
                <span className="text-2xl font-bold tracking-tighter text-white">ΛRCHΞON</span>
              </div>
              <div className="text-[10px] text-gray-400 font-mono uppercase tracking-widest mb-2">{t.identity.role} • Est. 2026</div>
              <a 
                href="https://archeon.lucien.technology" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-indigo-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
              >
                {t.footer.linkText} <ExternalLink className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
               <div className="space-y-4">
                  <h4 className="text-[10px] font-mono uppercase text-gray-400 tracking-[0.2em]">{t.identity.id_card.status}</h4>
                  <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                     <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                     {t.identity.id_card.active}
                  </div>
               </div>
               <div className="space-y-4">
                  <h4 className="text-[10px] font-mono uppercase text-gray-400 tracking-[0.2em]">{t.identity.id_card.base}</h4>
                  <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{t.identity.id_card.prague}</div>
               </div>
               <div className="space-y-4 hidden md:block">
                  <h4 className="text-[10px] font-mono uppercase text-gray-400 tracking-[0.2em]">{t.identity.id_card.id}</h4>
                  <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{t.identity.id_card.code}</div>
               </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-6">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
               <span className="text-[9px] text-gray-500 uppercase tracking-widest">© 2026 {t.footer.rights}</span>
               <span className="text-[9px] text-gray-500 uppercase tracking-widest uppercase">Fair Use Applied</span>
               <span className="text-[9px] text-gray-500 uppercase tracking-widest uppercase">Quantum-Resistant Encryption</span>
               <a href="https://lucien.technology" target="_blank" rel="noopener noreferrer" className="text-[9px] text-gray-400 uppercase tracking-widest hover:text-gray-200 transition-colors inline-flex items-center min-h-[32px] px-2">lucien.technology</a>
               <a href="https://portal.lucien.technology" target="_blank" rel="noopener noreferrer" className="text-[9px] text-gray-400 uppercase tracking-widest hover:text-gray-200 transition-colors inline-flex items-center min-h-[32px] px-2">portal.lucien.technology</a>
               <a href="https://archeon.lucien.technology" target="_blank" rel="noopener noreferrer" className="text-[9px] text-gray-400 uppercase tracking-widest hover:text-gray-200 transition-colors inline-flex items-center min-h-[32px] px-2">archeon.lucien.technology</a>
            </div>
            <div className="text-[9px] text-gray-500 uppercase tracking-widest italic">
               {t.footer.legal}
            </div>
          </div>
        </div>
      </footer>

      {/* MODAL PRICE */}
      {isModalOpen && selectedTier && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
          <div className="bg-[#0a0a0a] w-full max-w-md border border-white/20 p-10 relative shadow-[0_0_50px_rgba(99,102,241,0.15)] rounded-3xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
            
            {submissionStatus === 'idle' ? (
              <>
                <div className="mb-10 text-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-500 block mb-3">{t.modal.secure}</span>
                  <h3 className="text-3xl font-bold text-white mb-2">{selectedTier.name}</h3>
                  <div className="text-xl text-gray-400">{selectedTier.price}</div>
                </div>
                <form onSubmit={handlePurchase} className="space-y-6">
                  <div className="space-y-2"><label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{t.modal.email}</label><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#111] border border-white/10 py-4 px-4 text-white text-sm focus:border-indigo-500 focus:outline-none transition-colors placeholder-gray-600 rounded-xl" placeholder={t.modal.placeholder} /></div>
                  {purchaseError && (
                    <div className="text-[10px] text-red-400 uppercase tracking-widest font-mono">{purchaseError}</div>
                  )}
                  <button type="submit" disabled={loading} className="w-full bg-white text-black py-5 font-bold uppercase tracking-widest text-xs hover:bg-indigo-500 hover:text-white transition-colors flex justify-center items-center gap-2 rounded-xl">{loading ? <span className="animate-pulse">{t.modal.processing}</span> : <span>{t.modal.confirm}</span>}</button>
                </form>
              </>
            ) : (
              <div className="animate-[fadeIn_0.5s_ease-out]">
                 <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6"><Check className="w-8 h-8 text-indigo-500" /></div>
                    <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tighter">{t.briefing.title}</h3>
                    <p className="text-xs text-indigo-400 uppercase tracking-widest font-mono font-bold animate-pulse">{t.briefing.subtitle}</p>
                 </div>

                 <div className="space-y-4 mb-10">
                    {t.briefing.steps.map((step, idx) => (
                        <div key={idx} className="p-4 bg-white/5 border border-white/5 rounded-2xl flex gap-4 items-start hover:border-indigo-500/20 transition-colors group">
                            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/5 group-hover:border-indigo-500/30 transition-colors">
                                {step.icon === 'credit' && <CreditCard className="w-5 h-5 text-gray-400" />}
                                {step.icon === 'shield' && <ShieldCheck className="w-5 h-5 text-gray-400" />}
                                {step.icon === 'calendar' && <Calendar className="w-5 h-5 text-gray-400" />}
                            </div>
                            <div>
                                <h4 className="text-[10px] uppercase tracking-widest text-white font-bold mb-1">{step.head}</h4>
                                <p className="text-[11px] text-gray-400 leading-relaxed">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                 </div>

                 <button onClick={() => setIsModalOpen(false)} className="w-full py-4 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all rounded-xl">{t.modal.close}</button>
              </div>
            )}
            <div className="mt-8 flex justify-center items-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest"><Fingerprint className="w-3 h-3" />{t.modal.encrypted}</div>
          </div>
        </div>
      )}

      {isContactModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
          <div className="bg-[#0a0a0a] w-full max-w-md border border-white/20 p-10 relative shadow-[0_0_50px_rgba(99,102,241,0.15)] rounded-3xl">
            <button onClick={() => setIsContactModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
            {contactStatus === 'idle' ? (
                <>
                    <div className="mb-8 text-center"><span className="text-[10px] font-mono uppercase tracking-widest text-indigo-500 block mb-2">{t.contactModal.title}</span><div className="w-12 h-1 bg-indigo-500 mx-auto rounded-full"></div></div>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                        <div className="space-y-2"><label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{t.contactModal.nameLabel}</label><input type="text" required className="w-full bg-[#111] border border-white/10 py-3 px-4 text-white text-sm focus:border-indigo-500 focus:outline-none transition-colors placeholder-gray-600 rounded-xl" /></div>
                        <div className="space-y-2"><label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{t.modal.email}</label><input type="email" required className="w-full bg-[#111] border border-white/10 py-3 px-4 text-white text-sm focus:border-indigo-500 focus:outline-none transition-colors placeholder-gray-600 rounded-xl" /></div>
                        <div className="space-y-2"><label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{t.contactModal.msgLabel}</label><textarea required rows="3" className="w-full bg-[#111] border border-white/10 py-3 px-4 text-white text-sm focus:border-indigo-500 focus:outline-none transition-colors placeholder-gray-600 rounded-xl resize-none" /></div>
                        <button type="submit" disabled={loading} className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest text-xs hover:bg-indigo-500 hover:text-white transition-colors flex justify-center items-center gap-2 rounded-xl mt-2">{loading ? <span className="animate-pulse">{t.modal.processing}</span> : <span className="flex items-center gap-2">{t.contactModal.send} <Send className="w-3 h-3" /></span>}</button>
                    </form>
                </>
            ) : (
                <div className="text-center py-12 animate-[fadeIn_0.5s_ease-out]">
                    <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6"><Check className="w-8 h-8 text-indigo-500" /></div>
                    <h3 className="text-lg font-bold text-white mb-2">{t.contactModal.sent}</h3>
                </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
