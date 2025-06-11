import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Overview from './components/Sections/Overview';
import ContentManagement from './components/Sections/ContentManagement';
import Engagement from './components/Sections/Engagement';

function App() {
  const [activeSection, setActiveSection] = useState('overview');

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview />;
      case 'content':
        return <ContentManagement />;
      case 'engagement':
        return <Engagement />;
      case 'analytics':
        return <Overview />;
      case 'audience':
        return <Overview />;
      case 'reports':
        return <Overview />;
      case 'trends':
        return <Overview />;
      case 'notifications':
        return <Engagement />;
      case 'settings':
        return <Overview />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}

export default App;