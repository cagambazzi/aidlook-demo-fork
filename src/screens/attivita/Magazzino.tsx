import React, { useState } from 'react';
import { Search, X, Package, RefreshCw, User, Send, MessageCircle } from 'lucide-react';

const STOCK_CATEGORIES = ['Tutti', 'Cappotto', 'Giacca', 'Piumino', 'Blazer', 'Maglia', 'T-Shirt', 'Jeans', 'Scarpe'];

const STOCK_ITEMS = [
  { id: 1, brand: 'Max Mara', name: 'Teddy Coat', code: 'MM-TED-CAM-S', category: 'Cappotto', color: '#C4956A', sizes: ['XS','S','M'], price: 1290, units: 3, wholesale: 620, origin: 'Italia' },
  { id: 2, brand: 'Carhartt WIP', name: 'Duck Active Jacket', code: 'CW-DJ-BRN-M', category: 'Giacca', color: '#8B5E3C', sizes: ['S','M','L','XL'], price: 190, units: 8, wholesale: 95, origin: 'Bangladesh' },
  { id: 3, brand: 'Gucci', name: 'GG Monogram Blazer', code: 'GU-GG-BLZ-38', category: 'Blazer', color: '#654321', sizes: ['36','38','40'], price: 2100, units: 2, wholesale: 1050, origin: 'Italia' },
  { id: 4, brand: 'Stone Island', name: 'Light Jacket SS25', code: 'SI-LJ-WHT-L', category: 'Giacca', color: '#F3F4F6', sizes: ['M','L','XL'], price: 560, units: 5, wholesale: 280, origin: 'Italia' },
  { id: 5, brand: 'Prada', name: 'Re-Nylon Trench', code: 'PR-RN-TRN-S', category: 'Cappotto', color: '#1a1a1a', sizes: ['XS','S'], price: 2350, units: 1, wholesale: 1175, origin: 'Italia' },
  { id: 6, brand: 'Moncler', name: 'Maya Short Down', code: 'MC-MY-BLK-M', category: 'Piumino', color: '#111827', sizes: ['S','M','L'], price: 1350, units: 4, wholesale: 675, origin: 'Romania' },
  { id: 7, brand: 'Nike', name: 'Air Force 1 \'07', code: 'NK-AF1-WHT-42', category: 'Scarpe', color: '#FFFFFF', sizes: ['40','41','42','43','44'], price: 130, units: 6, wholesale: 65, origin: 'Vietnam' },
  { id: 8, brand: 'Levi\'s', name: '501 Original Jeans', code: 'LEV-501-BLU-30', category: 'Jeans', color: '#1D4ED8', sizes: ['28','30','32','34'], price: 100, units: 9, wholesale: 50, origin: 'Pakistan' },
];

const SH_ITEMS = [
  { id: 'sh1', brand: 'Max Mara', name: 'Teddy Coat', code: 'MM-TED-CAM-S', size: 'S', condition: 'ottimo', seller: 'Giulia R.', price: 0, color: '#C4956A', forSale: true },
  { id: 'sh2', brand: 'Prada', name: 'Re-Nylon Trench', code: 'PR-RN-TRN-S', size: 'S', condition: 'nuovo', seller: 'Sofia F.', price: 1400, color: '#1a1a1a', forSale: true },
  { id: 'sh3', brand: 'Stone Island', name: 'Ghost Jacket', code: 'SI-GP-BLK-L', size: 'L', condition: 'ottimo', seller: 'Luca T.', price: 290, color: '#374151', forSale: true },
  { id: 'sh4', brand: 'Moncler', name: 'Maya Short Down', code: 'MC-MY-BLK-M', size: 'M', condition: 'nuovo', seller: 'Chiara V.', price: 780, color: '#111827', forSale: false },
  { id: 'sh5', brand: 'A.P.C.', name: 'Sailor Stripe Tee', code: 'APC-SST-WHT-M', size: 'M', condition: 'ottimo', seller: 'Sara M.', price: 55, color: '#E5E7EB', forSale: true },
];

