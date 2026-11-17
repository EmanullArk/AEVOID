import { Check, Copy, Terminal } from 'lucide-react';
import { useState } from 'react';

interface CodeSnippetProps {
  code: string;
  language?: string;
  caption?: string;
  onAnnounce?: (msg: string) => void;
}

export function CodeSnippet({ code, language = 'bash', caption, onAnnounce }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      onAnnounce?.('Código copiado al portapapeles.');
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      onAnnounce?.('No fue posible copiar automáticamente.');
    }
  }

  return (
    <div className="code-block">
      <div className="code-header">
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          <Terminal size={13} aria-hidden="true" />
          <span>{caption ?? language.toUpperCase()}</span>
        </span>
        <button
          type="button"
          className="btn btn-sm"
          onClick={handleCopy}
          aria-label={`Copiar fragmento ${caption ?? language}`}
          style={{ backgroundColor: '#1f2937', color: '#f8fafc', borderColor: '#374151' }}
        >
          {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
          <span>{copied ? 'Copiado' : 'Copiar'}</span>
        </button>
      </div>
      <pre className="code-pre">
        <code>{code}</code>
      </pre>
    </div>
  );
}
