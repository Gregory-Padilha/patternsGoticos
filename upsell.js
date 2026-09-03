// ==========================================================================
// FUNIL GÓTICO — UPSELL INTERACTION & TRACKING LOGIC
// Compatível com: Do Bastidor ao Quadro™ (Upsell 1) & Do Ponto Cruz à Renda™ (Upsell 2)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Tracking Events
  initUpsellTracking();

  // 2. URL Parameters & Checkout Forwarding
  initCheckoutLinks();

  // 3. Mobile Sticky CTA Bar Logic
  initUpsellStickyBar();
});

/* --------------------------------------------------------------------------
   1. Upsell Event Tracking (Meta Pixel & Custom Analytics)
   -------------------------------------------------------------------------- */
function initUpsellTracking() {
  const pageProductName = document.body.getAttribute('data-product-name') || 'Do Bastidor ao Quadro';
  const pageProductId = document.body.getAttribute('data-product-id') || 'upsell-bastidor-quadro';
  const pageProductPrice = parseFloat(document.body.getAttribute('data-product-price')) || 47.00;

  // Dispara visualização de conteúdo de upsell
  if (typeof fbq === 'function') {
    fbq('track', 'ViewContent', {
      content_name: `${pageProductName} — Upsell`,
      content_type: 'product',
      content_ids: [pageProductId],
      value: pageProductPrice,
      currency: 'BRL'
    });
    fbq('trackCustom', 'UpsellView', {
      product: pageProductName,
      price: pageProductPrice,
      currency: 'BRL'
    });
  }

  // Tracking ao aceitar oferta
  const acceptButtons = document.querySelectorAll('.js-upsell-accept');
  acceptButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (typeof fbq === 'function') {
        fbq('track', 'InitiateCheckout', {
          content_name: `${pageProductName} — Upsell`,
          content_ids: [pageProductId],
          value: pageProductPrice,
          currency: 'BRL'
        });
        fbq('trackCustom', 'UpsellAccept', {
          product: pageProductName,
          price: pageProductPrice,
          currency: 'BRL'
        });
      }
    });
  });

  // Tracking ao recusar oferta
  const declineButtons = document.querySelectorAll('.js-upsell-decline');
  declineButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (typeof fbq === 'function') {
        fbq('trackCustom', 'UpsellDecline', {
          product: pageProductName,
          reason: 'declined_by_user'
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. URL Parameter Preservation & Checkout / Decline Flow
   -------------------------------------------------------------------------- */
function initCheckoutLinks() {
  const currentUrlParams = new URLSearchParams(window.location.search);
  const queryString = currentUrlParams.toString();

  // Atualiza links de aceitar oferta
  const acceptButtons = document.querySelectorAll('.js-upsell-accept');
  acceptButtons.forEach(btn => {
    const originalHref = btn.getAttribute('data-checkout-url') || btn.getAttribute('href') || '#';
    if (originalHref && originalHref !== '#') {
      if (queryString) {
        const separator = originalHref.includes('?') ? '&' : '?';
        btn.href = `${originalHref}${separator}${queryString}`;
      } else {
        btn.href = originalHref;
      }
    }
  });

  // Atualiza links de recusa de oferta
  const declineButtons = document.querySelectorAll('.js-upsell-decline');
  declineButtons.forEach(btn => {
    let targetDeclineUrl = btn.getAttribute('href') || 'oferta-especial.html';
    
    // Suporte a override por query param se fornecido pelo gateway
    if (currentUrlParams.has('thank_you_url')) {
      targetDeclineUrl = currentUrlParams.get('thank_you_url');
    } else if (currentUrlParams.has('next_step')) {
      targetDeclineUrl = currentUrlParams.get('next_step');
    }

    if (queryString) {
      const separator = targetDeclineUrl.includes('?') ? '&' : '?';
      btn.href = `${targetDeclineUrl}${separator}${queryString}`;
    } else {
      btn.href = targetDeclineUrl;
    }
  });
}

/* --------------------------------------------------------------------------
   3. Smart Mobile Sticky CTA Bar
   -------------------------------------------------------------------------- */
function initUpsellStickyBar() {
  const stickyBar = document.getElementById('upsellStickyBar');
  if (!stickyBar) return;

  const stackSection = document.getElementById('offer-stack');
  const finalCtaSection = document.getElementById('final-cta');

  let isScrolling = false;

  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        const scrollPos = window.scrollY || window.pageYOffset;
        
        // Verifica se os blocos de conversão estão visíveis na tela
        const stackRect = stackSection ? stackSection.getBoundingClientRect() : null;
        const finalRect = finalCtaSection ? finalCtaSection.getBoundingClientRect() : null;

        const isAtStack = stackRect ? (stackRect.top < window.innerHeight && stackRect.bottom > 0) : false;
        const isAtFinal = finalRect ? (finalRect.top < window.innerHeight && finalRect.bottom > 0) : false;

        // Exibe a barra apenas após o scroll inicial de 380px e quando não estiver sobrepondo os CTAs fixos
        if (scrollPos > 380 && !isAtStack && !isAtFinal) {
          stickyBar.classList.add('visible');
        } else {
          stickyBar.classList.remove('visible');
        }

        isScrolling = false;
      });
      isScrolling = true;
    }
  }, { passive: true });
}
