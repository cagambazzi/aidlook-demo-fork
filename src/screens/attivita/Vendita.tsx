import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, Globe, CheckCircle, XCircle, Clock, Search, X, ChevronDown, User, Zap } from 'lucide-react';

type Tab = 'sync' | 'globale';

const SYNCED_SALES = [
  { id: 's1', brand: 'A.P.C.', item: 'Manteau Lou', size: '38', price: 590, customer: 'Sofia M.', time: '14:32', color: '#C4956A' },
  { id: 's2', brand: 'Ami Paris', item: 'Heart T-Shirt', size: 'M', price: 180, customer: 'Luca R.', time: '13:15', color: '#F48FB1' },
  { id: 's3', brand: 'Stone Island', item: 'Ghost Jacket', size: 'L', price: 890, customer: 'Marco B.', time: '11:48', color: '#1C3557' },
  { id: 's4', brand: 'Carhartt WIP', item: 'Michigan Coat', size: 'XL', price: 240, customer: 'Elena V.', time: '10:03', color: '#8B5E3C' },
];

const WAREHOUSE_PRODUCTS = [
  { id: 'gw1', brand: 'Ami Paris', name: 'ADC Heart Hoodie', code: 'AMI-ADC-BLK-M', category: 'Maglia', color: '#1a1a1a', sizes: ['S','M','L','XL'], price: 490, units: 4 },
  { id: 'gw2', brand: 'Stone Island', name: 'Ghost Piece Jacket', code: 'SI-GP-BLK-L', category: 'Giacca', color: '#374151', sizes: ['M','L','XL'], price: 890, units: 2 },
  { id: 'gw3', brand: 'Carhartt WIP', name: 'Duck Active Jacket', code: 'CW-DJ-BRN-M', category: 'Giacca', color: '#8B5E3C', sizes: ['S','M','L','XL'], price: 190, units: 8 },
  { id: 'gw4', brand: 'Max Mara', name: 'Teddy Coat', code: 'MM-TED-CAM-S', category: 'Cappotto', color: '#C4956A', sizes: ['XS','S','M'], price: 1290, units: 3 },
  { id: 'gw5', brand: 'A.P.C.', name: 'Manteau Lou', code: 'APC-ML-CAM-38', category: 'Cappotto', color: '#D2B48C', sizes: ['36','38','40'], price: 590, units: 5 },
  { id: 'gw6', brand: 'Totème', name: 'Straight Trousers', code: 'TOT-ST-BEI-S', category: 'Pantaloni', color: '#D2B48C', sizes: ['XS','S','M'], price: 320, units: 6 },
];

const CRM_CUSTOMERS = [
  { id: 'c1', name: 'Sofia Ferrari', email: 'sofia@email.com', size: 'S' },
  { id: 'c2', name: 'Marco Bianchi', email: 'marco@email.com', size: 'L' },
  { id: 'c3', name: 'Giulia Rossi', email: 'giulia@email.com', size: 'S' },
  { id: 'c4', name: 'Elena Verdi', email: 'elena@email.com', size: 'M' },
  { id: 'c5', name: 'Luca Romano', email: 'luca@email.com', size: 'M' },
  { id: 'c6', name: 'Chiara Conti', email: 'chiara@email.com', size: 'XS' },
  { id: 'c7', name: 'Alessandro Mori', email: 'ale@email.com', size: 'XL' },
];

