import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "en" | "hi" | "mr";

const STORAGE_KEY = "freshfold.lang";

const translations = {
  en: {
    nav: { home: "Home", services: "Services", pricing: "Pricing", contact: "Contact" },
    common: {
      orderWhatsApp: "Order on WhatsApp",
      seeServices: "See Services",
      bookWhatsApp: "Book on WhatsApp",
      freePickup: "Free pickup & delivery",
      ecoFriendly: "Eco-friendly detergents",
      turnaround: "24–48 hour turnaround",
    },
    home: {
      badge: "Fast • Clean • Reliable",
      title: "Freshfold — Premium Laundry & Dry Cleaning",
      desc:
        "Doorstep pickup and delivery. Laundry, dry cleaning, ironing and shoe care — all handled with care. Order in seconds on WhatsApp.",
      how: {
        title: "How it works",
        s1: { t: "Schedule pickup", d: "Pick a time that suits you — we’ll come to your door." },
        s2: { t: "We clean with care", d: "Eco-friendly detergents and expert handling." },
        s3: { t: "Fresh delivery", d: "Neatly packed, on time, every time." },
      },
      why: {
        title: "Why choose Freshfold",
        eco: { t: "Eco-friendly", d: "Skin-safe, planet-friendly detergents." },
        trust: { t: "Trusted care", d: "Fabric-safe processes & QC." },
        finish: { t: "Premium finish", d: "Sharp ironing and packaging." },
        door: { t: "Doorstep service", d: "Free pickup & delivery." },
      },
      popular: "Popular services",
      faq: "FAQs",
      cta: { title: "Ready for fresh, crisp clothes?", desc: "Book a pickup now — it takes less than a minute." },
      metrics: {
        washedWeekly: "Clothes washed weekly",
        onTime: "On-time deliveries",
        expressOption: "Express option",
        rating: "Customer rating",
      },
    },
    services: {
      title: "Our Services",
      intro:
        "Laundry, Dry Cleaning, Ironing, Footwear care, and Household cleaning — all types available.",
      cats: {
        laundry: "Laundry",
        dry: "Dry Cleaning",
        ironing: "Ironing / Pressing",
        footwear: "Footwear Care",
        household: "Household",
        addons: "Add-ons",
      },
    },
    footer: { quick: "Quick Links", contact: "Contact", social: "Social", chatNow: "Chat now" },
    pricing: {
      title: "Pricing",
      intro: "Men and Women wear pricing listed separately. Transparent and affordable.",
      itemRates: "Item-wise Rates (INR)",
      tabs: { men: "Men", women: "Women", household: "Household", footwear: "Footwear" },
      headers: { item: "Item", washFold: "Wash & Fold", dryClean: "Dry Clean", ironing: "Ironing", steamIron: "Steam Iron" },
      note: "Prices include free pickup and delivery. GST extra if applicable.",
      choose: "Choose on WhatsApp",
      planMeta: { upTo: "Up to", garments: "garments", turnaround: "turnaround" },
      ask: "Ask on WhatsApp",
    },
    contact: {
      title: "Contact",
      intro: "Fill the form to book a pickup or ask anything. You can also reach us directly on WhatsApp.",
      sendMsg: "Send a message",
      fields: {
        name: "Name",
        phone: "Phone",
        email: "Email (optional)",
        service: "Service",
        address: "Pickup Address",
        message: "Message (optional)",
        placeholders: {
          name: "Your name",
          phone: "+91 98xxxxxxx",
          email: "you@example.com",
          address: "House/Flat, Street, Area, City",
          message: "Any specific instructions",
        },
      },
      sendViaWA: "Send via WhatsApp",
      openWA: "Open WhatsApp",
      opening: "Opening WhatsApp…",
      sent: "Your details will be sent in chat.",
      visit: "Visit or call us",
      address: "Address",
      phone: "Phone",
      whatsapp: "WhatsApp",
    },
  },
  hi: {
    nav: { home: "होम", services: "सेवाएं", pricing: "दाम", contact: "संपर्क" },
    common: {
      orderWhatsApp: "व्हाट्सएप पर ऑर्डर करें",
      seeServices: "सेवाएं देखें",
      bookWhatsApp: "व्हाट्सएप पर बुक करें",
      freePickup: "फ्री पिकअप और डिलीवरी",
      ecoFriendly: "पर्यावरण-हितैषी डिटर्जेंट",
      turnaround: "24–48 घंटे में डिलीवरी",
    },
    home: {
      badge: "तेज़ • साफ़ • भरोसेमंद",
      title: "Freshfold — प्रीमियम लॉन्ड्री और ड्राई क्लीनिंग",
      desc:
        "डोरस्टेप पिकअप और डिलीवरी। लॉन्ड्री, ड्राई क्लीनिंग, आयरनिंग और शू केयर — सब कुछ ध्यान से। व्हाट्सएप पर सेकंडों में ऑर्डर करें।",
      how: {
        title: "कैसे काम करता है",
        s1: { t: "पिकअप शेड्यूल करें", d: "आपके समय पर हम आपके दरवाज़े ��र आएंगे।" },
        s2: { t: "हम ध्यान से साफ़ करते हैं", d: "इको-फ्रेंडली डिटर्जेंट और विशेषज्ञ देखभाल।" },
        s3: { t: "ताज़ा डिलीवरी", d: "साफ़-सुथरा पैक, समय पर हर बार।" },
      },
      why: {
        title: "क्यों चुनें Freshfold",
        eco: { t: "इको-फ्रेंडली", d: "त्वचा-सुरक्षित, पर्यावरण-अन��कूल डिटर्जेंट।" },
        trust: { t: "विश्वसनीय देखभाल", d: "फैब्रिक-सेफ प्रक्रिया और गुणवत्ता जाँच।" },
        finish: { t: "प्रीमियम फिनिश", d: "शार्प आयरनिंग और पैकेजिंग।" },
        door: { t: "डोरस्टेप सेवा", d: "फ्री पिकअप और डिलीवरी।" },
      },
      popular: "लोकप्रिय सेवाएं",
      faq: "सामान्य प्रश्न",
      cta: { title: "ताज़े, कुरकुरे कपड़े चाहिए?", desc: "अभी पिकअप बुक करें — एक मिनट से कम लगता है।" },
      metrics: {
        washedWeekly: "साप्ताहिक धुले कपड़े",
        onTime: "समय पर डिलीवरी",
        expressOption: "एक्सप्रेस विकल्प",
        rating: "ग्राहक रेटिंग",
      },
    },
    services: {
      title: "हमारी सेवाएं",
      intro:
        "लॉन्ड्री, ड्राई क्लीनिंग, आयरनिंग, फुटवेयर केयर और हाउसहोल्ड क्लीनिंग — सब उपलब्ध।",
      cats: {
        laundry: "लॉन्ड्री",
        dry: "ड्राई क्लीनिंग",
        ironing: "आयरनिंग / प्रेसिंग",
        footwear: "फुटवेयर केयर",
        household: "हाउसहोल्ड",
        addons: "एड-ऑन",
      },
    },
    footer: { quick: "क्विक लिंक", contact: "संपर्क", social: "सोशल", chatNow: "अभी चैट करें" },
    pricing: {
      title: "दाम",
      intro: "पुरुष और महिला परिधान के दाम अलग-अलग। साफ़ और पारदर्शी।",
      itemRates: "आइटम-वाइज रेट (₹)",
      tabs: { men: "पुरुष", women: "महिला", household: "होम", footwear: "फुटवेयर" },
      headers: { item: "आइटम", washFold: "वॉश & फोल्ड", dryClean: "ड्राई क्लीन", ironing: "आयरनिंग", steamIron: "स्टीम आयरन" },
      note: "फ्री पिकअप/डिलीवरी शामिल। जीएसटी अतिरिक्त हो सकता है।",
      choose: "व्हाट्सएप पर चुनें",
      planMeta: { upTo: "अधिकतम", garments: "कपड़े", turnaround: "टर्नअराउंड" },
      ask: "व्हाट्सएप पर पूछें",
    },
    contact: {
      title: "संपर्क",
      intro: "पिकअप बुक करने या सवाल पूछने के लिए फॉर्म भरें। व्हाट्सएप पर भी जुड़ सकते हैं।",
      sendMsg: "मैसे��� भेजें",
      fields: {
        name: "नाम",
        phone: "फोन",
        email: "ईमेल (वैकल्पिक)",
        service: "सेवा",
        address: "पिकअप पता",
        message: "मैसेज (वैकल्पिक)",
        placeholders: {
          name: "आपका नाम",
          phone: "+91 98xxxxxxx",
          email: "you@example.com",
          address: "मकान/फ्लैट, सड़क, एरिया, शहर",
          message: "कोई विशेष निर्देश",
        },
      },
      sendViaWA: "व्हाट्सएप से भेजें",
      openWA: "व्हाट्सएप खोलें",
      opening: "व्हाट्सएप खोल रहा है…",
      sent: "आपकी डिटेल्स चैट में भेजी जाएँगी।",
      visit: "हमसे मिलें या कॉल करें",
      address: "पता",
      phone: "फोन",
      whatsapp: "व्हाट्सएप",
    },
  },
  mr: {
    nav: { home: "होम", services: "सेवा", pricing: "किंमत", contact: "संपर्क" },
    common: {
      orderWhatsApp: "व्हॉट्सअ‍ॅपवर ऑर्डर करा",
      seeServices: "सेवा पहा",
      bookWhatsApp: "व्हॉट्सअ‍ॅपवर बुक करा",
      freePickup: "मोफत पिकअप आणि डिलिव्हरी",
      ecoFriendly: "पर्यावरणपूरक डिटर्जेंट",
      turnaround: "24–48 तासांत डिलिव्हरी",
    },
    home: {
      badge: "जलद • स्वच्छ • विश्वासार्ह",
      title: "Freshfold — प्रीमियम लॉन्ड्री आणि ड्राय क्लिनिंग",
      desc:
        "घरपोच पिकअप आणि डिलिव्हरी. लॉन्ड्री, ड्राय क्लिनिंग, इस्त्री आणि शू केअर — सगळं का��जीपूर्वक. व्हॉट्सअ‍ॅपवर सेकंदात ऑर्डर करा.",
      how: {
        title: "कसे काम करतो",
        s1: { t: "��िकअप शेड्यूल करा", d: "तुमच्या सोयीच्या वेळी आम्ही येऊ." },
        s2: { t: "आम्ह��� काळजीपूर्वक साफ करतो", d: "इको-फ्रेंडली डिटर्जेंट आणि तज्ञ हाताळणी." },
        s3: { t: "ताजेतवाने डिलिव्हरी", d: "नीट पॅक केलेले, वेळेवर." },
      },
      why: {
        title: "Freshfold का निवडाल",
        eco: { t: "इको-फ्रेंडली", d: "त्वचेसाठी सुरक्षित, पर्यावरणपूरक डिटर्जेंट." },
        trust: { t: "विश्वासू काळजी", d: "कपड्यांसाठी सुरक्षित प्रक्रिया व QC." },
        finish: { t: "प्रीमियम फिनिश", d: "तीक्ष्ण इस्त्री आणि पॅकेजिंग." },
        door: { t: "घरपोच सेवा", d: "मोफत पिकअप आणि डिलिव्हरी." },
      },
      popular: "लोकप्रिय सेवा",
      faq: "नेहमीचे प्रश्न",
      cta: { title: "ताजेतवाने, स्वच्छ कपडे तयार?", desc: "आता पिकअप बुक करा ��� एका मिनिटापेक्षा कमी वेळ." },
      metrics: {
        washedWeekly: "आठवड्याला धुतलेले कपडे",
        onTime: "वेळेवर डिलिव्हरी",
        expressOption: "एक्सप्रेस पर्याय",
        rating: "ग्राहक रेटिंग",
      },
    },
    services: {
      title: "आमच्या सेवा",
      intro:
        "लॉन्ड्री, ड्राय क्लिनिंग, इस्त्री, फुटवेअर केअर आणि हाऊसहोल्ड क्लिनिंग — सर्व उपलब्ध.",
      cats: {
        laundry: "लॉन्ड्री",
        dry: "ड्राय क्लिनिंग",
        ironing: "इस्त्री / प्रेसिंग",
        footwear: "फुटवेअर केअर",
        household: "हाऊसहोल्ड",
        addons: "अ‍ॅड-ऑन्स",
      },
    },
    footer: { quick: "क्विक लिंक्स", contact: "संपर्क", social: "सोशल", chatNow: "आता चॅट करा" },
    pricing: {
      title: "किंमत",
      intro: "पुरुष आणि महिलांचे वेगळे दर. पारदर्शक आणि किफायतशीर.",
      itemRates: "आयटमनिहाय दर (₹)",
      tabs: { men: "पुरुष", women: "महिला", household: "घर", footwear: "फुटवेअर" },
      headers: { item: "आयटम", washFold: "वॉश & फोल्ड", dryClean: "ड्राय क्लिन", ironing: "इस्त्री", steamIron: "स्टीम इस्त्री" },
      note: "मोफत पिकअप/डिलिव्हरी समाविष्ट. जीएसटी वेगळा लागू शकतो.",
      choose: "व्हॉट्सअ‍ॅपवर निवडा",
      planMeta: { upTo: "कमाल", garments: "कपडे", turnaround: "टर्नअराउंड" },
      ask: "व्हॉट्सअ‍ॅपवर विचारा",
    },
    contact: {
      title: "संपर्क",
      intro: "पिकअप बुक किंवा काही विचरायचे असल्यास फॉर्म भरा. व्हॉट्सअ‍ॅपवरही संपर्क साधा.",
      sendMsg: "संदेश पाठवा",
      fields: {
        name: "नाव",
        phone: "फोन",
        email: "ईमेल (ऐच्छिक)",
        service: "सेवा",
        address: "पिकअप पत्ता",
        message: "संदेश (ऐच्छिक)",
        placeholders: {
          name: "तुमचे नाव",
          phone: "+91 98xxxxxxx",
          email: "you@example.com",
          address: "घर/फ्लॅट, रस्ता, परिसर, शहर",
          message: "विशेष सूचना",
        },
      },
      sendViaWA: "व्हॉट्सअ‍ॅपद्वारे पाठवा",
      openWA: "व्हॉट्सअ‍ॅप उघडा",
      opening: "व्हॉट्सअ‍ॅप उघडत आहे…",
      sent: "तुमची माहिती चॅटमध्ये पाठवली जाईल.",
      visit: "आमच्याकडे या किंवा कॉल करा",
      address: "पत्ता",
      phone: "फोन",
      whatsapp: "व्हॉट्सअ‍ॅप",
    },
  },
} as const;

function get(obj: any, path: string): any {
  return path.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);
}

type I18nContextType = { lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string };

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => (localStorage.getItem(STORAGE_KEY) as Lang) || "en");
  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  };
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const t = useMemo(() => (key: string) => String(get(translations[lang], key) ?? key), [lang]);
  const value = useMemo(() => ({ lang, setLang, t }), [lang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
