'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Building,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Cpu,
  DollarSign,
  FileWarning,
  Lock,
  Mail,
  Menu,
  MessageCircle,
  PackageSearch,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Smile,
  Target,
  TrendingDown,
  X,
} from 'lucide-react';
import TechBackground from '@/components/TechBackground';
import VlyneLogo from '@/components/VlyneLogo';
import { supabase, isSupabaseConfigured } from '@/services/supabase';

const WHATSAPP_URL =
  'https://wa.me/5511920480770?text=Ol%C3%A1!%20Quero%20solicitar%20um%20diagn%C3%B3stico%20operacional%20da%20VLYNE.';

const menuItems = [
  { label: 'Dores', href: '#dores' },
  { label: 'Soluções', href: '#solucoes' },
  { label: 'Indicadores', href: '#indicadores' },
  { label: 'Contato', href: '#contato' },
];

const painQuestions = [
  'Você sabe quanto dinheiro está parado no seu estoque?',
  'Sabe quais produtos estão sem giro nas lojas?',
  'Sabe se suas etiquetas seguem os padrões exigidos?',
  'Sabe se cada projeto de evento realmente deu lucro?',
  'Sabe onde sua equipe perde tempo todos os dias?',
  'Sabe quais decisões precisam ser tomadas hoje?',
];

const segments = [
  {
    icon: ShoppingBag,
    label: 'Varejo e estoque',
    product: 'VLYNE Pulse Intelligence',
    title: 'Produto parado e ruptura viram perda todos os dias.',
    description:
      'Controle produtos sem giro, excesso de estoque, rupturas, metas de venda e sugestões de compra com indicadores em tempo real.',
    bullets: ['Produtos sem giro', 'Ruptura por loja', 'Sugestão de compra', 'Metas de venda'],
  },
  {
    icon: CalendarDays,
    label: 'Eventos e projetos',
    product: 'VLYNE Event Intelligence',
    title: 'Faturamento alto não garante margem.',
    description:
      'Acompanhe custos, contratos, equipes, tarefas, suprimentos, faturamento e rentabilidade real de cada projeto.',
    bullets: ['Custo operacional', 'Margem por projeto', 'Controle de equipes', 'Contratos e faturamento'],
  },
  {
    icon: ClipboardCheck,
    label: 'Etiquetas e food safety',
    product: 'VLYNE Etiquetas Intelligence',
    title: 'Etiqueta incorreta pode custar caro.',
    description:
      'Controle impressão de etiquetas, validade, rastreabilidade, auditoria, precificação e integração com ERP.',
    bullets: ['Validades críticas', 'Auditoria de etiquetas', 'Rastreabilidade', 'Integração com ERP'],
  },
];

const risks = [
  {
    icon: FileWarning,
    title: 'Etiqueta incorreta',
    text: 'Pode gerar retrabalho, perda de produto, risco sanitário, autuação, multas e dano à confiança do consumidor.',
  },
  {
    icon: PackageSearch,
    title: 'Estoque parado',
    text: 'Capital preso em produtos que não giram, enquanto o caixa poderia estar comprando melhor.',
  },
  {
    icon: TrendingDown,
    title: 'Ruptura',
    text: 'Venda perdida, cliente insatisfeito e oportunidade entregue ao concorrente.',
  },
  {
    icon: DollarSign,
    title: 'Projeto sem controle',
    text: 'Sem custo real por projeto, a margem desaparece antes da gestão perceber.',
  },
];

const solutions = [
  {
    name: 'VLYNE Pulse Intelligence',
    tag: 'Varejo, vendas e estoque',
    text: 'Mostra produtos parados, rupturas, excesso, metas, compras sugeridas e indicadores executivos para agir antes da perda.',
  },
  {
    name: 'VLYNE Event Intelligence',
    tag: 'Eventos, stands e projetos',
    text: 'Centraliza CRM, contratos, suprimentos, equipes, financeiro, tarefas e rentabilidade por projeto.',
  },
  {
    name: 'VLYNE Etiquetas Intelligence',
    tag: 'Etiquetas, validade e auditoria',
    text: 'Controla etiquetas, validade, rastreabilidade, precificação, auditoria e integração com ERP.',
  },
];

