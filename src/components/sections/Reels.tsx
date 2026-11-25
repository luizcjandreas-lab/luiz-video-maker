import { useRef, useState } from 'react';
import { reels, type Reel } from '../../content/reels';
import { isSampleMedia } from '../../lib/asset';
import { parseVideo, videoPoster } from '../../lib/media';
import { plain } from '../../lib/text';
import { site } from '../../content/site';
import { Editable } from '../ui/Editable';
import { Icon } from '../ui/Icon';
import { MediaPlayer } from '../ui/MediaPlayer';
import { Modal } from '../ui/Modal';
import { Reveal, SectionHeading } from '../ui/Reveal';

const canHover = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

function ReelCard({ reel, onOpen }: { reel: Reel; onOpen: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const parsed = parseVideo(reel.video);
  const isFile = parsed?.kind === 'file';
  const poster = videoPoster(reel.video, reel.poster);

  const preview = (on: boolean) => {
    const v = videoRef.current;
    if (!v || !canHover()) return;
    if (on) {
      v.play().catch(() => undefined);
    } else {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => preview(true)}
      onMouseLeave={() => preview(false)}
      aria-label={`Assistir ${plain(reel.title)}, ${reel.segment}`}
      className="group relative block w-full rounded-[30px] border border-white/10 bg-black p-[5px] text-left shadow-[0_40px_70px_-40px_rgb(0_0_0/0.95)] transition duration-500 hover:-translate-y-1 hover:border-white/25"
    >
      <span className="relative block aspect-[9/16] overflow-hidden rounded-[25px] bg-graphite-2">
        {poster ? (
          <img
            src={poster}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
        {isFile && parsed ? (
          <video
            ref={videoRef}
            src={parsed.src}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        ) : null}
        <span
          className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-black/90 via-black/40 to-transparent"
          aria-hidden="true"
        />
        {isSampleMedia(reel.video) ? (
          <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[11px] text-paper/75 backdrop-blur">
            Vídeo de exemplo
          </span>
        ) : null}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition duration-500 group-hover:scale-110 group-hover:bg-white/20"
        >
          <Icon name="play" className="h-5 w-5 translate-x-px" />
        </span>
        <span className="absolute inset-x-4 bottom-4">
          <span className="block text-[12px] text-paper/65">{reel.segment}</span>
          <span className="mt-1 block text-[15px] font-medium leading-snug">
            <Editable value={reel.title} />
          </span>
        </span>
      </span>
    </button>
  );
}

export function Reels() {
  const track = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector('li');
    const step = card ? card.getBoundingClientRect().width + 20 : 280;
    const perView = Math.max(1, Math.floor(el.clientWidth / step));
    el.scrollBy({ left: dir * step * perView, behavior: 'smooth' });
  };

  const current = open !== null ? reels[open] : null;
  const prev = () => setOpen((i) => (i === null ? i : (i - 1 + reels.length) % reels.length));
  const next = () => setOpen((i) => (i === null ? i : (i + 1) % reels.length));

  if (reels.length === 0) return null;

  return (
    <section id="reels" aria-labelledby="reels-titulo" className="band relative overflow-hidden bg-graphite">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
      />
      <div className="shell relative">
        <SectionHeading
          id="reels-titulo"
          title="Conteúdo pensado para prender atenção"
          intro="Da primeira cena até a chamada para ação, cada detalhe é construído para gerar interesse e fortalecer a presença da marca."
        />
        <div className="mt-8 flex items-center justify-between gap-4">
          {site.contact.instagramUrl ? (
            <a
              href={site.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-[14px] text-paper transition hover:border-white/45"
            >
              <Icon name="at" className="h-4 w-4 text-accent-ink" />
              Ver mais no Instagram
            </a>
          ) : (
            <span />
          )}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Reels anteriores"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition hover:border-white/45"
            >
              <Icon name="chevronLeft" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Próximos Reels"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition hover:border-white/45"
            >
              <Icon name="chevronRight" />
            </button>
          </div>
        </div>
      </div>

      <Reveal delay={0.05}>
        <ul
          ref={track}
          aria-label="Reels e vídeos verticais"
          className="reels-track mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 pt-2 no-scrollbar sm:gap-5"
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') scroll(1);
            if (e.key === 'ArrowLeft') scroll(-1);
          }}
        >
          {reels.map((reel, i) => (
            <li key={reel.id} className="w-[64vw] max-w-[270px] shrink-0 snap-start sm:w-[250px] xl:w-[232px]">
              <ReelCard reel={reel} onOpen={() => setOpen(i)} />
            </li>
          ))}
        </ul>
      </Reveal>

      <Modal
        open={current !== null}
        onClose={() => setOpen(null)}
        onPrev={prev}
        onNext={next}
        label={current ? `Reels: ${plain(current.title)}` : undefined}
        panelClassName="flex items-center gap-3 sm:gap-6"
      >
        {current ? (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Reels anterior"
              className="absolute bottom-[-64px] left-0 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-black/50 backdrop-blur transition hover:border-white/50 sm:static"
            >
              <Icon name="chevronLeft" />
            </button>
            <div className="relative aspect-[9/16] h-[min(74svh,calc((100vw_-_2rem)*16/9))] overflow-hidden rounded-[22px] bg-black shadow-[0_40px_120px_-30px_rgb(61_124_255/0.35)] sm:h-[min(86svh,900px)]">
              <MediaPlayer
                key={current.id}
                url={current.video}
                poster={current.poster}
                title={plain(current.title)}
                vertical
                autoPlay
                fill
              />
            </div>
            <button
              type="button"
              onClick={next}
              aria-label="Próximo Reels"
              className="absolute bottom-[-64px] right-0 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-black/50 backdrop-blur transition hover:border-white/50 sm:static"
            >
              <Icon name="chevronRight" />
            </button>
            <button
              type="button"
              data-autofocus
              onClick={() => setOpen(null)}
              aria-label="Fechar vídeo"
              className="absolute -top-14 right-0 grid h-11 w-11 place-items-center rounded-full bg-paper text-black transition hover:bg-white sm:right-[-3.5rem] sm:top-0"
            >
              <Icon name="close" />
            </button>
          </>
        ) : null}
      </Modal>
    </section>
  );
}
