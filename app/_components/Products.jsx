import React from "react";
import ProductItem from "./ProductItem";

function Products({ productsList }) {
  return (
    <div className="mt-10">
      <h2 className="text-green-600 font-bold text-2xl mt-5">
        Our Popular Products
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5 overflow-hidden">
        {productsList.map(
          (product, index) => index < 8 && <ProductItem product={product} />
        )}
      </div>
    </div>
  );
}

export default Products;
