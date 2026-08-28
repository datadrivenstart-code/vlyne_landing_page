# Landing page focada em VLYNE Event Intelligence — Plano de Implementação

> **Para agentes:** SUB-SKILL OBRIGATÓRIA: use superpowers:subagent-driven-development
> (recomendado) ou superpowers:executing-plans pra executar este plano tarefa por
> tarefa. Passos usam checkbox (`- [ ]`) pra rastreamento.

**Objetivo:** Reescrever o conteúdo comercial de `vlyne.com.br` pra falar só de
VLYNE Event Intelligence (mantendo a marca VLYNE), substituir os cards de ícone
abstrato por screenshots reais do produto, e simplificar o modal de login e o
formulário de diagnóstico pra produto único.

**Arquitetura:** Site Next.js (App Router) de página única (`src/app/page.tsx`),
sem backend próprio além de um insert de lead no Supabase. A mudança é
essencialmente de conteúdo + um novo diretório de assets (`public/screenshots/`)
— nenhuma rota nova, nenhum novo componente de infraestrutura.

**Tech Stack:** Next.js 16 (Turbopack), React 19, Tailwind CSS 4, `motion`,
`lucide-react`, `@supabase/supabase-js`.

**Spec:** `docs/superpowers/specs/2026-08-28-landing-page-vlyne-eventos.md`

## Global Constraints

- Marca **VLYNE continua** (logo, copyright, tagline do rodapé) — só o conteúdo
  comercial (hero, dores, seções, formulário) fala exclusivamente de Event
  Intelligence. Nada neste plano renomeia a marca.
- **Nenhuma afirmação que não corresponda a funcionalidade validada e
  confirmada em funcionamento real** — toda cópia nova já foi auditada contra
  isso na spec (seção "Correção pós-revisão"); qualquer cópia adicional que um
  implementador precise inventar deve seguir o mesmo padrão (achou dúvida →
  não inventa, marca como pendência).
- **Dados de screenshot são 100% fictícios** — empresa "Prisma Eventos", projeto
  "Feira Design Week 2027". Nunca usar nome, CNPJ, valor ou qualquer dado real
  do Grupo de Eventos/BF THREE (é página pública).
- Este repo **não tem suíte de testes automatizados** (sem vitest/jest no
  `package.json`) — "verificação" aqui significa `npm run build` limpo, `npm
  run lint` limpo, e checagem visual real (dev server + screenshot via
  Playwright), não TDD tradicional. Não inventar teste automatizado que não
  existe na convenção do repo.
- **Números de linha citados nas Tarefas 3, 4, 5 e 6 são baseados no
  `page.tsx` original (antes de qualquer edição deste plano) — ficam
  desatualizados assim que a Tarefa 3 começa a editar o arquivo.** A partir
  da Tarefa 4 em diante, localizar o trecho certo pelo conteúdo descrito
  (nome de função, texto do JSX, nome de variável) e não confiar no número de
  linha citado como exato — ele é só uma pista de onde procurar no arquivo
  original, não uma coordenada garantida no arquivo já editado.
- Deploy continua **manual** (mesmo padrão documentado no resto do ecossistema
  Vlyne: `vercel --prod` depois de qualquer push que deva ir ao ar) — este
  plano não inclui o passo de deploy; fica pra confirmação explícita do
  usuário no final, fora do escopo de "implementação".
- Tenant de demonstração é seedado **direto no Supabase de produção do Event
  Intelligence** (não existe ambiente de staging neste ecossistema — mesmo
  padrão já usado nesta sessão pra todo dado de teste) e **apagado ao final da
  Tarefa 2**, depois que os 5 arquivos de screenshot estiverem confirmados em
  disco.

---

### Tarefa 1: Popular tenant de demonstração fictício

**Arquivos:**
- Nenhum arquivo deste repo — script one-off roda contra o Supabase do repo
  `vlyne_event_intelligence` (`c:\Users\Thinkpad\Claude_code_IDE\.env.local`,
  variável `SUPABASE_SERVICE_ROLE_KEY`), escrito num diretório scratch,
  apagado ao final da tarefa (mesmo padrão de todo script one-off usado nesta
  sessão).

