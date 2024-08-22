import { getCategoryList, getProductsById } from "@/app/_utils/GlobalApi";
import React from "react";
import TopCategoryList from "./_components/TopCategoryList";
import Products from "@/app/_components/Products";

async function page({ params }) {
  const categoriesList = await getCategoryList();
  const productsList = await getProductsById(params.categoryName);
  return (
    <div>
      <h2 className="p-4 bg-primary text-white font-bold text-3xl text-center">
        {decodeURIComponent(params.categoryName)}
      </h2>
      <TopCategoryList
        categoriesList={categoriesList}
        selectedCategory={params.categoryName}
      />
      <Products productsList={productsList} />
    </div>
  );
}

export default page;
