// ==========================================================================
// LA BÓVEDA OSCURA DEL PUNTO DE CRUZ™ — INTERACTIVE LOGIC & SCRIPTS
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. FAQ Accordion functionality
  initFaqAccordion();

  // 2. Lightbox Modal for Gallery & Hero Designs
  initGalleryLightbox();

  // 3. Smooth Anchor Scrolling
  initSmoothScroll();

  // 5. Ambient Atmospheric Audio (Web Audio API Synthesizer)
  initAmbientSound();

  // 6. Automatic Country + Currency Localization System
  initLocalizationSystem();
});

/* --------------------------------------------------------------------------
   1. FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;
    
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items for clean single-accordion view
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. Lightbox Modal & Showcase Database
   -------------------------------------------------------------------------- */
const patternData = {
  // Hero Designs
  'raven-cathedral': {
    title: 'Raven Cathedral Portal',
    collection: 'Gothic Places · Advanced',
    stitches: '160 x 200 stitches',
    colors: '18 Colores DMC',
    difficulty: 'Avanzado',
    size: '29.0 x 36.3 cm (Aida 14)',
    img: 'assets/crop_bundle_cathedral.jpg',
    desc: 'Un imponente cuervo negro posado en la tracería de un ventanal gótico iluminado bajo la luna.'
  },
  'black-cat-moon': {
    title: 'Black Cat Crescent Moon',
    collection: 'Black Cats & Familiars · Beginner',
    stitches: '120 x 120 stitches',
    colors: '5 Colores DMC',
    difficulty: 'Fácil / Intermedio',
    size: '21.8 x 21.8 cm (Aida 14)',
    img: 'assets/pattern_midnight_cat.jpg',
    desc: 'Gato negro místico sentado en una luna creciente dorada rodeado de espinas simétricas y estrellas.'
  },
  'celestial-moth': {
    title: 'Celestial Death Moth',
    collection: 'Celestial · Intermediate',
    stitches: '145 x 160 stitches',
    colors: '7 Colores DMC',
    difficulty: 'Intermedio',
    size: '26.3 x 29.0 cm (Aida 14)',
    img: 'assets/pattern_celestial_moth.jpg',
    desc: 'Polilla de la muerte enmarcada en una luna ornamental con fases lunares y rosas de terciopelo carmesí.'
  },
  'haunted-greenhouse': {
    title: 'Haunted Victorian Greenhouse',
    collection: 'Dark Botanicals · Advanced',
    stitches: '160 x 160 stitches',
    colors: '22 Colores DMC',
    difficulty: 'Avanzado',
    size: '29.0 x 29.0 cm (Aida 14)',
    img: 'assets/pattern_haunted_greenhouse.jpg',
    desc: 'Invernadero victoriano gótico de noche con plantas carnívoras, belladonas y hongos luminiscentes.'
  },
  'dark-rose-moon': {
    title: 'Dark Rose Moon',
    collection: 'Dark Botanicals · Intermediate',
    stitches: '135 x 135 stitches',
    colors: '14 Colores DMC',
    difficulty: 'Intermedio',
    size: '24.5 x 24.5 cm (Aida 14)',
    img: 'assets/crop_dark_gothic.jpg',
    desc: 'Rosas de terciopelo negro y hojas de hiedra oscura abrazando una luna menguante.'
  },
  'witch-apothecary': {
    title: 'Witch Apothecary Shelf',
    collection: 'Witchy Objects · Intermediate',
    stitches: '135 x 135 stitches',
    colors: '17 Colores DMC',
    difficulty: 'Intermedio',
    size: '24.5 x 24.5 cm (Aida 14)',
    img: 'assets/pattern_witch_potion.jpg',
    desc: 'Pociones arcanas, frascos de cristal, llaves antiguas y grimorios en una estantería rústica.'
  },
  'gothic-window': {
    title: 'Stained Glass Gothic Rosette',
    collection: 'Gothic Places · Advanced',
    stitches: '145 x 195 stitches',
    colors: '20 Colores DMC',
    difficulty: 'Avanzado',
    size: '26.3 x 35.3 cm (Aida 14)',
    img: 'assets/pattern_gothic_cathedral.jpg',
    desc: 'Rosetón gótico con vitrales en tonos zafiro, rubí y amatista rodeado de estrellas doradas.'
  },
  'mushroom-garden': {
    title: 'Moonlit Mushroom Garden',
    collection: 'Dark Botanicals · Intermediate',
    stitches: '130 x 130 stitches',
    colors: '12 Colores DMC',
    difficulty: 'Intermedio',
    size: '23.5 x 23.5 cm (Aida 14)',
    img: 'assets/crop_bundle_moth.jpg',
    desc: 'Círculo de hongos silvestres venenosos bajo la luz de la luna llena en bosque encantado.'
  },

  // Main Gallery Designs
  'snake-moon': {
    title: 'Snake & Arcane Moon',
    collection: 'Celestial & Familiars',
    stitches: '130 x 130 stitches',
    colors: '6 Colores DMC',
    difficulty: 'Intermedio',
    size: '23.5 x 23.5 cm (Aida 14)',
    img: 'imgs/colecao1.png',
    desc: 'Serpiente celestial enroscada en la luna con constelaciones de fondo y acentos dorados.'
  },
  'triple-candle': {
    title: 'Triple Candle Altar',
    collection: 'Witchy Objects',
    stitches: '125 x 125 stitches',
    colors: '8 Colores DMC',
    difficulty: 'Fácil / Intermedio',
    size: '22.6 x 22.6 cm (Aida 14)',
    img: 'imgs/colecao2.png',
    desc: 'Tres velas rituales góticas derritiéndose sobre una base de hierro forjado con espinas.'
  },
  'raven-key': {
    title: 'Raven Skull & Antique Key',
    collection: 'Gothic Objects',
    stitches: '140 x 180 stitches',
    colors: '16 Colores DMC',
    difficulty: 'Avanzado',
    size: '25.4 x 32.6 cm (Aida 14)',
    img: 'imgs/colecao3.png',
    desc: 'Cráneo de cuervo con filigrana vitoriana y llave de hierro antigua de la bóveda secreta.'
  },
  'gothic-mirror': {
    title: 'Gothic Obsidian Mirror',
    collection: 'Witchy Objects',
    stitches: '140 x 170 stitches',
    colors: '15 Colores DMC',
    difficulty: 'Intermedio',
    size: '25.4 x 30.8 cm (Aida 14)',
    img: 'imgs/colecao4.png',
    desc: 'Espejo antiguo de obsidiana con marco ornamentado de rosas talladas y arabescos góticos.'
  },
  'moon-phases': {
    title: 'Moon Phases & Botanical Wreath',
    collection: 'Celestial',
    stitches: '140 x 140 stitches',
    colors: '10 Colores DMC',
    difficulty: 'Intermedio',
    size: '25.4 x 25.4 cm (Aida 14)',
    img: 'imgs/colecao5.png',
    desc: 'Las 5 fases de la luna rodeadas por una corona botánica de hojas de roble y belladona.'
  },
  'black-cat-apothecary': {
    title: 'Black Cat in the Apothecary',
    collection: 'Black Cats & Familiars',
    stitches: '135 x 135 stitches',
    colors: '14 Colores DMC',
    difficulty: 'Intermedio',
    size: '24.5 x 24.5 cm (Aida 14)',
    img: 'imgs/colecao6.png',
    desc: 'Gato negro durmiendo plácidamente junto a frascos de hierbas mágicas y velas.'
  },
  'haunted-greenhouse': {
    title: 'Haunted Victorian Greenhouse',
    collection: 'Dark Botanicals',
    stitches: '160 x 160 stitches',
    colors: '22 Colores DMC',
    difficulty: 'Avanzado',
    size: '29.0 x 29.0 cm (Aida 14)',
    img: 'imgs/colecao7.png',
    desc: 'Invernadero victoriano gótico al atardecer con plantas exóticas y belladonas.'
  },
  'bat-cathedral': {
    title: 'Bat Cathedral & Belfry',
    collection: 'Gothic Places',
    stitches: '135 x 180 stitches',
    colors: '12 Colores DMC',
    difficulty: 'Intermedio',
    size: '24.5 x 32.6 cm (Aida 14)',
    img: 'imgs/colecao8.png',
    desc: 'Campanario gótico al atardecer con murciélagos volando frente a una luna carmesí.'
  },
  'poison-bottle': {
    title: 'Poison Garden Belladonna',
    collection: 'Dark Botanicals',
    stitches: '130 x 130 stitches',
    colors: '15 Colores DMC',
    difficulty: 'Intermedio',
    size: '23.5 x 23.5 cm (Aida 14)',
    img: 'imgs/colecao9.png',
    desc: 'Frasco de veneno antiguo envuelto en enredaderas de belladonna con bayas oscuras.'
  },
  'crescent-familiar': {
    title: 'Crescent Moon & Familiar',
    collection: 'Celestial Collection',
    stitches: '145 x 195 stitches',
    colors: '20 Colores DMC',
    difficulty: 'Avanzado',
    size: '26.3 x 35.3 cm (Aida 14)',
    img: 'imgs/colecao10.png',
    desc: 'Composición victoriana gótica con portal sagrado, luna y cuervo místico.'
  },
  'mini-sheet': {
    title: '50 Mini Patrones Místicos Sheet',
    collection: 'Mini Collection',
    stitches: '30x30 a 40x40 stitches c/u',
    colors: '4 a 6 Colores DMC',
    difficulty: 'Principiante',
    size: '6x6 a 8x8 cm c/u',
    img: 'assets/crop_mini_sheet.jpg',
    desc: 'Hoja con 50 mini motivos góticos: murciélagos, pociones, lunas, velas y cráneos.'
  }
};

