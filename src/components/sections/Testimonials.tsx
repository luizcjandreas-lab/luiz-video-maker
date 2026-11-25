import { motion } from 'framer-motion';
import { visibleTestimonials as testimonials } from '../../lib/visibility';
import { asset } from '../../lib/asset';
import { EASE } from '../../lib/motion';
import { isPlaceholder, plain } from '../../lib/text';
import { Editable } from '../ui/Editable';
import { Icon } from '../ui/Icon';
import { SectionHeading } from '../ui/Reveal';

function Stars({ rating }: { rating: number | null }) {
  const value = rating ? Math.max(0, Math.min(5, Math.round(rating))) : 0;
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex gap-1"
        role="img"
        aria-label={rating ? `Avaliação: ${value} de 5` : 'Avaliação ainda não preenchida'}
      >
        {Array.from({ length: 5 }, (_, i) => (
          <Icon
            key={i}
            name="star"
            className={`h-[18px] w-[18px] ${i < value ? 'fill-accent-ink text-accent-ink' : 'text-white/25'}`}
          />
        ))}
      </div>
      {rating ? null : <span className="slot text-[12px]">avaliação real</span>}
    </div>
  );
}

export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section id="depoimentos" aria-labelledby="depoimentos-titulo" className="band bg-graphite">
      <div className="shell">
        <SectionHeading
          id="depoimentos-titulo"
          title="O que dizem os clientes"
          intro="Palavras de quem já confiou um projeto ao meu trabalho."
        />
        <ul className="mt-12 grid gap-4 sm:mt-14 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.li
              key={t.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
            >
              <figure className="flex h-full flex-col rounded-[20px] border border-line bg-black/35 p-6 sm:p-7">
                <Stars rating={t.rating} />
                <blockquote className="mt-6 min-h-[7rem] flex-1 text-[17px] leading-relaxed text-paper/90">
                  <p>{isPlaceholder(t.text) ? <Editable value={t.text} /> : `“${t.text}”`}</p>
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3.5 border-t border-line pt-5">
                  <span className="relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full border border-white/12 bg-graphite-2 text-paper/45">
                    {t.photo ? (
                      <img
                        src={asset(t.photo)}
                        alt={plain(t.name)}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Icon name="user" className="h-5 w-5" />
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-medium leading-snug">
                      <Editable value={t.name} />
                    </span>
                    <span className="mt-0.5 block text-[14px] leading-snug text-mute">
                      <Editable value={t.company} />
                    </span>
                  </span>
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
