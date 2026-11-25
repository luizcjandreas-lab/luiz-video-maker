import { asset } from './asset';

export type ParsedVideo =
  | { kind: 'file'; src: string }
  | { kind: 'embed'; provider: 'youtube' | 'vimeo' | 'instagram'; src: string; thumb?: string };

/** Reconhece links do YouTube (inclusive Shorts), Vimeo e Instagram; o resto é tratado como arquivo. */
export function parseVideo(url?: string, autoplay = true): ParsedVideo | null {
  if (!url) return null;
  const ap = autoplay ? 1 : 0;

  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) {
    return {
      kind: 'embed',
      provider: 'youtube',
      src: `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=${ap}&rel=0&modestbranding=1&playsinline=1`,
      thumb: `https://i.ytimg.com/vi/${yt[1]}/hqdefault.jpg`,
    };
  }

  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) {
    return {
      kind: 'embed',
      provider: 'vimeo',
      src: `https://player.vimeo.com/video/${vm[1]}?autoplay=${ap}&title=0&byline=0&portrait=0&dnt=1`,
    };
  }

  const ig = url.match(/instagram\.com\/(?:[\w.]+\/)?(reel|reels|p|tv)\/([\w-]+)/);
  if (ig) {
    const kind = ig[1] === 'reels' ? 'reel' : ig[1];
    return { kind: 'embed', provider: 'instagram', src: `https://www.instagram.com/${kind}/${ig[2]}/embed` };
  }

  return { kind: 'file', src: asset(url) ?? url };
}

/** Capa automática para vídeos do YouTube quando nenhuma imagem foi definida. */
export function videoPoster(url?: string, poster?: string): string | undefined {
  if (poster) return asset(poster);
  const parsed = parseVideo(url);
  return parsed && parsed.kind === 'embed' ? parsed.thumb : undefined;
}
