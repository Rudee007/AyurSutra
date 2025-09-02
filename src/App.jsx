import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import TridoshaSection from "./components/TridoshaSection";
import ProcessSection from "./components/ProcessSection";
import CentersSection from "./components/CentersSection";
import TestimonialsSection from "./components/TestimonialsSection";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <TridoshaSection />
      <ProcessSection />
      <CentersSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}

export default App;
