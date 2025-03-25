import React from "react";
import hero1 from "@/public/images/111.jpg";
import hero2 from "@/public/images/13878f9aae288510fc58f66afe88fa01.jpg";
import hero3 from "@/public/images/441923961_861905669306131_6896573875795640745_n.jpg";
import hero4 from "@/public/images/449066391_493469276536082_905223319035689833_n.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

import { Card, CardContent } from "../ui/card";
import Image from "next/image";

const carouseImages = [hero1, hero2, hero3, hero4];

const HeroCarousel = () => {
  return (
    <div className="hidden lg:block">
      <Carousel>
        <CarouselContent>
          {carouseImages.map((image, index) => {
            return (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="p-2">
                    <Image
                      src={image}
                      alt="hero"
                      className="w-full h-[24rem] rounded-md object-cover"
                    ></Image>
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious></CarouselPrevious>
        <CarouselNext></CarouselNext>
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
