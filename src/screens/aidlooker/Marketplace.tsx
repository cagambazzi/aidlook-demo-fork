import React, { useState } from 'react';
import { Search, Plus, Trash2, X } from 'lucide-react';

export function MarketplaceAidlooker() {
  const [requests, setRequests] = useState([
    { id: 1, name: 'Moncler Maya Short Down', size: 'M', time: 'Inviata 2 giorni fa', code: 'MC-MY-BLK-M' },
    { id: 2, name: 'Stone Island Light Jacket', size: 'L', time: 'Inviata 1 giorno fa', code: 'SI-LJ-WHT-L' },
    { id: 3, name: 'Totème Scarf Collar Coat', size: 'S', time: 'Inviata oggi', code: 'TOT-SC-GRY-S' },
  ]);
  const [search, setSearch] = useState('');
  const [showNewModal, setShowNewModal] = useState(false);

  const removeRequest = (id: number) => {
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="min-h-full pb-20 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="pt-14 px-6 pb-4 bg-background sticky top-0 z-10">
        <h1 className="text-[24px] font-bold mb-4">Ricerca l'articolo</h1>
        
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card border border-border py-3 pl-10 pr-4 rounded-[16px] text-sm focus:outline-none focus:ring-2 focus:ring-accent shadow-sm"
            placeholder="Codice prodotto o brand..."
          />
        </div>
      </div>

      <div className="px-6 mt-4 space-y-3">
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Ricerche attive</h2>
        
        {requests.map(req => (
          <div key={req.id} className="bg-card border border-border p-4 rounded-[16px] flex justify-between items-start shadow-sm">
            <div className="pr-4">
              <h3 className="font-bold text-sm mb-1">{req.name}</h3>
              <p className="text-xs text-muted-foreground mb-2">Taglia {req.size} · {req.time}</p>
              <div className="inline-flex bg-secondary px-2 py-1 rounded text-[10px] font-mono text-muted-foreground">
                {req.code}
              </div>
            </div>
            <button 
              onClick={() => removeRequest(req.id)}
              className="p-2 text-muted-foreground hover:text-destructive transition-colors shrink-0"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}

        {requests.length === 0 && (
          <div className="text-center py-10 px-4 text-muted-foreground">
            <Search size={32} className="mx-auto mb-3 opacity-20" />
            <p className="text-sm">Nessuna ricerca attiva.</p>
          </div>
        )}
      </div>

      <button 
        onClick={() => setShowNewModal(true)}
        className="fixed bottom-[80px] sm:bottom-[100px] right-6 w-14 h-14 bg-accent text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform z-20"
      >
        <Plus size={24} />
      </button>

      {/* New Request Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 animate-in fade-in duration-200">
          <div className="w-full sm:w-[390px] bg-background sm:rounded-[24px] rounded-t-[24px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-full duration-300">
            <div className="p-4 flex justify-between items-center border-b border-border bg-card">
              <h2 className="font-bold text-lg">Nuova Ricerca</h2>
              <button onClick={() => setShowNewModal(false)} className="p-2 bg-secondary rounded-full">
                <X size={18} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                Invia una richiesta alla rete di boutique AIDLOOK. Ti notificheremo appena l'articolo sarà disponibile.
              </p>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground">Brand</label>
                <input type="text" className="w-full bg-card border border-border p-3 rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-accent" placeholder="Es. Celine" />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground">Nome articolo o descrizione</label>
                <input type="text" className="w-full bg-card border border-border p-3 rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-accent" placeholder="Es. Triomphe Bag" />
              </div>

              <div className="flex gap-4">
                <div className="flex-1 space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground">Taglia</label>
                  <input type="text" className="w-full bg-card border border-border p-3 rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-accent" placeholder="Unica" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground">Codice (Opzionale)</label>
                  <input type="text" className="w-full bg-card border border-border p-3 rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-accent" placeholder="Es. 194143" />
                </div>
              </div>
            </div>

            <div className="p-4 bg-card border-t border-border">
              <button 
                onClick={() => setShowNewModal(false)} 
                className="w-full py-3.5 bg-primary text-primary-foreground font-bold rounded-[12px] active:scale-[0.98] transition-transform"
              >
                Invia Richiesta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
