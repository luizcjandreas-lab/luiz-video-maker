/**
 * GALERIA DE REELS (vídeos verticais 9:16)
 * ---------------------------------------------------------------
 * video: arquivo próprio (.mp4) em /public/media/reels OU link do YouTube Shorts,
 * Vimeo ou Instagram (reel). Arquivos próprios tocam com a melhor qualidade
 * e também mostram uma prévia sem som ao passar o mouse.
 * poster: imagem de capa vertical (obrigatória para links do Instagram e Vimeo).
 *
 * Links dos Reels no Instagram (@luizh.social), caso queira usar algum como player:
 *   https://www.instagram.com/reel/De2NGtwBiPl/
 *   https://www.instagram.com/reel/DePfQuixZS3/
 *   https://www.instagram.com/reel/Db8IknhR7ZC/
 *   https://www.instagram.com/reel/DbbFd-auyzM/
 *   https://www.instagram.com/reel/DbBVlvGukPM/  (sítio de casamentos)
 *   https://www.instagram.com/reel/DeVRamUgSP5/
 */

export interface Reel {
  id: string;
  title: string;
  segment: string;
  video: string;
  poster?: string;
}

export const reels: Reel[] = [
  {
    id: 'fimavel-multimarcas',
    title: 'Fimavel Multimarcas',
    segment: 'Loja de veículos',
    video: 'media/reels/fimavel-multimarcas.mp4',
    poster: 'media/reels/fimavel-multimarcas.jpg',
  },
  {
    id: 'elite-thai-boxing',
    title: 'Elite Thai Boxing',
    segment: 'Academia de Muay Thai',
    video: 'media/reels/elite-thai-boxing.mp4',
    poster: 'media/reels/elite-thai-boxing.jpg',
  },
  {
    id: 'doutor-terno',
    title: 'Doutor Terno',
    segment: 'Moda masculina',
    video: 'media/reels/doutor-terno.mp4',
    poster: 'media/reels/doutor-terno.jpg',
  },
  {
    id: 'ianka-trancas',
    title: 'Ianka Tranças',
    segment: 'Tranças · filme cinematográfico',
    video: 'media/reels/ianka-trancas.mp4',
    poster: 'media/reels/ianka-trancas.jpg',
  },
  {
    id: 'oticas-venice',
    title: 'Óticas Venice',
    segment: 'Ótica',
    video: 'media/reels/oticas-venice.mp4',
    poster: 'media/reels/oticas-venice.jpg',
  },
  {
    id: 'sitio-casamentos',
    title: 'Sítio de casamentos',
    segment: 'Sítio para casamentos',
    video: 'media/reels/sitio-casamentos.mp4',
    poster: 'media/reels/sitio-casamentos.jpg',
  },
  {
    id: 'fimavel-multimarcas-2',
    title: 'Fimavel Multimarcas',
    segment: 'Loja de veículos · legendas animadas',
    video: 'media/reels/fimavel-multimarcas-2.mp4',
    poster: 'media/reels/fimavel-multimarcas-2.jpg',
  },
];
