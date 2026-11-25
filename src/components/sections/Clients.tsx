import { clients } from '../../content/clients';
import { asset } from '../../lib/asset';
import { isPlaceholder, plain } from '../../lib/text';
import { Reveal } from '../ui/Reveal';

export function Clients() {
  if (clients.length === 0) return null;

  return (
    <section id="marcas" aria-labelledby="marcas-titulo" className="border-y border-line bg-black py-12 sm:py-16">
      <div className="shell grid gap-8 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:items-center lg:gap-14">
        <Reveal>
          <h2 id="marcas-titulo" className="max-w-[18rem] text-[15px] leading-snug text-mute">
            Marcas que já confiaram no meu trabalho
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <ul className="grid grid-cols-2 gap-2 max-sm:[&>li:last-child:nth-child(odd)]:col-span-2 sm:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] sm:gap-3">
            {clients.map((client, i) => {
              const empty = !client.logo && isPlaceholder(client.name);
              const inner = !client.logo ? (
                isPlaceholder(client.name) ? (
                  <span className="px-2 text-center text-[12px] leading-tight text-paper/40 sm:text-[13px]">
                    Logotipo do cliente
                  </span>
                ) : (
                  <span className="type-display px-3 text-center text-[15px] leading-tight text-paper/55 transition-colors duration-500 group-hover:text-paper sm:text-[17px]">
                    {client.name}
                  </span>
                )
              ) : (
                <img
                  src={asset(client.logo)}
                  alt={plain(client.name)}
                  loading="lazy"
                  decoding="async"
                  className="max-h-10 max-w-[72%] object-contain opacity-60 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0 group-focus-visible:opacity-100 group-focus-visible:grayscale-0"
                />
              );
              const box = `group flex h-16 items-center sm:h-20 justify-center rounded-2xl border transition-colors duration-500 ${
                empty ? 'border-dashed border-white/12' : 'border-line hover:border-white/25'
              }`;
              return (
                <li key={`${client.name}-${i}`}>
                  {client.url ? (
                    <a href={client.url} target="_blank" rel="noopener noreferrer" className={box}>
                      {inner}
                    </a>
                  ) : (
                    <div className={box}>{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
