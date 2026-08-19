import React, { useState } from 'react';
import { RefreshCw, Store, CheckCircle, Clock, Search, X, User, Zap, TrendingDown, Tag, Plus, Package } from 'lucide-react';

type Tab = 'sync' | 'b2b';

const SYNCED_SALES = [
  { id: 's1', brand: 'A.P.C.',       item: 'Manteau Lou',      size: '38', price: 590,  customer: 'Sofia M.',  time: '14:32', color: '#C4956A' },
  { id: 's2', brand: 'Ami Paris',    item: 'Heart T-Shirt',    size: 'M',  price: 180,  customer: 'Luca R.',   time: '13:15', color: '#F48FB1' },
  { id: 's3', brand: 'Stone Island', item: 'Ghost Jacket',     size: 'L',  price: 890,  customer: 'Marco B.',  time: '11:48', color: '#1C3557' },
  { id: 's4', brand: 'Carhartt WIP', item: 'Michigan Coat',    size: 'XL', price: 240,  customer: 'Elena V.',  time: '10:03', color: '#8B5E3C' },
];

interface B2BListing {
  id: string;
  store: string;
  city: string;
  brand: string;
  name: string;
  code: string;
  imageColor: string;
  stock: { size: string; qty: number }[];
  unitPrice: number;
  retailPrice: number;
  reason: 'Invenduto' | 'Fine stagione' | 'Overstock' | string;
  postedAt: string;
}

const B2B_LISTINGS: B2BListing[] = [
  { id: 'b1', store: 'Boutique Firenze', city: 'Firenze', brand: 'Max Mara',     name: 'Teddy Coat',        code: 'MM-TED-CAM-S',  imageColor: '#C4956A', stock: [{ size: 'M', qty: 5 }, { size: 'L', qty: 3 }],          unitPrice: 550,  retailPrice: 1290, reason: 'Invenduto',     postedAt: '2h fa'  },
  { id: 'b2', store: 'Store Napoli',     city: 'Napoli',  brand: 'Moncler',      name: 'Maya Short Down',   code: 'MC-MY-BLK-M',   imageColor: '#1a1a1a', stock: [{ size: 'XL', qty: 8 }],                                 unitPrice: 580,  retailPrice: 1350, reason: 'Fine stagione', postedAt: '5h fa'  },
  { id: 'b3', store: 'Multibrand Roma',  city: 'Roma',    brand: 'Gucci',        name: 'GG Monogram Blazer',code: 'GU-GG-BLZ-38',  imageColor: '#D2B48C', stock: [{ size: '42', qty: 2 }, { size: '44', qty: 4 }],          unitPrice: 880,  retailPrice: 2100, reason: 'Invenduto',     postedAt: '1g fa'  },
  { id: 'b4', store: 'Boutique Bologna', city: 'Bologna', brand: 'Toteme',       name: 'Scarf Collar Coat', code: 'TOT-SC-GRY-S',  imageColor: '#9A9A9A', stock: [{ size: 'XS', qty: 6 }, { size: 'S', qty: 4 }],          unitPrice: 380,  retailPrice: 890,  reason: 'Overstock',     postedAt: '2g fa'  },
  { id: 'b5', store: 'Store Milano',     city: 'Milano',  brand: 'C.P. Company', name: 'Goggle Jacket',     code: 'CP-GG-BLU-L',   imageColor: '#1C3557', stock: [{ size: 'M', qty: 3 }],                                  unitPrice: 295,  retailPrice: 690,  reason: 'Invenduto',     postedAt: '2g fa'  },
  { id: 'b6', store: 'Multibrand Genova',city: 'Genova',  brand: 'Stone Island', name: 'Light Jacket SS25', code: 'SI-LJ-WHT-L',   imageColor: '#E8E8E4', stock: [{ size: 'S', qty: 10 }, { size: 'M', qty: 7 }],         unitPrice: 240,  retailPrice: 560,  reason: 'Fine stagione', postedAt: '3g fa'  },
  { id: 'b7', store: 'Boutique Venezia', city: 'Venezia', brand: 'Prada',        name: 'Re-Nylon Trench',   code: 'PR-RN-TRN-S',   imageColor: '#6B7B3A', stock: [{ size: 'XS', qty: 1 }, { size: 'S', qty: 2 }],          unitPrice: 1100, retailPrice: 2350, reason: 'Invenduto',     postedAt: '4g fa'  },
];

