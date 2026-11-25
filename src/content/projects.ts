/**
 * PORTFÓLIO
 * ---------------------------------------------------------------
 * Cada item abaixo é um card da grade "Trabalhos que falam por si"
 * e a página completa que abre ao clicar em "Ver projeto".
 *
 * Os projetos abaixo usam os seus vídeos (a ordem aqui é a ordem da grade). Objetivo, desafio, solução e resultado
 * ficaram entre [colchetes] para você contar a história real de cada trabalho.
 * Para criar um novo projeto, duplique um bloco e troque os dados.
 *
 * video: aceita link do YouTube, Vimeo, Instagram (Reels/post) ou arquivo próprio (.mp4).
 * gallery: lista de fotos (ex.: ['media/projeto-1/foto-1.jpg', ...]).
 * Se tiver vídeo e galeria, os dois aparecem.
 */

export type Category = 'videos' | 'fotografia' | 'social' | 'sites' | 'automotivo' | 'moda' | 'fitness' | 'comercio';

export const filters: { id: 'todos' | Category; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'videos', label: 'Vídeos' },
  { id: 'fotografia', label: 'Fotografia' },
  { id: 'social', label: 'Social Media' },
  { id: 'sites', label: 'Sites' },
  { id: 'automotivo', label: 'Automotivo' },
  { id: 'moda', label: 'Moda' },
  { id: 'fitness', label: 'Fitness' },
  { id: 'comercio', label: 'Comércio local' },
  { id: 'eventos', label: 'Eventos' },
];

export interface Project {
  id: string;
  client: string;
  /** A primeira categoria é a principal (aparece em destaque no card). */
  categories: Category[];
  /** Breve descrição para o card (1 ou 2 frases). */
  summary: string;
  /** Serviço realizado, em poucas palavras. */
  service: string;
  /** Capa do card (horizontal ou vertical, mínimo 900 px de largura). */
  cover?: string;
  /** Qual parte da capa aparece no card. Ex.: 'center 30%' mostra mais o topo. */
  coverPosition?: string;
  /** true para vídeos verticais (Reels): o player abre em 9:16. */
  vertical?: boolean;
  /** Opcional: link do post no Instagram, mostrado como "Ver no Instagram". */
  instagram?: string;
  /** Tamanho na grade quando "Todos" está selecionado. */
  layout?: 'wide' | 'tall' | 'normal';
  video?: string;
  /** Imagem de capa do vídeo dentro do projeto (para arquivos próprios). */
  poster?: string;
  gallery?: string[];
  objective: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  result: string;
}

