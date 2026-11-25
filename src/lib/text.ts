/** Um texto entre [colchetes] (ou vazio) é tratado como campo ainda não preenchido. */
export const isPlaceholder = (value?: string | null): boolean => !value || /^\s*\[[\s\S]*\]\s*$/.test(value);

export const stripBrackets = (value: string): string => value.replace(/^\s*\[|\]\s*$/g, '');

/** Texto limpo, sem colchetes, para usar em atributos (alt, aria-label) e mensagens. */
export const plain = (value?: string | null): string => (value ? stripBrackets(value) : '');
