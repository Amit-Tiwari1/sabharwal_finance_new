
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import WhyChooseUs from "./components/WhyChooseUs";
import CompanyMembers from "./components/CompanyMembers";
import Footer from "./components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />
      <HeroSection />
      <WhyChooseUs />
      <CompanyMembers />
      <Footer />
    </div>
  );
}
