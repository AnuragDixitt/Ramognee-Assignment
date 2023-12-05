import React from "react";
import AddtoCartButton from "./AddtoCartButton";

const ProductCard = ({ data }) => {
  return (
    <div className="productcard w-64 flex flex-col justify-center items-center  ">
      <div className="image h-80 w-full flex justify-center items-center overflow-hidden bg-slate-700 ">
        <img src={data.image} alt="" className="object-fill h-full w-full" />
      </div>
      <div className="h-24 w-full ">
        <div className="title text-[16px] font-semibold text-justify  h-16">
          {data.title.length > 50
            ? data.title.substring(0, 50) + "..."
            : data.title}
        </div>
        <div className="flex text-[14px] font-semibold  justify-between">
          <div className="price  flex gap-1">
            <span> ₹{data.price}</span>
            <span className="line-through">₹{data.price * 2}</span>{" "}
          </div>
          <div className="rating ">
            {data.rating.rate}({data.rating.count})
          </div>
        </div>
      </div>
      <div className="w-full  overflow-hidden">
        <AddtoCartButton />
      </div>
    </div>
  );
};

export default ProductCard;