function initGalleryLightbox() {
  const modal = document.getElementById('lightboxModal');
  const closeBtn = document.getElementById('lightboxClose');
  const modalImg = document.getElementById('lightboxImg');
  const modalTitle = document.getElementById('lightboxTitle');
  const modalCollection = document.getElementById('lightboxCollection');
  const modalStitches = document.getElementById('lightboxStitches');
  const modalColors = document.getElementById('lightboxColors');
  const modalDiff = document.getElementById('lightboxDiff');
  const modalSize = document.getElementById('lightboxSize');
  const modalDesc = document.getElementById('lightboxDesc');
  const cards = document.querySelectorAll('.gallery-art-card, .hero-mosaic-item');

  if (!modal) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const patternId = card.getAttribute('data-pattern');
      const data = patternData[patternId] || patternData['black-cat-moon'];

      if (data) {
        const cardImg = card.querySelector('.hoop-img') || card.querySelector('img');
        if (cardImg && cardImg.src) {
          modalImg.src = cardImg.src;
        } else {
          const isSubfolder = window.location.pathname.includes('/pt-br');
          modalImg.src = isSubfolder ? '../' + data.img : data.img;
        }
        modalImg.alt = data.title;
        modalTitle.textContent = data.title;
        modalCollection.textContent = data.collection;
        modalStitches.textContent = data.stitches;
        modalColors.textContent = data.colors;
        modalDiff.textContent = data.difficulty;
        modalSize.textContent = data.size;
        modalDesc.textContent = data.desc;

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      closeModal();
    }
  });
}



