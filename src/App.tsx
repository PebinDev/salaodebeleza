import { useRef, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import {
  CalendarDays,
  Calendar,
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

const services = [
  { name: 'Cabelo', detail: 'Cortes, coloração e tratamentos capilares.', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=85' },
  { name: 'Unhas', detail: 'Manicure, pedicure e cuidados completos.', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=85' },
  { name: 'Estética', detail: 'Limpeza de pele e tratamentos faciais.', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=85' },
  { name: 'SPA', detail: 'Massagens e experiências de relaxamento.', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=85' },
]

const team = [
  { name: 'Mariana', role: 'Hair Stylist', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=85' },
  { name: 'Camila', role: 'Especialista em Beleza', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=85' },
  { name: 'Isabela', role: 'Colorista', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=85' },
]

const bookingSchema = z.object({
  service: z.string().min(1, 'Selecione um serviço'),
  professional: z.string().min(1, 'Selecione um profissional'),
  date: z.string().min(1, 'Selecione uma data'),
  time: z.string().min(1, 'Selecione um horário'),
  name: z.string().trim().min(2, 'Informe seu nome'),
  phone: z.string().trim().min(8, 'Informe um telefone válido'),
})

type BookingForm = z.infer<typeof bookingSchema>

const bookingWhatsAppNumber = import.meta.env.VITE_BOOKING_WHATSAPP_NUMBER ?? ''

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a className={`logo ${light ? 'logo-light' : ''}`} href="#inicio" aria-label="SB Espa&ccedil;o de Beleza & SPA">
      <span className="logo-mark" aria-hidden="true"><Flower2 strokeWidth={1.2} /></span>
      <span className="logo-copy"><strong>SB</strong><small>ESPA&Ccedil;O DE BELEZA & SPA</small></span>
    </a>
  )
}

function BookingDialog({ open, setOpen }: { open: boolean; setOpen: (value: boolean) => void }) {
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const { register, handleSubmit, formState: { errors }, reset } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
  })

  const onSubmit = (booking: BookingForm) => {
    const phoneNumber = bookingWhatsAppNumber.replace(/\D/g, '')
    if (!phoneNumber) {
      setSubmitError('O agendamento pelo WhatsApp ainda não está configurado. Entre em contato pelo telefone informado no rodapé.')
      return
    }

    const formattedDate = new Date(`${booking.date}T12:00:00`).toLocaleDateString('pt-BR')
    const message = [
      'Olá! Gostaria de solicitar um agendamento no SB Espaço de Beleza & SPA.',
      '',
      `Serviço: ${booking.service}`,
      `Profissional: ${booking.professional}`,
      `Data: ${formattedDate}`,
      `Horário: ${booking.time}`,
      `Nome: ${booking.name}`,
      `Telefone: ${booking.phone}`,
    ].join('\n')

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  const closeDialog = () => {
    setOpen(false)
    setTimeout(() => {
      setSubmitted(false)
      setSubmitError('')
      reset()
    }, 200)
  }

  return (
    <Dialog.Root open={open} onOpenChange={(value) => value ? setOpen(true) : closeDialog()}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content" aria-describedby="booking-description">
          <div className="dialog-header">
            <div>
              <p className="eyebrow">Solicitar hor&aacute;rio</p>
              <Dialog.Title>Agende seu hor&aacute;rio</Dialog.Title>
            </div>
            <Dialog.Close className="icon-button" aria-label="Fechar agendamento"><X /></Dialog.Close>
          </div>
          <p id="booking-description" className="dialog-description">A disponibilidade ser&aacute; confirmada pelo estabelecimento.</p>
          {submitted ? (
            <div className="booking-success" role="status">
              <span><CalendarDays /></span>
              <h3>Solicita&ccedil;&atilde;o registrada</h3>
              <p>O WhatsApp foi aberto com os dados do pedido. Toque em Enviar para encaminhar a solicita&ccedil;&atilde;o; a equipe confirmar&aacute; a disponibilidade por l&aacute;.</p>
              <button className="button button-brown" type="button" onClick={closeDialog}>Concluir</button>
            </div>
          ) : (
            <form className="booking-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-grid">
                <label>Servi&ccedil;o
                  <select {...register('service')} defaultValue="">
                    <option value="" disabled>Selecione</option>
                    {services.map((item) => <option key={item.name}>{item.name}</option>)}
                  </select>
                  {errors.service && <small>{errors.service.message}</small>}
                </label>
                <label>Profissional
                  <select {...register('professional')} defaultValue="">
                    <option value="" disabled>Selecione</option>
                    {team.map((item) => <option key={item.name}>{item.name}</option>)}
                  </select>
                  {errors.professional && <small>{errors.professional.message}</small>}
                </label>
                <label>Data
                  <input type="date" {...register('date')} />
                  {errors.date && <small>{errors.date.message}</small>}
                </label>
                <label>Horário
                  <select {...register('time')} defaultValue="">
                    <option value="" disabled>Selecione</option>
                    <option>09:00</option><option>10:30</option><option>13:00</option><option>15:30</option><option>17:00</option>
                  </select>
                  {errors.time && <small>{errors.time.message}</small>}
                </label>
                <label>Nome
                  <input type="text" placeholder="Seu nome" {...register('name')} />
                  {errors.name && <small>{errors.name.message}</small>}
                </label>
                <label>Telefone / WhatsApp
                  <input type="tel" placeholder="(00) 00000-0000" {...register('phone')} />
                  {errors.phone && <small>{errors.phone.message}</small>}
                </label>
              </div>
              {submitError && <p className="booking-error" role="alert">{submitError}</p>}
              <button className="button button-brown booking-submit" type="submit">Solicitar agendamento <ChevronRight /></button>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  // These expressive animations are explicitly requested for this site.
  const reduceMotion = false
  const heroRef = useRef<HTMLElement | null>(null)
  const aboutRef = useRef<HTMLElement | null>(null)
  const servicesRef = useRef<HTMLElement | null>(null)
  const teamRef = useRef<HTMLElement | null>(null)
  const testimonialImageRef = useRef<HTMLImageElement | null>(null)
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 })
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start end', 'end start'] })
  const heroParallax = useTransform(heroProgress, [0, 1], ['-3%', '3%'])
  const { scrollYProgress: aboutProgress } = useScroll({ target: aboutRef, offset: ['start end', 'end start'] })
  const aboutImageY = useSpring(useTransform(aboutProgress, [0, 1], ['-.3rem', '.3rem']), { stiffness: 80, damping: 24, restDelta: 0.001 })
  const { scrollYProgress: servicesProgress } = useScroll({ target: servicesRef, offset: ['start end', 'end start'] })
  const serviceImageY = useSpring(useTransform(servicesProgress, [0, 1], ['-.25rem', '.25rem']), { stiffness: 80, damping: 24, restDelta: 0.001 })
  const { scrollYProgress: teamProgress } = useScroll({ target: teamRef, offset: ['start end', 'end start'] })
  const teamImageY = useSpring(useTransform(teamProgress, [0, 1], ['-.25rem', '.25rem']), { stiffness: 80, damping: 24, restDelta: 0.001 })
  const { scrollYProgress: testimonialProgress } = useScroll({ target: testimonialImageRef, offset: ['start end', 'end start'] })
  const testimonialParallax = useTransform(testimonialProgress, [0, 1], ['-2%', '2%'])

  const openBooking = () => {
    setMenuOpen(false)
    setBookingOpen(true)
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
            <a className="active" href="#inicio" onClick={() => setMenuOpen(false)}>Início</a>
            <a href="#servicos" onClick={() => setMenuOpen(false)}>Serviços</a>
            <a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre</a>
            <a href="#equipe" onClick={() => setMenuOpen(false)}>Equipe</a>
            <a href="#contato" onClick={() => setMenuOpen(false)}>Contato</a>
          </nav>
          <button className="button button-brown header-button" type="button" onClick={openBooking}>Agendar <ChevronRight /></button>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio" ref={heroRef}>
          <div className="container hero-grid">
            <motion.div className="hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}>
              <p className="eyebrow">SAL&Atilde;O DE BELEZA & SPA</p>
              <h1>
                <span className="hero-title-mask"><motion.span initial={reduceMotion ? { opacity: 0 } : { y: '90%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: reduceMotion ? 0.2 : 0.66, delay: reduceMotion ? 0.04 : 0.08, ease: [0.22, 1, 0.36, 1] }}>Sua beleza,</motion.span></span>
                <span className="hero-title-mask"><motion.span initial={reduceMotion ? { opacity: 0 } : { y: '90%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: reduceMotion ? 0.2 : 0.66, delay: reduceMotion ? 0.1 : 0.22, ease: [0.22, 1, 0.36, 1] }}>nossa ess&ecirc;ncia.</motion.span></span>
              </h1>
              <p>Cuidado, <strong>bem-estar e autoestima</strong> em um &uacute;nico lugar. Viva uma experi&ecirc;ncia de beleza <strong>completa e relaxante</strong>.</p>
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
            <motion.div variants={cardVariants}><Scissors /><span>Profissionais<br />especializados</span></motion.div>
            <motion.div variants={cardVariants}><Leaf /><span>Produtos<br />de alta qualidade</span></motion.div>
            <motion.div variants={cardVariants}><Armchair /><span>Ambiente<br />confort&aacute;vel</span></motion.div>
            <motion.div variants={cardVariants}><Calendar /><span>Agendamento r&aacute;pido<br />e pr&aacute;tico</span></motion.div>
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
              <p>Um espa&ccedil;o pensado para real&ccedil;ar a sua beleza com servi&ccedil;os de alta qualidade, profissionais experientes e atendimento personalizado.</p>
              <a className="button button-brown" href="#contato">Conhe&ccedil;a nosso espa&ccedil;o <ChevronRight /></a>
            </motion.div>
          </div>
        </section>

        <section className="services section" id="servicos" ref={servicesRef}>
          <div className="container">
            <motion.div className="section-heading" variants={revealVariants} initial={reduceMotion ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.7 }}>
              <h2>Nossos Servi&ccedil;os</h2>
              <p>Tratamentos completos para cuidar de voc&ecirc;, da cabe&ccedil;a aos p&eacute;s.</p>
            </motion.div>
            <motion.div className="service-grid" variants={staggerVariants} initial={reduceMotion ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              {services.map((service) => (
                <motion.article className="service-card" key={service.name} variants={cardVariants} whileHover={reduceMotion ? undefined : { y: -4, scale: 1.015 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
                  <motion.img style={reduceMotion ? undefined : { y: serviceImageY, scale: 1.06 }} src={service.image} alt={`Servi&ccedil;o de ${service.name} no SB Espa&ccedil;o de Beleza & SPA`} width="420" height="300" loading="lazy" />
                  <button type="button" onClick={openBooking} aria-label={`Agendar servi&ccedil;o de ${service.name}`}>
                    <span><strong>{service.name}</strong><small>{service.detail}</small></span>
                    <ChevronRight />
                  </button>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="team section" id="equipe" ref={teamRef}>
          <div className="container">
            <motion.div className="section-heading" variants={revealVariants} initial={reduceMotion ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.7 }}>
              <h2>Nossa Equipe</h2>
              <p>Profissionais apaixonados por beleza e bem-estar.</p>
            </motion.div>
            <motion.div className="team-grid" variants={staggerVariants} initial={reduceMotion ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              {team.map((member) => (
                <motion.article className="team-card" key={member.name} variants={cardVariants} whileHover={reduceMotion ? undefined : { y: -4, scale: 1.015 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
                  <motion.img style={reduceMotion ? undefined : { y: teamImageY, scale: 1.06 }} src={member.image} alt={`Retrato demonstrativo de ${member.name}`} width="360" height="380" loading="lazy" />
                  <button type="button" onClick={openBooking} aria-label={`Agendar com ${member.name}`}>
                    <span><strong>{member.name}</strong><small>{member.role}</small></span>
                    <ChevronRight />
                  </button>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="testimonial">
          <motion.div className="container testimonial-card" variants={revealVariants} initial={reduceMotion ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
            <div className="testimonial-copy">
              <div className="stars" aria-label="Avalia&ccedil;&atilde;o demonstrativa de cinco estrelas">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <blockquote>&ldquo;Uma experi&ecirc;ncia maravilhosa!<br />Atendimento impec&aacute;vel e resultado ainda melhor do que eu esperava.&rdquo;</blockquote>
              <p><strong>Ana Paula</strong><br />Cliente do SB Espa&ccedil;o de Beleza</p>
            </div>
            <motion.img ref={testimonialImageRef} style={reduceMotion ? undefined : { y: testimonialParallax, scale: 1.03 }} src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=900&q=85" alt="Ambiente relaxante de spa com toalhas e vela" width="520" height="240" loading="lazy" />
          </motion.div>
        </section>

        <section className="booking-banner">
          <motion.div className="container booking-banner-inner" initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true, amount: 0.5 }}>
            <CalendarDays />
            <div><h2>Agende seu hor&aacute;rio</h2><p>Escolha o servi&ccedil;o, o profissional e o melhor hor&aacute;rio para voc&ecirc;.</p></div>
            <button className="button button-white" type="button" onClick={openBooking}>Agendar agora <ChevronRight /></button>
          </motion.div>
        </section>

        <section className="contact" id="contato">
          <div className="container contact-grid">
            <div className="footer-brand"><Logo /><p>ESPA&Ccedil;O DE BELEZA & SPA</p></div>
            <div><h3>Links</h3><a href="#inicio">In&iacute;cio</a><a href="#servicos">Servi&ccedil;os</a><a href="#sobre">Sobre</a><a href="#equipe">Equipe</a><a href="#contato">Contato</a></div>
            <div><h3>Contato</h3><p><Phone /> (11) 99999-9999</p><p><MessageCircle /> contato@sbbeleza.com.br</p><p>&#9872; Rua das Flores, 123 &ndash; Centro<br />&nbsp;&nbsp;S&atilde;o Paulo &ndash; SP</p></div>
            <div><h3>Hor&aacute;rio de funcionamento</h3><p><Clock3 /> Seg a Sex: 9h &agrave;s 19h</p><p><Clock3 /> S&aacute;b: 9h &agrave;s 16h</p><p>Dom: Fechado</p></div>
            <div className="social-links"><a href="#contato" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".75" fill="currentColor" stroke="none" /></svg></a><a href="#contato" aria-label="WhatsApp"><MessageCircle /></a></div>
          </div>
          <p className="copyright">&copy; 2025 SB Espa&ccedil;o de Beleza & SPA. Todos os direitos reservados.</p>
        </section>
      </main>

      <button className="whatsapp-float" type="button" onClick={openBooking} aria-label="Solicitar agendamento pelo WhatsApp"><MessageCircle /></button>
      <BookingDialog open={bookingOpen} setOpen={setBookingOpen} />
    </>
  )
}

export default App
