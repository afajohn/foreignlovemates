"use client";
import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface SuccessStoriesItems {
  id: string;
  videoImg: string;
  videoImgPreview: string;
  videoUrl: string;
}
interface HomePageData {
  successStories: SuccessStoriesItems[];
}
function SuccessAwards({ config }: { config: HomePageData[] }) {

  const [isGrabbing, setIsGrabbing] = useState(false);
  const awards = [
    "afa-awards1.webp",
    "afa-awards2.webp",
    "afa-awards3.webp",
    "afa-awards4.webp",
    "afa-awards5.webp",
    "afa-awards6.webp",
    "afa-awards7.webp",
    "afa-awards8.webp",
  ];



  const successStories: SuccessStoriesItems[] = config.length > 5 ? config[5].successStories || [] : [];


  const ReviewCard = () => {
    return (
      <>
        {successStories.length > 0 ? (
          <div>
            {successStories.map((successStoriesItem) => (
              <Dialog key={successStoriesItem.id}>
                <DialogTrigger>
                  <Image
                    src={successStoriesItem.videoImg || successStoriesItem.videoImgPreview}
                    width={390}
                    height={390}
                    alt={`Success story - ${successStoriesItem.id}`}
                    className="w-[15rem] md:w-[20rem] px-1 mx-1"
                  />
                </DialogTrigger>
                <DialogContent className="max-w-7xl p-0 bg-transparent border-0 text-white w-[95%] lg:w-[50%] xl:w-[40%] mx-auto">
                  <DialogHeader className="p-0">
                    <DialogTitle aria-hidden />
                    <DialogDescription asChild className="rounded-3xl">
                      <iframe
                        src={successStoriesItem.videoUrl}
                        title="Video"
                        allowFullScreen
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        className="aspect-video"
                      />
                    </DialogDescription>
                    <DialogClose aria-label="Close" asChild={true} />
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        ) : (
          <p>Loading Success Stories...</p>
        )}
      </>
    );
  };

  return (
    <>
      <div className="py-5 flex flex-col">
        <div className="px-5">
          <h2 className="text-primary-500 text-2xl font-bold pb-5">
            Listen to some of our Recent Success Stories
          </h2>
        </div>
        {successStories.length > 0 ? (
          <div>
            <Marquee pauseOnHover className="[--duration:100s] [--gap:0rem] [gap:var(--gap)]">
              {successStories.map((successStoriesItem) => (
                <ReviewCard key={successStoriesItem.videoImg} {...successStoriesItem} />
              ))}
            </Marquee>
          </div>

        ) : (
          <p>Loading Success Stories...</p>
        )}
      </div>

      <section id="awards">
        <div className="container px-5 mx-auto lg:py-10">
          <h2 className="text-primary-500 text-2xl font-bold pb-5">
            8 Time iDate &quot;Best of&quot; Award Winner
          </h2>

          <div className="flex items-center justify-center py-3">
            <Carousel
              opts={{
                loop: true,
              }}
              className="max-w-[45%] md:max-w-[65%] lg:max-w-full"
            >
              <CarouselContent>
                {awards.map((webp, index) => (
                  <CarouselItem key={webp} className="basis-1/8">
                    <Image
                      src={`/images/${webp}`}
                      width={100}
                      height={100}
                      alt={`Awards ${index + 1}`}
                      onMouseDown={() => setIsGrabbing(true)}
                      onMouseUp={() => setIsGrabbing(false)}
                      className={`mx-auto scale-95 hover:scale-100 ${isGrabbing ? "cursor-grabbing" : "cursor-grab"
                        }`}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="lg:hidden" />
              <CarouselNext className="lg:hidden" />
            </Carousel>
          </div>
        </div>
      </section>
    </>
  );
}

export default SuccessAwards;
