import Navbar from './landing-page-2/components/Navbar';
import Hero from './landing-page-2/components/Hero';
import MenuEvolution from './landing-page-2/components/MenuEvolution';
import ImplementationProcess from './landing-page-2/components/ImplementationProcess';
import ServicesCarousel from './landing-page-2/components/ServicesCarousel';
import Benefits from './landing-page-2/components/Benefits';
import Pricing from './landing-page-2/components/Pricing';
import Footer from './landing-page-2/components/Footer';
import MenuShowcase from './landing-page-2/components/MenuShowcase';
import HowItWorks from './landing-page-2/components/HowItWorks';
import MenuTransformation from './landing-page-2/components/MenuTransformation';
import VisualMenu from './landing-page-2/components/VisualMenu';
import Ordering from './landing-page-2/components/Ordering';
import Payment from './landing-page-2/components/Payment';
import HomeDelivery from './landing-page-2/components/HomeDelivery';
import Contact from './landing-page-2/components/Contact';
import LegalAccordion from './landing-page-2/components/LegalAccordion';
import GoToTop from './landing-page-2/components/GoToTop';
import ScrollAnimator from './ScrollAnimator';

export default function LandingPage2() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50 font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden">
      <ScrollAnimator />
      <Navbar />

      {/* Main Content Areas */}
      <div className="flex-grow">
        <Hero />
        <MenuTransformation />
        <VisualMenu />
        <Ordering />
        <Payment />
        <HomeDelivery />
        <ImplementationProcess />
        <MenuShowcase />
        <ServicesCarousel />

        <Benefits />
        <Contact />
        <LegalAccordion />
      </div>

      <Footer />
      <GoToTop />
    </main>
  );
}
