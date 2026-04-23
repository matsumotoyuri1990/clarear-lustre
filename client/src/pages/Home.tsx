import { useState, useEffect } from 'react';
import {
  Shield,
  Sparkles,
  Heart,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  Eye,
  AlertCircle,
  Lock,
} from 'lucide-react';
import { BeforeAfterSlider } from '@/components/BeforeAfterSlider';
import { BenefitCard } from '@/components/BenefitCard';
import { ProcessStep } from '@/components/ProcessStep';
import { FAQ } from '@/components/FAQ';
import { ExitIntentPopup } from '@/components/ExitIntentPopup';

const WHATSAPP_NUMBER = '5514991812871'; // Clarear Vidros WhatsApp
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Olá! Visitei a página de vocês e gostaria de uma avaliação para o meu lustre. Segue a foto dele para que possam analisar a complexidade e me orientar sobre o serviço adequado.'
);

const faqItems = [
  {
    question: 'Precisa desmontar o lustre e levar para outro lugar?',
    answer:
      'Na maioria dos casos, o serviço é realizado no próprio local, com isolamento e proteção do ambiente. Desmontagens só ocorrem em casos extremos de restauração profunda.',
  },
  {
    question: 'Qualquer lustre pode ser restaurado?',
    answer:
      'A grande maioria pode recuperar seu brilho e beleza. Porém, a avaliação inicial via foto é fundamental para sermos honestos sobre o resultado esperado.',
  },
  {
    question: 'Vocês atendem em quais cidades?',
    answer:
      'Atendemos Bauru e região. Consulte a disponibilidade para a sua cidade no WhatsApp.',
  },
  {
    question: 'Como funciona a avaliação?',
    answer:
      'Você envia uma foto nítida da peça. Com base no tamanho, material e estado, definimos a complexidade e o nível de serviço necessário.',
  },
  {
    question: 'O lustre fica como novo?',
    answer:
      'Nosso objetivo é devolver o brilho e a beleza da peça. O resultado depende do desgaste anterior, mas a melhora é sempre visível.',
  },
];

