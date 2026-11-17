import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { useEffect, useId, useRef } from 'react';

interface DetailDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function DetailDialog({ open, onClose, title, subtitle, children }: DetailDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // Fallback de light-dismiss cuando closedBy no está soportado nativamente
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || 'closedBy' in HTMLDialogElement.prototype) return;

    const isOutside = (e: PointerEvent) => {
      const r = dialog.getBoundingClientRect();
      return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    };

    let pressedOutside = false;
    const onDown = (e: PointerEvent) => {
      pressedOutside = isOutside(e);
    };
    const onUp = (e: PointerEvent) => {
      if (pressedOutside && isOutside(e)) dialog.close();
    };

    dialog.addEventListener('pointerdown', onDown);
    dialog.addEventListener('pointerup', onUp);
    return () => {
      dialog.removeEventListener('pointerdown', onDown);
      dialog.removeEventListener('pointerup', onUp);
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="aevoid-dialog"
      aria-labelledby={titleId}
      onClose={onClose}
      {...({ closedby: 'any' } as Record<string, string>)}
    >
      <div className="dialog-header">
        <div style={{ minInlineSize: 0 }}>
          <h2 id={titleId} style={{ fontSize: '1.15rem', fontWeight: 800 }}>
            {title}
          </h2>
          {subtitle && (
            <p style={{ color: 'var(--text-3)', fontSize: '0.86rem', marginBlockStart: '0.2rem' }}>
              {subtitle}
            </p>
          )}
        </div>
        <button
          type="button"
          className="btn btn-sm"
          onClick={() => dialogRef.current?.close()}
          aria-label="Cerrar detalle"
          autoFocus
        >
          <X size={16} aria-hidden="true" />
          <span>Cerrar</span>
        </button>
      </div>
      <div className="dialog-body">{children}</div>
    </dialog>
  );
}
