/** PROCESSO DE TRABALHO — 5 etapas exibidas em sequência. */

export interface Step {
  title: string;
  text: string;
  /** O que o cliente tem em mãos ao final da etapa. */
  outcome: string;
}

export const steps: Step[] = [
  {
    title: 'Briefing e entendimento do negócio',
    text: 'Conversamos sobre a empresa, o público, o objetivo do projeto e onde o conteúdo vai ser usado. É aqui que definimos o que é um bom resultado para você.',
    outcome: 'Proposta com escopo, prazo e investimento',
  },
  {
    title: 'Planejamento e criação da ideia',
    text: 'O briefing vira um conceito: formato, linguagem, referências visuais e a mensagem principal. Nada é gravado antes da sua aprovação.',
    outcome: 'Conceito e referências aprovados',
  },
  {
    title: 'Roteiro e preparação',
    text: 'Roteiro, lista de cenas, locais, horários e tudo o que precisa estar pronto no dia. Menos improviso, mais aproveitamento da gravação.',
    outcome: 'Roteiro e cronograma da produção',
  },
  {
    title: 'Captação e produção',
    text: 'Gravação e fotografia com equipamento profissional, direção de cena e cuidado com luz, som e enquadramento.',
    outcome: 'Material bruto captado e organizado',
  },
  {
    title: 'Edição, aprovação e entrega',
    text: 'Edição, cor, trilha e legendas. Você revisa, aponta os ajustes combinados e recebe os arquivos finais nos formatos de cada canal.',
    outcome: 'Arquivos finais prontos para publicar',
  },
];