export default function Home() {
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [exitPopupShown, setExitPopupShown] = useState(false);

  useEffect(() => {
    // Add structured data (schema.json) for SEO
    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'Clarear Vidros - Limpeza e Restauracao de Lustres',
      'description': 'Especialistas em limpeza tecnica e restauracao de lustres delicados em Bauru',
      'url': 'https://lustrestech-nvfceptn.manus.space',
      'telephone': '+5514991812871',
      'areaServed': 'Bauru, SP',
      'serviceType': 'Limpeza de Lustres, Restauracao de Cristais',
      'priceRange': '$$',
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemaData);
    document.head.appendChild(script);

    const handleScroll = () => {
      setShowFloatingButton(window.scrollY > 1500);
      
      // Track scroll depth for engagement
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercentage >= 25 && !(window as any).ga_25_tracked) {
        (window as any).ga_25_tracked = true;
        if ((window as any).gtag) {
          (window as any).gtag('event', 'scroll_depth', {
            'depth': '25%'
          });
        }
      }
      if (scrollPercentage >= 50 && !(window as any).ga_50_tracked) {
        (window as any).ga_50_tracked = true;
        if ((window as any).gtag) {
          (window as any).gtag('event', 'scroll_depth', {
            'depth': '50%'
          });
        }
      }
      if (scrollPercentage >= 75 && !(window as any).ga_75_tracked) {
        (window as any).ga_75_tracked = true;
        if ((window as any).gtag) {
          (window as any).gtag('event', 'scroll_depth', {
            'depth': '75%'
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      script.remove();
    };
  }, []);

  // Exit Intent Detection with 30-second delay
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let canShowPopup = false;

    // Wait 30 seconds before allowing popup to show
    timeoutId = setTimeout(() => {
      canShowPopup = true;
    }, 30000);

    const handleMouseLeave = (e: MouseEvent) => {
      // Only show popup if user hasn't seen it yet, 30 seconds have passed, and mouse is leaving from top
      if (!exitPopupShown && canShowPopup && e.clientY <= 0) {
        setShowExitPopup(true);
        setExitPopupShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [exitPopupShown]);

  const openWhatsApp = (source = 'unknown') => {
    // Track WhatsApp click with conversion event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'whatsapp_click', {
        'source': source,
        'event_category': 'engagement',
        'event_label': `WhatsApp - ${source}`
      });
      // Track as conversion
      (window as any).gtag('event', 'conversion', {
        'source': source,
        'conversion_type': 'whatsapp_click'
      });
    }
    // Fallback: Log to console for debugging
    console.log(`WhatsApp clicked from: ${source}`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Exit Intent Popup */}
      {showExitPopup && (
        <ExitIntentPopup
          onClose={() => setShowExitPopup(false)}
          onWhatsAppClick={() => {
            openWhatsApp('exit-intent-popup');
            setShowExitPopup(false);
          }}
        />
      )}
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              'url(https://d2xsxph8kpxj0f.cloudfront.net/310419663031655682/nvfCEPTNPYqm8ZcWcfkBt4/hero-chandelier-dH2qxo7BHWLp7YhAKZPfjG.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
              Lustre não é difícil de limpar. <span className="gradient-accent">É fácil de errar.</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
              Envie uma foto e entenda qual é o cuidado certo para o seu lustre.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => openWhatsApp('hero-cta')}
                className="btn-secondary flex items-center justify-center gap-2 group"
              >
                <MessageCircle className="w-5 h-5" />
                Enviar foto para avaliação
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <p className="text-sm text-primary-foreground/70 mt-6">
              ✓ Sem compromisso • Resposta direta pelo WhatsApp
            </p>
          </div>
        </div>
      </section>

      {/* PAIN POINTS SECTION */}
      <section className="section-spacing bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-center">
              Você tem um lustre bonito.
            </h2>
            <div className="divider-gold mb-12"></div>
            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
              Mas com o tempo ele foi ficando opaco…<br />
              perdendo o brilho…<br />
              e hoje você evita mexer.
            </p>
            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
              Não porque não quer limpar.
            </p>
            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
              Mas porque sabe que pode dar problema.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Já tentou e não ficou bom',
                'Usou produto comum e manchou',
                'Não consegue alcançar direito',
                'E contratar "qualquer um" parece arriscado demais',
              ].map((pain, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-lg bg-muted/30 border border-border">
                  {idx === 0 ? <Eye className="w-6 h-6 text-secondary flex-shrink-0 mt-1" /> : idx === 1 ? <AlertCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" /> : idx === 2 ? <Lock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" /> : <Heart className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />}
                  <p className="text-foreground/80">{pain}</p>
                </div>
              ))}
            </div>
            <p className="text-lg text-foreground/80 mt-8 leading-relaxed">
              Você foi deixando.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              E o brilho foi sumindo aos poucos.
            </p>
          </div>
        </div>
      </section>

      {/* BEFORE/AFTER SECTION */}
      <section className="section-spacing bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-center">
              Veja a diferença na prática
            </h2>
            <div className="divider-gold mb-12"></div>
            <p className="text-center text-foreground/80 mb-8 text-lg">
              Mesmo lustre. Mesmo ângulo. Mesmo ambiente.<br />
              O que muda é o estado da peça.
            </p>
            <div className="relative">
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none">
                <div className="flex items-center gap-2 bg-black/50 text-white px-3 py-1.5 rounded-full text-xs font-medium">
                  <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19l7-7-7-7" />
                  </svg>
                  Arraste para comparar
                </div>
              </div>
              <BeforeAfterSlider 
                beforeImage="/manus-storage/chandelier-full-before_699bf310.webp"
                afterImage="/manus-storage/chandelier-full-after_1cfa833f.webp"
              />
            </div>
            <p className="text-center text-sm text-foreground/70 italic mt-8">
              O resultado depende do estado anterior.<br />
              Mas a diferença costuma ser visível quando o processo é feito corretamente.
            </p>
          </div>
        </div>
      </section>

      {/* BELIEF BREAKER SECTION */}
      <section className="section-spacing bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              O problema não é só sujeira.
            </h2>
            <div className="divider-gold mb-12"></div>
            <p className="text-lg md:text-xl leading-relaxed mb-6">
              Um lustre de cristal não é uma peça simples.
            </p>
            <p className="text-lg md:text-xl leading-relaxed mb-6">
              Ele envolve:
            </p>
            <div className="bg-primary-foreground/10 border-l-4 border-secondary p-6 rounded-lg text-left mb-6">
              <ul className="space-y-3 text-lg leading-relaxed">
                <li>• cristais presos por encaixes delicados</li>
                <li>• estrutura metálica sensível</li>
                <li>• fios elétricos que não toleram produto errado</li>
              </ul>
            </div>
            <p className="text-lg md:text-xl leading-relaxed mb-6">
              Quando você tenta limpar com produto comum, o problema não é "não funcionar bem".
            </p>
            <p className="text-lg md:text-xl leading-relaxed mb-6">
              É:
            </p>
            <div className="bg-primary-foreground/10 border-l-4 border-secondary p-6 rounded-lg text-left mb-6">
              <ul className="space-y-3 text-lg leading-relaxed">
                <li>• deixar resíduos que atacam o metal</li>
                <li>• enfraquecer a estrutura com o tempo</li>
                <li>• manchar o cristal de forma permanente</li>
                <li>• correr risco de soltar peças</li>
              </ul>
            </div>
            <p className="text-2xl font-semibold mt-8">
              <span className="font-bold">O custo real não é a limpeza.</span>
            </p>
            <p className="text-2xl font-semibold">
              <span className="font-bold">É o dano que vem depois.</span>
            </p>
          </div>
        </div>
      </section>

      {/* SERVICE EXPLANATION SECTION */}
      <section className="section-spacing bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12 text-center">
              Não é uma limpeza comum.
            </h2>
            <div className="divider-gold mb-12"></div>
            <p className="text-center text-foreground/80 font-semibold mb-12 text-lg">
              É um processo.
            </p>

            <div className="p-8 rounded-lg border-2 border-border bg-muted/20 mb-6">
              <h3 className="text-2xl font-semibold text-foreground mb-4">Passo 1: Você envia uma foto</h3>
              <p className="text-foreground/70 leading-relaxed">Uma imagem clara já permite entender bastante coisa: tipo de lustre, estado e nível de cuidado necessário.</p>
            </div>

            <div className="p-8 rounded-lg border-2 border-border bg-muted/20 mb-6">
              <h3 className="text-2xl font-semibold text-foreground mb-4">Passo 2: Você recebe uma análise</h3>
              <p className="text-foreground/70 leading-relaxed">Você recebe uma orientação direta: o que dá pra fazer, nível de complexidade e próximos passos.</p>
            </div>

            <div className="p-8 rounded-lg border-2 border-border bg-muted/20 mb-6">
              <h3 className="text-2xl font-semibold text-foreground mb-4">Passo 3: Execução no local</h3>
              <p className="text-foreground/70 leading-relaxed">Se fizer sentido seguir, o ambiente é protegido, os materiais são escolhidos corretamente e cada parte é tratada com cuidado.</p>
            </div>

            <p className="text-center text-foreground/80 font-semibold mt-12 text-lg">
              O resultado depende do estado da peça, mas o objetivo é recuperar o máximo possível com segurança.
            </p>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="section-spacing bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12">
              O Que Você Ganha
            </h2>
            <div className="divider-gold mb-12"></div>

            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              Você não precisa testar produto
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              não precisa subir em escada
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed mb-12">
              não precisa correr risco de danificar
            </p>

            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              Você entende o que está sendo feito
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed mb-12">
              e o que pode esperar
            </p>

            <p className="text-lg text-foreground/80 leading-relaxed">
              E o seu lustre volta a fazer sentido no ambiente
            </p>
          </div>
        </div>
      </section>

      {/* CRYSTAL DETAIL BEFORE/AFTER SECTION */}
      <section className="section-spacing bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-center">
              Veja a diferença que faz.
            </h2>
            <div className="divider-gold mb-12"></div>
            <p className="text-center text-foreground/80 mb-8 text-lg">
              Detalhe do cristal antes e depois do processo de limpeza profissional.
            </p>
            <div className="relative">
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none">
                <div className="flex items-center gap-2 bg-black/50 text-white px-3 py-1.5 rounded-full text-xs font-medium">
                  <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19l7-7-7-7" />
                  </svg>
                  Arraste para comparar
                </div>
              </div>
              <BeforeAfterSlider 
                beforeImage="/manus-storage/crystal-dirty-detail_d259dd29.webp"
                afterImage="/manus-storage/crystal-clean-detail_9ac1d51a.webp"
                beforeLabel="Antes"
                afterLabel="Depois"
              />
            </div>
            <p className="text-center text-sm text-foreground/70 italic mt-8">
              O que você está vendo: É o resultado de limpeza profunda, remoção de oxidação, e cuidado com cada detalhe. O cristal que estava opaco fica translúcido novamente. A luz passa. O brilho volta.
            </p>
          </div>
        </div>
      </section>

      {/* PLACEHOLDER BENEFITS GRID - HIDDEN */}
      <div style={{display: 'none'}}>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        </div>
      </div>

      {/* FOR WHOM SECTION */}
      <section className="section-spacing bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-center">
            Esse serviço é para você se...
          </h2>
          <div className="divider-gold mb-12 max-w-xs mx-auto"></div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* For Whom */}
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-secondary" />
                Você tem um lustre que realmente importa
              </h3>
              <ul className="space-y-4">
                {[
                  'Tem um lustre de cristal, antigo ou de valor emocional',
                  'Já tentou limpar e não deu certo — ou tem medo de tentar',
                  'Prefere pagar uma vez e ficar tranquilo, do que pagar barato e se arrepender depois',
                  'Quer que sua peça dure décadas',
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-foreground/80">
                    <span className="text-secondary font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not For Whom */}
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <span className="text-destructive">✕</span>
                Esse serviço NÃO é para você se
              </h3>
              <ul className="space-y-4">
                {[
                  'Você quer a opção mais barata do mercado',
                  'Seu lustre é um objeto comum sem valor especial',
                  'Acredita que limpeza é limpeza, independente de quem faz',
                  'Está apenas curioso, não realmente interessado em restaurar',
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-foreground/80">
                    <span className="text-destructive font-bold">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="section-spacing bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-center">
            Como começar em 3 passos simples.
          </h2>
          <div className="divider-gold mb-12 max-w-xs mx-auto"></div>

          <div className="max-w-2xl mx-auto space-y-8">
            <ProcessStep
              number={1}
              title="Envie uma Foto"
              description="Abra o WhatsApp e tire uma foto clara do seu lustre mostrando tamanho e detalhes. Se souber a altura aproximada, inclua. Pronto."
            />
            <ProcessStep
              number={2}
              title="Receba uma Avaliação (Até 2 Horas)"
              description="Nós analisamos sua foto e respondemos com: tipo de lustre, nível de complexidade, o que pode ser feito, tempo aproximado de trabalho, e próximos passos. Sem compromisso."
            />
            <ProcessStep
              number={3}
              title="Agende o Serviço (Se Quiser)"
              description="Se gostar da avaliação, agendamos um dia que funcione para você. Nós vamos até o seu local, fazemos o trabalho com cuidado, e você fica com seu lustre restaurado. Não quer agendar? Sem problema."
              isLast
            />
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => openWhatsApp('benefits-cta')}
              className="btn-secondary inline-flex items-center gap-2 group"
            >
              <MessageCircle className="w-5 h-5" />
              Enviar Foto Agora — Resposta em 2 Horas
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="section-spacing bg-gradient-to-br from-secondary/10 to-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-center">
            Clientes que confiaram em nós.
          </h2>
          <div className="divider-gold mb-12 max-w-xs mx-auto"></div>

          <div className="grid md:grid-cols-1 gap-8 max-w-3xl mx-auto">
            {[
              {
                quote: 'Meu lustre estava tão sujo que pensei em jogar fora. Ficou brilhante novamente.',
                author: 'Dra. Marina',
                context: 'Clínica Odontológica, Bauru',
                detail: 'Tinha um lustre de cristal na sala de espera que estava embaçado há anos. Quando a Clarear Vidros limpou, ficou tão brilhante que os pacientes comentam até hoje. Recomendo.',
              },
              {
                quote: 'Profissional que realmente entende do assunto. Não é só limpeza.',
                author: 'João Paulo',
                context: 'Residência, Bauru',
                detail: 'Herdei um lustre antigo da minha avó e tinha medo de danificar. Eles identificaram uma peça solta e consertaram. Limparam com cuidado e ficou como novo. Agora tenho certeza de que vai durar mais anos.',
              },

            ].map((testimonial, idx) => (
              <div key={idx} className="p-8 rounded-lg bg-card border-2 border-border hover:border-secondary transition-all duration-300 hover:shadow-lg">
                <p className="text-lg font-semibold text-secondary mb-2 italic">
                  "{testimonial.quote}"
                </p>
                <p className="text-foreground font-bold mb-1">— {testimonial.author}</p>
                <p className="text-sm text-foreground/60 mb-4">{testimonial.context}</p>
                <p className="text-foreground/80 leading-relaxed">{testimonial.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* GUARANTEE SECTION */}
      <section className="section-spacing bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-center">
            Você está seguro conosco.
          </h2>
          <div className="divider-gold mb-12 max-w-xs mx-auto"></div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: 'Avaliação Sem Compromisso',
                description: 'Envie uma foto e receba uma análise técnica. Se decidir não contratar, tudo bem. Pelo menos você saberá o que é possível fazer.',
              },
              {
                title: 'Transparência',
                description: 'Antes de começar, você saberá exatamente o que vamos fazer, quanto tempo vai levar, e o que esperar como resultado. Sem surpresas.',
              },
              {
                title: 'Cuidado com Seu Ambiente',
                description: 'Protegemos seu móvel, piso e paredes com plástico e panos. Trabalhamos com organização. Você não fica com bagunça.',
              },
              {
                title: 'Realismo Sobre Resultados',
                description: 'Se uma peça foi muito danificada, nós te avisamos. O resultado depende do estado anterior. Prometemos o melhor resultado possível com técnica e cuidado.',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-lg border-2 border-secondary bg-secondary/5">
                <h3 className="text-lg font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-foreground/80 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="section-spacing bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-center">
            Dúvidas Comuns
          </h2>
          <div className="divider-gold mb-12 max-w-xs mx-auto"></div>

          <div className="max-w-3xl mx-auto">
            <FAQ items={faqItems} />
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="section-spacing bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Seu lustre merecia brilhar novamente.
            </h2>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              Seu lustre não perdeu o valor.
            </p>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              Só está mal cuidado.
            </p>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              E isso dá pra resolver — se for feito do jeito certo.
            </p>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              Envie uma foto e entenda qual é o melhor caminho no seu caso.
            </p>
            <div className="mb-6">
              <p className="text-primary-foreground/80 italic">Sem compromisso. Só uma resposta honesta.</p>
            </div>
            <button
              onClick={() => openWhatsApp('final-cta')}
              className="bg-secondary text-secondary-foreground px-10 py-4 rounded-lg font-bold text-lg inline-flex items-center gap-2 hover:shadow-lg hover:scale-105 transition-all duration-300 group"
            >
              <MessageCircle className="w-6 h-6" />
              Enviar Foto Agora
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* FLOATING WHATSAPP BUTTON */}
      {showFloatingButton && (
        <button
          onClick={() => openWhatsApp('floating-button')}
          className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-secondary text-secondary-foreground shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center z-50 animate-bounce"
          title="Enviar foto do seu lustre"
        >
          <MessageCircle className="w-8 h-8" />
        </button>
      )}
    </div>
  );
}
