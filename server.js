const express = require('express');
const { MercadoPagoConfig, Preference } = require('mercadopago');
const path = require('path');
const cors = require('cors'); // Evita bloqueios entre o GitHub Pages e o Render

const app = express();
const PORT = process.env.PORT || 3000;

// O teu Token de Produção
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN || 'APP_USR-5608582127627085-041401-3446175c6aa66616106541be83cd8612-1908343024';

const allowedOrigins = ['https://seniorpentest.github.io', 'http://localhost:3000'];

app.disable('x-powered-by');
app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'OPTIONS'],
}));
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Inicialização do Mercado Pago (Versão 2)
const client = MP_ACCESS_TOKEN
    ? new MercadoPagoConfig({ accessToken: MP_ACCESS_TOKEN })
    : null;

if (!client) {
    console.warn('MP_ACCESS_TOKEN não configurado.');
}

// Rota de pagamento
app.post('/api/checkout/preferences', async (req, res) => {
    if (!client) {
        return res.status(500).json({ error: 'Token do Mercado Pago não configurado' });
    }

    try {
        const { items = [], back_urls = {}, payer } = req.body || {};

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Itens do carrinho são obrigatórios.' });
        }

        const preferenceItems = [];
        for (const item of items) {
            const title = item.title || item.name;
            const quantity = Number(item.quantity);
            const unitPrice = Number(item.unit_price ?? item.price);

            if (!title || !Number.isFinite(quantity) || quantity <= 0 || !Number.isFinite(unitPrice) || unitPrice < 0) {
                return res.status(400).json({ error: 'Itens do carrinho inválidos.' });
            }

            preferenceItems.push({
                id: item.id || title,
                title,
                quantity,
                unit_price: unitPrice,
                currency_id: item.currency_id || 'BRL',
            });
        }

        const defaultBackUrls = {
            success: 'https://seniorpentest.github.io/copia/',
            failure: 'https://seniorpentest.github.io/copia/',
            pending: 'https://seniorpentest.github.io/copia/',
        };

        const preferenceBackUrls = typeof back_urls === 'object' && back_urls !== null
            ? {
                success: back_urls.success || defaultBackUrls.success,
                failure: back_urls.failure || defaultBackUrls.failure,
                pending: back_urls.pending || defaultBackUrls.pending,
            }
            : defaultBackUrls;

        const preferenceBody = {
            items: preferenceItems,
            back_urls: preferenceBackUrls,
            auto_return: 'approved',
        };

        if (payer && typeof payer === 'object') {
            preferenceBody.payer = payer;
        }

        const preference = new Preference(client);
        const result = await preference.create({ body: preferenceBody });

        return res.status(201).json({ id: result.id });
    } catch (error) {
        console.error('Erro ao criar preferência:', error);
        return res.status(500).json({ error: 'Falha ao criar preferência' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor ativo na porta ${PORT}`);
});
