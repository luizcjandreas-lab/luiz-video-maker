import { site } from '../../content/site';
import { visibleNav as nav } from '../../lib/visibility';
import { whatsappLink } from '../../lib/whatsapp';
import { Editable } from '../ui/Editable';
import { Icon } from '../ui/Icon';
import { Brand } from './Header';

export function Footer() {
  const { brand, contact } = site;
  return (
    <footer className="border-t border-line bg-black pb-24 sm:pb-0">
      <div className="shell grid gap-10 py-14 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <Brand className="text-[22px]" />
          <p className="mt-4 max-w-[34ch] text-[15px] leading-relaxed text-mute">{brand.tagline}</p>
        </div>
        <nav aria-label="Rodapé">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-[15px]">
            {nav.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-paper/70 transition hover:text-paper">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="grid content-start gap-3 text-[15px]">
          <li>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-paper/80 transition hover:text-paper"
            >
              <Icon name="chat" className="h-[18px] w-[18px] text-accent-ink" />
              WhatsApp
            </a>
          </li>
          <li className="inline-flex items-center gap-2.5 text-paper/80">
            <Icon name="at" className="h-[18px] w-[18px] text-accent-ink" />
            {contact.instagramUrl ? (
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-paper"
              >
                <Editable value={contact.instagramHandle} />
              </a>
            ) : (
              <Editable value={contact.instagramHandle} />
            )}
          </li>
          <li className="inline-flex items-center gap-2.5 break-all text-paper/80">
            <Icon name="mail" className="h-[18px] w-[18px] shrink-0 text-accent-ink" />
            <Editable value={contact.email} />
          </li>
        </ul>
      </div>
      <div className="shell flex flex-col gap-3 border-t border-line py-6 text-[13px] text-mute sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} <Editable value={brand.name} />. Todos os direitos reservados.
        </p>
        <a href="#inicio" className="inline-flex items-center gap-1.5 transition hover:text-paper">
          Voltar ao topo
        </a>
      </div>
    </footer>
  );
}
