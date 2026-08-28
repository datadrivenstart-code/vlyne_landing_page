# Spec: Landing page focada em VLYNE Event Intelligence

**Data:** 2026-08-28
**Status:** aguardando revisão do usuário

## Contexto

`vlyne.com.br` (repo `vlyne_landing_page`, `src/app/page.tsx`, 900 linhas) hoje é uma
landing page guarda-chuva pros três produtos VLYNE (Pulse, Event, Etiquetas) —
segmenta o visitante por tipo de negócio (varejo, eventos, food safety) e mostra os
três lado a lado em quase toda seção (hero, dores, "soluções", modal de login,
formulário de diagnóstico).

Decisão do usuário: a marca **VLYNE continua** (logo, copyright, tom de voz), mas
**todo o conteúdo de vendas passa a falar só de VLYNE Event Intelligence** — Pulse e
Etiquetas somem do conteúdo, texto e formulário. Pulse/Etiquetas seguem existindo
como produtos reais (`pulse.vlyne.com.br`, `etiquetas.vlyne.com.br`) — só não são mais
vendidos por esta página.

Este documento nasceu de uma auditoria real da página em produção (screenshot
desktop+mobile, HTML/JS baixados e inspecionados, headers checados via curl) e do
manual de módulos do Event Intelligence produzido em 2026-08-27
(`docs/superpowers/plans/` do repo `vlyne_event_intelligence` — não versionado neste
repo, serviu de fonte pro conteúdo abaixo).

## Achados da auditoria que embasam este spec

- **Zero print real do produto.** Toda prova visual hoje é card de ícone (Lucide)
  + texto — nenhuma screenshot da aplicação de verdade em nenhuma seção.
- **Zero headers de segurança** (`curl -I` não retorna CSP, X-Frame-Options,
  X-Content-Type-Options, Referrer-Policy, Permissions-Policy) — mesma classe de
  gap já corrigida em `event.vlyne.com.br` em 2026-08-14, nunca replicada aqui.
  Registrado como tarefa opcional separada (seção "Fora de escopo" abaixo).
- Existe formulário de lead real (`DemoModal`, grava em `vlyne_leads` no Supabase +
  fallback `localStorage`) — não é um gap, só não aparece sem clicar em
  "Diagnóstico". Mantido, só simplificado (ver Seção 9).
- 5 SVGs de boilerplate do `create-next-app` (`file.svg`, `globe.svg`, `next.svg`,
  `vercel.svg`, `window.svg`) em `public/` sem nenhuma referência em `src/` —
  candidatos a remoção no cleanup final.

## Escopo

**Dentro do escopo:**
- Reescrita de todo o conteúdo textual de `page.tsx` pra falar só de Event
  Intelligence.
- Simplificação do modal "Área do Cliente" pra link direto (sem seletor de 3
  produtos).
