import React, { useState, useMemo } from 'react';
import { Search, X, SlidersHorizontal, ShoppingBag, Tag, MapPin, User, ChevronDown, Check } from 'lucide-react';

// ── Types & Data ──────────────────────────────────────────────────────────────

type ProductType = 'nuovo' | 'secondhand';
type Condition = 'nuovo' | 'ottimo' | 'buono' | 'discreto';

interface MarketItem {
  id: string;
  type: ProductType;
  brand: string;
  name: string;
  category: string;
  color: string;
  imageColor: string;
  price: number;
  sizes?: string[];
  size?: string;
  seller: string;
  condition?: Condition;
  supplierCode: string;
  isNew?: boolean; // solo i nuovi arrivi recenti
}

const ALL_ITEMS: MarketItem[] = [
  // ── Nuovo (dai negozi) ─────────────────────────────────────────────────────
  { id: 'n1',  type: 'nuovo', brand: 'Max Mara',     name: 'Teddy Coat',            category: 'Cappotto', color: 'Cammello',  imageColor: '#C4956A', price: 1290, sizes: ['XS','S','M'],            seller: 'Boutique Torino',    supplierCode: 'MM-TED-CAM-S',   isNew: true  },
  { id: 'n2',  type: 'nuovo', brand: 'Carhartt WIP', name: 'Duck Active Jacket',    category: 'Giacca',   color: 'Marrone',   imageColor: '#8B5E3C', price: 190,  sizes: ['S','M','L','XL'],         seller: 'Store Milano',       supplierCode: 'CW-DJ-BRN-M'          },
  { id: 'n3',  type: 'nuovo', brand: 'Gucci',        name: 'GG Monogram Blazer',    category: 'Blazer',   color: 'Beige',     imageColor: '#D2B48C', price: 2100, sizes: ['36','38','40'],            seller: 'Boutique Firenze',   supplierCode: 'GU-GG-BLZ-38'         },
  { id: 'n4',  type: 'nuovo', brand: 'Stone Island', name: 'Light Jacket SS25',     category: 'Giacca',   color: 'Bianco',    imageColor: '#E8E8E4', price: 560,  sizes: ['M','L','XL'],             seller: 'Multibrand Roma',    supplierCode: 'SI-LJ-WHT-L',    isNew: true  },
  { id: 'n5',  type: 'nuovo', brand: 'Prada',        name: 'Re-Nylon Trench',       category: 'Cappotto', color: 'Oliva',     imageColor: '#6B7B3A', price: 2350, sizes: ['XS','S'],                 seller: 'Boutique Venezia',   supplierCode: 'PR-RN-TRN-S'          },
  { id: 'n6',  type: 'nuovo', brand: 'Moncler',      name: 'Maya Short Down',       category: 'Piumino',  color: 'Nero',      imageColor: '#1a1a1a', price: 1350, sizes: ['S','M','L'],              seller: 'Store Napoli',       supplierCode: 'MC-MY-BLK-M',    isNew: true  },
  { id: 'n7',  type: 'nuovo', brand: 'Toteme',       name: 'Scarf Collar Coat',     category: 'Cappotto', color: 'Grigio',    imageColor: '#9A9A9A', price: 890,  sizes: ['XS','S','M'],             seller: 'Boutique Bologna',   supplierCode: 'TOT-SC-GRY-S'         },
  { id: 'n8',  type: 'nuovo', brand: 'C.P. Company', name: 'Goggle Jacket',         category: 'Giacca',   color: 'Blu Navy',  imageColor: '#1C3557', price: 690,  sizes: ['M','L','XL'],             seller: 'Multibrand Genova',  supplierCode: 'CP-GG-BLU-L'          },
  { id: 'n9',  type: 'nuovo', brand: 'A.P.C.',       name: 'Sailor Stripe Tee',     category: 'T-Shirt',  color: 'Bianco/Blu',imageColor: '#C8D8E8', price: 110,  sizes: ['XS','S','M','L'],         seller: 'Store Milano',       supplierCode: 'APC-SLR-BLK-M'        },
  { id: 'n10', type: 'nuovo', brand: 'Loro Piana',   name: 'Cashmere Turtleneck',   category: 'Maglia',   color: 'Camel',     imageColor: '#C4956A', price: 1180, sizes: ['XS','S','M'],             seller: 'Boutique Torino',    supplierCode: 'LOR-CSH-CAM-M'        },
  { id: 'n11', type: 'nuovo', brand: 'Ami Paris',    name: 'ADC Heart Hoodie',      category: 'Felpa',    color: 'Nero',      imageColor: '#1a1a1a', price: 320,  sizes: ['S','M','L'],              seller: 'Multibrand Roma',    supplierCode: 'AMI-HRT-BLK-S', isNew: true  },
  { id: 'n12', type: 'nuovo', brand: 'Nike',         name: 'Air Force 1 \'07',      category: 'Scarpe',   color: 'Bianco',    imageColor: '#F5F5F0', price: 130,  sizes: ['40','41','42','43','44'],  seller: 'Store Milano',       supplierCode: 'NK-AF1-WHT-42'         },
  { id: 'n13', type: 'nuovo', brand: 'Levi\'s',      name: '501 Original Jeans',    category: 'Jeans',    color: 'Blu Denim', imageColor: '#3A5F8A', price: 100,  sizes: ['28','30','32','34'],       seller: 'Multibrand Torino',  supplierCode: 'LEV-501-BLU-30'        },
  { id: 'n14', type: 'nuovo', brand: 'Arket',        name: 'Merino Crewneck',       category: 'Maglia',   color: 'Ecru',      imageColor: '#F0EAD6', price: 145,  sizes: ['XS','S','M','L'],         seller: 'Store Firenze',      supplierCode: 'ARC-MRW-ECR-M'         },
  { id: 'n15', type: 'nuovo', brand: 'Bottega Veneta',name: 'Intrecciato Tote',     category: 'Borsa',    color: 'Nero',      imageColor: '#1a1a1a', price: 3200, sizes: ['Unica'],                  seller: 'Boutique Milano',    supplierCode: 'BV-IT-BLK-U',   isNew: true  },
  { id: 'n16', type: 'nuovo', brand: 'Jacquemus',    name: 'Le Chiquito',           category: 'Borsa',    color: 'Sabbia',    imageColor: '#D4B896', price: 590,  sizes: ['Unica'],                  seller: 'Boutique Firenze',   supplierCode: 'JAC-CHQ-SND-U'        },
  { id: 'n17', type: 'nuovo', brand: 'Acne Studios', name: 'Wool Scarf Coat',       category: 'Cappotto', color: 'Rosa Antico',imageColor: '#D4A5A0',price: 1250, sizes: ['XS','S','M'],             seller: 'Store Milano',       supplierCode: 'ACN-WSC-PNK-S', isNew: true  },
  { id: 'n18', type: 'nuovo', brand: 'Golden Goose', name: 'Ball Star Sneaker',     category: 'Scarpe',   color: 'Bianco/Oro',imageColor: '#EDE5C0', price: 535,  sizes: ['37','38','39','40','41'],  seller: 'Multibrand Venezia', supplierCode: 'GG-BS-WHT-39'         },
  { id: 'n19', type: 'nuovo', brand: 'Brunello Cucinelli',name: 'Cashmere Cardigan',category: 'Maglia',   color: 'Tortora',   imageColor: '#C8B89A', price: 1890, sizes: ['XS','S','M','L'],         seller: 'Boutique Venezia',   supplierCode: 'BC-CSH-TOR-M'         },
  { id: 'n20', type: 'nuovo', brand: 'Isabel Marant', name: 'Étoile Denim Jacket',  category: 'Giacca',   color: 'Blu Sbiadito',imageColor: '#7A9BB5',price: 420, sizes: ['34','36','38','40'],       seller: 'Boutique Roma',      supplierCode: 'IM-DNM-BLU-36'        },
  // ── Second Hand ────────────────────────────────────────────────────────────
  { id: 'sh1',  type: 'secondhand', brand: 'Gucci',        name: 'GG Monogram Blazer',   category: 'Blazer',   color: 'Beige',    imageColor: '#D2B48C', price: 320,  size: '38', seller: 'Sofia F.',     condition: 'ottimo',   supplierCode: 'GU-GG-BLZ-38'  },
  { id: 'sh2',  type: 'secondhand', brand: 'Carhartt WIP', name: 'Duck Active Jacket',   category: 'Giacca',   color: 'Marrone',  imageColor: '#8B5E3C', price: 110,  size: 'M',  seller: 'Luca T.',      condition: 'buono',    supplierCode: 'CW-DJ-BRN-M'   },
  { id: 'sh3',  type: 'secondhand', brand: 'Max Mara',     name: 'Teddy Coat',           category: 'Cappotto', color: 'Cammello', imageColor: '#C4956A', price: 420,  size: 'S',  seller: 'Giulia R.',    condition: 'ottimo',   supplierCode: 'MM-TED-CAM-S'  },
  { id: 'sh4',  type: 'secondhand', brand: 'Prada',        name: 'Re-Nylon Trench',      category: 'Cappotto', color: 'Oliva',    imageColor: '#6B7B3A', price: 1400, size: 'S',  seller: 'Marco B.',     condition: 'nuovo',    supplierCode: 'PR-RN-TRN-S'   },
  { id: 'sh5',  type: 'secondhand', brand: 'Toteme',       name: 'Scarf Collar Coat',    category: 'Cappotto', color: 'Grigio',   imageColor: '#9A9A9A', price: 380,  size: 'S',  seller: 'Anna M.',      condition: 'buono',    supplierCode: 'TOT-SC-GRY-S'  },
  { id: 'sh6',  type: 'secondhand', brand: 'Stone Island', name: 'Light Jacket SS25',    category: 'Giacca',   color: 'Bianco',   imageColor: '#E8E8E4', price: 290,  size: 'L',  seller: 'Luca T.',      condition: 'ottimo',   supplierCode: 'SI-LJ-WHT-L'   },
  { id: 'sh7',  type: 'secondhand', brand: 'Moncler',      name: 'Maya Short Down',      category: 'Piumino',  color: 'Nero',     imageColor: '#1a1a1a', price: 780,  size: 'M',  seller: 'Chiara V.',    condition: 'nuovo',    supplierCode: 'MC-MY-BLK-M'   },
  { id: 'sh8',  type: 'secondhand', brand: 'C.P. Company', name: 'Goggle Jacket',        category: 'Giacca',   color: 'Blu Navy', imageColor: '#1C3557', price: 320,  size: 'L',  seller: 'Marco B.',     condition: 'buono',    supplierCode: 'CP-GG-BLU-L'   },
  { id: 'sh9',  type: 'secondhand', brand: 'A.P.C.',       name: 'Sailor Stripe Tee',    category: 'T-Shirt',  color: 'Bianco/Blu',imageColor: '#C8D8E8', price: 55,  size: 'M',  seller: 'Sara M.',      condition: 'ottimo',   supplierCode: 'APC-SLR-BLK-M' },
  { id: 'sh10', type: 'secondhand', brand: 'Moncler',      name: 'Clairy Long Down',     category: 'Piumino',  color: 'Grigio',   imageColor: '#9A9A9A', price: 640,  size: 'L',  seller: 'Valentina S.', condition: 'nuovo',    supplierCode: 'MC-CL-GRY-L'   },
  { id: 'sh11', type: 'secondhand', brand: 'Stone Island', name: 'Ghost Piece Jacket',   category: 'Giacca',   color: 'Blu',      imageColor: '#1C3557', price: 380,  size: 'XL', seller: 'Fabio R.',     condition: 'buono',    supplierCode: 'SI-GJ-BLU-XL'  },
  { id: 'sh12', type: 'secondhand', brand: 'Toteme',       name: 'Double-breasted Blazer',category: 'Blazer',  color: 'Beige',    imageColor: '#D2B48C', price: 260,  size: 'M',  seller: 'Marta G.',     condition: 'discreto', supplierCode: 'TOT-TW-BEI-M'  },
  { id: 'sh13', type: 'secondhand', brand: 'Ami Paris',    name: 'Heart Crewneck',       category: 'Maglia',   color: 'Nero',     imageColor: '#1a1a1a', price: 195,  size: 'S',  seller: 'Beatrice C.',  condition: 'ottimo',   supplierCode: 'AMI-HRT-BLK-S' },
];

