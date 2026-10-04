import HeroSlider from "@/app/_components/HeroSlider/HeroSlider";
import HeroCards from "@/app/_components/HeroCards/HeroCards";
import Products from "@/app/products/page";
import Categories from "@/app/_components/Categories/Categories";
import DealsCards from "@/app/_components/DealsCards/DealsCards";
import NewsletterSection from "@/app/_components/NewsletterSection/NewsletterSection";

export default function Home({ searchParams }: { searchParams: Promise<{ subcategory: string }> }) {
  return (
    <>
      <HeroSlider />
      <HeroCards />
      <Categories isHome />
      <DealsCards />
      <Products isHome searchParams={searchParams} />
      <NewsletterSection />
    </>
  );
}
