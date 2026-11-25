import { MotionConfig } from 'framer-motion';
import { visibleNav } from './lib/visibility';
import { useActiveSection } from './lib/useActiveSection';
import { About } from './components/sections/About';
import { Clients } from './components/sections/Clients';
import { Contact } from './components/sections/Contact';
import { FinalCta } from './components/sections/FinalCta';
import { Footer } from './components/sections/Footer';
import { Header } from './components/sections/Header';
import { Hero } from './components/sections/Hero';
import { Portfolio } from './components/sections/Portfolio';
import { Process } from './components/sections/Process';
import { Reels } from './components/sections/Reels';
import { Services } from './components/sections/Services';
import { Testimonials } from './components/sections/Testimonials';
import { WhatsAppFloat } from './components/sections/WhatsAppFloat';

const sectionIds = visibleNav.map((n) => n.id);

export default function App() {
  const active = useActiveSection(sectionIds);
  return (
    <MotionConfig reducedMotion="user">
      <Header active={active} />
      <main>
        <Hero />
        <Clients />
        <Portfolio />
        <Reels />
        <Services />
        <About />
        <Process />
        <Testimonials />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </MotionConfig>
  );
}
