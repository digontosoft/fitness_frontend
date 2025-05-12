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
  return (
    <div className="relative flex sm:flex-nowrap flex-wrap sm:justify-between justify-center items-center gap-4 px-2 md:px-10">
      <div className="absolute -top-[77px] -right-[86px]">
        <img src={bgCard} alt="" className="w-[250px] h-full" />
      </div>
      {data.item.map(
        (item, index) => (
          console.log("date:", item.date),
          (
            <div
              key={index}
              onClick={() => {
                setOpen(true);
                setId(item.id);
              }}
              className="min-w-24 w-auto min-h-[90px] h-auto flex flex-col justify-center items-center bg-white p-2 rounded-lg"
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
          )
        )
      )}
    </div>
  );
};

export default SmallCart;

{
  /* <div
                key={index}
                className="min-w-[70px] w-auto min-h-[70px] h-auto flex flex-col items-center justify-center   bg-white  shadow-md rounded-lg p-2  border-red-50 cursor-pointer"
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
