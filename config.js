window.APP_CONFIG = {
    brand: {
        name: 'Vie FIVE',
        slogan: 'A sua plataforma de conteúdo',
        description: 'A VieFive nasceu da rotina real de cinco estudantes que, assim como você, conhecem o desafio de render o máximo com o tempo contado. Não entregamos apenas lanches; entregamos foco, concentração e saúde em cada mordida.',
        logoHtml: '<span class="logo-v">V</span><span class="logo-ie">ie</span><span class="logo-five">FIVE</span>'
    },
    colors: {
        primary: '#C4292A',
        primaryDark: '#a02020',
        primaryLight: '#f5e8e8',
        secondary: '#4D6341',
        secondaryDark: '#3a4d30',
        secondaryLight: '#edf4ee',
        accent: '#F5EFE0',
        accentDark: '#e8dfc8'
    },
    contact: {
        whatsapp: '5511915723418',
        phone: '+551141372565',
        phoneDisplay: '(11) 4137-2565',
        email: 'viefive@gmail.com.br',
        address: 'Av. Paulista, nº 147 - 6° andar, Bela Vista - São Paulo/(SP)'
    },
    mercadoPago: {
        publicKey: 'APP_USR-9a5c032a-aac2-47c7-8215-6f28b0fab4a2',
        preferenceEndpoint: 'https://copia-gkyz.onrender.com/api/checkout/preferences',
        preferenceId: ''
    },
    emailJs: {
        serviceId: '',
        templateId: '',
        publicKey: ''
    },
    products: [
        {
            id: 'barra-guarana-cacau',
            name: 'Barra Guaraná & Cacau',
            description: 'Barra funcional com guaraná natural, nibs de cacau 70% e base de tâmaras. Estimula o estado de alerta e proporciona energia rápida para maratonas de estudo.',
            price: 12.9,
            image: 'barra vermelha.png'
        },
        {
            id: 'barra-amendoas-cerejas',
            name: 'Barra Amêndoas & Cerejas',
            description: 'Combinação premium de amêndoas, nozes e cerejas desidratadas ricas em flavonoides. Auxilia na proteção cognitiva e na manutenção da memória de longo prazo.',
            price: 12.9,
            image: 'barra verde.png'
        },
        {
            id: 'barra-acai-sementes',
            name: 'Barra Açaí & Sementes',
            description: 'Blend antioxidante de açaí puro, guaraná e mix de sementes selecionadas. Combate o estresse oxidativo mental e garante energia estável para o dia a dia acadêmico.',
            price: 12.9,
            image: 'barra amarela.png'
        },
        {
            id: 'barra-multigran',
            name: 'Barra Multigran',
            description: 'Mix de grãos integrais e sementes selecionadas. Rica em fibras e nutrientes para manter sua energia e concentração ao longo do dia.',
            price: 12.9,
            image: 'multigran.png',
            fallbackImage: 'barra verde.png'
        },
        {
            id: 'barra-maracuja',
            name: 'Barra Maracujá',
            description: 'Barra natural com maracujá que ajuda a reduzir o estresse e ansiedade durante os estudos. Ideal para momentos de foco e concentração.',
            price: 12.9,
            image: 'barramaracuja.png',
            fallbackImage: 'barra amarela.png'
        },
        {
            id: 'barra-energetica',
            name: 'Barra Energética',
            description: 'Fórmula especial com ingredientes energéticos naturais. Perfeita para dar aquele impulso extra quando você mais precisa.',
            price: 12.9,
            image: 'energetico.png',
            fallbackImage: 'barra vermelha.png'
        }
    ],
    plans: [
        {
            name: 'Prata',
            price: 0,
            period: '/mês',
            features: [
                'Acumule 1 ponto por real gasto',
                'Acesso a promoções exclusivas',
                'Newsletter com dicas de nutrição',
                'Frete grátis acima de R$ 120'
            ],
            ctaText: 'Começar grátis',
            ctaVariant: 'outline',
            highlight: false
        },
        {
            name: 'Ouro',
            price: 29,
            period: '/mês',
            features: [
                'Tudo do plano Prata',
                '2 pontos por real gasto',
                'Barra grátis a cada 10 compras',
                'Desconto de 10% em todos os pedidos',
                'Acesso antecipado a novos sabores'
            ],
            ctaText: 'Assinar Ouro',
            ctaVariant: 'outline-contrast',
            badge: 'Mais popular',
            highlight: true
        },
        {
            name: 'Diamante',
            price: 59,
            period: '/mês',
            features: [
                'Tudo do plano Ouro',
                '3 pontos por real gasto',
                'Desconto de 20% em todos os pedidos',
                'Kit boas-vindas exclusivo',
                'Suporte prioritário 24h',
                'Convite para eventos presenciais'
            ],
            ctaText: 'Assinar Diamante',
            ctaVariant: 'primary',
            highlight: false
        }
    ]
};
