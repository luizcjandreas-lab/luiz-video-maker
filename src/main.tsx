import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { site } from './content/site';
import { isPlaceholder, plain } from './lib/text';
import { whatsappDigits } from './lib/whatsapp';
import './index.css';

/** Dados estruturados (schema.org) para o Google, gerados a partir de src/content/site.ts. */
function injectStructuredData() {
  if (isPlaceholder(site.brand.name)) return;
  const digits = whatsappDigits();
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: plain(site.brand.name),
    description: site.brand.tagline,
    url: window.location.origin,
    image: `${window.location.origin}/og-image.jpg`,
    telephone: digits ? `+${digits}` : undefined,
    email: isPlaceholder(site.contact.email) ? undefined : site.contact.email,
    areaServed: isPlaceholder(site.contact.city) ? undefined : site.contact.city,
    sameAs: site.contact.instagramUrl ? [site.contact.instagramUrl] : undefined,
  };
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

injectStructuredData();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
