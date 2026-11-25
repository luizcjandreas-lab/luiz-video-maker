/**
 * DADOS GERAIS DO SITE
 * ---------------------------------------------------------------
 * Qualquer texto escrito entre [colchetes] aparece no site como um
 * campo a preencher (texto cinza com sublinhado tracejado azul).
 * Troque pelo conteúdo real e o estilo de "campo vazio" some sozinho.
 *
 * Caminhos de mídia (vídeos, fotos, logos) são relativos à pasta /public.
 * Ex.: 'media/meu-showreel.mp4' = /public/media/meu-showreel.mp4
 * Também aceitam links completos (https://...).
 */

export const site = {
  /**
   * false = site publicado: campos entre [colchetes] ficam escondidos (e seções inteiras sem
   * conteúdo real, como depoimentos, somem do site e do menu).
   * true = modo edição: os campos a preencher aparecem com sublinhado tracejado.
   */
  showPlaceholders: false,

  brand: {
    /** Seu nome ou o nome da sua marca. Aparece no menu, no rodapé e no "Sobre". */
    name: 'Luiz Vídeo Maker',
    /** Opcional: logotipo em /public (ex.: 'logo.svg'). Se ficar vazio, o menu mostra o nome. */
    logo: '',
    /** Frase curta usada no rodapé. */
    tagline: 'Produção audiovisual, fotografia, social media e sites para marcas que querem se destacar.',
  },

  contact: {
    /** WhatsApp com DDI + DDD + número, só dígitos. Ex.: '5511999999999'. */
    whatsapp: '5511968548653',
    /** Mensagem que já vem escrita quando o visitante abre o WhatsApp pelo site. */
    whatsappMessage: 'Olá! Vi o seu portfólio e gostaria de pedir um orçamento.',
    /** Link completo do perfil. Ex.: 'https://instagram.com/seuperfil' */
    instagramUrl: 'https://www.instagram.com/luizh.social/',
    instagramHandle: '@luizh.social',
    email: 'luizhenriquemsocial@gmail.com',
    city: '[Sua cidade e região de atendimento]',
  },

  hero: {
    title: ['Não criamos apenas conteúdo.', 'Criamos presença, desejo e resultado.'],
    subtitle: 'Produção audiovisual, fotografia, social media e sites para marcas que querem se destacar.',
    /**
     * Showreel que roda no fundo, sem som e em loop. Use um .mp4 (H.264) de 15 a 40 s,
     * 1920×1080 ou 1280×720, de preferência abaixo de 8 MB.
     * O showreel atual é uma montagem em três telas feita com trechos dos seus Reels.
     */
    video: 'media/showreel.mp4',
    /** Versão vertical, mais leve, usada só no celular. */
    videoMobile: 'media/showreel-celular.mp4',
    /** Imagem mostrada enquanto o vídeo carrega (e para quem economiza dados). */
    poster: 'media/showreel.jpg',
  },

  about: {
    title: 'Quem está por trás de cada projeto',
    /** Sua fotografia profissional (vertical, proporção 4:5). Ex.: 'media/minha-foto.jpg' */
    photo: '',
    role: 'Produção audiovisual, fotografia e conteúdo para marcas',
    text: 'Transformo ideias, produtos e histórias em conteúdos que chamam atenção e valorizam marcas. Meu trabalho une estratégia, criatividade e produção profissional para entregar muito mais do que imagens bonitas: entrego uma comunicação que posiciona e aproxima empresas de seus clientes.',
    facts: [
      { label: 'Cidade e região de atendimento', value: '' /* usa contact.city */ },
      { label: 'Tempo de experiência', value: '[Ex.: 6 anos]' },
      { label: 'Projetos realizados', value: '[Número real de projetos]' },
      { label: 'Segmentos atendidos', value: 'Empresas, lojas, academias, veículos, eventos e profissionais' },
      {
        label: 'Equipamentos utilizados',
        value: '[Câmeras, lentes, drone, iluminação e áudio que você usa]',
        wide: true,
      },
    ],
  },

  finalCta: {
    title: 'Seu negócio merece ser apresentado de forma profissional.',
    text: 'Vamos criar um projeto que valorize sua marca e faça as pessoas prestarem atenção?',
  },

  form: {
    /**
     * Opcional: endereço de um serviço de formulários (Formspree, Getform, Make, etc.)
     * para também receber os pedidos por e-mail. Se ficar vazio, o pedido vai só pelo WhatsApp.
     */
    endpoint: '',
  },
};

export const nav = [
  { id: 'inicio', label: 'Início' },
  { id: 'portfolio', label: 'Portfólio' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'processo', label: 'Processo' },
  { id: 'depoimentos', label: 'Depoimentos' },
  { id: 'contato', label: 'Contato' },
];
