const CourseCart = ({ video }) => {
  return (
    <div className="w-full px-4">
      <h1 className="text-center py-6 text-2xl font-bold" dir="rtl">
        {video?.videoTitle}
      </h1>
      <div className="w-full flex justify-center">
        <div className="w-full md:w-3/4 lg:w-2/3">
          <div
            className="voomly-embed"
            data-id={video?.videoLink}
            data-ratio="0.562500"
            data-type="v"
            data-skin-color="rgba(209,43,40,1)"
            data-shadow=""
            style={{
              width: "100%",
              aspectRatio: "0.5625 / 1",
              background:
                "linear-gradient(45deg, rgb(142, 150, 164) 0%, rgb(201, 208, 222) 100%)",
              borderRadius: "10px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CourseCart;