- Simplificação do formulário de diagnóstico (remove campo "Produto de
  Interesse").
- Substituição dos cards de ícone abstrato por screenshots reais do produto em
  5 pontos da página (ver Seção "Plano de screenshots").
- Redução da repetição visual entre as 6 seções de grade hoje quase idênticas.

**Fora do escopo desta spec (podem virar specs/tarefas separadas depois):**
- Headers de segurança (CSP etc.) — mesmo padrão de `vercel.json` já usado em
  Event Intelligence, é trabalho de infra, não de conteúdo/design.
- Qualquer mudança em Pulse ou Etiquetas (produtos, landing pages próprias, etc.)
  — este spec não os remove do ar, só da vitrine desta página.
- Pricing, blog, ou qualquer página nova além da home + política de privacidade
  já existente.

## Estrutura da página (mantém as mesmas 9 seções, conteúdo reescrito)

### 1. Header

- Logo VLYNE (sem mudança).
- Nav: `Como Funciona` `Módulos` `Riscos` `Contato` (troca "Soluções" → "Módulos",
  já que não há mais 3 produtos pra "escolher a dor").
- **"Área do Cliente" deixa de abrir `ClientAreaModal` (com 3 links) e vira um
  `<a href="https://eventos.vlyne.com.br/">` direto** — `ClientAreaModal` e
  `ClientLink` (linhas 843-900 de `page.tsx`) são removidos do arquivo.
- "Diagnóstico" continua abrindo `DemoModal` (sem mudança de mecanismo).

### 2. Hero

| Campo | Hoje | Novo |
|---|---|---|
| Eyebrow | "Gestão orientada por perdas reais" | "Gestão orientada por margem real" |
| H1 | "O que você não vê na operação pode estar custando caro." | **"Faturamento alto não garante margem."** (frase já usada como título do segmento Eventos hoje — promovida a headline principal) |
| Subheadline | genérica, fala de "estoque parado, etiquetas incorretas..." | "O VLYNE Event Intelligence acompanha cada projeto do prospect ao pagamento — contratos, equipes, remessas, custo real e rentabilidade, pra você decidir com dado, não com planilha solta." |
| CTA primário | "Quero identificar meus gargalos" | "Quero ver a margem real dos meus projetos" |
| CTA secundário | "Falar no WhatsApp" | sem mudança |
| Painel direito | Lista "Ecossistema VLYNE" com os 3 produtos | **Screenshot real do Dashboard** (mostra os cards de margem/financeiro que a própria headline promete), dentro de uma moldura tipo browser (barra de título falsa com 3 bolinhas, como um preview de app) |

### 3. Diagnóstico comercial (seção `#dores`)

6 perguntas de dor, viram específicas de eventos (as 3 primeiras já existem e
batem, as 3 últimas são novas, tiradas de módulos reais do manual):

1. "Sabe se cada projeto de evento realmente deu lucro?" *(mantido)*
2. "Sabe onde sua equipe perde tempo todos os dias?" *(mantido)*
3. "Sabe quais decisões precisam ser tomadas hoje?" *(mantido)*
4. "Sabe qual documento da promotora está atrasado?" *(novo — módulo Documentação)*
5. "Sabe se o valor do contrato bate com o orçamento aprovado?" *(novo — Gerador de Contrato × Orçamento)*
6. "Sabe quanto cada projetista tem de carga em aberto?" *(novo — Carga de Projetistas)*

Fechamento da seção mantido: "Se a resposta não é clara, sua operação está
decidindo no escuro."

### 4. Como funciona (substitui a seção `#solucoes` de 3 segmentos)

Troca os 3 cards "por tipo de cliente" por **4 blocos por etapa do funil real**,
cada um com screenshot real (não ícone):

| Etapa | Título | Descrição | Bullets | Screenshot |
|---|---|---|---|---|
| Comercial | "Cada proposta, do primeiro contato ao fechamento." | Funil visual, motivo de perda categorizado, projeto criado automaticamente ao aceitar. | Funil por estágio · Motivo de perda categorizado · Projeto criado automaticamente | CRM (Kanban de Propostas) |
| Contrato & Fechamento | "Contrato gerado com um clique, valor puxado da proposta." | Cláusulas por marca, valor herdado e travado, aviso se diverge do orçamento aprovado. | Cláusulas por marca · Valor herdado e travado · Aviso de divergência com orçamento | Gerador de Contrato |
| Pré-Produção | "Cronograma, documentos da promotora e cliente acompanhando tudo." | Cálculo automático de prazo, checklist de documentos gerado pela promotora, portal do cliente com progresso real. | Cálculo de compressão de prazo · Checklist automático por promotora · Portal do cliente ao vivo | Cronograma Dinâmico ou Portal do Cliente |
| Financeiro | "Margem real por projeto, não estimativa." | Orçamento por metragem com aprovação do CEO, comissão vinculada à parcela paga, lucratividade real por evento. | Orçamento por m² com aprovação · Comissão por parcela paga · Lucratividade por evento | Financeiro / Lucratividade |

Botão da seção mantido: "Agendar demonstração".

### 5. Risco e urgência

4 cards, todos específicos de eventos:

1. **Projeto sem controle de custo** — "Sem custo real por projeto, a margem
   desaparece antes da gestão perceber." *(mantido)*
2. **Documento de promotora atrasado** — "RRT, seguro ou memorial vencido pode
   barrar a montagem no pavilhão." *(novo)*
3. **Carga e descarga sem conferência** — "Sem dupla confirmação, material
   extraviado só aparece quando já é tarde." *(novo)*
4. **Aditivo sem aprovação formal** — "Serviço extra feito sem registro vira
   retrabalho que ninguém paga." *(novo)*

### 6. Antes/Depois

| Antes (operação reativa) | Depois com VLYNE |
|---|---|
| Planilhas soltas | Indicadores em tempo real |
| Contrato redigitado do zero | Contrato com valor herdado da proposta |
| Documento de promotora sem controle | Checklist de documentos automático |
| Comissão calculada na mão | Comissão vinculada à parcela paga |
| Cronograma no feeling | Cronograma com cálculo de prazo |
| Decisões atrasadas | Decisão baseada em dado |

### 7. Prova de valor (`#indicadores`)

10 chips, todos métricas reais do produto: Margem por projeto · Documentos
pendentes · Comissão por parcela · Aditivos aprovados · Carga por projetista ·
Custo operacional · Prazo de cronograma · Estoque de almoxarifado ·
Rentabilidade por evento · Divergência de contrato.

### 8. CTA final

- H2: "Descubra a margem real dos seus projetos." (era "...sua operação está
  perdendo dinheiro" — mais alinhado à headline do hero)
- Corpo: "Agende uma demonstração e veja como o VLYNE Event Intelligence
  transforma dados operacionais em controle, economia e decisões mais rápidas."
- CTAs mantidos ("Quero meu diagnóstico" / "Falar pelo WhatsApp").

### 9. Formulário de diagnóstico (`DemoModal`)

- Remove o campo "Produto de Interesse" (`<select>`, linhas 767-781) — não faz
  sentido com produto único.
- `FormData` perde o campo `produto`; o insert em `vlyne_leads` grava
  `product: 'VLYNE Event Intelligence'` fixo (constante, não mais do estado).
- Resto do formulário (Nome, Empresa, E-mail, Telefone) sem mudança.

### Footer

Sem mudança estrutural — tagline "Inteligência que impulsiona decisões" e
contato continuam. Menu rápido perde a entrada "Área do Cliente" como botão de
modal e vira o mesmo link direto do header.

## Plano de screenshots (dados fictícios, decisão do usuário)

Usar dados **inventados de propósito**, nunca informação real do Grupo de
Eventos/BF THREE — é uma página pública. Empresa fictícia proposta pra popular o
tenant de demonstração: **"Prisma Eventos"**, projeto fictício **"Feira Design
Week 2027"** (nomes só pra referência — ajustáveis na hora de popular o tenant,
não são obrigatórios).

5 capturas necessárias, todas em resolução desktop (a mesma moldura de "print
dentro de card" é usada em todas, então a proporção deve ser consistente):

1. **Dashboard** — hero.
2. **CRM (Kanban de Propostas)** — bloco "Comercial".
3. **Gerador de Contrato** (com valor herdado/travado visível) — bloco "Contrato
   & Fechamento".
4. **Cronograma Dinâmico ou Portal do Cliente** — bloco "Pré-Produção" (decisão
   de qual das duas fica pro momento de implementação, depois de ver as duas
   telas populadas).
5. **Financeiro / Lucratividade** — bloco "Financeiro".

Dependência de implementação (não deste spec): popular um tenant de teste com
esses dados fictícios antes de capturar as telas — hoje o banco do Event
Intelligence está zerado (reset completo de 2026-08-27).

## Arquivos afetados (repo `vlyne_landing_page`)

- `src/app/page.tsx` — reescrita de conteúdo (arrays `painQuestions`, `segments`
  → renomeado/reestruturado, `risks`, `solutions` → removido ou reaproveitado
  pro bloco "Como funciona", `indicators`), remoção de `ClientAreaModal` e
  `ClientLink`, simplificação de `DemoModal`/`FormData`.
- `src/app/layout.tsx` — conferir se meta tags (title/description/OG) ainda
  mencionam os 3 produtos; se sim, ajustar pra falar só de Event Intelligence
  mantendo a marca VLYNE.
- `public/` — novos arquivos de screenshot (formato a decidir na implementação:
  PNG otimizado, provavelmente via `next/image`).
- Cleanup opcional: remover os 5 SVGs de boilerplate não referenciados.

## Auto-revisão (placeholder scan / consistência)

- Nenhum "TBD"/placeholder de conteúdo real ficou pendente — todo texto novo
  está escrito por extenso acima, pronto pra copiar pro código.
- Único ponto genuinamente em aberto: qual das duas telas (Cronograma Dinâmico
  vs. Portal do Cliente) ilustra o bloco "Pré-Produção" — decisão de baixo risco,
  adiada de propósito pro momento de implementação (depende de qual captura
  fica visualmente melhor).
- Escopo consistente com a resposta do usuário ("mantém marca VLYNE, só tira os
  outros produtos do conteúdo") — nada neste spec renomeia a marca, só o
  conteúdo comercial.
