# Como personalizar este template

Guia rápido, em linguagem simples, para trocar logo/imagens, cores, canais de contato e publicar o site.

## 1) Trocar logo e imagens
- Todas as imagens ficam na raiz do projeto (mesma pasta do `index.html`), por exemplo `barra vermelha.png`, `fotologo.jpeg`, `rodape-removebg-preview.png`.
- Para trocar, salve a nova imagem com o **mesmo nome e extensão** e substitua o arquivo (assim não precisa editar código).
- Se quiser usar outro nome de arquivo, abra o `index.html` e altere o `src` da imagem ou vídeo correspondente (ex.: a logo do herói fica em `<video> … <source src="Logo VieFive1.mp4">`).

## 2) Alterar cores pelo `config.js`
O arquivo `config.js` controla a paleta usada nas variáveis CSS.
1. Abra `config.js`.
2. No bloco `colors`, troque os valores em hexadecimal para suas cores. Exemplos:
   - `primary` / `primaryDark` / `primaryLight` → botões e destaques vermelhos.
   - `accent` / `accentDark` / `accentLight` → tons verdes secundários.
   - `background` → cor de fundo geral.
   - `text` → cor principal dos textos.
3. Salve. Ao recarregar a página, as variáveis CSS mudam automaticamente (não precisa editar `styles.css`).

## 3) Configurar WhatsApp
1. No `config.js`, ajuste `whatsappNumber` no formato **DDD + número**, só dígitos (ex.: `5511999999999`).
2. Recarregue a página. O botão flutuante e o botão de resumo do carrinho já usarão o novo número.

## 4) Configurar EmailJS (formulário de contato)
1. Crie uma conta em https://www.emailjs.com e anote:
   - **Service ID**
   - **Template ID**
   - **Public Key**
2. No `config.js`, preencha:
   - `emailjs.serviceId`
   - `emailjs.templateId`
   - `emailjs.publicKey`
   - `emailjs.toEmail` (e-mail que receberá as mensagens)
3. Salve. O formulário passa a enviar usando esses dados (não é preciso editar HTML).

## 5) Configurar Mercado Pago
1. Crie sua aplicação no Mercado Pago e copie:
   - **Public Key** (para o front-end)
   - **Access Token** de produção (para o backend Render)
2. No `config.js`, ajuste:
   - `mercadoPago.publicKey`
   - `mercadoPago.preferenceEndpoint` com a URL do seu backend no Render, ex.: `https://seu-backend.onrender.com/api/checkout/preferences`
   - Opcional: `mercadoPago.staticPreferenceId` se quiser usar um ID fixo de preferência (sem chamar o backend).

## 6) Deploy no GitHub Pages (front-end)
1. Faça login no GitHub e envie os arquivos para um repositório.
2. Acesse **Settings > Pages** e escolha a branch principal (ex.: `main`) com a pasta raiz `/` (ou `docs/` se você mover o site para lá).
3. Clique em **Save**. Em alguns minutos o GitHub Pages publica uma URL do tipo `https://seuusuario.github.io/seu-repo/`.
4. Teste abrindo a URL pública. Caso use um domínio próprio, configure o CNAME nas mesmas telas.

## 7) Conectar ao backend no Render (checkout Mercado Pago)
1. No Render, crie um novo **Web Service** a partir deste repositório.
2. Defina:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment Variable:** `MP_ACCESS_TOKEN` com o Access Token de produção do Mercado Pago.
3. Depois do deploy, copie a URL gerada (ex.: `https://seu-backend.onrender.com`).
4. Volte ao `config.js` e coloque essa URL em `mercadoPago.preferenceEndpoint` (com `/api/checkout/preferences` no final).
5. Publique o front-end no GitHub Pages apontando para esse endpoint. O checkout passa a funcionar em produção.

## 8) Checklist final
- [ ] Substituí logo e imagens.
- [ ] Ajustei as cores no `config.js`.
- [ ] Coloquei meu número de WhatsApp.
- [ ] Preenchi os dados do EmailJS.
- [ ] Configurei Mercado Pago (public key no front, token no Render).
- [ ] Fiz deploy no GitHub Pages e testei o checkout com o backend do Render.