const indicators = [
  'Produtos sem giro',
  'Excesso de estoque',
  'Ruptura por loja',
  'Margem por projeto',
  'Validades próximas',
  'Divergência de preço',
  'Metas de venda',
  'Sugestão de compra',
  'Custo operacional',
  'Rentabilidade',
];

type FormData = {
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  produto: string;
};

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    empresa: '',
    email: '',
    telefone: '',
    produto: 'VLYNE Pulse Intelligence',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenDemo = (product?: string) => {
    if (product) {
      setFormData((prev) => ({ ...prev, produto: product }));
    }
    setDemoModalOpen(true);
    setSuccess(false);
    setErrorText('');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorText('');

    if (!formData.nome || !formData.empresa || !formData.email || !formData.telefone) {
      setErrorText('Por favor, preencha todos os campos obrigatórios.');
      setSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorText('Por favor, insira um e-mail válido.');
      setSubmitting(false);
      return;
    }

    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from('vlyne_leads').insert([
          {
            name: formData.nome,
            email: formData.email,
            company: formData.empresa,
            phone: formData.telefone,
            product: formData.produto,
            timestamp: new Date().toISOString(),
            status: 'novo',
            source: 'Landing Page - Diagnostico Operacional',
          },
        ]);
        if (error) throw error;
      }

      const savedLeads = JSON.parse(localStorage.getItem('vlyne_local_leads') || '[]');
      savedLeads.push({
        ...formData,
        id: `lead_${Date.now()}`,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem('vlyne_local_leads', JSON.stringify(savedLeads));
      setSuccess(true);
      setFormData({
        nome: '',
        empresa: '',
        email: '',
        telefone: '',
        produto: formData.produto,
      });
    } catch (err) {
      console.error('Erro ao salvar lead:', err);
      setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="home" className="min-h-screen bg-[#01143F] text-white font-sans relative overflow-x-hidden scroll-smooth">
      <div className="fixed inset-0 z-0 overflow-hidden bg-[#01143F]">
        <TechBackground />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#01143F]/92 backdrop-blur-md py-3 border-b border-cyan-500/10 shadow-lg shadow-cyan-950/20'
            : 'bg-transparent py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 flex items-center justify-between">
          <button
            type="button"
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Voltar ao início"
          >
            <VlyneLogo showText={true} className="h-16 sm:h-24 lg:h-28 !justify-start" />
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-cyan-400 transition"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setClientModalOpen(true)}
              className="text-xs font-bold text-cyan-300 hover:text-white px-4 py-2.5 bg-[#01143F]/80 hover:bg-[#01143F]/90 border border-cyan-500/20 hover:border-cyan-400 rounded-lg transition cursor-pointer uppercase tracking-wider flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              Área do Cliente
            </button>
            <button
              onClick={() => handleOpenDemo()}
              className="bg-[#00D4FF] hover:bg-cyan-300 text-[#01143F] text-xs font-black uppercase tracking-wider px-5 py-3 rounded-lg shadow-lg shadow-cyan-500/20 transition cursor-pointer"
            >
              Diagnóstico
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[73px] bg-[#01143F]/95 backdrop-blur-xl border-b border-white/5 z-40 p-6 md:hidden flex flex-col gap-5 shadow-2xl"
          >
            <nav className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-bold uppercase tracking-wider text-gray-300 hover:text-cyan-400 transition"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="border-t border-white/5 pt-4 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setClientModalOpen(true);
                }}
                className="w-full py-3 border border-white/10 hover:border-cyan-500/30 rounded-lg text-gray-300 text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" /> Área do Cliente
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenDemo();
                }}
                className="w-full py-3 bg-[#00D4FF] rounded-lg text-[#01143F] text-xs font-black uppercase tracking-wider shadow-lg transition"
              >
                Solicitar Diagnóstico
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        <section className="min-h-screen flex items-center px-5 sm:px-6 pt-24 sm:pt-28 pb-12 sm:pb-16 bg-landing-grid">
          <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-cyan-400/20 bg-cyan-500/10 text-cyan-200 mb-5 sm:mb-6"
              >
                <AlertTriangle className="w-4 h-4" />
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.18em] sm:tracking-[0.22em]">Gestão orientada por perdas reais</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.05 }}
                className="text-[2.35rem] sm:text-5xl lg:text-7xl font-black tracking-normal leading-[1.03]"
              >
                O que você não vê na operação pode estar{' '}
                <span className="bg-gradient-to-r from-cyan-300 via-white to-indigo-200 bg-clip-text text-transparent">
                  custando caro.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12 }}
                className="mt-5 sm:mt-6 text-sm sm:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-7 sm:leading-8"
              >
                Estoque parado, ruptura, etiquetas incorretas, projetos sem margem e decisões baseadas em planilhas podem gerar prejuízo todos os dias. A VLYNE mostra onde agir antes que o problema vire perda.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mt-7 sm:mt-8"
              >
                <button
                  onClick={() => handleOpenDemo()}
                  className="w-full sm:w-auto bg-[#00D4FF] hover:bg-cyan-300 text-[#01143F] px-8 py-4 rounded-lg text-xs font-black uppercase tracking-wider shadow-lg shadow-cyan-400/20 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  Quero identificar meus gargalos
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-cyan-500/30 px-8 py-4 rounded-lg text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Falar no WhatsApp
                </a>
              </motion.div>
            </div>

            <div className="hidden lg:block lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.65, delay: 0.14 }}
                className="bg-[#020d2b]/90 border border-cyan-400/15 rounded-lg p-5 shadow-2xl shadow-cyan-950/40 backdrop-blur"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300">Painel VLYNE</p>
                    <h2 className="text-xl font-black mt-1">Mapa de riscos da operação</h2>
                  </div>
                  <ShieldCheck className="w-8 h-8 text-cyan-300" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    ['R$ 184 mil', 'Capital parado e perdas ocultas', 'text-amber-300'],
                    ['37 itens', 'Produtos sem giro ou ruptura', 'text-rose-300'],
                    ['12 projetos', 'Margem abaixo do planejado', 'text-amber-300'],
                    ['28 alertas', 'Etiquetas, validade e auditoria', 'text-rose-300'],
                  ].map(([value, label, color]) => (
                    <div key={label} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                      <p className={`text-2xl font-black ${color}`}>{value}</p>
                      <p className="text-[11px] text-gray-300 mt-2 leading-5">{label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-lg border border-cyan-300/15 bg-cyan-300/10 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <BarChart3 className="w-5 h-5 text-cyan-300" />
                    <p className="text-sm font-black">Prioridades da semana</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      'Identificar estoque parado, ruptura e excesso por loja',
                      'Auditar etiquetas, validade e rastreabilidade crítica',
                      'Revisar custo real e margem dos projetos em aberto',
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2 text-sm text-gray-200">
                        <CheckCircle2 className="w-4 h-4 text-cyan-300 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="dores" className="py-16 md:py-24 px-5 sm:px-6 border-y border-white/10 bg-[#010b24]/70">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300">Diagnóstico comercial</p>
              <h2 className="mt-4 text-3xl sm:text-5xl font-black tracking-normal">
                Sua empresa tem controle real ou apenas relatórios espalhados?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
              {painQuestions.map((question) => (
                <div key={question} className="rounded-lg border border-white/10 bg-[#020d2b] p-5">
                  <PackageSearch className="w-6 h-6 text-cyan-300 mb-4" />
                  <p className="text-lg font-black leading-7">{question}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-lg font-bold text-gray-200">
              Se a resposta não é clara, sua operação está decidindo no escuro.
            </p>
          </div>
        </section>

        <section id="solucoes" className="py-16 md:py-24 px-5 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="max-w-3xl">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300">Escolha a dor</p>
                <h2 className="mt-4 text-3xl sm:text-5xl font-black tracking-normal">
                  Uma chamada forte para cada tipo de cliente.
                </h2>
              </div>
              <button
                onClick={() => handleOpenDemo()}
                className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-cyan-300 hover:text-cyan-100 transition"
              >
                Agendar demonstração <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-10">
              {segments.map((segment) => {
                const Icon = segment.icon;
                return (
                  <motion.article
                    whileHover={{ y: -4 }}
                    key={segment.label}
                    className="bg-[#020d2b] border border-white/10 rounded-lg p-6 shadow-xl shadow-cyan-950/20"
                  >
                    <div className="w-11 h-11 rounded-lg bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-300 mb-5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300">{segment.label}</p>
                    <h3 className="text-2xl font-black leading-8 mt-3">{segment.title}</h3>
                    <p className="text-sm text-gray-400 leading-7 mt-4">{segment.description}</p>
                    <div className="space-y-2 mt-5">
                      {segment.bullets.map((bullet) => (
                        <div key={bullet} className="flex items-center gap-2 text-sm font-bold text-gray-200">
                          <CheckCircle2 className="w-4 h-4 text-cyan-300" />
                          {bullet}
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => handleOpenDemo(segment.product)}
                      className="mt-6 w-full rounded-lg border border-cyan-500/30 bg-cyan-500/10 py-3 text-xs font-black uppercase tracking-wider text-cyan-200 hover:bg-cyan-500/20 transition"
                    >
                      Ver solução
                    </button>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-5 sm:px-6 bg-[#f8fafc] text-slate-950">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#0047FF]">Risco e urgência</p>
              <h2 className="mt-4 text-3xl sm:text-5xl font-black tracking-normal">
                Pequenas falhas operacionais viram grandes prejuízos.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
              {risks.map((risk) => {
                const Icon = risk.icon;
                return (
                  <article key={risk.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <Icon className="w-7 h-7 text-[#0047FF] mb-5" />
                    <h3 className="text-xl font-black">{risk.title}</h3>
                    <p className="text-sm text-slate-600 leading-6 mt-3">{risk.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-5 sm:px-6 bg-[#01143F]">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300">Soluções VLYNE</p>
              <h2 className="mt-4 text-3xl sm:text-5xl font-black tracking-normal">
                Uma plataforma inteligente para cada gargalo da sua operação.
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-10">
              {solutions.map((solution) => (
                <article key={solution.name} className="rounded-lg border border-cyan-300/15 bg-white/[0.04] p-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300">{solution.tag}</p>
                  <h3 className="mt-4 text-2xl font-black">{solution.name}</h3>
                  <p className="mt-4 text-sm text-gray-400 leading-7">{solution.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="indicadores" className="py-16 md:py-24 px-5 sm:px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300">Prova de valor</p>
              <h2 className="mt-4 text-3xl sm:text-5xl font-black tracking-normal">
                O que a VLYNE ajuda sua empresa a enxergar.
              </h2>
              <p className="mt-5 text-base text-gray-300 leading-8">
                A gestão deixa de reagir tarde e passa a enxergar prioridades: o que comprar, o que reduzir, onde cobrar, qual projeto revisar e qual risco corrigir primeiro.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {indicators.map((indicator) => (
                <div key={indicator} className="rounded-lg border border-white/10 bg-[#020d2b] p-4">
                  <Target className="w-5 h-5 text-cyan-300 mb-3" />
                  <p className="text-sm font-black leading-5">{indicator}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-5 sm:px-6 bg-[#f8fafc] text-slate-950">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#0047FF]">Antes</p>
              <h2 className="mt-3 text-3xl font-black">Operação reativa</h2>
              <div className="space-y-3 mt-6">
                {['Planilhas soltas', 'Falta de visão por loja', 'Produtos parados sem alerta', 'Etiquetas manuais', 'Projetos sem margem clara', 'Decisões atrasadas'].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 text-sm font-bold text-slate-700">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#0047FF]">Depois com VLYNE</p>
              <h2 className="mt-3 text-3xl font-black">Gestão inteligente</h2>
              <div className="space-y-3 mt-6">
                {['Indicadores em tempo real', 'Alertas automáticos', 'Controle por loja, projeto ou setor', 'Auditoria e rastreabilidade', 'Visão de lucro e perda', 'Decisão baseada em dados'].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-lg border border-cyan-200 bg-cyan-50 p-3 text-sm font-bold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#0047FF]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-5 sm:px-6 bg-[#01143F] text-center">
          <div className="max-w-5xl mx-auto">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300">Próximo passo</p>
            <h2 className="mt-4 text-3xl sm:text-5xl font-black tracking-normal">
              Descubra onde sua operação está perdendo dinheiro.
            </h2>
            <p className="mt-5 text-base text-gray-300 leading-8 max-w-3xl mx-auto">
              Agende uma demonstração e veja como a VLYNE transforma dados operacionais em controle, economia e decisões mais rápidas.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <button
                onClick={() => handleOpenDemo()}
                className="w-full sm:w-auto bg-[#00D4FF] hover:bg-cyan-300 text-[#01143F] px-8 py-4 rounded-lg text-xs font-black uppercase tracking-wider shadow-lg shadow-cyan-400/20 transition cursor-pointer"
              >
                Quero meu diagnóstico
              </button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-cyan-500/30 px-8 py-4 rounded-lg text-xs font-black uppercase tracking-wider transition"
              >
                Falar pelo WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer id="contato" className="relative z-10 bg-[#000615] border-t border-white/[0.03] py-12 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5 space-y-4">
            <VlyneLogo showText={true} className="h-12 !justify-start" />
            <p className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase font-bold">
              Inteligência que impulsiona decisões.
            </p>
            <p className="text-[11px] text-gray-500 leading-relaxed max-w-sm">
              Plataformas dedicadas a controle operacional, redução de perdas e tomada de decisão com dados claros.
            </p>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[10px] font-mono uppercase tracking-wider text-gray-300 font-extrabold">Links rápidos</h4>
            <ul className="space-y-2.5">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-xs text-gray-400 hover:text-cyan-400 transition">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <button onClick={() => setClientModalOpen(true)} className="text-xs text-gray-400 hover:text-cyan-400 transition cursor-pointer text-left">
                  Área do Cliente
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[10px] font-mono uppercase tracking-wider text-gray-300 font-extrabold">Fale Conosco</h4>
            <div className="space-y-3">
              <a href="https://wa.me/5511920480770" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 text-xs text-gray-400 hover:text-cyan-400 transition">
                <Phone className="w-4 h-4 text-cyan-300 shrink-0" />
                <span>WhatsApp Comercial: +55 (11) 92048-0770</span>
              </a>
              <a href="mailto:contato@vlyne.com.br" className="flex items-center gap-2.5 text-xs text-gray-400 hover:text-cyan-400 transition">
                <Mail className="w-4 h-4 text-cyan-300 shrink-0" />
                <span>E-mail: contato@vlyne.com.br</span>
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-white/5 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-gray-600 font-mono">&copy; 2026 VLYNE. Todos os direitos reservados.</p>
          <span className="text-[9px] text-gray-600 font-mono">São Paulo, SP, Brasil</span>
        </div>
      </footer>

      <DemoModal
        open={demoModalOpen}
        success={success}
        submitting={submitting}
        errorText={errorText}
        formData={formData}
        setFormData={setFormData}
        onClose={() => setDemoModalOpen(false)}
        onSubmit={handleFormSubmit}
      />
      <ClientAreaModal open={clientModalOpen} onClose={() => setClientModalOpen(false)} />
    </div>
  );
}

function DemoModal({
  open,
  success,
  submitting,
  errorText,
  formData,
  setFormData,
  onClose,
  onSubmit,
}: {
  open: boolean;
  success: boolean;
  submitting: boolean;
  errorText: string;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onClose: () => void;
  onSubmit: (event: React.FormEvent) => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.65 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-lg bg-[#020c24] border border-cyan-500/20 rounded-lg p-6 sm:p-8 shadow-2xl overflow-hidden backdrop-blur-xl z-10"
          >
            <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition" aria-label="Fechar">
              <X className="w-5 h-5" />
            </button>

            {!success ? (
              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 rounded-lg">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="font-mono text-[9px] uppercase font-bold text-cyan-300">Diagnóstico operacional</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Quer descobrir onde sua operação perde dinheiro?</h3>
                  <p className="text-xs text-gray-400">
                    Preencha os dados e um especialista da VLYNE entrará em contato para entender seu cenário.
                  </p>
                </div>

                {errorText && <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-lg text-xs font-semibold">{errorText}</div>}

                <form onSubmit={onSubmit} className="space-y-4 text-left">
                  <FormField icon={Smile} label="Seu Nome" value={formData.nome} placeholder="Ex: Carlos Oliveira" onChange={(value) => setFormData({ ...formData, nome: value })} />
                  <FormField icon={Building} label="Nome da Empresa" value={formData.empresa} placeholder="Ex: Minha Empresa" onChange={(value) => setFormData({ ...formData, empresa: value })} />
                  <FormField icon={Mail} label="E-mail Comercial" type="email" value={formData.email} placeholder="Ex: carlos@empresa.com" onChange={(value) => setFormData({ ...formData, email: value })} />
                  <FormField icon={Phone} label="Telefone / WhatsApp" type="tel" value={formData.telefone} placeholder="Ex: (11) 99999-9999" onChange={(value) => setFormData({ ...formData, telefone: value })} />

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono uppercase text-gray-400 font-extrabold flex items-center gap-1">
                      <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Produto de Interesse
                    </label>
                    <select
                      value={formData.produto}
                      onChange={(e) => setFormData({ ...formData, produto: e.target.value })}
                      className="w-full bg-[#03061c] border border-white/10 rounded-lg py-3 px-4 text-xs text-white focus:outline-none focus:border-cyan-500 transition cursor-pointer"
                    >
                      <option value="VLYNE Pulse Intelligence">VLYNE Pulse Intelligence</option>
                      <option value="VLYNE Event Intelligence">VLYNE Event Intelligence</option>
                      <option value="VLYNE Etiquetas Intelligence">VLYNE Etiquetas Intelligence</option>
                      <option value="Múltiplos Sistemas">Múltiplos Sistemas</option>
                    </select>
                  </div>

                  <button type="submit" disabled={submitting} className="w-full bg-[#00D4FF] hover:bg-cyan-300 text-[#01143F] py-3.5 rounded-lg font-black text-xs tracking-wider uppercase transition disabled:opacity-55 cursor-pointer mt-4">
                    {submitting ? 'Enviando solicitação...' : 'Enviar solicitação'}
                  </button>
                </form>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center space-y-6 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Solicitação recebida!</h3>
                  <p className="text-xs text-gray-400 leading-relaxed max-w-sm mx-auto">
                    Nossa equipe entrará em contato para apresentar como a VLYNE pode ajudar sua operação.
                  </p>
                </div>
                <button onClick={onClose} className="bg-white/10 hover:bg-white/15 px-6 py-2.5 rounded-lg text-xs font-bold font-mono transition uppercase cursor-pointer">
                  Fechar
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function FormField({
  icon: Icon,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  icon: typeof Smile;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[9px] font-mono uppercase text-gray-400 font-extrabold flex items-center gap-1">
        <Icon className="w-3.5 h-3.5 text-cyan-400" /> {label}
      </label>
      <input
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#03061c] border border-white/10 rounded-lg py-3 px-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 transition"
      />
    </div>
  );
}

function ClientAreaModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-md bg-[#020c24]/95 border border-cyan-500/20 rounded-lg p-6 sm:p-8 shadow-2xl overflow-hidden backdrop-blur-xl z-10 text-center"
          >
            <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition" aria-label="Fechar">
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 rounded-lg">
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-mono text-[9px] uppercase font-bold text-cyan-300">Área do Cliente</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Qual plataforma deseja acessar?</h3>
                <p className="text-xs text-gray-400">
                  Selecione o produto correspondente ao seu contrato para ser direcionado à tela de login segura.
                </p>
              </div>

              <div className="flex flex-col gap-3.5 pt-2">
                <ClientLink href="https://pulse.vlyne.com.br/login" title="VLYNE Pulse Intelligence" description="SaaS para varejo e inteligência de estoque" tone="cyan" />
                <ClientLink href="https://eventos.vlyne.com.br/" title="VLYNE Event Intelligence" description="SaaS para cenografia e controle operacional de eventos" tone="indigo" />
                <ClientLink href="https://etiquetas.vlyne.com.br/" title="VLYNE Etiquetas Intelligence" description="SaaS de rotulagem e segurança alimentar" tone="emerald" />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function ClientLink({ href, title, description, tone }: { href: string; title: string; description: string; tone: 'cyan' | 'indigo' | 'emerald' }) {
  const hoverClasses = {
    cyan: 'hover:bg-cyan-500/10 hover:border-cyan-500/30 group-hover:text-cyan-300',
    indigo: 'hover:bg-indigo-500/10 hover:border-indigo-500/30 group-hover:text-indigo-300',
    emerald: 'hover:bg-emerald-500/10 hover:border-emerald-500/30 group-hover:text-emerald-300',
  };

  return (
    <a href={href} className={`w-full flex items-center justify-between p-4 bg-white/[0.03] border border-white/5 rounded-lg transition group text-left ${hoverClasses[tone]}`}>
      <div>
        <h4 className="text-xs sm:text-sm font-bold text-white transition-colors">{title}</h4>
        <p className="text-[10px] text-gray-500 mt-0.5">{description}</p>
      </div>
      <ArrowRight className="w-4 h-4 text-gray-500 transition-colors" />
    </a>
  );
}