/* --------------------------------------------------------------------------
   4. Smooth Anchor Scrolling
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 25;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. Subtle Mystical Atmosphere Chime (Web Audio API Synthesizer)
   -------------------------------------------------------------------------- */
function initAmbientSound() {
  const soundBtn = document.getElementById('ambientSoundBtn');
  if (!soundBtn) return;

  let audioCtx = null;
  let isPlaying = false;

  soundBtn.addEventListener('click', () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (!isPlaying) {
      playMysticChime(audioCtx);
      soundBtn.innerHTML = '✨ <span>Campana Mística</span>';
      soundBtn.style.borderColor = '#C5A35A';
      isPlaying = true;
      setTimeout(() => {
        isPlaying = false;
        soundBtn.innerHTML = '🕯️ <span>Ambiente</span>';
      }, 4000);
    }
  });
}

function playMysticChime(ctx) {
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const freqs = [220, 277.18, 329.63, 440, 554.37, 659.25];
  const now = ctx.currentTime;

  freqs.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + i * 0.15);

    gain.gain.setValueAtTime(0, now + i * 0.15);
    gain.gain.linearRampToValueAtTime(0.04, now + i * 0.15 + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.15 + 3.0);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + i * 0.15);
    osc.stop(now + i * 0.15 + 3.2);
  });
}

