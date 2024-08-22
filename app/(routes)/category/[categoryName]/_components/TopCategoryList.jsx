import Image from "next/image";
import Link from "next/link";
import React from "react";

function TopCategoryList({ categoriesList, selectedCategory }) {
  return (
    <div className="flex gap-5 mt-2 overflow-x-auto mx-7 md:mx-20 justify-center">
      {categoriesList.map((category, index) => (
        <Link
          href={`/category/${category?.attributes?.name}`}
          key={index}
          className={`flex flex-col items-center justify-center bg-green-50 gap-2 p-3 rounded-lg group hover:bg-green-200 w-[150px] min-w-[100px] ${
            selectedCategory == category?.attributes?.name &&
            "bg-primary text-white hover:bg-primary"
          }`}
        >
          <Image
            src={
              process.env.NEXT_PUBLIC_BASE_BACKEND_URL +
              category?.attributes?.icon?.data?.attributes?.url
            }
            height={50}
            width={50}
            alt="icon"
            className="group-hover:scale-125 transition-all ease-in-out"
          />
          <h2 className="text-green-800">{category?.attributes?.name}</h2>
        </Link>
      ))}
    </div>
  );
}

export default TopCategoryList;
