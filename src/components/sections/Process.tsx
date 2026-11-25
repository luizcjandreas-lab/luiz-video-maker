import { motion } from 'framer-motion';
import { steps } from '../../content/process';
import { EASE } from '../../lib/motion';
import { SectionHeading } from '../ui/Reveal';

export function Process() {
  return (
    <section id="processo" aria-labelledby="processo-titulo" className="band bg-black">
      <div className="shell">
        <SectionHeading
          id="processo-titulo"
          title="Um processo claro, do primeiro contato à entrega"
          intro="Cada etapa tem um objetivo e um momento de aprovação. Você sabe o que está acontecendo, o que vem a seguir e o que vai receber."
        />

        <div className="relative mt-14 sm:mt-16">
          {/* Linha do tempo: vertical no celular, horizontal no computador */}
          <span
            aria-hidden="true"
            className="absolute bottom-6 left-[21px] top-2 w-px bg-line lg:bottom-auto lg:left-0 lg:right-0 lg:top-[22px] lg:h-px lg:w-auto"
          />
          <motion.span
            aria-hidden="true"
            className="absolute bottom-6 left-[21px] top-2 hidden w-px origin-top bg-accent lg:bottom-auto lg:left-0 lg:right-0 lg:top-[22px] lg:block lg:h-px lg:w-auto lg:origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.8, ease: EASE }}
          />
          <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-7">
            {steps.map((step, i) => (
              <motion.li
                key={step.title}
                className="grid grid-cols-[44px_minmax(0,1fr)] gap-5 lg:flex lg:flex-col lg:gap-0"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.12 }}
              >
                <span className="type-display relative grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black text-[16px] tabular-nums text-paper">
                  {i + 1}
                </span>
                <div className="lg:mt-7 lg:flex lg:flex-1 lg:flex-col">
                  <h3 className="text-[18px] font-semibold leading-snug tracking-[-0.01em]">{step.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-mute">{step.text}</p>
                  <div className="mt-4 lg:mt-auto lg:pt-6">
                    <p className="border-l border-accent/60 pl-3 text-[14px] leading-snug text-paper/85">
                      <span className="block text-[12px] text-accent-ink">Ao final</span>
                      {step.outcome}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
