import React, { useState } from 'react';

type NotifState = 'pending' | 'accepted' | 'declined' | 'read';

interface Notif {
  id: number;
  type: 'buy' | 'offer' | 'confirmed';
  emoji: string;
  title: string;
  desc: string;
  state: NotifState;
}

export function NotificheAidlooker() {
  const [notifs, setNotifs] = useState<Notif[]>([
    {
      id: 1,
      type: 'buy',
      emoji: '💰',
      title: 'Qualcuno vuole comprare il tuo capo',
      desc: 'Marco B. vuole comprare il tuo Gucci GG Blazer. Ti offre €280.',
      state: 'pending'
    },
    {
      id: 2,
      type: 'offer',
      emoji: '💰',
      title: 'Offerta ricevuta',
      desc: 'Alessia C. offre €95 per la tua Carhartt WIP Duck Jacket. Sei interessato/a a venderla?',
      state: 'pending'
    },
    {
      id: 3,
      type: 'confirmed',
      emoji: '✅',
      title: 'Vendita confermata',
      desc: 'La tua Max Mara Teddy Coat è stata venduta a Sofia F. per €420. I fondi arriveranno entro 48h.',
      state: 'read'
    }
  ]);

  const handleAction = (id: number, action: 'accepted' | 'declined') => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, state: action } : n));
  };

  return (
    <div className="min-h-full pb-20 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="pt-14 px-6 pb-6 bg-background sticky top-0 z-10">
        <h1 className="text-[28px] font-bold">Notifiche</h1>
      </div>

      <div className="px-6 space-y-4">
        {notifs.map(n => (
          <div key={n.id} className={`bg-card border p-4 rounded-[16px] shadow-sm transition-all ${n.state === 'read' ? 'border-transparent bg-secondary/50 opacity-80' : 'border-border'}`}>
            <div className="flex gap-3">
              <div className="text-xl shrink-0 mt-0.5">{n.emoji}</div>
              <div className="flex-1">
                <h3 className={`font-bold text-sm mb-1 ${n.state === 'read' ? 'text-foreground' : 'text-primary'}`}>{n.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{n.desc}</p>
                
                {n.state === 'pending' && (
                  <div className="flex gap-2 mt-4">
                    <button 
                      onClick={() => handleAction(n.id, 'accepted')}
                      className="flex-1 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-[8px] active:scale-95 transition-transform"
                    >
                      Accetta
                    </button>
                    <button 
                      onClick={() => handleAction(n.id, 'declined')}
                      className="flex-1 py-2 bg-secondary text-secondary-foreground text-xs font-bold rounded-[8px] active:scale-95 transition-transform"
                    >
                      Rifiuta
                    </button>
                  </div>
                )}
                
                {n.state === 'accepted' && (
                  <div className="mt-3 text-xs font-bold text-success bg-green-50 px-3 py-1.5 rounded-[8px] inline-block">
                    Offerta accettata
                  </div>
                )}
                
                {n.state === 'declined' && (
                  <div className="mt-3 text-xs font-bold text-destructive bg-red-50 px-3 py-1.5 rounded-[8px] inline-block">
                    Offerta rifiutata
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