**Interfaces:**
- Produz: um login real (e-mail/senha) com acesso de admin ao tenant "Prisma
  Eventos", usado pela Tarefa 2 pra navegar e capturar as telas.

- [ ] **Passo 1: Escrever o script de seed**

Criar `seed_demo_landing.mjs` num diretório scratch, usando
`@supabase/supabase-js` (já é dependência do repo `vlyne_event_intelligence`,
rodar de dentro dele pra ter `node_modules`):

```js
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config({ path: 'c:/Users/Thinkpad/Claude_code_IDE/.env.local' });

const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const admin = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

const EMPRESA_ID = 'demo0001-1111-4111-8111-111111111111';
const PROJETO_ID = 'demo0002-2222-4222-8222-222222222222';
const email = 'demo.landing@vlyne.com.br';
const senha = crypto.randomUUID();

console.log('1) Empresa fictícia...');
await admin.from('empresas').upsert({
  id: EMPRESA_ID,
  nome_fantasia: 'Prisma Eventos',
  cnpj: null,
  status: 'ATIVA',
  produtos: ['VLYNE_EVENT'],
});

console.log('2) Conta de Auth + usuário admin...');
const { data: authUser, error: authErr } = await admin.auth.admin.createUser({
  email, password: senha, email_confirm: true,
});
if (authErr) throw authErr;
await admin.from('usuarios').upsert({
  id: authUser.user.id, empresa_id: EMPRESA_ID, nome: 'Demo Landing',
  email, role: 'admin', status: 'ativo', ativo: true,
});

console.log('3) Projeto fictício...');
await admin.from('event_projetos').upsert({
  id: PROJETO_ID, empresa_id: EMPRESA_ID, marca: 'Prisma Eventos',
  nome: 'Feira Design Week 2027', local: 'Expo Center Norte, Pavilhão Branco',
  data_inicio: '2027-04-12', data_fim: '2027-04-15',
  status: 'Ativo', configuracao_estande: 'Ilha', largura_m: 14, profundidade_m: 10,
  area_m2: 140, patrocinador: 'Grupo Horizonte Design',
});

console.log('4) Propostas (funil do CRM povoado)...');
const propostas = [
  { id: 'demo-prop-1', estagio: 'Proposta Aceita', cliente: 'Grupo Horizonte Design', valor: 186000, servico: 'Estande 140m² configuração ilha', projeto_id: PROJETO_ID },
  { id: 'demo-prop-2', estagio: 'Em Negociação', cliente: 'Nimbus Cosméticos', valor: 92000, servico: 'Estande 60m² ponta de ilha' },
  { id: 'demo-prop-3', estagio: 'Proposta Enviada', cliente: 'Vetta Alimentos', valor: 54000, servico: 'Estande 35m² box' },
  { id: 'demo-prop-4', estagio: 'Novo', cliente: 'Cedro Engenharia', valor: 40000, servico: 'Estande 30m² esquina' },
  { id: 'demo-prop-5', estagio: 'Perdidos', cliente: 'Alto Mar Turismo', valor: 65000, servico: 'Estande 40m² box', motivo_perda: 'Preço' },
];
for (const p of propostas) {
  await admin.from('event_proposals').upsert({
    id: p.id, empresa_id: EMPRESA_ID, marca: 'Prisma Eventos',
    nome_empresa_cliente: p.cliente, descricao_servico: p.servico,
    estagio: p.estagio, valor: p.valor, projeto_id: p.projeto_id || null,
    motivo_perda: p.motivo_perda || null,
  });
}

console.log('5) Orçamento aprovado pelo CEO...');
await admin.from('orcamentos').upsert({
  id: 'demo0003-3333-4333-8333-333333333333', empresa_id: EMPRESA_ID,
  projeto_id: PROJETO_ID, markup_percentual: 28,
  aprovado_ceo: true, aprovado_em: new Date().toISOString(), aprovado_por: 'Demo Landing',
});

console.log('6) Contrato gerado (valor herdado da proposta)...');
await admin.from('event_contrato_gerado').upsert({
  id: 'demo-contrato-1', empresa_id: EMPRESA_ID, projeto_id: PROJETO_ID,
  status: 'Assinado', valor_total: 186000, evento_feira: 'Feira Design Week 2027',
});

console.log('7) Cronograma dinâmico calculado...');
await admin.from('event_cronograma_dinamico').upsert({
  id: 'demo-cronograma-1', empresa_id: EMPRESA_ID, projeto_id: PROJETO_ID,
  nome_projeto: 'Feira Design Week 2027', arquiteta_responsavel: 'Renata Alves',
  data_start: '2027-02-08', data_montagem: '2027-04-10',
  cenario: 'COMPRESSAO NORMAL',
});

console.log('8) Lançamentos financeiros (Financeiro/Lucratividade povoados)...');
const financas = [
  { id: 'demo-fin-1', tipo: 'Entrada', categoria: 'Stands', valor: 93000, descricao: 'Sinal — Feira Design Week 2027' },
  { id: 'demo-fin-2', tipo: 'Entrada', categoria: 'Stands', valor: 93000, descricao: 'Saldo — Feira Design Week 2027' },
  { id: 'demo-fin-3', tipo: 'Saida', categoria: 'Mobiliário', valor: 38000, descricao: 'Locação de mobiliário' },
  { id: 'demo-fin-4', tipo: 'Saida', categoria: 'Cenografia', valor: 24000, descricao: 'Estrutura e marcenaria' },
  { id: 'demo-fin-5', tipo: 'Saida', categoria: 'Equipe', valor: 12000, descricao: 'Equipe de montagem' },
];
for (const f of financas) {
  await admin.from('event_finances').upsert({
    id: f.id, empresa_id: EMPRESA_ID, projeto_id: PROJETO_ID, marca: 'Prisma Eventos',
    tipo: f.tipo, categoria: f.categoria, valor: f.valor, descricao_comercial: f.descricao,
    data_efetiva: '2027-02-20',
  });
}

console.log('\nLogin de demonstração:');
console.log('  e-mail:', email);
console.log('  senha :', senha);
console.log('Guarde a senha impressa acima — não fica salva em lugar nenhum.');
```