function msToCountdown(ms: number): string {
  if (ms <= 0) return '00:00';
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

export function VenditaAttivita() {
  const [activeTab, setActiveTab] = useState<Tab>('sync');

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="pt-14 px-5 pb-3 bg-background border-b border-border shrink-0">
        <h1 className="text-[28px] font-bold tracking-tight">Vendite</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Sincronizzazione cassa + Magazzino Globale</p>
      </div>

      {/* Tab switcher */}
      <div className="flex border-b border-border bg-background shrink-0">
        {[
          { key: 'sync' as Tab, label: 'Dalla cassa', Icon: RefreshCw },
          { key: 'globale' as Tab, label: 'Magazzino Globale', Icon: Globe },
        ].map(({ key, label, Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium border-b-2 transition-colors ${
              activeTab === key
                ? 'border-primary text-primary font-bold'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon size={13} />
            {label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === 'sync' && <SincronizzazioneCassa />}
        {activeTab === 'globale' && <MagazzinoGlobale />}
      </div>
    </div>
  );
}

// ─── DALLA CASSA ──────────────────────────────────────────────────────────────

function SincronizzazioneCassa() {
  return (
    <div className="p-4 space-y-4 pb-28">
      {/* Connected card */}
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

      {/* Info */}
      <div className="bg-secondary rounded-[12px] p-3 flex gap-2.5 items-start">
        <Zap size={14} className="text-muted-foreground mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          Ogni vendita registrata in cassa viene sincronizzata automaticamente su Aidlook. Il guardaroba digitale del cliente si aggiorna senza nessuna azione da parte tua.
        </p>
      </div>

      {/* Sales feed */}
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

      {/* Integrations */}
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

// ─── MAGAZZINO GLOBALE ────────────────────────────────────────────────────────

function MagazzinoGlobale() {
  const [query, setQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<typeof WAREHOUSE_PRODUCTS[0] | null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<typeof CRM_CUSTOMERS[0] | null>(null);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showCustomerPicker, setShowCustomerPicker] = useState(false);
  const [customerSearch, setCustomerSearch] = useState('');
  const [activeSale, setActiveSale] = useState<{ customerName: string; expiresAt: number; status: 'pending'|'paid'|'expired' } | null>(null);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => {
      setNow(Date.now());
      setActiveSale(prev => {
        if (!prev || prev.status !== 'pending') return prev;
        if (Date.now() > prev.expiresAt) return { ...prev, status: 'expired' };
        return prev;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const results = WAREHOUSE_PRODUCTS.filter(p => {
    const q = query.toLowerCase();
    return !q || p.brand.toLowerCase().includes(q) || p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q);
  });

  const filteredCustomers = CRM_CUSTOMERS.filter(c => c.name.toLowerCase().includes(customerSearch.toLowerCase()));

  function handleSend() {
    if (!selectedProduct || !selectedSize || !selectedCustomer) return;
    setActiveSale({ customerName: selectedCustomer.name, expiresAt: Date.now() + 10 * 60 * 1000, status: 'pending' });
    setShowSendModal(false);
    setSelectedProduct(null);
    setSelectedCustomer(null);
    setSelectedSize('');
  }

  return (
    <div className="flex flex-col h-full">
      {/* Active sale banner */}
      {activeSale && (
        <div className={`flex items-center gap-2 px-4 py-3 text-white text-xs font-bold ${
          activeSale.status === 'paid' ? 'bg-green-600' : activeSale.status === 'expired' ? 'bg-red-500' : 'bg-primary'
        }`}>
          {activeSale.status === 'pending' && (
            <>
              <Clock size={14} />
              <span className="flex-1">{activeSale.customerName} — {msToCountdown(activeSale.expiresAt - now)}</span>
              <button
                onClick={() => setActiveSale(prev => prev ? { ...prev, status: 'paid' } : null)}
                className="bg-white/25 px-3 py-1.5 rounded-md text-[11px]"
              >
                Conferma pagamento
              </button>
            </>
          )}
          {activeSale.status === 'paid' && (
            <>
              <CheckCircle size={14} />
              <span className="flex-1">Pagamento ricevuto! Ordine confermato ✓</span>
              <button onClick={() => setActiveSale(null)}><X size={14} /></button>
            </>
          )}
          {activeSale.status === 'expired' && (
            <>
              <XCircle size={14} />
              <span className="flex-1">Scaduto — il cliente non ha pagato</span>
              <button onClick={() => setActiveSale(null)}><X size={14} /></button>
            </>
          )}
        </div>
      )}

      {/* Info strip */}
      <div className="bg-secondary border-b border-border px-4 py-2.5 flex gap-2 items-start">
        <Globe size={13} className="text-muted-foreground mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          Il prodotto non è nel tuo magazzino? Cercalo nella rete Aidlook. Il cliente riceve un link con timer 10 min per pagare.
        </p>
      </div>

      {/* Search */}
      <div className="p-4 pb-2">
        <div className="flex items-center gap-2 bg-secondary border border-border rounded-[12px] px-3 py-2.5">
          <Search size={16} className="text-muted-foreground shrink-0" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Cerca brand, nome, codice fornitore…"
            className="flex-1 bg-transparent text-sm focus:outline-none"
          />
          {query && <button onClick={() => setQuery('')}><X size={14} className="text-muted-foreground" /></button>}
        </div>
      </div>

      {/* Product list */}
      <div className="flex-1 overflow-y-auto px-4 pb-28 space-y-2.5">
        {results.map(p => (
          <button
            key={p.id}
            onClick={() => { setSelectedProduct(p); setSelectedSize(p.sizes[0]); setShowSendModal(true); }}
            className="w-full bg-card border border-border rounded-[14px] p-3 flex gap-3 items-start text-left active:scale-[0.99] transition-transform"
          >
            <div className="w-12 h-16 rounded-[10px] shrink-0" style={{ backgroundColor: p.color }} />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm">{p.brand}</p>
              <p className="text-xs text-foreground/80 mt-0.5">{p.name}</p>
              <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{p.code}</p>
              <div className="flex gap-1 mt-1.5 flex-wrap">
                {p.sizes.map(s => (
                  <span key={s} className="bg-secondary text-[10px] px-1.5 py-0.5 rounded font-medium">{s}</span>
                ))}
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="font-bold text-base">€{p.price}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{p.units} disp.</p>
              <span className="mt-1.5 inline-block bg-primary text-primary-foreground text-[11px] font-bold px-2.5 py-1 rounded-md">
                Invia →
              </span>
            </div>
          </button>
        ))}
        {results.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <Search size={36} className="mx-auto mb-3 opacity-20" />
            <p className="text-sm">Nessun prodotto trovato</p>
          </div>
        )}
      </div>

      {/* Send modal */}
      {showSendModal && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 animate-in fade-in duration-200">
          <div className="w-full sm:w-[390px] h-[85vh] bg-background sm:rounded-[24px] rounded-t-[24px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-full duration-300">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="font-bold text-lg">Invia al cliente</h2>
              <button onClick={() => setShowSendModal(false)} className="p-2 bg-secondary rounded-full"><X size={18} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* Product preview */}
              <div className="bg-card border border-border rounded-[14px] p-3 flex gap-3">
                <div className="w-14 h-20 rounded-[10px] shrink-0" style={{ backgroundColor: selectedProduct.color }} />
                <div className="flex-1">
                  <p className="font-bold text-base">{selectedProduct.brand}</p>
                  <p className="text-sm text-foreground/80">{selectedProduct.name}</p>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">{selectedProduct.code}</p>
                  <p className="font-bold text-lg mt-1">€{selectedProduct.price}</p>
                </div>
              </div>

              {/* Size picker */}
              <div>
                <label className="text-xs font-bold text-muted-foreground mb-2 block">Taglia *</label>
                <div className="flex gap-2 flex-wrap">
                  {selectedProduct.sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                        selectedSize === s ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer picker */}
              <div>
                <label className="text-xs font-bold text-muted-foreground mb-2 block">Cliente *</label>
                <button
                  onClick={() => setShowCustomerPicker(true)}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-[12px] border text-left transition-colors ${
                    selectedCustomer ? 'border-primary bg-card' : 'border-border bg-card'
                  }`}
                >
                  <User size={18} className={selectedCustomer ? 'text-primary' : 'text-muted-foreground'} />
                  <span className={`flex-1 text-sm ${selectedCustomer ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {selectedCustomer ? selectedCustomer.name : 'Seleziona cliente…'}
                  </span>
                  <ChevronDown size={15} className="text-muted-foreground" />
                </button>
              </div>

              {/* Timer info */}
              <div className="bg-secondary rounded-[12px] p-3 flex gap-2.5 items-start">
                <Clock size={15} className="text-muted-foreground mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Il cliente riceverà una notifica con un link per pagare. Ha 10 minuti prima che la richiesta scada.
                </p>
              </div>

              <button
                onClick={handleSend}
                disabled={!selectedSize || !selectedCustomer}
                className={`w-full py-3.5 font-bold rounded-[14px] text-sm transition-colors ${
                  selectedSize && selectedCustomer
                    ? 'bg-primary text-primary-foreground active:scale-[0.98] transition-transform'
                    : 'bg-secondary text-muted-foreground cursor-not-allowed'
                }`}
              >
                Invia Richiesta al Cliente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customer picker modal */}
      {showCustomerPicker && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/60 animate-in fade-in duration-200">
          <div className="w-full sm:w-[390px] h-[75vh] bg-background sm:rounded-[24px] rounded-t-[24px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-full duration-300">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="font-bold text-lg">Seleziona cliente</h2>
              <button onClick={() => setShowCustomerPicker(false)} className="p-2 bg-secondary rounded-full"><X size={18} /></button>
            </div>
            <div className="p-4 pb-2">
              <div className="flex items-center gap-2 bg-secondary border border-border rounded-[12px] px-3 py-2">
                <Search size={15} className="text-muted-foreground" />
                <input
                  value={customerSearch}
                  onChange={e => setCustomerSearch(e.target.value)}
                  placeholder="Cerca cliente…"
                  className="flex-1 bg-transparent text-sm focus:outline-none"
                  autoFocus
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredCustomers.map(c => (
                <button
                  key={c.id}
                  onClick={() => { setSelectedCustomer(c); setShowCustomerPicker(false); setCustomerSearch(''); }}
                  className="w-full flex items-center gap-3 px-4 py-3.5 border-b border-border/50 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                    {c.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.email}</p>
                  </div>
                  {c.size && (
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-md">Taglia {c.size}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
