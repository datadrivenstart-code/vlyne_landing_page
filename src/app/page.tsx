"use client";

import React, { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Box,
  Check,
  CheckCircle2,
  CheckSquare,
  ChevronDown,
  ChevronRight,
  Compass,
  FileCheck,
  FileText,
  Layers,
  LayoutDashboard,
  Lock,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

export default function LandingPage() {
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#01143F] text-white selection:bg-cyan-500 selection:text-black overflow-x-hidden w-full">


  {/*  HEADER NO TOPO 100% RESPONSIVO E CENTRALIZADO  */}
  <header className="w-full bg-[#01143F]/95 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between gap-3 sm:gap-6">
      
      {/*  LOGO VLYNE (BASE64 INLINE)  */}
      <a href="#" className="flex items-center gap-3 sm:gap-4 group shrink-0">
        <img 
          src="/vlyne_logo_horizontal.png" 
          alt="VLYNE" 
          className="h-10 sm:h-12 lg:h-14 w-auto object-contain filter drop-shadow-[0_0_20px_rgba(0,212,255,0.45)] group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="hidden xl:block border-l border-white/20 pl-4 py-1">
          <span className="text-[11px] font-mono tracking-wide text-cyan-300 block font-bold">Inteligência que impulsiona decisões.</span>
          <span className="text-[9px] text-slate-400 font-mono block">Projetos 3D & Gestão de Montadoras</span>
        </div>
      </a>

      {/*  MENU DESKTOP FLUIDO E CENTRALIZADO  */}
      <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-bold uppercase tracking-wider text-slate-300">
        <a href="#design-vlyne" className="hover:text-purple-300 transition-colors flex items-center gap-2 whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-purple-400"></span>
          <span>DESIGN VLYNE</span>
        </a>
        <a href="#event-intelligence" className="hover:text-cyan-300 transition-colors flex items-center gap-2 whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span>Event Intelligence</span>
        </a>
        <a href="#contratacao" className="hover:text-cyan-300 transition-colors whitespace-nowrap">Contratação</a>
        <a href="#faq" className="hover:text-cyan-300 transition-colors whitespace-nowrap">FAQ</a>
      </nav>

      {/*  CTA BOTÕES DESKTOP  */}
      <div className="hidden sm:flex items-center gap-2.5 sm:gap-3 shrink-0">
        
        {/*  DROPDOWN ÁREA DO CLIENTE (AMBOS OS SISTEMAS)  */}
        <div className="relative group">
          <button 
            type="button"
            onClick={() => setClientDropdownOpen(!clientDropdownOpen)}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 transition uppercase tracking-wider whitespace-nowrap cursor-pointer"
            
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Área do Cliente</span>
            <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
          </button>
          
          {/*  MENU SUSPENSO  */}
          <div 
            id="client-dropdown"
            className={`absolute right-0 top-full pt-2 w-72 z-50 ${clientDropdownOpen ? "block" : "hidden group-hover:block"}`}
          >
            <div className="rounded-2xl bg-[#01143F] border border-cyan-500/30 shadow-[0_15px_50px_rgba(0,0,0,0.8)] p-2.5 flex flex-col gap-1.5 backdrop-blur-2xl">
              <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-slate-400 border-b border-white/10">
                Acessar Plataforma:
              </div>
              <a href="https://design.vlyne.com.br/login" target="_blank" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-purple-500/15 border border-transparent hover:border-purple-500/30 transition text-left group/item">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Box className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover/item:text-purple-300 flex items-center gap-1.5">
                    DESIGN VLYNE
                    <ArrowUpRight className="w-3 h-3 opacity-60" />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-sans leading-tight">Projetos 3D & Engenharia</p>
                </div>
              </a>
              <a href="https://eventos.vlyne.com.br" target="_blank" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-cyan-500/15 border border-transparent hover:border-cyan-500/30 transition text-left group/item">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
                  <LayoutDashboard className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover/item:text-cyan-300 flex items-center gap-1.5">
                    Event Intelligence
                    <ArrowUpRight className="w-3 h-3 opacity-60" />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-sans leading-tight">ERP & Gestão de Montadoras</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <a href="https://wa.me/5511920480770?text=Ol%C3%A1!%20Quero%20conhecer%20as%20solu%C3%A7%C3%B5es%20da%20VLYNE." target="_blank" className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-[#00D4FF] text-[#01143F] hover:bg-cyan-300 transition glow-cyan flex items-center gap-2 whitespace-nowrap">
          <span>Falar com Consultor</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/*  BOTÃO MOBILE (TELAS MENORES QUE 1024px)  */}
      <div className="flex items-center gap-2 lg:hidden">
        <a href="https://wa.me/5511920480770?text=Ol%C3%A1!%20Quero%20conhecer%20as%20solu%C3%A7%C3%B5es%20da%20VLYNE." target="_blank" className="px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-[#00D4FF] text-[#01143F] flex items-center gap-1">
          <span>Contato</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
        <button 
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl text-cyan-300 hover:bg-white/10 transition border border-cyan-500/30"
          aria-label="Abrir Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

    </div>

    {/*  GAVETA MENU MOBILE / TABLET  */}
    <div id="mobile-drawer" className={`${mobileMenuOpen ? "block" : "hidden"} lg:hidden bg-[#01143F]/98 border-t border-white/10 px-6 py-6 space-y-5 backdrop-blur-2xl`}>
      <div className="flex flex-col gap-3 text-sm font-bold uppercase tracking-wider text-slate-200">
        <a href="#design-vlyne"  className="hover:text-purple-300 flex items-center gap-2 py-2 border-b border-white/5">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
          DESIGN VLYNE (Projetos 3D)
        </a>
        <a href="#event-intelligence"  className="hover:text-cyan-300 flex items-center gap-2 py-2 border-b border-white/5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
          VLYNE Event Intelligence (ERP)
        </a>
        <a href="#contratacao"  className="hover:text-cyan-300 py-2 border-b border-white/5">
          Contratação
        </a>
        <a href="#faq"  className="hover:text-cyan-300 py-2 border-b border-white/5">
          FAQ
        </a>
      </div>

      {/*  ÁREA DO CLIENTE MOBILE  */}
      <div className="pt-2 border-t border-white/10">
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-2 font-bold">Acessar Área do Cliente:</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <a href="https://design.vlyne.com.br/login" target="_blank" className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-200 flex items-center justify-between text-xs font-bold">
            <span>Login DESIGN VLYNE</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <a href="https://eventos.vlyne.com.br" target="_blank" className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-200 flex items-center justify-between text-xs font-bold">
            <span>Login Event Intelligence</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  </header>

  {/*  HERO SECTION: APRESENTAÇÃO CLARA DAS DUAS PLATAFORMAS APARTADAS  */}
  <section className="relative min-h-[85vh] flex items-center justify-center grid-bg pt-12 pb-20 px-6 overflow-hidden">
    <div className="max-w-7xl mx-auto w-full text-center relative z-10">
      
      {/*  BADGE  */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono mb-6 uppercase tracking-widest backdrop-blur">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
        Tecnologias Especializadas para o Mercado de Feiras & Montadoras
      </div>

      {/*  HEADLINE  */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.06] max-w-5xl mx-auto">
        Software especializado<br/>
        <span className="bg-gradient-to-r from-cyan-300 via-white to-purple-300 bg-clip-text text-transparent">
          para quem projeta e para quem gerencia.
        </span>
      </h1>

      {/*  SUBTITULO: FRASE EXATA DO CLIENTE  */}
      <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
        A VLYNE desenvolve softwares específicos para o ecossistema de estandes e eventos. Conheça as nossas soluções disponíveis:
      </p>

      {/*  OS 2 CARDS DE ENTRADA (SISTEMAS APARTADOS)  */}
      <div id="sistemas" className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-5xl mx-auto items-stretch">
        
        {/*  CARD SISTEMA 01: DESIGN VLYNE  */}
        <a href="#design-vlyne" className="group p-8 rounded-3xl bg-gradient-to-b from-[#031238] to-[#020d2b] border border-purple-500/30 hover:border-purple-400 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-purple-500/20 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/20 transition-all"></div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/30 font-bold">SISTEMA 01 • PROJETO 3D</span>
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1 group-hover:text-purple-300">Conhecer <ChevronRight className="w-3.5 h-3.5" /></span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white group-hover:text-purple-200 transition-colors">
              DESIGN VLYNE
            </h2>
            <p className="text-xs text-purple-300/80 font-mono mt-1">Software de IA, Engenharia Paramétrica & Plantas Técnicas</p>

            <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Desenvolvido para cenógrafos, arquitetos e projetistas de stands. Gera layouts volumétricos por IA, motor 3D orbital Three.js 360°, pranchas técnicas A3 (ABNT NBR 6492) com especificação de materiais e exportação para CAD (.DXF) e 3D (.GLB).
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-bold text-purple-400">
            <span>Ver Telas Reais do Software</span>
            <ArrowDown className="w-4 h-4" />
          </div>
        </a>

        {/*  CARD SISTEMA 02: VLYNE EVENT INTELLIGENCE  */}
        <a href="#event-intelligence" className="group p-8 rounded-3xl bg-gradient-to-b from-[#031238] to-[#020d2b] border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-cyan-500/20 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all"></div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 bg-cyan-500/20 px-3 py-1 rounded-full border border-cyan-500/30 font-bold">SISTEMA 02 • ERP MONTADORAS</span>
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1 group-hover:text-cyan-300">Conhecer <ChevronRight className="w-3.5 h-3.5" /></span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white group-hover:text-cyan-200 transition-colors">
              VLYNE Event Intelligence
            </h2>
            <p className="text-xs text-cyan-300/80 font-mono mt-1">Software de Gestão Operacional, Pavilhões & Margem Real</p>

            <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Desenvolvido para diretores, gerentes de produção e equipes financeiras de montadoras. Controla CRM de propostas, gerador de contratos com margem travada, checklists de promotoras (SP Expo, Anhembi, Expo Center Norte), cronograma de canteiro e lucro líquido real por stand.
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-bold text-cyan-400">
            <span>Ver Telas Reais do Software</span>
            <ArrowDown className="w-4 h-4" />
          </div>
        </a>

      </div>

    </div>
  </section>

  {/*  =========================================================================================  */}
  {/*  SEÇÃO 01: DESIGN VLYNE (100% AUTÔNOMO - ENGENHARIA E 3D)  */}
  {/*  =========================================================================================  */}
  <section id="design-vlyne" className="py-24 px-6 border-t border-purple-500/20 bg-gradient-to-b from-[#020d2b] via-[#01143F] to-[#020d2b] relative overflow-hidden">
    <div className="max-w-7xl mx-auto relative z-10">
      
      {/*  HEADER DO SISTEMA 01  */}
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-wider mb-4">
          <span className="w-2 h-2 rounded-full bg-purple-400"></span>
          SISTEMA 01 (AUTÔNOMO) • PROJETO & ENGENHARIA 3D
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          DESIGN VLYNE: Engenharia paramétrica e pranchas executivas em minutos.
        </h2>
        <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
          O software de projeto da VLYNE foi criado especificamente para a arquitetura efêmera e montagem de estandes. Ele não depende de nenhum ERP para funcionar: você projeta, valida espacialmente, gera pranchas técnicas ABNT e exporta arquivos prontos para fabricação.
        </p>
        <div className="mt-6">
          <a href="https://design.vlyne.com.br/login" target="_blank" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border border-purple-500/40 bg-purple-950/40 text-purple-300 hover:bg-purple-900/50 hover:text-white transition uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" />
            <span>Acessar Plataforma DESIGN VLYNE</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/*  CARDS AJUSTADOS: SEM VAZIOS VERTICAIS, IMAGEM LOGO ABAIXO DO TEXTO  */}
      <div className="space-y-8">
        
        {/*  CARD 1: MOTOR THREE.JS 360° (FULL WIDTH, COMPACTO)  */}
        <div className="bento-card rounded-2xl p-6 sm:p-8 border-purple-500/20 hover:border-purple-400/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded border border-purple-500/20">ETAPA 02 • VISUALIZAÇÃO</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1.5">Visualização 3D Interativa Orbital 360°</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">TELA REAL DO DESIGN VLYNE</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 max-w-4xl">
            Renderização em tempo real via Three.js direto no navegador. Inspeção de volumetria, teste de fluxos de circulação e validação estética sem travar sua máquina.
          </p>
          <div className="rounded-xl overflow-hidden border border-white/10 screen-zoom bg-[#000615]">
            <img src="/design_vlyne_screens/design_02_motor_3d.png" alt="Motor 3D Orbital Real" className="w-full h-auto object-cover block" />
          </div>
        </div>

        {/*  ROW 2: BRIEFING IA (PORTRAIT) + PRANCHA TÉCNICA A3  */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/*  BRIEFING IA (5 COLS)  */}
          <div className="lg:col-span-5 bento-card rounded-2xl p-6 border-purple-500/20 hover:border-purple-400/40">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded border border-purple-500/20">ETAPA 01 • FORMULAÇÃO</span>
              <span className="text-xs text-slate-400 font-mono">TELA REAL</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-1.5">Briefing Guiado por Inteligência Artificial</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-5">
              Entrada assistida de dimensões, posicionamento de esquinas, áreas de depósito, balcões de atendimento e lounges, convertendo requisitos em parâmetros estruturais.
            </p>
            <div className="rounded-xl overflow-hidden border border-white/10 screen-zoom bg-[#000615]">
              <img src="/design_vlyne_screens/design_01_briefing_ia.png" alt="Tela Real do Briefing IA" className="w-full h-auto object-contain max-h-[640px] mx-auto block" />
            </div>
          </div>

          {/*  PRANCHA TÉCNICA A3 COM LISTA MATERIAIS MAT-01 A MAT-11 (7 COLS)  */}
          <div className="lg:col-span-7 bento-card rounded-2xl p-6 border-purple-500/20 hover:border-purple-400/40">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded border border-purple-500/20">ETAPA 03 • ENGENHARIA EXECUTIVA</span>
              <span className="text-xs text-slate-400 font-mono">TELA REAL</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-1.5">Prancha Executiva A3 com Codificação de Materiais</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-5">
              Geração de pranchas nos padrões ABNT/NBR 6492. Inclui tabela técnica com codificação precisa de materiais (MAT-01 a MAT-11): piso compensado, bagun, ripas de pinus, testeira e iluminação.
            </p>
            <div className="rounded-xl overflow-hidden border border-white/10 screen-zoom bg-[#000615]">
              <img src="/design_vlyne_screens/design_03_prancha_tecnica.png" alt="Prancha Técnica A3 Real" className="w-full h-auto object-cover block" />
            </div>
          </div>

        </div>

        {/*  ROW 3: COMPARADOR ESPACIAL 2D VS 3D (FULL WIDTH)  */}
        <div className="bento-card rounded-2xl p-6 sm:p-8 border-purple-500/20 hover:border-purple-400/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded border border-purple-500/20">ETAPA 04 • FIDELIDADE</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1.5">Comparador de Fidelidade Espacial 2D vs 3D</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">TELA REAL DO DESIGN VLYNE</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 max-w-4xl">
            Checagem simultânea entre a planta baixa humanizada e a perspectiva volumétrica, eliminando erros de proporção antes do envio ao cliente.
          </p>
          <div className="rounded-xl overflow-hidden border border-white/10 screen-zoom bg-[#000615]">
            <img src="/design_vlyne_screens/design_04_comparador_3d_2d.png" alt="Comparador 2D vs 3D Real" className="w-full h-auto object-cover block" />
          </div>
        </div>

      </div>

    </div>
  </section>

  {/*  =========================================================================================  */}
  {/*  SEÇÃO 02: VLYNE EVENT INTELLIGENCE (100% AUTÔNOMO - ERP DE MONTADORAS)  */}
  {/*  =========================================================================================  */}
  <section id="event-intelligence" className="py-24 px-6 border-t border-cyan-500/20 bg-gradient-to-b from-[#01143F] via-[#010c2b] to-[#01143F] relative overflow-hidden">
    <div className="max-w-7xl mx-auto relative z-10">
      
      {/*  HEADER DO SISTEMA 02  */}
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-4">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          SISTEMA 02 (AUTÔNOMO) • GESTÃO OPERACIONAL DE MONTADORAS
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          VLYNE Event Intelligence: Controle de canteiro, promotoras e margem real.
        </h2>
        <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
          O ERP da VLYNE foi construído sob medida para a dinâmica de montadoras de feiras. Não é um ERP genérico: ele gerencia a pressão de prazos de montagem, as exigências de promotoras como SP Expo, Anhembi e Center Norte, e apura o lucro real de cada estande.
        </p>
        <div className="mt-6">
          <a href="https://eventos.vlyne.com.br" target="_blank" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/50 hover:text-white transition uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" />
            <span>Acessar Plataforma Event Intelligence</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/*  CARDS AJUSTADOS: SEM VAZIOS VERTICAIS, ITEMS-START, IMAGEM LOGO ABAIXO DO TEXTO  */}
      <div className="space-y-8">
        
        {/*  CARD 1: DASHBOARD OPERACIONAL (12 COLS)  */}
        <div className="bento-card rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">PAINEL GERAL</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1.5">Visão Consolidada de Projetos e Canteiro</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">TELA REAL DO VLYNE EVENT INTELLIGENCE</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 max-w-4xl">
            Acompanhamento central de eventos por status, faturamento acumulado, projetos em produção, alertas de prazos de montagem e métricas financeiras.
          </p>
          <div className="rounded-xl overflow-hidden border border-white/10 screen-zoom bg-[#000615]">
            <img src="/screenshots/geral-01-dashboard.png" alt="Dashboard Operacional Real" className="w-full h-auto object-cover block" />
          </div>
        </div>

        {/*  ROW 2: CRM DE PROPOSTAS + GERADOR DE CONTRATO (ITEMS-START, SEM VAZIOS)  */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/*  CRM DE PROPOSTAS  */}
          <div className="bento-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">COMERCIAL</span>
              <span className="text-xs text-slate-400 font-mono">TELA REAL</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-1.5">CRM de Propostas & Motivos de Perda</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-5">
              Histórico completo por estande, valor por m², motivos reais de perda e conversão direta para ordem de serviço após aprovação comercial.
            </p>
            <div className="rounded-xl overflow-hidden border border-white/10 screen-zoom bg-[#000615]">
              <img src="/screenshots/comercial-01-crm-propostas-card.png" alt="CRM de Propostas Real" className="w-full h-auto object-cover block" />
            </div>
          </div>

          {/*  GERADOR DE CONTRATO (SEM VAZIO)  */}
          <div className="bento-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">JURÍDICO</span>
              <span className="text-xs text-slate-400 font-mono">TELA REAL</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-1.5">Gerador de Contrato Amarrado ao Orçamento</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-5">
              Geração de contratos com valor e escopo travados. O sistema impede divergências contratuais entre o que a montadora orçou e o que foi assinado.
            </p>
            <div className="rounded-xl overflow-hidden border border-white/10 screen-zoom bg-[#000615]">
              <img src="/screenshots/contrato-01-gerador-contrato.png" alt="Gerador de Contrato Real" className="w-full h-auto object-cover block" />
            </div>
          </div>

        </div>

        {/*  ROW 3: CHECKLIST PROMOTORAS + MARGEM REAL (ITEMS-START, SEM VAZIOS)  */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/*  CHECKLIST PROMOTORAS (AJUSTADO E SEM VAZIOS)  */}
          <div className="bento-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">DOCUMENTAÇÃO</span>
              <span className="text-xs text-slate-400 font-mono">TELA REAL</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-1.5">Checklists de Pavilhões & Promotoras</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-5">
              Controle rígido de prazos para emissão de RRT, ART, apólices de seguro de montagem e aprovação de projetos nos principais pavilhões do Brasil.
            </p>
            <div className="rounded-xl overflow-hidden border border-white/10 screen-zoom bg-[#000615]">
              <img src="/screenshots/documentacao-01-checklist-projeto.png" alt="Checklist de Promotora Real" className="w-full h-auto object-cover block" />
            </div>
          </div>

          {/*  MARGEM REAL E FINANCEIRO (AJUSTADO E SEM VAZIOS)  */}
          <div className="bento-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">FINANCEIRO REAL</span>
              <span className="text-xs text-slate-400 font-mono">TELA REAL</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-1.5">Apuração de Lucro Líquido e Margem por Estande</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-5">
              Confronto direto da receita contratada contra diárias de equipe de canteiro, materiais de almoxarifado, locação de móveis e fretes, revelando a margem real.
            </p>
            <div className="rounded-xl overflow-hidden border border-white/10 screen-zoom bg-[#000615]">
              <img src="/screenshots/financeiro-01-transacoes.png" alt="Transações e Margem Real" className="w-full h-auto object-cover block" />
            </div>
          </div>

        </div>

        {/*  ROW 4: CRONOGRAMA DINÂMICO (12 COLS, COMPACTO)  */}
        <div className="bento-card rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">OPERAÇÃO & FÁBRICA</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1.5">Cronograma Dinâmico de Pavilhão & Linha de Produção</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">TELA REAL</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 max-w-4xl">
            Alertas de compressão de prazo, controle de dias restantes até o início da feira e acompanhamento de fases de marcenaria, serralheria, transporte e montagem.
          </p>
          <div className="rounded-xl overflow-hidden border border-white/10 screen-zoom bg-[#000615]">
            <img src="/screenshots/preproducao-03-cronograma-dinamico.png" alt="Cronograma Dinâmico Real" className="w-full h-auto object-cover block" />
          </div>
        </div>

      </div>

    </div>
  </section>

  {/*  =========================================================================================  */}
  {/*  SEÇÃO 03: CONTRATAÇÃO TOTALMENTE MODULAR E APARTADA  */}
  {/*  =========================================================================================  */}
  <section id="contratacao" className="py-24 px-6 border-t border-white/10 bg-[#010c2b]">
    <div className="max-w-7xl mx-auto">
      
      <div className="text-center max-w-3xl mx-auto mb-16">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#00D4FF] mb-3 font-mono">CONTRATAÇÃO INDEPENDENTE</p>
        <h2 className="text-3xl sm:text-5xl font-black text-white">Escolha a solução que sua empresa precisa</h2>
        <p className="mt-4 text-slate-300 text-sm sm:text-base">
          Com os softwares da VLYNE você tem liberdade para escolher a solução que resolve o gargalo atual da sua empresa:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
        
        {/*  OPÇÃO 1: APENAS DESIGN VLYNE  */}
        <div className="p-8 rounded-3xl bg-[#031238] border border-purple-500/30 flex flex-col justify-between relative">
          <div>
            <span className="text-[10px] font-mono uppercase text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 font-bold block w-fit mb-4">MÓDULO DE PROJETO</span>
            <h3 className="text-2xl font-black text-white mb-2">Apenas DESIGN VLYNE</h3>
            <p className="text-xs text-purple-300 font-mono mb-4">Para projetistas, agências de cenografia & estúdios 3D</p>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Contrate exclusivamente o motor de criação paramétrica, pranchas técnicas A3 ABNT e exportação CAD/GLB para acelerar seu departamento de criação.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400 shrink-0" /> Layout volumétrico guiado por IA</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400 shrink-0" /> Motor 3D Three.js orbital 360°</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400 shrink-0" /> Prancha A3 com tabela MAT-01 a MAT-11</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400 shrink-0" /> Exportação DXF e GLB nativa</li>
            </ul>
          </div>
          <div className="mt-8 pt-6 border-t border-white/10">
            <a href="https://wa.me/5511920480770?text=Ol%C3%A1!%20Quero%20contratar%20o%20DESIGN%20VLYNE%20(Software%20de%20Projeto%203D)." target="_blank" className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-purple-600 hover:bg-purple-500 text-white transition text-center block">
              Contratar DESIGN VLYNE
            </a>
          </div>
        </div>

        {/*  OPÇÃO 2: APENAS EVENT INTELLIGENCE  */}
        <div className="p-8 rounded-3xl bg-[#031238] border border-cyan-500/30 flex flex-col justify-between relative">
          <div>
            <span className="text-[10px] font-mono uppercase text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 font-bold block w-fit mb-4">MÓDULO DE GESTÃO</span>
            <h3 className="text-2xl font-black text-white mb-2">Apenas Event Intelligence</h3>
            <p className="text-xs text-cyan-300 font-mono mb-4">Para montadoras de estandes & operadoras de feiras</p>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Contrate exclusivamente o ERP operacional de feiras para controlar seu funil comercial, contratos com margem travada, checklists e lucro líquido de cada stand.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400 shrink-0" /> CRM especializado por estande e feira</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400 shrink-0" /> Contrato jurídico amarrado ao orçamento</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400 shrink-0" /> Checklists de promotoras e prazos de RRT/ART</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400 shrink-0" /> Apuração de margem e lucro real por projeto</li>
            </ul>
          </div>
          <div className="mt-8 pt-6 border-t border-white/10">
            <a href="https://wa.me/5511920480770?text=Ol%C3%A1!%20Quero%20contratar%20o%20VLYNE%20Event%20Intelligence%20(Software%20de%20Gest%C3%A3o)." target="_blank" className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#00D4FF] hover:bg-cyan-300 text-[#01143F] transition text-center block">
              Contratar Event Intelligence
            </a>
          </div>
        </div>

        {/*  OPÇÃO 3: AMBAS AS SOLUÇÕES  */}
        <div className="p-8 rounded-3xl bg-[#031238] border border-white/20 flex flex-col justify-between relative">
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-300 bg-white/10 px-3 py-1 rounded-full border border-white/20 font-bold block w-fit mb-4">SOLUÇÃO COMPLETA</span>
            <h3 className="text-2xl font-black text-white mb-2">Ambos os Softwares</h3>
            <p className="text-xs text-slate-400 font-mono mb-4">Para montadoras completas com equipe de criação própria</p>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Adote as duas plataformas de forma autônoma na sua empresa: equipe de projeto equipada com o DESIGN VLYNE e equipe operacional equipada com o Event Intelligence.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-white shrink-0" /> Acesso total ao DESIGN VLYNE (3D & Pranchas)</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-white shrink-0" /> Acesso total ao VLYNE Event Intelligence (ERP)</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-white shrink-0" /> Atendimento e suporte executivo prioritário</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-white shrink-0" /> Contratos e acessos independentes por departamento</li>
            </ul>
          </div>
          <div className="mt-8 pt-6 border-t border-white/10">
            <a href="https://wa.me/5511920480770?text=Ol%C3%A1!%20Tenho%20interesse%20em%20adotar%20ambos%20os%20softwares%20da%20VLYNE." target="_blank" className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/30 transition text-center block">
              Consultar Pacote Completo
            </a>
          </div>
        </div>

      </div>

    </div>
  </section>

  {/*  =========================================================================================  */}
  {/*  SEÇÃO 04: FAQ (ESCLARECENDO QUE SÃO APARTADOS)  */}
  {/*  =========================================================================================  */}
  <section id="faq" className="py-24 px-6 border-t border-white/10 bg-[#01143F]">
    <div className="max-w-4xl mx-auto">
      
      <div className="text-center mb-16">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#00D4FF] mb-3 font-mono">DÚVIDAS FREQUENTES</p>
        <h2 className="text-3xl sm:text-5xl font-black text-white">Perguntas Frequentes</h2>
        <p className="mt-4 text-slate-300 text-sm">Respostas diretas sobre como os softwares operam:</p>
      </div>

      <div className="space-y-4">
        
        {/*  PERGUNTA CHAVE: OS SISTEMAS SÃO INTEGRADOS?  */}
        <details className="group bento-card p-6 rounded-2xl cursor-pointer border-cyan-500/30" open>
          <summary className="flex items-center justify-between text-base font-bold text-white select-none">
            <span className="text-cyan-300">O DESIGN VLYNE e o VLYNE Event Intelligence são sistemas integrados?</span>
            <ChevronDown className="w-4 h-4 text-cyan-400 transition-transform group-open:rotate-180" />
          </summary>
          <p className="mt-4 text-xs text-slate-300 leading-relaxed border-t border-white/10 pt-4">
            <strong className="text-white">Não. São sistemas apartados e autônomos.</strong><br/><br/>
            O <strong>DESIGN VLYNE</strong> é um software especializado para arquitetos e projetistas gerarem layouts por IA, visualizarem o estande em 3D orbital 360°, emitirem pranchas técnicas executivas ABNT e exportarem arquivos CAD/GLB.<br/><br/>
            O <strong>VLYNE Event Intelligence</strong> é um software ERP de gestão operacional e financeira para montadoras de feiras (CRM, contratos com margem travada, checklists de promotoras como SP Expo, Anhembi e Center Norte, cronograma dinâmico de pavilhão e lucro real por projeto).<br/><br/>
            Sua empresa pode contratar qualquer um dos sistemas de forma 100% independente, conforme sua necessidade.
          </p>
        </details>

        <details className="group bento-card p-6 rounded-2xl cursor-pointer">
          <summary className="flex items-center justify-between text-base font-bold text-white select-none">
            <span>As telas exibidas no site são reais ou ilustrativas?</span>
            <ChevronDown className="w-4 h-4 text-cyan-400 transition-transform group-open:rotate-180" />
          </summary>
          <p className="mt-4 text-xs text-slate-300 leading-relaxed">
            Todas as imagens exibidas nesta página são <strong>capturas 100% autênticas das interfaces reais dos sistemas em funcionamento</strong>. Não utilizamos renders conceituais de estandes gerados por IA genérica para promover nossos sistemas.
          </p>
        </details>

        <details className="group bento-card p-6 rounded-2xl cursor-pointer">
          <summary className="flex items-center justify-between text-base font-bold text-white select-none">
            <span>O DESIGN VLYNE exporta arquivos compatíveis com softwares de marcenaria e CAD?</span>
            <ChevronDown className="w-4 h-4 text-cyan-400 transition-transform group-open:rotate-180" />
          </summary>
          <p className="mt-4 text-xs text-slate-300 leading-relaxed">
            Sim. O sistema exporta arquivos técnicos <strong>CAD .DXF</strong> em camadas limpas de engenharia e arquivos tridimensionais <strong>.GLB</strong>, permitindo envio direto para usinagem CNC, modeladores ou marcenaria de canteiro.
          </p>
        </details>

        <details className="group bento-card p-6 rounded-2xl cursor-pointer">
          <summary className="flex items-center justify-between text-base font-bold text-white select-none">
            <span>Quais regras de promotoras e pavilhões o Event Intelligence atende?</span>
            <ChevronDown className="w-4 h-4 text-cyan-400 transition-transform group-open:rotate-180" />
          </summary>
          <p className="mt-4 text-xs text-slate-300 leading-relaxed">
            O sistema vem pré-configurado com checklists das principais administradoras de feiras (SP Expo, Expo Center Norte, Distrito Anhembi, Transamerica Expo, entre outros), gerenciando prazos de RRT, ART, seguro e projetos de mezanino/elétrica.
          </p>
        </details>

        <details className="group bento-card p-6 rounded-2xl cursor-pointer">
          <summary className="flex items-center justify-between text-base font-bold text-white select-none">
            <span>Como a margem real por projeto é apurada no Event Intelligence?</span>
            <ChevronDown className="w-4 h-4 text-cyan-400 transition-transform group-open:rotate-180" />
          </summary>
          <p className="mt-4 text-xs text-slate-300 leading-relaxed">
            O sistema confronta a receita contratada contra os custos lançados da montagem: almoxarifado, locação de mobiliário, fretes e remessas, diárias de montadores e aditivos, apurando a margem líquida real de cada estande.
          </p>
        </details>

      </div>

    </div>
  </section>

  {/*  CTA FINAL  */}
  <section className="py-24 px-6 border-t border-white/10 bg-gradient-to-b from-[#01143F] to-[#000511] text-center relative overflow-hidden">
    <div className="max-w-4xl mx-auto relative z-10">
      <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 flex items-center justify-center mx-auto mb-6">
        <Sparkles className="w-8 h-8" />
      </div>
      <h2 className="text-3xl sm:text-5xl font-black text-white">Pronto para transformar a sua operação?</h2>
      <p className="mt-5 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
        Converse diretamente com nossos especialistas e solicite uma demonstração ao vivo do DESIGN VLYNE ou do VLYNE Event Intelligence.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="https://wa.me/5511920480770?text=Ol%C3%A1!%20Quero%20uma%20demonstra%C3%A7%C3%A3o%20dos%20softwares%20da%20VLYNE." target="_blank" className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs font-black uppercase tracking-wider bg-[#00D4FF] text-[#01143F] hover:bg-cyan-300 transition glow-cyan flex items-center justify-center gap-2">
          <MessageCircle className="w-4 h-4" />
          <span>Falar com Consultor no WhatsApp</span>
        </a>
        <a href="https://design.vlyne.com.br/login" target="_blank" className="w-full sm:w-auto px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-wider border border-purple-500/40 bg-purple-950/30 hover:bg-purple-900/40 text-purple-300 transition flex items-center justify-center gap-2">
          <Box className="w-4 h-4 text-purple-400" />
          <span>Login DESIGN VLYNE</span>
        </a>
        <a href="https://eventos.vlyne.com.br" target="_blank" className="w-full sm:w-auto px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-wider border border-cyan-500/40 bg-cyan-950/30 hover:bg-cyan-900/40 text-cyan-300 transition flex items-center justify-center gap-2">
          <LayoutDashboard className="w-4 h-4 text-cyan-400" />
          <span>Login Event Intelligence</span>
        </a>
      </div>

      <p className="mt-12 text-xs font-mono text-slate-500">
        Atendimento direto: (11) 92048-0770 • São Paulo / SP • VLYNE Softwares Especializados
      </p>
    </div>
  </section>

  {/*  FOOTER  */}
  <footer className="py-12 px-6 bg-[#00040d] border-t border-white/5 text-slate-400 text-xs">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      
      <div className="flex items-center gap-4">
        <img 
          src="/vlyne_logo_horizontal.png" 
          alt="VLYNE Logo" 
          className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-md" 
        />
        <span className="text-[11px] text-slate-400 font-mono border-l border-white/15 pl-4">
          Inteligência que Impulsiona Decisões
        </span>
      </div>

      <div className="flex flex-wrap gap-6 text-slate-400 font-medium text-xs items-center">
        <a href="#design-vlyne" className="hover:text-purple-300">DESIGN VLYNE (Projeto 3D)</a>
        <a href="#event-intelligence" className="hover:text-cyan-300">VLYNE Event Intelligence (ERP)</a>
        <a href="#contratacao" className="hover:text-cyan-300">Contratação</a>
        <a href="#faq" className="hover:text-cyan-300">FAQ</a>
        <span className="text-white/20">|</span>
        <a href="https://design.vlyne.com.br/login" target="_blank" className="hover:text-purple-300 text-purple-400 font-semibold flex items-center gap-1.5"><Box className="w-3.5 h-3.5" /> Login DESIGN VLYNE</a>
        <a href="https://eventos.vlyne.com.br" target="_blank" className="hover:text-cyan-300 text-cyan-400 font-semibold flex items-center gap-1.5"><LayoutDashboard className="w-3.5 h-3.5" /> Login Event Intelligence</a>
      </div>

      <p className="text-slate-600 font-mono">© 2026 VLYNE. Todos os direitos reservados.</p>
    </div>
  </footer>

  


    </main>
  );
}