- [ ] **Passo 2: Rodar o script**

```bash
cd c:/Users/Thinkpad/Claude_code_IDE
node caminho/pro/seed_demo_landing.mjs
```

- [ ] **Passo 3: Confirmar via query direta** que `empresas`, `usuarios`,
  `event_projetos`, `event_proposals` (5 linhas), `orcamentos`,
  `event_contrato_gerado`, `event_cronograma_dinamico` e `event_finances` (5
  linhas) têm as linhas fictícias — mesma disciplina de "não confiar sem
  checar" usada o resto desta sessão.

- [ ] **Passo 4: Apagar o script de seed** do diretório scratch (não deixar
  rastro com a senha gerada).

---

### Tarefa 2: Capturar as 5 screenshots via Playwright

**Arquivos:**
- Create: `public/screenshots/dashboard.png`, `public/screenshots/crm.png`,
  `public/screenshots/contrato.png`, `public/screenshots/cronograma.png`,
  `public/screenshots/financeiro.png` (repo `vlyne_landing_page`).
  **O nome do arquivo `cronograma.png` é fixo independente de qual tela for
  escolhida no Passo 3** (Cronograma Dinâmico ou Portal do Cliente) — só o
  CONTEÚDO capturado varia, nunca o nome do arquivo, porque a Tarefa 3 já
  referencia esse caminho fixo em `howItWorks`.

**Interfaces:**
- Consome: login de demonstração da Tarefa 1.
- Produz: 5 arquivos PNG em `public/screenshots/`, usados pela Tarefa 3 via
  `next/image`.

- [ ] **Passo 1: Script de captura**

Usar Playwright (já usado nesta sessão em
`c:/Users/Thinkpad/AppData/Local/Temp/claude/.../scratchpad/playwright-test/`,
reaproveitar o `node_modules` de lá). Login real pela tela (mesmo padrão já
usado nesta sessão pra testar login de verdade), depois navegar por cada
módulo e capturar em 1440×900:

