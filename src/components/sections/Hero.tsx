import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { site } from '../../content/site';
import { asset, isSampleMedia } from '../../lib/asset';
import { EASE } from '../../lib/motion';
import { btn } from '../ui/button';
import { Icon } from '../ui/Icon';

const FPS = 24;
const pad = (n: number) => String(Math.floor(n)).padStart(2, '0');
const timecode = (s: number) => `${pad(s / 3600)}:${pad((s / 60) % 60)}:${pad(s % 60)}:${pad((s % 1) * FPS)}`;

export function Hero() {
  const { hero } = site;
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const tcRef = useRef<HTMLSpanElement>(null);
  const userPaused = useRef(false);
  const [src, setSrc] = useState<string | undefined>();
  const [playing, setPlaying] = useState(false);

  // Escolhe a versão do vídeo e respeita quem economiza dados ou reduz animações.
  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (conn?.saveData || reduce) return;
    const mobile = window.matchMedia('(max-width: 640px)').matches;
    setSrc(asset(mobile && hero.videoMobile ? hero.videoMobile : hero.video));
  }, [hero.video, hero.videoMobile]);

  // Pausa o vídeo quando a abertura sai da tela (economiza bateria e processamento).
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section || !src) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!userPaused.current) video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [src]);

  // Timecode do visor, contínuo entre os loops.
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = videoRef.current?.currentTime ?? 0;
    let total = Number(tcRef.current?.dataset.total ?? 0);
    const tick = () => {
      const video = videoRef.current;
      if (video && tcRef.current) {
        const now = video.currentTime;
        total += now >= last ? now - last : video.duration - last + now;
        last = now;
        tcRef.current.dataset.total = String(total);
        tcRef.current.textContent = timecode(total);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => undefined);
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  return (
    <section
      id="inicio"
      ref={sectionRef}
      aria-labelledby="inicio-titulo"
      className="grain relative isolate h-[100svh] min-h-[640px] overflow-hidden bg-black"
    >
      {/* Showreel de fundo */}
      <img
        src={asset(hero.poster)}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      {src ? (
        <video
          ref={videoRef}
          src={src}
          poster={asset(hero.poster)}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="absolute inset-0 -z-20 h-full w-full scale-[1.02] object-cover"
        />
      ) : null}
      <div className="hero-shade absolute inset-0 -z-10" aria-hidden="true" />

      {/* Visor da câmera */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-3 bottom-3 top-[80px] sm:inset-x-6 sm:bottom-6 sm:top-[88px]"
      >
        <motion.span
          className="vf absolute inset-0"
          initial={{ opacity: 0, scale: 1.035 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: EASE }}
        />
        <motion.div
          className="absolute left-4 top-4 flex items-center gap-2.5 text-[12px] tabular-nums text-paper/85 sm:left-5 sm:top-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <span className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full bg-rec ${playing ? 'rec-dot' : 'opacity-40'}`} />
            REC
          </span>
          <span ref={tcRef} className="text-paper/60">
            00:00:00:00
          </span>
        </motion.div>
      </div>
      <div className="absolute right-3 top-[80px] flex items-center gap-3 p-4 pt-3 sm:right-6 sm:top-[88px] sm:p-5 sm:pt-4">
        {isSampleMedia(hero.video) ? <span className="text-[12px] text-paper/50">Vídeo de exemplo</span> : null}
        {src ? (
          <button
            type="button"
            onClick={toggle}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/30 text-paper/75 backdrop-blur transition hover:border-white/40 hover:text-paper"
            aria-label={playing ? 'Pausar vídeo de fundo' : 'Reproduzir vídeo de fundo'}
          >
            <Icon name={playing ? 'pause' : 'play'} className="h-3.5 w-3.5" />
          </button>
        ) : null}
      </div>

      {/* Texto */}
      <div className="shell relative flex h-full flex-col justify-end pb-[clamp(6.5rem,15vh,9.5rem)] pt-32">
        <h1 id="inicio-titulo" className="type-display max-w-[17ch] text-[clamp(2.35rem,6.6vw,6.1rem)] leading-[1.0]">
          {hero.title.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.35 + i * 0.14 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          className="mt-6 max-w-[44ch] text-[clamp(1.02rem,1.5vw,1.25rem)] leading-relaxed text-paper/80"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.75 }}
        >
          {hero.subtitle}
        </motion.p>
        <motion.div
          className="mt-9 flex flex-col gap-3 min-[420px]:flex-row"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
        >
          <a href="#portfolio" className={btn('primary', 'lg')}>
            <Icon name="play" className="h-4 w-4" />
            Ver meus trabalhos
          </a>
          <a href="#contato" className={btn('ghost', 'lg')}>
            Solicitar orçamento
          </a>
        </motion.div>
      </div>

      {/* Indicação para rolar */}
      <div className="absolute inset-x-3 bottom-3 flex items-end px-4 pb-4 sm:inset-x-6 sm:bottom-6 sm:px-5 sm:pb-5">
        <a
          href="#marcas"
          className="group hidden items-center gap-3 text-[12px] text-paper/60 transition hover:text-paper sm:flex"
        >
          <span className="relative block h-9 w-px overflow-hidden bg-white/20">
            <span className="scroll-cue absolute inset-x-0 top-0 block h-3 bg-paper" />
          </span>
          Role para ver mais
        </a>
        <span className="relative block h-9 w-px overflow-hidden bg-white/20 sm:hidden" aria-hidden="true">
          <span className="scroll-cue absolute inset-x-0 top-0 block h-3 bg-paper" />
        </span>
      </div>
    </section>
  );
}
