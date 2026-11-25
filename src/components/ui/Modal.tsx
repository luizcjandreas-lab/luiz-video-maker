import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '../../lib/motion';

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),iframe,video[controls],[tabindex]:not([tabindex="-1"])';

/**
 * Janela sobreposta acessível: fecha com Esc ou clique fora, mantém o foco dentro,
 * trava a rolagem da página e devolve o foco ao botão que a abriu.
 * Setas ← → chamam onPrev/onNext quando informados.
 */
export function Modal({
  open,
  onClose,
  onPrev,
  onNext,
  labelledBy,
  label,
  panelClassName = '',
  children,
}: {
  open: boolean;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  labelledBy?: string;
  label?: string;
  panelClassName?: string;
  children: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const handlers = useRef({ onClose, onPrev, onNext });
  handlers.current = { onClose, onPrev, onNext };

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const { body } = document;
    const overflow = body.style.overflow;
    body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      const target = panelRef.current?.querySelector<HTMLElement>('[data-autofocus]') ?? panelRef.current;
      target?.focus({ preventScroll: true });
    }, 40);

    const onKey = (event: KeyboardEvent) => {
      const h = handlers.current;
      if (event.key === 'Escape') {
        event.preventDefault();
        h.onClose();
        return;
      }
      const tag = (event.target as HTMLElement | null)?.tagName ?? '';
      const typing = ['INPUT', 'TEXTAREA', 'SELECT', 'VIDEO'].includes(tag);
      if (!typing && event.key === 'ArrowLeft' && h.onPrev) {
        h.onPrev();
        return;
      }
      if (!typing && event.key === 'ArrowRight' && h.onNext) {
        h.onNext();
        return;
      }
      const panel = panelRef.current;
      if (event.key === 'Tab' && panel) {
        const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
          (el) => el.getClientRects().length > 0,
        );
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        const current = document.activeElement;
        if (event.shiftKey && (current === first || current === panel)) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && current === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKey);
      body.style.overflow = overflow;
      previous?.focus?.({ preventScroll: true });
    };
  }, [open]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="modal"
          className="fixed inset-0 z-[80] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} aria-hidden="true" />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            aria-label={label}
            tabIndex={-1}
            className={`relative outline-none ${panelClassName}`}
            initial={{ opacity: 0, y: 28, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