export const projects: Project[] = [
  {
    id: 'casamento-renato-gisele',
    client: 'Renato & Gisele',
    categories: ['eventos', 'videos'],
    summary:
      'Filme de casamento ao ar livre: decoração, preparação, cerimônia e a entrada da noiva, na luz quente do fim de tarde.',
    service: 'Filme de casamento',
    cover: 'media/capas/casamento.jpg',
    coverPosition: 'center 50%',
    layout: 'wide',
    video: 'media/videos/casamento.mp4',
    poster: 'media/capas/casamento.jpg',
    objective: '[Qual era o desejo dos noivos para o filme?]',
    challenge: '[Qual foi o desafio do dia? Ex.: luz, horário, cerimônia ao ar livre]',
    solution: '[Como você conduziu a captação e a edição]',
    deliverables: ['Captação da preparação e da cerimônia', 'Filme editado com trilha', 'Tratamento de cor'],
    result: '[Insira aqui o resultado real]',
  },
  {
    id: 'elite-thai-boxing',
    client: 'Elite Thai Boxing',
    categories: ['fitness', 'videos', 'social'],
    summary: 'Reels da rotina de treinos de Muay Thai, com a energia da aula e os alunos em ação.',
    service: 'Produção de Reels',
    cover: 'media/capas/elite-thai-boxing.jpg',
    coverPosition: 'center 45%',
    layout: 'tall',
    video: 'media/reels/elite-thai-boxing.mp4',
    poster: 'media/reels/elite-thai-boxing.jpg',
    vertical: true,
    objective: '[Qual era o objetivo da academia com este vídeo?]',
    challenge: '[Qual desafio a academia apresentou?]',
    solution: '[Como você resolveu]',
    deliverables: ['Captação durante a aula', 'Edição no ritmo da trilha', 'Vídeo vertical para Reels'],
    result: '[Insira aqui o resultado real]',
  },
  {
    id: 'doutor-terno',
    client: 'Doutor Terno',
    categories: ['moda', 'comercio', 'videos', 'social'],
    summary:
      'Reels da loja de moda masculina: fachada, ambiente, ternos, camisas e gravatas, com legendas de destaque.',
    service: 'Produção de Reels',
    cover: 'media/capas/doutor-terno.jpg',
    coverPosition: 'center 45%',
    video: 'media/reels/doutor-terno.mp4',
    poster: 'media/reels/doutor-terno.jpg',
    vertical: true,
    objective: '[Qual era o objetivo da loja com este vídeo?]',
    challenge: '[Qual desafio a loja apresentou?]',
    solution: '[Como você resolveu]',
    deliverables: ['Captação em vídeo', 'Edição e legendas', 'Vídeo vertical para Reels'],
    result: '[Insira aqui o resultado real]',
  },
  {
    id: 'oticas-venice',
    client: 'Óticas Venice',
    categories: ['comercio', 'videos', 'social'],
    summary: 'Reels da ótica com fachada, vitrine de armações, atendimento e a promoção Óculos em Dobro.',
    service: 'Produção de Reels',
    cover: 'media/capas/oticas-venice.jpg',
    coverPosition: 'center 35%',
    video: 'media/reels/oticas-venice.mp4',
    poster: 'media/reels/oticas-venice.jpg',
    vertical: true,
    objective: '[Qual era o objetivo da ótica com este vídeo?]',
    challenge: '[Qual desafio a ótica apresentou?]',
    solution: '[Como você resolveu]',
    deliverables: ['Captação em vídeo', 'Edição e legendas', 'Vídeo vertical para Reels'],
    result: '[Insira aqui o resultado real]',
  },
  {
    id: 'fimavel-multimarcas',
    client: 'Fimavel Multimarcas',
    categories: ['automotivo', 'videos', 'social'],
    summary:
      'Reels de apresentação da loja e do estoque, com o vendedor conduzindo o vídeo e detalhes de acabamento dos carros.',
    service: 'Produção de Reels',
    cover: 'media/capas/fimavel-multimarcas.jpg',
    coverPosition: 'center 55%',
    layout: 'wide',
    video: 'media/reels/fimavel-multimarcas.mp4',
    poster: 'media/reels/fimavel-multimarcas.jpg',
    vertical: true,
    objective: '[Qual era o objetivo da loja com este vídeo?]',
    challenge: '[Qual desafio a loja apresentou? Ex.: destacar o estoque, gerar confiança, atrair visitas]',
    solution: '[Como você resolveu: roteiro, condução do vendedor, captação e edição]',
    deliverables: [
      'Roteiro e direção do apresentador',
      'Captação em vídeo',
      'Edição e finalização',
      'Vídeo vertical para Reels',
    ],
    result: '[Insira aqui o resultado real]',
  },
  {
    id: 'sitio-casamentos',
    client: 'Sítio de casamentos',
    categories: ['eventos', 'videos'],
    summary: 'Tour noturno pelo sítio de casamentos, com áreas externas iluminadas, salão, hospedagem e piscina.',
    service: 'Vídeo de apresentação do espaço',
    cover: 'media/capas/sitio-casamentos.jpg',
    coverPosition: 'center 50%',
    layout: 'tall',
    video: 'media/reels/sitio-casamentos.mp4',
    poster: 'media/reels/sitio-casamentos.jpg',
    vertical: true,
    instagram: 'https://www.instagram.com/reel/DbBVlvGukPM/',
    objective: '[Qual era o objetivo do cliente com este vídeo?]',
    challenge: '[Qual desafio o cliente apresentou? Ex.: gravar à noite]',
    solution: '[Como você resolveu]',
    deliverables: ['Captação noturna', 'Edição e finalização', 'Vídeo vertical para Reels'],
    result: '[Insira aqui o resultado real]',
  },
  {
    id: 'ianka-trancas',
    client: 'Ianka Tranças',
    categories: ['videos', 'comercio', 'social'],
    summary: 'Filme com linguagem cinematográfica: retratos, detalhes das tranças e cenas na rua e na natureza.',
    service: 'Produção audiovisual',
    layout: 'wide',
    cover: 'media/capas/ianka-trancas.jpg',
    coverPosition: 'center 62%',
    video: 'media/reels/ianka-trancas.mp4',
    poster: 'media/reels/ianka-trancas.jpg',
    vertical: true,
    objective: '[Qual era a proposta do filme?]',
    challenge: '[Qual foi o desafio da produção?]',
    solution: '[Como você conduziu a direção, a captação e a edição]',
    deliverables: ['Direção de cena', 'Captação em vídeo', 'Edição, cor e trilha'],
    result: '[Insira aqui o resultado real]',
  },
  {
    id: 'projeto-site',
    client: '[Nome do cliente · site]',
    categories: ['sites'],
    summary: '[Ex.: site institucional com portfólio, serviços e pedido de orçamento pelo WhatsApp]',
    service: 'Desenvolvimento de site',
    objective: '[Qual era o objetivo do cliente com este projeto?]',
    challenge: '[Qual desafio o cliente apresentou?]',
    solution: '[Como você resolveu]',
    deliverables: [
      'Estrutura e textos',
      'Design para celular e computador',
      'Desenvolvimento',
      'Publicação e SEO básico',
    ],
    result: '[Insira aqui o resultado real]',
  },
];

export const categoryLabel = (c: Category): string => filters.find((f) => f.id === c)?.label ?? c;