```js
import { chromium } from 'playwright';

const EMAIL = 'demo.landing@vlyne.com.br';
const SENHA = '<colar a senha impressa pela Tarefa 1>';
const OUT = 'c:/Users/Thinkpad/projetos/vlyne_landing_page/public/screenshots';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('https://event.vlyne.com.br');
await page.fill('input[type="email"]', EMAIL);
await page.fill('input[type="password"]', SENHA);
await page.click('button[type="submit"]');
await page.waitForTimeout(3000); // bootstrap + primeiro carregamento

// Dashboard (já deve abrir aqui por padrão)
await page.screenshot({ path: `${OUT}/dashboard.png` });

// CRM e Propostas
await page.click('text=CRM e Propostas');
await page.waitForTimeout(1000);
await page.screenshot({ path: `${OUT}/crm.png` });

// Gerador de Contrato
await page.click('text=Gerador de Contrato');
await page.waitForTimeout(1000);
// selecionar o projeto "Feira Design Week 2027" no seletor da tela antes de capturar,
// pra o valor travado/herdado aparecer visível
await page.screenshot({ path: `${OUT}/contrato.png` });

// Cronograma Dinâmico (ou Portal do Cliente, ver Passo 3)
await page.click('text=Cronograma Dinâmico');
await page.waitForTimeout(1000);
await page.screenshot({ path: `${OUT}/cronograma.png` });

// Financeiro
await page.click('text=Financeiro');
await page.waitForTimeout(1000);
await page.screenshot({ path: `${OUT}/financeiro.png` });

await browser.close();
console.log('done');
```

- [ ] **Passo 2: Rodar e conferir visualmente** cada PNG gerado (Read tool) —
  confirmar que nenhuma tela está com erro, estado vazio, ou modal aberto
  atrapalhando o print. Recapturar o que precisar.

- [ ] **Passo 3: Decidir Cronograma Dinâmico vs. Portal do Cliente** — abrir as
  duas telas populadas e escolher visualmente qual fica melhor como screenshot
  do bloco "Pré-Produção" (decisão adiada de propósito na spec). Descartar o
  PNG da opção não escolhida.

- [ ] **Passo 4: Otimizar os PNGs** (compressão sem perda visível — `npx
  @squoosh/cli` ou equivalente já disponível, ou aceitar o tamanho bruto do
  Playwright se for razoável, checar com `ls -la`).

- [ ] **Passo 5: Apagar o tenant de demonstração** — só depois de confirmar os
  5 arquivos em disco:

```js
// mesmo script/sessão da Tarefa 1, ou novo one-off:
await admin.from('event_finances').delete().eq('empresa_id', EMPRESA_ID);
await admin.from('event_cronograma_dinamico').delete().eq('empresa_id', EMPRESA_ID);
await admin.from('event_contrato_gerado').delete().eq('empresa_id', EMPRESA_ID);
await admin.from('orcamentos').delete().eq('empresa_id', EMPRESA_ID);
await admin.from('event_proposals').delete().eq('empresa_id', EMPRESA_ID);
await admin.from('event_projetos').delete().eq('empresa_id', EMPRESA_ID);
await admin.from('usuarios').delete().eq('empresa_id', EMPRESA_ID);
// Não depende de variável carregada da Tarefa 1 (script separado) — busca o
// usuário de demonstração pelo e-mail, mesmo padrão já usado nesta sessão:
const { data: listUsers } = await admin.auth.admin.listUsers();
const demoAuthUser = listUsers.users.find((u) => u.email === email);
if (demoAuthUser) await admin.auth.admin.deleteUser(demoAuthUser.id);
await admin.from('empresas').delete().eq('id', EMPRESA_ID);
```

- [ ] **Passo 6: Commit dos 5 PNGs**

```bash
cd c:/Users/Thinkpad/projetos/vlyne_landing_page
git add public/screenshots/
git commit -m "assets: adiciona screenshots reais do produto (dados ficticios) pra landing page"
```

---

### Tarefa 3: Reescrever hero, dores, "Como funciona" e riscos em `page.tsx`

