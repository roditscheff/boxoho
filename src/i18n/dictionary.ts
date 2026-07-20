import type { Locale } from "./config";

const en = {
  meta: {
    titleDefault: "BOXOHO — A piece of Mürren, wherever you are",
    titleTemplate: "%s · BOXOHO",
    description:
      "Tiny Art Surprises from a vintage vending machine in Mürren — and postcards that keep you connected to the most beautiful place in the world.",
  },
  nav: {
    main: "Main navigation",
    mobile: "Mobile navigation",
    items: [
      { href: "#postcard", label: "Postcard" },
      { href: "#register", label: "Register" },
      { href: "/collection", label: "Collection" },
      { href: "#map", label: "Worldmap" },
      { href: "#about", label: "About" },
      { href: "#impressions", label: "Mürren" },
    ],
    legal: [
      { href: "/terms", label: "Terms" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
  lang: {
    label: "Language",
    en: "EN",
    de: "DE",
  },
  home: {
    eyebrow: "Post & art from Mürren",
    title: "Box Ohooo!",
    lead: "A piece of Mürren for your home - wherever you live.",
    ctaPrimary: "Subscribe to the postcard",
    ctaSecondary: "Register artwork",
    mediaAutomatLabel: "Open your Tiny Art Surprise",
    mediaPostcardLabel: "A postcard arrives in your mailbox",
    mediaAutomatAlt: "Comic: opening a Box Ohooo! Tiny Art Surprise",
    mediaPostcardAlt: "Comic: a Mürren postcard arriving by mail",
  },
  about: {
    eyebrow: "About BOXOHO",
    title: "Mürren, in a box — and by mail.",
    paragraphs: [
      "BOXOHO is made in Mürren: Tiny Art Surprises from the retro machine, and postcards that keep you connected to the most beautiful place in the world. Sandrine creates both — with love for this place, and for the people who carry a piece of it home.",
      "Sandrine’s family are the owners of Chalet Erika, nestled right in the heart of Mürren. If they had a nickel for every photo taken of Mürrmeli, their famous shop window featuring the beloved marmot, they’d be millionaires! Just across the street, the family also owns two-thirds of the historic barn — a unique but traditional ownership structure quite common here in the Berner Oberland.",
      "Together with their friends, Sandrine and her family have woven these two spaces into a seamless, street-spanning experience. Their shared mission? To bring pure joy to Mürren’s visitors, creating unforgettable memories and making every stay truly exceptional.",
    ],
    creatorEyebrow: "Creator",
    creatorName: "Sandrine",
    creatorBody:
      "Born in Basel, second home Mürren. Creator and entrepreneur — she hopes her twin boys will love this place as she does.",
    portraitAlt: "Sandrine in Mürren",
  },
  footer: {
    eyebrow: "Boxoho · Mürren",
    blurb:
      "A piece of Mürren for your home. Tiny Art Surprises from the vintage vending machine — and postcards that keep the connection alive.",
    instagram: "Instagram",
    rights: "© {year} Sundrbi GmbH · Brand BOXOHO",
    contact: "Boxoho by {company} · {address} · {uid} · {email}",
  },
  thanks: {
    title: "Box Ohooo!",
    lead: "Your little piece of Mürren is on its way.",
    body: "It’s sent once per month, so give it a little time to find you. Follow {handle} to keep the memories of Mürren going.",
    instagramHandle: "@boxohoooo",
    homeCta: "Back to the start →",
  },
  offers: {
    eyebrow: "A keepsake from Mürren",
    title: "Two ways.",
    intro: "Take Mürren home in a box — to wherever you live.",
    art: {
      eyebrow: "Artwork",
      title: "Tiny Art Surprises",
      summary:
        "A matchbox-sized surprise from the retro machine in Mürren — unique, numbered, yours to hang or stick on the fridge.",
      cta: "How the artwork works",
    },
    postcard: {
      eyebrow: "Postcard",
      title: "Mürren by mail",
      summary:
        "Stay connected with the most beautiful place in the world — a motif and a little story, delivered to your door.",
      cta: "How the postcard works",
    },
  },
  story: {
    eyebrow: "Why",
    title: "The story behind it.",
    intro:
      "BOXOHO is made in Mürren: small art you can hold — and mail that keeps you close to the mountains.",
    paragraphs: [
      "A piece of Mürren for your home — wherever you are in the world. That is the idea: something real from this place that can live with you long after the train ride down the valley.",
      "The Tiny Art Surprises are matchbox-sized boxes. Open one and you find a miniature frame — and inside it a souvenir from Mürren, turned into art. A stone from here, a found fragment, a moment — something that makes you smile, and sometimes pause to think. A keepsake.",
      "Each box includes a tiny booklet: the collection’s story and your registration number with a certificate of authenticity. Hang the piece, or use the magnet on the back.",
      "Only as many artworks are made each month as the month has days. Every piece is documented on social media. You can buy them only in Mürren — from the retro vending machine, with two Swiss francs.",
    ],
  },
  impressions: {
    eyebrow: "Mürren",
    title: "Impressions.",
    placeLabel: "Mürren, 1’650 m, Switzerland",
    paragraphs: [
      "Sitting on the sun terrace, facing the mountain panorama of Eiger, Mönch and Jungfrau, Mürren invites you to take a deep breath and enjoy the gorgeous alpine view. From the beginning, this little village in the Swiss Alps has been known for its pure air, marvelous nature and calm pace.",
      "Actors, artists, writers, hikers, skiers, queens, kings, you and I have visited this magical place below the peaks and above the valley. All of us left with a heart full of unique memories — and a spirit of freedom and joy.",
    ],
    instagramCta: "Follow on Instagram →",
    images: [
      { src: "/muerren/01-peaks.jpg", alt: "Snow-capped alpine peaks above green meadows near Mürren" },
      { src: "/muerren/02-huts.jpg", alt: "Alpine huts and mountains with paragliders in the sky" },
      { src: "/muerren/03-path.jpg", alt: "Hiking path through meadows toward the Eiger massif" },
      { src: "/muerren/04-village.jpg", alt: "Looking down toward the village and mountain valley" },
      { src: "/muerren/05-bench.jpg", alt: "Wooden bench overlooking cliffs and snowy peaks" },
      { src: "/muerren/06-evening.jpg", alt: "Evening light over a mountain hut and pine forest" },
      { src: "/muerren/07-meadow.jpg", alt: "Wildflower meadow facing the Jungfrau region peaks" },
    ],
  },
  creator: {
    eyebrow: "About the creator",
    title: "Sandrine.",
    intro: "Sandrine is the creator of this experience.",
    paragraphs: [
      "She loves Mürren. She was not born here, but it is her second home — she almost grew up here.",
      "She loves bringing joy to the people who visit this marvelous place and wants to share her love of Mürren with all of you.",
      "Sandrine was born in Basel, Switzerland. She spends several months, weekends and days a year in Mürren. She is a creator and an entrepreneur. And she hopes that her two twin boys (about five years old) will value this beautiful area as she did and does.",
    ],
    portraitAlt: "Sandrine picking wildflowers in Mürren",
    photoNote: "Artwork photos — machine photos coming soon.",
    altOpen: "Tiny Art Surprise open in its wooden frame, held between two fingers",
    altBox: "Closed Boxoho matchbox-sized Tiny Art Surprise held between two fingers",
  },
  artworkDeep: {
    eyebrow: "Artwork",
    title: "Tiny Art Surprises.",
    intro: "Open the box. Meet a piece of Mürren — framed, numbered, ready for your home.",
    body: "From a retro Haribo-style vending machine in Mürren: insert two Swiss francs and draw a matchbox-sized surprise. Inside: a tiny frame with a souvenir from Mürren, made into art, plus a little booklet with the story and a certificate of authenticity.",
    bullets: [
      "Only available in Mürren, from the machine",
      "As many pieces per month as the month has days",
      "Hang it up — or use the magnet",
      "Register your number and appear on the collectors’ map",
    ],
    cta: "Register on the map →",
  },
  postcard: {
    eyebrow: "Postcard",
    title: "Get Mürren home to you.",
    intro:
      "A Mürren motif, a short story — delivered wherever you are. If you join by 26 July 2026, you’ll receive your first postcard in mid-August.",
    body: "Three ways to stay with Mürren: a digital newsletter, a monthly postcard with story and QR to the newsletter, or a full year paid once.",
    firstShipNote:
      "If you join by 26 July 2026, you’ll receive your first postcard in mid-August.",
    productImageAlt:
      "Comic: hand holding a Mürren postcard with alpine greeting from Sandrine",
    yearImageAlt:
      "Comic: a full year of Mürren postcards stacked together",
    newsletterImageAlt:
      "Comic: Mürren newsletter email with alpine greeting from Sandrine",
    subscription: {
      eyebrow: "Choose your plan",
      title: "How do you want to stay connected?",
      body: "Pick a plan — name, email and shipping address are collected securely in Stripe Checkout.",
      planSelectLabel: "Choose your plan",
      planNewsletterTitle: "Newsletter (digital)",
      planNewsletterBody: "",
      planMonthTitle: "Postcard monthly",
      planMonthBody: "",
      planYearTitle: "One year (no subscription)",
      planYearBody: "",
      planNewsletterOption: "Newsletter (digital) — CHF 5.00 / month",
      planMonthOption: "Postcard monthly (subscription) — CHF 9.00 / month",
      planYearOption: "One year (no subscription) — CHF 90.00 once",
      priceAmountNewsletter: "CHF 5.00",
      pricePeriodNewsletter: "/ month",
      priceAmountMonth: "CHF 9.00",
      pricePeriodMonth: "/ month",
      priceAmountYear: "CHF 90.00",
      pricePeriodYear: " once",
      priceNewsletter: "CHF 5.00 / month",
      priceMonth: "CHF 9.00 / month",
      priceYear: "CHF 90.00 · paid once",
      factsNewsletter: [
        "Digital only — email every month",
        "A longer Mürren story, photo impressions & what’s up in the village",
        "Sometimes something special — a second story, a download, or a little extra",
        "No postal shipping",
        "Cancel anytime at the end of the billing period",
      ],
      factsMonth: [
        "Worldwide standard shipping (no tracking)",
        "A postcard in your mailbox, with a current image and story from Mürren",
        "Newsletter subscription included free — longer stories, photo impressions, and occasional extras (second story, download, etc.)",
        "Cancel anytime at the end of the billing period",
      ],
      factsYear: [
        "Worldwide standard shipping (no tracking)",
        "A postcard in your mailbox each month, with a current image and story from Mürren",
        "Newsletter subscription included free — longer stories, photo impressions, and occasional extras (second story, download, etc.)",
        "12 months paid once — does not auto-renew",
      ],
      mapConsent:
        "I agree that a blurred location (~100 km radius) and my first name may appear on the public collectors’ map. The exact address stays private — we calculate the blur automatically. (optional)",
      legalConsentBefore: "I accept the",
      legalConsentTerms: "Terms",
      legalConsentAnd: "and the",
      legalConsentPrivacy: "Privacy Policy",
      legalConsentRequired: "Please accept the Terms and Privacy Policy to continue.",
      ctaContinue: "Buy now",
      ctaBuy: "Buy now",
      ctaNewsletter: "Buy now",
      ctaMonth: "Buy now",
      ctaYear: "Buy now",
      manageCta: "Manage or cancel subscription",
      portalEmail: "Email",
      portalEmailPlaceholder: "the email you used at checkout",
      manageSubmit: "Open customer portal",
      loading: "Redirecting…",
      newsletterMissingPrice: "Newsletter checkout is almost ready — price ID still missing in Stripe env.",
      successBanner: "Thank you — you’re connected with Mürren.",
      cancelBanner: "Checkout cancelled. You can try again anytime.",
      errorGeneric: "Something went wrong. Please try again.",
      cta: "Get postcards",
      ctaSoon: "Coming soon",
    },
    shop: {
      eyebrow: "Shop",
      title: "Other things to buy & stay connected",
      body: "Past motifs, blank cards, and more — coming later in the shop.",
      cta: "Visit the shop →",
      ctaSoon: "Shop · coming soon",
    },
    bullets: [
      "A fresh Mürren motif and story with each card",
      "Worldwide delivery by standard mail",
      "Your exact address stays private",
    ],
    onSite: {
      title: "Visiting Mürren?",
      body: "Next to the machine you can also pick up a postcard on site — one in hand now, another follows by mail.",
    },
    note: "Secure checkout via Stripe",
    termsLink: "Terms",
  },
  map: {
    eyebrow: "Collectors",
    title: "Where Mürren lives with you.",
    intro:
      "On this world map you see where Mürren friends keep their Tiny Art Surprises — and where the postcard and newsletter land each month. Joining the map is optional, and the pinpoints are only accurate to about 100 km — but it’s fun to see who’s in.",
    filterLabel: "Show on map",
    filterAll: "All",
    filterPostcards: "Postcards & newsletter",
    filterArtworks: "Artworks",
    legendArtwork: "Artwork",
    legendPostcard: "Postcard & newsletter",
    teaserLabel: "Map · Coming soon",
    teaserBody:
      "Soon: an interactive map of registered Tiny Art Surprises, postcard homes, and newsletter connections — always softly blurred.",
    ctaRegister: "Register artwork",
    ctaPostcard: "Subscribe to the postcard",
  },
  register: {
    eyebrow: "Authenticity · Number",
    title: "Already have a Tiny Art Surprise? Register now.",
    intro:
      "Enter the number from your booklet to load your piece — then tell us a little about you.",
    benefitsLabel: "Collector Benefits",
    benefits: [
      {
        title: "Enhance Your Artwork’s Value",
        body: "Being part of an official collectors’ registry helps verify provenance and can increase the long-term value of your piece.",
      },
      {
        title: "Exclusive Access",
        body: "Should a special surprise, limited release, or private buying request arise, you will be the first to know.",
      },
      {
        title: "Flexible Recognition",
        body: "Upon registration, only your first name will be displayed next to the artwork — all other details remain private. You are also welcome to remain completely anonymous to the public.",
      },
      {
        title: "Join the Global Community (Optional)",
        body: "Choose to pin your location on our interactive world map. Share and see where fellow collectors and supporters live worldwide (privacy protected: location accuracy blurred to a 100 km radius).",
      },
    ],
    imageAlt: "Comic: pinning your Tiny Art Surprise on the world map",
    step1: "Step 1",
    numberLabel: "Registration number",
    numberPlaceholder: "e.g. BX-2026-014",
    numberHint: "Enter your number to load the official image of your artwork.",
    lookupCta: "Find artwork",
    step2: "Step 2 · After it’s found",
    firstName: "First name",
    lastName: "Last name",
    firstNameHint: "Kept private for contact — only used publicly if you don’t stay anonymous.",
    street: "Street and no.",
    postalCode: "ZIP / postal code",
    city: "City",
    country: "Country",
    anonymousConsent: "I want to stay anonymous publicly (shown as Anonymous collector).",
    anonymousCollector: "Anonymous collector",
    previewLabel: "Collection preview",
    previewNamePlaceholder: "Your name",
    collectorPrefix: "Collector:",
    previewMapNote: "On the world map your pin stays approximate (~100 km). If anonymous, only Anonymous appears publicly.",
    email: "Email address",
    photo: "Photo at home",
    photoHint: "Upload a photo of your artwork in its new home.",
    chooseFile: "Choose file",
    mapConsent:
      "Show me on the world map with an approximate pin. The exact address stays private. If I stay anonymous, only “Anonymous” is shown — never my real name. (Optional)",
    submitting: "Saving…",
    success: "Thank you — your artwork is registered.",
    alreadyRegistered: "This artwork is already registered.",
    errors: {
      notFound: "No artwork found for that number.",
      generic: "Something went wrong. Please try again.",
      placeNotFound: "Could not find that address. Please check city and country.",
    },
    button: "Register",
  },
  collection: {
    eyebrow: "Tiny Art Surprises",
    title: "The Collection.",
    intro:
      "Every Tiny Art Surprise of the month — sorted by day. Register yours to appear as collector next to your piece.",
    teaserTitle: "The Collection",
    teaserBody:
      "Browse every Tiny Art Surprise by month and day — and see which collectors have already registered.",
    teaserCta: "Open the collection →",
    loading: "Loading collection…",
    dayLabel: "Day",
    daysCount: "{count} pieces this month",
    placeholder: "Coming soon",
    notRegistered: "Not registered",
    anonymousCollector: "Anonymous collector",
    collectorPrefix: "Collector:",
    monthNames: "en",
  },
  terms: {
    eyebrow: "Legal",
    title: "Terms and conditions.",
    // Shared legal content kept factual; EN version
    provider:
      "Provider of both offers: Sundrbi GmbH, under the brand BOXOHO, {address}, UID {uid}.",
    sections: [
      {
        title: "1. Scope",
        body: "These terms apply to purchases from the Boxoho artwork vending machine in Mürren and to BOXOHO products under the brand BOXOHO — physical postcards and digital offers (including a paid digital newsletter), on site in Mürren and/or via the website (including QR code), as stated for each product at the time of purchase. Prices and product details are those shown in the offer (e.g. Stripe product page or on-site information) when you buy.",
      },
      {
        title: "2. Contract formation",
        body: "At the machine or on site, the contract is formed upon payment and handover of the goods (and, where applicable, acceptance of the follow-up mailing). Online, upon completing checkout or successful payment via the payment provider. The contract covers the specific product chosen (physical and/or digital).",
      },
      {
        title: "Artwork machine — 3. Purchase & handover",
        body: "Purchase is made on site by cash or card. The mini artwork (“Tiny Art Surprise”) is handed over immediately and in full. There is no shipping obligation.",
      },
      {
        title: "4. Nature of goods & returns",
        body: "Each piece is unique and a surprise purchase without prior selection. There is no right of withdrawal or exchange to the extent permitted by law. For obvious defects, the buyer should contact {email} within 7 days.",
      },
      {
        title: "5. Authenticity & edition",
        body: "Each artwork carries a sequential number and a certificate of authenticity. Monthly production is limited to at most as many pieces as the month has days.",
      },
      {
        title: "6. Registration (optional)",
        body: "Via the website, the registration number may be recorded and an approximate location shared. Optionally, with consent, first name and a blurred location (~100 km) may appear on the public collectors’ map, along with the artwork image (and optionally a personal photo). Exact address and other contact details remain private. Full contact details are processed as described in the privacy policy.",
      },
      {
        title: "Postcard & digital products — 7. Offers",
        body: "Depending on availability and channel, the following products may be offered: (a) Single Delivery — on site in Mürren only (not sold online): one-time payment. One postcard is received immediately on site; a second postcard with a new photo and new story is mailed to the address provided about one month later. (b) Yearly Card Set — 12 months of Mürren: one-time payment for twelve postcards — one new postcard with story each month for twelve months from the start of service. This pack does not renew automatically. Before the period ends, Sundrbi GmbH may contact you (e.g. by email) to offer continuation, whether as another prepaid pack or as a subscription if then available. (c) Monthly postcard subscription — online: recurring monthly payment for one new postcard per month. Further postcard subscription periods (in particular a yearly subscription) may be introduced later; they are governed by section 10 and by the price and description stated at purchase. Motifs match the current issue period. Optionally, with consent at checkout or on site, a blurred shipping location (~100 km) and first name may appear on the public collectors’ map; the exact address remains private. (d) Digital newsletter subscription — online: a paid digital subscription delivering Mürren-related content (e.g. photos, stories, or updates) by email only, with no physical postcard shipping. The fee and billing period (e.g. a monthly fee such as CHF 5.00) are those stated at purchase. This product is governed by section 10.",
      },
      {
        title: "8. Delivery",
        body: "Physical postcards are sent by standard mail to the address provided and are not tracked. Delivery times vary by destination and postal service. In case of proven postal loss within 60 days of the shipping date (or, if unknown, the purchase date), a free replacement card will be sent if reported to {email}. Digital newsletter content is delivered electronically to the email address provided; there is no postal shipping for that product.",
      },
      {
        title: "9. Withdrawal & refunds",
        body: "After the first card of an order or pack has been handed over or shipped, or after a subscription service (physical or digital) has begun, refunds are excluded to the extent permitted by law. Statutory warranty rights remain unaffected.",
      },
      {
        title: "10. Subscriptions",
        body: "Where a product is sold as a subscription — including the monthly postcard subscription, any later yearly postcard subscription, and a digital newsletter subscription — it renews for the agreed billing period until cancelled. Cancellation is possible at any time and takes effect at the end of the current billing period — not immediately — via the payment provider’s customer portal or by email to {email}. Prepaid packs under section 7(b) are not subscriptions and do not auto-renew unless you later agree to a subscription or place a new order.",
      },
      {
        title: "11. Payments",
        body: "Online payments are processed by the integrated payment provider (e.g. Stripe). Their terms apply in addition. On-site payments follow the payment methods accepted there.",
      },
      {
        title: "12. Governing law",
        body: "Swiss law applies. Place of jurisdiction is the registered office of Sundrbi GmbH, to the extent permitted by law.",
      },
    ],
  },
  privacy: {
    eyebrow: "Legal",
    title: "Privacy policy.",
    controller: "Controller: Sundrbi GmbH, {address}. Contact: {email}.",
    sections: [
      {
        title: "1. Artwork machine",
        body: "No personal data are collected by us at the machine. Purchase is anonymous by cash or card. Card data may be processed by the on-site payment provider.",
      },
      {
        title: "2. Postcards, subscriptions & newsletter",
        body: "For shipping and contract fulfilment we collect name, postal address (where needed for physical products), email address, and payment status via our payment provider (Stripe). This covers the digital newsletter subscription, the monthly postcard subscription, and the one-year postcard pack. Postcard purchases may include the digital newsletter as part of the product; the email address is then also used to deliver that newsletter. Data are used for shipping, digital delivery, customer support, renewal reminders where applicable, and billing. They are not shared with third parties except as technically necessary with the payment provider, the postal service, and email delivery tools. Optionally, with your consent at checkout, a blurred location (~100 km radius) and your first name may appear on the public collectors’ map. The exact address is never shown publicly.",
      },
      {
        title: "3. Artwork registration",
        body: "Optional registration of a Tiny Art Surprise may include registration number, first name, last name, street and number, postal code, city, country, email address, map consent, an optional “stay anonymous publicly” choice, and an optional home photo. Name, email and full postal address remain private and are used only for administration, support, and — if you opt in — to calculate an approximate map pin. If you choose to stay anonymous publicly, your real first name is not shown on the public Collection page or on the world map; the public label is “Anonymous collector” / “Anonymous”. If you do not choose anonymity, only your first name may appear next to your artwork. Exact address, email, and other contact details are never public.",
      },
      {
        title: "4. Collection page & world map",
        body: "The public Collection page shows Tiny Art Surprise images (or placeholders before a piece is published), sorted by month and day, together with a public collector status: “Not registered”, “Collector: [first name]”, or “Collector: Anonymous collector”. The interactive world map may show blurred pins (~100 km accuracy) for artworks and for postcard/newsletter supporters who gave map consent. Map pins never reveal an exact address. Filters may distinguish artworks from postcard & newsletter connections.",
      },
      {
        title: "5. Website & hosting",
        body: "Visiting the website may generate technically necessary data (e.g. server logs) and cookies or similar technologies from hosting and embedded services (e.g. maps, payments, media). Checkout success pages and account/customer-portal links may process session or email identifiers needed to complete payment flows.",
      },
      {
        title: "6. Retention",
        body: "Personal data are stored only as long as needed for contract, shipping, digital delivery, support, collectors’ registry administration, and legal retention duties, then deleted or anonymised.",
      },
      {
        title: "7. Your rights",
        body: "Under applicable Swiss data protection law you may in particular request access, rectification, erasure, restriction of processing, and object to processing — including withdrawal of map consent or a change of your public anonymity preference where technically possible. Contact {email}.",
      },
      {
        title: "8. Contact",
        body: "For privacy questions: {email}, Sundrbi GmbH, {address}.",
      },
    ],
  },
};

const de = {
  meta: {
    titleDefault: "BOXOHO — Ein Stück Mürren, wo immer du bist",
    titleTemplate: "%s · BOXOHO",
    description:
      "Tiny Art Surprises aus dem Automaten in Mürren — und Postkarten, die dich mit dem schönsten Ort der Welt verbunden halten.",
  },
  nav: {
    main: "Hauptnavigation",
    mobile: "Mobile Navigation",
    items: [
      { href: "#postcard", label: "Postkarte" },
      { href: "#register", label: "Registrieren" },
      { href: "/collection", label: "Collection" },
      { href: "#map", label: "Weltkarte" },
      { href: "#about", label: "Über uns" },
      { href: "#impressions", label: "Mürren" },
    ],
    legal: [
      { href: "/terms", label: "AGB" },
      { href: "/privacy", label: "Datenschutz" },
    ],
  },
  lang: {
    label: "Sprache",
    en: "EN",
    de: "DE",
  },
  home: {
    eyebrow: "Post & Kunst aus Mürren",
    title: "Box Ohooo!",
    lead: "Ein Stück Mürren für zu Hause - egal wo du wohnst.",
    ctaPrimary: "Postkarte abonnieren",
    ctaSecondary: "Kunstwerk registrieren",
    mediaAutomatLabel: "Dein Tiny Art Surprise öffnen",
    mediaPostcardLabel: "Postkarte kommt im Briefkasten an",
    mediaAutomatAlt: "Comic: Box Ohooo! Tiny Art Surprise öffnen",
    mediaPostcardAlt: "Comic: Mürren-Postkarte kommt per Post an",
  },
  about: {
    eyebrow: "Über BOXOHO",
    title: "Mürren, im Schachteli — und per Post.",
    paragraphs: [
      "BOXOHO entsteht in Mürren: Tiny Art Surprises aus dem Retro-Automaten und Postkarten, die dich mit dem schönsten Ort der Welt verbunden halten. Sandrine macht beides — aus Liebe zu diesem Ort und zu den Menschen, die ein Stück davon mitnehmen.",
      "Sandrines Familie besitzt das Chalet Erika, mitten im Herzen von Mürren. Hätten sie für jedes Foto von Mürrmeli — dem berühmten Schaufenster mit dem geliebten Murmeltier — einen Franken, wären sie Millionäre. Gegenüber gehört der Familie ausserdem zwei Drittel der historischen Scheune — eine besondere, aber im Berner Oberland ganz traditionelle Besitzstruktur.",
      "Zusammen mit ihren Freunden haben Sandrine und ihre Familie diese beiden Orte zu einem durchgängigen Erlebnis über die Strasse hinweg verwoben. Ihre gemeinsame Mission: Mürren-Gästen pure Freude schenken, unvergessliche Erinnerungen schaffen und jeden Aufenthalt wirklich besonders machen.",
    ],
    creatorEyebrow: "Creatorin",
    creatorName: "Sandrine",
    creatorBody:
      "Geboren in Basel, zweites Zuhause Mürren. Creatorin und Unternehmerin — sie hofft, dass ihre Zwillingsjungs diesen Ort ebenso lieben.",
    portraitAlt: "Sandrine in Mürren",
  },
  footer: {
    eyebrow: "Boxoho · Mürren",
    blurb:
      "Ein Stück Mürren für dich zu Hause. Tiny Art Surprises aus dem Automaten — und Postkarten, die die Verbindung lebendig halten.",
    instagram: "Instagram",
    rights: "© {year} Sundrbi GmbH · Marke BOXOHO",
    contact: "Boxoho by {company} · {address} · {uid} · {email}",
  },
  thanks: {
    title: "Box Ohooo!",
    lead: "Dein kleines Stück Mürren ist unterwegs.",
    body: "Es kommt einmal im Monat — gib ihm etwas Zeit, bis es dich findet. Folge {handle}, damit die Erinnerungen an Mürren weiterleben.",
    instagramHandle: "@boxohoooo",
    homeCta: "Zurück zum Start →",
  },
  offers: {
    eyebrow: "Andenken aus Mürren",
    title: "Zwei Wege.",
    intro: "Nimm Mürren in einer Box mit nach Hause — dorthin, wo du lebst.",
    art: {
      eyebrow: "Kunstwerk",
      title: "Tiny Art Surprises",
      summary:
        "Eine Streichholz grosse Überraschung aus dem Automaten in Mürren — einzigartig, nummeriert, zum Aufhängen oder als Magnet.",
      cta: "So funktioniert das Kunstwerk",
    },
    postcard: {
      eyebrow: "Postkarte",
      title: "Mürren per Post",
      summary:
        "Bleib connected mit dem schönsten Ort der Welt — ein Motiv und eine kleine Story, direkt in deinen Briefkasten.",
      cta: "So funktioniert die Postkarte",
    },
  },
  story: {
    eyebrow: "Warum",
    title: "Die Story dahinter.",
    intro:
      "BOXOHO entsteht in Mürren: kleine Kunst zum Anfassen — und Post, die dich den Bergen nah hält.",
    paragraphs: [
      "Ein Stück Mürren für dich zu Hause — wo immer du auf der Welt bist. Das ist die Idee: etwas Echtes von hier, das bei dir bleibt, lange nachdem die Bahn wieder talwärts fährt.",
      "Die Tiny Art Surprises sind Streichholz grosse Böxchen. Öffnet man sie, liegt darin ein winziger Bilderrahmen — und darin ein Souvenir aus Mürren, künstlerisch gefasst. Ein Stein von hier, ein Fundstück, ein Moment — etwas, das einem zum Schmunzeln, aber auch manchmal zum Nachdenken bringt. Ein Keepsake.",
      "Dazu kommt ein kleines Heftchen: die Geschichte der Kollektion und die Registrierungsnummer mit Echtheitszertifikat. Man kann das Kunstwerk aufhängen oder den Magneten nutzen.",
      "Pro Monat entstehen nur so viele Stücke, wie der Monat Tage hat. Jedes wird auf Social Media dokumentiert. Kaufen kann man sie nur in Mürren — im retro Automaten, mit zweimal einem Franken.",
    ],
  },
  impressions: {
    eyebrow: "Mürren",
    title: "Impressionen.",
    placeLabel: "Mürren, 1’650 m, Schweiz",
    paragraphs: [
      "Auf der Sonnenterrasse, dem Bergpanorama von Eiger, Mönch und Jungfrau gegenüber, lädt Mürren dich ein, tief durchzuatmen und die herrliche Alpensicht zu geniessen. Von Anfang an ist das kleine Dorf in den Schweizer Alpen bekannt für reine Luft, wunderbare Natur und ein ruhiges Tempo.",
      "Schauspieler, Künstler, Schriftsteller, Wanderer, Skifahrer, Königinnen, Könige, du und ich — wir alle haben diesen magischen Ort unter den Gipfeln und über dem Tal besucht. Und sind mit einem Herzen voll einzigartiger Erinnerungen gegangen — und mit einem Geist von Freiheit und Freude.",
    ],
    instagramCta: "Auf Instagram folgen →",
    images: [
      { src: "/muerren/01-peaks.jpg", alt: "Schneebedeckte Gipfel über grünen Wiesen bei Mürren" },
      { src: "/muerren/02-huts.jpg", alt: "Alphütten und Berge mit Gleitschirmfliegern am Himmel" },
      { src: "/muerren/03-path.jpg", alt: "Wanderweg durch Wiesen Richtung Eiger-Massiv" },
      { src: "/muerren/04-village.jpg", alt: "Blick hinunter zum Dorf und in das Bergtal" },
      { src: "/muerren/05-bench.jpg", alt: "Holzbank mit Blick auf Felsen und schneebedeckte Gipfel" },
      { src: "/muerren/06-evening.jpg", alt: "Abendlicht über einer Hütte und dem Nadelwald" },
      { src: "/muerren/07-meadow.jpg", alt: "Blumenwiese mit Blick auf die Jungfrau-Region" },
    ],
  },
  creator: {
    eyebrow: "Über die Creatorin",
    title: "Sandrine.",
    intro: "Sandrine ist die Creatorin dieser Erfahrung.",
    paragraphs: [
      "Sie liebt Mürren. Sie ist nicht hier geboren, aber es ist ihr zweites Zuhause — sie ist hier fast aufgewachsen.",
      "Sie liebt es, den Menschen Freude zu bereiten, die diesen wunderbaren Ort besuchen, und möchte ihre Liebe zu Mürren mit euch allen teilen.",
      "Sandrine wurde in Basel geboren. Sie verbringt mehrere Monate, Wochenenden und Tage im Jahr in Mürren. Sie ist Creatorin und Unternehmerin. Und sie hofft, dass ihre beiden Zwillingsjungs (etwa fünf Jahre alt) diese wunderschöne Gegend ebenso schätzen werden, wie sie es getan hat und tut.",
    ],
    portraitAlt: "Sandrine beim Pflücken von Bergblumen in Mürren",
    photoNote: "Kunstwerk-Fotos — Automaten-Fotos folgen.",
    altOpen: "Geöffnete Tiny Art Surprise im Holzrahmen, zwischen zwei Fingern gehalten",
    altBox: "Geschlossenes Boxoho-Böxchen, zwischen zwei Fingern gehalten",
  },
  artworkDeep: {
    eyebrow: "Kunstwerk",
    title: "Tiny Art Surprises.",
    intro:
      "Öffne das Böxchen. Triff ein Stück Mürren — gerahmt, nummeriert, bereit für dein Zuhause.",
    body: "Im retro Automaten in Mürren: zweimal einen Franken einwerfen — und eine Streichholz grosse Überraschung ziehen. Drinnen: ein winziger Rahmen mit einem Souvenir aus Mürren, künstlerisch gefasst, plus ein kleines Heftchen mit Geschichte und Echtheitszertifikat.",
    bullets: [
      "Nur vor Ort in Mürren am Automaten",
      "So viele Stücke pro Monat wie der Monat Tage hat",
      "Aufhängen — oder den Magneten nutzen",
      "Nummer registrieren und auf der Collectors-Karte erscheinen",
    ],
    cta: "Auf der Karte registrieren →",
  },
  postcard: {
    eyebrow: "Postkarte",
    title: "Mürren zu dir nach Hause.",
    intro:
      "Ein Sujet aus Mürren, eine kleine Story — zugestellt, wo immer du bist. Wenn du bis zum 26.07.2026 mitmachst, erhältst du deine erste Postkarte Mitte August.",
    body: "Drei Wege: digitaler Newsletter, monatliche Postkarte mit Motiv, Geschichte und QR zum Newsletter — oder ein ganzes Jahr einmal bezahlt.",
    firstShipNote:
      "Wenn du bis zum 26.07.2026 mitmachst, erhältst du deine erste Postkarte Mitte August.",
    productImageAlt:
      "Comic: Hand hält eine Mürren-Postkarte mit Alpengruss von Sandrine",
    yearImageAlt:
      "Comic: ein ganzes Jahr Mürren-Postkarten gestapelt",
    newsletterImageAlt:
      "Comic: Mürren-Newsletter-E-Mail mit Alpengruss von Sandrine",
    subscription: {
      eyebrow: "Dein Plan",
      title: "Wie möchtest du connected bleiben?",
      body: "Plan wählen — Name, E-Mail und Versandadresse erfasst Stripe sicher im Checkout.",
      planSelectLabel: "Wähle deinen Plan",
      planNewsletterTitle: "Newsletter (digital)",
      planNewsletterBody: "",
      planMonthTitle: "Postkarte monatlich",
      planMonthBody: "",
      planYearTitle: "Ein Jahr (kein Abo)",
      planYearBody: "",
      planNewsletterOption: "Newsletter (digital) — CHF 5.00 / Monat",
      planMonthOption: "Postkarte monatlich (Abo) — CHF 9.00 / Monat",
      planYearOption: "Ein Jahr (kein Abo) — CHF 90.00 einmalig",
      priceAmountNewsletter: "CHF 5.00",
      pricePeriodNewsletter: "/ Monat",
      priceAmountMonth: "CHF 9.00",
      pricePeriodMonth: "/ Monat",
      priceAmountYear: "CHF 90.00",
      pricePeriodYear: " einmalig",
      priceNewsletter: "CHF 5.00 / Monat",
      priceMonth: "CHF 9.00 / Monat",
      priceYear: "CHF 90.00 · einmalig",
      factsNewsletter: [
        "Nur digital — jeden Monat per E-Mail",
        "Eine längere Mürren-Geschichte, Foto-Impressionen & what’s up im Dorf",
        "Manchmal etwas Spezielles — eine zweite Geschichte, ein Download oder ein Extra",
        "Kein Postversand",
        "Jederzeit kündbar zum Ende der Abrechnungsperiode",
      ],
      factsMonth: [
        "Standardversand weltweit (ohne Tracking)",
        "Postkarte in deinem Briefkasten, mit aktuellem Bild und Geschichte aus Mürren",
        "Newsletter-Abo gratis inklusive — längere Geschichten, Foto-Impressionen und gelegentliche Extras (zweite Geschichte, Download usw.)",
        "Jederzeit kündbar zum Ende der Abrechnungsperiode",
      ],
      factsYear: [
        "Standardversand weltweit (ohne Tracking)",
        "Postkarte in deinem Briefkasten, mit aktuellem Bild und Geschichte aus Mürren",
        "Newsletter-Abo gratis inklusive — längere Geschichten, Foto-Impressionen und gelegentliche Extras (zweite Geschichte, Download usw.)",
        "12 Monate einmal bezahlt — keine automatische Verlängerung",
      ],
      mapConsent:
        "Ich bin einverstanden, dass ein unscharfer Standort (Umkreis ca. 100 km) sowie mein Vorname auf der öffentlichen Collectors-Karte erscheinen dürfen. Die genaue Adresse bleibt privat — die Unschärfe berechnen wir automatisch. (optional)",
      legalConsentBefore: "Ich akzeptiere die",
      legalConsentTerms: "AGB",
      legalConsentAnd: "und die",
      legalConsentPrivacy: "Datenschutzerklärung",
      legalConsentRequired: "Bitte AGB und Datenschutzerklärung akzeptieren, um fortzufahren.",
      ctaContinue: "Jetzt kaufen",
      ctaBuy: "Jetzt kaufen",
      ctaNewsletter: "Jetzt kaufen",
      ctaMonth: "Jetzt kaufen",
      ctaYear: "Jetzt kaufen",
      manageCta: "Abo verwalten oder kündigen",
      portalEmail: "E-Mail",
      portalEmailPlaceholder: "die E-Mail vom Checkout",
      manageSubmit: "Kundenportal öffnen",
      loading: "Weiterleitung…",
      newsletterMissingPrice:
        "Newsletter-Checkout ist fast bereit — die Stripe-Preis-ID fehlt noch in den Env-Variablen.",
      successBanner: "Danke — du bleibst mit Mürren verbunden.",
      cancelBanner: "Checkout abgebrochen. Du kannst es jederzeit erneut versuchen.",
      errorGeneric: "Etwas ist schiefgelaufen. Bitte nochmals versuchen.",
      cta: "Postkarten holen",
      ctaSoon: "Folgt bald",
    },
    shop: {
      eyebrow: "Shop",
      title: "Mehr kaufen & connected bleiben",
      body: "Frühere Motive, leere Karten und mehr — später im Shop.",
      cta: "Zum Shop →",
      ctaSoon: "Shop · folgt bald",
    },
    bullets: [
      "Frisches Mürren-Motiv und Story mit jeder Karte",
      "Weltweiter Versand als normale Post",
      "Deine genaue Adresse bleibt privat",
    ],
    onSite: {
      title: "In Mürren vor Ort?",
      body: "Neben dem Automaten kannst du auch eine Postkarte mitnehmen — eine sofort in der Hand, eine weitere folgt per Post.",
    },
    note: "Sicherer Checkout über Stripe",
    termsLink: "AGB",
  },
  map: {
    eyebrow: "Collectors",
    title: "Wo Mürren bei dir lebt.",
    intro:
      "Auf dieser Weltkarte siehst du, wo Mürren-Friends ihre Tiny Art Surprises haben — und wo Postkarte und Newsletter jeden Monat landen. Die Eintragung auf der Karte ist optional und die Pins sind auf ca. 100 km genau — aber es macht Spass zu sehen, wer dabei ist.",
    filterLabel: "Auf der Karte zeigen",
    filterAll: "Alle",
    filterPostcards: "Postkarten & Newsletter",
    filterArtworks: "Kunstwerke",
    legendArtwork: "Kunstwerk",
    legendPostcard: "Postkarte & Newsletter",
    teaserLabel: "Karte · Folgt bald",
    teaserBody:
      "Bald: eine interaktive Karte mit registrierten Tiny Art Surprises, Postkarten-Zuhause und Newsletter-Verbindungen — immer unscharf dargestellt.",
    ctaRegister: "Kunstwerk registrieren",
    ctaPostcard: "Postkarte abonnieren",
  },
  register: {
    eyebrow: "Echtheit · Nummer",
    title: "Schon eine Tiny Art Surprise? Jetzt registrieren.",
    intro:
      "Nummer aus dem Heftchen eingeben — dann siehst du dein Stück und kannst etwas über dich angeben.",
    benefitsLabel: "Collector Benefits",
    benefits: [
      {
        title: "Wert deines Kunstwerks stärken",
        body: "Als Teil einer offiziellen Collectors-Registry hilft die Registrierung, die Herkunft zu belegen — und kann den langfristigen Wert deines Stücks erhöhen.",
      },
      {
        title: "Exklusiver Zugang",
        body: "Sollte eine besondere Überraschung, ein Limited Release oder eine private Kaufanfrage entstehen, erfährst du es als Erste:r.",
      },
      {
        title: "Flexible Sichtbarkeit",
        body: "Nach der Registrierung erscheint neben dem Kunstwerk nur dein Vorname — alles andere bleibt privat. Du kannst dich für die Öffentlichkeit auch komplett anonym halten.",
      },
      {
        title: "Zur globalen Community dazukommen (optional)",
        body: "Pinne deinen Standort auf unserer interaktiven Weltkarte. Teile und sieh, wo andere Collectors und Supporters weltweit leben (Datenschutz: Standort auf ca. 100 km unscharf).",
      },
    ],
    imageAlt: "Comic: Tiny Art Surprise auf der Weltkarte anpinnen",
    step1: "Schritt 1",
    numberLabel: "Registrierungsnummer",
    numberPlaceholder: "z. B. BX-2026-014",
    numberHint: "Gib deine Nummer ein, um das offizielle Bild deines Kunstwerks zu laden.",
    lookupCta: "Kunstwerk finden",
    step2: "Schritt 2 · Nach dem Fund",
    firstName: "Vorname",
    lastName: "Nachname",
    firstNameHint: "Bleibt für den Kontakt privat — öffentlich nur, wenn du nicht anonym bleibst.",
    street: "Strasse und Nr.",
    postalCode: "PLZ",
    city: "Ort",
    country: "Land",
    anonymousConsent: "Ich möchte öffentlich anonym bleiben (als Anonymous collector).",
    anonymousCollector: "Anonymous collector",
    previewLabel: "Vorschau Collection",
    previewNamePlaceholder: "Dein Name",
    collectorPrefix: "Collector:",
    previewMapNote: "Auf der Weltkarte bleibt dein Pin ungenau (ca. 100 km). Bei Anonymität erscheint öffentlich nur Anonymous.",
    email: "E-Mailadresse",
    photo: "Foto zu Hause",
    photoHint: "Lade hier ein Foto von deinem Kunstwerk in seinem neuen Zuhause hoch.",
    chooseFile: "Choose file",
    mapConsent:
      "Zeig mich auf der Weltkarte mit einem ungenauen Pin. Die genaue Adresse bleibt privat. Wenn ich anonym bleibe, erscheint nur «Anonymous» — nie mein echter Name. (Optional)",
    submitting: "Speichern…",
    success: "Danke — dein Kunstwerk ist registriert.",
    alreadyRegistered: "Dieses Kunstwerk ist bereits registriert.",
    errors: {
      notFound: "Kein Kunstwerk mit dieser Nummer gefunden.",
      generic: "Etwas ist schiefgelaufen. Bitte nochmals versuchen.",
      placeNotFound: "Adresse nicht gefunden. Bitte Ort und Land prüfen.",
    },
    button: "Registrieren",
  },
  collection: {
    eyebrow: "Tiny Art Surprises",
    title: "The Collection.",
    intro:
      "Jede Tiny Art Surprise des Monats — sortiert nach Tag. Registriere dein Stück, damit du als Collector daneben erscheinst.",
    teaserTitle: "The Collection",
    teaserBody:
      "Entdecke jede Tiny Art Surprise nach Monat und Tag — und sieh, welche Collectors schon registriert sind.",
    teaserCta: "Zur Collection →",
    loading: "Collection wird geladen…",
    dayLabel: "Tag",
    daysCount: "{count} Stücke diesen Monat",
    placeholder: "Folgt bald",
    notRegistered: "Nicht registriert",
    anonymousCollector: "Anonymous collector",
    collectorPrefix: "Collector:",
    monthNames: "de",
  },
  terms: {
    eyebrow: "Rechtliches",
    title: "Allgemeine Geschäftsbedingungen.",
    provider:
      "Anbieterin beider Angebote: Sundrbi GmbH, unter der Marke BOXOHO, {address}, UID {uid}.",
    sections: [
      {
        title: "1. Geltungsbereich",
        body: "Diese AGB gelten für Käufe am Boxoho-Kunstwerk-Automaten in Mürren sowie für BOXOHO-Produkte der Marke BOXOHO — physische Postkarten und digitale Angebote (inkl. eines bezahlten Digital-Newsletters), vor Ort in Mürren und/oder über die Website (inkl. QR-Code), soweit für das jeweilige Produkt zum Kaufzeitpunkt angegeben. Preise und Produktdetails ergeben sich aus dem Angebot (z. B. Stripe-Produktseite oder Information vor Ort) im Moment des Kaufs.",
      },
      {
        title: "2. Vertragsschluss",
        body: "Am Automaten bzw. vor Ort kommt der Vertrag mit Zahlung und Warenübergabe zustande (sowie, soweit vorgesehen, mit Annahme des Folgevorsands). Online mit Abschluss des Checkouts bzw. erfolgreicher Zahlung über den Zahlungsdienstleister. Gegenstand ist das jeweils gewählte Produkt (physisch und/oder digital).",
      },
      {
        title: "Kunstwerk-Automat — 3. Kauf & Übergabe",
        body: "Der Kauf erfolgt vor Ort gegen Bar- oder Kartenzahlung. Das Mini-Kunstwerk («Tiny Art Surprise») wird sofort und vollständig übergeben. Es besteht keine Versandpflicht.",
      },
      {
        title: "4. Beschaffenheit & Rückgabe",
        body: "Jedes Stück ist einzigartig und ein Überraschungskauf ohne Vorauswahl. Ein Widerrufs- oder Umtauschrecht besteht nicht, soweit gesetzlich zulässig. Bei offensichtlichen Mängeln meldet sich die Käuferschaft innert 7 Tagen unter {email}.",
      },
      {
        title: "5. Echtheit & Auflage",
        body: "Jedes Kunstwerk trägt eine fortlaufende Nummer und ein Echtheitszertifikat. Die monatliche Produktion ist auf höchstens so viele Stücke begrenzt, wie der betreffende Monat Tage hat.",
      },
      {
        title: "6. Registrierung (optional)",
        body: "Über die Website kann die Registrierungsnummer erfasst und der ungefähre Standort geteilt werden. Optional, mit Einwilligung, dürfen Vorname und ein unscharfer Standort (ca. 100 km) auf der öffentlichen Collectors-Karte erscheinen — zusammen mit dem Kunstwerkbild (optional ein eigenes Foto). Exakte Adresse und weitere Kontaktdaten bleiben privat. Vollständige Kontaktdaten verarbeitet die Anbieterin gemäss Datenschutzerklärung.",
      },
      {
        title: "Postkarten- & Digitalprodukte — 7. Angebote",
        body: "Je nach Verfügbarkeit und Verkaufskanal können folgende Produkte angeboten werden: (a) Single Delivery — nur vor Ort in Mürren (nicht online): Einmalzahlung. Eine Postkarte wird sofort vor Ort übergeben; eine zweite Postkarte mit neuem Foto und neuer Story wird etwa einen Monat später an die angegebene Adresse versendet. (b) Yearly Card Set — 12 Monate Mürren: Einmalzahlung für zwölf Postkarten — jeden Monat eine neue Postkarte mit Story über zwölf Monate ab Leistungsbeginn. Dieses Paket verlängert sich nicht automatisch. Vor Ablauf darf die Sundrbi GmbH dich kontaktieren (z. B. per E-Mail), um eine Fortsetzung anzubieten — als weiteres Prepaid-Paket oder als Abonnement, falls dann angeboten. (c) Monatliches Postkarten-Abonnement — online: wiederkehrende monatliche Zahlung für eine neue Postkarte pro Monat. Weitere Postkarten-Abo-Perioden (insbesondere ein Jahresabonnement) können später eingeführt werden; sie unterliegen Ziff. 10 sowie dem beim Kauf ausgewiesenen Preis und der Produktbeschreibung. Motive entsprechen dem aktuellen Ausgabezeitraum. Optional, mit Einwilligung beim Checkout oder vor Ort, dürfen ein unscharfer Versandort (ca. 100 km) sowie der Vorname auf der öffentlichen Collectors-Karte erscheinen; die genaue Adresse bleibt privat. (d) Digital-Newsletter-Abonnement — online: bezahltes digitales Abo mit Mürren-bezogenem Inhalt (z. B. Fotos, Stories oder Updates) ausschliesslich per E-Mail, ohne physischen Postkartenversand. Gebühr und Abrechnungsperiode (z. B. eine monatliche Gebühr wie CHF 5.00) ergeben sich aus dem Angebot beim Kauf. Dieses Produkt unterliegt Ziff. 10.",
      },
      {
        title: "8. Lieferung",
        body: "Physische Postkarten gehen als normale Post (ohne Tracking) an die angegebene Adresse. Lieferzeiten variieren je nach Zielland und Post. Bei nachweislichem Postverlust innert 60 Tagen ab Versanddatum (oder, falls unbekannt, ab Kaufdatum) wird kostenlos eine Ersatzkarte versendet, sofern dies unter {email} gemeldet wird. Digitale Newsletter-Inhalte werden elektronisch an die angegebene E-Mail-Adresse zugestellt; für dieses Produkt erfolgt kein Postversand.",
      },
      {
        title: "9. Widerruf & Rückerstattung",
        body: "Nach Übergabe oder Versand der ersten Karte einer Bestellung bzw. eines Pakets oder nach Beginn einer Abo-Leistung (physisch oder digital) ist eine Rückerstattung ausgeschlossen, soweit gesetzlich zulässig. Gesetzliche Gewährleistungsrechte bleiben unberührt.",
      },
      {
        title: "10. Abonnements",
        body: "Wird ein Produkt als Abonnement verkauft — einschliesslich des monatlichen Postkarten-Abos, eines späteren jährlichen Postkarten-Abos und eines Digital-Newsletter-Abos — verlängert es sich um die vereinbarte Abrechnungsperiode, bis es gekündigt wird. Die Kündigung ist jederzeit möglich und wirkt auf das Ende der laufenden Abrechnungsperiode — nicht sofort — über das Kundenportal des Zahlungsdienstleisters oder per E-Mail an {email}. Prepaid-Pakete nach Ziff. 7(b) sind keine Abonnements und verlängern sich nicht automatisch, es sei denn, du schließt später ein Abonnement ab oder bestellst erneut.",
      },
      {
        title: "11. Zahlungsabwicklung",
        body: "Online-Zahlungen werden über den eingebundenen Zahlungsdienstleister (z. B. Stripe) abgewickelt. Es gelten ergänzend dessen Bedingungen. Vor Ort gelten die dort akzeptierten Zahlungsmittel.",
      },
      {
        title: "12. Anwendbares Recht",
        body: "Es gilt Schweizer Recht. Gerichtsstand ist der Sitz der Sundrbi GmbH, soweit gesetzlich zulässig.",
      },
    ],
  },
  privacy: {
    eyebrow: "Rechtliches",
    title: "Datenschutzerklärung.",
    controller: "Verantwortliche Stelle: Sundrbi GmbH, {address}. Kontakt: {email}.",
    sections: [
      {
        title: "1. Kunstwerk-Automat",
        body: "Beim Kauf am Automaten werden durch uns keine Personendaten erhoben. Der Kauf erfolgt anonym gegen Bar- oder Kartenzahlung. Kartendaten werden gegebenenfalls durch den Zahlungsanbieter vor Ort verarbeitet.",
      },
      {
        title: "2. Postkarten, Abonnements & Newsletter",
        body: "Für Versand und Vertragsabwicklung erheben wir Name, Postadresse (soweit für physische Produkte nötig), E-Mail-Adresse und Zahlungsstatus über unseren Zahlungsdienstleister (Stripe). Das betrifft das digitale Newsletter-Abo, das monatliche Postkarten-Abo und das Einjahres-Postkartenpaket. Bei Postkartenkäufen kann der digitale Newsletter im Produkt enthalten sein; die E-Mail-Adresse wird dann auch für die Newsletter-Zustellung verwendet. Die Daten dienen Versand, digitaler Zustellung, Support, ggf. Verlängerungshinweisen und Abrechnung. Eine Weitergabe an Dritte erfolgt nur, soweit technisch nötig, an Zahlungsdienstleister, Post und E-Mail-Versandtools. Optional, mit Einwilligung im Checkout, dürfen ein unscharfer Standort (Umkreis ca. 100 km) sowie der Vorname auf der öffentlichen Collectors-Karte erscheinen. Die genaue Adresse wird öffentlich nie gezeigt.",
      },
      {
        title: "3. Kunstwerk-Registrierung",
        body: "Bei der optionalen Registrierung einer Tiny Art Surprise können Registrierungsnummer, Vorname, Nachname, Strasse und Nr., PLZ, Ort, Land, E-Mailadresse, Einwilligung zur Weltkarte, die Option «öffentlich anonym bleiben» sowie optional ein Foto zu Hause erfasst werden. Name, E-Mail und die vollständige Postadresse bleiben privat und dienen Verwaltung, Support und — bei Einwilligung — der Berechnung eines ungenauen Karten-Pins. Wählst du öffentliche Anonymität, erscheint dein echter Vorname weder auf der öffentlichen Collection-Seite noch auf der Weltkarte; öffentlich steht «Anonymous collector» / «Anonymous». Ohne Anonymität darf neben dem Kunstwerk nur der Vorname erscheinen. Exakte Adresse, E-Mail und weitere Kontaktdaten sind nie öffentlich.",
      },
      {
        title: "4. Collection-Seite & Weltkarte",
        body: "Auf der öffentlichen Collection-Seite werden Bilder der Tiny Art Surprises (oder Platzhalter, bevor ein Stück publiziert ist) nach Monat und Tag gezeigt, zusammen mit dem öffentlichen Collector-Status: «Nicht registriert», «Collector: [Vorname]» oder «Collector: Anonymous collector». Die interaktive Weltkarte kann unscharfe Pins (ca. 100 km) für Kunstwerke sowie für Postkarten-/Newsletter-Supporters mit Karteneinwilligung zeigen. Pins verraten nie eine genaue Adresse. Filter können Kunstwerke von Postkarten- & Newsletter-Verbindungen unterscheiden.",
      },
      {
        title: "5. Website & Hosting",
        body: "Beim Besuch der Website können technisch notwendige Daten (z. B. Server-Logs) sowie Cookies oder ähnliche Technologien von Hosting- und eingebundenen Diensten anfallen (z. B. Karte, Zahlungen, Medien). Dankesseiten nach dem Checkout sowie Links zum Kundenportal können Session- oder E-Mail-Kennungen verarbeiten, soweit für den Zahlungsablauf nötig.",
      },
      {
        title: "6. Aufbewahrung",
        body: "Personendaten werden nur so lange gespeichert, wie es für Vertrag, Versand, digitale Zustellung, Support, Verwaltung der Collectors-Registry und gesetzliche Aufbewahrungspflichten erforderlich ist. Danach werden sie gelöscht oder anonymisiert.",
      },
      {
        title: "7. Rechte",
        body: "Du hast nach anwendbarem Schweizer Datenschutzrecht insbesondere das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Bearbeitung und Widerspruch — einschliesslich Widerruf der Karteneinwilligung oder Anpassung der öffentlichen Anonymität, soweit technisch möglich. Anfragen an {email}.",
      },
      {
        title: "8. Kontakt",
        body: "Für Fragen zum Datenschutz: {email}, Sundrbi GmbH, {address}.",
      },
    ],
  },
};

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en, de };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function fill(
  template: string,
  values: Record<string, string | number>,
): string {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, String(value)),
    template,
  );
}
