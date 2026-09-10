import {useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode} from "react";
import {ArrowDownRight, ArrowRight, BrainCircuit, ChartNoAxesCombined, Compass, Megaphone, Menu, Pause, Play, Sparkles, Workflow, X} from "lucide-react";

const capabilities = [
  ["01", "Brand strategy & design", "Positioning and identity built to move with the business."],
  ["02", "Marketing & content", "Ideas, campaigns and production designed to earn attention."],
  ["03", "Products & platforms", "Digital products that turn the brand promise into an experience."],
  ["04", "Performance systems", "Media, experimentation and conversion working in one loop."],
  ["05", "AI & automation", "Useful intelligence embedded beneath everyday operations."],
  ["06", "Growth intelligence", "Signals translated into the next clear decision."],
];

const navItems = ["Work", "Capabilities", "Approach", "Company"];

function Reveal({children, className = ""}: {children: ReactNode; className?: string}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.dataset.visible = "true";
        observer.disconnect();
      }
    }, {threshold: .16});
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  return <header className={`site-header ${open ? "menu-open" : ""}`}>
    <a className="brand" href="#top" aria-label="RASEKH home"><img src="/rasekh-logo.png" alt="" /></a>
    <nav className="desktop-nav" aria-label="Primary navigation">{navItems.map((item) => <a href={`#${item.toLowerCase()}`} key={item}>{item}</a>)}</nav>
    <a className="talk-button" href="mailto:hello@rasekh.ai">Let’s talk</a>
    <button className="menu-button" type="button" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <div className={`mobile-nav ${open ? "is-open" : ""}`}>{navItems.map((item, index) => <a href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)} key={item}><small>0{index + 1}</small>{item}</a>)}<a href="mailto:hello@rasekh.ai">Start a conversation <ArrowRight /></a></div>
  </header>;
}

function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTarget = useRef({x: 0, y: 0, angle: 0});
  const cursorPosition = useRef({x: 0, y: 0, angle: 0});
  const hasCursorPosition = useRef(false);
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    let frame = 0;
    const animate = () => {
      const cursor = cursorRef.current;
      if (cursor) {
        cursorPosition.current.x += (cursorTarget.current.x - cursorPosition.current.x) * .16;
        cursorPosition.current.y += (cursorTarget.current.y - cursorPosition.current.y) * .16;
        cursorPosition.current.angle += (cursorTarget.current.angle - cursorPosition.current.angle) * .12;
        cursor.style.transform = `translate3d(${cursorPosition.current.x}px,${cursorPosition.current.y}px,0) rotate(${cursorPosition.current.angle}deg)`;
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);
  const handleHeroPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const previousX = cursorTarget.current.x;
    cursorTarget.current = {x, y, angle: Math.max(-7, Math.min(7, (x - previousX) * .08))};
    if (!hasCursorPosition.current) {
      cursorPosition.current = {x, y, angle: 0};
      hasCursorPosition.current = true;
    }
    if (cursorRef.current) cursorRef.current.dataset.visible = "true";
  };
  const hideHeroCursor = () => {
    if (cursorRef.current) cursorRef.current.dataset.visible = "false";
  };
  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play(); else video.pause();
  };
  return <section ref={heroRef} className="hero" id="top" onPointerMove={handleHeroPointerMove} onPointerLeave={hideHeroCursor}>
    <div className="hero-film" aria-hidden="true"><video ref={videoRef} autoPlay muted loop playsInline preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}><source src="/rasekh-hero.mp4" type="video/mp4" /></video><div className="hero-film-wash" /></div>
    <div className="hero-content"><p className="hero-kicker">AI × CREATIVE × GROWTH</p><h1>Hello.</h1><p className="hero-line">A new kind of company for brands ready to move.<br /><a href="#capabilities">See what runs underneath.</a></p></div>
    <button className="video-toggle" type="button" onClick={toggle} aria-label={playing ? "Pause hero film" : "Play hero film"}>{playing ? <Pause /> : <Play />}</button>
    <div ref={cursorRef} className="cursor-marquee" data-visible="false" aria-hidden="true"><div><span><b>Scroll</b><i>down</i></span><span><b>Scroll</b><i>down</i></span></div></div>
    <p className="hero-index">RASEKH / ROOTED INTELLIGENCE <span>SCROLL</span></p>
  </section>;
}

function Statement() {
  return <section className="statement-section">
    <Reveal><p className="section-tag">WHAT WE MAKE</p><h2>We build things<br />that move</h2><div className="word-window" aria-label="brands, businesses, teams, growth and culture"><div><span>brands.</span><span>businesses.</span><span>teams.</span><span>growth.</span><span>culture.</span><span>brands.</span></div></div></Reveal>
  </section>;
}

