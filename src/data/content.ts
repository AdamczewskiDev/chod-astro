// ─────────────────────────────────────────────────────────────────────────────
// CENTRALNE MIEJSCE EDYCJI TEKSTÓW I ZAWARTOŚCI STRONY
//
// Zmień wartości poniżej, a strona automatycznie się zaktualizuje.
// Nie musisz edytować komponentów Astro.
//
// TODO dla użytkownika:
//  - uzupełnij `site.facebook` i `site.instagram` prawdziwymi adresami profili
//  - uzupełnij `site.facebook` i `site.instagram` prawdziwymi adresami profili
//  - podmień logotypy w sekcji `clients` na prawdziwe nazwy klientów
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

export const meta = {
  title: 'Chłopaki od dźwięku – Partner Techniczny Wydarzeń | Cała Polska',
  description:
    'Bierzemy pełną odpowiedzialność za techniczną stronę imprez. Dźwięk, światło, scena, ekrany i obsługa na miejscu — w całej Polsce.',
  ogTitle: 'Chłopaki od dźwięku – Partner Techniczny Wydarzeń',
  ogDescription:
    'Projekty miejskie, eventy firmowe i sceny festiwalowe. Ty skupiasz się na organizacji, my na sprzęcie.',
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
  brandText: 'Chłopaki od dźwięku',
  title: 'Partner techniczny wydarzeń',
  lead: 'Bierzemy pełną odpowiedzialność za techniczną stronę imprez — od koncepcji po realizację. Obsługujemy projekty miejskie, eventy firmowe i sceny festiwalowe, dzięki czemu Ty skupiasz się na organizacji, a nie na sprzęcie.',
  ctaText: 'Zapytaj o termin',
  ctaHref: '#wycena',
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
  list: [
    {
      title: 'Dźwięk i mikrofony',
      description: 'Czysty głos prelegenta, brak pisków i hałasu.',
    },
    {
      title: 'Światło i oprawa',
      description: 'Dobrze oświetlona scena i klimat dopasowany do wydarzenia.',
    },
    {
      title: 'Scena i podesty',
      description: 'Stabilna konstrukcja, prelegent widoczny z każdego miejsca.',
    },
    {
      title: 'Ekrany i wideo',
      description: 'Czytelne slajdy na sali i płynna transmisja do sieci.',
    },
    {
      title: 'Obsługa na miejscu',
      description: 'Dbałość o sprzęt i przebieg od montażu do demontażu.',
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

export const portfolio = {
  id: 'realizacje',
  title: 'Wybrane realizacje',
  socialPrefix: 'Więcej naszych realizacji i zdjęć z planu znajdziesz na',
  facebookLabel: 'FB',
  instagramLabel: 'INSTA',
  items: [
    {
      title: 'Plenerowy koncert miejski',
      category: 'Kultura i samorządy',
      description:
        'Scena plenerowa przygotowana na 800 osób. Zapewniliśmy nagłośnienie systemowe, oprawę świetlną oraz pełną obsługę realizatorów.',
      tags: ['Plener', 'Koncert', 'Nagłośnienie'],
    },
    {
      title: 'Gala jubileuszowa marki',
      category: 'Eventy firmowe',
      description:
        'Połączenie konferencji i wieczornej gali. Zbudowaliśmy scenę z ekranem LED oraz zadbaliśmy o oprawę oświetleniową i dźwięk.',
      tags: ['Gala', 'Ekrany LED', 'Oświetlenie'],
    },
    {
      title: 'Scena główna festiwalu',
      category: 'Festiwale i plenery',
      description:
        'Obsługa techniczna pełnego line-upu artystów. Sprawna koordynacja zmian na scenie i ciągłość pracy sprzętu bez opóźnień.',
      tags: ['Festiwal', 'Scena główna', 'Realizacja'],
    },
  ],
} as const;

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
  lead: 'Zostaw kontakt i najważniejsze szczegóły. Odezwiemy się w ciągu 1 dnia roboczego, żeby sprawdzić dostępność terminu i przygotować bezpłatną propozycję.',
  ctaText: 'Zapytaj o termin i ofertę',
  ctaHref: '#wycena',
  sideNotes: [
    {
      title: 'Wolisz porozmawiać od razu?',
      text: `Zadzwoń: ${site.phoneDisplay} (Piotr Kaciuczyk – obsługa wydarzeń)`,
      href: `tel:${site.phone}`,
    },
  ],
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
    message: {
      label: 'Opowiedz krótko o wydarzeniu',
      placeholder: 'Rodzaj wydarzenia, planowany termin, lokalizacja, szacowana liczba uczestników',
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
        'Zazwyczaj odpowiadamy w ciągu 1 dnia roboczego. Czas przygotowania propozycji zależy od skali wydarzenia i doboru sprzętu.',
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
