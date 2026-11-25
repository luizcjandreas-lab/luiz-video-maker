import { site } from '../../content/site';
import { isPlaceholder, stripBrackets } from '../../lib/text';

/**
 * Mostra o texto normalmente. Se o texto ainda estiver entre [colchetes] (ou vazio),
 * exibe como campo a preencher, para ninguém esquecer de trocar antes de publicar.
 */
export function Editable({ value, fallback = 'Conteúdo a preencher' }: { value?: string | null; fallback?: string }) {
  if (!isPlaceholder(value)) return <>{value}</>;
  if (!site.showPlaceholders) return null;
  return (
    <span className="slot" title="Campo para preencher com informação real">
      {value ? stripBrackets(value) : fallback}
    </span>
  );
}
