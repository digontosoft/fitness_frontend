import moment from "moment";

const months = [
  "ינואר",
  "פברואר",
  "מרץ",
  "אפריל",
  "מאי",
  "יוני",
  "יולי",
  "אוגוסט",
  "ספטמבר",
  "אוקטובר",
  "נובמבר",
  "דצמבר",
];

const SmallCart = ({ data }) => {
  return (
    <div className="flex sm:flex-nowrap flex-wrap sm:justify-between justify-center items-center gap-4 px-2 md:px-10">
      {data.item.map(
        (item, index) => (
          console.log("date:", item.date),
          (
            <div
              key={index}
              className="min-w-24 w-auto min-h-[90px] h-auto flex justify-center items-center bg-white bg-transparent bg-opacity-50 p-2 rounded-lg"
            >
              <div
                key={index}
                className="min-w-[70px] w-auto min-h-[70px] h-auto flex flex-col items-center justify-center   bg-white  shadow-md rounded-lg p-2  border-red-50"
              >
                <span className=" text-[#000000] text-xs font-bold text-center">
                  {months[moment(item?.date).month()]}
                </span>

                <span className="text-[#BF2033] text-lg font-extrabold">
                  {item.data}
                </span>

                <span className="text-[#8C8C8C] text-[10px] font-normal">
                  {"CM"}
                </span>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
};

export default SmallCart;
