const CommonContainer = ({ children }) => {
  return (
    <div className="w-full bg-gradient-to-t from-[rgb(148,0,25)] to-[#FD4753] min-h-screen border-b-8 border-white sm:py-12 py-4">
      <div className="flex flex-col justify-center items-center sm:max-w-6xl max-w-sm mx-auto bg-white rounded-3xl p-2 md:p-10">
        {children}
      </div>
    </div>
  );
};

export default CommonContainer;
