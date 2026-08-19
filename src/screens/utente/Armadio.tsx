import React, { useState, useEffect, useRef } from 'react';
import { Plus, Clock, ChevronRight, X, Shirt, Bell, RefreshCw, Store, CheckCircle, XCircle } from 'lucide-react';

const CATEGORIES = ['Tutti', 'Cappotto', 'Giacca', 'Piumino', 'Felpa', 'Maglia', 'Blusa', 'Pantaloni', 'Jeans', 'Borsa', 'Scarpe'];

const ITEMS = [
  { id: 1,  brand: 'Max Mara',     name: 'Cappotto',  colorName: 'Cammello',  size: 'S',     color: '#C4956A', from: 'Boutique Milano',  price: '€890',  forSale: true,  salePrice: '€450' },
  { id: 2,  brand: 'A.P.C.',       name: 'Pantaloni', colorName: 'Nero',      size: 'S',     color: '#1a1a1a',                           price: '€195' },
  { id: 3,  brand: 'Valentino',    name: 'Blusa',     colorName: 'Bianco',    size: 'S',     color: '#F5F5F0', from: 'Boutique Roma',    price: '€420' },
  { id: 4,  brand: 'Totème',       name: 'Pantaloni', colorName: 'Beige',     size: 'S',     color: '#D2B48C',                           price: '€320',  forSale: true,  salePrice: '€320' },
  { id: 5,  brand: 'Gucci',        name: 'Borsa',     colorName: 'Marrone',   size: 'Unica', color: '#8B5E3C',                           price: '€1200' },
  { id: 6,  brand: 'Stone Island', name: 'Giacca',    colorName: 'Bianco',    size: 'L',     color: '#E8E8E4', from: 'Multibrand Roma',  price: '€560' },
  { id: 7,  brand: 'Moncler',      name: 'Piumino',   colorName: 'Nero',      size: 'M',     color: '#1a1a1a', from: 'Store Napoli',     price: '€1350', forSale: true,  salePrice: '€780' },
  { id: 8,  brand: 'Ami Paris',    name: 'Felpa',     colorName: 'Nero',      size: 'M',     color: '#1a1a1a',                           price: '€320' },
  { id: 9,  brand: 'Totème',       name: 'Cappotto',  colorName: 'Grigio',    size: 'S',     color: '#9A9A9A', from: 'Boutique Bologna', price: '€890' },
  { id: 10, brand: 'Levi\'s',      name: 'Jeans',     colorName: 'Blu Denim', size: '30',    color: '#3A5F8A',                           price: '€100' },
  { id: 11, brand: 'Loro Piana',   name: 'Maglia',    colorName: 'Camel',     size: 'S',     color: '#C4956A', from: 'Boutique Torino',  price: '€1180' },
  { id: 12, brand: 'Nike',         name: 'Scarpe',    colorName: 'Bianco',    size: '42',    color: '#F5F5F0',                           price: '€130' },
  { id: 13, brand: 'Prada',        name: 'Borsa',     colorName: 'Nero',      size: 'Unica', color: '#1a1a1a', from: 'Boutique Venezia', price: '€2100' },
  { id: 14, brand: 'Carhartt WIP', name: 'Giacca',    colorName: 'Marrone',   size: 'M',     color: '#8B5E3C',                           price: '€190' },
  { id: 15, brand: 'C.P. Company', name: 'Giacca',    colorName: 'Blu Navy',  size: 'L',     color: '#1C3557', from: 'Multibrand Genova',price: '€690' },
  { id: 16, brand: 'Arket',        name: 'Maglia',    colorName: 'Ecru',      size: 'M',     color: '#F0EAD6',                           price: '€145' },
];

