import LoadingContainer from "@/components/global/Loading";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Hero></Hero>
      <Suspense fallback={<LoadingContainer></LoadingContainer>}>
        <FeaturedProducts></FeaturedProducts>
      </Suspense>
    </>
  );
}
