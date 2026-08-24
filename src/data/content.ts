// ─────────────────────────────────────────────────────────────────────────────
// JAK EDYTOWAĆ TREŚĆ STRONY
//
// 1. Zmieniaj TYLKO ten plik: src/data/content.ts
// 2. Nie ruszaj plików .astro — one tylko wyświetlają to, co tu wpiszesz.
// 3. Po zmianie zapisz plik. Na localhost strona odświeży się sama.
// 4. Cudzysłowy zostaw. Jeśli w tekście jest apostrof, użyj ’ albo "tekst".
// 5. Listy (klienci, usługi, realizacje, FAQ): kopiuj cały blok { ... },
//    wklej pod spodem i zmień wartości. Żeby usunąć pozycję — skasuj cały blok.
//
// LOGA — sekcja `clients` („Zaufali nam”)
//   - Wrzuć plik do: public/images/logos/
//   - Nazwa bez spacji, np. logo-dom-kultury.png
//   - Wpisz: { name: 'Dom Kultury LSM', logo: '/images/logos/lsm.webp' }
//   - Logo nie jest obowiązkowe. Same imię/nazwa też zadziała:
//     { name: 'Nowa firma' }
//   - Najlepiej PNG lub WebP, kwadrat, jasne tło, max ~300–400 px.
//
// ZDJĘCIA — sekcja `portfolio` („Wybrane realizacje”)
//   - Wrzuć plik do: public/images/realizacje/
//   - Dodaj pole image, np.:
//     image: '/images/realizacje/malta.jpg',
//   - Bez `image` karta ma czarny placeholder z kategorią.
//   - Zdjęcie poziome (ok. 1200×800) wygląda najlepiej.
//
// TELEFONY — sekcja `contacts`
//   - Każda osoba to jeden blok { name, phone, phoneDisplay }
//   - Kolejność bloków = kolejność w sekcji „Kontakt”
//
// SOCIAL:
//   - W `site` uzupełnij facebook i instagram pełnym adresem https://...
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  brand: 'Chłopaki od dźwięku',
  baseUrl: 'https://www.chlopakioddzwieku.com',
  phone: '+48722880680',
  phoneDisplay: '+48 722 880 680',
  email: 'chlopakioddzwieku@gmail.com',
  facebook: '',
  instagram: '',
  year: 2026,
} as const;

// Osoby do kontaktu. Kolejność = kolejność na stronie.
// `phone` bez spacji (do klikania), `phoneDisplay` tak jak ma się wyświetlać.
export const contacts = [
  {
    name: 'Piotr Kaciuczyk',
    phone: '+48722880680',
    phoneDisplay: '+48 722 880 680',
  },
  {
    name: 'Damian Adamczewski',
    phone: '+48796608988',
    phoneDisplay: '+48 796 608 988',
  },
] as const;

export const meta = {
  title: 'Chłopaki od dźwięku – Partner Techniczny Wydarzeń | Cała Polska',
  description:
    'Bierzemy pełną odpowiedzialność za techniczną stronę imprez. Dźwięk, światło, scena, ekrany i obsługa na miejscu — w całej Polsce.',
  ogTitle: 'Chłopaki od dźwięku – Partner Techniczny Wydarzeń',
  ogDescription:
    'Projekty miejskie, eventy firmowe i sceny festiwalowe. Ty skupiasz się na organizacji, my na sprzęcie.',
  ogImageAlt: 'Piotr i Damian — Chłopaki od dźwięku',
} as const;

export const navigation = [
  { label: 'Co robimy', href: '#co-robimy' },
  { label: 'Dla kogo', href: '#dla-kogo' },
  { label: 'Realizacje', href: '#realizacje' },
  { label: 'O nas', href: '#o-nas' },
  { label: 'Kontakt', href: '#kontakt' },
] as const;

export const hero = {
  id: 'hero',
  brandText: 'Chłopaki\nod dźwięku',
  title: 'Partner techniczny wydarzeń',
  lead: 'Bierzemy pełną odpowiedzialność za techniczną stronę imprez — od koncepcji po realizację. Obsługujemy projekty miejskie, eventy firmowe i sceny festiwalowe, dzięki czemu Ty skupiasz się na organizacji, a nie na sprzęcie.',
  ctaText: 'Zapytaj o termin',
  ctaHref: '#wycena',
  phoneCtaText: 'Zadzwoń',
  phoneCtaHref: `tel:${site.phone}`,
} as const;

