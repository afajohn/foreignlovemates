import Banner from "./homepage-components/banner";
// import MediaLogos from "./homepage-components/mediaLogos/mediaLogos";
import Testimonial from "./homepage-components/testimonial";
import TravelAndMeet from "./homepage-components/travelAndMeet";
import Newsletter from "./homepage-components/newsletter";
import AdBreak from "./homepage-components/adbreak";
import Pricing from "./homepage-components/pricing";
import SuccessAwards from "./homepage-components/successAwards";
import Services from "./homepage-components/services";
import { getHomePageCrudData, getRotatorData } from "@/_lib/fetch-data";
import { getData,  } from "@/_lib/fetch-data";
import Rotator from "@/components/client/shared/rotator";
import MediaLogos from "./homepage-components/mediaLogos/mediaLogos";

export async function LandingSection() {
  const _config = await getData().catch(() => null);
  const website = Array.isArray(_config) && _config.length > 0 ? _config[0].website || "" : "";
  
  // Fetch rotator data safely
  const rotatorData = website ? await getRotatorData(website) : [];
  
  // Fetch homepage CRUD data safely
  const config = await getHomePageCrudData().catch(() => null);
  

  return (
    <>
     <Rotator ladiesData={rotatorData} />
      <section
        id="banner"
        className="lg:grid grid-cols-2 gap-4 w-full p-4 lg:pb-[2.5rem] container mx-auto"
      >
        <Banner config={config} />
      </section>

     <section id="media-logo" className="w-full bg-gray-50 py-8">
        <MediaLogos />
      </section> 

      <section id="travel-meet">
        <TravelAndMeet config={config} />
      </section>

      <section id="testimonial-section" className="w-full bg-gray-50 py-8">
        <Testimonial config={config} />
      </section>

      <section id="success-stoties" className="py-8">
        <SuccessAwards config={config} />
      </section>

      <section
        id="newsletter"
        className="flex h-full shadow-2xl w-[80%] bg-white border border-gray-300 rounded-t-[50px]  "
      >
        <Newsletter config={config} />
      </section>

      <section id="adbreak" className="w-full bg-gray-100">
        <AdBreak />
      </section>

      <section id="pricing" className="w-full bg-gray-50 py-8">
        <Pricing />
      </section>

      <section id="services" className="pt-8">
        <Services />
      </section>
    </>
  );
}

export default LandingSection;
