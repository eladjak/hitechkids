import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Workshops from "@/components/Workshops";
import Gallery from "@/components/Gallery";
import ForParents from "@/components/ForParents";
import Registration from "@/components/Registration";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Workshops />
      <Gallery />
      <ForParents />
      <Registration />
      <FAQ />
      <Footer />
    </main>
  );
}