**Arquivos:**
- Modify: `src/app/page.tsx:43-134` (arrays `painQuestions`, `segments`,
  `risks`), `src/app/page.tsx:352-539` (JSX das seções hero, `#dores`,
  `#solucoes`, riscos).

**Interfaces:**
- Consome: arquivos de `public/screenshots/` da Tarefa 2.
- Produz: nenhuma interface nova consumida por outra tarefa (mudança de
  conteúdo isolada).

- [ ] **Passo 1: Trocar o array `painQuestions` (linhas 43-50)**

```ts
const painQuestions = [
  'Sabe se cada projeto de evento realmente deu lucro?',
  'Sabe onde sua equipe perde tempo todos os dias?',
  'Sabe quais decisões precisam ser tomadas hoje?',
  'Sabe qual documento da promotora está atrasado?',
  'Sabe se o valor do contrato bate com o orçamento aprovado?',
  'Sabe quanto cada projetista tem de carga em aberto?',
];
```

- [ ] **Passo 2: Substituir o array `segments` (linhas 52-80) por `howItWorks`**
  (4 blocos por etapa do funil, cada um com caminho de imagem):

```ts
const howItWorks = [
  {
    tag: 'Comercial',
    title: 'Cada proposta, do primeiro contato ao fechamento.',
    description: 'Funil visual por estágio, motivo de perda categorizado, projeto criado automaticamente ao aceitar.',
    bullets: ['Funil por estágio', 'Motivo de perda categorizado', 'Projeto criado automaticamente'],
    image: '/screenshots/crm.png',
  },
  {
    tag: 'Contrato & Fechamento',
    title: 'Contrato gerado com um clique, valor puxado da proposta.',
    description: 'Cláusulas por marca, valor herdado e travado, aviso se diverge do orçamento aprovado.',
    bullets: ['Cláusulas por marca', 'Valor herdado e travado', 'Aviso de divergência com orçamento'],
    image: '/screenshots/contrato.png',
  },
  {
    tag: 'Pré-Produção',
    title: 'Cronograma, documentos da promotora e cliente acompanhando tudo.',
    description: 'Cálculo automático de prazo, checklist de documentos gerado pela promotora, portal do cliente com progresso atualizado.',
    bullets: ['Cálculo de compressão de prazo', 'Checklist automático por promotora', 'Portal do cliente com progresso atualizado'],
    image: '/screenshots/cronograma.png',
  },
  {
    tag: 'Financeiro',
    title: 'Margem real por projeto, não estimativa.',
    description: 'Orçamento por metragem com aprovação do CEO, comissão vinculada à parcela paga, lucratividade real por evento.',
    bullets: ['Orçamento por m² com aprovação', 'Comissão por parcela paga', 'Lucratividade por evento'],
    image: '/screenshots/financeiro.png',
  },
];
```

- [ ] **Passo 3: Trocar o array `risks` (linhas 82-103)**

```ts
const risks = [
  {
    icon: DollarSign,
    title: 'Projeto sem controle de custo',
    text: 'Sem custo real por projeto, a margem desaparece antes da gestão perceber.',
  },
  {
    icon: FileWarning,
    title: 'Documento de promotora atrasado',
    text: 'RRT, seguro ou memorial vencido pode barrar a montagem no pavilhão.',
  },
  {
    icon: PackageSearch,
    title: 'Carga e descarga sem conferência',
    text: 'Sem dupla confirmação, material extraviado só aparece quando já é tarde.',
  },
  {
    icon: TrendingDown,
    title: 'Aditivo sem aprovação formal',
    text: 'Serviço extra feito sem registro vira retrabalho que ninguém paga.',
  },
];
```

Remover só o array `solutions` (linhas 105-121) — o conteúdo que ele alimentava
(seção "Uma plataforma inteligente...") é removido por completo na Tarefa 5
Passo 3, substituído pelo novo bloco "Como funciona" desta mesma tarefa. **Não
tocar no array `indicators`** (linhas 123-134) aqui — seu conteúdo é reescrito
in-place na Tarefa 5 Passo 2, a declaração do array continua existindo o tempo
todo.

- [ ] **Passo 4: Reescrever o JSX do hero (linhas 352-441)**

Trocar eyebrow, H1, subheadline e CTA primário:

