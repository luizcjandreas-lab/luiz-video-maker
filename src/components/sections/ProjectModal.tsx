import { useRef } from 'react';
import { categoryLabel, type Project } from '../../content/projects';
import { asset } from '../../lib/asset';
import { keep } from '../../lib/visibility';
import { plain } from '../../lib/text';
import { whatsappLink } from '../../lib/whatsapp';
import { btn } from '../ui/button';
import { Editable } from '../ui/Editable';
import { Frame } from '../ui/Frame';
import { Icon } from '../ui/Icon';
import { MediaPlayer } from '../ui/MediaPlayer';
import { Modal } from '../ui/Modal';

function Gallery({ images, title }: { images: string[]; title: string }) {
  const track = useRef<HTMLUListElement>(null);
  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' });
  };
  return (
    <div className="relative">
      <ul
        ref={track}
        className="flex snap-x snap-mandatory overflow-x-auto no-scrollbar"
        aria-label={`Galeria: ${title}`}
      >
        {images.map((src, i) => (
          <li key={src + i} className="relative aspect-[16/10] w-full shrink-0 snap-center bg-black">
            <img
              src={asset(src)}
              alt={`${title}, foto ${i + 1} de ${images.length}`}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-contain"
            />
          </li>
        ))}
      </ul>
      {images.length > 1 ? (
        <div className="absolute bottom-4 right-4 flex gap-2">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => go(dir)}
              aria-label={dir < 0 ? 'Foto anterior' : 'Próxima foto'}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/60 backdrop-blur transition hover:border-white/50"
            >
              <Icon name={dir < 0 ? 'chevronLeft' : 'chevronRight'} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function ProjectModal({
  list,
  openId,
  onClose,
  onNavigate,
}: {
  list: Project[];
  openId: string | null;
  onClose: () => void;
  onNavigate: (id: string) => void;
}) {
  const index = list.findIndex((p) => p.id === openId);
  const project = index >= 0 ? list[index] : null;
  const prev = () => list.length > 1 && onNavigate(list[(index - 1 + list.length) % list.length].id);
  const next = () => list.length > 1 && onNavigate(list[(index + 1) % list.length].id);

  return (
    <Modal
      open={!!project}
      onClose={onClose}
      onPrev={prev}
      onNext={next}
      labelledBy="projeto-titulo"
      panelClassName="h-[100svh] w-full overflow-y-auto overscroll-contain bg-graphite sm:h-auto sm:max-h-[92svh] sm:w-[min(100%_-_2rem,68rem)] sm:rounded-[24px] sm:border sm:border-line"
    >
      {project ? (
        <ProjectDetail
          key={project.id}
          project={project}
          position={`${index + 1} de ${list.length}`}
          onClose={onClose}
          onPrev={prev}
          onNext={next}
          many={list.length > 1}
        />
      ) : null}
    </Modal>
  );
}

function ProjectDetail({
  project,
  position,
  onClose,
  onPrev,
  onNext,
  many,
}: {
  project: Project;
  position: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  many: boolean;
}) {
  const name = plain(project.client);
  const hasGallery = !!project.gallery && project.gallery.length > 0;
  const message = `Olá! Vi o projeto "${name}" (${categoryLabel(project.categories[0])}) no seu portfólio e quero um projeto semelhante para a minha empresa.`;

  const rows: [string, string][] = [
    ['Objetivo do trabalho', project.objective],
    ['Desafio apresentado pelo cliente', project.challenge],
    ['Solução criada', project.solution],
  ];
  const shownRows = rows.filter(([, value]) => keep(value));

  const deliverablesBox = (
    <div className="rounded-2xl border border-line bg-black/30 p-5">
      <h3 className="text-[13px] text-mute">Serviços entregues</h3>
      <ul className="mt-3 grid gap-2.5">
        {project.deliverables.map((d) => (
          <li key={d} className="flex gap-2.5 text-[15px] leading-snug">
            <Icon name="check" className="mt-px h-[18px] w-[18px] shrink-0 text-accent-ink" />
            <Editable value={d} />
          </li>
        ))}
      </ul>
    </div>
  );

  const resultBox = keep(project.result) ? (
    <div className="rounded-2xl border border-accent/35 bg-accent/[0.07] p-5">
      <h3 className="text-[13px] text-accent-ink">Resultado alcançado</h3>
      <p className="mt-2 text-[16px] leading-relaxed">
        <Editable value={project.result} />
      </p>
    </div>
  ) : null;

  const actions = (
    <>
      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btn('primary', 'lg')} w-full`}
      >
        <Icon name="chat" />
        Quero um projeto semelhante
      </a>
      {project.instagram ? (
        <a
          href={project.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full text-[14px] text-paper/75 transition hover:text-paper"
        >
          <Icon name="at" className="h-4 w-4 text-accent-ink" />
          Ver no Instagram
        </a>
      ) : null}
    </>
  );

  return (
    <article>
      <div className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-line bg-graphite/85 px-4 py-3 backdrop-blur-xl sm:px-6">
        <p className="text-[13px] tabular-nums text-mute">Projeto {position}</p>
        <div className="flex items-center gap-2">
          {many ? (
            <>
              <button
                type="button"
                onClick={onPrev}
                aria-label="Projeto anterior"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition hover:border-white/45"
              >
                <Icon name="chevronLeft" />
              </button>
              <button
                type="button"
                onClick={onNext}
                aria-label="Próximo projeto"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition hover:border-white/45"
              >
                <Icon name="chevronRight" />
              </button>
            </>
          ) : null}
          <button
            type="button"
            data-autofocus
            onClick={onClose}
            aria-label="Fechar projeto"
            className="grid h-11 w-11 place-items-center rounded-full bg-paper text-black transition hover:bg-white"
          >
            <Icon name="close" />
          </button>
        </div>
      </div>

      <div className="bg-black">
        {project.video && project.vertical ? (
          <div className="relative isolate flex justify-center overflow-hidden py-5 sm:py-8">
            {project.poster ? (
              <img
                src={asset(project.poster)}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 -z-10 h-full w-full scale-110 object-cover opacity-45 blur-2xl"
              />
            ) : null}
            <div className="relative aspect-[9/16] h-[min(70svh,680px)] overflow-hidden rounded-[18px] shadow-[0_30px_80px_-20px_rgb(0_0_0/0.9)]">
              <MediaPlayer url={project.video} poster={project.poster} title={name} vertical fill />
            </div>
          </div>
        ) : null}
        {project.video && !project.vertical ? (
          <MediaPlayer url={project.video} poster={project.poster} title={name} />
        ) : null}
        {hasGallery ? <Gallery images={project.gallery ?? []} title={name} /> : null}
        {!project.video && !hasGallery ? (
          <div className="relative aspect-video">
            <Frame
              label="Vídeo ou galeria do projeto"
              icon="film"
              word={categoryLabel(project.categories[0])}
              light="50% 10%"
            />
          </div>
        ) : null}
      </div>

      <div className="px-5 pb-10 pt-8 sm:px-10 sm:pb-12 sm:pt-10">
        <ul className="flex flex-wrap gap-1.5" aria-label="Categorias">
          {project.categories.map((c) => (
            <li key={c} className="rounded-full border border-white/15 px-3 py-1 text-[12px] text-paper/80">
              {categoryLabel(c)}
            </li>
          ))}
        </ul>
        <h2 id="projeto-titulo" className="type-display mt-4 text-[clamp(1.9rem,4vw,3rem)] leading-[1.04]">
          <Editable value={project.client} />
        </h2>
        <p className="mt-4 max-w-[62ch] text-[17px] leading-relaxed text-paper/80">
          <Editable value={project.summary} />
        </p>

        {shownRows.length > 0 ? (
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-14">
            <dl className="grid content-start gap-7">
              {shownRows.map(([label, value]) => (
                <div key={label} className="border-t border-line pt-5">
                  <dt className="text-[13px] text-mute">{label}</dt>
                  <dd className="mt-2 text-[16px] leading-relaxed text-paper/90">
                    <Editable value={value} />
                  </dd>
                </div>
              ))}
            </dl>
            <aside className="grid content-start gap-4">
              {deliverablesBox}
              {resultBox}
              {actions}
            </aside>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:items-start">
            {deliverablesBox}
            <div className="grid content-start gap-4">
              {resultBox}
              {actions}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
