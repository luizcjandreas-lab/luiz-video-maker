/**
 * MARCAS E CLIENTES
 * ---------------------------------------------------------------
 * logo: arquivo em /public (SVG ou PNG com fundo transparente). Ex.: 'logos/cliente.svg'
 * Os logos aparecem em escala de cinza e ganham a cor original ao passar o mouse.
 * Sem logo, o nome do cliente aparece escrito.
 * url (opcional): link para o site ou Instagram do cliente.
 * Deixe a lista vazia ([]) para esconder a faixa inteira.
 */

export interface Client {
  name: string;
  logo?: string;
  url?: string;
}

export const clients: Client[] = [
  { name: 'Fimavel Multimarcas' },
  { name: 'Elite Thai Boxing' },
  { name: 'Doutor Terno' },
  { name: 'Óticas Venice' },
  { name: 'Ianka Tranças' },
];
