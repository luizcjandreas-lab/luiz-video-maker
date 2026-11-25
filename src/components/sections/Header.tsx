import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { site } from '../../content/site';
import { visibleNav as nav } from '../../lib/visibility';
import { asset } from '../../lib/asset';
import { EASE } from '../../lib/motion';
import { plain } from '../../lib/text';
import { whatsappLink } from '../../lib/whatsapp';
import { btn } from '../ui/button';
import { Editable } from '../ui/Editable';
import { Icon } from '../ui/Icon';

export function Brand({ className = '' }: { className?: string }) {
  if (site.brand.logo) {
    return <img src={asset(site.brand.logo)} alt={plain(site.brand.name)} className={`h-8 w-auto ${className}`} />;
  }
  return (
    <span className={`type-display text-[17px] leading-none sm:text-[18px] ${className}`}>
      <Editable value={site.brand.name} />
    </span>
  );
}

export function Header({ active }: { active: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500 ${
          solid ? 'border-line bg-black/80 backdrop-blur-xl' : 'border-transparent bg-transparent'
        }`}
      >
        <a
          href="#portfolio"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-paper focus:px-4 focus:py-2 focus:text-black"
        >
          Pular para o conteúdo
        </a>
        <div className="shell flex h-[72px] items-center justify-between gap-6">
          <a
            href="#inicio"
            className="min-w-0 truncate py-2"
            aria-label={`${plain(site.brand.name)}, voltar ao início`}
          >
            <Brand />
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center">
              {nav.map((item) => {
                const current = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={current ? 'location' : undefined}
                      className={`relative block px-3 py-2 text-[14px] transition-colors duration-300 xl:px-3.5 ${
                        current ? 'text-paper' : 'text-paper/60 hover:text-paper'
                      }`}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={`absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent transition-opacity duration-300 ${
                          current ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a href="#contato" className={`${btn('primary', 'sm')} max-sm:hidden`}>
              Solicitar orçamento
            </a>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-paper transition hover:border-white/40 lg:hidden"
              aria-expanded={open}
              aria-controls="menu-celular"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name={open ? 'close' : 'menu'} />
            </button>
          </div>
        </div>
      </header>

      {/* Fora do <header>: o desfoque do cabeçalho prenderia um elemento fixo dentro dele. */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="menu-celular"
            key="menu"
            className="fixed inset-x-0 bottom-0 top-[72px] z-[49] overflow-y-auto bg-black/95 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav aria-label="Menu" className="shell flex min-h-full flex-col justify-between gap-10 pb-10 pt-6">
              <ul>
                {nav.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.04 * i }}
                    className="border-b border-line"
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={active === item.id ? 'location' : undefined}
                      className={`type-display flex items-center justify-between py-4 text-[28px] leading-none ${
                        active === item.id ? 'text-paper' : 'text-paper/70'
                      }`}
                    >
                      {item.label}
                      {active === item.id ? (
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                      ) : null}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="grid gap-3 sm:grid-cols-2">
                <a href="#contato" onClick={() => setOpen(false)} className={btn('primary', 'lg')}>
                  Solicitar orçamento
                </a>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={btn('ghost', 'lg')}>
                  <Icon name="chat" />
                  Falar pelo WhatsApp
                </a>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
