import React, { useState } from 'react';
import { User } from 'lucide-react';

export function SecondHandAidlooker() {
  const [tab, setTab] = useState<'miei' | 'esplora'>('esplora');

  const myItems = [
    { id: 1, name: 'Gucci GG Monogram Blazer', type: 'Blazer', size: '38', condition: 'ottimo', price: '€320', color: '#654321' },
    { id: 2, name: 'Max Mara Cappotto Cammello', type: 'Cappotto', size: 'S', condition: 'ottimo', price: '€450', color: '#D4B895' },
    { id: 3, name: 'A.P.C. Pantaloni Sartoriali', type: 'Pantaloni', size: 'S', condition: 'buono', price: '€120', color: '#1a1a1a' },
  ];

  const exploreItems = [
    { id: 4, name: 'Max Mara Teddy Coat', size: 'S', condition: 'ottimo', seller: 'Giulia R.', price: 'Trattabile', color: '#D4B895' },
    { id: 5, name: 'Prada Re-Nylon Trench', size: 'S', condition: 'nuovo', seller: 'Sofia F.', price: '€1400', color: '#1a1a1a' },
    { id: 6, name: 'Stone Island Light Jacket', size: 'L', condition: 'ottimo', seller: 'Luca T.', price: '€290', color: '#e5e7eb' },
    { id: 7, name: 'Moncler Maya Short Down', size: 'M', condition: 'nuovo', seller: 'Chiara V.', price: '€780', color: '#111827' },
    { id: 8, name: 'A.P.C. Sailor Stripe Tee', size: 'M', condition: 'ottimo', seller: 'Sara M.', price: '€55', color: '#f3f4f6' },
  ];

  return (
    <div className="min-h-full pb-20 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="pt-14 px-6 pb-2 bg-background sticky top-0 z-10">
        <h1 className="text-[28px] font-bold mb-4">Second Hand</h1>
        
        <div className="flex bg-secondary p-1 rounded-[12px] mb-4">
          <button 
            onClick={() => setTab('esplora')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-[10px] transition-colors ${tab === 'esplora' ? 'bg-card shadow-sm text-primary' : 'text-muted-foreground'}`}
          >
            Esplora
          </button>
          <button 
            onClick={() => setTab('miei')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-[10px] transition-colors ${tab === 'miei' ? 'bg-card shadow-sm text-primary' : 'text-muted-foreground'}`}
          >
            I miei annunci
          </button>
        </div>
      </div>

      <div className="px-6 space-y-4 pt-2">
        {tab === 'miei' && (
          <div className="space-y-4">
            {myItems.map(item => (
              <div key={item.id} className="bg-card border border-border p-3 rounded-[16px] flex gap-4 shadow-sm">
                <div 
                  className="w-20 h-24 rounded-[12px] shrink-0 border border-black/5"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex-1 py-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm leading-tight mb-1">{item.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {item.type} · Taglia {item.size}
                    </p>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="font-bold text-sm">{item.price}</span>
                    <span className="bg-green-50 text-success text-[10px] font-bold px-2 py-1 rounded-[6px]">
                      In vendita
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'esplora' && (
          <div className="space-y-4">
            {exploreItems.map(item => (
              <div key={item.id} className="bg-card border border-border p-4 rounded-[16px] shadow-sm relative">
                <div className="flex gap-4">
                  <div 
                    className="w-24 h-28 rounded-[12px] shrink-0 border border-black/5"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-sm leading-tight pr-4">{item.name}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">Taglia {item.size}</p>
                      
                      <span className={`inline-block px-2 py-0.5 rounded-[6px] text-[10px] font-bold uppercase tracking-wider mb-2 ${
                        item.condition === 'nuovo' ? 'bg-accent/20 text-accent-foreground text-amber-700' : 'bg-secondary text-muted-foreground'
                      }`}>
                        {item.condition}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center">
                        <User size={10} className="text-muted-foreground" />
                      </div>
                      <span className="text-xs text-muted-foreground">{item.seller}</span>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 font-bold text-sm bg-background/80 px-2 py-1 rounded backdrop-blur-sm">
                  {item.price}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
