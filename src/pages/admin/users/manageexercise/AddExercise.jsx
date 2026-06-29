import BasicButton from "@/components/admin/components/ui/BasicButton";
import FormTitle from "@/components/admin/components/ui/FormTitle";
import { UI_TEXT } from "@/constants/hebrewText";
import BackDashBoardButton from "@/shared/BackDashBoardButton";
import Container from "@/shared/Container";
import { Upload } from "lucide-react";

const AddExercise = () => {
  return (
    <Container className="sm:px-0 px-4">
      <section>
        <FormTitle title={UI_TEXT.addExercise} />
        <form action="" className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="exercise-name">{UI_TEXT.name}</label>
            <input
              id="exercise-name"
              type="text"
              placeholder={UI_TEXT.name}
              className="w-full px-4 py-2 rounded border-none focus:outline-none bg-[#E6F4FF]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="exercise-area">{UI_TEXT.area}</label>
            <input
              id="exercise-area"
              type="text"
              placeholder={UI_TEXT.area}
              className="w-full px-4 py-2 rounded border-none focus:outline-none bg-[#E6F4FF]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="exercise-equipment">{UI_TEXT.equipment}</label>
            <select
              id="exercise-equipment"
              name="equipment"
              className="w-full px-4 py-2 rounded border-none focus:outline-none bg-[#E6F4FF]"
            >
              <option value="" disabled>
                {UI_TEXT.selectEquipment}
              </option>
              <option value="trx">TRX</option>
              <option value="bands">Bands</option>
              <option value="weights">Weights</option>
              <option value="machines">Machines</option>
              <option value="bars">Bars</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="exercise-description">{UI_TEXT.description}</label>
            <textarea
              id="exercise-description"
              placeholder={UI_TEXT.description}
              className="w-full px-4 py-5 rounded border-none focus:outline-none bg-[#E6F4FF]"
            />
          </div>
          <div className="flex flex-col gap-2 my-2">
            <label
              htmlFor="image"
              className="text-base bg-[#E6F4FF] text-black font-medium text-center cursor-pointer block h-full w-full py-16 rounded-md grid justify-items-center items-center gap-2"
            >
              <span>
                <Upload />
              </span>
              {UI_TEXT.uploadFileHint}
            </label>
            <input
              type="file"
              className="hidden"
              id="image"
              name="image"
              accept="image/*"
            />
          </div>
          <BasicButton
            title={UI_TEXT.submit}
            className="bg-[#E6F4FF] hover:bg-[#E6F4FF] text-black hover:text-black"
          ></BasicButton>
        </form>
        <BackDashBoardButton className="mt-10" />
      </section>
    </Container>
  );
};

export default AddExercise;
