import React from 'react';
import { PhoneFrame } from './components/PhoneFrame';
import { TabBar, Role } from './components/TabBar';
import { WelcomeScreen } from './screens/WelcomeScreen';

// Utente
import { HomeUtente } from './screens/utente/Home';
import { ArmadioUtente } from './screens/utente/Armadio';
import { MarketplaceUtente } from './screens/utente/Marketplace';
import { NotificheUtente } from './screens/utente/Notifiche';
import { PassaportoScreen } from './screens/Passaporto';

// Attività
import { HomeAttivita } from './screens/attivita/Home';
import { CRMAttivita } from './screens/attivita/CRM';
import { MagazzinoAttivita } from './screens/attivita/Magazzino';
import { NotificheAttivita } from './screens/attivita/Notifiche';
import { VenditaAttivita } from './screens/attivita/Vendita';

export default function App() {
  const [role, setRole] = React.useState<Role>('welcome');
  const [currentTab, setCurrentTab] = React.useState<string>('home');

  const handleSetRole = (newRole: Role) => {
    setRole(newRole);
    setCurrentTab('home');
  };

  const handleLogout = () => {
    setRole('welcome');
    setCurrentTab('home');
  };

  const renderScreen = () => {
    if (role === 'welcome') return <WelcomeScreen onSelectRole={handleSetRole} />;

    if (role === 'utente') {
      switch (currentTab) {
        case 'home': return <HomeUtente onLogout={handleLogout} onNavigate={setCurrentTab} />;
        case 'armadio': return <ArmadioUtente />;
        case 'marketplace': return <MarketplaceUtente />;
        case 'notifiche': return <NotificheUtente />;
        case 'passaporto': return <PassaportoScreen />;
        default: return <HomeUtente onLogout={handleLogout} onNavigate={setCurrentTab} />;
      }
    }

    if (role === 'attivita') {
      switch (currentTab) {
        case 'home': return <HomeAttivita onLogout={handleLogout} onNavigate={setCurrentTab} />;
        case 'vendita': return <VenditaAttivita />;
        case 'magazzino': return <MagazzinoAttivita />;
        case 'notifiche': return <NotificheAttivita />;
        case 'crm': return <CRMAttivita />;
        case 'passaporto': return <PassaportoScreen storeMode />;
        default: return <HomeAttivita onLogout={handleLogout} onNavigate={setCurrentTab} />;
      }
    }
  };

  return (
    <PhoneFrame>
      <div className="flex-1 flex flex-col bg-background overflow-hidden relative">
        <div className="flex-1 overflow-y-auto hide-scrollbar relative">
          {renderScreen()}
        </div>
        <TabBar role={role} currentTab={currentTab} onTabChange={setCurrentTab} />
      </div>
    </PhoneFrame>
  );
}
