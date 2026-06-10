export interface Service {
  title: string;
  description: string;
  image: string;
  alt: string;
}

export const services: Service[] = [
  {
    title: 'Nagłośnienie i Światło',
    description:
      'Kompleksowa obsługa koncertów, eventów plenerowych oraz imprez masowych. Czysty dźwięk i widowiskowe iluminacje.',
    image: '/images/services/naglosnienie.webp',
    alt: 'Nagłośnienie i oświetlenie',
  },
  {
    title: 'Multimedia',
    description:
      'Nowoczesne systemy wizyjne, ekrany LED oraz streaming online. Idealne rozwiązanie na konferencje medyczne i biznesowe.',
    image: '/images/services/multimedia.webp',
    alt: 'Multimedia i ekrany LED',
  },
  {
    title: 'Wsparcie i Wynajem',
    description:
      'Dostarczamy sprzęt najwyższej klasy wraz z obsługą techniczną. Pracujemy na terenie całego kraju.',
    image: '/images/services/wynajem.webp',
    alt: 'Wynajem sprzętu',
  },
];