const CATEGORIES = ['Tutti', 'Cappotto', 'Giacca', 'Piumino', 'Blazer', 'Felpa', 'Maglia', 'T-Shirt', 'Jeans', 'Scarpe'];

const CONDITION_LABEL: Record<Condition, string> = {
  nuovo: 'Come nuovo', ottimo: 'Ottimo', buono: 'Buono', discreto: 'Discreto',
};
const CONDITION_STYLE: Record<Condition, string> = {
  nuovo:    'bg-emerald-50 text-emerald-700 border-emerald-200',
  ottimo:   'bg-sky-50 text-sky-700 border-sky-200',
  buono:    'bg-amber-50 text-amber-700 border-amber-200',
  discreto: 'bg-gray-100 text-gray-500 border-gray-200',
};

type Segment = 'tutti' | 'nuovo' | 'secondhand';

// ── Component ─────────────────────────────────────────────────────────────────

export function MarketplaceAidlooker() {
  const [query, setQuery] = useState('');
  const [segment, setSegment] = useState<Segment>('tutti');
  const [category, setCategory] = useState('Tutti');
  const [selected, setSelected] = useState<MarketItem | null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [requested, setRequested] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    return ALL_ITEMS.filter(item => {
      if (segment === 'nuovo' && item.type !== 'nuovo') return false;
      if (segment === 'secondhand' && item.type !== 'secondhand') return false;
      if (category !== 'Tutti' && item.category !== category) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        if (
          !item.brand.toLowerCase().includes(q) &&
          !item.name.toLowerCase().includes(q) &&
          !item.category.toLowerCase().includes(q) &&
          !item.color.toLowerCase().includes(q) &&
          !item.supplierCode.toLowerCase().includes(q)
        ) return false;
      }
      return true;
    });
  }, [query, segment, category]);

  const nuovoCount = ALL_ITEMS.filter(i => i.type === 'nuovo').length;
  const secondhandCount = ALL_ITEMS.filter(i => i.type === 'secondhand').length;

  function openDetail(item: MarketItem) {
    setSelected(item);
    setSelectedSize(item.sizes?.[0] ?? item.size ?? '');
  }

  function handleRequest() {
    if (!selected) return;
    setRequested(prev => new Set(prev).add(selected.id));
    setSelected(null);
  }

  return (
    <div className="flex flex-col h-full bg-background animate-in fade-in slide-in-from-bottom-4 duration-300">

      {/* ── Sticky header ──────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-background border-b border-border">
        {/* Title row */}
        <div className="pt-14 px-5 pb-3 flex items-center justify-between">
          <div>
            <h1 className="text-[26px] font-bold tracking-tight leading-none">Marketplace</h1>
            <p className="text-[11px] text-muted-foreground mt-0.5">{filtered.length} articoli disponibili</p>
          </div>
          <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
            <SlidersHorizontal size={16} className="text-foreground" />
          </button>
        </div>

        {/* Search bar */}
        <div className="px-5 pb-3">
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Brand, articolo, colore…"
              className="w-full bg-secondary border border-border rounded-[14px] py-2.5 pl-9 pr-9 text-[13px] focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Segment pills */}
        <div className="px-5 pb-3 flex gap-2">
          {([
            { id: 'tutti',      label: 'Tutti',       count: ALL_ITEMS.length },
            { id: 'nuovo',      label: 'Nuovo',       count: nuovoCount },
            { id: 'secondhand', label: 'Second Hand', count: secondhandCount },
          ] as { id: Segment; label: string; count: number }[]).map(s => (
            <button
              key={s.id}
              onClick={() => setSegment(s.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-semibold border transition-all ${
                segment === s.id
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-transparent text-muted-foreground border-border hover:border-foreground/30'
              }`}
            >
              {s.label}
              <span className={`text-[10px] font-normal ${segment === s.id ? 'text-background/70' : 'text-muted-foreground/60'}`}>
                {s.count}
              </span>
            </button>
          ))}
        </div>

        {/* Category chips */}
        <div className="flex gap-2 px-5 pb-3 overflow-x-auto hide-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`shrink-0 px-3 py-1 rounded-full text-[11px] font-medium border transition-all ${
                category === cat
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-transparent text-muted-foreground border-border hover:border-foreground/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto hide-scrollbar pb-24">
        {/* Second Hand tip banner */}
        {(segment === 'secondhand' || segment === 'tutti') && (
          <div className="mx-3 mt-3 mb-1 rounded-[16px] overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#2d2320] p-4 flex gap-3 items-start">
            <div className="text-[22px] leading-none mt-0.5">✨</div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-bold text-white leading-snug">
                Il capo che cerchi esiste già — è nell'armadio di qualcuno.
              </p>
              <p className="text-[11px] text-white/60 mt-1 leading-relaxed">
                Il tuo negozio Aidlook può cercarlo nella rete: magari chi lo possiede è pronto a venderlo.
              </p>
              <button className="mt-2.5 inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 transition-colors text-white text-[11px] font-semibold px-3 py-1.5 rounded-full">
                <span>Chiedi al negozio</span>
                <span className="text-white/50">→</span>
              </button>
            </div>
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
            <ShoppingBag size={36} className="opacity-20" />
            <p className="text-sm">Nessun articolo trovato</p>
            <button
              onClick={() => { setQuery(''); setCategory('Tutti'); setSegment('tutti'); }}
              className="text-xs text-primary underline"
            >
              Reimposta filtri
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-px bg-border p-px mt-3">
            {filtered.map(item => (
              <ProductCard
                key={item.id}
                item={item}
                isRequested={requested.has(item.id)}
                onClick={() => openDetail(item)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Product detail sheet ────────────────────────────────────────────── */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 animate-in fade-in duration-200"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-[390px] bg-background rounded-t-[24px] overflow-hidden animate-in slide-in-from-bottom-full duration-300"
            onClick={e => e.stopPropagation()}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-border" />
            </div>

            {/* Color image */}
            <div
              className="mx-5 rounded-[16px] h-52 flex items-end p-4 relative overflow-hidden"
              style={{ backgroundColor: selected.imageColor }}
            >
              {/* Badge NEW solo sui nuovi arrivi, SECOND HAND per usato */}
              {selected.isNew && (
                <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/60 text-white tracking-wide">
                  NUOVO ARRIVO
                </span>
              )}
              {selected.type === 'secondhand' && (
                <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/80 text-gray-800">
                  SECOND HAND
                </span>
              )}

              {/* Condition (secondhand) */}
              {selected.condition && (
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${CONDITION_STYLE[selected.condition]}`}>
                  {CONDITION_LABEL[selected.condition]}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="px-5 pt-4 pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground tracking-widest uppercase">{selected.brand}</p>
                  <h2 className="text-[19px] font-bold mt-0.5 leading-tight">{selected.name}</h2>
                  <p className="text-[12px] text-muted-foreground mt-0.5">{selected.color} · {selected.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-[22px] font-bold">€{selected.price.toLocaleString()}</p>
                </div>
              </div>

              {/* Seller / Store */}
              <div className="flex items-center gap-1.5 mt-3">
                {selected.type === 'nuovo' ? (
                  <MapPin size={13} className="text-muted-foreground" />
                ) : (
                  <User size={13} className="text-muted-foreground" />
                )}
                <p className="text-[12px] text-muted-foreground">
                  {selected.type === 'nuovo' ? `Venduto da ${selected.seller}` : `Venduto da ${selected.seller}`}
                </p>
              </div>

              {/* Code */}
              <div className="flex items-center gap-1.5 mt-1">
                <Tag size={12} className="text-muted-foreground" />
                <p className="text-[11px] font-mono text-muted-foreground">{selected.supplierCode}</p>
              </div>
            </div>

            {/* Size picker (nuovo) */}
            {selected.type === 'nuovo' && selected.sizes && selected.sizes.length > 0 && (
              <div className="px-5 pt-2 pb-1">
                <p className="text-[11px] font-semibold text-muted-foreground mb-2">TAGLIA</p>
                <div className="flex gap-2 flex-wrap">
                  {selected.sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`w-10 h-10 rounded-[10px] border text-[13px] font-medium transition-all ${
                        selectedSize === s
                          ? 'bg-foreground text-background border-foreground'
                          : 'bg-transparent text-foreground border-border'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size (secondhand) */}
            {selected.type === 'secondhand' && selected.size && (
              <div className="px-5 pt-2 pb-1">
                <p className="text-[11px] font-semibold text-muted-foreground mb-2">TAGLIA</p>
                <div className="inline-block px-4 py-2 bg-foreground text-background rounded-[10px] text-[13px] font-medium">
                  {selected.size}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="px-5 pt-3 pb-6">
              {requested.has(selected.id) ? (
                <div className="w-full py-4 rounded-[14px] bg-green-50 border border-green-200 flex items-center justify-center gap-2">
                  <Check size={17} className="text-green-700" />
                  <span className="text-[15px] font-semibold text-green-700">Richiesta inviata</span>
                </div>
              ) : (
                <button
                  onClick={handleRequest}
                  className="w-full py-4 rounded-[14px] bg-primary text-primary-foreground font-bold text-[15px] active:scale-[0.98] transition-transform shadow-md"
                >
                  {selected.type === 'nuovo' ? 'Richiedi al negozio' : 'Contatta il venditore'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Product Card ──────────────────────────────────────────────────────────────

function ProductCard({
  item,
  isRequested,
  onClick,
}: {
  item: MarketItem;
  isRequested: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-background flex flex-col text-left active:opacity-80 transition-opacity"
    >
      {/* Color swatch / image placeholder */}
      <div className="relative w-full" style={{ paddingBottom: '133%' }}>
        <div
          className="absolute inset-0"
          style={{ backgroundColor: item.imageColor }}
        />
        {/* Type pill — NEW solo sui nuovi arrivi, S/H per il second hand */}
        {item.isNew && (
          <span className="absolute top-2 left-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-black/60 text-white tracking-wide">
            NEW
          </span>
        )}
        {item.type === 'secondhand' && (
          <span className="absolute top-2 left-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-white/80 text-gray-800">
            S/H
          </span>
        )}
        {/* Condition dot (secondhand) */}
        {item.condition && (
          <span className={`absolute bottom-2 right-2 text-[9px] font-semibold px-1.5 py-0.5 rounded-full border ${CONDITION_STYLE[item.condition]}`}>
            {CONDITION_LABEL[item.condition]}
          </span>
        )}
        {/* Requested check */}
        {isRequested && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <Check size={18} className="text-green-600" />
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-2.5 flex-1 flex flex-col">
        <p className="text-[9px] font-bold tracking-widest text-muted-foreground uppercase leading-none mb-0.5">
          {item.brand}
        </p>
        <p className="text-[12px] font-semibold leading-tight text-foreground line-clamp-2">
          {item.name}
        </p>
        <p className="text-[10px] text-muted-foreground mt-0.5">
          {item.type === 'secondhand' ? item.size : item.sizes?.join(' · ')}
        </p>
        <p className="text-[13px] font-bold mt-1.5">
          €{item.price.toLocaleString()}
        </p>
        <p className="text-[9px] text-muted-foreground mt-0.5 truncate">
          {item.type === 'nuovo' ? item.seller : `da ${item.seller}`}
        </p>
      </div>
    </button>
  );
}
