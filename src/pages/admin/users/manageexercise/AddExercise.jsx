import BasicButton from "@/components/admin/components/ui/BasicButton";
import FormTitle from "@/components/admin/components/ui/FormTitle";
import BackDashBoardButton from "@/shared/BackDashBoardButton";
import Container from "@/shared/Container";
import { Upload } from "lucide-react";

const AddExercise = () => {
  return (
    <Container className="sm:px-0 px-4">
      <section>
        <FormTitle title="Add Exercise" />
        <form action="" className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 rounded border-none focus:outline-none bg-[#FAEAEB]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Area</label>
            <input
              type="text"
              placeholder="Area"
              className="w-full px-4 py-2 rounded border-none focus:outline-none bg-[#FAEAEB]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Equipment</label>
            <select
              name=""
              id=""
              className="w-full px-4 py-2 rounded border-none focus:outline-none bg-[#FAEAEB]"
            >
              <option value="" disabled>
                Select Equipment
              </option>
              <option value="">TRX</option>
              <option value="">Bands</option>
              <option value="">Weights</option>
              <option value="">Mechins</option>
              <option value="">Bars</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Description</label>
            <textarea
              type="text"
              placeholder="User Search"
              className="w-full px-4 py-5 rounded border-none focus:outline-none bg-[#FAEAEB]"
            />
          </div>
          <div className="flex flex-col gap-2 my-2">
            <label
              htmlFor="image"
              className="text-base bg-[#FAEAEB] text-black font-medium text-center cursor-pointer block h-full w-full py-16 rounded-md grid justify-items-center items-center gap-2"
            >
              <span>
                <Upload />
              </span>
              Click here to upload your file
            </label>
            <input
              type="file"
              placeholder="Upload Image"
              className="hidden"
              id="image"
              name="image"
              accept="image/*"
            />
          </div>
          <BasicButton
            title="Submit"
            className="bg-[#FAEAEB] hover:bg-[#FAEAEB] text-black hover:text-black"
          ></BasicButton>
        </form>
        <BackDashBoardButton className="mt-10" />
      </section>
    </Container>
  );
};

export default AddExercise;
