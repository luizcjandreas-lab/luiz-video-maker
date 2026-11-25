import { projects } from '../content/projects';
import { nav, site } from '../content/site';
import { testimonials } from '../content/testimonials';
import { isPlaceholder } from './text';

/** Mostra o texto se for conteúdo real, ou se o site estiver em modo edição. */
export const keep = (value?: string | null): boolean => site.showPlaceholders || !isPlaceholder(value);

export const visibleTestimonials = testimonials.filter((t) => keep(t.text));

/** Projetos-modelo (sem nome, capa nem vídeo) só aparecem no modo edição. */
export const visibleProjects = projects.filter((p) => keep(p.client) || !!p.cover || !!p.video);

export const visibleNav = nav.filter((item) => item.id !== 'depoimentos' || visibleTestimonials.length > 0);