```tsx
<div className="reveal reveal-delay-0 inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-cyan-400/20 bg-cyan-500/10 text-cyan-200 mb-5 sm:mb-6">
  <AlertTriangle className="w-4 h-4" />
  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.18em] sm:tracking-[0.22em]">Gestão orientada por margem real</span>
</div>

<h1 className="reveal reveal-delay-1 text-[2.35rem] sm:text-5xl lg:text-7xl font-black tracking-normal leading-[1.03]">
  Faturamento alto{' '}
  <span className="bg-gradient-to-r from-cyan-300 via-white to-indigo-200 bg-clip-text text-transparent">
    não garante margem.
  </span>
</h1>

<p className="reveal reveal-delay-2 mt-5 sm:mt-6 text-sm sm:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-7 sm:leading-8">
  O VLYNE Event Intelligence acompanha cada projeto do prospect ao pagamento — contratos, equipes, remessas, custo real e rentabilidade, pra você decidir com dado, não com planilha solta.
</p>
```

CTA primário (dentro do mesmo bloco, linha ~380-386): trocar texto de "Quero
identificar meus gargalos" pra "Quero ver a margem real dos meus projetos".

Painel direito (linhas 399-439): substituir o card "Ecossistema VLYNE" (lista
de 3 produtos) por uma moldura de screenshot:

```tsx
<div className="hidden lg:block lg:col-span-5">
  <div className="reveal reveal-delay-4 bg-[#020d2b]/90 border border-cyan-400/15 rounded-lg overflow-hidden shadow-2xl shadow-cyan-950/40 backdrop-blur">
    <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10 bg-[#01143F]/60">
      <span className="w-2.5 h-2.5 rounded-full bg-rose-400/60" />
      <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
      <span className="ml-3 text-[10px] font-mono text-gray-400">event.vlyne.com.br/dashboard</span>
    </div>
    <Image src="/screenshots/dashboard.png" alt="Dashboard do VLYNE Event Intelligence" width={1440} height={900} className="w-full h-auto" />
  </div>
</div>
```

(Adicionar `import Image from 'next/image';` no topo do arquivo.)

- [ ] **Passo 5: Reescrever a seção `#dores` (linhas 443-463)** — só troca o
  array consumido (já feito no Passo 1), sem mudança estrutural de JSX.

- [ ] **Passo 6: Reescrever a seção `#solucoes` → `#como-funciona` (linhas
  465-516)** — trocar `id="solucoes"` por `id="como-funciona"`, título "Uma
  chamada forte pra cada tipo de cliente" por "Do prospect ao pagamento, numa
  linha só", e o grid de 3 `segments` por um grid de 4 `howItWorks` com
  imagem:

```tsx
<section id="como-funciona" className="py-16 md:py-24 px-5 sm:px-6">
  <div className="max-w-7xl mx-auto">
    <div className="max-w-3xl">
      <p className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300">Como funciona</p>
      <h2 className="mt-4 text-3xl sm:text-5xl font-black tracking-normal">
        Do prospect ao pagamento, numa linha só.
      </h2>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
      {howItWorks.map((step) => (
        <article key={step.tag} className="bg-[#020d2b] border border-white/10 rounded-lg overflow-hidden shadow-xl shadow-cyan-950/20">
          <Image src={step.image} alt={step.title} width={1440} height={900} className="w-full h-auto border-b border-white/10" />
          <div className="p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300">{step.tag}</p>
            <h3 className="text-xl font-black leading-7 mt-3">{step.title}</h3>
            <p className="text-sm text-gray-400 leading-6 mt-3">{step.description}</p>
            <div className="space-y-2 mt-4">
              {step.bullets.map((bullet) => (
                <div key={bullet} className="flex items-center gap-2 text-sm font-bold text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-cyan-300 shrink-0" />
                  {bullet}
                </div>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Passo 7: `npm run build`** e confirmar zero erro de tipo/lint antes de
  seguir pra próxima tarefa.

- [ ] **Passo 8: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: reescreve hero, dores e como-funciona com prints reais do produto"
```

---

### Tarefa 4: Simplificar Área do Cliente e formulário de diagnóstico

