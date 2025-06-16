"use client";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, LogIn } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import SignUpModal from "../signUpModal";
import Link from "next/link";

// For Client Testimonials
interface ClientTestimonialItems {
  id: string;
  clientName: string;
  clientComment: string;
}
interface HomePageData {
  testimonial: ClientTestimonialItems[];
}

const Testimonial = ({ config }: { config: HomePageData[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isGrabbing, setIsGrabbing] = useState(false);


  const testimonial: ClientTestimonialItems[] = config.length > 4 ? config[4].testimonial || [] : [];



  // Callback to update the selected index and scroll snaps when the carousel changes
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Attach the onSelect callback to Embla's event listener
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect); // Listen for slide changes
    onSelect(); // Set the initial selected index
  }, [emblaApi, onSelect]);

  return (
    <div className="flex flex-col items-center justify-center px-4">
      {/* Heading */}
      <h2 className="h2-primary text-center py-1 text-lg md:text-2xl mb-4 font-bold">
        Our Story is the Story of Your Success!
      </h2>

      {/* Register Button */}
      <Dialog>
        <DialogTrigger
          className="mb-8 px-3 py-2 md:px-6 md:py-3 text-white  flex items-center space-x-2 rounded-full bg-primary-500 hover:bg-primary-600"
        >
          <LogIn className="w-5 h-5" />
          <span className="text-sm sm:font-normal md:font-semibold">For Full Features, Register Instantly for Free</span>
        </DialogTrigger>

        <SignUpModal />
      </Dialog>

      {/* Carousel Wrapper */}
      <Card
        onMouseDown={() => setIsGrabbing(true)}
        onMouseUp={() => setIsGrabbing(false)}
        className={`w-full max-w-[90%] md:max-w-[70%] border border-setcolor shadow-md overflow-hidden relative bg-[#F3F1EB] ${isGrabbing ? "cursor-grabbing" : "cursor-grab"
          }`}
      >
        <CardContent className="relative p-4 md:p-8">
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex">
              {testimonial.length > 0 ? (
                testimonial.map((testimonialItem, testimonialIndex) => (
                  <div
                    key={testimonialItem.id} // Use the unique `id` as the key
                    className="embla__slide flex-[0_0_100%] flex flex-col items-start justify-start bg-[#F3F1EB] p-4 md:p-8 relative"
                  >
                    {/* Left Quote Icon at the Top-Left */}
                    <Quote
                      className={`text-primary-500 absolute top-2 left-2 md:top-4 md:left-4 w-8 h-8 md:w-12 md:h-12 rotate-180 ${testimonialItem.id !== testimonial[testimonialIndex]?.id
                        ? "hidden"
                        : ""
                        }`}
                    />

                    {/* Testimonial Content */}
                    <div className="flex flex-col items-center justify-center w-full">
                      <h3 className="text-gray-800 text-lg md:text-[22px] font-bold mb-4 md:mb-6">
                        {testimonialItem.clientName}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 text-center mb-4 md:mb-6 leading-relaxed">
                        {testimonialItem.clientComment}
                      </p>

                      {/* Read More Button */}
                      <Link
                        href="/testimonials"
                        className="text-primary-500 hover:text-secondary-500 text-sm md:text-lg underline font-semibold"
                      >
                        Read More
                      </Link>
                    </div>

                    {/* Right Quote Icon at the Bottom-Right */}
                    <Quote
                      className={`text-primary-500 absolute bottom-2 right-2 md:bottom-4 md:right-4 w-8 h-8 md:w-12 md:h-12 ${testimonialItem.id !== testimonial[selectedIndex]?.id
                        ? "hidden"
                        : ""
                        }`}
                    />
                  </div>
                ))
              ) : (
                <p>Loading testimonials...</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Carousel Indicators */}
      <div className="flex space-x-2 mt-6">
        {testimonial.map((testimonialItem) => (
          <button
            key={testimonialItem.id}
            type="button"
            onClick={() =>
              emblaApi?.scrollTo(
                testimonial.findIndex((t) => t.id === testimonialItem.id)
              )
            }
            className={`h-1 w-8 rounded-full focus:outline-none ${testimonialItem.id === testimonial[selectedIndex]?.id
              ? "bg-primary-400"
              : "bg-primary-50"
              }`}
            aria-label={`Go to slide ${testimonialItem.clientName}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