const REASON_STYLE: Record<string, string> = {
  'Invenduto':     'bg-red-50 text-red-600 border-red-200',
  'Fine stagione': 'bg-amber-50 text-amber-600 border-amber-200',
  'Overstock':     'bg-blue-50 text-blue-600 border-blue-200',
};

export function VenditaAttivita() {
  const [activeTab, setActiveTab] = useState<Tab>('sync');

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="pt-14 px-5 pb-3 bg-background border-b border-border shrink-0">
        <h1 className="text-[28px] font-bold tracking-tight">Vendite</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Sincronizzazione cassa + Magazzino B2B</p>
      </div>

      {/* Tab switcher */}
      <div className="flex border-b border-border bg-background shrink-0">
        {([
          { key: 'sync' as Tab, label: 'Dalla cassa',    Icon: RefreshCw },
          { key: 'b2b'  as Tab, label: 'Magazzino B2B',  Icon: Store     },
        ]).map(({ key, label, Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium border-b-2 transition-colors ${
              activeTab === key
                ? 'border-primary text-primary font-bold'
                : 'border-transparent text-muted-foreground'
            }`}
          >
            <Icon size={13} />
            {label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === 'sync' && <SincronizzazioneCassa />}
        {activeTab === 'b2b'  && <MagazzinoB2B />}
      </div>
    </div>
  );
}

// ─── DALLA CASSA ──────────────────────────────────────────────────────────────

function SincronizzazioneCassa() {
  return (
    <div className="p-4 space-y-4 pb-28">
      <div className="bg-card border border-green-200 rounded-[14px] p-4">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span className="font-bold text-sm flex-1">Cassa collegata</span>
          <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-md">ATTIVO</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Gestionale: <span className="font-semibold text-foreground">Lightspeed POS</span> · Ultimo sync: 2 min fa
        </p>
      </div>

      <div className="bg-secondary rounded-[12px] p-3 flex gap-2.5 items-start">
        <Zap size={14} className="text-muted-foreground mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          Ogni vendita registrata in cassa viene sincronizzata automaticamente su Tessiu. Il guardaroba digitale del cliente si aggiorna senza nessuna azione da parte tua.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold flex-1">Sincronizzate oggi</span>
        <span className="bg-secondary text-muted-foreground text-xs px-2.5 py-1 rounded-full">{SYNCED_SALES.length} vendite</span>
      </div>

      {SYNCED_SALES.map(sale => (
        <div key={sale.id} className="bg-card border border-border rounded-[14px] p-3 flex gap-3 items-center">
          <div className="w-10 h-14 rounded-[8px] shrink-0" style={{ backgroundColor: sale.color }} />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm">{sale.brand}</p>
            <p className="text-xs text-foreground/80">{sale.item} · {sale.size}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <User size={10} className="text-muted-foreground" />
              <p className="text-xs text-muted-foreground">{sale.customer}</p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="font-bold text-base">€{sale.price}</p>
            <div className="flex items-center gap-1 justify-end mt-0.5">
              <CheckCircle size={10} className="text-green-500" />
              <span className="text-[11px] text-muted-foreground">{sale.time}</span>
            </div>
          </div>
        </div>
      ))}

      <div className="border border-border rounded-[12px] p-3">
        <p className="text-[10px] font-medium text-muted-foreground mb-2">Gestionali supportati</p>
        <div className="flex flex-wrap gap-2">
          {['Lightspeed', 'Shopify POS', 'Square', 'Cassa in Cloud'].map(name => (
            <span key={name} className="bg-secondary text-muted-foreground text-[11px] px-2.5 py-1 rounded-md">{name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAGAZZINO B2B ────────────────────────────────────────────────────────────

function MagazzinoB2B() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<B2BListing | null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedQty, setSelectedQty] = useState(1);
  const [ordered, setOrdered] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const filtered = B2B_LISTINGS.filter(l => {
    const q = query.toLowerCase();
    return !q || l.brand.toLowerCase().includes(q) || l.name.toLowerCase().includes(q) || l.code.toLowerCase().includes(q) || l.store.toLowerCase().includes(q);
  });

  function openDetail(l: B2BListing) {
    setSelected(l);
    setSelectedSize(l.stock[0].size);
    setSelectedQty(1);
  }

  function handleOrder() {
    if (!selected) return;
    setOrdered(prev => new Set(prev).add(selected.id));
    setSelected(null);
    showToast(`✓ Ordine inviato a ${selected.store}`);
  }

  const totalQty = B2B_LISTINGS.reduce((s, l) => s + l.stock.reduce((a, b) => a + b.qty, 0), 0);

  return (
    <div className="flex flex-col h-full relative">
      {/* Info strip */}
      <div className="bg-secondary border-b border-border px-4 py-3 flex gap-2.5 items-start shrink-0">
        <Store size={13} className="text-muted-foreground mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          Altri negozi della rete Tessiu caricano qui invenduti e overstock. Acquistali a prezzo wholesale e aggiungili al tuo magazzino.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-px bg-border border-b border-border shrink-0">
        {[
          { label: 'Inserzioni',    value: B2B_LISTINGS.length },
          { label: 'Negozi attivi', value: new Set(B2B_LISTINGS.map(l => l.store)).size },
          { label: 'Pezzi totali',  value: totalQty },
        ].map(({ label, value }) => (
          <div key={label} className="bg-background px-3 py-2.5 text-center">
            <p className="font-bold text-base">{value}</p>
            <p className="text-[10px] text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      {/* Search + add */}
      <div className="px-4 pt-3 pb-2 flex gap-2 shrink-0">
        <div className="flex-1 flex items-center gap-2 bg-secondary border border-border rounded-[12px] px-3 py-2.5">
          <Search size={14} className="text-muted-foreground shrink-0" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Brand, articolo, codice, negozio…"
            className="flex-1 bg-transparent text-sm focus:outline-none"
          />
          {query && <button onClick={() => setQuery('')}><X size={13} className="text-muted-foreground" /></button>}
        </div>
        <button className="shrink-0 flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-bold px-3 py-2.5 rounded-[12px] active:scale-95 transition-transform">
          <Plus size={14} /> Inserisci
        </button>
      </div>

      {/* Listings */}
      <div className="flex-1 overflow-y-auto px-4 pb-28 space-y-3 pt-1">
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-2">
            <Package size={32} className="opacity-20" />
            <p className="text-sm">Nessuna inserzione trovata</p>
          </div>
        )}
        {filtered.map(l => {
          const disc = Math.round((1 - l.unitPrice / l.retailPrice) * 100);
          const isOrdered = ordered.has(l.id);
          const totalPcs = l.stock.reduce((a, b) => a + b.qty, 0);
          const reasonStyle = REASON_STYLE[l.reason] ?? 'bg-gray-100 text-gray-500 border-gray-200';

          return (
            <button
              key={l.id}
              onClick={() => openDetail(l)}
              className="w-full bg-card border border-border rounded-[16px] overflow-hidden text-left active:scale-[0.99] transition-transform"
            >
              <div className="flex gap-3 p-3.5">
                {/* Swatch */}
                <div className="w-14 h-[72px] rounded-[10px] shrink-0" style={{ backgroundColor: l.imageColor }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-bold text-sm truncate">{l.brand}</p>
                      <p className="text-xs text-muted-foreground truncate">{l.name}</p>
                      <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{l.code}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-base">€{l.unitPrice.toLocaleString()}</p>
                      <p className="text-[10px] text-muted-foreground line-through">€{l.retailPrice.toLocaleString()}</p>
                      <span className="inline-flex items-center gap-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-emerald-200">
                        <TrendingDown size={9} /> -{disc}%
                      </span>
                    </div>
                  </div>
                  {/* Meta row */}
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Store size={9} /> {l.store}
                    </div>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${reasonStyle}`}>
                      {l.reason}
                    </span>
                    <span className="text-[9px] text-muted-foreground">{l.postedAt}</span>
                  </div>
                </div>
              </div>
              {/* Size + qty strip */}
              <div className="border-t border-border px-3.5 py-2.5 flex items-center gap-2">
                <div className="flex gap-1.5 flex-wrap flex-1">
                  {l.stock.map(s => (
                    <span key={s.size} className="flex items-center gap-1 bg-secondary text-[10px] px-2 py-0.5 rounded font-medium">
                      {s.size}
                      <span className="text-muted-foreground font-normal">×{s.qty}</span>
                    </span>
                  ))}
                </div>
                <span className="text-[10px] text-muted-foreground shrink-0">{totalPcs} pz totali</span>
                {isOrdered ? (
                  <span className="shrink-0 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-[8px] border border-emerald-200">
                    Ordinato ✓
                  </span>
                ) : (
                  <span className="shrink-0 bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-[8px]">
                    Ordina
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Order detail sheet */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 animate-in fade-in duration-200"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full sm:w-[390px] bg-background rounded-t-[24px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-full duration-300"
            onClick={e => e.stopPropagation()}
          >
            {/* Swatch */}
            <div className="h-32 shrink-0 relative" style={{ backgroundColor: selected.imageColor }}>
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 p-2 bg-black/20 text-white rounded-full">
                <X size={18} />
              </button>
              <div className="absolute bottom-3 left-4 flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2 py-1 rounded-md border ${REASON_STYLE[selected.reason] ?? 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                  {selected.reason}
                </span>
              </div>
            </div>
            <div className="p-5 space-y-4 bg-card rounded-t-[24px] -mt-5">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-xl">{selected.brand}</p>
                  <p className="text-muted-foreground text-sm">{selected.name}</p>
                  <p className="font-mono text-[10px] text-muted-foreground bg-secondary px-2 py-0.5 rounded inline-block mt-1">{selected.code}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-2xl">€{selected.unitPrice.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground line-through">€{selected.retailPrice.toLocaleString()} retail</p>
                  <p className="text-xs font-bold text-emerald-600">-{Math.round((1 - selected.unitPrice / selected.retailPrice) * 100)}% sconto</p>
                </div>
              </div>
              {/* Store */}
              <div className="flex items-center gap-2 bg-secondary rounded-[10px] px-3 py-2.5">
                <Store size={13} className="text-muted-foreground" />
                <span className="text-sm font-semibold flex-1">{selected.store}</span>
                <span className="text-xs text-muted-foreground">{selected.city}</span>
              </div>
              {/* Size picker */}
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Taglia</p>
                <div className="flex gap-2 flex-wrap">
                  {selected.stock.map(s => (
                    <button
                      key={s.size}
                      onClick={() => { setSelectedSize(s.size); setSelectedQty(1); }}
                      className={`flex flex-col items-center px-3.5 py-2 rounded-[10px] border text-sm font-bold transition-all ${
                        selectedSize === s.size ? 'border-primary bg-primary/5 text-primary' : 'border-border'
                      }`}
                    >
                      {s.size}
                      <span className="text-[9px] font-normal text-muted-foreground">×{s.qty} disp.</span>
                    </button>
                  ))}
                </div>
              </div>
              {/* Qty picker */}
              {selectedSize && (() => {
                const max = selected.stock.find(s => s.size === selectedSize)?.qty ?? 1;
                return (
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Quantità</p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedQty(q => Math.max(1, q - 1))}
                        className="w-9 h-9 rounded-full bg-secondary font-bold text-lg flex items-center justify-center active:scale-95 transition-transform"
                      >−</button>
                      <span className="font-bold text-xl w-8 text-center">{selectedQty}</span>
                      <button
                        onClick={() => setSelectedQty(q => Math.min(max, q + 1))}
                        className="w-9 h-9 rounded-full bg-secondary font-bold text-lg flex items-center justify-center active:scale-95 transition-transform"
                      >+</button>
                      <span className="text-xs text-muted-foreground ml-1">
                        Totale: <span className="font-bold text-foreground">€{(selected.unitPrice * selectedQty).toLocaleString()}</span>
                      </span>
                    </div>
                  </div>
                );
              })()}
              {/* CTA */}
              <button
                onClick={handleOrder}
                disabled={!selectedSize}
                className={`w-full py-3.5 font-bold rounded-[14px] text-sm flex items-center justify-center gap-2 transition-all ${
                  selectedSize ? 'bg-primary text-primary-foreground active:scale-[0.98]' : 'bg-secondary text-muted-foreground cursor-not-allowed'
                }`}
              >
                <Tag size={15} />
                Ordina {selectedQty} pz × €{selected.unitPrice.toLocaleString()} = €{(selected.unitPrice * selectedQty).toLocaleString()}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg animate-in fade-in z-50 whitespace-nowrap">
          {toast}
        </div>
      )}
    </div>
  );
}