/* --------------------------------------------------------------------------
   6. SISTEMA AUTOMÁTICO DE GEOLOCALIZAÇÃO POR PAÍS + MOEDA + SELETOR
   -------------------------------------------------------------------------- */

/* Tabela Oficial de Preços Localizados por Mercado (Preços Comerciais & Psicológicos) */
const LOCALIZED_PRICES = {
  ES: {
    currency: "EUR", locale: "es-ES", symbol: "€", placement: "after",
    main: 14.90, compareAt: 69.90, single: 3.00, five: 15.00, twenty: 60.00,
    bonus1: 15.90, bonus2: 24.90, bonus3: 10.90, totalStack: 121.60,
    bump: 6.90, upsell1: 12.90, upsell2: 9.90
  },
  MX: {
    currency: "MXN", locale: "es-MX", prefix: "MX$",
    main: 299, compareAt: 1490, single: 60, five: 299, twenty: 1200,
    bonus1: 340, bonus2: 540, bonus3: 240, totalStack: 2610,
    bump: 129, upsell1: 249, upsell2: 179
  },
  CO: {
    currency: "COP", locale: "es-CO", prefix: "COP $",
    main: 59900, compareAt: 299900, single: 12000, five: 59900, twenty: 239600,
    bonus1: 69900, bonus2: 109900, bonus3: 49900, totalStack: 529600,
    bump: 25900, upsell1: 49900, upsell2: 35900
  },
  CL: {
    currency: "CLP", locale: "es-CL", prefix: "CLP $",
    main: 13990, compareAt: 69990, single: 2800, five: 13990, twenty: 55960,
    bonus1: 15990, bonus2: 24990, bonus3: 11990, totalStack: 122960,
    bump: 5990, upsell1: 11990, upsell2: 7990
  },
  PE: {
    currency: "PEN", locale: "es-PE", prefix: "S/ ", placement: "before",
    main: 54.90, compareAt: 249.90, single: 11.00, five: 55.00, twenty: 220.00,
    bonus1: 59.90, bonus2: 89.90, bonus3: 39.90, totalStack: 439.60,
    bump: 24.90, upsell1: 44.90, upsell2: 29.90
  },
  UY: {
    currency: "UYU", locale: "es-UY", prefix: "$U ",
    main: 649, compareAt: 3290, single: 130, five: 650, twenty: 2600,
    bonus1: 750, bonus2: 1190, bonus3: 520, totalStack: 5750,
    bump: 280, upsell1: 540, upsell2: 380
  },
  PY: {
    currency: "PYG", locale: "es-PY", prefix: "₲",
    main: 119000, compareAt: 599000, single: 24000, five: 119000, twenty: 476000,
    bonus1: 139000, bonus2: 219000, bonus3: 99000, totalStack: 1056000,
    bump: 50000, upsell1: 99000, upsell2: 69000
  },
  BO: {
    currency: "BOB", locale: "es-BO", prefix: "Bs ",
    main: 109, compareAt: 549, single: 22, five: 109, twenty: 436,
    bonus1: 125, bonus2: 195, bonus3: 88, totalStack: 957,
    bump: 45, upsell1: 89, upsell2: 59
  },
  CR: {
    currency: "CRC", locale: "es-CR", prefix: "₡",
    main: 7900, compareAt: 39900, single: 1580, five: 7900, twenty: 31600,
    bonus1: 9000, bonus2: 14300, bonus3: 6350, totalStack: 69550,
    bump: 3300, upsell1: 6500, upsell2: 4500
  },
  GT: {
    currency: "GTQ", locale: "es-GT", prefix: "Q",
    main: 119, compareAt: 599, single: 24, five: 119, twenty: 476,
    bonus1: 135, bonus2: 215, bonus3: 95, totalStack: 1044,
    bump: 49, upsell1: 99, upsell2: 69
  },
  HN: {
    currency: "HNL", locale: "es-HN", prefix: "L",
    main: 369, compareAt: 1850, single: 75, five: 369, twenty: 1476,
    bonus1: 420, bonus2: 660, bonus3: 295, totalStack: 3225,
    bump: 150, upsell1: 299, upsell2: 210
  },
  NI: {
    currency: "NIO", locale: "es-NI", prefix: "C$",
    main: 549, compareAt: 2750, single: 110, five: 549, twenty: 2196,
    bonus1: 625, bonus2: 985, bonus3: 440, totalStack: 4800,
    bump: 230, upsell1: 450, upsell2: 320
  },
  DO: {
    currency: "DOP", locale: "es-DO", prefix: "RD$",
    main: 899, compareAt: 4490, single: 180, five: 899, twenty: 3596,
    bonus1: 1020, bonus2: 1620, bonus3: 720, totalStack: 7850,
    bump: 380, upsell1: 749, upsell2: 520
  },
  SV: { currency: "USD", locale: "es-SV", prefix: "US$" },
  PA: { currency: "USD", locale: "es-PA", prefix: "US$" },
  EC: { currency: "USD", locale: "es-EC", prefix: "US$" },
  PR: { currency: "USD", locale: "es-PR", prefix: "US$" },
  AR: { currency: "USD", locale: "es-AR", prefix: "US$" },
  VE: { currency: "USD", locale: "es-VE", prefix: "US$" },
  CU: { currency: "USD", locale: "es-CU", prefix: "US$" },
  GQ: {
    currency: "XAF", locale: "es-GQ", prefix: "XAF ",
    main: 9100, compareAt: 45900, single: 1820, five: 9100, twenty: 36400,
    bonus1: 10300, bonus2: 16400, bonus3: 7300, totalStack: 79900,
    bump: 3900, upsell1: 7500, upsell2: 5200
  },
  BR: {
    currency: "BRL", locale: "pt-BR", prefix: "R$", placement: "before",
    main: 29.90, compareAt: 147.00, single: 5.00, five: 25.00, twenty: 100.00,
    bonus1: 19.90, bonus2: 29.90, bonus3: 14.90, totalStack: 161.70,
    bump: 14.90, upsell1: 19.90, upsell2: 14.90
  },
  INT: {
    currency: "USD", locale: "es", prefix: "US$",
    main: 14.90, compareAt: 97.00, single: 3.00, five: 15.00, twenty: 60.00,
    bonus1: 17.00, bonus2: 27.00, bonus3: 12.00, totalStack: 153.00,
    bump: 6.90, upsell1: 12.90, upsell2: 9.90
  }
};

