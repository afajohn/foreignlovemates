import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
// For Pricing Section
export interface PricingDetail {
  details_id: string;
  paragraph: string;
}
export interface PricingItem {
  price_id: string;
  price: string;
  btn_url: string;
  button_text: string;
  tittle: string;
  price_details: PricingDetail[];
  view_more_url: string;
}

// For Banner Section
export interface BannerDetails {
  id: number;
  bannerLogo: string;
  bannerIntroTxt: string;
  bannerImgPreview: string;
}
export interface Card {
  id: number;
  cardText: string;
  cardUrl: string;
  cardImg: string;
  cardImgPreview: string;
}

export interface BannerItem {
  id: number;
  bannerH1?: string;
  introVideoThumbnail?: string;
  introVideo?: string;
  introVideoPreview?: string;
  bannerDetails?: BannerDetails[];
  cards?: Card[];
}
// For Travel and Meet Section
export interface CardTm {
  id: number;
  cardTextTm: string;
  cardUrlTm: string;
  cardImgTm: string;
  cardImgTmPreview: string;
}

export interface LiveImgs {
  id: string;
  travImg: string;
  travImgPreview: string;
  travImgTitle: string;
  schedTxt: string;
  linkUrl: string;
}

export interface TravelItem {
  id: string;
  liveImg?: LiveImgs[];
  cardsTm?: CardTm[];
}

// For Executive Plan Section
export interface ExecutiveImg {
  id: number;
  execImg: string;
  execUrl: string;
  execImgPreview: string;
  execTitle: string;
  execTxt: string;
}

export interface CardsExec {
  id: number;
  cardTextExec: string;
  cardUrlExec: string;
  cardImgExec: string;
  cardImgExecPreview: string;
}

export interface ExecutiveItems {
  executiveImg?: ExecutiveImg[];
  cardsExec?: CardsExec[];
}

// For Client Testimonials
export interface ClientTestimonialItems {
  id: string;
  clientName: string;
  clientComment: string;
}
// For Success Stories
export interface SuccessStoriesItems {
  id: string;
  videoImg: string;
  videoImgPreview: string;
  videoUrl: string;
}

// For NewsLetter
export interface MatchMakeimages {
  id: string;
  imgUrl: string;
  imgUrlPreview: string;
  email: string;
  matchMakerName: string;
  matchMakerLocation: string;
}

export interface NewsLetterItems {
  id: string;
  newsH2: string;
  newsH3: string;
  newsBtn: string;
  newsP: string;
  matchMakeimages?: MatchMakeimages[];
}

// All Sections
export interface HomePageData {
  pricing: PricingItem[];
  banner: BannerItem[];
  travelAndMeet: TravelItem[];
  executivePlan: ExecutiveItems[];
  testimonial: ClientTestimonialItems[];
  successStories: SuccessStoriesItems[];
  newsLetter: NewsLetterItems[];
}
export const useHomePageData = () => {
  const [pricing, setPricing] = useState<PricingItem[]>([]);
  const [banner, setBanner] = useState<BannerItem[]>([]);
  const [travel, setTravel] = useState<TravelItem[]>([]);
  const [executive, setExecutive] = useState<ExecutiveItems[]>([]);
  const [testimonial, setTestimonial] = useState<ClientTestimonialItems[]>([]);
  const [successStories, setSuccessStories] = useState<SuccessStoriesItems[]>([]);
  const [newsLetter, setNewsLetter] = useState<NewsLetterItems[]>([]);

  //Fetch data
  useEffect(() => {
    const getCurrentValue = async () => {
      try {
        const response = await fetch('/api/configuration/homepagecrud');
        const data: HomePageData[] = await response.json();

        const res = await fetch('/api/configuration/homepage?section=pricing');
        const dataBq = await res.json();

        if (dataBq?.data) {
          setPricing(dataBq.data); // data is the array main container "data" : [{}]
        }
        // if (data[0]?.pricing) {
        //   setPricing(data[0].pricing);
        // }
        if (data[1]?.banner) {
          setBanner(data[1].banner);
        }
        if (data[2]?.travelAndMeet) {
          setTravel(data[2].travelAndMeet);
        }
        if (data[3]?.executivePlan) {
          setExecutive(data[3].executivePlan);
        }
        if (data[4]?.testimonial) {
          setTestimonial(data[4].testimonial);
        }
        if (data[5]?.successStories) {
          setSuccessStories(data[5].successStories);
        }
        if (data[6]?.newsLetter) {
          setNewsLetter(data[6].newsLetter);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    getCurrentValue();
  }, []);


  const savePricingData = async (priceIdToUpdate: string) => {
    try {

      const pricingItem = pricing.find(item => item.price_id === priceIdToUpdate);

      console.log(pricingItem);

      if (!pricingItem) {
        alert("Pricing item not found.");
        return;
      }

      const res = await fetch(`/api/configuration/homepage?section=pricing&edits=${pricingItem.price_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: pricingItem.price,
          title: pricingItem.tittle,
          buttonText: pricingItem.button_text,
          btnUrl: pricingItem.btn_url,
          viewMoreUrl: pricingItem.view_more_url,
          priceDetails: pricingItem.price_details
        }),
      });

      if (res.ok) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Changes Saved!",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        alert("Error updating data");
      }
    } catch (err) {
      console.error("Error updating data:", err);
      alert("Error updating data");
    }
  };


  // Save data Start
  const saveAllData = async () => {
    try {
      const formData = new FormData();
      // formData.append("price", JSON.stringify(pricing));
      formData.append("banner", JSON.stringify(banner));
      formData.append("travelAndMeet", JSON.stringify(travel));
      formData.append("executivePlan", JSON.stringify(executive));
      formData.append("testimonial", JSON.stringify(testimonial));
      formData.append("successStories", JSON.stringify(successStories));
      formData.append("newsLetter", JSON.stringify(newsLetter));

      const response = await fetch('/api/configuration/homepagecrud', {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Changes Saved!",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        alert("Error updating data");
      }

    } catch (err) {
      console.error("Error updating data:", err);
      alert("Error updating data");
    }
  };

  return {
    pricing,
    banner,
    travel,
    executive,
    testimonial,
    successStories,
    newsLetter,
    setPricing,
    setBanner,
    setTravel,
    setExecutive,
    setTestimonial,
    setSuccessStories,
    setNewsLetter,
    saveAllData,
    savePricingData
  };
};