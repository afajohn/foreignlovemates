import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";


interface RotatorProps {
	ladiesData: { random_value: number }[]; // Adjust the type to match the data structure
}

const RotatorCta = ({ ladiesData }: RotatorProps) => {
  return (
    <section
      id="rotatorCta"
      className="flex items-center justify-center py-3 mx-3"
    >
      <Carousel
        opts={{
          loop: true,
          dragFree: true,
        }}
        className="overflow-hidden flex items-center justify-center"
      >
        <CarouselContent>
          {ladiesData.map((lady: {  random_value: number}, index) => (
            <CarouselItem key={lady.random_value} className="basis-1/7">
              <div className="p-1 relative">
                {/* biome-ignore lint/a11y/useValidAnchor: <> */}
                <a href="#">
                  <Card className="border-0 shadow-white">
                    <CardContent className="p-0 relative">
                      <Image
                        src={`https://loveme.com/mp/p${lady.random_value}-1.jpg`}
                        alt={`Image ${index + 1}`}
                        className="w-[4rem] h-[6rem] rounded-full lg:rounded-lg object-cover"
                        priority={true}
                        width={450}
                        height={500}
                      />
                    </CardContent>
                  </Card>
                </a>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-[10rem] top-16" />
        <CarouselNext className="right-[10rem] top-16" />
      </Carousel>
    </section>
  );
};

export default RotatorCta;
