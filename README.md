# Portfólio audiovisual

Site de portfólio em React, TypeScript, Tailwind CSS 4 e Framer Motion. Todo o conteúdo fica em arquivos de dados: você não precisa mexer nos componentes para trocar textos, projetos, vídeos ou contatos.

## Rodar e publicar

Requisitos: Node.js 20 ou mais recente.

```bash
npm install        # instala as dependências
npm run dev        # abre em http://localhost:5173 com recarregamento automático
npm run build      # gera a versão final na pasta dist/
npm run typecheck  # confere os tipos do TypeScript
```

Para publicar, envie a pasta `dist/` para qualquer hospedagem de site estático (Vercel, Netlify, Cloudflare Pages, Hostinger, etc.). Na Vercel e na Netlify basta importar o repositório: o comando de build é `npm run build` e a pasta de saída é `dist`.

## Onde editar cada coisa

| O que | Arquivo |
| --- | --- |
| Nome, WhatsApp, Instagram, e-mail, cidade, textos da abertura, "Sobre" e chamada final | `src/content/site.ts` |
| Projetos do portfólio e filtros | `src/content/projects.ts` |
| Reels (vídeos verticais) | `src/content/reels.ts` |
| Serviços | `src/content/services.ts` |
| Etapas do processo | `src/content/process.ts` |
| Depoimentos | `src/content/testimonials.ts` |
| Logotipos de clientes | `src/content/clients.ts` |
| Título do Google e textos de compartilhamento | `index.html` |
| Cores e tipografia | `src/index.css` (bloco `@theme`) |

### Campos entre [colchetes]

Todo texto escrito entre colchetes, como `'[Insira aqui o resultado real]'`, aparece no site em cinza com sublinhado tracejado: é um campo que ainda precisa de informação real. Quando você troca pelo conteúdo verdadeiro, o estilo some sozinho.

Antes de publicar, procure colchetes que ficaram para trás:

```bash
grep -rn "'\[" src/content
```

Os clientes, depoimentos, números e resultados não foram inventados. Os projetos e os Reels usam os seus vídeos, e os nomes dos clientes vieram de você ou das próprias gravações (Fimavel Multimarcas, Elite Thai Boxing, Doutor Terno, Óticas Venice, Ianka Tranças e o título do filme "Renato & Gisele"): confira a grafia. Objetivo, desafio, solução e resultado de cada projeto continuam entre colchetes para você contar a história real. As listas de "Serviços entregues" descrevem o que aparece nos vídeos; ajuste se precisar.

## Fotos e vídeos

Coloque os arquivos em `public/media/` e use o caminho sem a barra inicial, por exemplo `'media/showreel.mp4'`.

- **Showreel da abertura** (`site.hero.video`): .mp4 (H.264), sem som, 15 a 40 segundos, 1920×1080 ou 1280×720, de preferência abaixo de 8 MB. Atualize também `site.hero.poster` com um quadro do vídeo em .jpg. Opcional: `videoMobile` com uma versão mais leve para celular.
- **Capas dos projetos** (`cover`): .jpg ou .webp com pelo menos 1200 px de largura. Sem capa, o card mostra uma moldura de visor com o nome da categoria.
- **Reels** (`video` + `poster`): .mp4 vertical 1080×1920 e uma capa vertical.
- **Sua foto** (`site.about.photo`): vertical, proporção 4:5.
- **Logos de clientes** (`logo`): SVG ou PNG com fundo transparente. Eles aparecem em escala de cinza e ganham cor ao passar o mouse.

### Mídias que já estão no projeto

- `media/showreel.mp4`: montagem com cenas do filme de casamento em tela cheia e trechos dos seus Reels em três telas (1280×720, 27 s, sem som), usada na abertura no computador.
- `media/showreel-celular.mp4`: montagem vertical (720×1280, 24 s) usada no celular.
- `media/videos/casamento.mp4`: filme de casamento convertido para 1280×720 a 30 quadros por segundo (o original tinha 100 MB, em 1920×1080 a 120 quadros por segundo).
- `media/reels/`: os 7 vídeos verticais convertidos de HEVC (.mov) para H.264 (.mp4, 720×1280), formato que toca em qualquer navegador, com uma capa .jpg cada. O vídeo da Doutor Terno foi cortado em 53 s, porque o original terminava com 25 s de tela preta.
- `media/capas/`: capas dos cards do portfólio, tiradas dos vídeos.

Para converter um vídeo novo do jeito que estes foram feitos:

```bash
ffmpeg -i original.mov -vf scale=720:1280 -c:v libx264 -preset veryfast -crf 24 -maxrate 2200k -bufsize 4400k -c:a aac -b:a 128k -movflags +faststart public/media/reels/novo.mp4
```

### YouTube, Vimeo e Instagram

Os campos `video` aceitam também links:

```ts
video: 'https://www.youtube.com/watch?v=XXXXXXXXXXX'
video: 'https://youtube.com/shorts/XXXXXXXXXXX'
video: 'https://vimeo.com/123456789'
video: 'https://www.instagram.com/reel/XXXXXXXXX/'
```

Para Vimeo e Instagram, informe também uma imagem em `poster`. Arquivos próprios carregam mais rápido e com melhor qualidade que vídeos incorporados.

## WhatsApp e formulário

Preencha `site.contact.whatsapp` só com números, com DDI e DDD: `'5511999998888'`. Todos os botões de WhatsApp, o botão flutuante e o formulário passam a usar esse número.

O formulário de orçamento monta uma mensagem com os dados preenchidos e abre o WhatsApp pronto para enviar. Se quiser receber os pedidos também por e-mail, crie um formulário gratuito no Formspree (ou serviço parecido) e coloque o endereço em `site.form.endpoint`.

## SEO e compartilhamento

Em `index.html`, troque "Seu nome" e `https://seudominio.com.br/` pelos dados reais. A imagem que aparece ao compartilhar o link fica em `public/og-image.jpg` (1200×630). Os dados estruturados para o Google são gerados a partir de `site.ts` assim que o nome deixa de estar entre colchetes.

## Trocar o azul pelo dourado

No `@theme` de `src/index.css`:

```css
--color-accent: #c9a45c;
--color-accent-ink: #dcc08a;
--color-accent-strong: #b8913f;
```

Com o dourado, troque `text-white` por `text-black` na variante `primary` de `src/components/ui/button.ts`, para manter o contraste do texto dos botões.

## Desempenho e acessibilidade

- O showreel não carrega para quem ativou economia de dados ou redução de movimento, pausa quando sai da tela e tem botão de pausa.
- Imagens e vídeos fora da abertura usam carregamento sob demanda (`loading="lazy"` e `preload="none"`).
- Janelas de projeto e de Reels fecham com Esc, mantêm o foco do teclado e navegam com as setas.
- As animações respeitam a preferência "reduzir movimento" do sistema.
