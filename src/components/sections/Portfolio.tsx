import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { categoryLabel, filters, type Category, type Project } from '../../content/projects';
import { visibleProjects as projects } from '../../lib/visibility';
import { asset } from '../../lib/asset';
import { EASE } from '../../lib/motion';
import { Editable } from '../ui/Editable';
import { Frame } from '../ui/Frame';
import { Icon } from '../ui/Icon';
import { Reveal, SectionHeading } from '../ui/Reveal';
import { ProjectModal } from './ProjectModal';

type FilterId = 'todos' | Category;

const LIGHTS = ['22% 18%', '78% 12%', '50% 0%', '12% 60%', '88% 40%', '35% 8%', '65% 30%', '50% 20%'];

function Cover({ project, index }: { project: Project; index: number }) {
  if (project.cover) {
    return (
      <img
        src={asset(project.cover)}
        alt=""
        loading="lazy"
        decoding="async"
        style={{ objectPosition: project.coverPosition }}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
      />
    );
  }
  return (
    <Frame
      corner
      label="Capa a inserir"
      word={categoryLabel(project.categories[0])}
      light={LIGHTS[index % LIGHTS.length]}
      className="transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
    />
  );
}

function ProjectCard({
  project,
  index,
  total,
  featured,
  onOpen,
}: {
  project: Project;
  index: number;
  total: number;
  featured: boolean;
  onOpen: (id: string) => void;
}) {
  // Tamanhos especiais só na grade completa ("Todos"). No tablet (2 colunas), o primeiro
  // ocupa a linha inteira quando o total é ímpar, para a grade fechar sem buracos.
  const span = !featured
    ? ''
    : [
        index === 0 && total % 2 === 1 ? 'sm:col-span-2' : '',
        project.layout === 'wide' ? 'lg:col-span-2' : '',
        project.layout === 'tall' ? 'lg:row-span-2' : '',
        index === 0 && project.layout !== 'wide' ? 'lg:col-span-1' : '',
      ].join(' ');

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.6, ease: EASE, delay: Math.min(index, 6) * 0.05 }}
      className={`group relative isolate overflow-hidden rounded-[20px] border border-line bg-graphite-2 ${span}`}
    >
      <Cover project={project} index={index} />
      <div className="card-shade absolute inset-0" aria-hidden="true" />
      <article className="relative flex h-full flex-col justify-between p-5 sm:p-6">
        <ul className="flex flex-wrap gap-1.5" aria-label="Categorias">
          {project.categories.slice(0, 2).map((c) => (
            <li
              key={c}
              className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[12px] text-paper/85 backdrop-blur"
            >
              {categoryLabel(c)}
            </li>
          ))}
        </ul>
        <div>
          <h3 className="type-display text-[clamp(1.3rem,2vw,1.6rem)] leading-[1.1]">
            <Editable value={project.client} />
          </h3>
          <p className="mt-2.5 line-clamp-2 max-w-[52ch] text-[15px] leading-snug text-paper/75">
            <Editable value={project.summary} />
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
            <p className="flex items-center gap-2 text-[13px] text-mute">
              <Icon name="check" className="h-4 w-4 text-accent-ink" />
              {project.service}
            </p>
            <button
              type="button"
              onClick={() => onOpen(project.id)}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-paper px-4 text-[14px] font-medium text-black transition duration-300 after:absolute after:inset-0 after:content-[''] group-hover:bg-white"
            >
              Ver projeto
              <Icon
                name="chevronRight"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </div>
      </article>
    </motion.li>
  );
}

export function Portfolio() {
  const [filter, setFilter] = useState<FilterId>('todos');
  const [openId, setOpenId] = useState<string | null>(null);

  const visible = useMemo(
    () => (filter === 'todos' ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter],
  );
  const counts = useMemo(() => {
    const map = new Map<FilterId, number>([['todos', projects.length]]);
    for (const p of projects) for (const c of p.categories) map.set(c, (map.get(c) ?? 0) + 1);
    return map;
  }, []);
  const activeLabel = filters.find((f) => f.id === filter)?.label ?? '';

  return (
    <section id="portfolio" aria-labelledby="portfolio-titulo" className="band bg-black">
      <div className="shell">
        <SectionHeading
          id="portfolio-titulo"
          title="Trabalhos que falam por si"
          intro="Vídeos para lojas, academias, eventos e marcas. Abra cada projeto para assistir e ver o que foi entregue."
        />

        <Reveal delay={0.1} className="mt-10 sm:mt-12">
          <div className="edge-fade -mx-[var(--pad)] overflow-x-auto px-[var(--pad)] no-scrollbar sm:mx-0 sm:overflow-visible sm:px-0 sm:[mask-image:none]">
            <div
              role="group"
              aria-label="Filtrar projetos por categoria"
              className="flex w-max gap-2 sm:w-auto sm:flex-wrap"
            >
              {filters
                .filter((f) => (counts.get(f.id) ?? 0) > 0)
                .map((f) => {
                  const count = counts.get(f.id) ?? 0;
                  const on = filter === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setFilter(f.id)}
                      className={`inline-flex h-11 items-center gap-2 rounded-full border px-4 text-[14px] transition duration-300 ${
                        on
                          ? 'border-paper bg-paper text-black'
                          : 'border-white/15 text-paper/75 hover:border-white/40 hover:text-paper'
                      } disabled:opacity-35`}
                    >
                      {f.label}
                      <span className={`text-[12px] tabular-nums ${on ? 'text-black/55' : 'text-paper/40'}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
            </div>
          </div>
        </Reveal>

        <p className="sr-only" aria-live="polite">
          {visible.length} {visible.length === 1 ? 'projeto' : 'projetos'} em {activeLabel}
        </p>

        <ul className="mt-8 grid auto-rows-[22rem] grid-flow-row-dense grid-cols-1 gap-4 sm:auto-rows-[23rem] sm:grid-cols-2 lg:auto-rows-[24.5rem] lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                total={visible.length}
                featured={filter === 'todos'}
                onOpen={setOpenId}
              />
            ))}
          </AnimatePresence>
        </ul>
      </div>

      <ProjectModal list={visible} openId={openId} onClose={() => setOpenId(null)} onNavigate={setOpenId} />
    </section>
  );
}
