const express = require('express');
const mercadopago = require('mercadopago');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN || '';

app.disable('x-powered-by');
app.use(express.json());
app.use(express.static(path.join(__dirname)));

if (MP_ACCESS_TOKEN) {
    mercadopago.configure({ access_token: MP_ACCESS_TOKEN });
} else {
    console.warn('MP_ACCESS_TOKEN não configurado. Configure para criar preferências.');
}

app.post('/api/checkout/preferences', async (req, res) => {
    if (!MP_ACCESS_TOKEN) {
        return res.status(500).json({ error: 'MP_ACCESS_TOKEN não configurado no servidor.' });
    }

    const items = Array.isArray(req.body?.items) ? req.body.items : [];
    if (!items.length) {
        return res.status(400).json({ error: 'Itens do carrinho são obrigatórios.' });
    }

    const sanitizedItems = items.map((item, index) => {
        const quantity = Number(item.quantity) || 1;
        const unitPrice = Number(item.unit_price) || 0;
        return {
            title: item.title ? String(item.title) : `Item ${index + 1}`,
            quantity: quantity > 0 ? quantity : 1,
            unit_price: unitPrice >= 0 ? unitPrice : 0,
            currency_id: item.currency_id || 'BRL',
        };
    });

    const preferencePayload = {
        items: sanitizedItems,
        auto_return: 'approved',
    };

    const backUrls = req.body?.back_urls;
    if (backUrls && typeof backUrls === 'object') {
        const normalizedBackUrls = {
            success: backUrls.success,
            failure: backUrls.failure,
            pending: backUrls.pending,
        };
        const filteredBackUrls = Object.fromEntries(
            Object.entries(normalizedBackUrls).filter(([, value]) => Boolean(value))
        );
        if (Object.keys(filteredBackUrls).length) {
            preferencePayload.back_urls = filteredBackUrls;
        }
    }

    const payer = req.body?.payer;
    if (payer && typeof payer === 'object') {
        const normalizedPayer = {};
        if (payer.email) normalizedPayer.email = payer.email;
        if (payer.name) normalizedPayer.name = payer.name;
        if (Object.keys(normalizedPayer).length) {
            preferencePayload.payer = normalizedPayer;
        }
    }

    if (req.body?.notification_url) {
        preferencePayload.notification_url = req.body.notification_url;
    }

    try {
        const preference = await mercadopago.preferences.create(preferencePayload);
        return res.status(201).json({ id: preference.body.id });
    } catch (error) {
        console.error('Erro ao criar preferência do Mercado Pago', error);
        return res.status(500).json({ error: 'Não foi possível criar a preferência de pagamento.' });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado em http://localhost:${PORT}`);
});
