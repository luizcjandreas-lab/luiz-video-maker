import { useId, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { services } from '../../content/services';
import { site } from '../../content/site';
import { EASE } from '../../lib/motion';
import { keep } from '../../lib/visibility';
import { isPlaceholder, plain } from '../../lib/text';
import { formatPhone, maskPhoneBR, whatsappDigits, whatsappLink } from '../../lib/whatsapp';
import { btn } from '../ui/button';
import { Editable } from '../ui/Editable';
import { Icon, type IconName } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';

const GOALS = [
  'Atrair novos clientes',
  'Lançar um produto ou serviço',
  'Fortalecer a imagem da marca',
  'Aumentar as vendas',
  'Registrar um evento',
  'Outro objetivo',
];

type Fields = { nome: string; empresa: string; whatsapp: string; servico: string; objetivo: string; mensagem: string };
type Errors = Partial<Record<keyof Fields, string>>;
const EMPTY: Fields = { nome: '', empresa: '', whatsapp: '', servico: '', objetivo: '', mensagem: '' };

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.nome.trim().length < 2) e.nome = 'Informe seu nome.';
  if (f.whatsapp.replace(/\D/g, '').length < 10) e.whatsapp = 'Informe um WhatsApp com DDD.';
  if (!f.servico) e.servico = 'Escolha o tipo de serviço.';
  return e;
}

function compose(f: Fields): string {
  const lines = ['Olá! Gostaria de pedir um orçamento.', '', `Nome: ${f.nome.trim()}`];
  if (f.empresa.trim()) lines.push(`Empresa: ${f.empresa.trim()}`);
  lines.push(`WhatsApp: ${f.whatsapp}`, `Serviço: ${f.servico}`);
  if (f.objetivo) lines.push(`Objetivo: ${f.objetivo}`);
  if (f.mensagem.trim()) lines.push('', `Mensagem: ${f.mensagem.trim()}`);
  return lines.join('\n');
}

const inputClass =
  'block w-full rounded-xl border bg-black/45 px-4 text-[16px] text-paper placeholder:text-white/35 transition duration-300 focus:border-accent focus:bg-black/70 focus:outline-none focus:ring-4 focus:ring-accent/20';

