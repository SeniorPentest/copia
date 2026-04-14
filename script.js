// ===========================
// Snacks Carousel
// ===========================

let currentSlide = 0;
const carousel = document.querySelector('.snacks-carousel');
const carouselWrapper = document.querySelector('.snacks-carousel-wrapper');
const prevBtn = document.querySelector('.carousel-btn-prev');
const nextBtn = document.querySelector('.carousel-btn-next');
const dotsContainer = document.querySelector('.carousel-dots');
const CART_STORAGE_KEY = 'viefive-cart';
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
const appConfig = window.APP_CONFIG || {};
const MP_PREFERENCE_ENDPOINT = appConfig.mercadoPago?.preferenceEndpoint || 'https://copia-gkyz.onrender.com/api/checkout/preferences';
const MP_STATIC_PREFERENCE_ID = (checkoutBtn?.dataset.preferenceId || '').trim() || appConfig.mercadoPago?.staticPreferenceId || window.MP_PREFERENCE_ID || '';
const MP_PUBLIC_KEY = appConfig.mercadoPago?.publicKey || 'APP_USR-9a5c032a-aac2-47c7-8215-6f28b0fab4a2';
const WHATSAPP_NUMBER = appConfig.whatsappNumber || '5511915723418';
const emailConfig = appConfig.emailjs || {};
let cart = [];
let mpInstance = null;
let emailInitialized = false;

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
            const cardWidth = cards[0].offsetWidth + 24; // card width + gap
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
    if (!window.MercadoPago) return;
    if (!mpInstance) {
        mpInstance = new MercadoPago(MP_PUBLIC_KEY, { locale: 'pt-BR' });
    }
}

async function handleCheckout() {
    if (!cart.length) {
        alert('Adicione itens ao carrinho para finalizar a compra.');
        return;
    }

    initMercadoPago();
    if (!mpInstance) {
        alert('O SDK do Mercado Pago não foi carregado. Verifique sua conexão.');
        return;
    }

    let preferenceId = MP_STATIC_PREFERENCE_ID;

    if (!preferenceId && MP_PREFERENCE_ENDPOINT) {
        try {
            const response = await fetch(MP_PREFERENCE_ENDPOINT, {
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
            });

            if (!response.ok) throw new Error('Erro ao criar preferência');
            const data = await response.json();
            preferenceId = data.id || data.preferenceId || data.preference_id;
        } catch (error) {
            console.error('Erro ao criar preferência', error);
            alert('Não foi possível iniciar o pagamento. Verifique o endpoint configurado.');
            return;
        }
    }

    if (!preferenceId) {
        alert('Defina um preferenceId ou endpoint do Mercado Pago para concluir o pagamento.');
        return;
    }

    mpInstance.checkout({ preferenceId }).open();
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
        const summary = cart.length
            ? cart.map(item => `${item.quantity}x ${item.name} - ${formatCurrency(item.price * item.quantity)}`).join('\n')
            : 'Quero conhecer os snacks da VieFive!';
        const total = formatCurrency(getCartTotal());
        const message = cart.length
            ? `Olá! Gostaria de finalizar um pedido:\n${summary}\n\nTotal: ${total}`
            : `Olá! ${summary}`;
        const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
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
        const subject = (contactForm.subject?.value || '').trim() || 'Contato VieFive';
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
                to_email: toEmail,
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
    // Initialize carousel
    initCarousel();
    initSnackImageFallbacks();
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
