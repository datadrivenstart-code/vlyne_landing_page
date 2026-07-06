import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Privacidade - VLYNE',
  description:
    'Política de Privacidade da VLYNE: quais dados coletamos, finalidade do tratamento, direitos do titular e como exercê-los, em conformidade com a LGPD.',
};

export default function PoliticaDePrivacidadePage() {
  return (
    <div className="min-h-screen bg-[#01143F] text-white font-sans">
      <header className="border-b border-white/10 py-6 px-5 sm:px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Image src="/vlyne-logo.png" alt="VLYNE Logo" width={140} height={48} className="h-10 w-auto object-contain" priority />
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-300 hover:text-cyan-100 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao site
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-5 sm:px-6 py-12 sm:py-16 space-y-10">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300">Legal</p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-black tracking-normal">Política de Privacidade</h1>
          <p className="mt-4 text-sm text-gray-400">Última atualização: julho de 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-black">1. Quem somos</h2>
          <p className="text-sm text-gray-300 leading-7">
            A VLYNE desenvolve plataformas de inteligência operacional (VLYNE Pulse Intelligence, VLYNE Event
            Intelligence e VLYNE Etiquetas Intelligence). Esta política explica como coletamos, usamos e protegemos
            os dados pessoais de visitantes deste site e de contatos comerciais, em conformidade com a Lei Geral de
            Proteção de Dados (Lei nº 13.709/2018 — LGPD).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-black">2. Quais dados coletamos</h2>
          <p className="text-sm text-gray-300 leading-7">Coletamos dados pessoais quando você:</p>
          <ul className="list-disc list-inside text-sm text-gray-300 leading-7 space-y-1">
            <li>Preenche o formulário de solicitação de diagnóstico/demonstração neste site: nome, nome da empresa, e-mail comercial, telefone/WhatsApp e produto de interesse.</li>
            <li>Entra em contato pelo WhatsApp comercial ou pelo e-mail contato@vlyne.com.br: seu número de telefone ou endereço de e-mail e o conteúdo da conversa.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-black">3. Finalidade do tratamento</h2>
          <p className="text-sm text-gray-300 leading-7">Usamos esses dados exclusivamente para:</p>
          <ul className="list-disc list-inside text-sm text-gray-300 leading-7 space-y-1">
            <li>Responder à sua solicitação de contato, diagnóstico ou demonstração comercial.</li>
            <li>Entender o cenário da sua empresa para apresentar a solução VLYNE adequada.</li>
            <li>Cumprir obrigações legais ou regulatórias, quando aplicável.</li>
          </ul>
          <p className="text-sm text-gray-300 leading-7">
            Não vendemos nem compartilhamos seus dados pessoais com terceiros para fins de marketing de terceiros.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-black">4. Armazenamento e segurança</h2>
          <p className="text-sm text-gray-300 leading-7">
            Os dados enviados pelo formulário são armazenados em nossa infraestrutura de banco de dados
            (Supabase), com acesso restrito à equipe comercial da VLYNE. Adotamos medidas técnicas e
            organizacionais razoáveis para proteger esses dados contra acesso não autorizado, perda ou uso
            indevido.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-black">5. Seus direitos como titular</h2>
          <p className="text-sm text-gray-300 leading-7">Nos termos da LGPD, você tem direito a:</p>
          <ul className="list-disc list-inside text-sm text-gray-300 leading-7 space-y-1">
            <li>Confirmar a existência de tratamento dos seus dados.</li>
            <li>Acessar, corrigir ou atualizar seus dados.</li>
            <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade com a lei.</li>
            <li>Solicitar a portabilidade dos seus dados a outro fornecedor.</li>
            <li>Revogar o consentimento e solicitar a exclusão dos dados que tratamos com base nele.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-black">6. Como exercer seus direitos</h2>
          <p className="text-sm text-gray-300 leading-7">
            Para exercer qualquer um dos direitos acima, entre em contato pelo e-mail{' '}
            <a href="mailto:contato@vlyne.com.br" className="text-cyan-300 hover:text-cyan-100 transition">
              contato@vlyne.com.br
            </a>{' '}
            ou pelo WhatsApp comercial +55 (11) 92048-0770. Responderemos sua solicitação dentro de um prazo
            razoável, conforme previsto na LGPD.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-black">7. Alterações desta política</h2>
          <p className="text-sm text-gray-300 leading-7">
            Podemos atualizar esta política periodicamente para refletir mudanças em nossas práticas ou em requisitos
            legais. A data da última atualização é sempre indicada no topo desta página.
          </p>
        </section>
      </main>
    </div>
  );
}
