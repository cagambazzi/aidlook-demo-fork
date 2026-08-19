import React, { useState } from 'react';
import { Tag, ArrowRight } from 'lucide-react';

interface StoreNotif {
  id: string;
  type: 'sold_out_alert' | 'secondhand_trend' | 'network_lead';
  emoji: string;
  title: string;
  body: string;
  supplierCode: string;
  actionLabel: string;
  read: boolean;
  time: string;
}

const INITIAL_NOTIFS: StoreNotif[] = [
  {
    id: 'sn1',
    type: 'sold_out_alert',
    emoji: '🔴',
    title: 'Esaurito in rete',
    body: 'Max Mara Teddy Coat (MM-TED-CAM-S) sta per esaurirsi nella rete Tessiu. Hai 2 pezzi in magazzino — pubblicali sul B2B.',
    supplierCode: 'MM-TED-CAM-S',
    actionLabel: 'Pubblica sul B2B',
    read: false,
    time: '1h fa',
  },
  {
    id: 'sn2',
    type: 'secondhand_trend',
    emoji: '📈',
    title: 'Trend second-hand',
    body: 'La Carhartt WIP Duck Jacket non si vende da 38 giorni nel tuo stock. 14 vendite second-hand questo mese nella rete — considera uno sconto del 15-20%.',
    supplierCode: 'CW-DJ-BRN-M',
    actionLabel: 'Applica sconto strategico',
    read: false,
    time: '3h fa',
  },
  {
    id: 'sn3',
    type: 'network_lead',
    emoji: '💼',
    title: 'Opportunità B2B',
    body: '3 negozi della rete stanno cercando Stone Island Ghost Jacket taglia L. Pubblicando raggiungi immediatamente tutti e tre.',
    supplierCode: 'SI-GP-BLK-L',
    actionLabel: 'Pubblica nella rete',
    read: false,
    time: '5h fa',
  },
  {
    id: 'sn4',
    type: 'sold_out_alert',
    emoji: '🔴',
    title: 'Esaurito in rete',
    body: 'Moncler Maya Short Down taglia M è esaurito nella rete. I tuoi 4 pezzi valgono il 20% in più in questo momento.',
    supplierCode: 'MC-MY-BLK-M',
    actionLabel: 'Pubblica sul B2B',
    read: true,
    time: '1g fa',
  },
];

function getDialogText(notif: StoreNotif): string {
  if (notif.type === 'sold_out_alert') {
    return `Stai per pubblicare ${notif.supplierCode} nel mercato B2B di Tessiu. I negozi della rete potranno fare un'offerta immediata.`;
  }
  if (notif.type === 'secondhand_trend') {
    return `Questo prodotto ha generato 14 vendite second-hand questo mese. Uno sconto del 15-20% ti permette di smaltire lo stock prima che si svaluti ulteriormente.`;
  }
  return `Pubblicando questo articolo raggiungerai i 3 negozi che lo stanno cercando attivamente in questo momento.`;
}

export function NotificheAttivita() {
  const [notifs, setNotifs] = useState<StoreNotif[]>(INITIAL_NOTIFS);
  const [confirmDialog, setConfirmDialog] = useState<StoreNotif | null>(null);
  const [toast, setToast] = useState('');

  const unread = notifs.filter(n => !n.read).length;

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 3000); }

  function handleAction(notif: StoreNotif) {
    setNotifs(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
    setConfirmDialog(notif);
  }

  function confirmAction() {
    showToast('✓ Azione registrata nella rete Tessiu');
    setConfirmDialog(null);
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
            className={`relative rounded-[14px] p-3.5 border transition-all ${
              n.read ? 'bg-secondary/40 border-transparent' : 'bg-primary/5 border-primary/30'
            }`}
          >
            {!n.read && (
              <span className="absolute top-3.5 right-3.5 w-2 h-2 rounded-full bg-primary" />
            )}
            <div className="flex gap-3">
              <div className={`w-11 h-11 rounded-full flex items-center justify-center text-lg shrink-0 ${
                n.type === 'sold_out_alert' ? 'bg-red-100' : n.type === 'secondhand_trend' ? 'bg-green-100' : 'bg-blue-100'
              }`}>
                {n.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="font-bold text-sm leading-tight">{n.title}</p>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap shrink-0">{n.time}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{n.body}</p>

                {/* Supplier code tag */}
                <div className="mt-2 inline-flex items-center gap-1.5 bg-secondary text-muted-foreground text-[10px] font-medium px-2.5 py-1 rounded-md">
                  <Tag size={10} />
                  {n.supplierCode}
                </div>

                {/* Action button */}
                {!n.read && (
                  <button
                    onClick={() => handleAction(n)}
                    className="mt-3 flex items-center justify-center gap-1.5 w-full py-2.5 bg-primary text-primary-foreground text-xs font-bold rounded-[10px] active:scale-95 transition-transform"
                  >
                    {n.actionLabel} <ArrowRight size={13} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Confirm dialog */}
      {confirmDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6 animate-in fade-in duration-200">
          <div className="bg-background rounded-[20px] p-6 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
            <p className="font-bold text-base mb-2">{confirmDialog.actionLabel}</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">{getDialogText(confirmDialog)}</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDialog(null)}
                className="flex-1 py-2.5 bg-secondary text-foreground text-sm font-medium rounded-[12px]"
              >
                Annulla
              </button>
              <button
                onClick={confirmAction}
                className="flex-1 py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-[12px] active:scale-95 transition-transform"
              >
                Conferma
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg animate-in fade-in z-50 whitespace-nowrap">
          {toast}
        </div>
      )}
    </div>
  );
}
