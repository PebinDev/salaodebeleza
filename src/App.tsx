import { useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import {
  Calendar,
  CalendarDays,
  ChevronRight,
  Clock3,
  Leaf,
  Menu,
  Phone,
  Scissors,
  X,
  Flower2,
  Armchair,
  MessageCircle,
} from 'lucide-react'
import './App.css'
import heroImage from './assets/hero.png'

const revealVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] as const } },
}

const staggerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.03 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.99 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] as const } },
}

const whatsappUrl = 'https://wa.me/558521355544?text=Ol%C3%A1%21%20Conheci%20o%20SB%20Espa%C3%A7o%20de%20Beleza%20pelo%20site%20e%20gostaria%20de%20obter%20informa%C3%A7%C3%B5es%20sobre%20os%20servi%C3%A7os%20e%20hor%C3%A1rios%20dispon%C3%ADveis.'
const mapUrl = 'https://www.google.com/maps/search/?api=1&query=Av.+Godofredo+Maciel%2C+4035+-+Parangaba%2C+Fortaleza+-+CE%2C+60711-495'
const services = [
  { name: 'Cabelos', detail: 'Cuidado e beleza para os cabelos.', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=85' },
  { name: 'Manicure e pedicure', detail: 'Unhas cuidadas para o seu dia a dia.', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=85' },
  { name: 'Depila\u00e7\u00e3o', detail: 'Atendimento cuidadoso e profissional.', image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=900&q=85' },
  { name: 'Cuidados com a beleza', detail: 'Consulte a equipe sobre os servi\u00e7os dispon\u00edveis.', image: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=900&q=85' },
]
function Logo() {
  return (
    <a className="logo" href="#inicio" aria-label="SB Espaço de Beleza Maraponga">
      <span className="logo-mark" aria-hidden="true"><Flower2 strokeWidth={1.2} /></span>
      <span className="logo-copy"><strong>SB</strong><small>ESPAÇO DE BELEZA · MARAPONGA</small></span>
    </a>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  // These expressive animations are explicitly requested for this site.
  const reduceMotion = false
  const heroRef = useRef<HTMLElement | null>(null)
  const aboutRef = useRef<HTMLElement | null>(null)
  const servicesRef = useRef<HTMLElement | null>(null)
  const testimonialImageRef = useRef<HTMLImageElement | null>(null)
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 })
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start end', 'end start'] })
  const heroParallax = useTransform(heroProgress, [0, 1], ['0%', '3%'])
  const { scrollYProgress: aboutProgress } = useScroll({ target: aboutRef, offset: ['start end', 'end start'] })
  const aboutImageY = useSpring(useTransform(aboutProgress, [0, 1], ['-.3rem', '.3rem']), { stiffness: 80, damping: 24, restDelta: 0.001 })
  const { scrollYProgress: servicesProgress } = useScroll({ target: servicesRef, offset: ['start end', 'end start'] })
  const serviceImageY = useSpring(useTransform(servicesProgress, [0, 1], ['-.25rem', '.25rem']), { stiffness: 80, damping: 24, restDelta: 0.001 })
  const { scrollYProgress: testimonialProgress } = useScroll({ target: testimonialImageRef, offset: ['start end', 'end start'] })
  const testimonialParallax = useTransform(testimonialProgress, [0, 1], ['-2%', '2%'])

  const openBooking = () => {
    setMenuOpen(false)
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <motion.div
        className="scroll-progress"
        aria-hidden="true"
        style={{ scaleX: reduceMotion ? 0 : smoothProgress }}
      />
      <header className="header">
        <div className="container header-inner">
          <Logo />
          <button className="menu-button" type="button" aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
          <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Navega&ccedil;&atilde;o principal">
            <a className="active" href="#inicio" onClick={() => setMenuOpen(false)}>In&iacute;cio</a>
            <a href="#servicos" onClick={() => setMenuOpen(false)}>Servi&ccedil;os</a>
            <a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre</a>
            <a href="#avaliacoes" onClick={() => setMenuOpen(false)}>Avalia&ccedil;&otilde;es</a>
            <a href="#contato" onClick={() => setMenuOpen(false)}>Contato</a>
          </nav>
          <button className="button button-brown header-button" type="button" onClick={openBooking}>Agendar <ChevronRight /></button>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio" ref={heroRef}>
          <div className="container hero-grid">
            <motion.div className="hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}>
              <p className="eyebrow">SAL&Atilde;O DE BELEZA · MARAPONGA</p>
              <h1>
                <span className="hero-title-mask"><motion.span initial={reduceMotion ? { opacity: 0 } : { y: '90%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: reduceMotion ? 0.2 : 0.66, delay: reduceMotion ? 0.04 : 0.08, ease: [0.22, 1, 0.36, 1] }}>Sua beleza,</motion.span></span>
                <span className="hero-title-mask"><motion.span initial={reduceMotion ? { opacity: 0 } : { y: '90%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: reduceMotion ? 0.2 : 0.66, delay: reduceMotion ? 0.1 : 0.22, ease: [0.22, 1, 0.36, 1] }}>nossa ess&ecirc;ncia.</motion.span></span>
              </h1>
              <p>Beleza, autoestima e cuidado em um ambiente acolhedor na regi&atilde;o da <strong>Maraponga e Parangaba, em Fortaleza</strong>.</p>
              <div className="hero-actions">
                <motion.button className="button button-brown" type="button" onClick={openBooking} initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: reduceMotion ? 0.15 : 0.58, delay: reduceMotion ? 0 : 0.62, ease: [0.16, 1, 0.3, 1] }}>Agendar hor&aacute;rio <ChevronRight /></motion.button>
                <motion.a className="button button-outline" href="#servicos" initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: reduceMotion ? 0.15 : 0.58, delay: reduceMotion ? 0 : 0.78, ease: [0.16, 1, 0.3, 1] }}>Conhe&ccedil;a os servi&ccedil;os</motion.a>
                <motion.a className="hero-contact-link" href="#contato" initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0.15 : 0.5, delay: reduceMotion ? 0 : 0.94, ease: [0.16, 1, 0.3, 1] }}>Fale com a equipe <ChevronRight /></motion.a>
              </div>
            </motion.div>
            <motion.div className="hero-image" initial={reduceMotion ? false : { opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}>
              <motion.img style={reduceMotion ? undefined : { y: heroParallax, scale: 1.06 }} src={heroImage} alt="Mulher com cabelos bem cuidados em ambiente sofisticado" width="700" height="750" fetchPriority="high" />
            </motion.div>
          </div>
        </section>

        <section className="differentials" aria-label="Diferenciais">
          <motion.div className="container differential-grid" variants={staggerVariants} initial={reduceMotion ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
            <motion.div variants={cardVariants}><Scissors /><span>Cuidado e<br />profissionalismo</span></motion.div>
            <motion.div variants={cardVariants}><Leaf /><span>Variedade de<br />servi&ccedil;os de beleza</span></motion.div>
            <motion.div variants={cardVariants}><Armchair /><span>Ambiente<br />confort&aacute;vel</span></motion.div>
            <motion.div variants={cardVariants}><Calendar /><span>Consulte hor&aacute;rios<br />pelo WhatsApp</span></motion.div>
          </motion.div>
        </section>

        <section className="about section" id="sobre" ref={aboutRef}>
          <div className="container about-grid">
            <div className="about-image-frame">
              <motion.img style={reduceMotion ? undefined : { y: aboutImageY, scale: 1.06 }} src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=1000&q=85" alt="Interior acolhedor de um sal&atilde;o de beleza" width="620" height="420" loading="lazy" />
            </div>
            <motion.div className="about-copy" initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.06 }} viewport={{ once: true, amount: 0.3 }}>
              <p className="eyebrow">SOBRE N&Oacute;S</p>
              <h2>Beleza, cuidado<br />e bem-estar.</h2>
              <p>Um espa&ccedil;o de beleza em Fortaleza para cuidar dos cabelos, unhas e bem-estar, com atendimento atencioso e um ambiente confort&aacute;vel.</p>
              <a className="button button-brown" href="#contato">Conhe&ccedil;a nosso espa&ccedil;o <ChevronRight /></a>
            </motion.div>
          </div>
        </section>

        <section className="services section" id="servicos" ref={servicesRef}>
          <div className="container">
            <motion.div className="section-heading" variants={revealVariants} initial={reduceMotion ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.7 }}>
              <h2>Nossos Servi&ccedil;os</h2>
              <p>Conhe&ccedil;a as categorias de atendimento e consulte a equipe sobre os servi&ccedil;os dispon&iacute;veis.</p>
            </motion.div>
            <motion.div className="service-grid" variants={staggerVariants} initial={reduceMotion ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              {services.map((service) => (
                <motion.article className="service-card" key={service.name} variants={cardVariants} whileHover={reduceMotion ? undefined : { y: -4, scale: 1.015 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
                  <motion.img style={reduceMotion ? undefined : { y: serviceImageY, scale: 1.06 }} src={service.image} alt={`Imagem ilustrativa de ${service.name} no SB Espaço de Beleza Maraponga`} width="420" height="300" loading="lazy" />
                  <button type="button" onClick={openBooking} aria-label={`Agendar servi&ccedil;o de ${service.name}`}>
                    <span><strong>{service.name}</strong><small>{service.detail}</small></span>
                    <ChevronRight />
                  </button>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="team section reviews" id="avaliacoes">
          <div className="container">
            <motion.div className="section-heading" variants={revealVariants} initial={reduceMotion ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.7 }}>
              <p className="eyebrow">A EXPERI&Ecirc;NCIA DE QUEM J&Aacute; VEIO</p>
              <h2>Beleza reconhecida por clientes.</h2>
              <p>Nota <strong>4,8 de 5</strong> no Google, com base em <strong>137 avalia&ccedil;&otilde;es</strong>.</p>
            </motion.div>
            <div className="review-grid">
              <blockquote><span aria-label="5 estrelas">&#9733;&#9733;&#9733;&#9733;&#9733;</span><p>&ldquo;Fa&ccedil;o minhas unhas com ela todos os s&aacute;bados e sempre saio muito satisfeita.&rdquo;</p><small>Avalia&ccedil;&atilde;o no Google</small></blockquote>
              <blockquote><span aria-label="5 estrelas">&#9733;&#9733;&#9733;&#9733;&#9733;</span><p>&ldquo;O ambiente &eacute; maravilhoso, confort&aacute;vel e acolhedor.&rdquo;</p><small>Avalia&ccedil;&atilde;o no Google</small></blockquote>
              <blockquote><span aria-label="5 estrelas">&#9733;&#9733;&#9733;&#9733;&#9733;</span><p>&ldquo;Amo esse sal&atilde;o! Sempre sou muito bem recebida e saio de l&aacute; me sentindo ainda mais linda.&rdquo;</p><small>Avalia&ccedil;&atilde;o no Google</small></blockquote>
            </div>
          </div>
        </section>
        <section className="testimonial">
          <motion.div className="container testimonial-card" variants={revealVariants} initial={reduceMotion ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
            <div className="testimonial-copy">
              <div className="stars" aria-label="Nota 4,8 de 5 no Google">&#9733;&#9733;&#9733;&#9733;&#9733; &nbsp; 4,8</div>
              <blockquote>&ldquo;Entrega tudo no meu cabelo sempre!&rdquo;</blockquote>
              <p><strong>137 avalia&ccedil;&otilde;es</strong><br />Clientes do SB Espa&ccedil;o de Beleza | Maraponga</p>
            </div>
            <motion.img ref={testimonialImageRef} style={reduceMotion ? undefined : { y: testimonialParallax, scale: 1.03 }} src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=900&q=85" alt="Interior de salão de beleza ilustrativo" width="520" height="240" loading="lazy" />
          </motion.div>
        </section>

        <section className="booking-banner">
          <motion.div className="container booking-banner-inner" initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true, amount: 0.5 }}>
            <CalendarDays />
            <div><h2>Agende seu hor&aacute;rio</h2><p>Fale com a equipe sobre os servi&ccedil;os e hor&aacute;rios dispon&iacute;veis.</p></div>
            <button className="button button-white" type="button" onClick={openBooking}>Agendar agora <ChevronRight /></button>
          </motion.div>
        </section>

        <section className="contact" id="contato">
          <div className="container contact-grid">
            <div className="footer-brand"><Logo /><p>ESPA&Ccedil;O DE BELEZA · MARAPONGA</p></div>
            <div><h3>Links</h3><a href="#inicio">In&iacute;cio</a><a href="#servicos">Servi&ccedil;os</a><a href="#sobre">Sobre</a><a href="#avaliacoes">Avalia&ccedil;&otilde;es</a><a href="#contato">Contato</a></div>
            <div><h3>Contato</h3><a href="tel:+558521355544"><Phone /> (85) 2135-5544</a><a href={whatsappUrl}><MessageCircle /> WhatsApp</a><a href={mapUrl} target="_blank" rel="noreferrer">Av. Godofredo Maciel, 4035<br />Parangaba, Fortaleza - CE, 60711-495</a></div>
            <div><h3>Hor&aacute;rios</h3><p><Clock3 /> Consulte a equipe</p><p>Informa&ccedil;&atilde;o de abertura: 08h</p><a href={whatsappUrl}>Confirme a disponibilidade</a></div>
          </div>
          <p className="copyright">&copy; 2026 SB Espa&ccedil;o de Beleza | Maraponga. Todos os direitos reservados.</p>
        </section>
      </main>

      <button className="whatsapp-float" type="button" onClick={openBooking} aria-label="Solicitar agendamento pelo WhatsApp"><MessageCircle /></button>
    </>
  )
}

export default App
