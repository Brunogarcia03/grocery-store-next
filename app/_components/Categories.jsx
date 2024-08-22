import Image from "next/image";
import Link from "next/link";
import React from "react";

function Categories({ categoriesList }) {
  return (
    <div>
      <h2 className="text-green-600 font-bold text-2xl mt-5">
        Shop by Category
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5 mt-2">
        {categoriesList.map((category, index) => (
          <Link
            href={`/category/${category.attributes.name}`}
            key={index}
            className="flex flex-col items-center justify-center bg-green-50 gap-2 p-3 rounded-lg group hover:bg-green-200"
          >
            <Image
              src={
                process.env.NEXT_PUBLIC_BASE_BACKEND_URL +
                category?.attributes?.icon?.data?.attributes?.url
              }
              height={50}
              width={50}
              alt="icon"
              className="w-[50px] h-[50px] group-hover:scale-125 transition-all ease-in-out"
            />
            <h2 className="text-green-800">{category?.attributes?.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;