const SPANISH_MARKETS = {
  BR: { name: "Brasil", locale: "pt-BR", currency: "BRL" },
  ES: { name: "España", locale: "es-ES", currency: "EUR" },
  MX: { name: "México", locale: "es-MX", currency: "MXN" },
  GT: { name: "Guatemala", locale: "es-GT", currency: "GTQ" },
  HN: { name: "Honduras", locale: "es-HN", currency: "HNL" },
  SV: { name: "El Salvador", locale: "es-SV", currency: "USD" },
  NI: { name: "Nicaragua", locale: "es-NI", currency: "NIO" },
  CR: { name: "Costa Rica", locale: "es-CR", currency: "CRC" },
  PA: { name: "Panamá", locale: "es-PA", currency: "USD" },
  CU: { name: "Cuba", locale: "es-CU", currency: "USD" },
  DO: { name: "República Dominicana", locale: "es-DO", currency: "DOP" },
  PR: { name: "Puerto Rico", locale: "es-PR", currency: "USD" },
  AR: { name: "Argentina", locale: "es-AR", currency: "USD" },
  BO: { name: "Bolivia", locale: "es-BO", currency: "BOB" },
  CL: { name: "Chile", locale: "es-CL", currency: "CLP" },
  CO: { name: "Colombia", locale: "es-CO", currency: "COP" },
  EC: { name: "Ecuador", locale: "es-EC", currency: "USD" },
  PY: { name: "Paraguay", locale: "es-PY", currency: "PYG" },
  PE: { name: "Perú", locale: "es-PE", currency: "PEN" },
  UY: { name: "Uruguay", locale: "es-UY", currency: "UYU" },
  VE: { name: "Venezuela", locale: "es-VE", currency: "USD" },
  GQ: { name: "Guinea Ecuatorial", locale: "es-GQ", currency: "XAF" },
  INT: { name: "Internacional", locale: "es", currency: "USD" }
};

