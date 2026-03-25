import moment from "moment";
import bgCard from "@/assets/image/image.svg";
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

const SmallCart = ({ data, setOpen, setId }) => {
  const items = Array.isArray(data?.item) ? data.item : [];
  const visibleItems = items.filter((it) => it?.data !== 0 && it?.data !== "0");

  if (visibleItems.length === 0) return null;

  return (
    <div
      dir="rtl"
      className="relative flex sm:flex-nowrap flex-wrap sm:justify-between justify-center items-center gap-4 px-2 md:px-10"
    >
      <div className="absolute -top-[77px] -right-[145px] sm:-right-[95px]">
        <img src={bgCard} alt="" className="w-[180px] h-full" />
      </div>
      {visibleItems.map((item, index) => (
        <div
          key={item.id ?? `${item.date ?? "date"}-${index}`}
          onClick={() => {
            setOpen(true);
            setId(item.id);
          }}
          className="min-w-24 w-auto min-h-[90px] h-auto flex flex-col justify-center items-center bg-white p-2 rounded-lg cursor-pointer"
        >
          <span dir="rtl" className=" text-[#000000] text-base font-black text-center">
            {months[moment(item?.date).month()]}
          </span>

          <span className="text-[#7994CB] text-xl font-extrabold">
            {item?.data ?? "—"}
          </span>

          <span className="text-[#8C8C8C] text-[10px] font-normal">
            {"ס׳׳מ"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SmallCart;

{
  /* <div
                key={index}
                className="min-w-[70px] w-auto min-h-[70px] h-auto flex flex-col items-center justify-center   bg-white  shadow-md rounded-lg p-2  border-[#7994CB]/10 cursor-pointer"
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
              </div> */
}
