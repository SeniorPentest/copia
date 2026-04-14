window.APP_CONFIG = {
  colors: {
    primary: '#C4292A',
    primaryDark: '#a02020',
    primaryLight: '#f5e8e8',
    accent: '#4D6341',
    accentDark: '#3a4d30',
    accentLight: '#edf4ee',
    background: '#FAFAF6',
    text: '#1A1A1A',
  },
  whatsappNumber: '5511915723418',
  mercadoPago: {
    publicKey: 'APP_USR-9a5c032a-aac2-47c7-8215-6f28b0fab4a2',
    preferenceEndpoint: 'https://copia-gkyz.onrender.com/api/checkout/preferences',
    staticPreferenceId: '',
  },
  emailjs: {
    serviceId: '',
    templateId: '',
    publicKey: '',
    toEmail: 'viefive@gmail.com.br',
  },
};

(function applyColorOverrides() {
  const colors = window.APP_CONFIG?.colors;
  if (!colors) return;

  const root = document.documentElement;
  const mapping = {
    primary: '--red',
    primaryDark: '--red-dark',
    primaryLight: '--red-light',
    accent: '--moss',
    accentDark: '--moss-dark',
    accentLight: '--moss-light',
    background: '--light-bg',
    text: '--dark',
  };

  Object.entries(mapping).forEach(([key, cssVar]) => {
    if (colors[key]) {
      root.style.setProperty(cssVar, colors[key]);
    }
  });
})();
