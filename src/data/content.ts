// ─────────────────────────────────────────────────────────────────────────────
// CENTRALNE MIEJSCE EDYCJI TEKSTÓW I ZAWARTOŚCI STRONY
//
// Zmień wartości poniżej, a strona automatycznie się zaktualizuje.
// Nie musisz edytować komponentów Astro.
//
// TODO dla użytkownika:
//  - uzupełnij `hero.years` (obecnie "X")
//  - uzupełnij `cta.contactName` przy telefonie (obecnie "Imię i nazwisko")
//  - podmień logotypy w sekcji `clients` na prawdziwe nazwy klientów
//  - podmień zdjęcia w sekcji `portfolio` na prawdziwe realizacje
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  brand: 'Chłopaki od dźwięku',
  baseUrl: 'https://www.chlopakioddzwieku.com',
  phone: '+48722880680',
  phoneDisplay: '+48 722 880 680',
  email: 'chlopakioddzwieku@gmail.com',
  year: 2026,
} as const;

export const meta = {
  title: 'Chłopaki od dźwięku – Partner Techniczny Wydarzeń | Cała Polska',
  description:
    'Przejmujemy odpowiedzialność za stronę techniczną wydarzeń. Nagłośnienie, oświetlenie, scenotechnika, multimedia i koordynacja realizacji.',
  ogTitle: 'Chłopaki od dźwięku – Partner Techniczny Wydarzeń',
  ogDescription:
    'Wydarzenia miejskie, eventy firmowe, sceny festiwalowe. Ty organizujesz, my odpowiadamy za technikę.',
  ogImageAlt: 'Partner techniczny wydarzeń: nagłośnienie, światło, scena',
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
  brandText: 'CHŁOPAKI OD DŹWIĘKU',
  title: 'PARTNER TECHNICZNY WYDARZEŃ',
  lead: 'Przejmujemy odpowiedzialność za tech. stronę wydarzeń — od koncepcji po realizację. Obsługujemy wydarzenia miejskie, eventy firmowe i sceny festiwalowe, dzięki czemu organizatorzy mogą skupić się na wydarzeniu zamiast na technice.',
  ctaText: 'Porozmawiajmy o Twoim wydarzeniu',
  ctaHref: '#kontakt',
  phoneCtaText: 'Zadzwoń',
  phoneCtaHref: `tel:${site.phone}`,
} as const;

export const clients = {
  id: 'zaufali-nam',
  title: 'Zaufali nam',
  items: [
    { name: 'Miasto Lublin', logo: '/images/logos/logo-miasto-lublin.png' },
    { name: 'Dom Kultury LSM', logo: '/images/logos/logo-dom-kultury.png' },
    { name: 'Festiwal Kulturalny', logo: '/images/logos/logo-festiwal.png' },
    { name: 'EventPro', logo: '/images/logos/logo-eventpro.png' },
    { name: 'Scena Miejska', logo: '/images/logos/logo-scena-miejska.png' },
    { name: 'Lubelska Impreza', logo: '/images/logos/logo-lubelska-impreza.png' },
  ],
} as const;

export const services = {
  id: 'co-robimy',
  title: 'Co robimy',
  intro: 'Zapewniamy kompleksową obsługę tech. wydarzeń:',
  list: [
    'nagłośnienie',
    'oświetlenie',
    'scenotechnika',
    'multimedia',
    'obsługę tech.',
    'koordynację realizacji',
  ],
  closingNote: 'Ty odpowiadasz za wydarzenie. My odpowiadamy za technikę.',
} as const;

export const audiences = {
  id: 'dla-kogo',
  title: 'Dla kogo pracujemy',
  items: [
    {
      title: 'INSTYTUCJE KULTURY I WYDARZENIA MIEJSKIE + KULTURALNE LOKALNE',
      description:
        'Koncerty, festyny i wydarzenia plenerowe, obchody miejskie, imprezy organizowane przez samorządy oraz instytucje kultury. Wspieramy domy kultury, szkoły, samorządy i organizatorów wydarzeń lokalnych. Od występów teatralnych i przeglądów amatorskich przez dożynki i wydarzenia szkolne aż po koncerty i festyny.',
      icon: 'institution',
    },
    {
      title: 'EVENTY FIRMOWE',
      description: 'Gale, jubileusze, konferencje, wydarzenia dla pracowników i klientów.',
      icon: 'business',
    },
    {
      title: 'SCENY FESTIWALOWE',
      description:
        'Sceny tradycyjne, strefy sponsorów, wydarzenia specjalne i realizacje będące częścią większego festiwalu.',
      icon: 'festival',
    },
  ],
} as const;

export const process = {
  id: 'wspolpraca',
  title: 'Jak wygląda współpraca',
  items: [
    {
      step: 1,
      title: 'Poznajemy wydarzenie',
      description: 'Rozmawiamy o celu, miejscu i wymaganiach.',
    },
    {
      step: 2,
      title: 'Przygotowujemy rozwiązanie',
      description: 'Dobieramy technikę i plan realizacji.',
    },
    {
      step: 3,
      title: 'Realizujemy wydarzenie',
      description: 'Zapewniamy pełną obsługę techniczną.',
    },
    {
      step: 4,
      title: 'Zamykamy projekt',
      description: 'Po zakończeniu sprawnie demontujemy sprzęt i zamykamy wszystkie kwestie organizacyjne.',
    },
  ],
} as const;

