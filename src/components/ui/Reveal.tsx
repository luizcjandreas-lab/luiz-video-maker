import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { EASE } from '../../lib/motion';

/** Entrada suave ao rolar: sobe 22px e aparece, uma única vez. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ id, title, intro }: { id: string; title: ReactNode; intro?: ReactNode }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
      <Reveal>
        <h2 id={id} className="type-display text-[clamp(2.05rem,4.4vw,3.5rem)] leading-[1.04]">
          {title}
        </h2>
      </Reveal>
      {intro ? (
        <Reveal delay={0.08}>
          <p className="max-w-[46ch] text-[17px] leading-relaxed text-mute">{intro}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
