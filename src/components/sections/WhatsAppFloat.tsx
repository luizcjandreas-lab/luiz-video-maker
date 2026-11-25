import { motion } from 'framer-motion';
import { EASE } from '../../lib/motion';
import { whatsappLink } from '../../lib/whatsapp';
import { Icon } from '../ui/Icon';

/** Botão flutuante de WhatsApp, visível durante toda a navegação. */
export function WhatsAppFloat() {
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pedir orçamento pelo WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: EASE, delay: 1.6 }}
      className="group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex h-14 items-center rounded-full bg-whats pl-4 pr-4 text-[#03200e] shadow-[0_14px_36px_-10px_rgb(37_211_102/0.65)] transition-[padding,background-color] duration-500 hover:bg-[#3be07b] sm:bottom-6 sm:right-6"
    >
      <Icon name="chat" className="h-6 w-6 shrink-0" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-[15px] font-semibold transition-all duration-500 group-hover:ml-2.5 group-hover:max-w-[14rem] group-focus-visible:ml-2.5 group-focus-visible:max-w-[14rem]">
        Orçamento pelo WhatsApp
      </span>
    </motion.a>
  );
}
