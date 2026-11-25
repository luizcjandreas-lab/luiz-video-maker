/** Resolve caminhos de /public respeitando a base do site. Links completos passam direto. */
export function asset(path?: string): string | undefined {
  if (!path) return undefined;
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:') || path.startsWith('blob:')) return path;
  const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');
  return base + path.replace(/^\.?\//, '');
}

/** Arquivos com "exemplo" no nome são mídias de demonstração e recebem um aviso. */
export const isSampleMedia = (path?: string): boolean => !!path && /exemplo/i.test(path);