const COUNTRY_FLAGS = {
  BR: "🇧🇷", ES: "🇪🇸", MX: "🇲🇽", GT: "🇬🇹", HN: "🇭🇳", SV: "🇸🇻", NI: "🇳🇮", CR: "🇨🇷", PA: "🇵🇦",
  CU: "🇨🇺", DO: "🇩🇴", PR: "🇵🇷", AR: "🇦🇷", BO: "🇧🇴", CL: "🇨🇱", CO: "🇨🇴", EC: "🇪🇨",
  PY: "🇵🇾", PE: "🇵🇪", UY: "🇺🇾", VE: "🇻🇪", GQ: "🇬🇶", INT: "🌐"
};

let currentMarketCode = "INT";

function getStoredMarket() {
  try {
    return localStorage.getItem('preferred_market');
  } catch (e) {
    return null;
  }
}

function setStoredMarket(code) {
  try {
    localStorage.setItem('preferred_market', code);
  } catch (e) {}
}

function getFastFallbackCountry() {
  if (window.location.pathname.includes('/pt-br')) {
    return 'BR';
  }
  const navLang = (navigator.language || navigator.userLanguage || '').toUpperCase();
  for (const code in SPANISH_MARKETS) {
    if (code !== 'INT' && (navLang.includes(`-${code}`) || navLang === code)) {
      return code;
    }
  }
  return 'INT';
}

async function detectCountryByIP() {
  if (window.location.pathname.includes('/pt-br')) {
    return 'BR';
  }
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);
    const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (data && data.country_code && SPANISH_MARKETS[data.country_code]) {
        return data.country_code;
      }
    }
  } catch (e) {}
  
  return getFastFallbackCountry();
}

function getRawPrice(marketKey, priceType) {
  const market = LOCALIZED_PRICES[marketKey] || LOCALIZED_PRICES.INT;
  
  if (market[priceType] !== undefined) {
    return market[priceType];
  }
  
  // Fallback to INT
  const fallbackMarket = LOCALIZED_PRICES.INT;
  return fallbackMarket[priceType] !== undefined ? fallbackMarket[priceType] : 14.90;
}

