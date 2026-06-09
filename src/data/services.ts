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
    image:
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80&fm=webp',
    alt: 'Nagłośnienie i oświetlenie',
  },
  {
    title: 'Multimedia',
    description:
      'Nowoczesne systemy wizyjne, ekrany LED oraz streaming online. Idealne rozwiązanie na konferencje medyczne i biznesowe.',
    image:
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80&fm=webp',
    alt: 'Multimedia i ekrany LED',
  },
  {
    title: 'Wsparcie i Wynajem',
    description:
      'Dostarczamy sprzęt najwyższej klasy wraz z obsługą techniczną. Pracujemy na terenie całego kraju.',
    image:
      'https://images.unsplash.com/photo-1485120750507-a3bf477acd63?auto=format&fit=crop&w=600&q=80&fm=webp',
    alt: 'Wynajem sprzętu',
  },
];
