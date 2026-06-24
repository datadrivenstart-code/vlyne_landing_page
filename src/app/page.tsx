'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Check, 
  Lock, 
  Mail, 
  Phone, 
  Shield, 
  Sparkles, 
  Menu, 
  X, 
  Zap, 
  Globe, 
  Sliders, 
  Cpu, 
  TrendingUp, 
  Server, 
  Smile, 
  CheckCircle2, 
  Building,
  Smartphone,
  LineChart,
  ShoppingBag,
  Award,
  Tag,
  Search,
  AlertTriangle,
  Clock,
  Calendar,
  Eye,
  ChevronRight
} from 'lucide-react';
import TechBackground from '@/components/TechBackground';
import VlyneLogo from '@/components/VlyneLogo';
import { db, isFirebaseConfigured } from '@/services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [clientModalOpen, setClientModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    nome: '',
    empresa: '',
    email: '',
    telefone: '',
    produto: 'VLYNE Pulse Intelligence'
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorText, setErrorText] = useState('');

  // Floating header tracking
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenDemo = (prodName?: string) => {
    if (prodName) {
      setFormData(prev => ({ ...prev, produto: prodName }));
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
      // 1. Try to persist to Firestore if configured
      if (isFirebaseConfigured && db) {
        await addDoc(collection(db, 'vlyne_leads'), {
          ...formData,
          createdAt: serverTimestamp(),
          source: 'Landing Page Institucional'
        });
      }

      // 2. Also save to localStorage as fallback/backup
      const savedLeads = JSON.parse(localStorage.getItem('vlyne_local_leads') || '[]');
      savedLeads.push({
        ...formData,
        id: 'lead_' + Date.now(),
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('vlyne_local_leads', JSON.stringify(savedLeads));

      setSuccess(true);
      // Reset form
      setFormData({
        nome: '',
        empresa: '',
        email: '',
        telefone: '',
        produto: formData.produto
      });
    } catch (err: any) {
      console.error('Erro ao salvar lead:', err);
      // Fallback: show success since we saved to localStorage backup
      setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'Soluções', href: '#solucoes' },
    { label: 'Diferenciais', href: '#diferenciais' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
    <div id="home" className="min-h-screen bg-[#01143F] text-white font-sans relative overflow-x-hidden select-none scroll-smooth">
      {/* Background neon electronic circuitry glow animation */}
      <div className="absolute inset-0 h-full w-full overflow-hidden bg-[#01143F] z-0">
        <TechBackground />
      </div>

      {/* Floating Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#01143F]/90 backdrop-blur-md py-4 border-b border-cyan-500/10 shadow-lg shadow-cyan-950/20' 
          : 'bg-transparent py-6 border-b border-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <VlyneLogo showText={true} className="w-36 sm:w-44 !justify-start" />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                className="text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-cyan-400 hover:shadow-cyan-400/10 transition duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setClientModalOpen(true)} 
              className="text-xs font-bold text-cyan-300 hover:text-white px-4 py-2.5 bg-[#01143F]/80 hover:bg-[#01143F]/90 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-400 rounded-xl transition cursor-pointer uppercase tracking-wider flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              Área do Cliente
            </button>
            <button 
              onClick={() => handleOpenDemo()} 
              className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-xs font-bold uppercase tracking-wider text-white px-5 py-3 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              Fale Conosco
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
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
                className="w-full text-center py-3 border border-white/10 hover:border-cyan-500/30 rounded-xl text-gray-300 text-xs font-bold uppercase tracking-wider active:bg-white/5 transition flex items-center justify-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" /> Área do Cliente
              </button>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenDemo();
                }} 
                className="w-full text-center py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-xl text-white text-xs font-bold uppercase tracking-wider shadow-lg transition"
              >
                Solicitar Demonstração
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 md:pt-32 md:pb-20 px-6 z-10">
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6.5xl font-extrabold tracking-tight leading-[1.08]"
            >
              Inteligência que <br />
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-white bg-clip-text text-transparent">
                Impulsiona Decisões.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              Conectamos dados brutos a escolhas estratégicas de alto impacto. A <strong>VLYNE</strong> é a plataforma definitiva para líderes que buscam transformar complexidade em vantagem competitiva clara.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-xs sm:text-sm text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal border-l-2 border-cyan-500/40 pl-4 py-1 italic bg-cyan-950/5 rounded-r-xl"
            >
              Em um mercado saturado de informações, o verdadeiro poder não está em acumular dados, mas em saber para onde eles apontam. Na <strong>VLYNE</strong>, desenvolvemos soluções inteligentes que clareiam o cenário de negócios, mitigam riscos e aceleram o crescimento. Nós fornecemos a clareza; você lidera o futuro.
            </motion.p>

            {/* Buttons Row */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <a 
                href="https://wa.me/5511920480770?text=Olá!%20Gostaria%20de%20solicitar%20mais%20informações%20sobre%20as%20soluções%20inteligentes%20da%20VLYNE."
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto text-center bg-[#00D4FF] hover:bg-cyan-400 text-[#01143F] hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] px-8 py-4 rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-lg shadow-cyan-400/20 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                Fale Conosco
              </a>
              <button 
                onClick={() => handleOpenDemo()}
                className="w-full sm:w-auto text-center bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-cyan-500/20 px-8 py-4 rounded-xl text-xs font-extrabold uppercase tracking-wider transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                Solicitar Demonstração
              </button>
            </motion.div>
          </div>

          {/* Symmetrical Tech Visual Accent column */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-square rounded-3xl bg-cyan-950/10 border border-white/5 flex items-center justify-center shadow-3xl shadow-cyan-950/50 overflow-hidden"
            >
              {/* Spinning technical halo outline */}
              <div className="absolute inset-0 border-[2px] border-dashed border-cyan-500/10 rounded-full animate-[spin_50s_linear_infinite]" />
              <div className="absolute inset-6 border border-indigo-500/10 rounded-full animate-[spin_35s_linear_infinite_reverse]" />
              
              {/* Glow center radial overlay */}
              <div className="absolute w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />
              
              <div className="relative z-10 w-full p-8 flex flex-col items-center justify-center">
                <VlyneLogo showText={true} className="w-full max-w-[240px]" />

              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solucoes" className="relative py-12 md:py-24 px-6 z-10 bg-[#010b24]/40 border-t border-b border-white/[0.02]">
        <div className="absolute inset-y-0 left-0 w-1/3 bg-cyan-500/5 blur-3xl pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-1/3 bg-indigo-500/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Soluções Inteligentes para Empresas Modernas
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 max-w-2xl mx-auto">
              Plataformas desenvolvidas para transformar operações em resultados estratégicos e acelerar o crescimento.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Card Produto 1 */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-[#020d2b] border border-white/5 rounded-3xl p-8 sm:p-10 relative overflow-hidden flex flex-col justify-between group shadow-xl shadow-cyan-950/20"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-400/10 transition-colors duration-300" />
              <div>
                {/* Header card icon / indicator */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                    SAAS PULSE
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-3 tracking-tight text-white group-hover:text-cyan-300 transition-colors duration-200">
                  VLYNE Pulse Intelligence
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 mb-8 leading-relaxed">
                  Plataforma avançada de business intelligence para o setor de varejo, focada no controle de estoques, acompanhamento de metas de vendas, visualizações estratégicas e detecção inteligente de rupturas.
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                  {[
                    'Gestão de Estoque',
                    'Gestão de Vendas',
                    'Dashboard Executivo',
                    'Produtos sem Giro',
                    'Ruptura de Estoque',
                    'Excesso de Estoque',
                    'Indicadores Inteligentes',
                    'Insights Automatizados',
                    'Classificação Estratégica',
                    'Sugestão de Compra',
                    'Alertas Inteligentes'
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-cyan-500/15 text-cyan-400 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="text-xs font-medium text-gray-300">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-5">
                <button 
                  onClick={() => handleOpenDemo('VLYNE Pulse Intelligence')}
                  className="w-full text-center border border-cyan-500/50 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] font-bold text-xs py-3.5 rounded-xl transition duration-200 tracking-wide cursor-pointer flex items-center justify-center gap-1.5"
                >
                  Solicitar Demonstração
                </button>
              </div>
            </motion.div>

            {/* Card Produto 2 */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-[#020d2b] border border-white/5 rounded-3xl p-8 sm:p-10 relative overflow-hidden flex flex-col justify-between group shadow-xl shadow-cyan-950/20"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-400/10 transition-colors duration-300" />
              <div>
                {/* Header card icon / indicator */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-2xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.25)]">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                    SAAS EVENT
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-3 tracking-tight text-white group-hover:text-indigo-300 transition-colors duration-200">
                  VLYNE Event Intelligence
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 mb-8 leading-relaxed">
                  Plataforma operacional para montadores e gestores de eventos cenográficos, integrando CRM comercial, controle de suprimentos canteiro, faturamento de stands e portal colaborativo.
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                  {[
                    'CRM Comercial',
                    'Gestão de Eventos',
                    'Portal do Cliente',
                    'Fluxo de Caixa',
                    'Controle de Equipes',
                    'Gestão de Contratos',
                    'Gestão de Projetos',
                    'Indicadores Estratégicos',
                    'Operação Multiempresa'
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-indigo-500/15 text-indigo-400 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="text-xs font-medium text-gray-300">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-5">
                <button 
                  onClick={() => handleOpenDemo('VLYNE Event Intelligence')}
                  className="w-full text-center border border-indigo-500/50 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] font-bold text-xs py-3.5 rounded-xl transition duration-200 tracking-wide cursor-pointer flex items-center justify-center gap-1.5"
                >
                  Solicitar Demonstração
                </button>
              </div>
            </motion.div>

            {/* Card Produto 3 */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-[#020d2b] border border-white/5 rounded-3xl p-8 sm:p-10 relative overflow-hidden flex flex-col justify-between group shadow-xl shadow-cyan-950/20"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-400/10 transition-colors duration-300" />
              <div>
                {/* Header card icon / indicator */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)]">
                    <Tag className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    SAAS ETIQUETAS
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-3 tracking-tight text-white group-hover:text-emerald-300 transition-colors duration-200">
                  VLYNE Etiquetas Intelligence
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 mb-8 leading-relaxed">
                  Sistema inteligente para gestão, auditoria e emissão de etiquetas. Focado em precificação dinâmica, controle de gôndolas e total conformidade operacional no PDV.
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                  {[
                    'Emissão de Etiquetas',
                    'Precificação Dinâmica',
                    'Leitura de Códigos',
                    'Auditoria de Gôndola',
                    'Integração de ERP',
                    'Layouts Customizáveis',
                    'Gestão de Campanhas',
                    'Mobilidade no PDV',
                    'Indicadores de Ruptura'
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="text-xs font-medium text-gray-300">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-5">
                <button 
                  onClick={() => handleOpenDemo('VLYNE Etiquetas Intelligence')}
                  className="w-full text-center border border-emerald-500/50 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] font-bold text-xs py-3.5 rounded-xl transition duration-200 tracking-wide cursor-pointer flex items-center justify-center gap-1.5"
                >
                  Solicitar Demonstração
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Diferenciais Section */}
      <section id="diferenciais" className="relative py-12 md:py-24 px-6 z-10">
        <div className="max-w-7xl mx-auto space-y-10 md:space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Por que escolher a VLYNE?
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Pilares tecnológicos que sustentam nossa entrega global de excelência comercial.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Cpu className="w-5 h-5 text-cyan-400" />, key: '🚀 Inteligência aplicada aos negócios', desc: 'Sistemas inteligentes orientados por dados consolidados corporativos' },
              { icon: <LineChart className="w-5 h-5 text-cyan-400" />, key: '📊 Indicadores em tempo real', desc: 'Tomadas de decisões baseadas em painéis vivos atualizados sem atrasos' },
              { icon: <Shield className="w-5 h-5 text-cyan-400" />, key: '🔒 Segurança em nuvem', desc: 'Isolação robusta e criptografia de ponta a ponta dos dados' },
              { icon: <Zap className="w-5 h-5 text-cyan-400" />, key: '⚡ Implantação rápida', desc: 'Processos de integração ágeis, prontos para uso em poucos dias' },
              { icon: <Smartphone className="w-5 h-5 text-cyan-400" />, key: '📱 Plataforma Web e Mobile', desc: 'Acesse em qualquer dispositivo com perfeita adaptabilidade tátil' },
              { icon: <Sliders className="w-5 h-5 text-cyan-400" />, key: '🤖 Automação inteligente', desc: 'Elimine planilhas manuais e automatize alertas e faturamento' },
              { icon: <TrendingUp className="w-5 h-5 text-cyan-400" />, key: '📈 Crescimento escalável', desc: 'Acompanhe expansão operacional sem sobrecarregar sua equipe' },
              { icon: <Server className="w-5 h-5 text-cyan-400" />, key: '☁️ Infraestrutura moderna', desc: 'Tecnologia hospedada em servidores robustos com redundância de dados' }
            ].map((diff, index) => (
              <motion.div 
                key={diff.key}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-[#020a24]/80 border border-white/5 p-6 rounded-2xl hover:border-cyan-500/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.25)] flex items-center justify-center mb-4">
                  {diff.icon}
                </div>
                <h4 className="text-xs font-bold text-gray-100 mb-2 font-mono uppercase tracking-wide">
                  {diff.key}
                </h4>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  {diff.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre a Empresa Section */}
      <section id="sobre" className="relative py-12 md:py-24 px-6 z-10 bg-[#010b24]/35 border-t border-white/[0.02]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Sobre a VLYNE
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full" />
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
              A <strong>VLYNE</strong> é uma empresa de tecnologia especializada em plataformas inteligentes para gestão empresarial de alto desempenho.
            </p>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Desenvolvemos soluções robustas e modernas que transformam dados complexos e operacionais em informações altamente qualificadas, estratégicas e intuitivas, ideais para impulsionar decisões corporativas rápidas e acelerar resultados comerciais. Nosso principal propósito é colaborar para que sua organização cresça de forma sustentável, escalável e com máximo controle dinâmico de todos os gargalos operacionais.
            </p>
          </div>

          <div className="md:col-span-6">
            <div className="bg-[#020d2b] border border-white/5 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-center space-y-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/5 rounded-full blur-2xl" />
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center shrink-0 border border-cyan-500/20">
                  <Shield className="text-cyan-400 w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-200">Isolação Criptográfica</h4>
                  <p className="text-[10px] text-gray-400 mt-1">Isolamos de forma segura os dados operacionais e financeiros de cada um de nossos contratantes.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center shrink-0 border border-cyan-500/20">
                  <Globe className="text-cyan-400 w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-200">Acesso Global Multi-SaaS</h4>
                  <p className="text-[10px] text-gray-400 mt-1">Administre estoques, leads e orçamentos do seu escritório ou diretamente do canteiro físico de obras.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center shrink-0 border border-cyan-500/20">
                  <CheckCircle2 className="text-cyan-400 w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-200">Suporte Dedicado</h4>
                  <p className="text-[10px] text-gray-400 mt-1">Amparo técnico operacional focado em implantar melhorias semanais para suas demandas vitais.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / Dores e Soluções */}
      <section id="faq" className="relative py-12 md:py-24 px-6 z-10 border-t border-white/[0.02]">
        <div className="max-w-4xl mx-auto space-y-10 md:space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Identifique o seu gargalo operacional
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Veja como os sistemas da VLYNE resolvem as principais dores do mercado através de inteligência de dados aplicada.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Onde estou perdendo dinheiro sem perceber na minha operação?",
                a: "A VLYNE identifica riscos operacionais, rupturas e oportunidades ocultas de ganho.",
                icon: <Search className="w-6 h-6 text-cyan-400" />,
                tag: "VLYNE Pulse Intelligence"
              },
              {
                q: "Como está o desempenho real de vendas em relação às metas?",
                a: "A VLYNE oferece dashboards interativos com indicadores cruciais para acompanhamento em tempo real.",
                icon: <LineChart className="w-6 h-6 text-cyan-400" />,
                tag: "VLYNE Pulse Intelligence"
              },
              {
                q: "Estou acompanhando as métricas corretas para impulsionar o negócio?",
                a: "A VLYNE centraliza relatórios complexos em painéis de análise estratégica e decisão ágil.",
                icon: <Sliders className="w-6 h-6 text-cyan-400" />,
                tag: "VLYNE Pulse Intelligence"
              },
              {
                q: "Qual projeto está dando lucro e qual está dando prejuízo?",
                a: "A VLYNE mostra em tempo real a rentabilidade exata e os custos de cada projeto.",
                icon: <TrendingUp className="w-6 h-6 text-cyan-400" />,
                tag: "VLYNE Event Intelligence"
              },
              {
                q: "Minha equipe está entregando as tarefas dentro do prazo estabelecido?",
                a: "A VLYNE monitora prazos, delega tarefas e acompanha o desempenho da sua equipe.",
                icon: <Clock className="w-6 h-6 text-cyan-400" />,
                tag: "VLYNE Event Intelligence"
              },
              {
                q: "Tenho visibilidade total e controle da minha empresa em tempo real?",
                a: "A VLYNE centraliza todas as áreas em um único painel inteligente para decisões rápidas.",
                icon: <Eye className="w-6 h-6 text-cyan-400" />,
                tag: "VLYNE Event Intelligence"
              },
              {
                q: "Estou correndo o risco de sofrer multas por preços divergentes no caixa?",
                a: "A VLYNE audita e padroniza as etiquetas, sincronizando tudo com seu ERP.",
                icon: <AlertTriangle className="w-6 h-6 text-cyan-400" />,
                tag: "VLYNE Etiquetas Intelligence"
              },
              {
                q: "Como garantir a validade dos produtos e evitar perdas ou descartes indevidos?",
                a: "A VLYNE controla datas críticas, gera alertas preventivos e automatiza a rastreabilidade.",
                icon: <Calendar className="w-6 h-6 text-cyan-400" />,
                tag: "VLYNE Etiquetas Intelligence"
              },
              {
                q: "Minha operação perde muito tempo atualizando preços manualmente?",
                a: "A VLYNE automatiza a impressão de etiquetas e preços, eliminando erros humanos e desperdício de tempo.",
                icon: <Tag className="w-6 h-6 text-cyan-400" />,
                tag: "VLYNE Etiquetas Intelligence"
              }
            ].map((faq, idx) => (
              <div key={idx} className="group flex flex-col md:flex-row items-center gap-4 bg-[#020a24]/80 border border-white/5 p-4 rounded-2xl hover:border-cyan-500/30 transition-colors">
                <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.3)] group-hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] group-hover:bg-cyan-500/20 transition-all duration-300">
                  {faq.icon}
                </div>
                
                <div className="flex-1 text-sm sm:text-base font-bold text-white text-center md:text-left">
                  {faq.q}
                </div>

                <div className="hidden md:flex shrink-0 px-2 text-cyan-500/30">
                  <ChevronRight className="w-6 h-6" />
                </div>

                <div className="flex-1 bg-cyan-500/5 rounded-xl p-4 flex flex-col justify-center border border-cyan-500/10 relative w-full md:w-auto min-h-[90px]">
                  <span className="text-[9px] font-mono font-bold tracking-wider uppercase text-cyan-300 mb-1.5 opacity-80">
                    {faq.tag}
                  </span>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed pr-8">
                    <strong className="text-cyan-400 font-bold">A VLYNE</strong> {faq.a.substring(8)}
                  </p>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-cyan-400 to-cyan-500 text-[#010a24] rounded-full flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action Final */}
      <section className="relative py-16 md:py-24 px-6 z-10 border-t border-white/[0.02] flex items-center justify-center">
        <div className="max-w-4xl w-full mx-auto relative bg-gradient-to-b from-[#020d2b] to-[#010a24] border border-cyan-500/10 rounded-3xl p-8 sm:p-14 text-center overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/[0.06] rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Pronto para impulsionar seu negócio?
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
              Conheça nossas soluções integradoras e descubra como a inteligente automatização de dados pode transformar sua operação comercial e dar muito mais visibilidade aos gestores da sua empresa.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a 
                href="https://wa.me/5511920480770?text=Olá!%20Gostaria%20de%20conversar%20sobre%20as%20soluções%20da%20VLYNE."
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto text-center bg-[#00D4FF] hover:bg-cyan-400 text-[#01143F] px-8 py-4 rounded-xl text-xs font-extrabold uppercase tracking-wider hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all duration-200 cursor-pointer"
              >
                Fale Conosco
              </a>
              <button 
                onClick={() => handleOpenDemo()}
                className="w-full sm:w-auto text-center bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-cyan-500/20 px-8 py-4 rounded-xl text-xs font-extrabold uppercase tracking-wider transition duration-200 cursor-pointer"
              >
                Solicitar Demonstração
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="bg-[#000615] border-t border-white/[0.03] py-12 md:py-16 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <VlyneLogo showText={true} className="w-32 !justify-start" />
            <p className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase font-bold text-left pt-2">
              INTELIGÊNCIA QUE IMPULSIONA DECISÕES.
            </p>
            <p className="text-[11px] text-gray-500 leading-relaxed max-w-sm">
              Plataformas dedicadas ao crescimento de negócios contemporâneos através de infraestruturas centralizadas modernas e tomada de decisão preditiva inteligente.
            </p>
          </div>

          {/* Links Col */}
          <div className="md:col-span-3 space-y-4 text-left">
            <h4 className="text-[10px] font-mono uppercase tracking-wider text-gray-300 font-extrabold">Links Rápidos</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#home" className="text-xs text-gray-400 hover:text-cyan-400 transition">Home</a>
              </li>
              <li>
                <a href="#solucoes" className="text-xs text-gray-400 hover:text-cyan-400 transition">Soluções</a>
              </li>
              <li>
                <a href="#sobre" className="text-xs text-gray-400 hover:text-cyan-400 transition">Sobre a Empresa</a>
              </li>
              <li>
                <button onClick={() => setClientModalOpen(true)} className="text-xs text-gray-400 hover:text-cyan-400 transition cursor-pointer text-left">Área do Cliente</button>
              </li>
              <li>
                <a href="#contato" className="text-xs text-gray-400 hover:text-cyan-400 transition">Contato Comercial</a>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="md:col-span-4 space-y-4 text-left">
            <h4 className="text-[10px] font-mono uppercase tracking-wider text-gray-300 font-extrabold">Fale Conosco</h4>
            <div className="space-y-3">
              <a 
                href="https://wa.me/5511920480770" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2.5 text-xs text-gray-400 hover:text-cyan-400 transition"
              >
                <Phone className="w-4 h-4 text-cyan-300 shrink-0" />
                <span>WhatsApp Comercial: +55 (11) 92048-0770</span>
              </a>
              <a 
                href="mailto:contato@vlyne.com.br" 
                className="flex items-center gap-2.5 text-xs text-gray-400 hover:text-cyan-400 transition"
              >
                <Mail className="w-4 h-4 text-cyan-300 shrink-0" />
                <span>E-mail: contato@vlyne.com.br</span>
              </a>
              <div className="flex items-center gap-2.5 text-xs text-gray-500">
                <Globe className="w-4 h-4 text-cyan-500 shrink-0 select-none" />
                <span>www.vlyne.com.br</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-white/5 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-gray-600 font-mono">
            &copy; 2026 VLYNE. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            <span className="text-[9px] text-gray-600 font-mono">São Paulo, SP, Brasil</span>
          </div>
        </div>
      </footer>

      {/* Demo Form Modal */}
      <AnimatePresence>
        {demoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setDemoModalOpen(false)}
              className="absolute inset-0 bg-black"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-[#020c24] border border-cyan-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden backdrop-blur-xl z-10"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />
              
              <button 
                onClick={() => setDemoModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>

              {!success ? (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 rounded-full">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="font-mono text-[9px] uppercase font-bold text-cyan-300">Solicitar Demonstração</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Gostaria de conhecer o sistema?</h3>
                    <p className="text-xs text-gray-400">
                      Preencha o formulário abaixo e um especialista de vendas da <strong>VLYNE</strong> fará contato para apresentar as potencialidades das nossas ferramentas SaaS.
                    </p>
                  </div>

                  {errorText && (
                    <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-xl text-xs font-semibold">
                      {errorText}
                    </div>
                  )}

                  <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                    {/* Nome */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono uppercase text-gray-400 font-extrabold flex items-center gap-1">
                        <Smile className="w-3.5 h-3.5 text-cyan-400" /> Seu Nome
                      </label>
                      <input 
                        type="text" 
                        required
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        placeholder="Ex: Carlos Oliveira"
                        className="w-full bg-[#03061c] border border-white/10 rounded-xl py-3 px-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 transition-all duration-200"
                      />
                    </div>

                    {/* Empresa */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono uppercase text-gray-400 font-extrabold flex items-center gap-1">
                        <Building className="w-3.5 h-3.5 text-cyan-400" /> Nome da Empresa
                      </label>
                      <input 
                        type="text" 
                        required
                        value={formData.empresa}
                        onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                        placeholder="Ex: Minha Empresa"
                        className="w-full bg-[#03061c] border border-white/10 rounded-xl py-3 px-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 transition-all duration-200"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono uppercase text-gray-400 font-extrabold flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-cyan-400" /> E-mail Comercial
                      </label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Ex: carlos@empresa.com"
                        className="w-full bg-[#03061c] border border-white/10 rounded-xl py-3 px-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 transition-all duration-200"
                      />
                    </div>

                    {/* Telefone */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono uppercase text-gray-400 font-extrabold flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-cyan-400" /> Telefone / WhatsApp
                      </label>
                      <input 
                        type="tel" 
                        required
                        value={formData.telefone}
                        onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                        placeholder="Ex: (11) 99999-9999"
                        className="w-full bg-[#03061c] border border-white/10 rounded-xl py-3 px-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 transition-all duration-200"
                      />
                    </div>

                    {/* Produto de Interesse */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono uppercase text-gray-400 font-extrabold flex items-center gap-1">
                        <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Produto de Interesse
                      </label>
                      <select 
                        value={formData.produto}
                        onChange={(e) => setFormData({ ...formData, produto: e.target.value })}
                        className="w-full bg-[#03061c] border border-white/10 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-cyan-500 transition-all duration-200 cursor-pointer"
                      >
                        <option value="VLYNE Pulse Intelligence">VLYNE Pulse Intelligence</option>
                        <option value="VLYNE Event Intelligence">VLYNE Event Intelligence</option>
                        <option value="VLYNE Etiquetas Intelligence">VLYNE Etiquetas Intelligence</option>
                        <option value="Múltiplos Sistemas">Múltiplos Sistemas</option>
                      </select>
                    </div>

                    <button 
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white py-3.5 rounded-xl font-bold text-xs tracking-wider uppercase transition disabled:opacity-55 cursor-pointer mt-4"
                    >
                      {submitting ? 'Enviando Solicitação...' : 'Enviar Solicitação'}
                    </button>
                  </form>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center space-y-6 flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Obrigado pela solicitação!</h3>
                    <p className="text-xs text-gray-400 leading-relaxed max-w-sm mx-auto">
                      Seu interesse foi registrado com sucesso. Nossa equipe entrará em contato comercial pelo e-mail ou telefone informados para guiar sua demonstração sob demanda.
                    </p>
                  </div>
                  <button 
                    onClick={() => setDemoModalOpen(false)}
                    className="bg-white/10 hover:bg-white/15 px-6 py-2.5 rounded-xl text-xs font-bold font-mono transition uppercase cursor-pointer"
                  >
                    Fechar Janela
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Client Area Portal Selector Modal */}
      <AnimatePresence>
        {clientModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setClientModalOpen(false)}
              className="absolute inset-0 bg-black"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md bg-[#020c24]/95 border border-cyan-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden backdrop-blur-xl z-10 text-center"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />
              
              <button 
                onClick={() => setClientModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 rounded-full">
                    <Lock className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="font-mono text-[9px] uppercase font-bold text-cyan-300">Área do Cliente</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Qual plataforma deseja acessar?</h3>
                  <p className="text-xs text-gray-400">
                    Selecione abaixo o produto correspondente ao seu contrato de serviço para ser direcionado à tela de login segura.
                  </p>
                </div>

                <div className="flex flex-col gap-3.5 pt-2">
                  <a 
                    href="https://retail.vlyne.com.br/login"
                    className="w-full flex items-center justify-between p-4 bg-white/[0.03] hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 rounded-2xl transition duration-200 group text-left"
                  >
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">VLYNE Pulse Intelligence</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5">SaaS para varejo e inteligência de estoque</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-300 transition-colors" />
                  </a>

                  <a 
                    href="https://eventos.vlyne.com.br/"
                    className="w-full flex items-center justify-between p-4 bg-white/[0.03] hover:bg-indigo-500/10 border border-white/5 hover:border-indigo-500/30 rounded-2xl transition duration-200 group text-left"
                  >
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">VLYNE Event Intelligence</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5">SaaS para eventos e cenografia</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-indigo-300 transition-colors" />
                  </a>

                  <a 
                    href="https://etiquetas.vlyne.com.br/"
                    className="w-full flex items-center justify-between p-4 bg-white/[0.03] hover:bg-emerald-500/10 border border-white/5 hover:border-emerald-500/30 rounded-2xl transition duration-200 group text-left"
                  >
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">VLYNE Etiquetas Intelligence</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5">Sistema inteligente de emissão de etiquetas e auditoria</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-emerald-300 transition-colors" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
