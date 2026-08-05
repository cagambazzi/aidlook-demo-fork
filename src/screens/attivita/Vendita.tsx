import React, { useState } from 'react';

export function VenditaAttivita() {
  const [showToast, setShowToast] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState('');

  const customers = ['Giulia Rossi', 'Sofia Ferrari', 'Francesca M.', 'Elena Marchetti', 'Nuovo Cliente +'];
  
  const recentSales = [
    { id: 1, brand: 'Celine', customer: 'Francesca M.', price: '€3400' },
    { id: 2, brand: 'Gucci', customer: 'Sofia Ferrari', price: '€2100' },
    { id: 3, brand: 'Max Mara', customer: 'Giulia Rossi', price: '€1290' },
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-full pb-20 animate-in fade-in slide-in-from-bottom-4 duration-300 relative">
      <div className="pt-14 px-6 pb-4 bg-background sticky top-0 z-10 border-b border-border/50">
        <h1 className="text-[28px] font-bold">Nuova Vendita</h1>
      </div>

      <form onSubmit={handleRegister} className="px-6 pt-6 space-y-6">
        
        <div>
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 block">
            Seleziona cliente
          </label>
          <div className="flex overflow-x-auto hide-scrollbar gap-2 -mx-6 px-6 pb-2">
            {customers.map(c => (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedCustomer(c)}
                className={`whitespace-nowrap px-4 py-2 rounded-[20px] text-xs font-bold transition-colors border ${
                  selectedCustomer === c 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'bg-card text-foreground border-border hover:bg-secondary'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 bg-card p-5 rounded-[16px] border border-border shadow-sm">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-muted-foreground uppercase">Brand *</label>
            <input required type="text" className="w-full bg-background border border-border p-3 rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-accent" placeholder="Es. Prada" />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-muted-foreground uppercase">Articolo *</label>
            <input required type="text" className="w-full bg-background border border-border p-3 rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-accent" placeholder="Es. Re-Nylon Trench" />
          </div>

          <div className="flex gap-4">
            <div className="flex-1 space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">Taglia</label>
              <input type="text" className="w-full bg-background border border-border p-3 rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-accent" placeholder="Es. S" />
            </div>
            <div className="flex-1 space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">Prezzo (€) *</label>
              <input required type="number" className="w-full bg-background border border-border p-3 rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-accent font-bold text-accent" placeholder="0.00" />
            </div>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-[16px] active:scale-[0.98] transition-transform shadow-md"
        >
          Registra Vendita
        </button>
      </form>

      <div className="px-6 mt-10">
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Ultime vendite</h2>
        <div className="space-y-3">
          {recentSales.map(sale => (
            <div key={sale.id} className="bg-card border border-border p-3 rounded-[12px] flex justify-between items-center shadow-sm">
              <div>
                <p className="font-bold text-sm">{sale.brand}</p>
                <p className="text-[10px] text-muted-foreground">{sale.customer}</p>
              </div>
              <p className="font-bold text-accent">{sale.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-success text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg animate-in fade-in slide-in-from-bottom-4 z-50 whitespace-nowrap">
          Vendita registrata con successo
        </div>
      )}
    </div>
  );
}
