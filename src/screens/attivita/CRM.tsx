import React, { useState } from 'react';
import { Plus, Search, User, X } from 'lucide-react';

export function CRMAttivita() {
  const [tab, setTab] = useState<'clienti' | 'vendite'>('clienti');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const clienti = [
    { id: 1, name: 'Giulia Rossi', email: 'giulia.rossi@email.it', size: 'S', spent: '€16.6k', vip: true },
    { id: 2, name: 'Sofia Ferrari', email: 'sofia.ferrari@email.it', size: 'XS', spent: '€23k', vip: true },
    { id: 3, name: 'Francesca Moretti', email: 'francesca.m@email.it', size: 'S', spent: '€13.9k', vip: true },
    { id: 4, name: 'Elena Marchetti', email: 'elena.marchetti@email.it', size: 'M', spent: '€15.7k', vip: true },
    { id: 5, name: 'Valentina Costa', email: 'valentina.c@email.it', size: 'S', spent: '€11.6k', vip: true },
    { id: 6, name: 'Marco Bianchi', email: 'marco.bianchi@email.it', size: 'L', spent: '€8.99k', vip: true },
    { id: 7, name: 'Alessandro Conti', email: 'ale.conti@email.it', size: 'M', spent: '€13.2k', vip: true },
    { id: 8, name: 'Lorenzo Ricci', email: 'lorenzo.ricci@email.it', size: 'L', spent: '€10.9k', vip: true },
    { id: 9, name: 'Luca Colombo', email: 'luca.colombo@email.it', size: 'L', spent: '€2.2k', vip: false },
    { id: 10, name: 'Anna Martini', email: 'anna.martini@email.it', size: 'M', spent: '€2.1k', vip: false },
  ];

  const vendite = [
    { id: 1, brand: 'Gucci', item: 'GG Monogram Blazer', customer: 'Sofia Ferrari', size: '38', date: '2025-05-30', price: '€2100' },
    { id: 2, brand: 'Max Mara', item: 'Teddy Coat', customer: 'Giulia Rossi', size: 'S', date: '2025-05-28', price: '€1290' },
    { id: 3, brand: 'Moncler', item: 'Maya Short Down', customer: 'Marco Bianchi', size: 'M', date: '2025-05-22', price: '€1350' },
    { id: 4, brand: 'Stone Island', item: 'Light Jacket', customer: 'Elena Marchetti', size: 'L', date: '2025-05-20', price: '€560' },
    { id: 5, brand: 'Totème', item: 'Scarf Collar Coat', customer: 'Valentina Costa', size: 'S', date: '2025-05-18', price: '€890' },
  ];

  const filteredClienti = clienti.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));
  const filteredVendite = vendite.filter(v => v.customer.toLowerCase().includes(search.toLowerCase()) || v.brand.toLowerCase().includes(search.toLowerCase()));

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-full pb-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="pt-14 px-6 pb-4 bg-background sticky top-0 z-10 border-b border-border/50">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-[28px] font-bold">CRM</h1>
            <p className="text-xs text-muted-foreground mt-1">La tua attività</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center active:scale-95 transition-transform shadow-md"
          >
            <Plus size={20} />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-6">
          <div className="bg-card p-3 rounded-[12px] border border-border shadow-sm text-center">
            <p className="text-sm font-bold text-accent">€257k</p>
            <p className="text-[9px] text-muted-foreground uppercase mt-1">Fatturato</p>
          </div>
          <div className="bg-card p-3 rounded-[12px] border border-border shadow-sm text-center">
            <p className="text-sm font-bold">32</p>
            <p className="text-[9px] text-muted-foreground uppercase mt-1">Clienti</p>
          </div>
          <div className="bg-card p-3 rounded-[12px] border border-border shadow-sm text-center">
            <p className="text-sm font-bold">18</p>
            <p className="text-[9px] text-muted-foreground uppercase mt-1">Vendite</p>
          </div>
          <div className="bg-card p-3 rounded-[12px] border border-border shadow-sm text-center">
            <p className="text-sm font-bold">€14k</p>
            <p className="text-[9px] text-muted-foreground uppercase mt-1">Scontrino</p>
          </div>
        </div>

        <div className="flex bg-secondary p-1 rounded-[12px] mb-4">
          <button 
            onClick={() => setTab('clienti')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-[10px] transition-colors ${tab === 'clienti' ? 'bg-card shadow-sm text-primary' : 'text-muted-foreground'}`}
          >
            Clienti
          </button>
          <button 
            onClick={() => setTab('vendite')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-[10px] transition-colors ${tab === 'vendite' ? 'bg-card shadow-sm text-primary' : 'text-muted-foreground'}`}
          >
            Vendite
          </button>
        </div>

        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card border border-border py-2.5 pl-9 pr-4 rounded-[12px] text-xs focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder={tab === 'clienti' ? "Cerca cliente..." : "Cerca vendita..."}
          />
        </div>
      </div>

      <div className="px-6 mt-4 space-y-3 pb-20">
        {tab === 'clienti' && filteredClienti.map(c => (
          <div key={c.id} className="bg-card border border-border p-3 rounded-[16px] flex items-center gap-3 shadow-sm cursor-pointer hover:border-accent/50 transition-colors">
            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm shrink-0">
              {getInitials(c.name)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="font-bold text-sm truncate">{c.name}</h3>
                {c.vip && (
                  <span className="bg-amber-100 text-amber-700 text-[9px] font-bold px-1.5 py-0.5 rounded-[4px]">
                    VIP
                  </span>
                )}
              </div>
              <p className="text-[10px] text-muted-foreground truncate">{c.email}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-bold text-accent text-sm">{c.spent}</p>
              <p className="text-[10px] text-muted-foreground">Taglia {c.size}</p>
            </div>
          </div>
        ))}

        {tab === 'vendite' && filteredVendite.map(v => (
          <div key={v.id} className="bg-card border border-border p-4 rounded-[16px] shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-[10px] text-muted-foreground mb-1">{v.date}</p>
                <h3 className="font-bold text-sm leading-tight">{v.brand}</h3>
                <p className="text-xs text-muted-foreground">{v.item}</p>
              </div>
              <p className="font-bold text-sm">{v.price}</p>
            </div>
            <div className="pt-3 mt-3 border-t border-border flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center">
                  <User size={10} className="text-muted-foreground" />
                </div>
                <span className="text-xs font-medium">{v.customer}</span>
              </div>
              <span className="text-[10px] text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                Taglia {v.size}
              </span>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 animate-in fade-in duration-200">
          <div className="w-full sm:w-[390px] bg-background sm:rounded-[24px] rounded-t-[24px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-full duration-300">
            <div className="p-4 flex justify-between items-center border-b border-border bg-card">
              <h2 className="font-bold text-lg">Nuovo Cliente</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 bg-secondary rounded-full">
                <X size={18} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground">Nome e Cognome *</label>
                <input type="text" className="w-full bg-card border border-border p-3 rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-accent" placeholder="Es. Mario Rossi" />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground">Email *</label>
                <input type="email" className="w-full bg-card border border-border p-3 rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-accent" placeholder="mario.rossi@email.com" />
              </div>

              <div className="flex gap-4">
                <div className="flex-1 space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground">Telefono</label>
                  <input type="tel" className="w-full bg-card border border-border p-3 rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-accent" placeholder="+39" />
                </div>
                <div className="w-1/3 space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground">Taglia</label>
                  <input type="text" className="w-full bg-card border border-border p-3 rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-accent" placeholder="Es. L" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground">Note private</label>
                <textarea className="w-full bg-card border border-border p-3 rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-accent h-20 resize-none" placeholder="Preferenze, stili, brand preferiti..."></textarea>
              </div>
            </div>

            <div className="p-4 bg-card border-t border-border">
              <button 
                onClick={() => setShowAddModal(false)} 
                className="w-full py-3.5 bg-primary text-primary-foreground font-bold rounded-[12px] active:scale-[0.98] transition-transform"
              >
                Salva Cliente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