const manifesto = "Anyone can make. Creating experiences that move culture and business is the hard part. It takes strategy, creative, technology and human judgment.";
const trailItems = [
  {label: "Strategy", Icon: Compass, tone: "tone-teal"},
  {label: "Creative", Icon: Sparkles, tone: "tone-gold"},
  {label: "AI", Icon: BrainCircuit, tone: "tone-emerald"},
  {label: "Media", Icon: Megaphone, tone: "tone-silver"},
  {label: "Automation", Icon: Workflow, tone: "tone-teal"},
  {label: "Growth", Icon: ChartNoAxesCombined, tone: "tone-gold"},
];

function WordSweep() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [activeWord, setActiveWord] = useState(0);
  const words = manifesto.split(" ");
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight * .82 - rect.top) / (window.innerHeight * .72)));
      setActiveWord(Math.min(words.length - 1, Math.floor(progress * words.length)));
    };
    const requestUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", requestUpdate, {passive: true});
    window.addEventListener("resize", requestUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [words.length]);
  return <p ref={ref} className="word-sweep" aria-label={manifesto}>{words.map((word, index) => <span aria-hidden="true" className={index < activeWord ? "is-read" : index === activeWord ? "is-current" : ""} key={`${word}-${index}`}>{word}{" "}</span>)}</p>;
}

function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const showreelRef = useRef<HTMLVideoElement>(null);
  const [trail, setTrail] = useState<Array<{id: number; x: number; y: number; item: number}>>([]);
  const [visible, setVisible] = useState(false);
  const [showreelPlaying, setShowreelPlaying] = useState(true);
  const lastPoint = useRef({x: -100, y: -100});
  const nextItem = useRef(0);
  const nextId = useRef(0);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, {threshold: .28});
    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (Math.hypot(x - lastPoint.current.x, y - lastPoint.current.y) < 95) return;
    lastPoint.current = {x, y};
    const item = nextItem.current++ % trailItems.length;
    setTrail((current) => [...current.slice(-5), {id: nextId.current++, x, y, item}]);
  };
  const toggleShowreel = () => {
    const video = showreelRef.current;
    if (!video) return;
    if (video.paused) void video.play(); else video.pause();
  };
  const links = [
    ["See the work.", "#work"],
    ["Discover our solutions.", "#capabilities"],
    ["Check our approach.", "#approach"],
    ["This is RASEKH.", "#company"],
    ["Start a conversation.", "mailto:hello@rasekh.ai"],
  ];
  return <section ref={sectionRef} className="manifesto" data-visible={visible} id="approach" onPointerMove={handlePointerMove} onPointerLeave={() => setTrail([])}>
    <div className="manifesto-sweep"><WordSweep /></div>
    <div className="manifesto-aside">
      <nav className="manifesto-links" aria-label="Explore RASEKH">{links.map(([label, href], index) => <a href={href} style={{"--link-index": index} as CSSProperties} key={label}><span className="manifesto-link-label"><span>{label}</span><span aria-hidden="true">{label}</span></span><ArrowRight /></a>)}</nav>
      <button className="manifesto-showreel" type="button" onClick={toggleShowreel} aria-label={showreelPlaying ? "Pause RASEKH showreel" : "Play RASEKH showreel"}>
        <video ref={showreelRef} autoPlay muted loop playsInline preload="metadata" onPlay={() => setShowreelPlaying(true)} onPause={() => setShowreelPlaying(false)}><source src="/rasekh-hero.mp4" type="video/mp4" /></video>
        <span>{showreelPlaying ? "Pause showreel" : "Play showreel"} <ArrowRight /></span>
      </button>
    </div>
    <span className="trail-instruction">MOVE YOUR CURSOR TO EXPLORE</span>
    <div className="image-trail" aria-hidden="true">{trail.map(({id, x, y, item}) => {
      const {label, Icon, tone} = trailItems[item];
      return <span className={`trail-card ${tone}`} style={{left: x, top: y}} key={id}><Icon /><span>{label}</span></span>;
    })}</div>
  </section>;
}

