// ===========================
// Config & DOM references
// ===========================

const APP_CONFIG = window.APP_CONFIG || {};
const BRAND = APP_CONFIG.brand || {};
const COLORS = APP_CONFIG.colors || {};
const CONTACT = APP_CONFIG.contact || {};
const MERCADO_PAGO = APP_CONFIG.mercadoPago || {};
const EMAILJS_CONFIG = APP_CONFIG.emailJs || {};
const PRODUCTS = APP_CONFIG.products || [];
const PLANS = APP_CONFIG.plans || [];

const DEFAULT_BRAND_DESCRIPTION = `${BRAND.name || 'Nossa marca'} nasceu para entregar foco, concentração e saúde em cada produto.`;
const BRAND_NAME = BRAND.name || 'Vie FIVE';
const BRAND_SLOGAN = BRAND.slogan || 'A sua plataforma de conteúdo';
const BRAND_DESCRIPTION = BRAND.description || DEFAULT_BRAND_DESCRIPTION;

let currentSlide = 0;
const carousel = document.querySelector('.snacks-carousel');
const carouselWrapper = document.querySelector('.snacks-carousel-wrapper');
const prevBtn = document.querySelector('.carousel-btn-prev');
const nextBtn = document.querySelector('.carousel-btn-next');
const dotsContainer = document.querySelector('.carousel-dots');
const CART_STORAGE_KEY = `${BRAND_NAME.toLowerCase().replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '') || 'store'}-cart`;
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalValue = document.getElementById('cart-total-value');
const cartToggle = document.getElementById('cart-toggle');
const cartClose = document.getElementById('cart-close');
const clearCartBtn = document.getElementById('clear-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const cartCountEl = document.getElementById('cart-count');
const whatsappButton = document.getElementById('whatsapp-button');
const contactForm = document.getElementById('contact-form');
const formStatus  = document.getElementById('form-status');
 codex/create-readme-customization-guide
const appConfig = window.APP_CONFIG || {};
const MP_PREFERENCE_ENDPOINT = appConfig.mercadoPago?.preferenceEndpoint || 'https://copia-gkyz.onrender.com/api/checkout/preferences';
const MP_STATIC_PREFERENCE_ID = (checkoutBtn?.dataset.preferenceId || '').trim() || appConfig.mercadoPago?.staticPreferenceId || window.MP_PREFERENCE_ID || '';
const MP_PUBLIC_KEY = appConfig.mercadoPago?.publicKey || 'APP_USR-9a5c032a-aac2-47c7-8215-6f28b0fab4a2';
const WHATSAPP_NUMBER = appConfig.whatsappNumber || '5511915723418';
const emailConfig = appConfig.emailjs || {};

 codex/create-config-js-and-refactor-index

const defaultPreferenceEndpoint = (checkoutBtn?.dataset.preferenceEndpoint || '').trim() || 'https://copia-gkyz.onrender.com/api/checkout/preferences';
let mpPreferenceEndpoint = MERCADO_PAGO.preferenceEndpoint || defaultPreferenceEndpoint;
let mpPreferenceId = MERCADO_PAGO.preferenceId || (checkoutBtn?.dataset.preferenceId || '').trim() || window.MP_PREFERENCE_ID || '';
let mpPublicKey = MERCADO_PAGO.publicKey || 'APP_USR-9a5c032a-aac2-47c7-8215-6f28b0fab4a2';

let whatsappNumber = CONTACT.whatsapp || '5511915723418';
const contactEmail = CONTACT.email || 'viefive@gmail.com.br';
const contactPhone = CONTACT.phone || '+551141372565';
const contactPhoneDisplay = CONTACT.phoneDisplay || '(11) 4137-2565';
const contactAddress = CONTACT.address || 'Av. Paulista, nº 147 - 6° andar, Bela Vista - São Paulo/(SP)';


 codex/add-loading-spinner-finalizar-compra
const checkoutStatus = document.getElementById('checkout-status');
const preferenceEndpointAttr = checkoutBtn?.dataset.preferenceEndpoint?.trim();
const MP_PREFERENCE_ENDPOINT = preferenceEndpointAttr && preferenceEndpointAttr.startsWith('http')
    ? preferenceEndpointAttr
    : 'https://copia-gkyz.onrender.com/api/checkout/preferences';

const HEALTH_ENDPOINT = 'https://copia-gkyz.onrender.com/health';
const MP_PREFERENCE_ENDPOINT = 'https://copia-gkyz.onrender.com/api/checkout/preferences';
 main
const MP_STATIC_PREFERENCE_ID = (checkoutBtn?.dataset.preferenceId || '').trim() || window.MP_PREFERENCE_ID || '';
const MP_PUBLIC_KEY = 'APP_USR-9a5c032a-aac2-47c7-8215-6f28b0fab4a2';
const CHECKOUT_TIMEOUT_MS = 40000;
const WHATSAPP_NUMBER = '5511915723418';
const checkoutBtnLabel = checkoutBtn ? checkoutBtn.querySelector('.btn-label') : null;
const defaultCheckoutLabel = checkoutBtnLabel?.textContent.trim() || checkoutBtn?.textContent.trim() || 'Finalizar Compra';
 main
 main
let cart = [];
let mpInstance = null;
let emailInitialized = false;

function shadeColor(hex, percent) {
    if (!hex || typeof hex !== 'string') return hex;
    const normalized = hex.replace('#', '');
    if (![3, 6].includes(normalized.length)) return hex;
    const full = normalized.length === 3 ? normalized.split('').map(c => c + c).join('') : normalized;
    const num = parseInt(full, 16);
    if (Number.isNaN(num)) return hex;
    const amt = Math.round(2.55 * percent);
    const r = Math.min(255, Math.max(0, (num >> 16) + amt));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt));
    const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amt));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function applyThemeColors(theme) {
    if (!theme || !document?.documentElement) return;
    const rootStyle = document.documentElement.style;

    if (theme.primary) {
        rootStyle.setProperty('--red', theme.primary);
        rootStyle.setProperty('--red-dark', theme.primaryDark || shadeColor(theme.primary, -15));
        rootStyle.setProperty('--red-light', theme.primaryLight || shadeColor(theme.primary, 25));
    }
    if (theme.secondary) {
        rootStyle.setProperty('--moss', theme.secondary);
        rootStyle.setProperty('--moss-dark', theme.secondaryDark || shadeColor(theme.secondary, -15));
        rootStyle.setProperty('--moss-light', theme.secondaryLight || shadeColor(theme.secondary, 25));
    }
    if (theme.accent) {
        rootStyle.setProperty('--beige', theme.accent);
        rootStyle.setProperty('--beige-dark', theme.accentDark || shadeColor(theme.accent, -10));
    }
}

