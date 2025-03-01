import React, { useState } from "react";

const SideNav = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Menu Button */}
      <button
        className="fixed  left-4 z-50 bg-black text-white p-3 rounded-full shadow-lg hover:bg-black"
        onClick={toggleDrawer}
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Drawer */}
      <div
        className={`fixed top-20 left-0 h-full w-72 bg-white  transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">הקורס שלי</h2>
        </div>
        <div className="p-4" dir="rtl">
          {data.map((weekData, index) => (
            <div key={index} className="mb-6">
              <button
                className={`w-full text-right py-2 px-4 text-xs font-normal rounded-full bg-gradient-to-tr from-red-800 to-red-700 text-white`}
              >
                {weekData.week}-{weekData.title}
              </button>
              <ul className="mt-2 space-y-2">
                {weekData.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center pl-4 pr-2 text-gray-700 hover:text-gray-900 cursor-pointer"
                  >
                    <span>{item}</span>
                    <span className={`text-green-500 font-bold `}>✔</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleDrawer}
        ></div>
      )}
    </div>
  );
};

export default SideNav;