function Field({
  id,
  label,
  error,
  hint,
  children,
  className = '',
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-[14px] text-paper/80">
        {label}
        {hint ? <span className="text-mute"> {hint}</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-erro`} className="mt-2 text-[13px] text-[#ff8f86]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function ContactItem({ icon, label, children }: { icon: IconName; label: string; children: ReactNode }) {
  return (
    <li className="flex items-center gap-4 py-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/12 text-accent-ink">
        <Icon name={icon} />
      </span>
      <span className="min-w-0">
        <span className="block text-[13px] text-mute">{label}</span>
        <span className="block break-words text-[16px] leading-snug">{children}</span>
      </span>
    </li>
  );
}

function ContactForm() {
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;
  const formRef = useRef<HTMLFormElement>(null);
  const [f, setF] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sentLink, setSentLink] = useState<string | null>(null);

  const set = (key: keyof Fields) => (value: string) => {
    setF((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(f);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const message = compose(f);
    const link = whatsappLink(message);
    if (site.form.endpoint) {
      fetch(site.form.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...f, mensagemCompleta: message }),
      }).catch(() => undefined);
    }
    setSentLink(link);
    try {
      window.open(link, '_blank', 'noopener');
    } catch {
      /* o botão da confirmação continua disponível */
    }
  };

  const describedBy = (k: keyof Fields) => (errors[k] ? `${id(k)}-erro` : undefined);
  const border = (k: keyof Fields) => (errors[k] ? 'border-[#ff8f86]' : 'border-white/12');

  return (
    <div className="relative rounded-[22px] border border-line bg-black/40 p-5 sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {sentLink ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex min-h-[28rem] flex-col items-start justify-center"
            role="status"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-whats/15 text-whats">
              <Icon name="check" className="h-7 w-7" />
            </span>
            <h3 className="type-display mt-6 text-[28px] leading-tight">Pedido pronto para envio</h3>
            <p className="mt-3 max-w-[40ch] text-[16px] leading-relaxed text-mute">
              Sua mensagem foi montada com todos os dados. Se o WhatsApp não abriu sozinho, toque no botão abaixo e
              confirme o envio.
            </p>
            <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
              <a href={sentLink} target="_blank" rel="noopener noreferrer" className={btn('whats', 'lg')}>
                <Icon name="chat" />
                Abrir no WhatsApp
              </a>
              <button type="button" onClick={() => setSentLink(null)} className={btn('ghost', 'lg')}>
                Editar pedido
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid gap-5 sm:grid-cols-2"
            aria-label="Formulário de orçamento"
          >
            <Field id={id('nome')} label="Nome" error={errors.nome}>
              <input
                id={id('nome')}
                name="nome"
                autoComplete="name"
                value={f.nome}
                onChange={(e) => set('nome')(e.target.value)}
                aria-invalid={!!errors.nome}
                aria-describedby={describedBy('nome')}
                className={`${inputClass} h-12 ${border('nome')}`}
                placeholder="Como posso te chamar?"
              />
            </Field>
            <Field id={id('empresa')} label="Empresa" hint="(opcional)">
              <input
                id={id('empresa')}
                name="empresa"
                autoComplete="organization"
                value={f.empresa}
                onChange={(e) => set('empresa')(e.target.value)}
                className={`${inputClass} h-12 border-white/12`}
                placeholder="Nome da empresa ou marca"
              />
            </Field>
            <Field id={id('whatsapp')} label="WhatsApp" error={errors.whatsapp}>
              <input
                id={id('whatsapp')}
                name="whatsapp"
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                value={f.whatsapp}
                onChange={(e) => set('whatsapp')(maskPhoneBR(e.target.value))}
                aria-invalid={!!errors.whatsapp}
                aria-describedby={describedBy('whatsapp')}
                className={`${inputClass} h-12 tabular-nums ${border('whatsapp')}`}
                placeholder="(00) 00000-0000"
              />
            </Field>
            <Field id={id('servico')} label="Tipo de serviço" error={errors.servico}>
              <div className="relative">
                <select
                  id={id('servico')}
                  name="servico"
                  value={f.servico}
                  onChange={(e) => set('servico')(e.target.value)}
                  aria-invalid={!!errors.servico}
                  aria-describedby={describedBy('servico')}
                  className={`${inputClass} h-12 appearance-none pr-11 ${f.servico ? '' : 'text-white/45'} ${border('servico')}`}
                >
                  <option value="">Selecione</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="Mais de um serviço">Mais de um serviço</option>
                </select>
                <Icon
                  name="chevronDown"
                  className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-mute"
                />
              </div>
            </Field>
            <Field id={id('objetivo')} label="Objetivo do projeto" hint="(opcional)" className="sm:col-span-2">
              <div className="relative">
                <select
                  id={id('objetivo')}
                  name="objetivo"
                  value={f.objetivo}
                  onChange={(e) => set('objetivo')(e.target.value)}
                  className={`${inputClass} h-12 appearance-none border-white/12 pr-11 ${f.objetivo ? '' : 'text-white/45'}`}
                >
                  <option value="">O que você quer alcançar?</option>
                  {GOALS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
                <Icon
                  name="chevronDown"
                  className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-mute"
                />
              </div>
            </Field>
            <Field id={id('mensagem')} label="Mensagem" hint="(opcional)" className="sm:col-span-2">
              <textarea
                id={id('mensagem')}
                name="mensagem"
                rows={4}
                value={f.mensagem}
                onChange={(e) => set('mensagem')(e.target.value)}
                className={`${inputClass} resize-y border-white/12 py-3 leading-relaxed`}
                placeholder="Conte um pouco sobre o projeto, prazos e referências."
              />
            </Field>
            <div className="sm:col-span-2">
              <button type="submit" className={`${btn('primary', 'lg')} w-full`}>
                <Icon name="chat" />
                Enviar pedido pelo WhatsApp
              </button>
              <p className="mt-3 text-center text-[13px] leading-snug text-mute">
                A mensagem abre pronta no WhatsApp para você confirmar. Seus dados são usados apenas para responder ao
                pedido.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Contact() {
  const { contact } = site;
  const digits = whatsappDigits();

  return (
    <section id="contato" aria-labelledby="contato-titulo" className="band bg-graphite">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <Reveal>
            <h2 id="contato-titulo" className="type-display text-[clamp(2.05rem,4.4vw,3.5rem)] leading-[1.04]">
              Peça seu orçamento
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-5 max-w-[42ch] text-[17px] leading-relaxed text-mute">
              Conte um pouco sobre o projeto. Ao enviar, a mensagem chega pronta no WhatsApp. Se preferir, fale direto
              pelos canais abaixo.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-10 divide-y divide-line border-y border-line">
              <ContactItem icon="chat" label="WhatsApp">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4 hover:underline"
                >
                  {digits ? formatPhone(digits) : <Editable value="[Seu número de WhatsApp]" />}
                </a>
              </ContactItem>
              <ContactItem icon="at" label="Instagram">
                {contact.instagramUrl ? (
                  <a
                    href={contact.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-4 hover:underline"
                  >
                    <Editable value={contact.instagramHandle} />
                  </a>
                ) : (
                  <Editable value={contact.instagramHandle} />
                )}
              </ContactItem>
              <ContactItem icon="mail" label="E-mail profissional">
                {isPlaceholder(contact.email) ? (
                  <Editable value={contact.email} />
                ) : (
                  <a href={`mailto:${plain(contact.email)}`} className="underline-offset-4 hover:underline">
                    {contact.email}
                  </a>
                )}
              </ContactItem>
              {keep(contact.city) ? (
                <ContactItem icon="pin" label="Cidade de atendimento">
                  <Editable value={contact.city} />
                </ContactItem>
              ) : null}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={0.08}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