function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const panelCount = 4;
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      setProgress(Math.max(0, Math.min(1, -rect.top / distance)));
    };
    const requestUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", requestUpdate, {passive: true});
    window.addEventListener("resize", requestUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);
  const railShift = progress * ((panelCount - 1) * (100 / panelCount));
  const activePanel = Math.min(panelCount, Math.floor(progress * panelCount) + 1);
  return <section ref={sectionRef} className="work-showcase" id="work">
    <div className="work-sticky">
      <div className="work-heading"><p className="section-tag">SELECTED SYSTEMS</p><h2>Our work.</h2><span>0{activePanel} / 0{panelCount}</span></div>
      <div className="work-viewport">
        <div className="work-rail" style={{width: `${panelCount * 100}%`, transform: `translate3d(-${railShift}%,0,0)`}}>
          <article className="work-panel work-panel-photo work-panel-creative">
            <img className="work-panel-image" src="/work/creative-strategy.jpg" alt="Creative team reviewing a colour system during a strategy session" loading="lazy" />
            <div className="work-panel-shade" />
            <div className="work-panel-copy"><p>CREATIVE SYSTEM.</p><h3>Strategy becomes<br /><span>a language people remember.</span></h3><small>CONCEPT STUDY · STRATEGY · CAMPAIGN</small></div>
          </article>
          <article className="work-panel work-panel-photo work-panel-ai">
            <img className="work-panel-image" src="/work/ai-infrastructure.jpg" alt="Blue-lit server infrastructure representing an AI operating layer" loading="lazy" />
            <div className="work-panel-shade" />
            <div className="work-panel-copy"><p>AI INFRASTRUCTURE.</p><h3>Intelligence designed to run<br /><span>underneath the work.</span></h3><small>AGENTS · AUTOMATION · DECISION SYSTEMS</small></div>
          </article>
          <article className="work-panel work-panel-photo work-panel-growth">
            <img className="work-panel-image" src="/work/growth-collaboration.jpg" alt="Creative team collaborating around a campaign workspace" loading="lazy" />
            <div className="work-panel-shade" />
            <div className="work-panel-copy"><p>CONNECTED GROWTH.</p><h3>Creative and performance<br /><span>in the same room.</span></h3><small>POSITIONING · CONTENT · PERFORMANCE</small></div>
          </article>
          <article className="work-panel work-panel-photo work-panel-product">
            <img className="work-panel-image" src="/work/digital-product.jpg" alt="Designer developing a product concept on a digital tablet" loading="lazy" />
            <div className="work-panel-shade" />
            <div className="work-panel-copy"><p>DIGITAL PRODUCTS.</p><h3>From business problem<br /><span>to working experience.</span></h3><small>WEB · PLATFORMS · CONVERSION</small></div>
          </article>
        </div>
      </div>
    </div>
  </section>;
}

function Partnership() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      setProgress(Math.max(0, Math.min(1, -rect.top / distance)));
    };
    const requestUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", requestUpdate, {passive: true});
    window.addEventListener("resize", requestUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);
  const introExit = Math.max(0, Math.min(1, (progress - .08) / .24));
  const orbitProgress = Math.max(0, Math.min(1, (progress - .14) / .74));
  const orbitRawStage = orbitProgress * 5;
  const orbitStage = Math.min(4, Math.floor(orbitRawStage));
  const orbitStageProgress = orbitRawStage - orbitStage;
  const transitionProgress = Math.max(0, Math.min(1, (orbitStageProgress - .3) / .45));
  const easedTransition = transitionProgress * transitionProgress * (3 - 2 * transitionProgress);
  const orbitPosition = orbitStage + easedTransition;
  const wheelRotation = orbitPosition * -24;
  const entryProgress = Math.max(0, Math.min(1, (progress - .04) / .2));
  const wheelLift = 180 - entryProgress * 380;
  const activePartnershipCard = Math.min(6, Math.round(orbitPosition) + 1);
  const cards = [
    {label: "CO-CREATE", title: "Build the direction together.", image: "/work/creative-strategy.jpg"},
    {label: "DISCOVER", title: "Find the signal worth following.", image: "/work/partnership-discovery.jpg"},
    {label: "LAUNCH", title: "Turn strategy into visible momentum.", image: "/work/growth-collaboration.jpg"},
    {label: "MEASURE", title: "Read the signal, not the noise.", image: "/work/ai-infrastructure.jpg"},
    {label: "IMPROVE", title: "Make every release teach the next.", image: "/work/digital-product.jpg"},
    {label: "SCALE", title: "Keep the system moving forward.", image: "/work/partnership-scale.jpg"},
  ];
  return <section ref={sectionRef} className="partnership-radial" aria-label="Partnership model">
    <div className="partnership-sticky">
      <div className="partnership-intro" style={{opacity: 1 - introExit, filter: `blur(${introExit * 12}px)`, transform: `translateY(${-introExit * 100}px)`}}>
        <p className="section-tag">HOW WE PARTNER</p>
        <h2>Never one<br />and done.</h2>
        <p>We build alongside your team, measure what moves, learn from the signal and make the next release stronger.</p>
      </div>
      <div className="partnership-wheel" style={{transform: `translateY(${wheelLift}px) rotate(${wheelRotation}deg)`}} aria-hidden="true">
        {cards.map((card, index) => <article className="partnership-card" style={{transform: `rotate(${index * 24}deg)`}} key={card.label}>
          <img src={card.image} alt="" loading="lazy" />
          <div className="partnership-card-shade" />
          <strong>{card.label}</strong>
          <p>{card.title}</p>
        </article>)}
      </div>
      <span className="partnership-progress">PARTNERSHIP / {String(activePartnershipCard).padStart(2, "0")}</span>
    </div>
  </section>;
}

