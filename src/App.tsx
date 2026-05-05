import { useMemo, useState } from 'react';
import {
  Apple,
  ArrowDown,
  Baby,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock,
  HeartPulse,
  Leaf,
  Mail,
  Menu,
  MessageSquare,
  MonitorSmartphone,
  Phone,
  Quote,
  Scale,
  Send,
  ShieldCheck,
  Star,
  Stethoscope,
  UserRoundCheck,
  X,
} from 'lucide-react';

type ServiceKey = 'clinica' | 'mulher' | 'cirurgias' | 'online';

interface ServiceGroup {
  key: ServiceKey;
  title: string;
  description: string;
  icon: typeof Apple;
  items: string[];
}

interface Review {
  author: string;
  text: string;
}

const WHATSAPP_PHONE = '5562985851023';

const serviceGroups: ServiceGroup[] = [
  {
    key: 'clinica',
    title: 'Nutrição Clínica e Metabólica',
    description:
      'Acompanhamento para condições que exigem estratégia, constância e personalização, sem terrorismo nutricional.',
    icon: Stethoscope,
    items: [
      'Dietas para controle de diabetes',
      'Hipotireoidismo',
      'Nutrição especializada em obesidade',
      'Ganho de peso com saúde',
      'Dietas personalizadas',
    ],
  },
  {
    key: 'mulher',
    title: 'Saúde da Mulher, Gestação e Pós-parto',
    description:
      'Planos alimentares pensados para cada fase da vida feminina, respeitando rotina, sintomas, preferências e objetivos.',
    icon: Baby,
    items: [
      'Nutrição durante a gravidez',
      'Gestante',
      'Nutrição no pós-parto, amamentando ou não',
      'Nutrição para quem deseja engravidar',
      'Emagrecimento saudável para mulheres',
    ],
  },
  {
    key: 'cirurgias',
    title: 'Pré e Pós-operatório',
    description:
      'Estratégias nutricionais para preservar massa magra, favorecer recuperação, reduzir riscos e apoiar resultados cirúrgicos.',
    icon: ShieldCheck,
    items: [
      'Pré e pós-operatório de cirurgia bariátrica',
      'Pré e pós-operatório de cirurgia plástica',
      'Plano alimentar para recuperação',
      'Ajuste proteico e suplementação orientada',
    ],
  },
  {
    key: 'online',
    title: 'Consulta Online e Plano Sustentável',
    description:
      'Atendimento por WhatsApp com conduta prática, acompanhamento próximo e plano alimentar sem dietas restritivas.',
    icon: MonitorSmartphone,
    items: [
      'Nutricionista on-line',
      'Plano alimentar sem dietas restritivas',
      'Rotina alimentar realista',
      'Ajustes conforme evolução e preferências',
    ],
  },
];

const reviews: Review[] = [
  {
    author: 'Resumo de avaliação do Google',
    text:
      'Danielle é muito especial. Dei-lhe uma difícil demanda, ela compreendeu, entendeu o caso e foi extremamente cuidadosa na condução.',
  },
  {
    author: 'Pacientes no Google',
    text:
      'Atendimento acolhedor, explicações claras e plano alimentar possível de seguir na rotina real.',
  },
  {
    author: 'Avaliações verificadas',
    text:
      'Acompanhamento humanizado, com foco em resultados saudáveis e sem restrições exageradas.',
  },
];

const heroImage =
  'https://images.pexels.com/photos/5714335/pexels-photo-5714335.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=2000';

const consultationImage =
  'https://images.pexels.com/photos/15319047/pexels-photo-15319047.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200';

const foodImage =
  'https://images.pexels.com/photos/8844387/pexels-photo-8844387.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200';

