import { UI_TEXT } from "@/constants/hebrewText";

const UserSearch = () => {
  return (
    <div>
      <input
        type="text"
        placeholder={UI_TEXT.userSearch}
        className="w-full px-4 py-2 rounded border-none focus:outline-none bg-[#E6F4FF]"
      />
    </div>
  );
};

export default UserSearch;