function setText(id, value) {
    if (!value) return;
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

function applyBranding() {
    document.title = `${BRAND_NAME} – ${BRAND_SLOGAN}`;
    const logo = document.getElementById('brand-logo');
    if (logo) {
        logo.innerHTML = BRAND.logoHtml || BRAND_NAME;
    }
    setText('hero-badge', BRAND_SLOGAN);
    setText('hero-description', BRAND_DESCRIPTION);
    setText('loyalty-tag', `${BRAND_NAME} Points`);
    setText('cart-title', `Carrinho ${BRAND_NAME}`);
    setText('footer-brand-name', BRAND_NAME);
    setText('plans-description', `Três níveis de benefícios para você aproveitar ao máximo a experiência ${BRAND_NAME}.`);
    setText('loyalty-card-logo', BRAND_NAME);

    const footerLogoImg = document.getElementById('footer-logo-img');
    if (footerLogoImg) {
        footerLogoImg.alt = `${BRAND_NAME} Logo`;
    }
}

function applyContactInfo() {
    const emailLink = document.getElementById('contact-email-link');
    if (emailLink) {
        emailLink.textContent = contactEmail;
        emailLink.href = `mailto:${contactEmail}`;
    }

    const phoneLink = document.getElementById('contact-phone-link');
    if (phoneLink) {
        phoneLink.textContent = contactPhoneDisplay;
        phoneLink.href = `tel:${contactPhone}`;
    }

    const addressEl = document.getElementById('contact-address');
    if (addressEl) {
        addressEl.textContent = contactAddress;
    }
}

function applyPaymentConfig() {
    if (checkoutBtn && mpPreferenceEndpoint) {
        checkoutBtn.dataset.preferenceEndpoint = mpPreferenceEndpoint;
    }
    if (checkoutBtn && mpPreferenceId) {
        checkoutBtn.dataset.preferenceId = mpPreferenceId;
    }
}

function applyEmailJsConfig() {
    if (!contactForm) return;
    const { serviceId, templateId, publicKey } = EMAILJS_CONFIG;
    if (serviceId) contactForm.dataset.emailjsServiceId = serviceId;
    if (templateId) contactForm.dataset.emailjsTemplateId = templateId;
    if (publicKey) contactForm.dataset.emailjsPublicKey = publicKey;
}

function renderProducts() {
    if (!carousel) return;
    carousel.innerHTML = '';
    if (!PRODUCTS.length) return;

    const fragment = document.createDocumentFragment();
    PRODUCTS.forEach(product => {
        const price = Number(product.price) || 0;
        const fallbackAttr = product.fallbackImage ? ` data-fallback="${product.fallbackImage}"` : '';
        const card = document.createElement('div');
        card.className = 'snack-card';
        card.innerHTML = `
            <div class="snack-card-img"><img src="${product.image}" alt="${product.name}"${fallbackAttr}></div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="snack-price">
                <span class="price-from">a partir de</span>
                <span class="price-value">${formatCurrency(price)}</span>
            </div>
            <button class="btn btn-primary btn-add-cart" data-id="${product.id}" data-name="${product.name}" data-price="${price.toFixed(2)}">
                Adicionar ao Carrinho
            </button>
        `;
        fragment.appendChild(card);
    });
    carousel.appendChild(fragment);
}

function renderPlans() {
    const plansGrid = document.getElementById('plans-grid');
    if (!plansGrid) return;
    plansGrid.innerHTML = '';
    if (!PLANS.length) return;

    const fragment = document.createDocumentFragment();
    PLANS.forEach(plan => {
        const card = document.createElement('div');
        card.className = 'plan-card';
        if (plan.highlight) card.classList.add('plan-card-featured');

        const priceFormatted = formatCurrency(Number(plan.price) || 0);
        const [currency, ...rest] = priceFormatted.split(/\s+/);
        const amountText = rest.join(' ') || priceFormatted.replace(currency || '', '').trim() || `${plan.price || 0}`;
        const badge = plan.badge ? `<span class="plan-badge">${plan.badge}</span>` : '';
        const ctaVariant = plan.ctaVariant || (plan.highlight ? 'outline-contrast' : 'primary');

        let ctaClass = 'btn btn-primary';
        let ctaStyle = '';
        if (ctaVariant === 'outline') {
            ctaClass = 'btn btn-outline-dark';
        } else if (ctaVariant === 'outline-contrast') {
            ctaClass = 'btn btn-outline-dark';
            ctaStyle = ' style="background:#fff;color:var(--red);"';
        }

        const featureItems = (plan.features || []).map(item => `<li>${item}</li>`).join('');

        card.innerHTML = `
            ${badge}
            <p class="plan-name">${plan.name}</p>
            <div class="plan-price">
                <span class="plan-currency">${currency || 'R$'}</span>
                <span class="plan-amount">${amountText}</span>
                <span class="plan-period">${plan.period || '/mês'}</span>
            </div>
            <ul class="plan-features">
                ${featureItems}
            </ul>
            <a href="#contact" class="${ctaClass}"${ctaStyle}>${plan.ctaText || 'Assinar'}</a>
        `;
        fragment.appendChild(card);
    });

    plansGrid.appendChild(fragment);
}

function initSnackImageFallbacks() {
    const images = document.querySelectorAll('.snack-card-img img[data-fallback]');
    images.forEach(img => {
        img.addEventListener('error', () => {
            const fallback = img.dataset.fallback;
            if (fallback) {
                img.src = fallback;
                img.removeAttribute('data-fallback');
            }
        }, { once: true });
    });
}

function initCarousel() {
    if (!carousel || !carouselWrapper) return;

    carousel.classList.add('is-carousel');

    const cards = carousel.querySelectorAll('.snack-card');
    const totalSlides = cards.length;
    if (!totalSlides) {
        if (dotsContainer) dotsContainer.innerHTML = '';
        if (prevBtn) prevBtn.disabled = true;
        if (nextBtn) nextBtn.disabled = true;
        carousel.style.transform = 'none';
        return;
    }
    const carouselMobileBreakpoint = 700;
    const mobileQuery = window.matchMedia(`(max-width: ${carouselMobileBreakpoint}px)`);

    // Create dots
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    // Update carousel position
    function updateCarousel() {
        if (mobileQuery.matches) {
            carousel.style.transform = 'none';
        } else {
            const cardWidth = cards[0]?.offsetWidth ? cards[0].offsetWidth + 24 : 0; // card width + gap
            carousel.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
        }

        // Update dots
        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        // Update button states
        if (prevBtn) prevBtn.disabled = mobileQuery.matches || currentSlide === 0;
        if (nextBtn) nextBtn.disabled = mobileQuery.matches || currentSlide === totalSlides - 1;
    }

    function goToSlide(index) {
        currentSlide = Math.max(0, Math.min(index, totalSlides - 1));
        updateCarousel();
    }

    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateCarousel();
        }
    }

    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        }
    }

    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Handle window resize
    window.addEventListener('resize', updateCarousel);

    // Initial update
    updateCarousel();
}

