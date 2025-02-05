import { useState } from 'react';
import { 
  Target, 
  Calendar, 
  Wallet, 
  StickyNote, 
  Bell, 
  Timer,
  Menu,
  X,
  LayoutDashboard
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import GoalTracker from './components/GoalTracker';
import HabitTracker from './components/HabitTracker';
import MoneyManager from './components/MoneyManager';
import Notes from './components/Notes';
import Reminders from './components/Reminders';
import PomodoroTimer from './components/PomodoroTimer';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function openPage(str: String): void{
    setActiveTab(str.toString());
  }

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'goals', name: 'Goals Tracker', icon: Target },
    { id: 'habits', name: 'Habits Tracker', icon: Calendar },
    { id: 'money', name: 'Money Manager', icon: Wallet },
    { id: 'notes', name: 'Notes', icon: StickyNote },
    { id: 'reminders', name: 'Reminders', icon: Bell },
    { id: 'timer', name: 'Timer', icon: Timer },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard handler={openPage} />;
      case 'goals':
        return <GoalTracker />;
      case 'habits':
        return <HabitTracker />;
      case 'money':
        return <MoneyManager />;
      case 'notes':
        return <Notes />;
      case 'reminders':
        return <Reminders />;
      case 'timer':
        return <PomodoroTimer />;
      default:
        return <Dashboard handler={openPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F2EA] flex">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex flex-col w-64 bg-[#2D4F3C] text-[#F5F2EA]">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Focus <span className="opacity-75">Flow</span></h1>
        </div>
        <nav className="flex-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center px-4 py-3 hover:bg-[#1A2F24] transition-colors ${
                activeTab === tab.id ? 'bg-[#1A2F24]' : ''
              }`}
            >
              <tab.icon className="w-5 h-5 mr-3" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-[#2D4F3C] text-[#F5F2EA] p-4 flex justify-between items-center z-50">
        <h1 className="text-xl font-bold">Focus <span className="opacity-75">Flow</span></h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-[#2D4F3C] text-[#F5F2EA] z-40">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 hover:bg-[#1A2F24] transition-colors ${
                activeTab === tab.id ? 'bg-[#1A2F24]' : ''
              }`}
            >
              <tab.icon className="w-5 h-5 mr-3" />
              {tab.name}
            </button>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 md:p-8 p-4 mt-16 md:mt-0">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;