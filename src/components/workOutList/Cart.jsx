import React from "react";

const Cart = ({
  _id,
  title,
  caloriesTitle,
  timeTitle,
  cartBg,
  whiteLogo,
  timeIcon,
  calories,
}) => {
  return (
    <div className="md:w-56 w-48 shadow-xl rounded-2xl p-3 mt-8" key={_id}>
      <div
        className="w-full h-40 rounded-2xl flex justify-center items-center "
        style={{
          backgroundImage: `url(${cartBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img className="w-20 h-20" src={whiteLogo} alt="" />
      </div>
      <div className="px-6 py-4">
        <p className="text-[#0A2533]  text-sm font-bold text-end">{title}</p>
        <div className="flex gap-2 justify-center items-center">
          <div className="flex py-4">
            <p className="text-[#97A2B0] text-xs">{caloriesTitle}</p>
            <img className="" src={calories} alt="calories" />
            <span className="text-[#97A2B0] text-xs pl-2 font-bold">.</span>
          </div>
          <div className="flex">
            <p className="text-[#97A2B0] text-xs">{timeTitle}</p>
            <img className="" src={timeIcon} alt="calories" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