type ClientItem = {
  name: string;
  logo?: string;
};

export const clients: { id: string; title: string; items: ClientItem[] } = {
  id: 'zaufali-nam',
  title: 'Zaufali nam',
  items: [
    { name: 'Dzielnicowy Dom Kultury Bronowice', logo: '/images/logos/bronowice.webp' },
    { name: 'Festiwal Country Road', logo: '/images/logos/countryfest.webp' },
    { name: 'Dom Kultury LSM', logo: '/images/logos/lsm.webp' },
    { name: 'Malta Festiwal', logo: '/images/logos/malta-festiwal.webp' },
    { name: 'Miejski Ośrodek Kultury w Świdniku', logo: '/images/logos/mok-swidnik.webp' },
    { name: 'Sii', logo: '/images/logos/sii.webp' },
    // Przykład bez loga:
    // { name: 'Nowa firma' },
  ],
};

export const services = {
  id: 'co-robimy',
  title: 'Co robimy',
  list: [
    {
      title: 'Nagłośnienie i akustyka',
      description: 'Dźwięk dopasowany do sali i pleneru. Czysty głos przy przemówieniach, pełna moc na koncertach i sprawna obsługa riderów.',
    },
    {
      title: 'Oświetlenie i oprawa',
      description: 'Oświetlenie sceniczne i architektoniczne. Światło dopasowane do charakteru imprezy — od stonowanych konferencji po dynamiczne koncerty.',
    },
    {
      title: 'Sceny i konstrukcje',
      description: 'Atestowane sceny z zadaszeniem, podesty i stabilne kratownice. Bezpieczne konstrukcje dopasowane do miejsca wydarzenia.',
    },
    {
      title: 'Ekrany i wideo',
      description: 'Ekrany LED wyraźne nawet w pełnym słońcu, czytelne prezentacje oraz realizacja wideo na żywo i streaming.',
    },
    {
      title: 'Obsługa i realizacja',
      description: 'Ekipa realizatorów na miejscu. Punktualny montaż, czuwanie nad całym przebiegiem imprezy oraz sprawny demontaż.',
    },
    {
      title: 'Zasilanie i okablowanie',
      description: 'Prąd jest odpowiednio zabezpieczony. Okablowanie sceniczne zgodne z normami i bezpieczeństwem.',
    },
  ],
} as const;

export const audiences = {
  id: 'dla-kogo',
  title: 'Dla kogo pracujemy',
  items: [
    {
      title: 'Kultura i samorządy',
      description:
        'Domy kultury, szkoły i urzędy. Obsługujemy dożynki, festyny miejskie, koncerty plenerowe i lokalne przeglądy artystyczne.',
    },
    {
      title: 'Eventy firmowe',
      description:
        'Agencje, firmy i marki. Zapewniamy oprawę techniczną konferencji, gal, jubileuszy oraz wydarzeń integracyjnych.',
    },
    {
      title: 'Festiwale i plenery',
      description:
        'Promotorzy i organizatorzy. Tworzymy sceny festiwalowe, strefy sponsorów i wymagające realizacje w przestrzeni otwartej.',
    },
  ],
} as const;

export const process = {
  id: 'wspolpraca',
  title: 'Jak wygląda współpraca',
  items: [
    {
      step: 1,
      title: 'Rozmowa i brief',
      description: 'Poznajemy cel, miejsce i specyfikę wydarzenia.',
    },
    {
      step: 2,
      title: 'Dopasowana wycena',
      description: 'Dobieramy sprzęt i przedstawiamy jasny kosztorys – bez ukrytych opłat.',
    },
    {
      step: 3,
      title: 'Plan i wizja lokalna',
      description: 'Ustalamy harmonogram, a w razie potrzeby sprawdzamy warunki na miejscu.',
    },
    {
      step: 4,
      title: 'Montaż, próby i realizacja',
      description: 'Przyjeżdżamy z wyprzedzeniem, testujemy wszystko i dbamy o przebieg eventu.',
    },
    {
      step: 5,
      title: 'Demontaż i podsumowanie',
      description: 'Sprawnie składamy sprzęt, zostawiamy porządek i domykamy formalności.',
    },
  ],
} as const;

