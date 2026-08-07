import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, Package, RefreshCw, Send, MessageCircle, SlidersHorizontal, ShoppingBag, Barcode, Clock, ChevronDown, Zap } from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

type Condition = 'nuovo' | 'ottimo' | 'buono' | 'discreto';
type TabKey = 'stock' | 'secondhand';
type StockSegment = 'tutti' | 'mio' | 'altri';

// ── My store's own stock: supplierCode → sizes in stock ───────────────────────

const MY_STOCK_MAP: Record<string, string[]> = {
  'MM-TED-CAM-S':  ['XS', 'S', 'M'],
  'CW-DJ-BRN-M':   ['S', 'M', 'L', 'XL'],
  'GU-GG-BLZ-38':  ['36', '38', '40'],
  'SI-LJ-WHT-L':   ['M', 'L', 'XL'],
  'PR-RN-TRN-S':   ['XS', 'S'],
  'MC-MY-BLK-M':   ['S', 'M', 'L'],
  'NK-AF1-WHT-42': ['40', '41', '42', '43', '44'],
  'LEV-501-BLU-30':['28', '30', '32', '34'],
};

// ── Full network product catalogue (nuovo) ────────────────────────────────────

interface NetworkItem {
  id: string;
  brand: string;
  name: string;
  category: string;
  color: string;
  imageColor: string;
  price: number;
  wholesale: number;
  sizes: string[];
  supplierCode: string;
  origin: string;
  isNew?: boolean;
}

const NETWORK_ITEMS: NetworkItem[] = [
  { id: 'n1',  brand: 'Max Mara',          name: 'Teddy Coat',            category: 'Cappotto', color: 'Cammello',     imageColor: '#C4956A', price: 1290, wholesale: 620,  sizes: ['XS','S','M'],            supplierCode: 'MM-TED-CAM-S',   origin: 'Italia',     isNew: true  },
  { id: 'n2',  brand: 'Carhartt WIP',      name: 'Duck Active Jacket',    category: 'Giacca',   color: 'Marrone',      imageColor: '#8B5E3C', price: 190,  wholesale: 95,   sizes: ['S','M','L','XL'],         supplierCode: 'CW-DJ-BRN-M',    origin: 'Bangladesh'          },
  { id: 'n3',  brand: 'Gucci',             name: 'GG Monogram Blazer',    category: 'Blazer',   color: 'Beige',        imageColor: '#D2B48C', price: 2100, wholesale: 1050, sizes: ['36','38','40'],            supplierCode: 'GU-GG-BLZ-38',   origin: 'Italia'              },
  { id: 'n4',  brand: 'Stone Island',      name: 'Light Jacket SS25',     category: 'Giacca',   color: 'Bianco',       imageColor: '#E8E8E4', price: 560,  wholesale: 280,  sizes: ['M','L','XL'],             supplierCode: 'SI-LJ-WHT-L',    origin: 'Italia',     isNew: true  },
  { id: 'n5',  brand: 'Prada',             name: 'Re-Nylon Trench',       category: 'Cappotto', color: 'Oliva',        imageColor: '#6B7B3A', price: 2350, wholesale: 1175, sizes: ['XS','S'],                  supplierCode: 'PR-RN-TRN-S',    origin: 'Italia'              },
  { id: 'n6',  brand: 'Moncler',           name: 'Maya Short Down',       category: 'Piumino',  color: 'Nero',         imageColor: '#1a1a1a', price: 1350, wholesale: 675,  sizes: ['S','M','L'],              supplierCode: 'MC-MY-BLK-M',    origin: 'Romania',    isNew: true  },
  { id: 'n7',  brand: 'Toteme',            name: 'Scarf Collar Coat',     category: 'Cappotto', color: 'Grigio',       imageColor: '#9A9A9A', price: 890,  wholesale: 445,  sizes: ['XS','S','M'],             supplierCode: 'TOT-SC-GRY-S',   origin: 'Svezia'              },
  { id: 'n8',  brand: 'C.P. Company',      name: 'Goggle Jacket',         category: 'Giacca',   color: 'Blu Navy',     imageColor: '#1C3557', price: 690,  wholesale: 345,  sizes: ['M','L','XL'],             supplierCode: 'CP-GG-BLU-L',    origin: 'Italia'              },
  { id: 'n9',  brand: 'A.P.C.',            name: 'Sailor Stripe Tee',     category: 'T-Shirt',  color: 'Bianco/Blu',   imageColor: '#C8D8E8', price: 110,  wholesale: 55,   sizes: ['XS','S','M','L'],         supplierCode: 'APC-SLR-BLK-M',  origin: 'Francia'             },
  { id: 'n10', brand: 'Loro Piana',        name: 'Cashmere Turtleneck',   category: 'Maglia',   color: 'Camel',        imageColor: '#C4956A', price: 1180, wholesale: 590,  sizes: ['XS','S','M'],             supplierCode: 'LOR-CSH-CAM-M',  origin: 'Italia'              },
  { id: 'n11', brand: 'Ami Paris',         name: 'ADC Heart Hoodie',      category: 'Felpa',    color: 'Nero',         imageColor: '#1a1a1a', price: 320,  wholesale: 160,  sizes: ['S','M','L'],              supplierCode: 'AMI-HRT-BLK-S',  origin: 'Francia',    isNew: true  },
  { id: 'n12', brand: 'Nike',              name: "Air Force 1 '07",       category: 'Scarpe',   color: 'Bianco',       imageColor: '#F5F5F0', price: 130,  wholesale: 65,   sizes: ['40','41','42','43','44'],  supplierCode: 'NK-AF1-WHT-42',  origin: 'Vietnam'             },
  { id: 'n13', brand: "Levi's",            name: '501 Original Jeans',    category: 'Jeans',    color: 'Blu Denim',    imageColor: '#3A5F8A', price: 100,  wholesale: 50,   sizes: ['28','30','32','34'],       supplierCode: 'LEV-501-BLU-30', origin: 'Pakistan'            },
  { id: 'n14', brand: 'Arket',             name: 'Merino Crewneck',       category: 'Maglia',   color: 'Ecru',         imageColor: '#F0EAD6', price: 145,  wholesale: 72,   sizes: ['XS','S','M','L'],         supplierCode: 'ARC-MRW-ECR-M',  origin: 'Svezia'              },
  { id: 'n15', brand: 'Bottega Veneta',    name: 'Intrecciato Tote',      category: 'Borsa',    color: 'Nero',         imageColor: '#1a1a1a', price: 3200, wholesale: 1600, sizes: ['Unica'],                  supplierCode: 'BV-IT-BLK-U',    origin: 'Italia',     isNew: true  },
  { id: 'n16', brand: 'Jacquemus',         name: 'Le Chiquito',           category: 'Borsa',    color: 'Sabbia',       imageColor: '#D4B896', price: 590,  wholesale: 295,  sizes: ['Unica'],                  supplierCode: 'JAC-CHQ-SND-U',  origin: 'Francia'             },
  { id: 'n17', brand: 'Acne Studios',      name: 'Wool Scarf Coat',       category: 'Cappotto', color: 'Rosa Antico',  imageColor: '#D4A5A0', price: 1250, wholesale: 625,  sizes: ['XS','S','M'],             supplierCode: 'ACN-WSC-PNK-S',  origin: 'Svezia',     isNew: true  },
  { id: 'n18', brand: 'Golden Goose',      name: 'Ball Star Sneaker',     category: 'Scarpe',   color: 'Bianco/Oro',   imageColor: '#EDE5C0', price: 535,  wholesale: 267,  sizes: ['37','38','39','40','41'],  supplierCode: 'GG-BS-WHT-39',   origin: 'Italia'              },
  { id: 'n19', brand: 'Brunello Cucinelli', name: 'Cashmere Cardigan',    category: 'Maglia',   color: 'Tortora',      imageColor: '#C8B89A', price: 1890, wholesale: 945,  sizes: ['XS','S','M','L'],         supplierCode: 'BC-CSH-TOR-M',   origin: 'Italia'              },
  { id: 'n20', brand: 'Isabel Marant',     name: 'Étoile Denim Jacket',   category: 'Giacca',   color: 'Blu Sbiadito', imageColor: '#7A9BB5', price: 420,  wholesale: 210,  sizes: ['34','36','38','40'],       supplierCode: 'IM-DNM-BLU-36',  origin: 'Francia'             },
];

