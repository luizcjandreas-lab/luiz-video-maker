import { asset } from '../../lib/asset';
import { parseVideo } from '../../lib/media';

/**
 * Player único para arquivos próprios (.mp4/.webm) e links do YouTube, Vimeo e Instagram.
 * fill: ocupa todo o contêiner pai (o pai define o tamanho); sem fill, usa 16:9 ou 9:16.
 */
export function MediaPlayer({
  url,
  poster,
  title,
  vertical = false,
  autoPlay = false,
  fill = false,
}: {
  url?: string;
  poster?: string;
  title: string;
  vertical?: boolean;
  autoPlay?: boolean;
  fill?: boolean;
}) {
  const parsed = parseVideo(url, autoPlay);
  if (!parsed) return null;
  const box = fill ? 'absolute inset-0' : `relative w-full ${vertical ? 'aspect-[9/16]' : 'aspect-video'}`;

  if (parsed.kind === 'embed') {
    return (
      <div className={`${box} bg-black`}>
        <iframe
          src={parsed.src}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    );
  }

  return (
    <div className={`${box} bg-black`}>
      <video
        key={parsed.src}
        src={parsed.src}
        poster={asset(poster)}
        controls
        playsInline
        autoPlay={autoPlay}
        preload={autoPlay ? 'auto' : 'metadata'}
        className="absolute inset-0 h-full w-full object-contain"
        aria-label={title}
      />
    </div>
  );
}
