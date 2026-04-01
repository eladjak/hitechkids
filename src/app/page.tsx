import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Workshops from "@/components/Workshops";
import Gallery from "@/components/Gallery";
import ForParents from "@/components/ForParents";
import Registration from "@/components/Registration";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "הייטקידס - קייטנת טכנולוגיה",
  description: "קייטנת טכנולוגיה לילדים - סדנאות AI, קוד, כתיבה יצירתית ורובוטיקה לגילאי 8-15",
  url: "https://hitechkids.eladjak.com",
  telephone: "+972-52-542-7474",
  email: "eladhiteclearning@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "מגדל העמק",
    addressCountry: "IL",
  },
  sameAs: [],
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "ILS",
    lowPrice: "890",
    highPrice: "2990",
    offerCount: "3",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
    </>
  );
}