type PortfolioItem = {
  title: string;
  category: string;
  description: string;
  image?: string;
  tags: string[];
  // Data wydarzenia — pokazuje się na dole karty. Pusta = nic się nie wyświetla.
  // Wpisz jak chcesz, np. 'czerwiec 2026' albo '21–28 czerwca 2026'.
  date?: string;
};

export const portfolio: {
  id: string;
  title: string;
  socialPrefix: string;
  facebookLabel: string;
  instagramLabel: string;
  items: PortfolioItem[];
} = {
  id: 'realizacje',
  title: 'Wybrane realizacje',
  socialPrefix: 'Więcej naszych realizacji i zdjęć z planu znajdziesz na',
  facebookLabel: 'FB',
  instagramLabel: 'INSTA',
  items: [
    {
      title: 'Wiosenne wirowanie, Dom Kultury LSM',
      category: 'Domy kultury',
      description:
        'Koncert pieśni i tańca lubelskiego zespołu ludowego na scenie Domu Kultury LSM. Kapela, wokal i taniec na jednej scenie, więc pilnowaliśmy czystego brzmienia i odsłuchów, żeby umilić czas gością na sali.',
      image: '/images/realizacje/dom-kultury-lsm.webp',
      tags: ['Dom kultury', 'Koncert', 'Realizacja dźwięku'],
      date: 'kwiecień 2026',
    },
    {
      title: 'Malta Festival, Poznań',
      category: 'Festiwale i plenery',
      description:
        'Jeden z najważniejszych festiwali w Polsce — tydzień teatru, muzyki, kina i wydarzeń plenerowych w kilkudziesięciu miejscach Poznania. Byliśmy tam po stronie dźwięku oraz światła, od montażu do realizacji na żywo.',
      image: '/images/realizacje/malta-festival.webp',
      tags: ['Festiwal', 'Plener', 'Nagłośnienie', 'Oświetlenie'],
      date: 'czerwiec 2026',
    },
    {
      title: 'Dni Mełgwi i Dożynki',
      category: 'Kultura i samorządy',
      description:
        'Święto gminy w amfiteatrze w Mełgwi: korowód dożynkowy z orkiestrą dętą, konkurs wieńców i wieczorne koncerty. W tym roku gwiazdą programu był Robert Rozmus z zespołem, przypominając nam najpiękniejsze piosenki Krzysztofa Krawczyka.',
      image: '/images/realizacje/dozynki-melgiew.webp',
      tags: ['Dożynki', 'Scena plenerowa', 'Nagłośnienie'],
      date: 'sierpień 2026',
    },
    
  ],
};

export const about = {
  id: 'o-nas',
  title: 'O nas',
  paragraphs: [
    'Od 10 lat dostarczamy zaplecze techniczne na wydarzenia każdej skali – od lokalnych spotkań po duże produkcje sceniczne.',
    'Stawiamy na jasną komunikację, terminowość i niezawodny sprzęt. Bierzemy na siebie całą stronę techniczną, żebyś Ty mógł skupić się na przebiegu eventu.',
    'Na co dzień działamy w województwie lubelskim, ale realizujemy projekty w całej Polsce.',
    'Z wieloma domami kultury, samorządami i agencjami współpracujemy cyklicznie, co jest dla nas najlepszym dowodem zaufania.',
  ],
} as const;

export const cta = {
  id: 'kontakt',
  title: 'Porozmawiajmy o Twoim wydarzeniu',
  lead: 'Zostaw kontakt i najważniejsze szczegóły. Odezwiemy się w ciągu 1-2 dni roboczych, żeby sprawdzić dostępność terminu i przygotować bezpłatną propozycję.',
  ctaText: 'Zapytaj o termin i ofertę',
  ctaHref: '#wycena',
  contactsTitle: 'Wolisz porozmawiać od razu? Zadzwoń!',
} as const;

