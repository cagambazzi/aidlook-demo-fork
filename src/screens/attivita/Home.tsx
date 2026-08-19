import React from 'react';
import { LogOut, ShoppingCart, Package, Bell } from 'lucide-react';

interface Props {
  onLogout: () => void;
  onNavigate: (tab: string) => void;
}

export function HomeAttivita({ onLogout, onNavigate }: Props) {
  return (
    <div className="min-h-full pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-background">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground pt-14 pb-8 px-6 rounded-b-[32px] relative overflow-hidden">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-xs text-white/60 mb-1 font-medium">Boutique Milano</p>
            <h1 className="text-2xl font-bold tracking-[4px]">TESSIU</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-accent text-[#0a0a0a] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
              Attività
            </div>
            <button onClick={onLogout} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <LogOut size={18} className="text-white/80" />
            </button>
          </div>
        </div>

        <div className="w-10 h-0.5 bg-accent mb-8" />

        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <p className="text-xl font-bold text-accent">€257k</p>
            <p className="text-[10px] text-white/60 uppercase tracking-wider mt-1">Fatturato</p>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center flex-1">
            <p className="text-xl font-bold">32</p>
            <p className="text-[10px] text-white/60 uppercase tracking-wider mt-1">Clienti</p>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center flex-1">
            <p className="text-xl font-bold">18</p>
            <p className="text-[10px] text-white/60 uppercase tracking-wider mt-1">Vendite</p>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-6 pt-8 pb-12 space-y-8">
        
        {/* Quick Actions */}
        <div>
          <h2 className="text-sm font-bold mb-4">Azioni rapide</h2>
          <div className="grid grid-cols-3 gap-3">
            <button 
              onClick={() => onNavigate('vendita')}
              className="bg-card border border-border p-4 rounded-[16px] flex flex-col items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform"
            >
              <ShoppingCart size={24} className="text-primary" />
              <span className="text-[10px] font-medium">Vendita</span>
            </button>
            <button 
              onClick={() => onNavigate('magazzino')}
              className="bg-card border border-border p-4 rounded-[16px] flex flex-col items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform"
            >
              <Package size={24} className="text-primary" />
              <span className="text-[10px] font-medium">Catalogo</span>
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
          </div>
        </div>

        {/* Brand Banner */}
        <div className="bg-primary rounded-[16px] p-5 flex items-center gap-4 mt-8 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 z-10">
            <span className="text-white font-bold tracking-widest text-xs">AL</span>
          </div>
          <div className="z-10">
            <h3 className="text-sm font-bold tracking-[2px] text-white mb-1">TESSIU</h3>
            <p className="text-[10px] text-white/60 leading-snug">
              Il CRM per boutique e negozi di moda
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
