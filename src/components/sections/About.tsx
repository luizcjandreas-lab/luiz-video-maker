import { site } from '../../content/site';
import { asset } from '../../lib/asset';
import { keep } from '../../lib/visibility';
import { plain } from '../../lib/text';
import { btn } from '../ui/button';
import { Editable } from '../ui/Editable';
import { Frame } from '../ui/Frame';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';

export function About() {
  const { about, brand, contact } = site;
  const facts = about.facts
    .map((f) => (f.label === 'Cidade e região de atendimento' && !f.value ? { ...f, value: contact.city } : f))
    .filter((f) => keep(f.value));
  // Sem foto no site publicado, a seção fica em uma coluna só.
  const showFigure = !!about.photo || site.showPlaceholders;

  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="band bg-graphite">
      <div
        className={`shell grid items-start gap-12 lg:gap-20 ${showFigure ? 'lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]' : 'max-w-[60rem]'}`}
      >
        {showFigure ? (
          <Reveal className="lg:sticky lg:top-28">
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] border border-line bg-graphite-2">
                {about.photo ? (
                  <img
                    src={asset(about.photo)}
                    alt={`Foto de ${plain(brand.name)}`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <Frame label="Sua fotografia profissional" icon="user" light="50% 15%" />
                )}
                <span className="vf absolute inset-4 opacity-60" aria-hidden="true" />
              </div>
              <figcaption className="mt-4 text-[14px] leading-snug">
                <span className="block font-medium text-paper">
                  <Editable value={brand.name} />
                </span>
                <span className="mt-1 block text-mute">{about.role}</span>
              </figcaption>
            </figure>
          </Reveal>
        ) : null}

        <div>
          <Reveal>
            <h2 id="sobre-titulo" className="type-display text-[clamp(2.05rem,4.4vw,3.5rem)] leading-[1.04]">
              {about.title}
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-7 max-w-[56ch] text-[clamp(1.1rem,1.55vw,1.3rem)] leading-[1.6] text-paper/85">
              {about.text}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="mt-10 grid border-t border-line sm:grid-cols-2 sm:gap-x-10">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className={`border-b border-line py-5 ${'wide' in f && f.wide ? 'sm:col-span-2' : ''}`}
                >
                  <dt className="text-[13px] text-mute">{f.label}</dt>
                  <dd className="mt-1.5 text-[17px] leading-snug">
                    <Editable value={f.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.12} className="mt-10 flex flex-col gap-3 min-[420px]:flex-row">
            <a href="#contato" className={btn('primary')}>
              Solicitar orçamento
            </a>
            {contact.instagramUrl ? (
              <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className={btn('ghost')}>
                <Icon name="at" className="h-[18px] w-[18px]" />
                Ver bastidores no Instagram
              </a>
            ) : (
              <a href="#processo" className={btn('ghost')}>
                Como eu trabalho
              </a>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
