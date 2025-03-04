const CourseCart = ({ video }) => {
  return (
    <div className="w-full px-4">
      <h1 className="text-center py-6 text-2xl font-bold">
        {video?.videoTitle}
      </h1>
      <div className="w-full flex justify-center">
        <div className="w-full md:w-3/4 lg:w-2/3">
          <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
            <iframe
              src={video?.videoLink}
              className=" w-full h-full object-center"
              frameBorder="0"
              allow="autoplay"
              style={{ aspectRatio: "16/9" }}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCart;
