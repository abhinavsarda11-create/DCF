/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ParentingJourneySection } from './components/ParentingJourneySection';
import { ParentingJourneyDetailsPage } from './components/ParentingJourneyDetailsPage';
import { TransformActionBanner } from './components/TransformActionBanner';
import { SuccessStoriesSection } from './components/SuccessStoriesSection';
import { CommunityStoriesSection } from './components/CommunityStoriesSection';
import { DocumentationPage } from './components/DocumentationPage';
import { PdfUploadPage } from './components/PdfUploadPage';
import { Footer } from './components/Footer';
import { DonateModal } from './components/DonateModal';
import { VolunteerModal } from './components/VolunteerModal';
import { NotYetParentPledgeModal } from './components/NotYetParentPledgeModal';
import { ChatbotWidget } from './components/ChatbotWidget';
import { GoldenProvider } from './components/GoldenSparkles';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'parenting-details' | 'documentation' | 'pdf-upload'>('home');
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);
  const [pledgeModalOpen, setPledgeModalOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  const handleOpenParentingDetails = () => {
    setCurrentView('parenting-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSection = (href: string) => {
    if (href === '#faq') {
      setIsFaqOpen(true);
    }

    if (href === '#pledge') {
      setPledgeModalOpen(true);
      return;
    }

    if (href === '#documentation') {
      setCurrentView('documentation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (href === '#upload-documents' || href === '#pdf-upload') {
      setCurrentView('pdf-upload');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider>
      <GoldenProvider>
        <div id="dawn-child-app" className="min-h-screen bg-[#fbf8f3] dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans antialiased selection:bg-[#f25c27] selection:text-white flex flex-col transition-colors duration-200">
          {/* Navigation Bar with Documentation link */}
          <Navbar
            onOpenDonate={() => setDonateModalOpen(true)}
            onOpenPledge={() => setPledgeModalOpen(true)}
            onNavigateHome={handleNavigateHome}
            onNavigateSection={handleNavigateSection}
          />

          {/* Main Content Area */}
          <main className="flex-1">
            {currentView === 'home' ? (
              <>
                {/* Hero Section with Slider & Glassmorphic Stats */}
                <HeroSection onOpenPledge={() => setPledgeModalOpen(true)} />

                {/* Navigating the Parenting Journey */}
                <ParentingJourneySection
                  onOpenDetails={handleOpenParentingDetails}
                  onOpenPledge={() => setPledgeModalOpen(true)}
                />

                {/* Transforming Lives Through Compassionate Action */}
                <TransformActionBanner
                  onJoinUs={() => setVolunteerModalOpen(true)}
                  onOpenPledge={() => setPledgeModalOpen(true)}
                />

                {/* Success Stories */}
                <SuccessStoriesSection />

                {/* Heartfelt Stories from Our Community of Supporters */}
                <CommunityStoriesSection />
              </>
            ) : currentView === 'pdf-upload' ? (
              /* Dedicated PDF Document Uploader and Vault storing files in public/assets/documents */
              <PdfUploadPage
                onBack={handleNavigateHome}
                onNavigateHome={handleNavigateHome}
              />
            ) : currentView === 'documentation' ? (
              /* Dedicated Documentation View with Upload Button */
              <DocumentationPage
                onBack={handleNavigateHome}
                onOpenUpload={() => {
                  setCurrentView('pdf-upload');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            ) : (
              /* Dedicated Options View shown when clicking "Know More" */
              <ParentingJourneyDetailsPage
                onBack={handleNavigateHome}
                onOpenDonate={() => setDonateModalOpen(true)}
                onOpenVolunteer={() => setVolunteerModalOpen(true)}
                onOpenPledge={() => setPledgeModalOpen(true)}
              />
            )}
          </main>

          {/* Footer with Contact Info, Socials and Separate FAQ Section */}
          <Footer
            isFaqOpen={isFaqOpen}
            onToggleFaq={() => setIsFaqOpen((prev) => !prev)}
            onOpenPledge={() => setPledgeModalOpen(true)}
          />

          {/* Interactive Modals & Assistant */}
          <DonateModal
            isOpen={donateModalOpen}
            onClose={() => setDonateModalOpen(false)}
          />
          <VolunteerModal
            isOpen={volunteerModalOpen}
            onClose={() => setVolunteerModalOpen(false)}
          />
          <NotYetParentPledgeModal
            isOpen={pledgeModalOpen}
            onClose={() => setPledgeModalOpen(false)}
            onOpenDonate={() => setDonateModalOpen(true)}
          />
          <ChatbotWidget
            onOpenDonate={() => setDonateModalOpen(true)}
            onOpenVolunteer={() => setVolunteerModalOpen(true)}
            onOpenParentingDetails={handleOpenParentingDetails}
            onOpenPledge={() => setPledgeModalOpen(true)}
            onNavigateSection={handleNavigateSection}
          />
        </div>
      </GoldenProvider>
    </ThemeProvider>
  );
}
