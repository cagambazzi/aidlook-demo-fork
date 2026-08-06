import React from 'react';
import { Home, Shirt, Search, Bell, Shield, Users, Package, ShoppingCart } from 'lucide-react';

export type Role = 'welcome' | 'aidlooker' | 'attivita';

interface TabBarProps {
  role: Role;
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export function TabBar({ role, currentTab, onTabChange }: TabBarProps) {
  if (role === 'welcome') return null;

  const aidlookerTabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'armadio', label: 'Armadio', icon: Shirt },
    { id: 'marketplace', label: 'Cerca', icon: Search },
    { id: 'notifiche', label: 'Notifiche', icon: Bell, badge: 2 },
    { id: 'passaporto', label: 'Passaporto', icon: Shield },
  ];

  const attivitaTabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'vendita', label: 'Vendite', icon: ShoppingCart },
    { id: 'magazzino', label: 'Magazzino', icon: Package },
    { id: 'notifiche', label: 'Notifiche', icon: Bell, badge: 3 },
    { id: 'crm', label: 'CRM', icon: Users },
  ];

  const tabs = role === 'aidlooker' ? aidlookerTabs : attivitaTabs;

  return (
    <div className="h-[60px] sm:h-[80px] sm:pb-5 w-full bg-white border-t border-border flex items-center justify-around px-2 shrink-0 z-50 relative">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 relative transition-colors ${
              isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary/70'
            }`}
          >
            <div className="relative">
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              {tab.badge && (
                <span className="absolute -top-1 -right-2 bg-destructive text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center justify-center min-w-[16px] h-[16px]">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium leading-none">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
