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
    openMenu: "Open menu",
    closeMenu: "Close menu",
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
    cookieSettings: "Cookie settings",
    rights: "© {year} Sundrbi GmbH · Brand BOXOHO",
    contact: "Boxoho by {company} · {address} · {uid} · {email}",
  },
  consent: {
    title: "Cookies & privacy",
    intro:
      "We use necessary cookies for language preference, checkout, and site security. With your consent we may also use optional statistics and marketing technologies.",
    necessaryTitle: "Necessary",
    necessaryDesc:
      "Language preference, cookie settings, payment checkout (Stripe), and basic site functions. Always active.",
    analyticsTitle: "Statistics",
    analyticsDesc:
      "Optional usage measurement to improve the website. No advertising cookies.",
    marketingTitle: "Marketing",
    marketingDesc:
      "Optional marketing technologies, e.g. embedded social media. Loaded only with your consent.",
    acceptAll: "Accept all",
    necessaryOnly: "Necessary only",
    settings: "Settings",
    save: "Save selection",
    privacyLink: "Privacy policy",
    close: "Close",
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
    body: "Three ways to stay with Mürren: a digital newsletter, a monthly postcard with story, or a full year paid once.",
    firstShipNote:
      "If you join by 26 July 2026, you’ll receive your first postcard in mid-August.",
    shippingNote:
      "Your postcard sets off at the start of every month. Depending on the destination country and postal service, it can then take up to 14 days to reach you. The newsletter goes out at the start of the month too.",
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
    popupCollector: "Collector: {name}",
    popupImageAlt: "Registered Tiny Art Surprise",
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
    street: "Street and no.",
    postalCode: "ZIP / postal code",
    city: "City",
    country: "Country",
    displayChoiceLabel: "How would you like to be mentioned on the Collection page:",
    displayChoiceName: "Use my first name on the Collection page (preview below)",
    displayChoiceAnonymous: "Show Anonymous on the Collection page (preview below)",
    anonymousCollector: "Anonymous collector",
    previewLabel: "Collection preview",
    previewNamePlaceholder: "Your name",
    collectorPrefix: "Collector:",
    previewMapNote: "On the world map your pin stays approximate (~100 km). If anonymous, only Anonymous appears publicly.",
    email: "Email address",
    photo: "Photo at home",
    photoHint: "Upload a photo of your artwork in its new home. (optional)",
    chooseFile: "Choose file",
    mapConsent:
      "Show me on the world map with an approximate pin. The exact address stays private. If I stay anonymous, only “Anonymous” is shown — never my real name. (Optional)",
    legalConsentBefore: "I accept the",
    legalConsentTerms: "Terms",
    legalConsentAnd: "and the",
    legalConsentPrivacy: "Privacy Policy",
    legalConsentRequired: "Please accept the Terms and Privacy Policy to continue.",
    submitting: "Saving…",
    success: "Thank you — your artwork is registered.",
    alreadyRegistered: "This artwork is already registered.",
    errors: {
      notFound: "No artwork found for that number.",
      generic: "Something went wrong. Please try again.",
      placeNotFound: "Could not find that address. Please check city and country.",
    },
    button: "Register now",
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
    featuredEmpty: "Featured pieces will appear here once artworks are published.",
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
    stand: "As of 20 July 2026",
    provider:
      "Provider: Sundrbi GmbH, under the brand BOXOHO, {address}, UID {uid}",
    sections: [
      {
        title: "1. Scope",
        paragraphs: [
          "These Terms and Conditions apply to all purchases and subscriptions under the brand BOXOHO — both on site in Mürren (e.g. at the artwork vending machine or directly on site) and online via the website or by QR code. They apply to physical products (e.g. artworks, postcards) as well as digital offers (e.g. a newsletter subscription).",
          "Prices, payment method and further product details arise exclusively from the respective offer at the time of purchase (e.g. Stripe product page, machine or on-site information). These Terms themselves contain no price information. All stated prices include statutory Swiss VAT, unless otherwise noted for the respective offer.",
          "All on-site offers are designed as self-service (e.g. machine or Stripe QR code, without staff on site).",
          "Rights and obligations are governed by the product categories and service descriptions in these Terms — not by the concrete product name on Stripe, the website or on site, which may differ by channel (e.g. English designations on Stripe).",
          "The provider may amend these Terms at any time. For a purchase, the version published on the website at the time the contract is formed is decisive. For ongoing subscriptions, an amended version applies from the next billing period, provided the change was communicated beforehand in a suitable form (e.g. by email or on the website).",
        ],
      },
      {
        title: "2. Contract formation",
        paragraphs: [
          "All payments — whether at the machine, via a Stripe QR code scanned on site, or directly online — are processed technically through the same online checkout of the payment provider. The contract is formed upon successful payment.",
          "The difference between offer types lies not in the payment process, but in how goods are handed over:",
        ],
        list: [
          "For on-site offers (machine, Single Delivery, prepaid pack on site), the first performance is taken immediately on site by the customer (self-service); any further performances are delivered by post.",
          "For purely online offers (without on-site collection), the entire delivery is by post or email only, without self-collection on site.",
        ],
        after: [
          "The subject matter is always the specifically chosen product (physical and/or digital) according to the offer description at the time of purchase.",
        ],
      },
      {
        title: "3. Offer & future products",
        paragraphs: [
          "The provider may expand, adapt or discontinue the range of products, formats and distribution channels at any time — for example additional physical items, further postcard formats, new subscription periods or further digital offers. For new products these Terms apply mutatis mutandis, supplemented by the conditions stated specifically at the respective purchase (in particular price, scope of performance and form of delivery).",
          "Production and stock of individual products (e.g. the monthly limited artworks) are limited. If the provider cannot fulfil an order despite careful planning (e.g. due to production or capacity constraints), it will inform the buyer without delay and refund payments already made for the unfulfilled performance in full.",
        ],
      },
      {
        title: "4. Artwork machine",
        paragraphs: [
          "Purchase is made on site using the payment methods accepted at the machine or Stripe QR code, as self-service. The mini artwork (“Tiny Art Surprise”) is taken from the machine immediately and in full; there is no shipping obligation.",
          "Each piece is unique and a surprise purchase without prior selection. There is no right of withdrawal or exchange to the extent permitted by law. For obvious defects, the buyer should contact {email} within 7 days.",
          "Each artwork carries a sequential number and a certificate of authenticity. Monthly production is limited.",
          "At the machine there is also a Stripe QR code through which a freely chosen amount may be paid voluntarily. This payment is voluntary and creates no additional entitlement to performance.",
        ],
      },
      {
        title: "5. Postcard products",
        paragraphs: [
          "Depending on availability and sales channel, the following formats are offered:",
          "a) One-time purchase with follow-up shipping on site (self-service) — e.g. labelled “Single Delivery” or “Yearly Card Set”. Available only on site in Mürren, not online, as self-service without staff on site. A first postcard is taken immediately on site by the customer; one or more further postcards, each with a new photo and new story, are then mailed to the address provided according to the quantity and rhythm stated at purchase (e.g. monthly). Not a subscription; does not renew automatically. For multi-part packs, the provider may contact you before the end of the period (e.g. by email) to offer continuation — as a further prepaid pack or as a subscription if then available.",
          "b) Prepaid postcard pack online — e.g. labelled “Yearly Card Set”. One-time payment; the number of postcards stated at purchase, each with a new photo and new story, is mailed to the address provided from the start of service in the agreed rhythm (e.g. monthly); immediate on-site collection does not apply, as there is no on-site collection. Not a subscription; does not renew automatically. The provider may contact you before the end of the period (e.g. by email) to offer continuation — as a further prepaid pack or as a subscription if then available.",
          "c) Postcard subscription (online, recurring). Recurring payment for one new postcard per billing period. Further subscription periods (e.g. an annual subscription) may be introduced later; they are governed by section 8 and by the description stated at purchase. Motifs correspond to the then-current issue period.",
        ],
      },
      {
        title: "6. Newsletter subscription (online, recurring)",
        paragraphs: [
          "Paid digital subscription with Mürren-related content (stories and image impressions from Mürren), delivered exclusively by email — without physical postal shipping. Billing period and scope of performance arise from the offer at purchase. This product is governed by section 8.",
          "Anyone who obtains a postcard product under section 5 (a, b or c) additionally receives free access to the newsletter for the duration of that product, without separate payment. This free access ends automatically when the respective postcard product expires or is cancelled, unless a paid newsletter subscription is taken out independently.",
        ],
      },
      {
        title: "7. Registration & collectors’ map (optional)",
        paragraphs: [
          "Via the website, the registration number of an artwork or postcard may be recorded. Optionally, with express consent, first name and a blurred location (~100 km) may appear on the public collectors’ world map — together with a product image (optionally a personal photo). This applies to all products, including the newsletter subscription. This display is voluntary and may be declined; in that case there is no display on the map. The exact address and other contact details remain private in every case and are processed in accordance with the privacy policy.",
          "The ~100 km figure is a target value, not an exact guarantee. Near a national border, the displayed location is additionally constrained to remain within the same country as the actual address; in these cases the blur radius may be noticeably smaller than 100 km.",
        ],
      },
      {
        title: "8. Subscriptions — term & cancellation",
        paragraphs: [
          "Where a product is sold as a subscription (including postcard subscription, any future annual postcard subscription, newsletter subscription), it renews for the agreed billing period until cancelled. Cancellation is possible at any time and takes effect at the end of the current billing period — not retroactively or immediately — via the payment provider’s customer portal.",
          "Prepaid packs under sections 5(a) and 5(b) are not subscriptions and do not renew automatically unless a subscription is later expressly concluded or a new order is placed.",
        ],
      },
      {
        title: "9. Delivery",
        paragraphs: [
          "Physical postcards are sent by standard mail without tracking to the address provided. Delivery times vary by destination country and postal service. The risk of accidental loss or accidental damage passes to the buyer upon handover to the postal service, to the extent permitted by law.",
          "Digital content (e.g. newsletter) is delivered electronically to the email address provided; there is no postal shipping for this.",
        ],
      },
      {
        title: "10. Withdrawal & refunds",
        paragraphs: [
          "After handover or shipping of the first performance of an order or pack, or after a subscription service (physical or digital) has begun, a refund is excluded to the extent permitted by law. Statutory warranty rights remain unaffected.",
        ],
      },
      {
        title: "11. Liability",
        paragraphs: [
          "The provider is liable without limitation for intent and gross negligence and for injury to life, body or health. Otherwise the provider is liable only for breach of essential contractual duties and limited to the foreseeable damage typical of the contract. Any further liability, in particular for indirect damage or consequential damage, is excluded to the extent permitted by law.",
        ],
      },
      {
        title: "12. Payments",
        paragraphs: [
          "Online payments are processed by the integrated payment provider (e.g. Stripe); their terms apply in addition. On site, the payment methods accepted there apply.",
        ],
      },
      {
        title: "13. Governing law",
        paragraphs: [
          "Swiss law applies. Place of jurisdiction is the registered office of Sundrbi GmbH, to the extent permitted by law.",
        ],
      },
    ],
  },
  privacy: {
    eyebrow: "Legal",
    title: "Privacy policy.",
    controller: "Controller: Sundrbi GmbH, under the brand BOXOHO, {address}. Contact: {email}.",
    sections: [
      {
        title: "1. Artwork machine",
        body: "No personal data are collected by us at the machine. Purchase is anonymous by cash or card. Card data may be processed by the on-site payment provider. A voluntary donation via the Stripe QR code at the machine is likewise processed by the payment provider and does not require any personal data from us.",
      },
      {
        title: "2. Postcards, subscriptions & newsletter",
        body: "For shipping and contract fulfilment we collect name, postal address (where needed for physical products), email address, and payment status via our payment provider (Stripe). This covers all postcard products (on-site Single Delivery, prepaid Yearly Card Set, and the postcard subscription) and the paid digital newsletter subscription. If you obtain a postcard product, you automatically receive free, time-limited access to the newsletter for the duration of that product; this access ends automatically when the postcard product expires or is cancelled, unless you separately hold a paid newsletter subscription — your email address is used to deliver the newsletter during that time. Data are used for shipping, digital delivery, customer support, renewal reminders where applicable, and billing. To deliver the newsletter, the email addresses of eligible subscribers are transferred to and processed by Brevo (Sendinblue SAS / Brevo SAS, France), our email marketing provider, under a data processing agreement; Brevo may store the email address, first name, and newsletter status for this purpose. Data are not otherwise shared with third parties except as technically necessary with the payment provider and the postal service. Optionally, with your consent at checkout, a blurred location (~100 km radius) and your first name may appear on the public collectors’ map. The exact address is never shown publicly.",
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
        body: "Visiting the website may generate technically necessary data (e.g. server logs, IP address, browser type, time of access) from hosting and delivery infrastructure. Checkout success pages and customer-portal links may process session or email identifiers needed to complete payment flows. Embedded services (e.g. payment checkout via Stripe, interactive maps) may process data as described by those providers, to the extent required for the function you use.",
      },
      {
        title: "6. Cookies & similar technologies",
        body: "We use cookies and similar technologies in the following categories. (a) Necessary — always active: language preference, storage of your cookie choice (cookie name boxoho_consent), payment checkout (Stripe), and basic site security/function. Without these, core features may not work. (b) Statistics — only with your consent: optional usage measurement to improve the website. We do not use advertising cookies for this category. (c) Marketing — only with your consent: optional marketing technologies, for example embedded social media content, loaded only after you opt in. You can accept all cookies, allow necessary cookies only, or choose categories under “Settings” in the cookie banner. You can change or withdraw your choice at any time via “Cookie settings” in the website footer. You can also manage or delete cookies in your browser settings.",
      },
      {
        title: "7. Retention",
        body: "Personal data are stored only as long as needed for contract, shipping, digital delivery, support, collectors’ registry administration, and legal retention duties, then deleted or anonymised. The cookie-consent cookie is typically stored for up to 12 months and is renewed when you update your choice.",
      },
      {
        title: "8. Your rights",
        body: "Under applicable Swiss data protection law you may in particular request access, rectification, erasure, restriction of processing, and object to processing — including withdrawal of map consent, a change of your public anonymity preference, or withdrawal of optional cookie consent (statistics/marketing) where technically possible. Optional cookie consent can also be changed via “Cookie settings” in the footer. Contact {email}.",
      },
      {
        title: "9. Contact",
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
    openMenu: "Menü öffnen",
    closeMenu: "Menü schliessen",
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
    cookieSettings: "Cookie-Einstellungen",
    rights: "© {year} Sundrbi GmbH · Marke BOXOHO",
    contact: "Boxoho by {company} · {address} · {uid} · {email}",
  },
  consent: {
    title: "Cookies & Datenschutz",
    intro:
      "Wir verwenden notwendige Cookies für Spracheinstellung, Checkout und Sicherheit. Mit deiner Einwilligung können wir zusätzlich optionale Statistik- und Marketing-Technologien nutzen.",
    necessaryTitle: "Notwendig",
    necessaryDesc:
      "Spracheinstellung, Cookie-Einstellungen, Zahlungs-Checkout (Stripe) und grundlegende Website-Funktionen. Immer aktiv.",
    analyticsTitle: "Statistik",
    analyticsDesc:
      "Optionale Nutzungsmessung zur Verbesserung der Website. Keine Werbe-Cookies.",
    marketingTitle: "Marketing",
    marketingDesc:
      "Optionale Marketing-Technologien, z. B. eingebundene Social-Media-Inhalte. Laden nur mit deiner Einwilligung.",
    acceptAll: "Alle akzeptieren",
    necessaryOnly: "Nur notwendige",
    settings: "Einstellungen",
    save: "Auswahl speichern",
    privacyLink: "Datenschutzerklärung",
    close: "Schliessen",
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
      "Nummer registrieren und auf der Weltkarte erscheinen",
    ],
    cta: "Auf der Karte registrieren →",
  },
  postcard: {
    eyebrow: "Postkarte",
    title: "Mürren zu dir nach Hause.",
    intro:
      "Ein Sujet aus Mürren, eine kleine Story — zugestellt, wo immer du bist. Wenn du bis zum 26.07.2026 mitmachst, erhältst du deine erste Postkarte Mitte August.",
    body: "Drei Wege: digitaler Newsletter, monatliche Postkarte mit Motiv und Geschichte — oder ein ganzes Jahr einmal bezahlt.",
    firstShipNote:
      "Wenn du bis zum 26.07.2026 mitmachst, erhältst du deine erste Postkarte Mitte August.",
    shippingNote:
      "Deine Postkarte macht sich jeweils zu Beginn des Monats auf den Weg. Je nach Zielland und Postdienst kann es danach bis zu 14 Tage dauern, bis sie bei dir ankommt. Auch der Newsletter wird jeweils zu Monatsbeginn versendet.",
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
        "Ich bin einverstanden, dass ein unscharfer Standort (Umkreis ca. 100 km) sowie mein Vorname auf der öffentlichen Weltkarte erscheinen dürfen. Die genaue Adresse bleibt privat — die Unschärfe berechnen wir automatisch. (optional)",
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
    popupCollector: "Collector: {name}",
    popupImageAlt: "Registriertes Tiny Art Surprise",
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
    street: "Strasse und Nr.",
    postalCode: "PLZ",
    city: "Ort",
    country: "Land",
    displayChoiceLabel: "Wie möchtest du auf der Collection-Seite erwähnt werden:",
    displayChoiceName: "Verwende auf der Collection-Seite meinen Vornamen (Vorschau unten)",
    displayChoiceAnonymous: "Schreibe auf der Collection-Seite Anonym. (Vorschau unten)",
    anonymousCollector: "Anonymous collector",
    previewLabel: "Vorschau Collection",
    previewNamePlaceholder: "Dein Name",
    collectorPrefix: "Collector:",
    previewMapNote: "Auf der Weltkarte bleibt dein Pin ungenau (ca. 100 km). Bei Anonymität erscheint öffentlich nur Anonymous.",
    email: "E-Mailadresse",
    photo: "Foto zu Hause",
    photoHint: "Lade hier ein Foto von deinem Kunstwerk in seinem neuen Zuhause hoch. (optional)",
    chooseFile: "Choose file",
    mapConsent:
      "Zeig mich auf der Weltkarte mit einem ungenauen Pin. Die genaue Adresse bleibt privat. Wenn ich anonym bleibe, erscheint nur «Anonymous» — nie mein echter Name. (Optional)",
    legalConsentBefore: "Ich akzeptiere die",
    legalConsentTerms: "AGB",
    legalConsentAnd: "und die",
    legalConsentPrivacy: "Datenschutzerklärung",
    legalConsentRequired: "Bitte akzeptiere die AGB und die Datenschutzerklärung, um fortzufahren.",
    submitting: "Speichern…",
    success: "Danke — dein Kunstwerk ist registriert.",
    alreadyRegistered: "Dieses Kunstwerk ist bereits registriert.",
    errors: {
      notFound: "Kein Kunstwerk mit dieser Nummer gefunden.",
      generic: "Etwas ist schiefgelaufen. Bitte nochmals versuchen.",
      placeNotFound: "Adresse nicht gefunden. Bitte Ort und Land prüfen.",
    },
    button: "Jetzt registrieren",
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
    featuredEmpty: "Featured Stücke erscheinen hier, sobald Artworks publiziert sind.",
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
    stand: "Stand: 20. Juli 2026",
    provider:
      "Anbieterin: Sundrbi GmbH, unter der Marke BOXOHO, {address}, UID {uid}",
    sections: [
      {
        title: "1. Geltungsbereich",
        paragraphs: [
          "Diese AGB gelten für alle Käufe und Abonnements der Marke BOXOHO — sowohl vor Ort in Mürren (z. B. am Kunstwerk-Automaten oder direkt vor Ort) als auch online über die Website oder per QR-Code. Sie gelten für physische Produkte (z. B. Kunstwerke, Postkarten) ebenso wie für digitale Angebote (z. B. ein Newsletter-Abonnement).",
          "Preise, Zahlungsart und weitere Produktdetails ergeben sich ausschliesslich aus dem jeweiligen Angebot im Moment des Kaufs (z. B. Stripe-Produktseite, Automat oder Information vor Ort). Diese AGB enthalten selbst keine Preisangaben. Sämtliche ausgewiesenen Preise verstehen sich inklusive der gesetzlichen Schweizer Mehrwertsteuer, sofern beim jeweiligen Angebot nichts anderes vermerkt ist.",
          "Sämtliche Vor-Ort-Angebote sind als Selfservice ausgestaltet (z. B. Automat oder Stripe-QR-Code, ohne Personal vor Ort).",
          "Massgebend für Rechte und Pflichten sind die in diesen AGB beschriebenen Produktkategorien und Leistungsbeschreibungen — nicht die konkrete Produktbezeichnung auf Stripe, der Website oder vor Ort, welche je nach Kanal abweichen kann (z. B. englische Bezeichnungen bei Stripe).",
          "Die Anbieterin kann diese AGB jederzeit ändern. Für einen Kauf massgebend ist jeweils die Version, die zum Zeitpunkt des Vertragsschlusses auf der Website veröffentlicht ist. Für laufende Abonnements gilt eine geänderte Fassung ab der jeweils nächsten Abrechnungsperiode, sofern die Änderung vorgängig in geeigneter Form (z. B. per E-Mail oder auf der Website) mitgeteilt wurde.",
        ],
      },
      {
        title: "2. Vertragsschluss",
        paragraphs: [
          "Sämtliche Zahlungen — ob am Automaten, über einen vor Ort gescannten Stripe-QR-Code oder direkt online — werden technisch über denselben Online-Checkout des Zahlungsdienstleisters abgewickelt. Der Vertrag kommt jeweils mit erfolgreicher Zahlung zustande.",
          "Der Unterschied zwischen den Angebotsformen liegt nicht im Zahlungsvorgang, sondern in der Warenübergabe:",
        ],
        list: [
          "Bei Vor-Ort-Angeboten (Automat, Single Delivery, Prepaid-Paket vor Ort) wird die erste Leistung unmittelbar vor Ort selbst entnommen (Selfservice); allfällige weitere Leistungen werden per Post zugestellt.",
          "Bei reinen Online-Angeboten (ohne Vor-Ort-Bezug) erfolgt die gesamte Zustellung ausschliesslich per Post oder E-Mail, ohne Selbstentnahme vor Ort.",
        ],
        after: [
          "Gegenstand ist jeweils das konkret gewählte Produkt (physisch und/oder digital) gemäss Angebotsbeschreibung zum Kaufzeitpunkt.",
        ],
      },
      {
        title: "3. Angebot & künftige Produkte",
        paragraphs: [
          "Die Anbieterin kann das Sortiment an Produkten, Formaten und Vertriebswegen jederzeit erweitern, anpassen oder einstellen — etwa zusätzliche physische Artikel, weitere Postkartenformate, neue Abo-Perioden oder weitere digitale Angebote. Für neue Produkte gelten diese AGB sinngemäss, ergänzt um die beim jeweiligen Kauf spezifisch angegebenen Bedingungen (insbesondere Preis, Leistungsumfang und Lieferform).",
          "Produktion und Bestand einzelner Produkte (z. B. der monatlich limitierten Kunstwerke) sind begrenzt. Kann die Anbieterin eine Bestellung trotz sorgfältiger Planung nicht erfüllen (z. B. wegen Produktions- oder Kapazitätsengpass), informiert sie die Käuferschaft unverzüglich und erstattet bereits geleistete Zahlungen für die nicht erfüllte Leistung vollständig zurück.",
        ],
      },
      {
        title: "4. Kunstwerk-Automat",
        paragraphs: [
          "Der Kauf erfolgt vor Ort gegen die am Automaten bzw. Stripe-QR-Code akzeptierten Zahlungsmittel, im Selfservice. Das Mini-Kunstwerk («Tiny Art Surprise») wird sofort und vollständig aus dem Automaten entnommen; es besteht keine Versandpflicht.",
          "Jedes Stück ist einzigartig und ein Überraschungskauf ohne Vorauswahl. Ein Widerrufs- oder Umtauschrecht besteht nicht, soweit gesetzlich zulässig. Bei offensichtlichen Mängeln meldet sich die Käuferschaft innert 7 Tagen unter {email}.",
          "Jedes Kunstwerk trägt eine fortlaufende Nummer und ein Echtheitszertifikat. Die monatliche Produktion ist limitiert.",
          "Am Automaten steht zusätzlich ein Stripe-QR-Code zur Verfügung, über den freiwillig ein selbst gewählter Betrag entrichtet werden kann. Diese Zahlung ist freiwillig und begründet keinen zusätzlichen Leistungsanspruch.",
        ],
      },
      {
        title: "5. Postkarten-Produkte",
        paragraphs: [
          "Je nach Verfügbarkeit und Verkaufskanal werden folgende Formate angeboten:",
          "a) Einmalkauf mit Nachversand vor Ort (Selfservice) — z. B. als «Single Delivery» oder «Yearly Card Set» bezeichnet. Nur vor Ort in Mürren erhältlich, nicht online, im Selfservice ohne Personal vor Ort. Eine erste Postkarte wird sofort vor Ort selbst entnommen; eine oder mehrere weitere Postkarten mit jeweils neuem Foto und neuer Story werden anschliessend gemäss der beim Kauf angegebenen Anzahl und Rhythmus (z. B. monatlich) an die angegebene Adresse versendet. Kein Abonnement; verlängert sich nicht automatisch. Bei mehrteiligen Paketen darf die Anbieterin vor Ablauf Kontakt aufnehmen (z. B. per E-Mail), um eine Fortsetzung anzubieten — als weiteres Prepaid-Paket oder als Abonnement, falls dann verfügbar.",
          "b) Prepaid-Postkartenpaket online — z. B. als «Yearly Card Set» bezeichnet. Einmalzahlung; die beim Kauf angegebene Anzahl Postkarten mit jeweils neuem Foto und neuer Story wird ab Leistungsbeginn im vereinbarten Rhythmus (z. B. monatlich) an die angegebene Adresse versendet; eine sofortige Entnahme vor Ort entfällt, da kein Vor-Ort-Bezug stattfindet. Kein Abonnement; verlängert sich nicht automatisch. Die Anbieterin darf vor Ablauf Kontakt aufnehmen (z. B. per E-Mail), um eine Fortsetzung anzubieten — als weiteres Prepaid-Paket oder als Abonnement, falls dann verfügbar.",
          "c) Postkarten-Abonnement (online, wiederkehrend). Wiederkehrende Zahlung für eine neue Postkarte pro Abrechnungsperiode. Weitere Abo-Perioden (z. B. ein Jahresabonnement) können künftig eingeführt werden; sie unterliegen Ziff. 8 sowie der beim Kauf ausgewiesenen Beschreibung. Motive entsprechen dem jeweils aktuellen Ausgabezeitraum.",
        ],
      },
      {
        title: "6. Newsletter-Abonnement (online, wiederkehrend)",
        paragraphs: [
          "Bezahltes digitales Abonnement mit Mürren-bezogenem Inhalt (Geschichten und Bild-Impressionen aus Mürren), das ausschliesslich per E-Mail zugestellt wird — ohne physischen Postversand. Abrechnungsperiode und Leistungsumfang ergeben sich aus dem Angebot beim Kauf. Dieses Produkt unterliegt Ziff. 8.",
          "Wer ein Postkarten-Produkt gemäss Ziff. 5 (a, b oder c) bezieht, erhält für die Dauer des jeweiligen Bezugs zusätzlich kostenlosen Zugang zum Newsletter, ohne gesonderte Zahlung. Dieser kostenlose Zugang endet automatisch mit Ablauf bzw. Kündigung des jeweiligen Postkarten-Produkts, sofern nicht eigenständig ein bezahltes Newsletter-Abonnement abgeschlossen wird.",
        ],
      },
      {
        title: "7. Registrierung & Weltkarte (optional)",
        paragraphs: [
          "Über die Website kann die Registrierungsnummer eines Kunstwerks oder einer Postkarte erfasst werden. Optional, mit ausdrücklicher Einwilligung, dürfen Vorname und ein unscharfer Standort (ca. 100 km) auf der öffentlichen Weltkarte erscheinen — zusammen mit einem Produktbild (optional ein eigenes Foto). Dies gilt für alle Produkte, einschliesslich des Newsletter-Abonnements. Diese Anzeige ist freiwillig und kann abgelehnt werden; in diesem Fall erfolgt keine Anzeige auf der Karte. Die exakte Adresse und weitere Kontaktdaten bleiben in jedem Fall privat und werden gemäss Datenschutzerklärung verarbeitet.",
          "Die Angabe von ca. 100 km ist ein Zielwert, keine exakte Garantie. In der Nähe einer Landesgrenze wird der angezeigte Standort zusätzlich so eingeschränkt, dass er im selben Land wie die tatsächliche Adresse bleibt; in diesen Fällen kann der Unschärferadius merklich kleiner als 100 km ausfallen.",
        ],
      },
      {
        title: "8. Abonnements — Laufzeit & Kündigung",
        paragraphs: [
          "Wird ein Produkt als Abonnement verkauft (u. a. Postkarten-Abo, künftiges Jahres-Postkarten-Abo, Newsletter-Abo), verlängert es sich jeweils um die vereinbarte Abrechnungsperiode, bis es gekündigt wird. Die Kündigung ist jederzeit möglich und wirkt auf das Ende der laufenden Abrechnungsperiode — nicht rückwirkend oder sofort — über das Kundenportal des Zahlungsdienstleisters.",
          "Prepaid-Pakete gemäss Ziff. 5(a) und 5(b) sind keine Abonnements und verlängern sich nicht automatisch, es sei denn, es wird später ausdrücklich ein Abonnement abgeschlossen oder erneut bestellt.",
        ],
      },
      {
        title: "9. Lieferung",
        paragraphs: [
          "Physische Postkarten werden als normale Post ohne Tracking an die angegebene Adresse versendet. Lieferzeiten variieren je nach Zielland und Postdienst. Die Gefahr des zufälligen Untergangs oder der zufälligen Beschädigung geht mit Übergabe an die Post auf die Käuferschaft über, soweit gesetzlich zulässig.",
          "Digitale Inhalte (z. B. Newsletter) werden elektronisch an die angegebene E-Mail-Adresse zugestellt; hierfür erfolgt kein Postversand.",
        ],
      },
      {
        title: "10. Widerruf & Rückerstattung",
        paragraphs: [
          "Nach Übergabe bzw. Versand der ersten Leistung einer Bestellung oder eines Pakets, oder nach Beginn einer Abo-Leistung (physisch oder digital), ist eine Rückerstattung ausgeschlossen, soweit gesetzlich zulässig. Gesetzliche Gewährleistungsrechte bleiben unberührt.",
        ],
      },
      {
        title: "11. Haftung",
        paragraphs: [
          "Die Anbieterin haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie für die Verletzung von Leben, Körper oder Gesundheit. Im Übrigen haftet die Anbieterin nur für die Verletzung wesentlicher Vertragspflichten und beschränkt auf den vertragstypisch vorhersehbaren Schaden. Eine weitergehende Haftung, insbesondere für indirekte Schäden oder Folgeschäden, ist ausgeschlossen, soweit gesetzlich zulässig.",
        ],
      },
      {
        title: "12. Zahlungsabwicklung",
        paragraphs: [
          "Online-Zahlungen werden über den eingebundenen Zahlungsdienstleister (z. B. Stripe) abgewickelt; dessen Bedingungen gelten ergänzend. Vor Ort gelten die dort akzeptierten Zahlungsmittel.",
        ],
      },
      {
        title: "13. Anwendbares Recht",
        paragraphs: [
          "Es gilt Schweizer Recht. Gerichtsstand ist der Sitz der Sundrbi GmbH, soweit gesetzlich zulässig.",
        ],
      },
    ],
  },
  privacy: {
    eyebrow: "Rechtliches",
    title: "Datenschutzerklärung.",
    controller: "Verantwortliche Stelle: Sundrbi GmbH, unter der Marke BOXOHO, {address}. Kontakt: {email}.",
    sections: [
      {
        title: "1. Kunstwerk-Automat",
        body: "Beim Kauf am Automaten werden durch uns keine Personendaten erhoben. Der Kauf erfolgt anonym gegen Bar- oder Kartenzahlung. Kartendaten werden gegebenenfalls durch den Zahlungsanbieter vor Ort verarbeitet. Eine freiwillige Spende über den Stripe-QR-Code am Automaten wird ebenfalls durch den Zahlungsdienstleister verarbeitet und erfordert von uns keine Personendaten.",
      },
      {
        title: "2. Postkarten, Abonnements & Newsletter",
        body: "Für Versand und Vertragsabwicklung erheben wir Name, Postadresse (soweit für physische Produkte nötig), E-Mail-Adresse und Zahlungsstatus über unseren Zahlungsdienstleister (Stripe). Das betrifft sämtliche Postkarten-Produkte (Single Delivery vor Ort, Prepaid-Yearly-Card-Set und das Postkarten-Abonnement) sowie das bezahlte Digital-Newsletter-Abo. Wer ein Postkarten-Produkt bezieht, erhält automatisch für die Dauer dieses Produkts kostenlosen, zeitlich befristeten Zugang zum Newsletter; dieser Zugang endet automatisch mit Ablauf bzw. Kündigung des Postkarten-Produkts, sofern nicht eigenständig ein bezahltes Newsletter-Abo besteht — die E-Mail-Adresse wird währenddessen für die Newsletter-Zustellung verwendet. Die Daten dienen Versand, digitaler Zustellung, Support, ggf. Verlängerungshinweisen und Abrechnung. Für den Versand des Newsletters werden die E-Mail-Adressen berechtigter Abonnentinnen und Abonnenten an Brevo (Sendinblue SAS / Brevo SAS, Frankreich), unseren E-Mail-Marketing-Dienstleister, übermittelt und dort im Rahmen eines Auftragsverarbeitungsvertrags verarbeitet; Brevo kann dazu E-Mail-Adresse, Vorname und Newsletter-Status speichern. Eine darüber hinausgehende Weitergabe an Dritte erfolgt nur, soweit technisch nötig, an Zahlungsdienstleister und Post. Optional, mit Einwilligung im Checkout, dürfen ein unscharfer Standort (Umkreis ca. 100 km) sowie der Vorname auf der öffentlichen Collectors-Karte erscheinen. Die genaue Adresse wird öffentlich nie gezeigt.",
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
        body: "Beim Besuch der Website können technisch notwendige Daten anfallen (z. B. Server-Logs, IP-Adresse, Browsertyp, Zugriffszeit) über Hosting- und Auslieferungsinfrastruktur. Dankesseiten nach dem Checkout sowie Links zum Kundenportal können Session- oder E-Mail-Kennungen verarbeiten, soweit für den Zahlungsablauf nötig. Eingebundene Dienste (z. B. Zahlungs-Checkout über Stripe, interaktive Karten) können Daten verarbeiten, soweit für die von dir genutzte Funktion erforderlich — nach den Angaben der jeweiligen Anbieter.",
      },
      {
        title: "6. Cookies & ähnliche Technologien",
        body: "Wir verwenden Cookies und ähnliche Technologien in folgenden Kategorien. (a) Notwendig — immer aktiv: Spracheinstellung, Speicherung deiner Cookie-Auswahl (Cookie-Name boxoho_consent), Zahlungs-Checkout (Stripe) sowie grundlegende Sicherheit und Funktionen der Website. Ohne diese können Kernfunktionen nicht zuverlässig laufen. (b) Statistik — nur mit deiner Einwilligung: optionale Nutzungsmessung zur Verbesserung der Website. Für diese Kategorie setzen wir keine Werbe-Cookies ein. (c) Marketing — nur mit deiner Einwilligung: optionale Marketing-Technologien, z. B. eingebundene Social-Media-Inhalte, die erst nach Opt-in geladen werden. Du kannst alle Cookies akzeptieren, nur notwendige zulassen oder Kategorien unter «Einstellungen» im Cookie-Banner wählen. Deine Wahl kannst du jederzeit über «Cookie-Einstellungen» im Footer der Website ändern oder widerrufen. Cookies kannst du zudem in den Einstellungen deines Browsers verwalten oder löschen.",
      },
      {
        title: "7. Aufbewahrung",
        body: "Personendaten werden nur so lange gespeichert, wie es für Vertrag, Versand, digitale Zustellung, Support, Verwaltung der Collectors-Registry und gesetzliche Aufbewahrungspflichten erforderlich ist. Danach werden sie gelöscht oder anonymisiert. Das Cookie zur Speicherung der Einwilligung wird in der Regel bis zu 12 Monate gespeichert und bei einer neuen Auswahl erneuert.",
      },
      {
        title: "8. Rechte",
        body: "Du hast nach anwendbarem Schweizer Datenschutzrecht insbesondere das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Bearbeitung und Widerspruch — einschliesslich Widerruf der Karteneinwilligung, Anpassung der öffentlichen Anonymität oder Widerruf optionaler Cookie-Einwilligungen (Statistik/Marketing), soweit technisch möglich. Optionale Cookie-Einwilligungen kannst du auch über «Cookie-Einstellungen» im Footer ändern. Anfragen an {email}.",
      },
      {
        title: "9. Kontakt",
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
