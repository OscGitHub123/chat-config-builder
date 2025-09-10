import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FileUpload from "@/components/FileUpload";
import Configuration from "@/components/Configuration";
import ChatInterface from "@/components/ChatInterface";

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');

  const renderSection = () => {
    switch (activeSection) {
      case 'hero':
        return <Hero />;
      case 'upload':
        return (
          <div className="min-h-screen pt-20 pb-10 px-4">
            <div className="container mx-auto max-w-4xl">
              <FileUpload />
            </div>
          </div>
        );
      case 'config':
        return (
          <div className="min-h-screen pt-20 pb-10 px-4">
            <div className="container mx-auto max-w-2xl">
              <Configuration />
            </div>
          </div>
        );
      case 'chat':
        return (
          <div className="min-h-screen pt-20 pb-10 px-4">
            <div className="container mx-auto max-w-4xl">
              <ChatInterface />
            </div>
          </div>
        );
      default:
        return <Hero />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
      />
      {renderSection()}
    </div>
  );
};

export default Index;