**Arquivos:**
- Modify: `src/app/page.tsx` (header, menu mobile, footer, `DemoModal`,
  `FormData`, remove `ClientAreaModal`/`ClientLink`).

**Interfaces:**
- Consome: nada de tarefas anteriores.
- Produz: `FormData` sem o campo `produto` (nenhuma outra tarefa depende disso).

- [ ] **Passo 1: Trocar o botão "Área do Cliente" do header (linhas 281-288)**
  de `<button onClick={() => setClientModalOpen(true)}>` pra:

```tsx
<a
  href="https://eventos.vlyne.com.br/"
  className="text-xs font-bold text-cyan-300 hover:text-white px-4 py-2.5 bg-[#01143F]/80 hover:bg-[#01143F]/90 border border-cyan-500/20 hover:border-cyan-400 rounded-lg transition uppercase tracking-wider flex items-center gap-1.5"
>
  <Lock className="w-3.5 h-3.5" />
  Área do Cliente
</a>
```

- [ ] **Passo 2: Mesma troca no menu mobile (linhas 327-336)** e no rodapé
  (linhas 663-667) — de `<button onClick={...setClientModalOpen(true)}>` pra
  `<a href="https://eventos.vlyne.com.br/">`.

- [ ] **Passo 3: Remover o state `clientModalOpen`** (linha 147) e a
  renderização `<ClientAreaModal .../>` (linha 707).

- [ ] **Passo 4: Remover as funções `ClientAreaModal` e `ClientLink` por
  completo** (linhas 843-900).

- [ ] **Passo 5: Simplificar `FormData`** (linhas 136-142) — remover o campo
  `produto`:

```ts
type FormData = {
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
};
```

- [ ] **Passo 6: Ajustar `formData` inicial** (linhas 149-155) removendo
  `produto: 'VLYNE Pulse Intelligence'`, e `handleOpenDemo` (linhas 179-186)
  removendo o parâmetro `product` (não é mais chamado com argumento em lugar
  nenhum, já que só existe 1 produto agora).

- [ ] **Passo 7: No `handleFormSubmit` (linha 208)**, trocar `product:
  formData.produto` por uma constante fixa:

```ts
product: 'VLYNE Event Intelligence',
```

- [ ] **Passo 8: Remover o bloco do `<select>` "Produto de Interesse"**
  (linhas 767-781) de dentro de `DemoModal`.

- [ ] **Passo 9: `npm run build`**, confirmar zero erro (principalmente checar
  que nenhum lugar ainda referencia `formData.produto` ou `setClientModalOpen`).

- [ ] **Passo 10: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: simplifica Area do Cliente (link direto) e formulario de diagnostico (remove selecao de produto)"
```

---

### Tarefa 5: Riscos restantes, antes/depois, prova de valor e CTA final

**Arquivos:**
- Modify: `src/app/page.tsx:518-638` (JSX das seções risco, antes/depois,
  indicadores, CTA final).

- [ ] **Passo 1: Reescrever os itens de "Antes/Depois" (linhas 589 e 601)**

```ts
// Antes (operação reativa)
['Planilhas soltas', 'Contrato redigitado do zero', 'Documento de promotora sem controle', 'Comissão calculada na mão', 'Cronograma no feeling', 'Decisões atrasadas']

