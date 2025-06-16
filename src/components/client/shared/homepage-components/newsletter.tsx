"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import parser from "html-react-parser";

interface MatchMakeimages {
  id: string;
  imgUrl: string;
  imgUrlPreview: string;
  email: string;
  matchMakerName: string;
  matchMakerLocation: string;
}

interface NewsLetterItems {
  id: string;
  newsH2: string;
  newsH3: string;
  newsBtn: string;
  newsP: string;
  matchMakeimages?: MatchMakeimages[];
}

// All Sections
interface HomePageData {
  newsLetter: NewsLetterItems[];
}

const Newsletter = ({ config }: { config: HomePageData[] }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const newsLetter: NewsLetterItems[] = config.length > 6 ? config[6].newsLetter || [] : [];


  const images =
    newsLetter[0]?.matchMakeimages?.map((item) => item.imgUrl) || [];
  const emailLinks =
    newsLetter[0]?.matchMakeimages?.map((item) => item.email) || [];
  const imagePreview =
    newsLetter[0]?.matchMakeimages?.map((item) => item.imgUrlPreview) || [];
  const name =
    newsLetter[0]?.matchMakeimages?.map((item) => item.matchMakerName) || [];
  const location =
    newsLetter[0]?.matchMakeimages?.map((item) => item.matchMakerLocation) || [];

  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="flex flex-col w-full h-auto md:h-[400px] py-8 px-4">
      {newsLetter.length > 0 ? (
        newsLetter.map((newsLetterItem, index) => (
          <div
            key={newsLetterItem.id || `${newsLetterItem.newsH2}-${index}`}
            className="bg-white w-full rounded-t-[50px] flex flex-col md:flex-row"
          >
            {/* Left Section */}
            <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-center space-y-6">
              <h2 className="text-primary-500 text-2xl md:text-3xl font-bold italic ">
                {newsLetterItem.newsH2}
              </h2>

              <h3 className="text-gray-800 text-xl md:text-2xl font-bold">
                {newsLetterItem.newsH3}
              </h3>
              <div className="text-center">
                <Button
                  asChild
                  className="bg-primary-500 hover:bg-primary-600 text-white sm:px-4 md:px-6 py-2 rounded-full text-center"
                >
                  <a
                    href={emailLinks[currentImage]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Mail className="mr-2 inline-block" />
                    {newsLetterItem.newsBtn}
                  </a>
                </Button>
              </div>
              <p className="text-gray-700 text-sm md:text-base">
                {parser(newsLetterItem.newsP)}
              </p>
            </div>

            {/* Right Section */}
            <div className="w-full md:w-2/5 p-6 md:p-8 flex items-center justify-center">
              <div className="relative flex items-center justify-center w-full h-48 md:h-64">
              <div className="flex flex-col items-center">
                <Image
                  key={currentImage}
                  width={300}
                  height={360}
                  src={images[currentImage] || imagePreview[currentImage]}
                  alt={`Match Maker ${currentImage + 1}`}
                  className="w-[165px] md:w-[306px] md:h-[363px] object-cover transition-all duration-500"
                />
                  <p>{name[currentImage]}</p>
                  <p>{location[currentImage]}</p>
                </div>

                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow-md"
                >
                  <ArrowLeft />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow-md"
                >
                  <ArrowRight />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading NewsLetter...</p>
      )}
    </div>
  );
};

export default Newsletter;