const CRM_CUSTOMERS = [
  { id: 'c1', name: 'Sofia Ferrari', size: 'S' },
  { id: 'c2', name: 'Marco Bianchi', size: 'L' },
  { id: 'c3', name: 'Giulia Rossi', size: 'S' },
  { id: 'c4', name: 'Elena Verdi', size: 'M' },
  { id: 'c5', name: 'Luca Romano', size: 'M' },
  { id: 'c6', name: 'Chiara Conti', size: 'XS' },
];

const CONDITION_LABEL: Record<string, string> = {
  nuovo: 'Come nuovo', ottimo: 'Ottime condizioni', buono: 'Buone condizioni', discreto: 'Discrete condizioni'
};
const CONDITION_COLOR: Record<string, string> = {
  nuovo: 'bg-emerald-100 text-emerald-700', ottimo: 'bg-blue-100 text-blue-700', buono: 'bg-amber-100 text-amber-700', discreto: 'bg-gray-100 text-gray-600'
};

type TabKey = 'stock' | 'secondhand';

export function MagazzinoAttivita() {
  const [tab, setTab] = useState<TabKey>('stock');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Tutti');
  const [guidedQuery, setGuidedQuery] = useState<string | null>(null);
  const [shCondition, setShCondition] = useState('Tutte');
  const [selectedStock, setSelectedStock] = useState<typeof STOCK_ITEMS[0] | null>(null);
  const [selectedSH, setSelectedSH] = useState<typeof SH_ITEMS[0] | null>(null);
  const [proposeItem, setProposeItem] = useState<typeof SH_ITEMS[0] | null>(null);
  const [proposedTo, setProposedTo] = useState<string | null>(null);
  const [toast, setToast] = useState('');
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const stockSearchActive = query.trim().length > 0;
  const filteredStock = STOCK_ITEMS.filter(p => {
    const q = query.toLowerCase();
    const matchQ = !q || p.brand.toLowerCase().includes(q) || p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q);
    return matchQ && (category === 'Tutti' || p.category === category);
  });
  const stockIsEmpty = stockSearchActive && filteredStock.length === 0;

  const shQuery = tab === 'secondhand' && guidedQuery ? guidedQuery : '';
  const filteredSH = SH_ITEMS.filter(l => {
    if (l.condition !== 'nuovo' && l.condition !== 'ottimo') return false;
    const q = shQuery.toLowerCase();
    const matchQ = !q || l.brand.toLowerCase().includes(q) || l.name.toLowerCase().includes(q);
    return matchQ && (shCondition === 'Tutte' || l.condition === shCondition);
  });

  function switchToSecondhand() {
    setGuidedQuery(query.trim());
    setTab('secondhand');
  }

  function handlePropose(item: typeof SH_ITEMS[0]) {
    setSelectedSH(null);
    setProposeItem(item);
    setProposedTo(null);
  }

  function confirmProposal() {
    if (!proposeItem || !proposedTo) return;
    const customer = CRM_CUSTOMERS.find(c => c.id === proposedTo);
    setProposeItem(null);
    showToast(`✓ Proposta inviata a ${customer?.name}`);
  }

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-300 relative">
      {/* Header */}
      <div className="pt-14 px-5 pb-3 bg-background sticky top-0 z-10 border-b border-border">
        <h1 className="text-[28px] font-bold tracking-tight">Magazzino</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          {tab === 'stock' ? `${filteredStock.length} prodotti` : `${filteredSH.filter(l=>l.forSale).length} in vendita · ${filteredSH.filter(l=>!l.forSale).length} nel guardaroba`}
        </p>

        {/* Tab switcher */}
        <div className="flex mt-3 border-b border-border -mx-5 px-5 gap-0">
          {([['stock', 'Stock', Package], ['secondhand', 'Second-hand', RefreshCw]] as [TabKey, string, any][]).map(([key, label, Icon]) => (
            <button
              key={key}
              onClick={() => { setTab(key); if (key === 'stock') setGuidedQuery(null); }}
              className={`flex items-center gap-1.5 py-2.5 mr-5 text-xs font-medium border-b-2 transition-colors ${
                tab === key ? 'border-primary text-primary font-bold' : 'border-transparent text-muted-foreground'
              }`}
            >
              <Icon size={13} />{label}
            </button>
          ))}
        </div>
      </div>

      {/* Stock tab */}
      {tab === 'stock' && (
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 pb-2 space-y-3">
            <div className="flex items-center gap-2 bg-secondary border border-border rounded-[12px] px-3 py-2.5">
              <Search size={15} className="text-muted-foreground shrink-0" />
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Brand, nome o codice fornitore…" className="flex-1 bg-transparent text-sm focus:outline-none" />
              {query && <button onClick={() => setQuery('')}><X size={14} className="text-muted-foreground" /></button>}
            </div>
            <div className="flex overflow-x-auto hide-scrollbar gap-2 -mx-4 px-4">
              {STOCK_CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setCategory(cat)}
                  className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-[11px] font-medium transition-colors ${
                    category === cat ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="px-4 pb-28 space-y-2.5">
            {filteredStock.map(p => (
              <button key={p.id} onClick={() => setSelectedStock(p)}
                className="w-full bg-card border border-border rounded-[14px] p-3 flex gap-3 items-start text-left active:scale-[0.99] transition-transform"
              >
                <div className="w-14 h-18 rounded-[10px] shrink-0 h-20" style={{ backgroundColor: p.color }} />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm">{p.brand}</p>
                  <p className="text-xs text-foreground/80 mt-0.5">{p.name}</p>
                  <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{p.code}</p>
                  <div className="flex gap-1 mt-1.5 flex-wrap">
                    {p.sizes.slice(0,3).map(s => <span key={s} className="bg-secondary text-[10px] px-1.5 py-0.5 rounded font-medium">{s}</span>)}
                    {p.sizes.length > 3 && <span className="text-[10px] text-muted-foreground">+{p.sizes.length-3}</span>}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-sm">€{p.price}</p>
                  <p className={`text-[10px] font-medium mt-0.5 ${p.units <= 2 ? 'text-red-500' : 'text-muted-foreground'}`}>{p.units} pz</p>
                </div>
              </button>
            ))}

            {stockIsEmpty && (
              <div className="bg-card border border-border rounded-[16px] p-6 text-center">
                <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                  <Search size={24} className="text-muted-foreground" />
                </div>
                <p className="font-semibold text-sm mb-1">Non nel tuo stock</p>
                <p className="text-xs text-muted-foreground mb-4">"{query.trim()}" non è nel tuo catalogo. Vuoi cercarlo nel second-hand della rete Aidlook?</p>
                <button onClick={switchToSecondhand} className="bg-primary text-primary-foreground text-xs font-bold px-5 py-2.5 rounded-[12px] flex items-center gap-2 mx-auto active:scale-95 transition-transform">
                  <RefreshCw size={14} /> Cerca nel second-hand
                </button>
              </div>
            )}

            {!stockIsEmpty && filteredStock.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <Package size={36} className="mx-auto mb-3 opacity-20" />
                <p className="text-sm">Nessun prodotto trovato</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Second-hand tab */}
      {tab === 'secondhand' && (
        <div className="flex-1 overflow-y-auto">
          {guidedQuery && (
            <div className="mx-4 mt-3 flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-[12px] px-3 py-2.5">
              <span className="text-primary text-xs flex-1 font-medium">Risultati per "{guidedQuery}" nel second-hand</span>
              <button onClick={() => { setGuidedQuery(null); setTab('stock'); }}><X size={14} className="text-primary" /></button>
            </div>
          )}
          {!guidedQuery && (
            <div className="px-4 pt-3 pb-2 flex gap-2 overflow-x-auto hide-scrollbar">
              {['Tutte', 'nuovo', 'ottimo'].map(c => (
                <button key={c} onClick={() => setShCondition(c)}
                  className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-[11px] font-medium ${
                    shCondition === c ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {c === 'Tutte' ? 'Tutte' : CONDITION_LABEL[c]}
                </button>
              ))}
            </div>
          )}
          <div className="px-4 pt-2 pb-28 space-y-3">
            {filteredSH.map(l => (
              <button key={l.id} onClick={() => setSelectedSH(l)}
                className="w-full bg-card border border-border rounded-[14px] p-4 text-left relative active:scale-[0.99] transition-transform"
              >
                <div className="flex gap-3">
                  <div className="w-16 h-20 rounded-[10px] shrink-0" style={{ backgroundColor: l.color }} />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm">{l.brand}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{l.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Taglia {l.size}</p>
                    <div className={`mt-2 inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold ${CONDITION_COLOR[l.condition]}`}>
                      {CONDITION_LABEL[l.condition]}
                    </div>
                  </div>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <div className="flex items-center gap-1">
                    <User size={9} className="text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground">{l.seller}</span>
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 font-bold text-sm">
                  {l.price > 0 ? `€${l.price}` : 'Trattabile'}
                </div>
                {!l.forSale && (
                  <div className="absolute top-3 left-4 bg-amber-100 text-amber-700 text-[9px] font-bold px-2 py-0.5 rounded-md mt-8">
                    Non in vendita
                  </div>
                )}
              </button>
            ))}
            {filteredSH.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <RefreshCw size={36} className="mx-auto mb-3 opacity-20" />
                <p className="text-sm">{guidedQuery ? `Nessun articolo second-hand per "${guidedQuery}"` : 'Nessun articolo trovato'}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Stock detail modal */}
      {selectedStock && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 animate-in fade-in duration-200">
          <div className="w-full sm:w-[390px] h-[80vh] bg-background sm:rounded-[24px] rounded-t-[24px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-full duration-300">
            <div className="h-44 shrink-0 relative flex items-end pb-5 px-5" style={{ backgroundColor: selectedStock.color }}>
              <button onClick={() => setSelectedStock(null)} className="absolute top-4 right-4 p-2 bg-black/20 text-white rounded-full"><X size={18} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 bg-card rounded-t-[24px] -mt-5">
              <p className="font-bold text-xl mb-0.5">{selectedStock.brand}</p>
              <p className="text-muted-foreground text-sm mb-5">{selectedStock.name}</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {[
                  ['Codice', selectedStock.code, true],
                  ['Prezzo retail', `€${selectedStock.price}`, false],
                  ['Prezzo wholesale', `€${selectedStock.wholesale}`, false],
                  ['Disponibilità', `${selectedStock.units} pezzi`, false],
                  ['Categoria', selectedStock.category, false],
                  ['Provenienza', selectedStock.origin, false],
                ].map(([label, value, mono]) => (
                  <div key={label as string}>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
                    <p className={`text-sm font-semibold ${mono ? 'font-mono text-xs bg-secondary px-2 py-1 rounded inline-block' : ''} ${String(label) === 'Disponibilità' && selectedStock.units <= 2 ? 'text-red-500' : ''}`}>{value}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Taglie disponibili</p>
                <div className="flex flex-wrap gap-2">
                  {selectedStock.sizes.map(s => (
                    <span key={s} className="px-3 py-1.5 border border-border rounded-[8px] text-sm font-bold">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SH detail modal */}
      {selectedSH && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 animate-in fade-in duration-200">
          <div className="w-full sm:w-[390px] h-[75vh] bg-background sm:rounded-[24px] rounded-t-[24px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-full duration-300">
            <div className="h-36 shrink-0 relative" style={{ backgroundColor: selectedSH.color }}>
              <div className={`absolute bottom-3 left-4 inline-flex px-2.5 py-1 rounded-lg text-xs font-bold ${CONDITION_COLOR[selectedSH.condition]}`}>
                {CONDITION_LABEL[selectedSH.condition]}
              </div>
              <button onClick={() => setSelectedSH(null)} className="absolute top-4 right-4 p-2 bg-black/20 text-white rounded-full"><X size={18} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 bg-card rounded-t-[24px] -mt-5 flex flex-col gap-4">
              <div>
                <p className="font-bold text-xl">{selectedSH.brand}</p>
                <p className="text-muted-foreground">{selectedSH.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 bg-background rounded-[12px] p-4 border border-border">
                {[['Codice', selectedSH.code], ['Taglia', selectedSH.size], ['Prezzo', selectedSH.price > 0 ? `€${selectedSH.price}` : 'Trattabile'], ['Venditore', selectedSH.seller]].map(([l,v]) => (
                  <div key={l}>
                    <p className="text-[10px] text-muted-foreground mb-0.5">{l}</p>
                    <p className="text-sm font-semibold">{v}</p>
                  </div>
                ))}
              </div>
              {selectedSH.forSale ? (
                <div className="bg-secondary rounded-[14px] p-4">
                  <p className="font-semibold text-sm mb-1">Il cliente lo vorrebbe?</p>
                  <p className="text-xs text-muted-foreground mb-3">Chiedi a un tuo cliente se valuta la versione second-hand.</p>
                  <button
                    onClick={() => handlePropose(selectedSH)}
                    className="flex items-center gap-2 bg-primary text-primary-foreground text-xs font-bold px-4 py-2.5 rounded-[10px] active:scale-95 transition-transform"
                  >
                    <Send size={13} /> Proponi
                  </button>
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-[14px] p-4">
                  <p className="font-semibold text-sm mb-1">Non in vendita</p>
                  <p className="text-xs text-muted-foreground mb-3">{selectedSH.seller} ha questo capo nel guardaroba ma non lo ha messo in vendita. Puoi chiedergli se è disposto a cederlo.</p>
                  <button
                    onClick={() => { setSelectedSH(null); showToast('Richiesta inviata a ' + selectedSH.seller); }}
                    className="flex items-center gap-2 bg-amber-500 text-white text-xs font-bold px-4 py-2.5 rounded-[10px] active:scale-95 transition-transform"
                  >
                    <MessageCircle size={13} /> Chiedi
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Customer picker for second-hand proposal */}
      {proposeItem && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 animate-in fade-in duration-200">
          <div className="w-full sm:w-[390px] h-[80vh] bg-background sm:rounded-[24px] rounded-t-[24px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-full duration-300">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="font-bold text-lg">Scegli il cliente</h2>
              <button onClick={() => setProposeItem(null)} className="p-2 bg-secondary rounded-full"><X size={18} /></button>
            </div>
            <div className="bg-secondary p-3 flex gap-3 items-center">
              <div className="w-10 h-12 rounded-[8px] shrink-0" style={{ backgroundColor: proposeItem.color }} />
              <div>
                <p className="font-semibold text-sm">{proposeItem.brand} {proposeItem.name}</p>
                <p className="text-xs text-muted-foreground">{CONDITION_LABEL[proposeItem.condition]} · Taglia {proposeItem.size} {proposeItem.price > 0 ? `· €${proposeItem.price}` : '· Trattabile'}</p>
              </div>
            </div>
            <p className="px-4 py-3 text-xs text-muted-foreground border-b border-border">Il cliente riceverà una notifica con la proposta.</p>
            <div className="flex-1 overflow-y-auto px-4 pt-2 pb-4 space-y-2">
              {CRM_CUSTOMERS.map(c => (
                <button
                  key={c.id}
                  onClick={() => setProposedTo(c.id)}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-[12px] border text-left transition-colors ${
                    proposedTo === c.id ? 'border-primary bg-primary/5' : 'border-border bg-card'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-semibold text-sm shrink-0">
                    {c.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{c.name}</p>
                    {c.size && <p className="text-xs text-muted-foreground">Taglia abituale: {c.size}</p>}
                  </div>
                  {proposedTo === c.id && <span className="text-primary text-lg">✓</span>}
                </button>
              ))}
            </div>
            <div className="p-4 border-t border-border">
              <button
                onClick={confirmProposal}
                disabled={!proposedTo}
                className={`w-full py-3.5 font-bold rounded-[14px] flex items-center justify-center gap-2 transition-colors ${
                  proposedTo ? 'bg-primary text-primary-foreground active:scale-[0.98]' : 'bg-secondary text-muted-foreground cursor-not-allowed'
                }`}
              >
                <Send size={15} /> Invia proposta
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
