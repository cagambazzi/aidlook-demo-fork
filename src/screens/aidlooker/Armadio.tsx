import React, { useState } from 'react';
import { Plus, Clock, ChevronRight, X, Shirt } from 'lucide-react';

export function ArmadioAidlooker() {
  const [activeCategory, setActiveCategory] = useState('Tutti');
  const [showAddModal, setShowAddModal] = useState(false);
  const [pendingProposals, setPendingProposals] = useState([
    { id: 1, timer: '7:23', brand: 'Stone Island — Ghost Piece Jacket', detail: 'Taglia XL · €320' },
    { id: 2, timer: '9:45', brand: 'Gucci — GG Monogram Blazer', detail: 'Taglia 38 · €340' }
  ]);
  const [showToast, setShowToast] = useState(false);

  const categories = ['Tutti', 'Cappotto', 'Giacca', 'Blusa', 'Pantaloni', 'Jeans', 'Vestito', 'Accessori', 'Borsa', 'Scarpe'];

  const items = [
    { id: 1, brand: 'Max Mara', name: 'Cappotto', colorName: 'Cammello', size: 'S', color: '#D4B895', from: 'Boutique Milano', price: '€890', salePrice: '€450' },
    { id: 2, brand: 'A.P.C.', name: 'Pantaloni', colorName: 'Nero', size: 'S', color: '#1a1a1a', price: '€195' },
    { id: 3, brand: 'Valentino', name: 'Blusa', colorName: 'Bianco', size: 'S', color: '#F3F4F6', from: 'Boutique Roma', price: '€420' },
    { id: 4, brand: 'Totème', name: 'Pantaloni', colorName: 'Beige', size: 'S', color: '#D1C8BA', price: '€320', salePrice: '€320' },
    { id: 5, brand: 'Gucci', name: 'Borsa', colorName: 'Marrone', size: 'Unica', color: '#654321', price: '€1200', salePrice: '€320' },
  ];

  const filteredItems = activeCategory === 'Tutti' 
    ? items 
    : items.filter(i => i.name.toLowerCase() === activeCategory.toLowerCase() || 
                        (activeCategory === 'Accessori' && i.name === 'Borsa'));

  const handlePay = (id: number) => {
    setPendingProposals(prev => prev.filter(p => p.id !== id));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-full pb-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="pt-14 px-6 pb-4 bg-background sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-[28px] font-bold">Armadio</h1>
            <p className="text-xs text-muted-foreground mt-1">5 capi · 2 in vendita</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center active:scale-95 transition-transform shadow-md"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Pending Proposals */}
        {pendingProposals.length > 0 && (
          <div className="space-y-3 pt-2">
            <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 -mx-6 px-6 pb-2">
              {pendingProposals.map((proposal) => (
                <div key={proposal.id} className="w-[85%] shrink-0 snap-center bg-card border border-border rounded-[16px] p-4 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock size={14} className="text-muted-foreground" />
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Proposta dal negozio</span>
                    <span className="ml-auto bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {proposal.timer}
                    </span>
                  </div>
                  <p className="text-sm font-bold leading-tight mb-1">{proposal.brand}</p>
                  <p className="text-xs text-muted-foreground mb-4">{proposal.detail}</p>
                  <button 
                    onClick={() => handlePay(proposal.id)}
                    className="w-full py-2.5 bg-primary text-primary-foreground text-xs font-bold rounded-[12px] active:scale-[0.98] transition-transform"
                  >
                    Procedi al pagamento →
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-1.5">
              {pendingProposals.map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-primary' : 'bg-primary/20'}`} />
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 -mx-6 px-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-[20px] text-xs font-medium transition-colors ${
                activeCategory === cat 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-3 pb-4">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-card border border-border p-3 rounded-[16px] flex items-center gap-4 shadow-sm active:scale-[0.99] transition-transform cursor-pointer">
              <div 
                className="w-16 h-16 rounded-[12px] shrink-0 border border-black/5"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex-1 min-w-0 py-1">
                <div className="flex justify-between items-start mb-0.5">
                  <h3 className="font-bold text-sm truncate pr-2">{item.brand}</h3>
                  <span className="font-bold text-sm">{item.price}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate mb-1">
                  {item.name} · {item.colorName} · {item.size}
                </p>
                {item.from && (
                  <p className="text-[10px] text-muted-foreground italic truncate">
                    Acquistato da {item.from}
                  </p>
                )}
                {item.salePrice && (
                  <div className="mt-2 inline-flex items-center bg-green-50 text-success text-[10px] font-bold px-2 py-1 rounded-[6px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-success mr-1.5"></span>
                    In vendita · {item.salePrice}
                  </div>
                )}
              </div>
              <ChevronRight size={16} className="text-muted-foreground shrink-0 opacity-50" />
            </div>
          ))}
          
          {filteredItems.length === 0 && (
            <div className="text-center py-12 px-6 text-muted-foreground">
              <Shirt size={48} className="mx-auto mb-4 opacity-20" />
              <p className="text-sm">Nessun capo trovato in questa categoria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 animate-in fade-in duration-200">
          <div className="w-full sm:w-[390px] h-[90vh] sm:h-[80vh] bg-background sm:rounded-[24px] rounded-t-[24px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-full duration-300">
            <div className="p-4 flex justify-between items-center border-b border-border bg-card">
              <h2 className="font-bold text-lg">Aggiungi Capo</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 bg-secondary rounded-full">
                <X size={18} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground">Brand *</label>
                <input type="text" className="w-full bg-card border border-border p-3 rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-accent" placeholder="Es. Prada" />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground">Categoria *</label>
                <div className="flex flex-wrap gap-2">
                  {['Cappotto', 'Giacca', 'Piumino', 'Maglia', 'Pantaloni', 'Scarpe', 'Borsa'].map(c => (
                    <span key={c} className="px-3 py-1.5 bg-secondary text-xs rounded-full cursor-pointer hover:bg-secondary/80">{c}</span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1 space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground">Taglia *</label>
                  <input type="text" className="w-full bg-card border border-border p-3 rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-accent" placeholder="Es. M o 42" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground">Prezzo (€)</label>
                  <input type="number" className="w-full bg-card border border-border p-3 rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-accent" placeholder="0.00" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground">Colore</label>
                <div className="flex gap-3 mt-1">
                  {['#1a1a1a', '#FFFFFF', '#D4B895', '#1D4ED8', '#B91C1C', '#654321'].map(color => (
                    <div key={color} className={`w-8 h-8 rounded-full border border-border cursor-pointer active:scale-90`} style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground">Note / Negozio</label>
                <textarea className="w-full bg-card border border-border p-3 rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-accent h-24 resize-none" placeholder="Dettagli aggiuntivi..."></textarea>
              </div>
            </div>

            <div className="p-4 bg-card border-t border-border">
              <button 
                onClick={() => setShowAddModal(false)} 
                className="w-full py-3.5 bg-primary text-primary-foreground font-bold rounded-[12px] active:scale-[0.98] transition-transform"
              >
                Salva Capo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-success text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg animate-in fade-in slide-in-from-bottom-4 z-50">
          Pagamento completato con successo
        </div>
      )}
    </div>
  );
}
