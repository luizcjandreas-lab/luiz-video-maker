import { site } from '../../content/site';
import { whatsappLink } from '../../lib/whatsapp';
import { btn } from '../ui/button';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';

export function FinalCta() {
  const { finalCta } = site;
  return (
    <section aria-labelledby="cta-titulo" className="grain relative isolate overflow-hidden bg-black">
      <div aria-hidden="true" className="cta-light absolute inset-0 -z-10" />
      <div className="shell py-[clamp(5rem,12vw,10rem)]">
        <div className="relative mx-auto max-w-[62rem] px-5 py-16 text-center sm:px-14 sm:py-24">
          <span aria-hidden="true" className="vf absolute inset-0 opacity-80" />
          <Reveal>
            <h2
              id="cta-titulo"
              className="type-display mx-auto max-w-[20ch] text-[clamp(2.2rem,5.4vw,4.6rem)] leading-[1.02]"
            >
              {finalCta.title}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-6 max-w-[42ch] text-[clamp(1.05rem,1.6vw,1.25rem)] leading-relaxed text-paper/75">
              {finalCta.text}
            </p>
          </Reveal>
          <Reveal delay={0.14} className="mt-10 flex flex-col justify-center gap-3 min-[460px]:flex-row">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={btn('primary', 'lg')}>
              <Icon name="chat" />
              Falar pelo WhatsApp
            </a>
            <a href="#contato" className={btn('ghost', 'lg')}>
              Solicitar orçamento
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