// Depois com VLYNE
['Indicadores em tempo real', 'Contrato com valor herdado da proposta', 'Checklist de documentos automático', 'Comissão vinculada à parcela paga', 'Cronograma com cálculo de prazo', 'Decisão baseada em dado']
```

- [ ] **Passo 2: Reescrever o conteúdo do array `indicators` (linhas 123-134,
  a declaração do array continua existindo — só o conteúdo muda):**

```ts
const indicators = [
  'Margem por projeto',
  'Documentos pendentes',
  'Comissão por parcela',
  'Aditivos aprovados',
  'Carga por projetista',
  'Custo operacional',
  'Prazo de cronograma',
  'Estoque de almoxarifado',
  'Rentabilidade por evento',
  'Divergência de contrato',
];
```

- [ ] **Passo 3: Remover a segunda seção de soluções, duplicada** — o bloco
  com título "Uma plataforma inteligente para cada gargalo da sua operação"
  (h2), que mapeia o array `solutions` (já removido na Tarefa 3 — se essa
  seção ainda referenciar `solutions`, é sinal de que sobrou código morto).
  **Atenção:** essa seção não tem `id` no JSX original — não confundir com a
  seção que tinha `id="solucoes"` (essa já foi renomeada pra
  `id="como-funciona"` na Tarefa 3 e continua na página). Localizar pelo
  texto do título, não pelo id. O conteúdo equivalente já está coberto pela
  nova seção "Como funciona" da Tarefa 3, então esta seção inteira é deletada
  (não substituída) pra não repetir o mesmo funil duas vezes na página.

- [ ] **Passo 4: Reescrever o CTA final (linhas 612-638)**

```tsx
<h2 className="mt-4 text-3xl sm:text-5xl font-black tracking-normal">
  Descubra a margem real dos seus projetos.
</h2>
<p className="mt-5 text-base text-gray-300 leading-8 max-w-3xl mx-auto">
  Agende uma demonstração e veja como o VLYNE Event Intelligence transforma dados operacionais em controle, economia e decisões mais rápidas.
</p>
```

(CTAs "Quero meu diagnóstico" / "Falar pelo WhatsApp" continuam sem mudança de
texto.)

- [ ] **Passo 5: `npm run build`**, checar visualmente com `npm run dev` que
  não sobrou nenhuma seção órfã ou array não usado (lint deve acusar `risks`,
  `indicators` etc. se algum ficou declarado e sem uso).

- [ ] **Passo 6: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: reescreve riscos, antes/depois, indicadores e CTA final; remove secao de solucoes duplicada"
```

---

### Tarefa 6: Meta tags, cleanup e QA visual final

**Arquivos:**
- Modify: `src/app/layout.tsx` (meta tags), remove os 5 SVGs de boilerplate.
- Verify: build final, screenshot desktop+mobile via Playwright.

- [ ] **Passo 1: Ler `src/app/layout.tsx`** e conferir se `title`/`description`/
  OG mencionam Pulse/Etiquetas. Se sim, ajustar pra falar só de Event
  Intelligence mantendo a marca VLYNE (mesmo tom da meta description já
  auditada: "VLYNE Event Intelligence: gestão de eventos, stands e projetos do
  prospect ao pagamento — margem real por projeto, contratos, equipes e
  logística num só lugar.", que já está correta e não precisa mudar se for
  esse o texto encontrado).

- [ ] **Passo 2: Remover os 5 SVGs não referenciados**

```bash
cd c:/Users/Thinkpad/projetos/vlyne_landing_page
rm public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg
```

(Já confirmado por grep, na auditoria da spec, que nenhum tem referência em
`src/`.)

- [ ] **Passo 3: `npm run build && npm run lint`** limpos.

- [ ] **Passo 4: `npm run dev`**, screenshot via Playwright (1440×900 desktop
  full-page + 390×844 mobile full-page, mesmo padrão já usado nesta sessão pra
  QA visual de landing page), conferir:
  - Nenhum console error / imagem quebrada (mesma checagem já feita na
    auditoria original).
  - As 4 imagens de "Como funciona" carregam e têm proporção consistente.
  - Nenhuma menção residual a "Pulse" ou "Etiquetas" sobrou em texto visível
    (grep no HTML renderizado por segurança).
  - "Área do Cliente" (header, menu mobile, rodapé) aponta pra
    `eventos.vlyne.com.br` como link real (`<a href>`), não mais botão de
    modal.

- [ ] **Passo 5: Commit final** (só se o Passo 1 tiver mudado algo em
  `layout.tsx`; os SVGs removidos entram no mesmo commit)

```bash
git add -A
git commit -m "chore: ajusta meta tags e remove assets de boilerplate nao usados"
```

## Handoff

Depois da Tarefa 6, a página está pronta localmente — **nenhum passo deste
plano faz deploy**. Deploy (`vercel --prod`) fica pra confirmação explícita do
usuário, mesmo padrão de todo o ecossistema Vlyne.
