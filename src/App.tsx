import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import {
  Calendar,
  CalendarDays,
  ChevronRight,
  ChevronLeft,
  Clock3,
  Leaf,
  Menu,
  Phone,
  Scissors,
  X,
  Armchair,
  MessageCircle,
  MapPin,
  Star,
} from 'lucide-react'
import './App.css'
import heroImage from './assets/hero3.png'
import { locations, mapUrl, whatsappUrl } from './locations'
import { reviewKindLabel, salonReviews } from './reviews'
import { serviceCategories } from './services'

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

function Logo() {
  return (
    <a className="logo" href="#inicio" aria-label="SB Espaço de Beleza, rede de Fortaleza">
      <img className="logo-mark" src={`${import.meta.env.BASE_URL}logo.png`} alt="" aria-hidden="true" />
      <span className="logo-copy"><strong>SB</strong><small>ESPAÇO DE BELEZA · FORTALEZA</small></span>
    </a>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedReviewLocation, setSelectedReviewLocation] = useState('all')
  const [reviewsPaused, setReviewsPaused] = useState(false)
  // These expressive animations are explicitly requested for this site.
  const reduceMotion = false
  const aboutRef = useRef<HTMLElement | null>(null)
  const servicesRef = useRef<HTMLElement | null>(null)
  const reviewsCarouselRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 })
  const { scrollYProgress: aboutProgress } = useScroll({ target: aboutRef, offset: ['start end', 'end start'] })
  const aboutImageY = useSpring(useTransform(aboutProgress, [0, 1], ['-.3rem', '.3rem']), { stiffness: 80, damping: 24, restDelta: 0.001 })
  const displayedReviews = selectedReviewLocation === 'all'
    ? salonReviews
    : salonReviews.filter((review) => review.locationId === selectedReviewLocation)

  useEffect(() => {
    reviewsCarouselRef.current?.scrollTo({ left: 0 })
  }, [selectedReviewLocation])

  useEffect(() => {
    if (reviewsPaused || displayedReviews.length < 2) return
    const interval = window.setInterval(() => {
      const carousel = reviewsCarouselRef.current
      if (!carousel) return
      const card = carousel.querySelector<HTMLElement>('.review-card')
      const gap = Number.parseFloat(window.getComputedStyle(carousel).columnGap) || 16
      const step = (card?.offsetWidth ?? carousel.clientWidth) + gap
      const atEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 8
      carousel.scrollTo({ left: atEnd ? 0 : carousel.scrollLeft + step, behavior: 'smooth' })
    }, 4500)
    return () => window.clearInterval(interval)
  }, [displayedReviews.length, reviewsPaused])

  const openBooking = () => {
    setMenuOpen(false)
    document.getElementById('unidades')?.scrollIntoView({ behavior: 'smooth' })
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
            <a href="#unidades" onClick={() => setMenuOpen(false)}>Unidades</a>
            <a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre</a>
            <a href="#avaliacoes" onClick={() => setMenuOpen(false)}>Avalia&ccedil;&otilde;es</a>
          </nav>
          <button className="button button-brown header-button" type="button" onClick={openBooking}>Agendar <ChevronRight /></button>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="container hero-grid">
            <motion.div className="hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}>
              <p className="eyebrow">REDE DE SAL&Otilde;ES &middot; FORTALEZA</p>
              <h1>
                <span className="hero-title-mask"><motion.span initial={reduceMotion ? { opacity: 0 } : { y: '90%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: reduceMotion ? 0.2 : 0.66, delay: reduceMotion ? 0.04 : 0.08, ease: [0.22, 1, 0.36, 1] }}>Sua beleza,</motion.span></span>
                <span className="hero-title-mask"><motion.span initial={reduceMotion ? { opacity: 0 } : { y: '90%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: reduceMotion ? 0.2 : 0.66, delay: reduceMotion ? 0.1 : 0.22, ease: [0.22, 1, 0.36, 1] }}>nossa ess&ecirc;ncia.</motion.span></span>
              </h1>
              <p>Beleza, autoestima e cuidado em ambientes acolhedores. Encontre a unidade SB mais perto de voc&ecirc; em <strong>Fortaleza</strong>.</p>
              <div className="hero-actions">
                <motion.button className="button button-brown" type="button" onClick={openBooking} initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: reduceMotion ? 0.15 : 0.58, delay: reduceMotion ? 0 : 0.62, ease: [0.16, 1, 0.3, 1] }}>Agendar hor&aacute;rio <ChevronRight /></motion.button>
                <motion.a className="button button-outline" href="#servicos" initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: reduceMotion ? 0.15 : 0.58, delay: reduceMotion ? 0 : 0.78, ease: [0.16, 1, 0.3, 1] }}>Conhe&ccedil;a os servi&ccedil;os</motion.a>
              </div>
            </motion.div>
            <motion.div className="hero-image" initial={reduceMotion ? false : { opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}>
              <motion.img src={heroImage} alt="Mulher com cabelos longos e ondulados em ambiente sofisticado" width="1312" height="1199" fetchPriority="high" />
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
              <a className="button button-brown" href="#unidades">Encontre uma unidade <ChevronRight /></a>
            </motion.div>
          </div>
        </section>

        <section className="services section" id="servicos" ref={servicesRef}>
          <div className="container">
            <motion.div className="section-heading" variants={revealVariants} initial={reduceMotion ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.7 }}>
              <p className="eyebrow">CUIDADO PARA CADA MOMENTO</p>
              <h2>Nossos Servi&ccedil;os</h2>
              <p>Descubra as possibilidades de cuidado e beleza da rede SB.</p>
            </motion.div>
            <motion.div className="service-grid" variants={staggerVariants} initial={reduceMotion ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              {serviceCategories.map((service, index) => (
                <motion.article className="service-card" key={service.name} variants={cardVariants} whileHover={reduceMotion ? undefined : { y: -5 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
                  <div className="service-card-image"><img className={service.imageFit === 'contain' ? 'service-image-contain' : undefined} src={service.image} alt={service.imageAlt} width="420" height="300" loading="lazy" /><span>{String(index + 1).padStart(2, '0')}</span></div>
                  <div className="service-card-copy"><p className="service-card-kicker">SB ESPA&Ccedil;O DE BELEZA</p><h3>{service.name}</h3><p>{service.description}</p><button type="button" onClick={openBooking}>Ver unidades <ChevronRight /></button></div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="locations section" id="unidades">
          <div className="container">
            <motion.div className="section-heading" variants={revealVariants} initial={reduceMotion ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
              <p className="eyebrow">PERTO DE VOC&Ecirc;</p>
              <h2>Nossas unidades</h2>
              <p>Uma s&oacute; rede, com atendimento e informa&ccedil;&otilde;es locais para cada regi&atilde;o de Fortaleza.</p>
            </motion.div>
            <motion.div className="location-grid" variants={staggerVariants} initial={reduceMotion ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
              {locations.map((location) => (
                <motion.article className="location-card" id={location.id} key={location.id} variants={cardVariants}>
                  <div className="location-card-heading"><div><span className="eyebrow">FORTALEZA &middot; CE</span><h3>{location.name}</h3><p>{location.neighborhood}</p></div><div className="location-rating" aria-label={`Nota ${location.rating} de 5 no Google`}><Star fill="currentColor" /><strong>{location.rating}</strong><small>Google</small></div></div>
                  <p className="location-reviews">{location.reviewCount} avalia&ccedil;&otilde;es</p>
                  <p className="location-address"><MapPin />{location.address}, {location.postalCode}</p>
                  <a className="location-phone" href={`tel:+${location.phoneDigits}`}><Phone />{location.phone}</a>
                  <p className="location-highlight">{location.highlights}</p>
                  <div className="location-actions"><a className="button button-brown" href={whatsappUrl(location)} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp</a><a className="button button-outline" href={mapUrl(location)} target="_blank" rel="noreferrer">Como chegar <ChevronRight /></a></div>
                </motion.article>
              ))}
            </motion.div>
            <p className="locations-note">Servi&ccedil;os e hor&aacute;rios podem variar entre unidades. Consulte a equipe da loja escolhida.</p>
          </div>
        </section>

        <section className="team section reviews" id="avaliacoes">
          <div className="container">
            <motion.div className="section-heading" variants={revealVariants} initial={reduceMotion ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.7 }}>
              <p className="eyebrow">A EXPERI&Ecirc;NCIA DE QUEM J&Aacute; VEIO</p>
              <h2>Beleza reconhecida por clientes.</h2>
              <p>As cinco unidades somam <strong>1.183 avalia&ccedil;&otilde;es</strong> no Google. Consulte os relatos por unidade.</p>
            </motion.div>
            <div className="review-location-filters" role="group" aria-label="Filtrar avaliações por unidade">
              <button type="button" className={selectedReviewLocation === 'all' ? 'selected' : ''} aria-pressed={selectedReviewLocation === 'all'} onClick={() => setSelectedReviewLocation('all')}>Todas as unidades</button>
              {locations.map((location) => <button type="button" key={location.id} className={selectedReviewLocation === location.id ? 'selected' : ''} aria-pressed={selectedReviewLocation === location.id} onClick={() => setSelectedReviewLocation(location.id)}>{location.name}</button>)}
            </div>
            <div className="review-location-ratings">
              {(selectedReviewLocation === 'all' ? locations : locations.filter((location) => location.id === selectedReviewLocation)).map((location) => <span key={location.id}><strong>{location.name}</strong><span aria-label={`Nota ${location.rating} de 5`}>★ {location.rating}/5</span><small>{location.reviewCount} avaliações</small></span>)}
            </div>
            <div className="review-carousel-controls">
              <p>Relatos enviados como avaliações, resumos e resposta do salão.</p>
              <div><button type="button" aria-label="Avaliação anterior" onClick={() => reviewsCarouselRef.current?.scrollBy({ left: -320, behavior: 'smooth' })}><ChevronLeft /></button><button type="button" aria-label="Próxima avaliação" onClick={() => reviewsCarouselRef.current?.scrollBy({ left: 320, behavior: 'smooth' })}><ChevronRight /></button></div>
            </div>
            <div className="reviews-carousel" ref={reviewsCarouselRef} role="region" aria-label="Carrossel de avaliações" tabIndex={0} onPointerEnter={() => setReviewsPaused(true)} onPointerLeave={() => setReviewsPaused(false)} onFocusCapture={() => setReviewsPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setReviewsPaused(false) }}>
              {displayedReviews.map((review) => {
                const location = locations.find((item) => item.id === review.locationId)
                return <article className={`review-card review-card-${review.kind}`} key={review.id}>
                  <div className="review-card-meta"><span>{reviewKindLabel(review.kind)}</span>{review.rating && <span className="review-stars" aria-label={`${review.rating} estrelas`}>{'★'.repeat(review.rating)}</span>}</div>
                  <p className="review-card-text">{review.text}</p>
                  {review.incomplete && <small className="review-incomplete">Trecho incompleto conforme recebido</small>}
                  <footer><strong>{review.author ?? location?.name}</strong><span>{review.publishedAt ?? location?.name}</span></footer>
                </article>
              })}
            </div>
            <p className="reviews-data-note">Textos e notas individuais foram reproduzidos conforme o material recebido; trechos incompletos permanecem sem complementação. A nota e a quantidade geral são próprias de cada unidade.</p>
          </div>
        </section>

        <section className="booking-banner">
          <motion.div className="container booking-banner-inner" initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true, amount: 0.5 }}>
            <span className="booking-icon" aria-hidden="true"><CalendarDays /></span>
            <div className="booking-banner-copy"><p className="booking-eyebrow">SEU MOMENTO DE CUIDADO</p><h2>Agende seu hor&aacute;rio</h2><p>Escolha uma unidade e consulte servi&ccedil;os e hor&aacute;rios dispon&iacute;veis.</p></div>
            <button className="button button-white" type="button" onClick={openBooking}>Escolher unidade <ChevronRight /></button>
          </motion.div>
        </section>

        <section className="contact">
          <div className="container contact-grid">
            <div className="footer-brand"><Logo /><p>ESPA&Ccedil;O DE BELEZA &middot; FORTALEZA</p></div>
            <div><h3>Links</h3><a href="#inicio">In&iacute;cio</a><a href="#servicos">Servi&ccedil;os</a><a href="#unidades">Unidades</a><a href="#sobre">Sobre</a><a href="#avaliacoes">Avalia&ccedil;&otilde;es</a></div>
            <div><h3>Encontre sua unidade</h3>{locations.map((location) => <a key={location.id} href={`#${location.id}`}>{location.name} · {location.phone}</a>)}</div>
            <div><h3>Hor&aacute;rios</h3><p><Clock3 /> Consulte cada unidade</p><a href="#unidades">Escolha uma unidade</a></div>
          </div>
          <p className="copyright">&copy; 2026 SB Espa&ccedil;o de Beleza. Fortaleza, Cear&aacute;. Todos os direitos reservados.</p>
        </section>
      </main>

      <button className="whatsapp-float" type="button" onClick={openBooking} aria-label="Solicitar agendamento pelo WhatsApp"><MessageCircle /></button>
    </>
  )
}

export default App