function Capabilities() {
  return <section className="solutions-section" id="capabilities">
    <Reveal className="solutions-intro"><p className="section-tag">WHAT WE SOLVE</p><h2>Solutions.</h2><p><span className="solution-tone strategy-tone">Strategy-led.</span> <span className="solution-tone ai-tone">AI-enabled.</span> <span className="solution-tone performance-tone">Built to perform.</span><br />Capabilities that connect ideas to <span className="solution-impact">measurable growth.</span></p></Reveal>
    <ol className="solutions-stack">{capabilities.map(([number, title, description]) => <li className="solution-stack-item" key={number}>
      <a href={`mailto:hello@rasekh.ai?subject=${encodeURIComponent(`RASEKH — ${title}`)}`}>
        <article className="solution-card">
          <div><span>{number}</span><h3>{title}.</h3></div>
          <p>{description}</p>
        </article>
      </a>
    </li>)}</ol>
  </section>;
}

function EndCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTarget = useRef({x: 0, y: 0});
  const cursorPosition = useRef({x: 0, y: 0});
  const hasCursorPosition = useRef(false);
  const [visible, setVisible] = useState(false);
  const [cursorText, setCursorText] = useState("Explore work");
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, {threshold: .18});
    observer.observe(section);
    let frame = 0;
    const animate = () => {
      const cursor = cursorRef.current;
      cursorPosition.current.x += (cursorTarget.current.x - cursorPosition.current.x) * .18;
      cursorPosition.current.y += (cursorTarget.current.y - cursorPosition.current.y) * .18;
      if (cursor) cursor.style.transform = `translate3d(${cursorPosition.current.x}px,${cursorPosition.current.y}px,0)`;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);
  const moveCursor = (event: PointerEvent<HTMLAnchorElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    cursorTarget.current = {x, y};
    if (!hasCursorPosition.current) {
      cursorPosition.current = {x, y};
      hasCursorPosition.current = true;
    }
  };
  const showCursor = (label: string) => {
    setCursorText(label);
    if (cursorRef.current) cursorRef.current.dataset.visible = "true";
  };
  const hideCursor = () => {
    if (cursorRef.current) cursorRef.current.dataset.visible = "false";
  };
  return <section ref={sectionRef} className="end-cta" data-visible={visible} aria-label="Work and contact">
    <a className="end-cta-card" href="#work" onPointerEnter={() => showCursor("Explore work")} onPointerMove={moveCursor} onPointerLeave={hideCursor}>
      <div><span>Work.</span><h2>Explore our<br />latest work.</h2></div><i><ArrowRight /></i>
    </a>
    <a className="end-cta-card" href="mailto:hello@rasekh.ai?subject=Start%20a%20project%20with%20RASEKH" onPointerEnter={() => showCursor("Let’s talk")} onPointerMove={moveCursor} onPointerLeave={hideCursor}>
      <div><span>Contact.</span><h2>Ready to<br />talk?</h2></div><i><ArrowRight /></i>
    </a>
    <div ref={cursorRef} className="end-cta-cursor" data-visible="false" aria-hidden="true"><div><span>{cursorText}</span><span>{cursorText}</span></div></div>
  </section>;
}

function Footer() {
  return <footer className="site-footer" id="company">
    <h2>Stay rooted.</h2>
    <div className="site-footer-grid">
      <nav aria-label="Footer navigation"><a href="#work">Work.</a><a href="#capabilities">Solutions.</a><a href="#approach">Approach.</a><a href="#company">Company.</a></nav>
      <div className="site-footer-contact"><p>Start something that matters.</p><a href="mailto:hello@rasekh.ai">hello@rasekh.ai <ArrowRight /></a></div>
    </div>
    <div className="footer-bottom"><img src="/rasekh-logo.png" alt="RASEKH" /><span>AI × CREATIVE × GROWTH</span><span>© 2026 RASEKH</span></div>
  </footer>;
}

export function App() {
  return <><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main"><Hero /><Statement /><Manifesto /><Work /><Partnership /><Capabilities /><EndCta /></main><Footer /></>;
}
