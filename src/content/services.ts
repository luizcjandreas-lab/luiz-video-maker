/**
 * SERVIÇOS
 * ---------------------------------------------------------------
 * icon: um dos nomes de ícone disponíveis em src/components/ui/Icon.tsx.
 * O botão "Quero este serviço" abre o WhatsApp com o nome do serviço na mensagem.
 */
import type { IconName } from '../components/ui/Icon';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: IconName;
}

export const services: Service[] = [
  {
    id: 'producao-audiovisual',
    title: 'Produção audiovisual',
    description:
      'Filmes com linguagem de cinema para apresentar marcas, produtos e espaços: roteiro, captação, luz, som e cor em um só fluxo.',
    icon: 'film',
  },
  {
    id: 'reels',
    title: 'Reels para redes sociais',
    description:
      'Vídeos verticais com gancho nos primeiros segundos, ritmo de edição e legendas, captados e montados para cada rede.',
    icon: 'phone',
  },
  {
    id: 'institucional',
    title: 'Vídeos institucionais',
    description:
      'A história, a estrutura e as pessoas da sua empresa em um vídeo que transmite confiança para clientes, parceiros e equipe.',
    icon: 'building',
  },
  {
    id: 'fotografia',
    title: 'Fotografia profissional',
    description:
      'Produtos, ambientes, equipes e retratos com direção, luz controlada e tratamento consistente com a identidade da marca.',
    icon: 'camera',
  },
  {
    id: 'social-media',
    title: 'Gestão de redes sociais',
    description:
      'Planejamento, calendário, publicação e acompanhamento, para que o seu perfil tenha constância, identidade e propósito.',
    icon: 'grid',
  },
  {
    id: 'campanhas',
    title: 'Criação de campanhas',
    description:
      'Conceito, roteiro e peças para lançamentos, datas comerciais e promoções, pensados para gerar procura e vendas.',
    icon: 'megaphone',
  },
  {
    id: 'sites',
    title: 'Desenvolvimento de sites',
    description: 'Sites rápidos, bonitos no celular e preparados para transformar visitas em conversas pelo WhatsApp.',
    icon: 'browser',
  },
  {
    id: 'cobertura',
    title: 'Cobertura de eventos e empresas',
    description:
      'Foto e vídeo de eventos, inaugurações, lojas, academias, veículos e profissionais, com material pronto para as redes.',
    icon: 'calendar',
  },
];
