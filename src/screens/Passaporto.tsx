import React, { useState, useEffect } from 'react';
import { Shield, Camera, Wifi, ChevronRight, RefreshCw, MapPin, Calendar, Tag, Layers, Droplet, Globe, DollarSign, CheckCircle } from 'lucide-react';

type PassportState = 'landing' | 'scanning_qr' | 'scanning_nfc' | 'scanned';

const MOCK_PASSPORT = {
  brand: 'Carhartt WIP',
  name: 'Duck Active Jacket',
  supplierCode: 'CW-DJ-BRN-M',
  sku: 'I032213-89XX',
  category: 'Giacca',
  color: 'Marrone',
  imageColor: '#8B5E3C',
  size: 'M',
  material: '100% Cotone Duck Canvas',
  madeIn: 'Bangladesh',
  retailPrice: 190,
  purchaseDate: '12 Mar 2025',
  storeOrigin: 'Boutique Milano Centro',
  history: [
    { date: '12 Mar 2025', event: 'Venduto', detail: 'Boutique Milano Centro' },
    { date: '15 Mar 2025', event: 'Registrato nel Guardaroba', detail: 'Marco B.' },
  ],
};

export function PassaportoScreen() {
  const [state, setState] = useState<PassportState>('landing');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (state !== 'scanning_qr' && state !== 'scanning_nfc') return;
    setProgress(0);
    const duration = state === 'scanning_nfc' ? 2200 : 3000;
    const interval = 80;
    let elapsed = 0;
    const t = setInterval(() => {
      elapsed += interval;
      setProgress(Math.min(elapsed / duration, 1));
      if (elapsed >= duration) {
        clearInterval(t);
        setState('scanned');
      }
    }, interval);
    return () => clearInterval(t);
  }, [state]);

  const headerSub = {
    landing: 'Autenticità e storia del prodotto',
    scanning_qr: 'Inquadra il QR code',
    scanning_nfc: 'Avvicina il telefono',
    scanned: 'Prodotto verificato',
  }[state];

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="pt-14 px-5 pb-3 border-b border-border bg-background shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
            <Shield size={20} className="text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="font-bold text-lg leading-tight">Passaporto Digitale</h1>
            <p className="text-xs text-muted-foreground">{headerSub}</p>
          </div>
          {state !== 'landing' && (
            <button onClick={() => setState('landing')} className="p-2 text-foreground">
              ←
            </button>
          )}
        </div>
      </div>

      {/* Landing */}
      {state === 'landing' && (
        <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-center gap-5">
          <div className="text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield size={40} className="text-primary" />
            </div>
            <h2 className="font-bold text-xl mb-2">Verifica un prodotto</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Scansiona il tag del capo per verificare l'autenticità, vedere la storia e il guardaroba digitale.
            </p>
          </div>

          <button
            onClick={() => setState('scanning_qr')}
            className="flex items-center gap-4 bg-primary text-primary-foreground rounded-[16px] p-4 active:scale-[0.98] transition-transform"
          >
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <Camera size={24} />
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold text-base">Scansiona QR Code</p>
              <p className="text-xs opacity-80 mt-0.5">Inquadra il QR code sull'etichetta o sulla scatola</p>
            </div>
            <ChevronRight size={18} className="opacity-60" />
          </button>

          <button
            onClick={() => setState('scanning_nfc')}
            className="flex items-center gap-4 bg-card border border-border rounded-[16px] p-4 active:scale-[0.98] transition-transform"
          >
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center shrink-0">
              <Wifi size={24} className="text-foreground" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold text-base">Tap NFC</p>
              <p className="text-xs text-muted-foreground mt-0.5">Avvicina il telefono al chip NFC sull'etichetta</p>
            </div>
            <ChevronRight size={18} className="text-muted-foreground" />
          </button>

          <div className="flex items-start gap-2.5 bg-secondary rounded-[12px] p-3">
            <Shield size={13} className="text-muted-foreground mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Scansiona QR/NFC per scoprire la storia, i materiali e la sostenibilità del prodotto.
            </p>
          </div>
        </div>
      )}

      {/* Scanning QR */}
      {state === 'scanning_qr' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8">
          {/* QR frame */}
          <div className="relative w-64 h-64 flex items-center justify-center overflow-hidden">
            {/* Corners */}
            {[
              'top-0 left-0 border-t-[3px] border-l-[3px]',
              'top-0 right-0 border-t-[3px] border-r-[3px]',
              'bottom-0 left-0 border-b-[3px] border-l-[3px]',
              'bottom-0 right-0 border-b-[3px] border-r-[3px]',
            ].map((cls, i) => (
              <div key={i} className={`absolute w-6 h-6 border-primary ${cls}`} />
            ))}
            <div className="text-center text-muted-foreground">
              <Camera size={40} className="mx-auto mb-2 opacity-30" />
              <p className="text-xs">Inquadra il QR code</p>
            </div>
            {/* Scan line */}
            <div
              className="absolute left-0 right-0 h-0.5 bg-primary opacity-80 transition-all"
              style={{ top: `${progress * 100}%` }}
            />
          </div>
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-75" style={{ width: `${progress * 100}%` }} />
          </div>
          <p className="text-sm text-muted-foreground">Scansione in corso…</p>
        </div>
      )}

      {/* Scanning NFC */}
      {state === 'scanning_nfc' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8">
          <div className="relative flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border-2 border-primary/20 flex items-center justify-center">
              <div className="w-36 h-36 rounded-full border-2 border-primary/40 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
                  <Wifi size={32} className="text-white" />
                </div>
              </div>
            </div>
          </div>
          <h2 className="font-bold text-xl">Pronto per la lettura</h2>
          <p className="text-sm text-muted-foreground text-center leading-relaxed">
            Avvicina la parte posteriore del telefono al chip NFC sul prodotto
          </p>
          {/* Spinner simulation */}
          <div className="flex gap-1.5">
            {[0,1,2,3].map(i => (
              <div
                key={i}
                className="w-2 h-2 bg-primary rounded-full"
                style={{ animation: `pulse 1s ease-in-out ${i * 0.25}s infinite` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Scanned result */}
      {state === 'scanned' && (
        <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-4">
          {/* Authentic banner */}
          <div className="flex items-center justify-center gap-2 bg-green-600 text-white rounded-[12px] py-3">
            <Shield size={18} />
            <span className="font-bold text-sm">Prodotto Autentico ✓</span>
          </div>

          {/* Hero */}
          <div className="h-40 rounded-[16px] p-4 flex flex-col justify-end relative overflow-hidden" style={{ backgroundColor: MOCK_PASSPORT.imageColor }}>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-white font-bold text-xl">{MOCK_PASSPORT.brand}</p>
                <p className="text-white/85 text-sm mt-0.5">{MOCK_PASSPORT.name}</p>
                <p className="text-white/60 text-xs mt-0.5">{MOCK_PASSPORT.sku}</p>
              </div>
              <div className="flex items-center gap-1 bg-white/90 px-2.5 py-1.5 rounded-full">
                <CheckCircle size={11} className="text-green-600" />
                <span className="text-green-700 text-[10px] font-bold">AUTENTICO</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="bg-card border border-border rounded-[14px] overflow-hidden">
            {[
              { label: 'Codice fornitore', value: MOCK_PASSPORT.supplierCode, Icon: Tag },
              { label: 'Categoria', value: MOCK_PASSPORT.category, Icon: Layers },
              { label: 'Colore', value: MOCK_PASSPORT.color, Icon: Droplet },
              { label: 'Materiale', value: MOCK_PASSPORT.material, Icon: RefreshCw },
              { label: 'Prodotto in', value: MOCK_PASSPORT.madeIn, Icon: Globe },
              { label: 'Prezzo originale', value: `€${MOCK_PASSPORT.retailPrice}`, Icon: DollarSign },
              { label: 'Data acquisto', value: MOCK_PASSPORT.purchaseDate, Icon: Calendar },
              { label: 'Negozio origine', value: MOCK_PASSPORT.storeOrigin, Icon: MapPin },
            ].map(({ label, value, Icon }, i, arr) => (
              <div key={label} className={`flex items-center gap-3 p-3.5 ${i < arr.length - 1 ? 'border-b border-border' : ''}`}>
                <Icon size={14} className="text-muted-foreground shrink-0" />
                <span className="flex-1 text-xs text-muted-foreground">{label}</span>
                <span className="text-xs font-semibold">{value}</span>
              </div>
            ))}
          </div>

          {/* History */}
          <div>
            <h3 className="font-bold text-base mb-3">Storia del prodotto</h3>
            <div className="bg-card border border-border rounded-[14px] p-4 space-y-4">
              {MOCK_PASSPORT.history.map((h, i) => (
                <div key={i} className="flex gap-3 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary mt-1 shrink-0" />
                    {i < MOCK_PASSPORT.history.length - 1 && (
                      <div className="w-0.5 flex-1 bg-border mt-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-2">
                    <p className="font-semibold text-sm">{h.event}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{h.date} · {h.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setState('landing')}
            className="w-full flex items-center justify-center gap-2 py-3 border border-border rounded-[14px] text-sm font-medium text-foreground active:scale-[0.98] transition-transform"
          >
            <RefreshCw size={15} /> Scansiona un altro prodotto
          </button>
        </div>
      )}
    </div>
  );
}
