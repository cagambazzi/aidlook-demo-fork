import React from 'react';
import { LogOut, Shirt, Bell, Search } from 'lucide-react';

interface Props {
  onLogout: () => void;
  onNavigate: (tab: string) => void;
}

export function HomeUtente({ onLogout, onNavigate }: Props) {
  const recentItems = [
    { id: 1, brand: 'Max Mara', category: 'Cappotto', color: '#D4B895' }, // Cammello
    { id: 2, brand: 'A.P.C.', category: 'Pantaloni', color: '#1a1a1a' }, // Nero
    { id: 3, brand: 'Valentino', category: 'Blusa', color: '#F3F4F6' }, // Bianco
    { id: 4, brand: 'Totème', category: 'Pantaloni', color: '#D1C8BA' }, // Beige
  ];

  return (
    <div className="min-h-full pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-background">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground pt-14 pb-8 px-6 rounded-b-[32px] relative overflow-hidden">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-xs text-white/60 mb-1 font-medium">Il tuo guardaroba</p>
            <h1 className="text-2xl font-bold tracking-[4px]">TESSIU</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-accent/20 border border-accent/40 text-accent text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
              Utente
            </div>
            <button onClick={onLogout} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <LogOut size={18} className="text-white/80" />
            </button>
          </div>
        </div>

        <div className="w-10 h-0.5 bg-accent mb-8" />

        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <p className="text-2xl font-bold">5</p>
            <p className="text-[10px] text-white/60 uppercase tracking-wider mt-1">Capi</p>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center flex-1">
            <p className="text-2xl font-bold">5</p>
            <p className="text-[10px] text-white/60 uppercase tracking-wider mt-1">Brand</p>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center flex-1">
            <p className="text-2xl font-bold">4</p>
            <p className="text-[10px] text-white/60 uppercase tracking-wider mt-1">Categorie</p>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-6 pt-8 pb-12 space-y-8">
        
        {/* Quick Actions */}
        <div>
          <h2 className="text-sm font-bold mb-4">Accesso rapido</h2>
          <div className="grid grid-cols-3 gap-3">
            <button 
              onClick={() => onNavigate('armadio')}
              className="bg-card border border-border p-4 rounded-[16px] flex flex-col items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform"
            >
              <Shirt size={24} className="text-primary" />
              <span className="text-[10px] font-medium">Armadio</span>
            </button>
            <button 
              onClick={() => onNavigate('notifiche')}
              className="bg-card border border-border p-4 rounded-[16px] flex flex-col items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform relative"
            >
              <div className="relative">
                <Bell size={24} className="text-primary" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full border-2 border-card"></div>
              </div>
              <span className="text-[10px] font-medium">Notifiche</span>
            </button>
            <button 
              onClick={() => onNavigate('marketplace')}
              className="bg-card border border-border p-4 rounded-[16px] flex flex-col items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform"
            >
              <Search size={24} className="text-primary" />
              <span className="text-[10px] font-medium">Marketplace</span>
            </button>
          </div>
        </div>

        {/* Ultimi aggiunti */}
        <div>
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-sm font-bold">Ultimi aggiunti</h2>
            <button onClick={() => onNavigate('armadio')} className="text-[10px] font-medium text-muted-foreground hover:text-primary">
              Vedi tutti
            </button>
          </div>
          
          <div className="flex overflow-x-auto hide-scrollbar gap-3 -mx-6 px-6 pb-4">
            {recentItems.map(item => (
              <div key={item.id} className="w-[120px] shrink-0 bg-card border border-border rounded-[16px] p-3 shadow-sm">
                <div 
                  className="w-full aspect-square rounded-[8px] mb-3 border border-black/5"
                  style={{ backgroundColor: item.color }}
                />
                <p className="text-xs font-bold truncate">{item.brand}</p>
                <p className="text-[10px] text-muted-foreground truncate">{item.category}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Banner */}
        <div className="bg-secondary rounded-[16px] p-5 flex items-center gap-4 mt-4">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shrink-0">
            <span className="text-white font-bold tracking-widest text-xs">AL</span>
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-[2px] mb-1">TESSIU</h3>
            <p className="text-[10px] text-muted-foreground leading-snug">
              Il guardaroba digitale più smart d'Italia
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
