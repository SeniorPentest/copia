const express = require('express');
const { MercadoPagoConfig, Preference } = require('mercadopago');
const path = require('path');
const cors = require('cors'); // Evita bloqueios entre o GitHub Pages e o Render

const app = express();
const PORT = process.env.PORT || 3000;

// O teu Token de Produção
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN || 'APP_USR-5608582127627085-041401-3446175c6aa66616106541be83cd8612-1908343024';

app.disable('x-powered-by');
app.use(cors()); 
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

// Inicialização do Mercado Pago (Versão 2)
let client;
if (MP_ACCESS_TOKEN) {
    client = new MercadoPagoConfig({ accessToken: MP_ACCESS_TOKEN });
} else {
    console.warn('MP_ACCESS_TOKEN não configurado.');
}

// Rota de pagamento
app.post('/api/checkout/preferences', async (req, res) => {
    try {
        const cartItems = req.body.items || [];
        
        const preferenceBody = {
            items: cartItems.map(item => ({
                id: item.name,
                title: item.name,
                quantity: Number(item.quantity),
                unit_price: Number(item.price),
                currency_id: 'BRL'
            })),
            back_urls: {
                success: "https://seniorpentest.github.io/copia/",
                failure: "https://seniorpentest.github.io/copia/",
                pending: "https://seniorpentest.github.io/copia/"
            },
            auto_return: "approved"
        };

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
