/**
 * DEPOIMENTOS
 * ---------------------------------------------------------------
 * Use apenas depoimentos reais, com autorização do cliente.
 * photo: foto da pessoa ou logotipo da empresa (quadrado). Ex.: 'media/depoimentos/ana.jpg'
 * rating: nota de 1 a 5. Deixe null enquanto não tiver a avaliação real.
 */

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  text: string;
  photo?: string;
  rating: number | null;
}

export const testimonials: Testimonial[] = [
  {
    id: 'depoimento-1',
    name: '[Nome do cliente]',
    company: '[Empresa e cargo]',
    text: '[Cole aqui o depoimento real, com a autorização do cliente]',
    rating: null,
  },
  {
    id: 'depoimento-2',
    name: '[Nome do cliente]',
    company: '[Empresa e cargo]',
    text: '[Cole aqui o depoimento real, com a autorização do cliente]',
    rating: null,
  },
  {
    id: 'depoimento-3',
    name: '[Nome do cliente]',
    company: '[Empresa e cargo]',
    text: '[Cole aqui o depoimento real, com a autorização do cliente]',
    rating: null,
  },
];
