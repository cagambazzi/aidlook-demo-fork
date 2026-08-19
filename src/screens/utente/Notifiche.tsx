import React, { useState } from 'react';
import { CheckCircle, XCircle, Store } from 'lucide-react';

interface MemberNotif {
  id: string;
  type: 'purchase_request' | 'sale_confirmed' | 'package' | 'store_inquiry';
  emoji: string;
  title: string;
  body: string;
  offeredPrice?: number;
  requesterName?: string;
  storeName?: string;
  itemBrand?: string;
  itemName?: string;
  read: boolean;
  responded?: boolean;
  response?: 'accepted' | 'declined';
  time: string;
}

const INITIAL_NOTIFS: MemberNotif[] = [
  {
    id: 'n0',
    type: 'store_inquiry',
    emoji: '🏪',
    title: 'Il tuo negozio ti ha fatto una domanda',
    body: 'Boutique Torino vorrebbe sapere se sei disposta a vendere il tuo Loro Piana Cashmere Turtleneck.',
    storeName: 'Boutique Torino',
    itemBrand: 'Loro Piana',
    itemName: 'Cashmere Turtleneck',
    read: false,
    responded: false,
    time: '30min fa',
  },
  {
    id: 'n1',
    type: 'purchase_request',
    emoji: '💰',
    title: 'Qualcuno è interessato al tuo capo',
    body: 'Marco B. vuole comprare il tuo Gucci GG Blazer. Ti offre €280.',
    offeredPrice: 280,
    requesterName: 'Marco B.',
    read: false,
    responded: false,
    time: '2h fa',
  },
  {
    id: 'n2',
    type: 'purchase_request',
    emoji: '💰',
    title: 'Offerta per la tua giacca',
    body: 'Alessia C. offre €95 per la tua Carhartt WIP Duck Jacket.',
    offeredPrice: 95,
    requesterName: 'Alessia C.',
    read: false,
    responded: false,
    time: '5h fa',
  },
  {
    id: 'n3',
    type: 'sale_confirmed',
    emoji: '✅',
    title: 'Vendita confermata',
    body: 'La tua Max Mara Teddy Coat è stata venduta a Sofia F. per €420. I fondi arriveranno entro 48h.',
    read: true,
    time: '1g fa',
  },
  {
    id: 'n4',
    type: 'package',
    emoji: '📦',
    title: 'Pacchetto in arrivo',
    body: 'Il tuo ordine Ami Paris ADC Heart Hoodie (taglia M) è in consegna. Arrivo stimato domani.',
    read: true,
    time: '2g fa',
  },
];

export function NotificheUtente() {
  const [notifs, setNotifs] = useState<MemberNotif[]>(INITIAL_NOTIFS);
  const [toast, setToast] = useState('');

  const unread = notifs.filter(n => !n.read).length;

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 3000); }

  function handleRead(id: string) {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }

  function handleRespond(id: string, response: 'accepted' | 'declined', customToast?: string) {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, responded: true, response, read: true } : n));
    if (response === 'accepted') {
      if (customToast) {
        showToast(customToast);
      } else {
        const notif = notifs.find(n => n.id === id);
        if (notif?.offeredPrice) {
          showToast(`✓ Accettato — riceverai €${notif.offeredPrice} entro 48h`);
        }
      }
    }
  }

  return (
    <div className="min-h-full pb-20 animate-in fade-in slide-in-from-bottom-4 duration-300 relative">
      {/* Header */}
      <div className="pt-14 px-5 pb-4 bg-background sticky top-0 z-10 border-b border-border flex items-end justify-between">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight">Notifiche</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {unread > 0 ? `${unread} non lette` : 'Tutto aggiornato'}
          </p>
        </div>
        {unread > 0 && (
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">{unread}</span>
          </div>
        )}
      </div>

      <div className="px-4 pt-4 space-y-3">
        {notifs.map(n => (
          <div
            key={n.id}
            onClick={() => !n.read && handleRead(n.id)}
            className={`relative rounded-[14px] p-3.5 border transition-all cursor-pointer ${
              n.read ? 'bg-secondary/40 border-transparent' : 'bg-primary/5 border-primary/30'
            }`}
          >
            {!n.read && (
              <span className="absolute top-3.5 right-3.5 w-2 h-2 rounded-full bg-primary" />
            )}
            <div className="flex gap-3">
              <div className={`w-11 h-11 rounded-full flex items-center justify-center text-lg shrink-0 ${
                n.type === 'purchase_request' ? 'bg-amber-100' : 'bg-green-100'
              }`}>
                {n.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className={`font-bold text-sm leading-tight ${n.read ? 'text-foreground' : 'text-foreground'}`}>{n.title}</p>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap shrink-0">{n.time}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{n.body}</p>

                {/* Offered price badge */}
                {n.offeredPrice && (
                  <div className="mt-2 inline-flex bg-amber-100 text-amber-700 text-sm font-bold px-2.5 py-1 rounded-lg">
                    €{n.offeredPrice}
                  </div>
                )}

                {/* Store inquiry: item tag */}
                {n.type === 'store_inquiry' && n.itemBrand && (
                  <div className="mt-2 flex items-center gap-1.5 bg-secondary px-2.5 py-1.5 rounded-lg w-fit">
                    <Store size={11} className="text-muted-foreground" />
                    <span className="text-[11px] font-semibold text-foreground">{n.itemBrand} — {n.itemName}</span>
                  </div>
                )}

                {/* Store inquiry: accept/decline */}
                {n.type === 'store_inquiry' && !n.responded && (
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={e => { e.stopPropagation(); handleRespond(n.id, 'accepted', '✓ Perfetto! Il negozio ti contatterà per i dettagli'); }}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-[8px] active:scale-95 transition-transform"
                    >
                      <CheckCircle size={13} /> Sì, parliamone
                    </button>
                    <button
                      onClick={e => { e.stopPropagation(); handleRespond(n.id, 'declined'); }}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-secondary text-foreground text-xs font-bold rounded-[8px] active:scale-95 transition-transform"
                    >
                      <XCircle size={13} /> No, lo tengo
                    </button>
                  </div>
                )}

                {/* Accept/Decline buttons — purchase_request */}
                {n.type === 'purchase_request' && !n.responded && (
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={e => { e.stopPropagation(); handleRespond(n.id, 'accepted'); }}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-green-600 text-white text-xs font-bold rounded-[8px] active:scale-95 transition-transform"
                    >
                      <CheckCircle size={13} /> Accetta €{n.offeredPrice}
                    </button>
                    <button
                      onClick={e => { e.stopPropagation(); handleRespond(n.id, 'declined'); }}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-secondary text-foreground text-xs font-bold rounded-[8px] active:scale-95 transition-transform"
                    >
                      <XCircle size={13} /> Declina
                    </button>
                  </div>
                )}

                {/* Responded state */}
                {(n.type === 'purchase_request' || n.type === 'store_inquiry') && n.responded && (
                  <div className={`mt-2 inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg ${
                    n.response === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-secondary text-muted-foreground'
                  }`}>
                    {n.response === 'accepted'
                      ? <><CheckCircle size={12} /> {n.type === 'store_inquiry' ? 'Disponibile a parlarne' : 'Hai accettato'}</>
                      : <><XCircle size={12} /> {n.type === 'store_inquiry' ? 'Hai preferito tenerlo' : 'Hai declinato'}</>
                    }
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg animate-in fade-in z-50 whitespace-nowrap">
          {toast}
        </div>
      )}
    </div>
  );
}
