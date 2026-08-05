import React from 'react';
import { ChevronRight, User, ShoppingBag } from 'lucide-react';
import { Role } from '../components/TabBar';

export function WelcomeScreen({ onSelectRole }: { onSelectRole: (role: Role) => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-background">
      <div className="w-full max-w-sm flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-4xl font-bold tracking-[6px] text-primary">
            AIDLOOK
          </h1>
          <p className="text-muted-foreground font-medium">
            Il tuo guardaroba. Intelligente.
          </p>
          <div className="w-12 h-0.5 bg-accent rounded-full mt-4" />
        </div>

        {/* Selection Section */}
        <div className="w-full space-y-4 mt-12 pt-8">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-6">
            Come vuoi usare AIDLOOK?
          </p>

          {/* Aidlooker Card */}
          <button 
            onClick={() => onSelectRole('aidlooker')}
            className="w-full flex items-center p-5 bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] text-left group"
          >
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center shrink-0 mr-4 group-hover:bg-accent/10 group-hover:text-accent transition-colors">
              <User size={24} className="text-primary group-hover:text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-primary mb-1">Aidlooker</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Gestisci il tuo armadio digitale, monitora i tuoi acquisti e compra o vendi capi second hand
              </p>
            </div>
            <ChevronRight className="text-muted-foreground ml-2 opacity-50 group-hover:opacity-100 transition-opacity" />
          </button>

          {/* Attività Card */}
          <button 
            onClick={() => onSelectRole('attivita')}
            className="w-full flex items-center p-5 bg-primary text-primary-foreground rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] text-left group"
          >
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0 mr-4">
              <ShoppingBag size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-1">Attività</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                CRM clienti, registra vendite, gestisci il tuo negozio e monitora le performance
              </p>
            </div>
            <ChevronRight className="text-white/60 ml-2 group-hover:text-white transition-colors" />
          </button>
        </div>

      </div>
    </div>
  );
}
