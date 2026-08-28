'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import {
  AlertTriangle,
  ArrowRight,
  Building,
  CheckCircle2,
  Cpu,
  DollarSign,
  FileWarning,
  Lock,
  Mail,
  Menu,
  MessageCircle,
  PackageSearch,
  Phone,
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
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Indicadores', href: '#indicadores' },
  { label: 'Contato', href: '#contato' },
];

const painQuestions = [
  'Sabe se cada projeto de evento realmente deu lucro?',
  'Sabe onde sua equipe perde tempo todos os dias?',
  'Sabe quais decisões precisam ser tomadas hoje?',
  'Sabe qual documento da promotora está atrasado?',
  'Sabe se o valor do contrato bate com o orçamento aprovado?',
  'Sabe quanto cada projetista tem de carga em aberto?',
];

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

type FormData = {
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
};

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    empresa: '',
    email: '',
    telefone: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Progressive enhancement for the hero fade-in: content starts fully
  // visible (see .reveal in globals.css) and only animates once JS has
  // hydrated. The safety timeout guarantees the elements stay visible
  // even if the animation class fails to apply for any reason.
  useEffect(() => {
    const root = document.getElementById('home');
    root?.classList.add('js-ready');
    const safety = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('reveal-visible'));
    }, 1200);
    return () => clearTimeout(safety);
  }, []);

  const handleOpenDemo = () => {
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
            product: 'VLYNE Event Intelligence',
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
            <a
              href="https://eventos.vlyne.com.br/"
              className="text-xs font-bold text-cyan-300 hover:text-white px-4 py-2.5 bg-[#01143F]/80 hover:bg-[#01143F]/90 border border-cyan-500/20 hover:border-cyan-400 rounded-lg transition uppercase tracking-wider flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              Área do Cliente
            </a>
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
              <a
                href="https://eventos.vlyne.com.br/"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 border border-white/10 hover:border-cyan-500/30 rounded-lg text-gray-300 text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" /> Área do Cliente
              </a>
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
              <div
                className="reveal reveal-delay-0 inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-cyan-400/20 bg-cyan-500/10 text-cyan-200 mb-5 sm:mb-6"
              >
                <AlertTriangle className="w-4 h-4" />
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.18em] sm:tracking-[0.22em]">Gestão orientada por margem real</span>
              </div>

              <h1
                className="reveal reveal-delay-1 text-[2.35rem] sm:text-5xl lg:text-7xl font-black tracking-normal leading-[1.03]"
              >
                Faturamento alto{' '}
                <span className="bg-gradient-to-r from-cyan-300 via-white to-indigo-200 bg-clip-text text-transparent">
                  não garante margem.
                </span>
              </h1>

              <p
                className="reveal reveal-delay-2 mt-5 sm:mt-6 text-sm sm:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-7 sm:leading-8"
              >
                O VLYNE Event Intelligence acompanha cada projeto do prospect ao pagamento — contratos, equipes, remessas, custo real e rentabilidade, pra você decidir com dado, não com planilha solta.
              </p>

              <div
                className="reveal reveal-delay-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mt-7 sm:mt-8"
              >
                <button
                  onClick={() => handleOpenDemo()}
                  className="w-full sm:w-auto bg-[#00D4FF] hover:bg-cyan-300 text-[#01143F] px-8 py-4 rounded-lg text-xs font-black uppercase tracking-wider shadow-lg shadow-cyan-400/20 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  Quero ver a margem real dos meus projetos
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
              </div>
            </div>

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
                {['Planilhas soltas', 'Contrato redigitado do zero', 'Documento de promotora sem controle', 'Comissão calculada na mão', 'Cronograma no feeling', 'Decisões atrasadas'].map((item) => (
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
                {['Indicadores em tempo real', 'Contrato com valor herdado da proposta', 'Checklist de documentos automático', 'Comissão vinculada à parcela paga', 'Cronograma com cálculo de prazo', 'Decisão baseada em dado'].map((item) => (
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
              Descubra a margem real dos seus projetos.
            </h2>
            <p className="mt-5 text-base text-gray-300 leading-8 max-w-3xl mx-auto">
              Agende uma demonstração e veja como o VLYNE Event Intelligence transforma dados operacionais em controle, economia e decisões mais rápidas.
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
                <a href="https://eventos.vlyne.com.br/" className="text-xs text-gray-400 hover:text-cyan-400 transition">
                  Área do Cliente
                </a>
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
          <div className="flex items-center gap-4">
            <Link href="/politica-de-privacidade" className="text-[10px] text-gray-500 hover:text-cyan-400 font-mono transition">
              Política de Privacidade
            </Link>
            <span className="text-[9px] text-gray-600 font-mono">São Paulo, SP, Brasil</span>
          </div>
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

