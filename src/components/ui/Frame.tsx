import { Icon, type IconName } from './Icon';

/**
 * Moldura de visor de câmera usada no lugar de imagens que ainda não foram enviadas.
 * Some automaticamente quando a capa, a foto ou o vídeo real é configurado.
 */
export function Frame({
  label,
  icon = 'image',
  word,
  light = '30% 20%',
  corner = false,
  className = '',
}: {
  label: string;
  icon?: IconName;
  word?: string;
  light?: string;
  /** Mostra o aviso no canto superior direito (para cards com texto por cima). */
  corner?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`grain absolute inset-0 overflow-hidden bg-graphite-2 ${className}`}
      style={{
        backgroundImage: `radial-gradient(65% 60% at ${light}, rgb(61 124 255 / 0.26), transparent 72%), radial-gradient(50% 50% at 85% 100%, rgb(255 255 255 / 0.05), transparent 70%)`,
      }}
    >
      {word ? <span className="cover-word">{word}</span> : null}
      <span className="vf absolute inset-4 opacity-70" />
      {corner ? (
        <span className="absolute right-7 top-7 flex items-center gap-1.5 text-[12px] text-paper/55">
          <Icon name={icon} className="h-4 w-4" />
          {label}
        </span>
      ) : (
        <span className="absolute inset-0 grid place-items-center">
          <span className="flex flex-col items-center gap-2 text-center text-[13px] text-paper/55">
            <Icon name={icon} className="h-6 w-6 text-paper/45" />
            {label}
          </span>
        </span>
      )}
    </div>
  );
}