function msToCountdown(ms: number): string {
  if (ms <= 0) return '00:00';
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${m}:${String(s).padStart(2, '0')}`;
}

function msToHours(ms: number): string {
  if (ms <= 0) return 'Scaduta';
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export function ArmadioUtente() {
  const [activeCategory, setActiveCategory] = useState('Tutti');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [now, setNow] = useState(Date.now());

  const startRef = useRef(Date.now());
  const [proposals, setProposals] = useState([
    {
      id: 'p1',
      isSecondhand: false,
      brand: 'Ami Paris',
      productName: 'ADC Heart Hoodie',
      size: 'M',
      price: 490,
      expiresAt: Date.now() + 9 * 60 * 1000,
    },
    {
      id: 'p2',
      isSecondhand: true,
      brand: 'Stone Island',
      productName: 'Ghost Jacket — Second Hand',
      size: 'L',
      price: 320,
      expiresAt: Date.now() + 7 * 60 * 1000,
    },
  ]);

  // pending purchase requests banner
  const pendingRequests = 1;

  // store inquiries — negozio chiede se vuoi vendere un capo non in vendita
  const [storeInquiries, setStoreInquiries] = useState([
    {
      id: 'si1',
      storeName: 'Boutique Torino',
      itemId: 11, // Loro Piana Maglia
      brand: 'Loro Piana',
      itemName: 'Cashmere Turtleneck',
      size: 'S',
      color: 'Camel',
      expiresAt: Date.now() + 47 * 60 * 60 * 1000 + 23 * 60 * 1000,
    },
  ]);

  const handleInquiryRespond = (id: string, accept: boolean) => {
    setStoreInquiries(prev => prev.filter(i => i.id !== id));
    if (accept) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const handlePay = (id: string) => {
    setProposals(prev => prev.filter(p => p.id !== id));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const filteredItems = activeCategory === 'Tutti'
    ? ITEMS
    : ITEMS.filter(i => i.name === activeCategory || (activeCategory === 'Accessori' && i.name === 'Borsa'));

  const saleCount = ITEMS.filter(i => i.forSale).length;

  return (
    <div className="min-h-full pb-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="pt-14 px-5 pb-3 bg-background sticky top-0 z-10 border-b border-border">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-[28px] font-bold tracking-tight">Armadio</h1>
            <p className="text-xs text-muted-foreground mt-0.5">{ITEMS.length} capi · {saleCount} in vendita</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="w-11 h-11 bg-primary text-primary-foreground rounded-full flex items-center justify-center active:scale-95 transition-transform shadow-md"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* Purchase requests banner */}
      {pendingRequests > 0 && (
        <div className="mx-4 mt-3 flex items-center gap-2 bg-amber-500 text-white rounded-xl px-4 py-2.5 cursor-pointer active:scale-[0.98] transition-transform">
          <Bell size={15} />
          <span className="flex-1 text-xs font-bold">{pendingRequests} richiesta di acquisto in attesa</span>
          <ChevronRight size={15} />
        </div>
      )}

      <div className="px-4 mt-3 space-y-5">

        {/* Pending proposals + store inquiries */}
        {(proposals.length > 0 || storeInquiries.length > 0) && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold">In attesa · {proposals.length + storeInquiries.length}</span>
              {(proposals.length + storeInquiries.length) > 1 && (
                <span className="text-xs text-muted-foreground">Scorri →</span>
              )}
            </div>
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 -mx-4 px-4 pb-2 hide-scrollbar">
              {/* Store inquiry cards */}
              {storeInquiries.map(inq => {
                const remaining = inq.expiresAt - now;
                const urgent = remaining < 2 * 3600000;
                return (
                  <div
                    key={inq.id}
                    className={`w-[88%] shrink-0 snap-center border-[1.5px] rounded-[16px] p-4 transition-colors ${
                      urgent ? 'bg-amber-50 border-amber-400' : 'bg-card border-border'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2.5">
                      <Store size={13} className={urgent ? 'text-amber-600' : 'text-muted-foreground'} />
                      <span className={`text-[11px] font-bold flex-1 ${urgent ? 'text-amber-700' : 'text-foreground'}`}>
                        {inq.storeName} ti fa una domanda
                      </span>
                      <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-bold text-white ${urgent ? 'bg-amber-500' : 'bg-foreground'}`}>
                        <Clock size={11} />
                        {msToHours(remaining)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-12 rounded-[8px] shrink-0 border border-black/5" style={{ backgroundColor: '#C4956A' }} />
                      <div>
                        <p className="font-bold text-sm">{inq.brand} — {inq.itemName}</p>
                        <p className="text-xs text-muted-foreground">{inq.color} · {inq.size}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">Saresti disposta a venderlo?</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleInquiryRespond(inq.id, true)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold rounded-[12px] active:scale-95 transition-transform ${urgent ? 'bg-amber-500 text-white' : 'bg-primary text-primary-foreground'}`}
                      >
                        <CheckCircle size={13} /> Sì, parliamone
                      </button>
                      <button
                        onClick={() => handleInquiryRespond(inq.id, false)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-secondary text-foreground text-xs font-bold rounded-[12px] active:scale-95 transition-transform"
                      >
                        <XCircle size={13} /> No, lo tengo
                      </button>
                    </div>
                  </div>
                );
              })}

              {proposals.map(p => {
                const remaining = p.expiresAt - now;
                const urgent = remaining < 2 * 60 * 1000;
                return (
                  <div
                    key={p.id}
                    className={`w-[88%] shrink-0 snap-center border-[1.5px] rounded-[16px] p-4 transition-colors ${
                      urgent
                        ? 'bg-amber-50 border-amber-400'
                        : 'bg-card border-primary/40'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2.5">
                      {p.isSecondhand ? <RefreshCw size={13} className={urgent ? 'text-amber-600' : 'text-primary'} /> : <Clock size={13} className={urgent ? 'text-amber-600' : 'text-primary'} />}
                      <span className={`text-[11px] font-bold flex-1 ${urgent ? 'text-amber-700' : 'text-primary'}`}>
                        {p.isSecondhand ? 'Proposta second hand' : 'Proposta dal negozio'}
                      </span>
                      <span className={`px-2.5 py-1 rounded-full text-[13px] font-bold text-white ${urgent ? 'bg-amber-500' : 'bg-primary'}`}>
                        {msToCountdown(remaining)}
                      </span>
                    </div>
                    <p className="font-bold text-base leading-tight">{p.brand} — {p.productName}</p>
                    <p className="text-xs text-muted-foreground mt-1">Taglia {p.size} · €{p.price}</p>
                    <p className="text-xs text-muted-foreground mt-1">Procedi entro il tempo indicato — altrimenti la proposta scade.</p>
                    <button
                      onClick={() => handlePay(p.id)}
                      className={`w-full mt-3 py-3 text-white text-[13px] font-bold rounded-[12px] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform ${urgent ? 'bg-amber-500' : 'bg-primary'}`}
                    >
                      Procedi al pagamento →
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center gap-1.5 mt-2">
              {proposals.map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-primary' : 'bg-primary/20'}`} />
              ))}
            </div>
          </div>
        )}

        {/* Category filter chips */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 -mx-4 px-4 pb-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-3.5 py-2 rounded-[20px] text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Items list */}
        <div className="space-y-2.5 pb-4">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-card border border-border p-3 rounded-[14px] flex items-center gap-3 shadow-sm active:scale-[0.99] transition-transform cursor-pointer">
              <div className="w-12 h-16 rounded-[10px] shrink-0 border border-black/5" style={{ backgroundColor: item.color }} />
              <div className="flex-1 min-w-0 py-0.5">
                <p className="font-bold text-sm truncate">{item.brand}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.name} · {item.colorName} · {item.size}</p>
                {item.from && (
                  <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
                    📍 Acquistato da {item.from}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-0.5">{item.price}</p>
                {item.forSale && (
                  <div className="mt-1.5 inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-[10px] font-bold px-2 py-1 rounded-[6px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    In vendita · {item.salePrice}
                  </div>
                )}
              </div>
              <ChevronRight size={15} className="text-muted-foreground shrink-0 opacity-50" />
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Shirt size={40} className="mx-auto mb-3 opacity-20" />
              <p className="text-sm">Nessun capo in questa categoria</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 animate-in fade-in duration-200">
          <div className="w-full sm:w-[390px] h-[85vh] sm:h-[80vh] bg-background sm:rounded-[24px] rounded-t-[24px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-full duration-300">
            <div className="p-4 flex justify-between items-center border-b border-border">
              <h2 className="font-bold text-lg">Aggiungi Capo</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 bg-secondary rounded-full"><X size={18} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {[
                { label: 'Brand *', placeholder: 'es. Gucci, Toteme…' },
                { label: 'Taglia *', placeholder: 'es. S, M, 42…' },
                { label: 'Descrizione', placeholder: 'Descrizione breve…' },
                { label: 'Prezzo (€)', placeholder: 'es. 120' },
                { label: 'Negozio', placeholder: 'Dove l\'hai comprato?' },
              ].map(f => (
                <div key={f.label}>
                  <label className="text-xs font-bold text-muted-foreground mb-1.5 block">{f.label}</label>
                  <input type="text" placeholder={f.placeholder} className="w-full bg-card border border-border p-3 rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
                </div>
              ))}
              <div>
                <label className="text-xs font-bold text-muted-foreground mb-2 block">Categoria</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.slice(1).map(c => (
                    <span key={c} className="px-3 py-1.5 bg-secondary text-xs rounded-full cursor-pointer hover:bg-secondary/80">{c}</span>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground mb-2 block">Colore</label>
                <div className="flex gap-2 flex-wrap">
                  {[['#1a1a1a','Nero'],['#F5F5F0','Bianco'],['#C4956A','Cammello'],['#1C3557','Blu'],['#8B5E3C','Marrone'],['#D2B48C','Beige']].map(([hex, name]) => (
                    <div key={hex} className="flex flex-col items-center gap-1 cursor-pointer">
                      <div className="w-7 h-7 rounded-full border border-border" style={{ backgroundColor: hex }} />
                      <span className="text-[9px] text-muted-foreground">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-border">
              <button onClick={() => setShowAddModal(false)} className="w-full py-3.5 bg-primary text-primary-foreground font-bold rounded-[14px] active:scale-[0.98] transition-transform">
                Salva Capo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg animate-in fade-in z-50 whitespace-nowrap">
          ✓ Pagamento completato — capo aggiunto all'armadio
        </div>
      )}
    </div>
  );
}