export const portfolio = {
  id: 'realizacje',
  title: 'Wybrane realizacje',
  socialNote: 'Więcej realizacji znajdziesz na FB / INSTA.',
  items: [
    {
      title: 'Wydarzenie miejskie – Letni Koncert',
      category: 'Wydarzenie miejskie',
      description: 'Plenerowa scena na 800 osób. Nagłośnienie line-array, oświetlenie sceniczne i pełna obsługa techniczna.',
      tags: ['Line-array', 'Outdoor', 'Live sound'],
      color: '#2563eb',
    },
    {
      title: 'Dom Kultury – Przegląd Amatorski',
      category: 'Instytucja kultury',
      description: 'Wielogodzinna obsługa sceniczna dla lokalnych artystów: dźwięk, światło i koordynacja.',
      tags: ['Institution', 'Coordination', 'Stage'],
      color: '#0ea5e9',
    },
    {
      title: 'Event Firmowy – Gala Jubileuszowa',
      category: 'Event firmowy',
      description: 'Konferencja, bankiet i występ sceniczny w jednym. Multimedia, nagłośnienie i oświetlenie.',
      tags: ['Conference', 'Gala', 'LED'],
      color: '#8b5cf6',
    },
    {
      title: 'Scena Festiwalowa – Strefa Sponsora',
      category: 'Scena festiwalowa',
      description: 'Mała scena w ramach dużego festiwalu. Szybki montaż, pełna obsługa i demontaż.',
      tags: ['Festival', 'Sponsor zone', 'Fast setup'],
      color: '#f59e0b',
    },
    {
      title: 'Koncert Plenerowy – Dzień Miasta',
      category: 'Wydarzenie miejskie',
      description: 'Obsługa techniczna koncertu na głównym placu miasta. Dźwięk, światło i backline.',
      tags: ['City day', 'Concert', 'Backline'],
      color: '#10b981',
    },
    {
      title: 'Festiwal – Scena Główna',
      category: 'Scena festiwalowa',
      description: 'Wielogodzinna realizacja na głównej scenie festiwalu. Koordynacja zespołów i sprzętu.',
      tags: ['Main stage', 'Festival', 'Coordination'],
      color: '#ec4899',
    },
  ],
} as const;

export const about = {
  id: 'o-nas',
  title: 'O nas',
  paragraphs: [
    'Od X lat wspieramy organizatorów wydarzeń w realizacji projektów o różnej skali – od lokalnych wydarzeń po duże produkcje sceniczne.',
    'Stawiamy na odpowiedzialność, komunikację i sprawdzone rozwiązania techniczne.',
    'Na co dzień działamy na terenie województwa lubelskiego, ale obsługujemy wydarzenia również w innych częściach kraju.',
  ],
} as const;

export const cta = {
  id: 'kontakt',
  title: 'Porozmawiajmy o Twoim wydarzeniu',
  lead: 'Zostaw kontakt i kilka info o wydarzeniu. Odezwiemy się, aby omówić szczegóły i przygotować propozycję.',
  ctaText: 'Wypełnij formularz wyceny',
  ctaHref: '#wycena',
  sideNotes: [
    {
      title: 'Wolisz porozmawiać od razu?',
      text: `Zadzwoń: ${site.phoneDisplay} (Imię i nazwisko)`,
      href: `tel:${site.phone}`,
    },
    {
      title: 'Nie lubisz czekać?',
      text: 'Odpowiadamy sprawnie (w ciągu 1 dnia roboczego).',
      href: undefined,
    },
  ],
} as const;

export const quoteForm = {
  id: 'wycena',
  title: 'Formularz wyceny',
  email: site.email,
  subject: 'Wycena — Chłopaki od dźwięku',
  template: 'table',
  fields: {
    name: {
      label: 'Imię i nazwisko',
      placeholder: 'Twoje imię i nazwisko',
      autocomplete: 'name',
    },
    email: {
      label: 'E-mail',
      placeholder: 'Twój adres e-mail',
      autocomplete: 'email',
    },
    phone: {
      label: 'Tel.',
      placeholder: 'Twój numer telefonu',
      autocomplete: 'tel',
    },
    message: {
      label: 'Opowiedz krótko o wydarzeniu',
      placeholder: 'Rodzaj wydarzenia, termin, lokalizacja, liczba uczestników itp.',
    },
  },
  consentText: 'Wyrażam zgodę na kontakt w sprawie wyceny.',
  submitText: 'Wyślij',
  noscriptText: 'Masz wyłączony JavaScript — napisz do nas na',
  successAnchor: '#wycena-sent',
} as const;

export const faq = {
  id: 'faq',
  title: 'FAQ',
  items: [
    {
      question: 'Jak szybko dostanę wycenę?',
      answer: 'Zazwyczaj odpowiadamy w ciągu 1 dnia roboczego. Wycena zależy od skali, lokalizacji i wymaganej techniki.',
    },
    {
      question: 'Czy obsługujecie wydarzenia poza województwem lubelskim?',
      answer: 'Tak. Na co dzień działamy w województwie lubelskim, ale realizujemy wydarzenia w całej Polsce.',
    },
    {
      question: 'Czy możecie zająć się tylko częścią techniczną?',
      answer: 'Oczywiście. Możemy dostarczyć samo nagłośnienie, światło, multimedia lub pełną obsługę techniczną.',
    },
  ],
} as const;

export const footer = {
  copyright: `© ${site.year} ${site.brand}. Wszystkie prawa zastrzeżone.`,
} as const;

export const iconMap: Record<string, string> = {
  institution: '🏛️',
  business: '💼',
  festival: '🎪',
};
