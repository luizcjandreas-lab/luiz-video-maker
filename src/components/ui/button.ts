const base =
  'inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full font-medium whitespace-nowrap select-none transition duration-300 ease-out disabled:pointer-events-none disabled:opacity-50';

const sizes = {
  sm: 'h-10 px-5 text-[14px]',
  md: 'h-12 px-6 text-[15px]',
  lg: 'h-14 px-7 text-[16px]',
};

const variants = {
  primary:
    'bg-accent-strong text-white shadow-[0_10px_34px_-12px_rgb(47_102_245/0.8)] hover:bg-[#3b72ff] hover:shadow-[0_16px_44px_-12px_rgb(61_124_255/0.95)]',
  ghost:
    'border border-white/20 bg-white/[0.02] text-paper backdrop-blur-sm hover:border-white/50 hover:bg-white/[0.07]',
  whats: 'bg-whats text-[#03200e] shadow-[0_10px_34px_-12px_rgb(37_211_102/0.7)] hover:bg-[#3be07b]',
};

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

/** Classes dos botões do site, para usar em <a> ou <button>. */
export const btn = (variant: ButtonVariant = 'primary', size: ButtonSize = 'md'): string =>
  `${base} ${sizes[size]} ${variants[variant]}`;
