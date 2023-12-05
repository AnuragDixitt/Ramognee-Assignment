import React from "react";
import men from "../assets/mens.jpg";
import women from "../assets/women.jpg";
import jewellery from "../assets/jewellery.jpg";
import electronics from "../assets/electronics.jpg";
const MainSection = () => {
  return (
    <div>
      <p className="text-6xl">Categories</p>
      <div className="whole flex flex-col space-y-10">
        <div className="flex w-full h-[70vh]">
          <div className="men gap-10 flex-col w-1/2  justify-center items-center h-full flex ">
            <div className="w-3/4 h-3/4 flex bg-purple-500  overflow-hidden">
              <img src={men} alt="" />
            </div>
            <p className="text-4xl font-semibold">Shop Men's Clothing</p>
          </div>
          <div className="women gap-10 flex-col w-1/2  justify-center items-center h-full flex ">
            <div className="w-3/4 h-3/4 flex bg-purple-500 overflow-hidden ">
              <img src={women} alt="" />
            </div>
            <p className="text-4xl font-semibold">Shop Women's Clothing</p>
          </div>
        </div>
        <div className="flex w-full h-[70vh]">
          <div className="jewellery gap-10 flex-col w-1/2  justify-center items-center h-full flex ">
            <div className="w-3/4 h-3/4 flex bg-purple-500 overflow-hidden">
              <img src={jewellery} alt="" />
            </div>
            <p className="text-4xl font-semibold">Shop Jewellery</p>
          </div>
          <div className="electronics gap-10 flex-col w-1/2  justify-center items-center h-full flex ">
            <div className="w-3/4 h-3/4 flex bg-purple-500 overflow-hidden ">
              <img src={electronics} alt="" />
            </div>
            <p className="text-4xl font-semibold">Shop Electronics</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
