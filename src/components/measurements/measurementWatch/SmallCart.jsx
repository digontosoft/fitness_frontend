import moment from "moment";

const months = ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר']

const SmallCart = ({ data }) => {
  return (
    <div className="flex justify-between items-center gap-4 px-2 md:px-10">
      {data.item.map(
        (item, index) => (
          console.log("date:", item.date),
          (
            <div
              key={index}
              className="min-w-32 w-auto flex justify-center items-center bg-white bg-transparent bg-opacity-50 p-2 rounded-lg"
            >
              <div
                key={index}
                className="min-w-28 w-auto flex flex-col items-center justify-center   bg-white  shadow-md rounded-lg p-2  border-red-50"
              >
                <span className=" text-[#000000] text-sm font-bold text-center">
                  {months[moment(item?.date).month()]}
                </span>

                <span className="text-[#BF2033] text-2xl font-extrabold pt-4">
                  {item.data}
                </span>

                <span className="text-[#8C8C8C] text-[10px] font-normal">
                  {"SM"}
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