function formatLocalizedPrice(marketKey, priceType) {
  const market = LOCALIZED_PRICES[marketKey] || LOCALIZED_PRICES.INT;
  const currency = market.currency || 'USD';
  const rawValue = getRawPrice(marketKey, priceType);

  if (currency === 'BRL') {
    if (Number.isInteger(rawValue) || rawValue % 1 === 0) {
      return `R$${Math.round(rawValue)}`;
    }
    return `R$${rawValue.toFixed(2).replace('.', ',')}`;
  }

  if (currency === 'EUR') {
    return `${rawValue.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
  }
  
  if (currency === 'USD') {
    return `US$${rawValue.toFixed(2)}`;
  }

  if (currency === 'PEN') {
    return `S/ ${rawValue.toFixed(2).replace('.', ',')}`;
  }

  const prefix = market.prefix || `${currency} $`;

  if (Number.isInteger(rawValue) || rawValue % 1 === 0) {
    return `${prefix}${Math.round(rawValue).toLocaleString(market.locale || 'es')}`;
  }

  return `${prefix}${rawValue.toLocaleString(market.locale || 'es', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function applyMarket(code, isManual = true) {
  const marketKey = SPANISH_MARKETS[code] ? code : 'INT';
  const market = SPANISH_MARKETS[marketKey];
  currentMarketCode = marketKey;

  if (isManual) {
    setStoredMarket(marketKey);
  }

  // Update text elements
  document.querySelectorAll('[data-loc-text]').forEach(el => {
    const key = el.getAttribute('data-loc-text');
    if (key === 'flag') {
      el.textContent = COUNTRY_FLAGS[marketKey] || '🌐';
    } else if (key === 'currency-code') {
      el.textContent = market.currency;
    } else if (key === 'market-name') {
      el.textContent = market.name;
    } else if (key === 'market-line') {
      el.textContent = marketKey === 'INT' ? 'Precio Internacional' : `Precio para ${market.name}`;
    }
  });

  // Update price elements
  document.querySelectorAll('[data-loc-price]').forEach(el => {
    const priceKey = el.getAttribute('data-loc-price');
    
    let mappedType = priceKey;
    if (priceKey === 'main') mappedType = 'main';
    else if (priceKey === 'compare') mappedType = 'compareAt';
    else if (priceKey === 'total-value') mappedType = 'totalStack';
    else if (priceKey === 'single-pattern') mappedType = 'single';
    else if (priceKey === 'five-patterns') mappedType = 'five';
    else if (priceKey === 'twenty-patterns') mappedType = 'twenty';

    const formatted = formatLocalizedPrice(marketKey, mappedType);
    
    if (priceKey === 'single-pattern' || priceKey === 'five-patterns' || priceKey === 'twenty-patterns') {
      el.textContent = `≈ ${formatted}`;
    } else if (priceKey === 'bonus1' || priceKey === 'bonus2' || priceKey === 'bonus3') {
      el.textContent = `Valor de referencia: ${formatted}`;
    } else if (priceKey === 'total-value') {
      el.textContent = `${formatted}`;
    } else {
      el.textContent = formatted;
    }
  });

  // Update main checkout button links if present
  const checkoutBtn = document.getElementById('mainCheckoutBtn');
  if (checkoutBtn) {
    const baseUrl = 'https://pay.hotmart.com/placeholder';
    const mainAmount = getRawPrice(marketKey, 'main');
    checkoutBtn.href = `${baseUrl}?country=${marketKey}&currency=${market.currency}&price=${mainAmount}`;
  }

  // Analytics event payload
  if (window.dataLayer || window.gtag) {
    const eventPayload = {
      event: 'market_changed',
      country: marketKey,
      country_name: market.name,
      currency: market.currency,
      displayed_value: getRawPrice(marketKey, 'main'),
      base_currency: 'USD',
      is_manual: isManual
    };
    if (window.dataLayer) window.dataLayer.push(eventPayload);
  }

  window.dispatchEvent(new CustomEvent('market_changed', { detail: { marketCode: marketKey, market } }));
}

/* Modal UI Handlers */
function openMarketModal() {
  const modal = document.getElementById('marketModal');
  if (!modal) return;
  
  renderMarketList('');
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  
  const searchInput = document.getElementById('marketSearchInput');
  if (searchInput) {
    searchInput.value = '';
    setTimeout(() => searchInput.focus(), 150);
  }
}

function closeMarketModal() {
  const modal = document.getElementById('marketModal');
  if (!modal) return;
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function renderMarketList(filterText = '') {
  const listContainer = document.getElementById('marketListScroll');
  if (!listContainer) return;

  const query = filterText.toLowerCase().trim();
  listContainer.innerHTML = '';

  const keys = Object.keys(SPANISH_MARKETS);
  
  keys.forEach(code => {
    const m = SPANISH_MARKETS[code];
    const flag = COUNTRY_FLAGS[code] || '🌐';
    const matchName = m.name.toLowerCase().includes(query);
    const matchCode = code.toLowerCase().includes(query);
    const matchCurrency = m.currency.toLowerCase().includes(query);

    if (query === '' || matchName || matchCode || matchCurrency) {
      const row = document.createElement('div');
      row.className = `market-item-row ${code === currentMarketCode ? 'active' : ''}`;
      row.setAttribute('role', 'button');
      row.setAttribute('tabindex', '0');
      
      const formattedPrice = formatLocalizedPrice(code, 'main');

      row.innerHTML = `
        <div class="market-item-left">
          <span class="market-item-flag">${flag}</span>
          <span class="market-item-country">${m.name}</span>
        </div>
        <div class="market-item-right">
          <span class="market-item-code">${m.currency}</span>
          <span class="market-item-price">${formattedPrice}</span>
        </div>
      `;

      row.addEventListener('click', () => {
        applyMarket(code, true);
        closeMarketModal();
      });

      listContainer.appendChild(row);
    }
  });
}

function setupMarketUIEvents() {
  const modal = document.getElementById('marketModal');
  const closeBtn = document.getElementById('marketModalClose');
  const autoDetectBtn = document.getElementById('autoDetectMarketBtn');
  const searchInput = document.getElementById('marketSearchInput');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMarketModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeMarketModal();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderMarketList(e.target.value);
    });
  }

  if (autoDetectBtn) {
    autoDetectBtn.addEventListener('click', async () => {
      autoDetectBtn.style.opacity = '0.6';
      autoDetectBtn.style.pointerEvents = 'none';
      try {
        localStorage.removeItem('preferred_market');
        const detected = await detectCountryByIP();
        applyMarket(detected, false);
      } finally {
        autoDetectBtn.style.opacity = '1';
        autoDetectBtn.style.pointerEvents = '';
        closeMarketModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
      closeMarketModal();
    }
  });
}

async function initLocalizationSystem() {
  if (window.location.pathname.includes('/pt-br')) {
    currentMarketCode = 'BR';
    const checkoutBtn = document.getElementById('mainCheckoutBtn');
    if (checkoutBtn) {
      checkoutBtn.href = 'https://pay.cakto.com.br/e4th3s6_1070128';
    }
    if (window.dataLayer || window.gtag) {
      const eventPayload = {
        event: 'market_changed',
        country: 'BR',
        country_name: 'Brasil',
        currency: 'BRL',
        displayed_value: 29.90,
        base_currency: 'BRL',
        is_manual: false
      };
      if (window.dataLayer) window.dataLayer.push(eventPayload);
    }
    return;
  }

  const saved = getStoredMarket();
  if (saved && SPANISH_MARKETS[saved]) {
    applyMarket(saved, false);
  } else {
    const fastFallback = getFastFallbackCountry();
    applyMarket(fastFallback, false);
    
    const detected = await detectCountryByIP();
    if (detected && SPANISH_MARKETS[detected] && !getStoredMarket()) {
      applyMarket(detected, false);
    }
  }

  setupMarketUIEvents();
}
