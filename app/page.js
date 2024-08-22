import React from "react";
import Slider from "./_components/Slider";
import { getAllProducts, getCategoryList, getSlider } from "./_utils/GlobalApi";
import Categories from "./_components/Categories";
import Products from "./_components/Products";
import Image from "next/image";
import Footer from "./_components/Footer";

async function Home() {
  const sliderList = await getSlider();
  const categoriesList = await getCategoryList();
  const productsList = await getAllProducts();

  return (
    <div className="p-5 md:p-10 px-16 lg:px-20 overflow-hidden ">
      <Slider sliderList={sliderList} />
      <Categories categoriesList={categoriesList} />
      <Products productsList={productsList} />

      {/* Banner */}
      <Image
        src={"/banner.png"}
        width={1000}
        height={300}
        className="w-full h-[400px] object-contain"
        alt="banner home page"
      />

      <Footer />
    </div>
  );
}

export default Home;
