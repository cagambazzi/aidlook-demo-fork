import React, { useState } from 'react';
import { Search, ChevronRight, X, User, Package } from 'lucide-react';

export function MagazzinoAttivita() {
  const [tab, setTab] = useState<'stock' | 'sh'>('stock');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tutti');
  const [selectedStockItem, setSelectedStockItem] = useState<any>(null);
  const [selectedSHItem, setSelectedSHItem] = useState<any>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const stockCategories = ['Tutti', 'Cappotto', 'Giacca', 'Piumino', 'Blazer', 'Maglia', 'T-Shirt', 'Jeans', 'Scarpe'];
  
  const stockItems = [
    { id: 1, brand: 'Max Mara', name: 'Teddy Coat', code: 'MM-TED-CAM-S', category: 'Cappotto', color: '#D4B895', sizes: ['XS', 'S', 'M'], price: '€1290', units: 3, prov: 'Acquisto diretto' },
    { id: 2, brand: 'Carhartt WIP', name: 'Duck Active Jacket', code: 'CW-DJ-BRN-M', category: 'Giacca', color: '#8B5A2B', sizes: ['S', 'M', 'L', 'XL'], price: '€190', units: 8, prov: 'Acquisto diretto' },
    { id: 3, brand: 'Gucci', name: 'GG Monogram Blazer', code: 'GU-GG-BLZ-38', category: 'Blazer', color: '#654321', sizes: ['36', '38', '40'], price: '€2100', units: 2, prov: 'Conto vendita' },
    { id: 4, brand: 'Stone Island', name: 'Light Jacket SS25', code: 'SI-LJ-WHT-L', category: 'Giacca', color: '#F3F4F6', sizes: ['M', 'L', 'XL'], price: '€560', units: 5, prov: 'Acquisto diretto' },
    { id: 5, brand: 'Prada', name: 'Re-Nylon Trench', code: 'PR-RN-TRN-S', category: 'Cappotto', color: '#1a1a1a', sizes: ['XS', 'S'], price: '€2350', units: 1, prov: 'Acquisto diretto' },
    { id: 6, brand: 'Moncler', name: 'Maya Short Down', code: 'MC-MY-BLK-M', category: 'Piumino', color: '#111827', sizes: ['S', 'M', 'L'], price: '€1350', units: 4, prov: 'Acquisto diretto' },
    { id: 7, brand: 'Nike', name: 'Air Force 1 \'07', code: 'NK-AF1-WHT-42', category: 'Scarpe', color: '#FFFFFF', sizes: ['40', '41', '42', '43', '44'], price: '€130', units: 6, prov: 'Acquisto diretto' },
    { id: 8, brand: 'Levi\'s', name: '501 Original Jeans', code: 'LEV-501-BLU-30', category: 'Jeans', color: '#1D4ED8', sizes: ['28', '30', '32', '34'], price: '€100', units: 9, prov: 'Acquisto diretto' },
  ];

  const shItems = [
    { id: 1, brand: 'Max Mara', name: 'Teddy Coat', size: 'S', condition: 'ottime condizioni', seller: 'Giulia R.', price: 'Trattabile', color: '#D4B895' },
    { id: 2, brand: 'Prada', name: 'Re-Nylon Trench', size: 'S', condition: 'come nuovo', seller: 'Sofia F.', price: '€1400', color: '#1a1a1a' },
    { id: 3, brand: 'Stone Island', name: 'Light Jacket', size: 'L', condition: 'ottime condizioni', seller: 'Luca T.', price: '€290', color: '#F3F4F6' },
    { id: 4, brand: 'Moncler', name: 'Maya Short Down', size: 'M', condition: 'come nuovo', seller: 'Chiara V.', price: '€780', color: '#111827' },
    { id: 5, brand: 'A.P.C.', name: 'Sailor Stripe Tee', size: 'M', condition: 'ottime condizioni', seller: 'Sara M.', price: '€55', color: '#E5E7EB' },
  ];

  const filteredStock = stockItems.filter(item => {
    const matchesSearch = item.brand.toLowerCase().includes(search.toLowerCase()) || 
                          item.name.toLowerCase().includes(search.toLowerCase()) ||
                          item.code.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === 'Tutti' || item.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const handlePropose = () => {
    // In a real app we'd open a customer picker here. For demo, we just simulate sending to the first customer.
    setToastMsg(`Proposta inviata a Sofia F.`);
    setShowToast(true);
    setSelectedSHItem(null);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-full pb-20 animate-in fade-in slide-in-from-bottom-4 duration-300 relative">
      <div className="pt-14 px-6 pb-2 bg-background sticky top-0 z-10">
        <h1 className="text-[28px] font-bold mb-4">Magazzino</h1>
        
        <div className="flex bg-secondary p-1 rounded-[12px] mb-4">
          <button 
            onClick={() => { setTab('stock'); setSearch(''); }}
            className={`flex-1 py-1.5 text-xs font-bold rounded-[10px] transition-colors ${tab === 'stock' ? 'bg-card shadow-sm text-primary' : 'text-muted-foreground'}`}
          >
            Stock
          </button>
          <button 
            onClick={() => { setTab('sh'); setSearch(''); }}
            className={`flex-1 py-1.5 text-xs font-bold rounded-[10px] transition-colors ${tab === 'sh' ? 'bg-card shadow-sm text-primary' : 'text-muted-foreground'}`}
          >
            Second-hand
          </button>
        </div>

        {tab === 'stock' && (
          <div className="relative mb-4">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-card border border-border py-2.5 pl-9 pr-4 rounded-[12px] text-xs focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Cerca prodotto, codice..."
            />
          </div>
        )}
      </div>

      <div className="px-6 space-y-4 pt-2">
        {tab === 'stock' && (
          <>
            <div className="flex overflow-x-auto hide-scrollbar gap-2 -mx-6 px-6 pb-2">
              {stockCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-[20px] text-[10px] font-medium transition-colors ${
                    activeCategory === cat 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filteredStock.map(item => (
                <div 
                  key={item.id} 
                  onClick={() => setSelectedStockItem(item)}
                  className="bg-card border border-border p-3 rounded-[16px] flex gap-3 shadow-sm active:scale-[0.99] transition-transform cursor-pointer"
                >
                  <div 
                    className="w-16 h-20 rounded-[12px] shrink-0 border border-black/5"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1 min-w-0 py-0.5 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-sm truncate">{item.brand}</h3>
                      <p className="text-xs truncate">{item.name}</p>
                      <p className="text-[9px] text-muted-foreground font-mono mt-0.5">{item.code}</p>
                    </div>
                    <div className="flex gap-1 mt-1">
                      {item.sizes.slice(0, 3).map(s => (
                        <span key={s} className="px-1.5 py-0.5 bg-secondary rounded text-[9px] font-medium">{s}</span>
                      ))}
                      {item.sizes.length > 3 && <span className="px-1 py-0.5 text-[9px] text-muted-foreground">+{item.sizes.length - 3}</span>}
                    </div>
                  </div>
                  <div className="text-right shrink-0 py-0.5 flex flex-col justify-between">
                    <p className="font-bold text-sm">{item.price}</p>
                    <p className={`text-[10px] font-medium ${item.units <= 2 ? 'text-destructive' : 'text-muted-foreground'}`}>
                      {item.units} pz
                    </p>
                  </div>
                </div>
              ))}

              {filteredStock.length === 0 && search && (
                <div className="text-center py-12 px-4">
                  <Package size={40} className="mx-auto mb-4 text-muted-foreground opacity-20" />
                  <p className="text-sm font-bold mb-2">Non nel tuo stock</p>
                  <p className="text-xs text-muted-foreground mb-6">Non abbiamo trovato "{search}" nel tuo magazzino.</p>
                  <button 
                    onClick={() => setTab('sh')}
                    className="bg-primary text-primary-foreground text-xs font-bold px-6 py-2.5 rounded-[12px] active:scale-95 transition-transform"
                  >
                    Cerca nel second-hand
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {tab === 'sh' && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <span className="px-3 py-1.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full">Tutte</span>
              <span className="px-3 py-1.5 bg-secondary text-secondary-foreground text-[10px] font-bold rounded-full">Come nuovo</span>
              <span className="px-3 py-1.5 bg-secondary text-secondary-foreground text-[10px] font-bold rounded-full">Ottime condizioni</span>
            </div>

            <div className="space-y-3">
              {shItems.map(item => (
                <div 
                  key={item.id} 
                  onClick={() => setSelectedSHItem(item)}
                  className="bg-card border border-border p-4 rounded-[16px] shadow-sm relative active:scale-[0.99] transition-transform cursor-pointer"
                >
                  <div className="flex gap-4">
                    <div 
                      className="w-20 h-24 rounded-[12px] shrink-0 border border-black/5"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div>
                        <h3 className="font-bold text-sm leading-tight mb-0.5">{item.brand}</h3>
                        <p className="text-xs text-muted-foreground mb-1">{item.name}</p>
                        <p className="text-[10px] text-muted-foreground">Taglia {item.size}</p>
                      </div>
                      <div className="flex items-center gap-1.5 mt-2">
                        <div className="w-4 h-4 bg-secondary rounded-full flex items-center justify-center">
                          <User size={8} className="text-muted-foreground" />
                        </div>
                        <span className="text-[10px] font-medium text-muted-foreground">{item.seller}</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="inline-block px-2 py-0.5 bg-secondary text-muted-foreground rounded-[6px] text-[9px] font-bold uppercase tracking-wider">
                      {item.condition}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 font-bold text-sm">
                    {item.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Stock Detail Modal */}
      {selectedStockItem && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 animate-in fade-in duration-200">
          <div className="w-full sm:w-[390px] h-[85vh] sm:h-[75vh] bg-background sm:rounded-[24px] rounded-t-[24px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-full duration-300">
            <div className="relative h-48 shrink-0 flex items-center justify-center" style={{ backgroundColor: selectedStockItem.color }}>
              <button 
                onClick={() => setSelectedStockItem(null)} 
                className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 bg-card rounded-t-[24px] -mt-6 relative z-10">
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-1">{selectedStockItem.brand}</h2>
                <p className="text-muted-foreground">{selectedStockItem.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-8">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Codice</p>
                  <p className="text-xs font-mono bg-secondary px-2 py-1 rounded inline-block">{selectedStockItem.code}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Prezzo</p>
                  <p className="font-bold text-accent">{selectedStockItem.price}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Categoria</p>
                  <p className="text-sm font-medium">{selectedStockItem.category}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Disponibilità</p>
                  <p className={`text-sm font-bold ${selectedStockItem.units <= 2 ? 'text-destructive' : ''}`}>
                    {selectedStockItem.units} unità
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Taglie</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedStockItem.sizes.map((s: string) => (
                      <span key={s} className="px-3 py-1.5 border border-border rounded-[8px] text-xs font-bold text-center min-w-[40px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SH Detail Modal */}
      {selectedSHItem && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 animate-in fade-in duration-200">
          <div className="w-full sm:w-[390px] h-[75vh] sm:h-[65vh] bg-background sm:rounded-[24px] rounded-t-[24px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-full duration-300">
            <div className="relative h-40 shrink-0 flex items-center justify-center" style={{ backgroundColor: selectedSHItem.color }}>
              <button 
                onClick={() => setSelectedSHItem(null)} 
                className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 bg-card rounded-t-[24px] -mt-6 relative z-10 flex flex-col">
              <div className="mb-6 flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold mb-1">{selectedSHItem.brand}</h2>
                  <p className="text-muted-foreground">{selectedSHItem.name}</p>
                </div>
                <span className="inline-block px-2 py-1 bg-secondary text-muted-foreground rounded-[6px] text-[10px] font-bold uppercase tracking-wider">
                  {selectedSHItem.condition}
                </span>
              </div>

              <div className="bg-background rounded-[16px] p-4 mb-auto border border-border">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-xs text-muted-foreground">Prezzo richiesto</p>
                  <p className="font-bold text-lg">{selectedSHItem.price}</p>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-xs text-muted-foreground">Taglia</p>
                  <p className="font-bold text-sm">{selectedSHItem.size}</p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <User size={14} className="text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground leading-none mb-1">Venditore (Membro)</p>
                    <p className="text-xs font-bold">{selectedSHItem.seller}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={handlePropose} 
                className="w-full py-4 mt-6 bg-primary text-primary-foreground font-bold rounded-[12px] active:scale-[0.98] transition-transform"
              >
                Proponi a un cliente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-success text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg animate-in fade-in slide-in-from-bottom-4 z-50 whitespace-nowrap">
          {toastMsg}
        </div>
      )}
    </div>
  );
}
