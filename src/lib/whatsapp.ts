import { site } from '../content/site';

export const whatsappDigits = (): string => site.contact.whatsapp.replace(/\D/g, '');

/** Monta o link do WhatsApp com a mensagem já escrita. Sem número, abre a escolha de contato. */
export function whatsappLink(message: string = site.contact.whatsappMessage): string {
  const digits = whatsappDigits();
  const text = encodeURIComponent(message);
  return digits ? `https://wa.me/${digits}?text=${text}` : `https://wa.me/?text=${text}`;
}

/** 5511999998888 → +55 (11) 99999-8888 */
export function formatPhone(digits: string): string {
  const d = digits.replace(/\D/g, '');
  const m = d.match(/^(\d{2})(\d{2})(\d{4,5})(\d{4})$/);
  return m ? `+${m[1]} (${m[2]}) ${m[3]}-${m[4]}` : d;
}

/** Máscara para o campo de WhatsApp do formulário: (11) 99999-8888 */
export function maskPhoneBR(value: string): string {
  const d = value.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}
