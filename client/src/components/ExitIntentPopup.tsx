import { useState, useEffect } from 'react';
import { X, Gift } from 'lucide-react';

interface ExitIntentPopupProps {
  onClose: () => void;
  onWhatsAppClick: () => void;
}

export function ExitIntentPopup({ onClose, onWhatsAppClick }: ExitIntentPopupProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-2xl max-w-md w-full animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-foreground/60" />
        </button>

        {/* Content */}
        <div className="p-8 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-secondary/20 p-4 rounded-full">
              <Gift className="w-8 h-8 text-secondary" />
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Espera aí! 🎁
          </h2>

          {/* Subheadline */}
          <p className="text-foreground/80 mb-6 leading-relaxed">
            Receba uma <span className="font-semibold text-secondary">avaliação gratuita</span> do seu lustre agora mesmo. Sem compromisso, resposta rápida.
          </p>

          {/* Benefit Points */}
          <div className="space-y-2 mb-8 text-sm text-foreground/70">
            <div className="flex items-center justify-center gap-2">
              <span className="text-secondary">✓</span>
              <span>Diagnóstico completo em 2 horas</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-secondary">✓</span>
              <span>Orçamento sem obrigação</span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={onWhatsAppClick}
            className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold py-3 px-6 rounded-lg transition-colors mb-3 flex items-center justify-center gap-2"
          >
            <span>💬</span>
            Quero a Avaliação Grátis
          </button>

          {/* Secondary CTA */}
          <button
            onClick={onClose}
            className="w-full text-foreground/60 hover:text-foreground py-2 text-sm transition-colors"
          >
            Não, obrigado
          </button>
        </div>
      </div>
    </div>
  );
}