export const quoteForm = {
  id: 'wycena',
  title: 'Zapytaj o termin i ofertę',
  email: site.email,
  subject: 'Wycena — Chłopaki od dźwięku',
  template: 'table',
  fields: {
    name: {
      label: 'Imię i nazwisko',
      placeholder: 'np. Jan Kowalski',
      autocomplete: 'name',
    },
    email: {
      label: 'E-mail',
      placeholder: 'np. jan@firma.pl',
      autocomplete: 'email',
    },
    phone: {
      label: 'Telefon',
      placeholder: 'np. +48 123 456 789',
      autocomplete: 'tel',
    },
    // Pole nieobowiązkowe — nie blokuje wysłania formularza.
    date: {
      label: 'Planowana data wydarzenia (opcjonalnie)',
      placeholder: 'np. 12 września 2026 albo wrzesień',
    },
    message: {
      label: 'Opowiedz krótko o wydarzeniu',
      placeholder: 'Rodzaj wydarzenia, lokalizacja, szacowana liczba uczestników',
    },
  },
  consentText: 'Wyrażam zgodę na kontakt w celu obsługi zapytania.',
  submitText: 'Wyślij zapytanie',
  noscriptText: 'Masz wyłączony JavaScript — napisz do nas na',
  successAnchor: '#wycena-sent',
} as const;

export const faq = {
  id: 'faq',
  title: 'FAQ',
  items: [
    {
      question: 'Jak szybko dostaniemy odpowiedź i ofertę?',
      answer:
        'Odpowiadamy w ciągu 1-2 dni roboczych. Czas przygotowania propozycji zależy od skali wydarzenia i doboru sprzętu.',
    },
    {
      question: 'Z jakim wyprzedzeniem najlepiej zarezerwować termin?',
      answer:
        'Im wcześniej, tym lepiej — najbardziej oblegane terminy (szczególnie maj–czerwiec, wrzesień i grudzień) rezerwujemy często z kilkumiesięcznym wyprzedzeniem. Jeśli masz już datę wydarzenia, odezwij się jak najszybciej. Planujesz coś „na już”? Napisz lub zadzwoń — jeśli sprzęt i ekipa są wolni, pomożemy.',
    },
    {
      question: 'Od czego zależy cena obsługi technicznej?',
      answer:
        'Każdy projekt wyceniamy indywidualnie, aby klient nie płacił za sprzęt, którego nie potrzebuje. Na ostateczny koszt wpływają: skala wydarzenia, zakres potrzebnego sprzętu, czas pracy oraz logistyka.',
    },
    {
      question: 'Co musimy zapewnić po naszej stronie jako organizator?',
      answer:
        'Z Waszej strony potrzebujemy jedynie dostępu do zasilania, przygotowanej przestrzeni pod scenę/reżyserkę oraz ustalonego harmonogramu. My przywozimy własny sprzęt i okablowanie, bierzemy na siebie cały montaż, a podczas wydarzenia czuwamy nad realizacją.',
    },
    {
      question: 'Czy wystawiacie faktury VAT?',
      answer:
        'Tak, wystawiamy faktury VAT i sprawnie przechodzimy przez formalności wymagane przez firmy, agencje oraz instytucje budżetowe.',
    },
    {
      question: 'Czy możecie zająć się tylko wybraną częścią techniki?',
      answer:
        'Tak. Zapewniamy zarówno kompleksową realizację, jak i obsługę pojedynczych stref – np. samego nagłośnienia, oświetlenia czy ekranów LED.',
    },
    {
      question: 'Czy obsługujecie cykliczne wydarzenia i stałe sezony imprezowe?',
      answer:
        'Tak. Z wieloma domami kultury i samorządami współpracujemy w trybie ciągłym – obsługując pełne sezony plenerowe, coroczne festiwale czy cykliczne przeglądy artystyczne. Znamy specyfikę pracy instytucji i rozliczeń budżetowych.',
    },
  ],
} as const;

export const footer = {
  copyright: `© ${site.year} ${site.brand}. Wszystkie prawa zastrzeżone.`,
} as const;
