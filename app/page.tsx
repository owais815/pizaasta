import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Deals from "@/components/Deals";
import Serve from "@/components/Serve";
import Menu from "@/components/Menu";
import Specials from "@/components/Specials";
import Locations from "@/components/Locations";
import Footer from "@/components/Footer";
import FloatingWhatsapp from "@/components/FloatingWhatsapp";
import Lightbox from "@/components/Lightbox";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Deals />
      <Serve />
      <Menu />
      <Specials />
      <Locations />
      <Footer />
      <FloatingWhatsapp />
      <Lightbox />
    </>
  );
}
