import Banner from "@/components/landingPage/Banner";
import Categories from "@/components/landingPage/Categories";
import CustomerSupport from "@/components/landingPage/CustomerSupport";
import FlashSale from "@/components/landingPage/FlashSale";
import PopularProducts from "@/components/landingPage/PopularProducts";
import Reviews from "@/components/landingPage/Reviews";

export default function Home() {
  return (
    <div className="mx-auto">
      <div className="h-[400px]">
        <Banner />
      </div>

      <FlashSale />
      <PopularProducts />
      <Categories />
      <Reviews />
      <CustomerSupport />
    </div>
  );
}
