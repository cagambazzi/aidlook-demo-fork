import React, { useState } from 'react';

export function NotificheAttivita() {
  const [notifs, setNotifs] = useState([
    {
      id: 1,
      icon: '🔴',
      title: 'Sold-out in rete',
      desc: 'Max Mara Teddy Coat (MM-TED-CAM-S) sta per esaurirsi. Hai 2 pezzi in magazzino.',
      buttonText: 'Pubblica sul B2B',
      read: false
    },
    {
      id: 2,
      icon: '📈',
      title: 'Trend second-hand',
      desc: 'La tua Carhartt WIP Duck Jacket non si vende da 38 giorni. 14 vendite SH questo mese.',
      buttonText: 'Vedi andamento',
      read: false
    },
    {
      id: 3,
      icon: '💼',
      title: 'Opportunità B2B',
      desc: '3 negozi cercano Stone Island Light Jacket taglia L. Hai unità disponibili?',
      buttonText: 'Pubblica',
      read: false
    },
    {
      id: 4,
      icon: '🔴',
      title: 'Sold-out in rete',
      desc: 'Moncler Maya Short Down taglia M esaurita. I tuoi 2 pezzi valgono il 20% in più.',
      read: true
    }
  ]);

  const markRead = (id: number) => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div className="min-h-full pb-20 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="pt-14 px-6 pb-6 bg-background sticky top-0 z-10">
        <h1 className="text-[28px] font-bold">Notifiche</h1>
      </div>

      <div className="px-6 space-y-4">
        {notifs.map(n => (
          <div key={n.id} className={`bg-card border p-4 rounded-[16px] shadow-sm transition-all ${n.read ? 'border-transparent bg-secondary/50 opacity-80' : 'border-border'}`}>
            <div className="flex gap-3">
              <div className="text-xl shrink-0 mt-0.5">{n.icon}</div>
              <div className="flex-1">
                <h3 className={`font-bold text-sm mb-1 ${n.read ? 'text-foreground' : 'text-primary'}`}>{n.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{n.desc}</p>
                
                {!n.read && n.buttonText && (
                  <button 
                    onClick={() => markRead(n.id)}
                    className="mt-4 px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-[8px] active:scale-95 transition-transform"
                  >
                    {n.buttonText}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
