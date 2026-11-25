import type { PointerEvent } from 'react';
import { motion } from 'framer-motion';
import { services } from '../../content/services';
import { EASE } from '../../lib/motion';
import { whatsappLink } from '../../lib/whatsapp';
import { Icon } from '../ui/Icon';
import { SectionHeading } from '../ui/Reveal';

/** Luz azul que acompanha o cursor dentro do card. */
const follow = (e: PointerEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-titulo" className="band bg-black">
      <div className="shell">
        <SectionHeading
          id="servicos-titulo"
          title="O que eu posso fazer pela sua marca"
          intro="Serviços que podem ser contratados separadamente ou combinados em um projeto completo, do roteiro à publicação."
        />
        <ul className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.li
              key={s.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease: EASE, delay: (i % 4) * 0.06 }}
            >
              <article
                onPointerMove={follow}
                className="spot relative flex h-full flex-col overflow-hidden rounded-[18px] border border-line bg-graphite p-6 transition-colors duration-500 hover:border-white/15 sm:p-7"
              >
                <span className="relative grid h-12 w-12 place-items-center rounded-[14px] border border-white/10 bg-white/[0.03] text-accent-ink shadow-[inset_0_1px_0_rgb(255_255_255/0.06)]">
                  <Icon name={s.icon} className="h-[22px] w-[22px]" />
                </span>
                <h3 className="relative mt-7 text-[19px] font-semibold leading-snug tracking-[-0.01em]">{s.title}</h3>
                <p className="relative mt-3 flex-1 text-[15px] leading-relaxed text-mute">{s.description}</p>
                <a
                  href={whatsappLink(`Olá! Tenho interesse no serviço: ${s.title}. Pode me passar um orçamento?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mt-7 inline-flex h-11 items-center gap-2 self-start rounded-full border border-white/15 px-4 text-[14px] text-paper transition duration-300 hover:border-accent hover:bg-accent/10"
                >
                  <Icon name="chat" className="h-4 w-4 text-accent-ink" />
                  Quero este serviço
                </a>
              </article>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