const CATEGORIES = ['Tutti', 'Cappotto', 'Giacca', 'Piumino', 'Blazer', 'Felpa', 'Maglia', 'T-Shirt', 'Jeans', 'Scarpe', 'Borsa'];

// ── Second-hand: Aidlooker wardrobe items ─────────────────────────────────────

interface WardrobeItem {
  id: string;
  supplierCode: string;
  brand: string;
  name: string;
  imageColor: string;
  size: string;
  condition: Condition;
  seller: string;
  price: number;
  forSale: boolean;
}

const WARDROBE_ITEMS: WardrobeItem[] = [
  // Max Mara Teddy Coat — MM-TED-CAM-S
  { id: 'w1',  supplierCode: 'MM-TED-CAM-S',   brand: 'Max Mara',        name: 'Teddy Coat',          imageColor: '#C4956A', size: 'S',  condition: 'ottimo',   seller: 'Giulia R.',    price: 420,  forSale: true  },
  { id: 'w2',  supplierCode: 'MM-TED-CAM-S',   brand: 'Max Mara',        name: 'Teddy Coat',          imageColor: '#C4956A', size: 'M',  condition: 'buono',    seller: 'Anna M.',      price: 0,    forSale: false },
  { id: 'w3',  supplierCode: 'MM-TED-CAM-S',   brand: 'Max Mara',        name: 'Teddy Coat',          imageColor: '#C4956A', size: 'XS', condition: 'discreto', seller: 'Marta G.',     price: 280,  forSale: true  },
  // Moncler Maya — MC-MY-BLK-M
  { id: 'w4',  supplierCode: 'MC-MY-BLK-M',    brand: 'Moncler',         name: 'Maya Short Down',     imageColor: '#1a1a1a', size: 'M',  condition: 'nuovo',    seller: 'Chiara V.',    price: 780,  forSale: true  },
  { id: 'w5',  supplierCode: 'MC-MY-BLK-M',    brand: 'Moncler',         name: 'Maya Short Down',     imageColor: '#1a1a1a', size: 'L',  condition: 'ottimo',   seller: 'Valentina S.', price: 0,    forSale: false },
  { id: 'w6',  supplierCode: 'MC-MY-BLK-M',    brand: 'Moncler',         name: 'Maya Short Down',     imageColor: '#1a1a1a', size: 'S',  condition: 'buono',    seller: 'Sara M.',      price: 620,  forSale: true  },
  // Loro Piana — LOR-CSH-CAM-M
  { id: 'w7',  supplierCode: 'LOR-CSH-CAM-M',  brand: 'Loro Piana',      name: 'Cashmere Turtleneck', imageColor: '#C4956A', size: 'S',  condition: 'ottimo',   seller: 'Sofia F.',     price: 0,    forSale: false },
  { id: 'w8',  supplierCode: 'LOR-CSH-CAM-M',  brand: 'Loro Piana',      name: 'Cashmere Turtleneck', imageColor: '#C4956A', size: 'XS', condition: 'nuovo',    seller: 'Elena V.',     price: 650,  forSale: true  },
  // Stone Island — SI-LJ-WHT-L
  { id: 'w9',  supplierCode: 'SI-LJ-WHT-L',    brand: 'Stone Island',    name: 'Light Jacket SS25',   imageColor: '#E8E8E4', size: 'L',  condition: 'buono',    seller: 'Luca T.',      price: 290,  forSale: true  },
  { id: 'w10', supplierCode: 'SI-LJ-WHT-L',    brand: 'Stone Island',    name: 'Light Jacket SS25',   imageColor: '#E8E8E4', size: 'M',  condition: 'ottimo',   seller: 'Fabio R.',     price: 0,    forSale: false },
  // Gucci — GU-GG-BLZ-38
  { id: 'w11', supplierCode: 'GU-GG-BLZ-38',   brand: 'Gucci',           name: 'GG Monogram Blazer',  imageColor: '#D2B48C', size: '38', condition: 'ottimo',   seller: 'Sofia F.',     price: 320,  forSale: true  },
  { id: 'w12', supplierCode: 'GU-GG-BLZ-38',   brand: 'Gucci',           name: 'GG Monogram Blazer',  imageColor: '#D2B48C', size: '36', condition: 'buono',    seller: 'Beatrice C.',  price: 0,    forSale: false },
  // Ami Paris — AMI-HRT-BLK-S
  { id: 'w13', supplierCode: 'AMI-HRT-BLK-S',  brand: 'Ami Paris',       name: 'ADC Heart Hoodie',    imageColor: '#1a1a1a', size: 'S',  condition: 'nuovo',    seller: 'Beatrice C.',  price: 0,    forSale: false },
  { id: 'w14', supplierCode: 'AMI-HRT-BLK-S',  brand: 'Ami Paris',       name: 'ADC Heart Hoodie',    imageColor: '#1a1a1a', size: 'M',  condition: 'ottimo',   seller: 'Marco B.',     price: 195,  forSale: true  },
  // C.P. Company — CP-GG-BLU-L
  { id: 'w15', supplierCode: 'CP-GG-BLU-L',    brand: 'C.P. Company',    name: 'Goggle Jacket',       imageColor: '#1C3557', size: 'L',  condition: 'buono',    seller: 'Marco B.',     price: 0,    forSale: false },
  { id: 'w16', supplierCode: 'CP-GG-BLU-L',    brand: 'C.P. Company',    name: 'Goggle Jacket',       imageColor: '#1C3557', size: 'XL', condition: 'ottimo',   seller: 'Luca T.',      price: 350,  forSale: true  },
  // Prada — PR-RN-TRN-S
  { id: 'w17', supplierCode: 'PR-RN-TRN-S',    brand: 'Prada',           name: 'Re-Nylon Trench',     imageColor: '#6B7B3A', size: 'S',  condition: 'nuovo',    seller: 'Marta G.',     price: 1400, forSale: true  },
  { id: 'w18', supplierCode: 'PR-RN-TRN-S',    brand: 'Prada',           name: 'Re-Nylon Trench',     imageColor: '#6B7B3A', size: 'XS', condition: 'ottimo',   seller: 'Anna M.',      price: 0,    forSale: false },
];

