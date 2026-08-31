const CommonContainer = ({ children }) => {
  return (
    <div className="w-full bg-[#E8EEF8] min-h-screen sm:py-8 py-4 px-2 sm:px-4">
      <div className="flex flex-col w-full sm:max-w-6xl max-w-lg mx-auto bg-white rounded-3xl p-4 sm:p-8 md:p-10 shadow-sm border border-white/60">
        {children}
      </div>
    </div>
  );
};

export default CommonContainer;
