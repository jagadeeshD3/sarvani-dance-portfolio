/* ==========================================================================
   SITE CONTENT — edit this file only.
   --------------------------------------------------------------------------
   • Text can be a plain string, or { en: "...", nl: "..." } for both languages.
   • Anything in [square brackets] is a placeholder — replace it with real details.
   • Images: drop photos into /assets/images using the exact file names below.
     Until a file exists, the site shows a labelled placeholder.
   • Videos: paste the YouTube video ID (the part after "watch?v=").
     e.g. https://www.youtube.com/watch?v=AbC123xYz  →  id: "AbC123xYz"
   ========================================================================== */

window.SITE = {
  /* ---------- Identity ---------- */
  name: "Sarvani",                            // full name can go here later
  nameDevanagari: "सर्वाणी",                    // check spelling, or set to ""
  title: { en: "Classical dancer", nl: "Klassieke danseres" },
  role: {
    en: "Professional Bharatanatyam dancer performing at Indian community events, festivals and private celebrations.",
    nl: "Professionele Bharatanatyam-danseres die optreedt bij Indiase gemeenschapsevenementen, festivals en privéfeesten.",
  },
  location: { en: "Based in The Hague, the Netherlands", nl: "Gevestigd in Den Haag" },
  email: "hello@example.com",                  // REPLACE
  // Free form backend: create a form at https://formspree.io and paste the URL.
  // Leave "" to fall back to opening the visitor's email app.
  formEndpoint: "",

  socials: [
    { label: "Instagram", url: "https://instagram.com/" },   // REPLACE
    { label: "YouTube",   url: "https://youtube.com/" },     // REPLACE
    { label: "Facebook",  url: "" },                          // "" hides it
  ],

  /* ---------- About ---------- */
  aboutImage: "assets/images/about-portrait.jpg",           // portrait, 4:5, ~1200×1500
  about: {
    en: [
      "Sarvani is a professional Bharatanatyam dancer based in The Hague. She trained in the classical tradition in India, where every performance is built on years of footwork, posture and abhinaya.",
      "Today she brings that tradition to the Indian community in the Netherlands, performing at cultural evenings, festivals and family celebrations across The Hague and beyond.",
    ],
    nl: [
      "Sarvani is een professionele Bharatanatyam-danseres uit Den Haag. Ze werd in India opgeleid in de klassieke traditie, waarin elk optreden rust op jarenlange training in voetenwerk, houding en abhinaya.",
      "Nu brengt ze die traditie naar de Indiase gemeenschap in Nederland, met optredens op culturele avonden, festivals en familiefeesten in Den Haag en daarbuiten.",
    ],
  },
  guru: {
    en: "Trained under Guru [Name], [Institution or tradition].",
    nl: "Opgeleid bij Guru [Naam], [Instituut of traditie].",
  },
  // Short, true numbers only. Leave [] to hide.
  facts: [
    // { value: "15+", label: { en: "years of training", nl: "jaar training" } },
  ],

  /* ---------- Repertoire: the Bharatanatyam margam ---------- */
  forms: [
    {
      name: "Alarippu",
      script: "अलारिप्पु",
      image: "assets/images/form-alarippu.jpg",            // portrait 3:4
      text: {
        en: "The opening piece: pure rhythm that wakes the body, like a bud flowering.",
        nl: "Het openingsstuk: puur ritme dat het lichaam wekt, als een knop die opengaat.",
      },
    },
    {
      name: "Jatiswaram",
      script: "जतिस्वरम्",
      image: "assets/images/form-jatiswaram.jpg",
      text: {
        en: "Intricate patterns of adavus set to a melody, showing the precision of the form.",
        nl: "Ingewikkelde reeksen adavu's op een melodie, die de precisie van de dans laten zien.",
      },
    },
    {
      name: "Varnam",
      script: "वर्णम्",
      image: "assets/images/form-varnam.jpg",
      text: {
        en: "The centrepiece, where rhythm and storytelling alternate for the longest stretch of the recital.",
        nl: "Het hart van het optreden, waarin ritme en verhaal elkaar afwisselen.",
      },
    },
    {
      name: "Tillana",
      script: "तिल्लाना",
      image: "assets/images/form-tillana.jpg",
      text: {
        en: "The joyful finale: fast, sculptural movement that ends the evening on a high.",
        nl: "De vrolijke finale: snelle, beeldende bewegingen die de avond feestelijk afsluiten.",
      },
    },
  ],

  /* ---------- Navarasa: nine expressions (one close-up photo each) ---------- */
  rasas: [
    { name: "Shringara", script: "शृङ्गार", meaning: { en: "Love", nl: "Liefde" },        image: "assets/images/rasa-shringara.jpg" },
    { name: "Hasya",     script: "हास्य",   meaning: { en: "Joy", nl: "Vreugde" },          image: "assets/images/rasa-hasya.jpg" },
    { name: "Karuna",    script: "करुण",    meaning: { en: "Compassion", nl: "Mededogen" }, image: "assets/images/rasa-karuna.jpg" },
    { name: "Raudra",    script: "रौद्र",    meaning: { en: "Anger", nl: "Woede" },          image: "assets/images/rasa-raudra.jpg" },
    { name: "Veera",     script: "वीर",     meaning: { en: "Courage", nl: "Moed" },         image: "assets/images/rasa-veera.jpg" },
    { name: "Bhayanaka", script: "भयानक",   meaning: { en: "Fear", nl: "Angst" },           image: "assets/images/rasa-bhayanaka.jpg" },
    { name: "Bibhatsa",  script: "बीभत्स",   meaning: { en: "Disgust", nl: "Afkeer" },       image: "assets/images/rasa-bibhatsa.jpg" },
    { name: "Adbhuta",   script: "अद्भुत",   meaning: { en: "Wonder", nl: "Verwondering" },  image: "assets/images/rasa-adbhuta.jpg" },
    { name: "Shanta",    script: "शान्त",    meaning: { en: "Peace", nl: "Rust" },           image: "assets/images/rasa-shanta.jpg" },
  ],

  /* ---------- Performance videos (YouTube) ---------- */
  // The first video is shown large. Leave id "" to show a placeholder.
  videos: [
    { id: "", title: { en: "Varnam", nl: "Varnam" }, place: "[Venue], Den Haag · [Year]" },
    { id: "", title: { en: "Tillana", nl: "Tillana" }, place: "[Event], Den Haag · [Year]" },
    { id: "", title: { en: "Alarippu", nl: "Alarippu" }, place: "[Event] · [Year]" },
    { id: "", title: { en: "Diwali celebration", nl: "Diwali-viering" }, place: "[Venue] · [Year]" },
  ],

  /* ---------- Gallery (3D ring) ---------- */
  // Any number from 6 to 16 works. Portrait photos look best, ~1600px tall.
  gallery: Array.from({ length: 12 }, (_, i) => ({
    src: `assets/images/gallery-${String(i + 1).padStart(2, "0")}.jpg`,
    caption: "",                                             // optional caption
  })),

  /* ---------- Journey (in order) ---------- */
  journey: [
    { year: "[Year]", text: { en: "Begins Bharatanatyam training under [Guru].", nl: "Begint met Bharatanatyam bij [Guru]." } },
    { year: "[Year]", text: { en: "Arangetram, her solo debut.", nl: "Arangetram, haar solodebuut." } },
    { year: "[Year]", text: { en: "Moves to the Netherlands.", nl: "Verhuist naar Nederland." } },
    { year: "[Year]", text: { en: "Performs for the Indian community in The Hague.", nl: "Treedt op voor de Indiase gemeenschap in Den Haag." } },
  ],

  /* ---------- What she can be booked for ---------- */
  offerings: [
    {
      title: { en: "Community events", nl: "Gemeenschapsevenementen" },
      text: { en: "Cultural evenings and gatherings of the Indian community in The Hague and across the Netherlands.", nl: "Culturele avonden en bijeenkomsten van de Indiase gemeenschap in Den Haag en heel Nederland." },
    },
    {
      title: { en: "Festivals", nl: "Festivals" },
      text: { en: "Diwali, Navratri, Pongal, Onam and other celebrations, with a short piece or a full recital.", nl: "Diwali, Navratri, Pongal, Onam en andere vieringen, met een kort stuk of een volledig optreden." },
    },
    {
      title: { en: "Private celebrations", nl: "Privéfeesten" },
      text: { en: "Weddings, anniversaries and family functions, with a programme chosen for the occasion.", nl: "Bruiloften, jubilea en familiefeesten, met een programma dat bij de gelegenheid past." },
    },
    {
      title: { en: "Cultural programmes", nl: "Culturele programma's" },
      text: { en: "Short performances with an introduction to the dance for schools, libraries and organisations.", nl: "Korte optredens met een introductie op de dans voor scholen, bibliotheken en organisaties." },
    },
  ],

  /* ---------- Words from others (leave [] to hide this section) ---------- */
  // Only real quotes, with permission.
  quotes: [
    // { text: "…", by: "Name, Organisation" },
  ],
};