// ===========================
// Cart & Checkout
// ===========================

function formatCurrency(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function loadCart() {
    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        cart = stored ? JSON.parse(stored) : [];
    } catch (error) {
        cart = [];
    }
}

function saveCart() {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
        console.error('Não foi possível salvar o carrinho no navegador.', error);
    }
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function getCartCount() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function renderCart() {
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = '';

    if (!cart.length) {
        const empty = document.createElement('p');
        empty.className = 'cart-empty';
        empty.textContent = 'Seu carrinho está vazio. Adicione snacks para começar o pedido.';
        cartItemsContainer.appendChild(empty);
    } else {
        const fragment = document.createDocumentFragment();
        cart.forEach(item => {
            const row = document.createElement('div');
            row.className = 'cart-item';
            row.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span>${formatCurrency(item.price)} / un.</span>
                </div>
                <div class="cart-item-actions">
                    <div class="cart-qty">
                        <button type="button" data-action="decrease" data-id="${item.id}" aria-label="Diminuir quantidade">-</button>
                        <span>${item.quantity}</span>
                        <button type="button" data-action="increase" data-id="${item.id}" aria-label="Aumentar quantidade">+</button>
                    </div>
                    <div class="cart-item-total">${formatCurrency(item.price * item.quantity)}</div>
                    <button class="cart-remove" type="button" data-action="remove" data-id="${item.id}" aria-label="Remover item">✕</button>
                </div>
            `;
            fragment.appendChild(row);
        });
        cartItemsContainer.appendChild(fragment);
    }

    if (cartTotalValue) cartTotalValue.textContent = formatCurrency(getCartTotal());
    if (cartCountEl) cartCountEl.textContent = getCartCount();
}

function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += product.quantity || 1;
    } else {
        cart.push({ ...product, quantity: product.quantity || 1 });
    }
    saveCart();
    renderCart();
}

function changeQuantity(id, delta) {
    const item = cart.find(entry => entry.id === id);
    if (!item) return;
    item.quantity = Math.max(1, item.quantity + delta);
    saveCart();
    renderCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCart();
}

function clearCartItems() {
    cart = [];
    saveCart();
    renderCart();
}

function openCart() {
    if (cartDrawer && cartOverlay) {
        cartDrawer.classList.add('open');
        cartDrawer.setAttribute('aria-hidden', 'false');
        cartOverlay.classList.add('open');
        document.body.classList.add('cart-open');
    }

    if (HEALTH_ENDPOINT) {
        fetch(HEALTH_ENDPOINT).catch(() => {});
    }
}

function closeCart() {
    if (cartDrawer && cartOverlay) {
        cartDrawer.classList.remove('open');
        cartDrawer.setAttribute('aria-hidden', 'true');
        cartOverlay.classList.remove('open');
        document.body.classList.remove('cart-open');
    }
}

function setupCartInteractions() {
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', (event) => {
            const actionBtn = event.target.closest('[data-action]');
            if (!actionBtn) return;
            const { action, id } = actionBtn.dataset;
            if (action === 'increase') changeQuantity(id, 1);
            if (action === 'decrease') changeQuantity(id, -1);
            if (action === 'remove') removeFromCart(id);
        });
    }

    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
    if (cartClose) cartClose.addEventListener('click', closeCart);
    if (clearCartBtn) clearCartBtn.addEventListener('click', clearCartItems);
    if (cartToggle) cartToggle.addEventListener('click', openCart);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeCart();
    });
}

function setupAddToCartButtons() {
    const buttons = document.querySelectorAll('.btn-add-cart');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const price = parseFloat(btn.dataset.price || '0');
            const product = {
                id: btn.dataset.id || btn.dataset.name || `item-${Date.now()}`,
                name: btn.dataset.name || btn.textContent.trim(),
                price: isNaN(price) ? 0 : price,
                quantity: 1,
            };
            addToCart(product);
            openCart();
        });
    });
}

function initMercadoPago() {
    if (!window.MercadoPago || !mpPublicKey) return;
    if (!mpInstance) {
        mpInstance = new MercadoPago(mpPublicKey, { locale: 'pt-BR' });
    }
}

function setCheckoutStatus(message = '', type = 'info') {
    if (!checkoutStatus) return;
    checkoutStatus.textContent = message;
    checkoutStatus.className = message ? `cart-status ${type}` : 'cart-status';
    checkoutStatus.hidden = !message;
}

function setCheckoutLoading(isLoading, loadingLabel = 'Finalizando...') {
    if (!checkoutBtn) return;
    checkoutBtn.disabled = isLoading;
    checkoutBtn.classList.toggle('is-loading', isLoading);
    checkoutBtn.setAttribute('aria-busy', isLoading ? 'true' : 'false');
    if (checkoutBtnLabel) {
        checkoutBtnLabel.textContent = isLoading ? loadingLabel : defaultCheckoutLabel;
    }
}

async function handleCheckout() {
    setCheckoutStatus('', 'info');

    if (!cart.length) {
        setCheckoutStatus('Adicione itens ao carrinho para finalizar a compra.', 'error');
        return;
    }

    setCheckoutLoading(true, 'Preparando...');
    initMercadoPago();
    if (!mpInstance) {
        setCheckoutStatus('Não foi possível carregar o Mercado Pago. Verifique sua conexão.', 'error');
        setCheckoutLoading(false);
        return;
    }

    let preferenceId = mpPreferenceId;
    const endpointToUse = mpPreferenceEndpoint || checkoutBtn?.dataset.preferenceEndpoint || '';

 codex/create-config-js-and-refactor-index
    if (!preferenceId && endpointToUse) {
        try {
            const response = await fetch(endpointToUse, {

    if (!preferenceId && MP_PREFERENCE_ENDPOINT) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), CHECKOUT_TIMEOUT_MS);

        try {
            setCheckoutStatus('Conectando ao servidor de pagamento...', 'info');
            const response = await fetch(MP_PREFERENCE_ENDPOINT, {
 main
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cart.map(item => ({
                        title: item.name,
                        quantity: item.quantity,
                        unit_price: item.price,
                        currency_id: 'BRL',
                    })),
                    total_amount: getCartTotal(),
                }),
                signal: controller.signal,
            });

            if (!response.ok) throw new Error('Erro ao criar preferência');
            const data = await response.json();
            preferenceId = data.id || data.preferenceId || data.preference_id;
 codex/create-config-js-and-refactor-index
            mpPreferenceId = preferenceId;

            setCheckoutStatus('', 'info');
 main
        } catch (error) {
            console.error('Erro ao criar preferência', error);
            const message = controller.signal.aborted
                ? 'Servidor iniciando, tente novamente em instantes'
                : 'Não foi possível iniciar o pagamento agora. Tente novamente em instantes.';
            setCheckoutStatus(message, 'error');
            setCheckoutLoading(false);
            return;
        } finally {
            clearTimeout(timeoutId);
        }
    }

    if (!preferenceId) {
 codex/create-config-js-and-refactor-index
        alert('Defina um preferenceId ou endpoint do Mercado Pago no config.js para concluir o pagamento.');

        setCheckoutStatus('Defina um preferenceId ou endpoint do Mercado Pago para concluir o pagamento.', 'error');
        setCheckoutLoading(false);
 main
        return;
    }

    try {
        setCheckoutStatus('Redirecionando para o pagamento...', 'info');
        mpInstance.checkout({ preferenceId }).open();
        setCheckoutStatus('', 'info');
    } catch (error) {
        console.error('Erro ao abrir checkout', error);
        setCheckoutStatus('Não foi possível abrir o checkout agora. Tente novamente em instantes.', 'error');
    } finally {
        setCheckoutLoading(false);
    }
}

function setupCheckoutButton() {
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
}

function setupWhatsappButton() {
    if (!whatsappButton) return;
    whatsappButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (!whatsappNumber) {
            alert('Número de WhatsApp não configurado. Atualize o config.js.');
            return;
        }
        const summary = cart.length
            ? cart.map(item => `${item.quantity}x ${item.name} - ${formatCurrency(item.price * item.quantity)}`).join('\n')
            : `Quero conhecer os snacks da ${BRAND_NAME}!`;
        const total = formatCurrency(getCartTotal());
        const message = cart.length
            ? `Olá! Gostaria de finalizar um pedido:\n${summary}\n\nTotal: ${total}`
            : `Olá! ${summary}`;
        const link = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(link, '_blank');
    });
}

// ===========================
// Navigation
// ===========================

const header    = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
const navAnchors = navLinks ? navLinks.querySelectorAll('a') : [];

// Sticky header on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    updateActiveNavLink();
    revealOnScroll();
});

// Hamburger menu toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });
}

// Close mobile menu when a link is clicked
navAnchors.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// ===========================
// Dropdown keyboard support
// ===========================

document.querySelectorAll('.has-dropdown > a').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 700) {
            e.preventDefault();
            const parent = trigger.parentElement;
            parent.classList.toggle('open');
        }
    });
});

// ===========================
// Active Nav Link Highlight
// ===========================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const top    = section.offsetTop;
        const height = section.offsetHeight;
        const id     = section.getAttribute('id');
        const link   = navLinks ? navLinks.querySelector(`a[href="#${id}"]`) : null;

        if (link) {
            if (scrollPos >= top && scrollPos < top + height) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}

// ===========================
// Scroll Reveal Animation
// ===========================

function revealOnScroll() {
    const revealElements = document.querySelectorAll('.reveal');
    const windowHeight   = window.innerHeight;

    revealElements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < windowHeight - 60) {
            el.classList.add('visible');
        }
    });
}

// ===========================
// Contact Form
// ===========================

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name    = contactForm.name.value.trim();
        const email   = contactForm.email.value.trim();
        const subject = (contactForm.subject?.value || '').trim() || `Contato ${BRAND_NAME}`;
        const message = contactForm.message.value.trim();

        if (!name || !email || !message) {
            setFormStatus('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            setFormStatus('Por favor, insira um e-mail válido.', 'error');
            return;
        }

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const submitSpan = submitBtn ? submitBtn.querySelector('span') : null;
        if (submitBtn) submitBtn.disabled = true;
        if (submitSpan) submitSpan.textContent = 'Enviando...';

        const serviceId = contactForm.dataset.emailjsServiceId || emailConfig.serviceId;
        const templateId = contactForm.dataset.emailjsTemplateId || emailConfig.templateId;
        const publicKey = contactForm.dataset.emailjsPublicKey || emailConfig.publicKey;
        const toEmail = contactForm.dataset.emailjsTo || emailConfig.toEmail || 'viefive@gmail.com.br';

        try {
            if (!window.emailjs || !serviceId || !templateId || !publicKey) {
                setFormStatus('Configuração de e-mail ausente. Atualize o config.js.', 'error');
                throw new Error('Configuração do EmailJS ausente');
            }

            if (!emailInitialized) {
                emailjs.init(publicKey);
                emailInitialized = true;
            }

            await emailjs.send(serviceId, templateId, {
                from_name: name,
                reply_to: email,
                subject,
                message,
 codex/create-readme-customization-guide
                to_email: toEmail,

                to_email: contactEmail,
 main
            });

            setFormStatus('Mensagem enviada com sucesso! Em breve entraremos em contato. ✉', 'success');
            contactForm.reset();
        } catch (error) {
            console.error(error);
            setFormStatus('Não foi possível enviar agora. Verifique as configurações do EmailJS.', 'error');
        } finally {
            if (submitBtn) submitBtn.disabled = false;
            if (submitSpan) submitSpan.textContent = 'Enviar Mensagem';
        }
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setFormStatus(msg, type) {
    if (!formStatus) return;
    formStatus.textContent = msg;
    formStatus.className = 'form-status ' + type;

    setTimeout(() => {
        formStatus.textContent = '';
        formStatus.className = 'form-status';
    }, 5000);
}

// ===========================
// Init on DOM ready
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    applyThemeColors(COLORS);
    applyBranding();
    applyContactInfo();
    applyPaymentConfig();
    applyEmailJsConfig();

    renderProducts();
    renderPlans();
    initSnackImageFallbacks();
    initCarousel();
    loadCart();
    renderCart();
    setupCartInteractions();
    setupAddToCartButtons();
    setupCheckoutButton();
    setupWhatsappButton();
    initMercadoPago();

    // Add reveal class to cards and sections
    const targets = document.querySelectorAll(
        '.snack-card, .value-card, .program-card, .plan-card, ' +
        '.channel-card, .loyalty-text, .loyalty-visual, ' +
        '.compliance-text, .compliance-seals, ' +
        '.contact-info, .contact-form, .section-header'
    );
    targets.forEach(el => {
        if (!el.classList.contains('reveal')) {
            el.classList.add('reveal');
        }
    });

    revealOnScroll();
    updateActiveNavLink();
});