const CONDITION_LABEL: Record<Condition, string> = {
  nuovo: 'Come nuovo', ottimo: 'Ottimo', buono: 'Buono', discreto: 'Discreto',
};
const CONDITION_STYLE: Record<Condition, string> = {
  nuovo:    'bg-emerald-50 text-emerald-700 border-emerald-200',
  ottimo:   'bg-sky-50 text-sky-700 border-sky-200',
  buono:    'bg-amber-50 text-amber-700 border-amber-200',
  discreto: 'bg-gray-100 text-gray-500 border-gray-200',
};

const CRM_CUSTOMERS = [
  { id: 'c1', name: 'Sofia Ferrari',  size: 'S'  },
  { id: 'c2', name: 'Marco Bianchi',  size: 'L'  },
  { id: 'c3', name: 'Giulia Rossi',   size: 'S'  },
  { id: 'c4', name: 'Elena Verdi',    size: 'M'  },
  { id: 'c5', name: 'Luca Romano',    size: 'M'  },
  { id: 'c6', name: 'Chiara Conti',   size: 'XS' },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function StockCard({
  item, myStockSizes, isRequested, onClick
}: {
  item: NetworkItem; myStockSizes: string[]; isRequested: boolean; onClick: () => void;
}) {
  const inStock = myStockSizes.length > 0;
  return (
    <button
      onClick={onClick}
      className="bg-card flex flex-col text-left relative overflow-hidden active:scale-[0.98] transition-transform"
    >
      {/* Swatch */}
      <div className="w-full aspect-[3/4] relative" style={{ backgroundColor: item.imageColor }}>
        {inStock && (
          <div className="absolute top-2 left-2 bg-emerald-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full tracking-wide">
            IN STOCK
          </div>
        )}
        {item.isNew && (
          <div className={`absolute top-2 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-sm tracking-widest bg-black ${inStock ? 'right-2' : 'left-2'}`}>
            NEW
          </div>
        )}
        {isRequested && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <span className="bg-white text-black text-[10px] font-bold px-3 py-1.5 rounded-full">Richiesto ✓</span>
          </div>
        )}
      </div>
      {/* Info */}
      <div className="p-2.5 flex flex-col gap-1">
        <div>
          <p className="font-semibold text-xs leading-tight">{item.brand}</p>
          <p className="text-[11px] text-muted-foreground truncate">{item.name}</p>
        </div>
        <p className="font-bold text-sm">€{item.price.toLocaleString()}</p>
        {/* Sizes with green dot for own stock */}
        <div className="flex flex-wrap gap-1">
          {item.sizes.map(s => {
            const own = myStockSizes.includes(s);
            return (
              <span
                key={s}
                className={`flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                  own
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-secondary text-muted-foreground border-transparent'
                }`}
              >
                {own && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />}
                {s}
              </span>
            );
          })}
        </div>
      </div>
    </button>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export function MagazzinoAttivita() {
  const [tab, setTab] = useState<TabKey>('stock');

  // Stock tab state
  const [stockQuery, setStockQuery] = useState('');
  const [stockSegment, setStockSegment] = useState<StockSegment>('tutti');
  const [stockCategory, setStockCategory] = useState('Tutti');
  const [selectedStock, setSelectedStock] = useState<NetworkItem | null>(null);
  const [selectedStockSize, setSelectedStockSize] = useState('');
  const [requestedStock, setRequestedStock] = useState<Set<string>>(new Set());

  // SH tab state
  const [shQuery, setShQuery] = useState('');
  const [proposeItem, setProposeItem] = useState<WardrobeItem | null>(null);
  const [proposedTo, setProposedTo] = useState<string | null>(null);
  const [sentInquiries, setSentInquiries] = useState<Set<string>>(new Set());

  const [toast, setToast] = useState('');
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  // Invia al cliente — timer 10 min
  const [now, setNow] = useState(Date.now());
  const [inviaSale, setInviaSale] = useState<{ customerName: string; item: string; expiresAt: number; status: 'pending' | 'paid' | 'expired' } | null>(null);
  const [showInviaCustomer, setShowInviaCustomer] = useState(false);
  const [selectedInviaCustomer, setSelectedInviaCustomer] = useState<typeof CRM_CUSTOMERS[0] | null>(null);
  const [pendingInviaItem, setPendingInviaItem] = useState<{ brand: string; name: string; size: string } | null>(null);

  useEffect(() => {
    const t = setInterval(() => {
      setNow(Date.now());
      setInviaSale(prev => {
        if (!prev || prev.status !== 'pending') return prev;
        if (Date.now() > prev.expiresAt) return { ...prev, status: 'expired' };
        return prev;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  function msToCountdown(ms: number) {
    if (ms <= 0) return '00:00';
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function handleInviaAlCliente(brand: string, name: string, size: string) {
    setPendingInviaItem({ brand, name, size });
    setSelectedInviaCustomer(null);
    setShowInviaCustomer(true);
    setSelectedStock(null);
  }

  function confirmInvia() {
    if (!pendingInviaItem || !selectedInviaCustomer) return;
    setInviaSale({
      customerName: selectedInviaCustomer.name,
      item: `${pendingInviaItem.brand} ${pendingInviaItem.name} · ${pendingInviaItem.size}`,
      expiresAt: Date.now() + 10 * 60 * 1000,
      status: 'pending',
    });
    setShowInviaCustomer(false);
    setPendingInviaItem(null);
    setSelectedInviaCustomer(null);
  }

  // ── Stock filtering ──────────────────────────────────────────────────────────
  const filteredStock = useMemo(() => {
    return NETWORK_ITEMS.filter(item => {
      const myStockSizes = MY_STOCK_MAP[item.supplierCode] ?? [];
      if (stockSegment === 'mio' && myStockSizes.length === 0) return false;
      if (stockSegment === 'altri' && myStockSizes.length > 0) return false;
      if (stockCategory !== 'Tutti' && item.category !== stockCategory) return false;
      if (stockQuery.trim()) {
        const q = stockQuery.toLowerCase();
        return (
          item.brand.toLowerCase().includes(q) ||
          item.name.toLowerCase().includes(q) ||
          item.supplierCode.toLowerCase().includes(q) ||
          item.color.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [stockQuery, stockSegment, stockCategory]);

  const myCount = NETWORK_ITEMS.filter(i => (MY_STOCK_MAP[i.supplierCode] ?? []).length > 0).length;
  const altriCount = NETWORK_ITEMS.length - myCount;

  function openStockDetail(item: NetworkItem) {
    setSelectedStock(item);
    setSelectedStockSize(item.sizes[0]);
  }

  function handleRequestStock() {
    if (!selectedStock) return;
    setRequestedStock(prev => new Set(prev).add(selectedStock.id));
    setSelectedStock(null);
    showToast('✓ Richiesta inviata al fornitore');
  }

  // ── SH filtering ─────────────────────────────────────────────────────────────
  const filteredSH = useMemo(() => {
    const q = shQuery.trim().toLowerCase();
    if (!q) return [];
    return WARDROBE_ITEMS.filter(w =>
      w.supplierCode.toLowerCase().includes(q) ||
      w.brand.toLowerCase().includes(q) ||
      w.name.toLowerCase().includes(q)
    );
  }, [shQuery]);

  // Group SH results by supplierCode to show header
  const shGrouped = useMemo(() => {
    const groups: Record<string, WardrobeItem[]> = {};
    filteredSH.forEach(w => {
      if (!groups[w.supplierCode]) groups[w.supplierCode] = [];
      groups[w.supplierCode].push(w);
    });
    return groups;
  }, [filteredSH]);

  function handlePropose(item: WardrobeItem) {
    setProposeItem(item);
    setProposedTo(null);
  }

  function confirmProposal() {
    if (!proposeItem || !proposedTo) return;
    const customer = CRM_CUSTOMERS.find(c => c.id === proposedTo);
    setProposeItem(null);
    showToast(`✓ Proposta inviata a ${customer?.name}`);
  }

  function handleInquiry(item: WardrobeItem) {
    setSentInquiries(prev => new Set(prev).add(item.id));
    showToast(`✓ Richiesta inviata a ${item.seller}`);
  }

  return (
    <div className="flex flex-col h-full bg-background animate-in fade-in slide-in-from-bottom-4 duration-300 relative">

      {/* ── Active sale banner ───────────────────────────────────────────────── */}
      {inviaSale && (
        <div className={`flex items-center gap-2 px-4 py-3 text-white text-xs font-bold shrink-0 ${
          inviaSale.status === 'paid' ? 'bg-green-600' : inviaSale.status === 'expired' ? 'bg-red-500' : 'bg-primary'
        }`}>
          {inviaSale.status === 'pending' && (
            <>
              <Clock size={13} />
              <span className="flex-1 truncate">{inviaSale.customerName} · {inviaSale.item}</span>
              <span className="font-mono shrink-0">{msToCountdown(inviaSale.expiresAt - now)}</span>
              <button
                onClick={() => setInviaSale(prev => prev ? { ...prev, status: 'paid' } : null)}
                className="shrink-0 bg-white/20 px-2.5 py-1 rounded-md text-[11px] ml-1"
              >Pagato ✓</button>
            </>
          )}
          {inviaSale.status === 'paid' && (
            <>
              <span className="flex-1">Pagamento ricevuto ✓</span>
              <button onClick={() => setInviaSale(null)}><X size={14} /></button>
            </>
          )}
          {inviaSale.status === 'expired' && (
            <>
              <span className="flex-1">Scaduto — il cliente non ha pagato</span>
              <button onClick={() => setInviaSale(null)}><X size={14} /></button>
            </>
          )}
        </div>
      )}

      {/* ── Header ───────────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-background border-b border-border">
        <div className="pt-14 px-5 pb-3 flex items-center justify-between">
          <div>
            <h1 className="text-[26px] font-bold tracking-tight leading-none">Magazzino</h1>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              {tab === 'stock'
                ? `${filteredStock.length} articoli · ${myCount} nel tuo stock`
                : shQuery.trim() ? `${filteredSH.length} risultati` : 'Cerca per codice fornitore'}
            </p>
          </div>
          <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
            <SlidersHorizontal size={16} className="text-foreground" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex px-5 border-b border-border gap-0">
          {([
            ['stock',      'Stock',       Package   ],
            ['secondhand', 'Second Hand', RefreshCw ],
          ] as [TabKey, string, any][]).map(([key, label, Icon]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-1.5 py-2.5 mr-6 text-xs font-medium border-b-2 transition-colors ${
                tab === key ? 'border-primary text-primary font-bold' : 'border-transparent text-muted-foreground'
              }`}
            >
              <Icon size={13} />{label}
            </button>
          ))}
        </div>

        {/* Search bar */}
        <div className="px-5 pt-3 pb-3">
          <div className="relative">
            {tab === 'secondhand'
              ? <Barcode size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              : <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            }
            <input
              type="text"
              value={tab === 'stock' ? stockQuery : shQuery}
              onChange={e => tab === 'stock' ? setStockQuery(e.target.value) : setShQuery(e.target.value)}
              placeholder={tab === 'stock' ? 'Brand, articolo, codice fornitore…' : 'Codice fornitore, brand o nome…'}
              className="w-full bg-secondary border border-border rounded-[14px] py-2.5 pl-9 pr-9 text-[13px] focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
            {(tab === 'stock' ? stockQuery : shQuery) && (
              <button
                onClick={() => tab === 'stock' ? setStockQuery('') : setShQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Stock: segment pills + category chips */}
        {tab === 'stock' && (
          <>
            <div className="px-5 pb-3 flex gap-2">
              {([
                { id: 'tutti', label: 'Tutti',           count: NETWORK_ITEMS.length },
                { id: 'mio',   label: 'Nel tuo stock',   count: myCount              },
                { id: 'altri', label: 'Da altri negozi', count: altriCount           },
              ] as { id: StockSegment; label: string; count: number }[]).map(s => (
                <button
                  key={s.id}
                  onClick={() => setStockSegment(s.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all ${
                    stockSegment === s.id
                      ? 'bg-foreground text-background border-foreground'
                      : 'bg-transparent text-muted-foreground border-border'
                  }`}
                >
                  {s.id === 'mio' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                  {s.label}
                  <span className={`text-[10px] font-normal ${stockSegment === s.id ? 'text-background/60' : 'text-muted-foreground/60'}`}>
                    {s.count}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex gap-2 px-5 pb-3 overflow-x-auto hide-scrollbar">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setStockCategory(cat)}
                  className={`shrink-0 px-3 py-1 rounded-full text-[11px] font-medium border transition-all ${
                    stockCategory === cat
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-transparent text-muted-foreground border-border'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Stock grid ───────────────────────────────────────────────────────── */}
      {tab === 'stock' && (
        <div className="flex-1 overflow-y-auto hide-scrollbar pb-24">
          {filteredStock.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <ShoppingBag size={36} className="opacity-20" />
              <p className="text-sm">Nessun articolo trovato</p>
              <button
                onClick={() => { setStockQuery(''); setStockCategory('Tutti'); setStockSegment('tutti'); }}
                className="text-xs text-primary underline"
              >
                Reimposta filtri
              </button>
            </div>
          ) : (
            <>
              {/* Legend */}
              <div className="px-5 pt-3 pb-2 flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  Taglie nel tuo stock
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                  <span className="w-2 h-2 rounded bg-secondary border border-border inline-block" />
                  Da altri negozi (richiedibile)
                </div>
              </div>
              <div className="grid grid-cols-2 gap-px bg-border">
                {filteredStock.map(item => (
                  <StockCard
                    key={item.id}
                    item={item}
                    myStockSizes={MY_STOCK_MAP[item.supplierCode] ?? []}
                    isRequested={requestedStock.has(item.id)}
                    onClick={() => openStockDetail(item)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* ── Second Hand results ───────────────────────────────────────────────── */}
      {tab === 'secondhand' && (
        <div className="flex-1 overflow-y-auto hide-scrollbar pb-24">
          {!shQuery.trim() ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-20 px-8 text-center gap-4">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                <Barcode size={28} className="text-muted-foreground opacity-50" />
              </div>
              <div>
                <p className="font-semibold text-sm mb-1">Cerca un articolo nella rete</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Inserisci il codice fornitore (es. <span className="font-mono bg-secondary px-1 py-0.5 rounded text-[10px]">MC-MY-BLK-M</span>) o il nome del brand per vedere tutti gli Aidlooker che hanno quell'articolo nell'armadio.
                </p>
              </div>
              <div className="flex flex-col gap-1.5 w-full mt-1">
                {['MC-MY-BLK-M', 'MM-TED-CAM-S', 'LOR-CSH-CAM-M'].map(code => (
                  <button
                    key={code}
                    onClick={() => setShQuery(code)}
                    className="bg-secondary rounded-[10px] py-2 px-3 text-xs font-mono text-muted-foreground text-left hover:bg-secondary/70 transition-colors"
                  >
                    {code}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredSH.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-2">
              <RefreshCw size={36} className="opacity-20" />
              <p className="text-sm">Nessun articolo trovato nella rete</p>
            </div>
          ) : (
            <div className="px-4 pt-3 pb-6 space-y-4">
              {Object.entries(shGrouped).map(([code, items]) => {
                const first = items[0];
                const forSaleCount = items.filter(i => i.forSale).length;
                const notForSaleCount = items.length - forSaleCount;
                return (
                  <div key={code}>
                    {/* Group header */}
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="w-10 h-12 rounded-[8px] shrink-0" style={{ backgroundColor: first.imageColor }} />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm">{first.brand} — {first.name}</p>
                        <p className="text-[10px] font-mono text-muted-foreground">{code}</p>
                        <div className="flex gap-2 mt-1">
                          {forSaleCount > 0 && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              {forSaleCount} in vendita
                            </span>
                          )}
                          {notForSaleCount > 0 && (
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                              {notForSaleCount} nel guardaroba
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Aidlooker rows */}
                    <div className="space-y-2 pl-1">
                      {items.map(w => {
                        const sent = sentInquiries.has(w.id);
                        return (
                          <div
                            key={w.id}
                            className={`flex items-center gap-3 p-3 rounded-[12px] border ${
                              w.forSale ? 'bg-card border-border' : 'bg-amber-50 border-amber-200'
                            }`}
                          >
                            {/* Avatar */}
                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center font-semibold text-xs shrink-0">
                              {w.seller.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-xs">{w.seller}</p>
                              <p className="text-[10px] text-muted-foreground">Taglia {w.size}</p>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${CONDITION_STYLE[w.condition]}`}>
                                  {CONDITION_LABEL[w.condition]}
                                </span>
                                {w.forSale ? (
                                  <span className="text-[10px] font-bold text-foreground">
                                    {w.price > 0 ? `€${w.price}` : 'Trattabile'}
                                  </span>
                                ) : (
                                  <span className="text-[9px] text-amber-600 font-semibold">Non in vendita</span>
                                )}
                              </div>
                            </div>
                            {/* Action */}
                            {w.forSale ? (
                              <button
                                onClick={() => handlePropose(w)}
                                className="shrink-0 flex items-center gap-1 bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1.5 rounded-[8px] active:scale-95 transition-transform"
                              >
                                <Send size={11} /> Proponi
                              </button>
                            ) : sent ? (
                              <span className="shrink-0 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1.5 rounded-[8px] border border-emerald-200">
                                Inviata ✓
                              </span>
                            ) : (
                              <button
                                onClick={() => handleInquiry(w)}
                                className="shrink-0 flex items-center gap-1 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-[8px] active:scale-95 transition-transform"
                              >
                                <MessageCircle size={11} /> Chiedi
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Stock detail sheet ───────────────────────────────────────────────── */}
      {selectedStock && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 animate-in fade-in duration-200"
          onClick={() => setSelectedStock(null)}
        >
          <div
            className="w-full sm:w-[390px] max-h-[85vh] bg-background rounded-t-[24px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-full duration-300"
            onClick={e => e.stopPropagation()}
          >
            {/* Swatch */}
            <div className="h-40 shrink-0 relative flex items-end pb-4 px-5" style={{ backgroundColor: selectedStock.imageColor }}>
              <button onClick={() => setSelectedStock(null)} className="absolute top-4 right-4 p-2 bg-black/20 text-white rounded-full">
                <X size={18} />
              </button>
              {(MY_STOCK_MAP[selectedStock.supplierCode] ?? []).length > 0 && (
                <div className="bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" /> Nel tuo stock
                </div>
              )}
            </div>
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 bg-card rounded-t-[24px] -mt-5 space-y-4">
              <div>
                <p className="font-bold text-xl">{selectedStock.brand}</p>
                <p className="text-muted-foreground text-sm">{selectedStock.name} · {selectedStock.color}</p>
                <p className="font-mono text-[10px] text-muted-foreground mt-0.5 bg-secondary px-2 py-1 rounded inline-block mt-1">{selectedStock.supplierCode}</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  ['Retail', `€${selectedStock.price.toLocaleString()}`],
                  ['Wholesale', `€${selectedStock.wholesale.toLocaleString()}`],
                  ['Origine', selectedStock.origin],
                ].map(([l, v]) => (
                  <div key={l} className="bg-background rounded-[10px] p-2.5 border border-border">
                    <p className="text-[9px] text-muted-foreground uppercase tracking-wider mb-1">{l}</p>
                    <p className="text-xs font-bold">{v}</p>
                  </div>
                ))}
              </div>
              {/* Size picker */}
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Taglie</p>
                <div className="flex flex-wrap gap-2">
                  {selectedStock.sizes.map(s => {
                    const own = (MY_STOCK_MAP[selectedStock.supplierCode] ?? []).includes(s);
                    const sel = selectedStockSize === s;
                    return (
                      <button
                        key={s}
                        onClick={() => setSelectedStockSize(s)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-[10px] border text-sm font-bold transition-all ${
                          sel ? 'border-primary bg-primary/5 text-primary' : 'border-border text-foreground'
                        }`}
                      >
                        {own && <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />}
                        {s}
                        {own && <span className="text-[9px] text-emerald-600 font-normal">stock</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
              {/* CTA */}
              {selectedStockSize && (
                <div className="space-y-2">
                  {(MY_STOCK_MAP[selectedStock.supplierCode] ?? []).includes(selectedStockSize) ? (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-[14px] p-3 text-sm font-semibold text-emerald-700 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Taglia {selectedStockSize} disponibile nel tuo stock
                    </div>
                  ) : requestedStock.has(selectedStock.id) ? (
                    <div className="bg-secondary border border-border rounded-[14px] p-3 text-sm font-semibold text-muted-foreground text-center">
                      Richiesta inviata al fornitore ✓
                    </div>
                  ) : (
                    <button
                      onClick={handleRequestStock}
                      className="w-full bg-secondary text-foreground font-bold py-3 rounded-[14px] text-sm active:scale-[0.98] transition-transform border border-border"
                    >
                      Richiedi taglia {selectedStockSize} al fornitore
                    </button>
                  )}
                  {/* Invia al cliente */}
                  <button
                    onClick={() => handleInviaAlCliente(selectedStock.brand, selectedStock.name, selectedStockSize)}
                    className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-[14px] text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                  >
                    <Zap size={14} /> Invia al cliente · timer 10 min
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Customer picker ─────────────────────────────────────────────────── */}
      {proposeItem && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 animate-in fade-in duration-200">
          <div className="w-full sm:w-[390px] h-[80vh] bg-background rounded-t-[24px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-full duration-300">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="font-bold text-lg">Scegli il cliente</h2>
              <button onClick={() => setProposeItem(null)} className="p-2 bg-secondary rounded-full"><X size={18} /></button>
            </div>
            <div className="bg-secondary p-3 flex gap-3 items-center">
              <div className="w-10 h-12 rounded-[8px] shrink-0" style={{ backgroundColor: proposeItem.imageColor }} />
              <div>
                <p className="font-semibold text-sm">{proposeItem.brand} {proposeItem.name}</p>
                <p className="text-xs text-muted-foreground">
                  {CONDITION_LABEL[proposeItem.condition]} · Taglia {proposeItem.size}
                  {proposeItem.price > 0 ? ` · €${proposeItem.price}` : ' · Trattabile'}
                </p>
              </div>
            </div>
            <p className="px-4 py-3 text-xs text-muted-foreground border-b border-border">
              Il cliente riceverà una notifica con la proposta di acquisto.
            </p>
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

      {/* ── Invia al cliente — customer picker ──────────────────────────────── */}
      {showInviaCustomer && pendingInviaItem && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 animate-in fade-in duration-200">
          <div className="w-full sm:w-[390px] h-[80vh] bg-background rounded-t-[24px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-full duration-300">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="font-bold text-lg">Scegli il cliente</h2>
              <button onClick={() => { setShowInviaCustomer(false); setPendingInviaItem(null); }} className="p-2 bg-secondary rounded-full">
                <X size={18} />
              </button>
            </div>
            {/* Item preview */}
            <div className="bg-secondary px-4 py-3 flex items-center gap-2 border-b border-border">
              <Zap size={13} className="text-primary shrink-0" />
              <div>
                <p className="font-semibold text-sm">{pendingInviaItem.brand} {pendingInviaItem.name} · {pendingInviaItem.size}</p>
                <p className="text-xs text-muted-foreground">Il cliente riceverà un link con timer di 10 minuti per pagare</p>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-4 pt-3 pb-4 space-y-2">
              {CRM_CUSTOMERS.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedInviaCustomer(c)}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-[12px] border text-left transition-colors ${
                    selectedInviaCustomer?.id === c.id ? 'border-primary bg-primary/5' : 'border-border bg-card'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-semibold text-sm shrink-0">
                    {c.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{c.name}</p>
                    {c.size && <p className="text-xs text-muted-foreground">Taglia abituale: {c.size}</p>}
                  </div>
                  {selectedInviaCustomer?.id === c.id && <span className="text-primary text-lg">✓</span>}
                </button>
              ))}
            </div>
            <div className="p-4 border-t border-border">
              <button
                onClick={confirmInvia}
                disabled={!selectedInviaCustomer}
                className={`w-full py-3.5 font-bold rounded-[14px] flex items-center justify-center gap-2 transition-all ${
                  selectedInviaCustomer ? 'bg-primary text-primary-foreground active:scale-[0.98]' : 'bg-secondary text-muted-foreground cursor-not-allowed'
                }`}
              >
                <Zap size={15} /> Invia link di pagamento
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast ────────────────────────────────────────────────────────────── */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg animate-in fade-in z-50 whitespace-nowrap">
          {toast}
        </div>
      )}
    </div>
  );
}