const diabetesImage =
  'https://images.pexels.com/photos/11852051/pexels-photo-11852051.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceKey>('clinica');
  const [toast, setToast] = useState<string | null>(null);
  const [form, setForm] = useState({
    nome: '',
    telefone: '',
    objetivo: 'Emagrecimento saudável para mulheres',
    modalidade: 'Consulta online',
    preferencia: '',
    mensagem: '',
  });
  const [newsletter, setNewsletter] = useState('');

  const activeService = useMemo(
    () => serviceGroups.find((service) => service.key === selectedService) ?? serviceGroups[0],
    [selectedService],
  );

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 3600);
  };

  const openWhatsApp = (message: string) => {
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleBooking = (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.nome.trim() || !form.telefone.trim() || !form.preferencia.trim()) {
      showToast('Preencha nome, telefone e preferência de horário para solicitar o agendamento.');
      return;
    }

    const message = `Olá, Nutricionista Danielle Vinhal. Gostaria de agendar uma consulta.\n\nNome: ${form.nome}\nTelefone: ${form.telefone}\nObjetivo principal: ${form.objetivo}\nModalidade desejada: ${form.modalidade}\nPreferência de dia/horário: ${form.preferencia}\nMensagem adicional: ${form.mensagem || 'Nenhuma'}\n\nSolicitação enviada pelo site.`;

    showToast('Solicitação preparada. Abrindo WhatsApp para confirmação.');
    openWhatsApp(message);
  };

  const handleNewsletter = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newsletter.includes('@')) {
      showToast('Informe um e-mail válido para receber conteúdos de nutrição.');
      return;
    }
    setNewsletter('');
    showToast('Cadastro realizado. Você receberá conteúdos e orientações da nutricionista.');
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F3EA] text-[#243126] selection:bg-[#2F6B4F] selection:text-white font-body">
      {toast && (
        <div className="fixed right-4 top-4 z-50 max-w-sm rounded-2xl border border-[#D8C7A6] bg-white/95 px-5 py-4 text-sm text-[#243126] shadow-xl backdrop-blur">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#2F6B4F]" />
            <span>{toast}</span>
          </div>
        </div>
      )}

      <header className="fixed inset-x-0 top-0 z-40 border-b border-[#E5DCC9]/80 bg-[#F7F3EA]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#inicio" className="flex items-center gap-3" aria-label="Ir para início">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#B88746]/40 bg-[#EFE6D4] shadow-inner">
              <span className="logo-im text-xl font-black italic text-[#2F6B4F]">DV</span>
            </div>
            <div className="leading-tight">
              <span className="block font-heading text-xl font-bold text-[#243126] sm:text-2xl">
                Danielle Vinhal
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7D8F54]">
                Nutricionista
              </span>
            </div>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {[
              ['Início', '#inicio'],
              ['Sobre', '#sobre'],
              ['Serviços', '#servicos'],
              ['Método', '#metodo'],
              ['Avaliações', '#avaliacoes'],
              ['Agendar', '#agendamento'],
            ].map(([label, href]) => (
              <a key={href} href={href} className="text-xs font-semibold uppercase tracking-[0.15em] text-[#445544] transition hover:text-[#2F6B4F]">
                {label}
              </a>
            ))}
          </nav>

          <a
            href="#agendamento"
            className="hidden rounded-full bg-[#2F6B4F] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-sm transition hover:bg-[#254F3D] lg:inline-flex"
          >
            Agendar consulta
          </a>

          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex rounded-full border border-[#D8C7A6] bg-white/60 p-2 text-[#243126] md:hidden"
            aria-label="Abrir menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-[#E5DCC9] bg-[#F7F3EA] px-4 py-4 md:hidden">
            <div className="mx-auto grid max-w-7xl gap-2">
              {[
                ['Início', '#inicio'],
                ['Sobre', '#sobre'],
                ['Serviços', '#servicos'],
                ['Método', '#metodo'],
                ['Avaliações', '#avaliacoes'],
                ['Agendar consulta', '#agendamento'],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-[#445544] transition hover:bg-[#EFE6D4] hover:text-[#2F6B4F]"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <section id="inicio" className="relative flex min-h-screen items-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Alimentos frescos e planejamento nutricional" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F7F3EA] via-[#F7F3EA]/88 to-[#F7F3EA]/25" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#F7F3EA] to-transparent" />
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#7D8F54]">
              Nutricionista Danielle Vinhal
            </p>
            <h1 className="font-heading text-5xl font-bold leading-[1.05] text-[#243126] sm:text-6xl lg:text-7xl">
              Nutrição feita para a sua vida real
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#445544] sm:text-lg">
              Consulta humanizada para emagrecimento saudável, obesidade, diabetes, gestação, pós-parto, bariátrica, cirurgia plástica e rotina alimentar sem dietas restritivas.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#agendamento"
                className="inline-flex items-center justify-center rounded-full bg-[#2F6B4F] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-[#2F6B4F]/15 transition hover:-translate-y-0.5 hover:bg-[#254F3D]"
              >
                Agendar avaliação
              </a>
              <a
                href="#servicos"
                className="inline-flex items-center justify-center rounded-full border border-[#CDB98E] bg-white/70 px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#2F6B4F] transition hover:-translate-y-0.5 hover:border-[#2F6B4F]"
              >
                Conhecer serviços
              </a>
            </div>
          </div>
        </div>

        <a href="#sobre" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#2F6B4F]" aria-label="Rolar para próxima seção">
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </a>
      </section>

      <section id="sobre" className="bg-[#F7F3EA] py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-[#E5DCC9] bg-white shadow-sm">
            <img src={consultationImage} alt="Consulta nutricional personalizada" className="h-full min-h-[420px] w-full object-cover" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#7D8F54]">Atendimento com escuta e estratégia</p>
            <h2 className="mt-4 font-heading text-4xl font-bold leading-tight text-[#243126] sm:text-5xl">
              Plano alimentar possível, acompanhamento próximo e metas sustentáveis
            </h2>
            <p className="mt-6 text-base leading-8 text-[#536353]">
              A Nutricionista Danielle Vinhal atende pacientes que buscam transformar a alimentação com clareza, acolhimento e condutas baseadas no contexto de cada pessoa. A proposta é orientar sem culpa, sem excesso de restrições e com foco em evolução real.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {[
                { icon: Star, label: '5,0 no Google', detail: '82 avaliações registradas' },
                { icon: Clock, label: 'Horário informado', detail: 'Fechado, abre quarta às 06:00' },
                { icon: MonitorSmartphone, label: 'Atendimento online', detail: 'Agendamento direto pelo WhatsApp' },
                { icon: HeartPulse, label: 'Cuidado clínico', detail: 'Da mulher, metabolismo e cirurgias' },
              ].map((item) => (
                <div key={item.label} className="flex gap-3 border-l border-[#CDB98E] pl-4">
                  <item.icon className="mt-1 h-5 w-5 flex-shrink-0 text-[#2F6B4F]" />
                  <div>
                    <p className="font-heading text-lg font-bold text-[#243126]">{item.label}</p>
                    <p className="text-sm text-[#657465]">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => openWhatsApp('Olá, Danielle Vinhal. Gostaria de informações sobre a consulta nutricional.')}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2F6B4F] px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#254F3D]"
              >
                <MessageSquare className="h-4 w-4" />
                Falar pelo WhatsApp
              </button>
              <a
                href="tel:62985851023"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#CDB98E] bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#2F6B4F] transition hover:border-[#2F6B4F]"
              >
                <Phone className="h-4 w-4" />
                Ligar agora
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="servicos" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#7D8F54]">Serviços de nutrição</p>
            <h2 className="mt-4 font-heading text-4xl font-bold text-[#243126] sm:text-5xl">
              Estratégias para objetivos diferentes, sempre com individualidade
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#657465] sm:text-base">
              Escolha uma área de atendimento para ver os principais serviços oferecidos por Danielle Vinhal.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="grid gap-3">
              {serviceGroups.map((service) => (
                <button
                  key={service.key}
                  onClick={() => setSelectedService(service.key)}
                  className={`flex items-center gap-4 rounded-3xl border px-5 py-5 text-left transition ${
                    selectedService === service.key
                      ? 'border-[#2F6B4F] bg-[#EFF4E8] shadow-sm'
                      : 'border-[#E5DCC9] bg-[#FBF8F1] hover:border-[#7D8F54]'
                  }`}
                >
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-white text-[#2F6B4F] shadow-sm">
                    <service.icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-heading text-xl font-bold text-[#243126]">{service.title}</span>
                    <span className="mt-1 block text-sm leading-6 text-[#657465]">{service.description}</span>
                  </span>
                </button>
              ))}
            </div>

            <div className="rounded-[2rem] border border-[#E5DCC9] bg-[#F7F3EA] p-6 shadow-sm sm:p-8">
              <div className="flex flex-col gap-6 md:flex-row">
                <div className="md:w-5/12">
                  <div className="overflow-hidden rounded-[1.5rem] border border-[#E5DCC9] bg-white">
                    <img
                      src={selectedService === 'clinica' ? diabetesImage : selectedService === 'online' ? consultationImage : foodImage}
                      alt={activeService.title}
                      className="h-64 w-full object-cover md:h-full"
                    />
                  </div>
                </div>
                <div className="md:w-7/12">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#7D8F54]">Área selecionada</p>
                  <h3 className="mt-3 font-heading text-3xl font-bold text-[#243126]">{activeService.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#657465]">{activeService.description}</p>
                  <ul className="mt-6 grid gap-3">
                    {activeService.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-[#445544]">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#2F6B4F]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => {
                      setForm((prev) => ({ ...prev, objetivo: activeService.items[0] }));
                      document.getElementById('agendamento')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#2F6B4F] px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#254F3D]"
                  >
                    Solicitar este atendimento <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="metodo" className="bg-[#F7F3EA] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#7D8F54]">Método de acompanhamento</p>
            <h2 className="mt-4 font-heading text-4xl font-bold text-[#243126] sm:text-5xl">
              Da primeira conversa ao ajuste do plano alimentar
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: ClipboardList,
                title: 'Anamnese completa',
                text: 'Entendimento de exames, sintomas, rotina, histórico, preferências e relação com a comida.',
              },
              {
                icon: Scale,
                title: 'Plano sem restrições extremas',
                text: 'Estrutura alimentar compatível com sua rotina, seus objetivos e suas necessidades clínicas.',
              },
              {
                icon: UserRoundCheck,
                title: 'Acompanhamento evolutivo',
                text: 'Ajustes conforme resposta do corpo, adesão, fase de vida, sintomas e metas combinadas.',
              },
            ].map((step, index) => (
              <div key={step.title} className="relative rounded-[2rem] border border-[#E5DCC9] bg-white p-7 shadow-sm">
                <span className="absolute right-7 top-5 font-heading text-5xl font-bold text-[#E5DCC9]">0{index + 1}</span>
                <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EFF4E8] text-[#2F6B4F]">
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-[#243126]">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#657465]">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="avaliacoes" className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#7D8F54]">Avaliações do Google</p>
            <h2 className="mt-4 font-heading text-4xl font-bold text-[#243126] sm:text-5xl">
              Nota 5,0 com 82 avaliações
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#657465]">
              A reputação da Nutricionista Danielle Vinhal reflete um atendimento acolhedor, técnico e orientado para resultados saudáveis.
            </p>
            <div className="mt-7 flex items-center gap-2 text-[#B88746]">
              {[...Array(5)].map((_, index) => (
                <Star key={index} className="h-5 w-5 fill-current" />
              ))}
              <span className="ml-2 text-sm font-bold text-[#243126]">5,0 de 5,0</span>
            </div>
          </div>

          <div className="grid gap-5">
            {reviews.map((review) => (
              <article key={review.author} className="rounded-[2rem] border border-[#E5DCC9] bg-[#F7F3EA] p-6 shadow-sm">
                <Quote className="h-6 w-6 text-[#7D8F54]" />
                <p className="mt-4 font-cosmetic text-xl leading-8 text-[#445544]">{review.text}</p>
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-[#2F6B4F]">{review.author}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="agendamento" className="bg-[#F7F3EA] py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#7D8F54]">Agendamento</p>
            <h2 className="mt-4 font-heading text-4xl font-bold text-[#243126] sm:text-5xl">
              Solicite sua consulta pelo WhatsApp
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#657465]">
              Preencha o formulário e envie uma mensagem estruturada para confirmar disponibilidade de horário com Danielle Vinhal.
            </p>

            <div className="mt-8 grid gap-4 text-sm text-[#445544]">
              <a href="tel:62985851023" className="flex items-center gap-3 rounded-2xl border border-[#E5DCC9] bg-white px-5 py-4 transition hover:border-[#2F6B4F]">
                <Phone className="h-5 w-5 text-[#2F6B4F]" />
                <span>(62) 98585-1023</span>
              </a>
              <button
                onClick={() => openWhatsApp('Olá, Nutricionista Danielle Vinhal. Gostaria de agendar uma consulta.')}
                className="flex items-center gap-3 rounded-2xl border border-[#E5DCC9] bg-white px-5 py-4 text-left transition hover:border-[#2F6B4F]"
              >
                <MessageSquare className="h-5 w-5 text-[#2F6B4F]" />
                <span>Atendimento e compromissos via WhatsApp</span>
              </button>
              <div className="flex items-center gap-3 rounded-2xl border border-[#E5DCC9] bg-white px-5 py-4">
                <Clock className="h-5 w-5 text-[#2F6B4F]" />
                <span>Fechado agora. Abre quarta-feira às 06:00</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleBooking} className="rounded-[2rem] border border-[#E5DCC9] bg-white p-5 shadow-sm sm:p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#657465]">
                Nome completo
                <input
                  value={form.nome}
                  onChange={(event) => setForm((prev) => ({ ...prev, nome: event.target.value }))}
                  className="rounded-2xl border border-[#E5DCC9] bg-[#FBF8F1] px-4 py-3 text-sm font-normal normal-case tracking-normal text-[#243126] outline-none transition focus:border-[#2F6B4F]"
                  placeholder="Seu nome"
                />
              </label>
              <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#657465]">
                WhatsApp
                <input
                  value={form.telefone}
                  onChange={(event) => setForm((prev) => ({ ...prev, telefone: event.target.value }))}
                  className="rounded-2xl border border-[#E5DCC9] bg-[#FBF8F1] px-4 py-3 text-sm font-normal normal-case tracking-normal text-[#243126] outline-none transition focus:border-[#2F6B4F]"
                  placeholder="(62) 98585-1023"
                />
              </label>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#657465]">
                Objetivo principal
                <select
                  value={form.objetivo}
                  onChange={(event) => setForm((prev) => ({ ...prev, objetivo: event.target.value }))}
                  className="rounded-2xl border border-[#E5DCC9] bg-[#FBF8F1] px-4 py-3 text-sm font-normal normal-case tracking-normal text-[#243126] outline-none transition focus:border-[#2F6B4F]"
                >
                  {serviceGroups.flatMap((service) => service.items).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#657465]">
                Modalidade
                <select
                  value={form.modalidade}
                  onChange={(event) => setForm((prev) => ({ ...prev, modalidade: event.target.value }))}
                  className="rounded-2xl border border-[#E5DCC9] bg-[#FBF8F1] px-4 py-3 text-sm font-normal normal-case tracking-normal text-[#243126] outline-none transition focus:border-[#2F6B4F]"
                >
                  <option>Consulta online</option>
                  <option>Consulta presencial</option>
                  <option>Quero confirmar a melhor modalidade</option>
                </select>
              </label>
            </div>

            <label className="mt-4 grid gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#657465]">
              Melhor dia e horário
              <input
                value={form.preferencia}
                onChange={(event) => setForm((prev) => ({ ...prev, preferencia: event.target.value }))}
                className="rounded-2xl border border-[#E5DCC9] bg-[#FBF8F1] px-4 py-3 text-sm font-normal normal-case tracking-normal text-[#243126] outline-none transition focus:border-[#2F6B4F]"
                placeholder="Ex: quarta pela manhã ou sexta à tarde"
              />
            </label>

            <label className="mt-4 grid gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#657465]">
              Mensagem adicional
              <textarea
                value={form.mensagem}
                onChange={(event) => setForm((prev) => ({ ...prev, mensagem: event.target.value }))}
                className="min-h-28 resize-none rounded-2xl border border-[#E5DCC9] bg-[#FBF8F1] px-4 py-3 text-sm font-normal normal-case tracking-normal text-[#243126] outline-none transition focus:border-[#2F6B4F]"
                placeholder="Conte brevemente seu objetivo, diagnóstico ou dúvida principal."
              />
            </label>

            <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2F6B4F] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-[#2F6B4F]/15 transition hover:bg-[#254F3D]">
              <Send className="h-4 w-4" />
              Enviar solicitação
            </button>
          </form>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#7D8F54]">Dúvidas frequentes</p>
            <h2 className="mt-4 font-heading text-3xl font-bold text-[#243126] sm:text-4xl">
              Antes da primeira consulta
            </h2>
          </div>
          <div className="mt-10 grid gap-4">
            {[
              ['A consulta online funciona para emagrecimento?', 'Sim. O atendimento online permite avaliar rotina, sintomas, histórico, preferências e organizar um plano alimentar individualizado com acompanhamento e ajustes.'],
              ['O plano alimentar é restritivo?', 'A proposta é construir um plano possível, sem dietas extremamente restritivas, respeitando fome, rotina, contexto familiar e objetivos clínicos.'],
              ['Danielle atende gestantes e pós-parto?', 'Sim. Entre os serviços estão nutrição durante a gravidez, gestante, pós-parto e nutrição para quem deseja engravidar.'],
              ['Atende pré e pós-operatório?', 'Sim. Há acompanhamento para cirurgia bariátrica e cirurgia plástica, com foco em recuperação, manutenção de massa magra e adequação nutricional.'],
            ].map(([question, answer]) => (
              <details key={question} className="group rounded-3xl border border-[#E5DCC9] bg-[#F7F3EA] p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-lg font-bold text-[#243126]">
                  {question}
                  <ChevronRight className="h-5 w-5 text-[#2F6B4F] transition group-open:rotate-90" />
                </summary>
                <p className="mt-4 text-sm leading-7 text-[#657465]">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#E5DCC9] bg-[#F7F3EA] py-12">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#B88746]/40 bg-[#EFE6D4]">
                <span className="logo-im text-lg font-black italic text-[#2F6B4F]">DV</span>
              </div>
              <div>
                <p className="font-heading text-xl font-bold text-[#243126]">Nutricionista Danielle Vinhal</p>
                <p className="text-xs uppercase tracking-[0.22em] text-[#7D8F54]">Nutrição clínica e atendimento online</p>
              </div>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#657465]">
              Acompanhamento nutricional para diabetes, obesidade, saúde da mulher, gestação, pós-parto, pré e pós-operatório, ganho de peso e planos sem dietas restritivas.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-lg font-bold text-[#243126]">Contato</h3>
            <div className="mt-4 grid gap-3 text-sm text-[#657465]">
              <a href="tel:62985851023" className="flex items-center gap-2 transition hover:text-[#2F6B4F]">
                <Phone className="h-4 w-4" /> (62) 98585-1023
              </a>
              <button
                onClick={() => openWhatsApp('Olá, gostaria de agendar uma consulta com a Nutricionista Danielle Vinhal.')}
                className="flex items-center gap-2 text-left transition hover:text-[#2F6B4F]"
              >
                <MessageSquare className="h-4 w-4" /> WhatsApp
              </button>
              <a href="#avaliacoes" className="flex items-center gap-2 transition hover:text-[#2F6B4F]">
                <Star className="h-4 w-4" /> 5,0 no Google
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-lg font-bold text-[#243126]">Conteúdos</h3>
            <form onSubmit={handleNewsletter} className="mt-4 grid gap-3">
              <input
                value={newsletter}
                onChange={(event) => setNewsletter(event.target.value)}
                className="rounded-full border border-[#E5DCC9] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#2F6B4F]"
                placeholder="Seu e-mail"
              />
              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2F6B4F] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#254F3D]">
                <Mail className="h-4 w-4" /> Cadastrar
              </button>
            </form>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-[#E5DCC9] px-4 pt-6 text-xs text-[#7C8A7C] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>Todos os direitos reservados. Site desenvolvido para Nutricionista Danielle Vinhal.</p>
          <div className="flex items-center gap-2">
            <Leaf className="h-4 w-4 text-[#2F6B4F]" />
            <span>Nutrição sem extremismos, com ciência e acolhimento.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}