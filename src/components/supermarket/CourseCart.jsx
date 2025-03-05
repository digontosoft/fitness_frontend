const CourseCart = ({ video }) => {
  console.log("vdeo link", video.videoLink);
  return (
    <div className="w-full px-4">
      <h1 className="text-center py-6 text-2xl font-bold" dir="rtl">
        {video?.videoTitle}
      </h1>
      <div className="w-full flex justify-center">
        <div className="w-full md:w-3/4 lg:w-2/3">
<<<<<<< HEAD
          <iframe
            src={video?.videoLink}
            // src={
            //   "https://res.cloudinary.com/dt3qrt76n/video/upload/v1716032300/Videos/Course_Status_Programming_Hero_9_ivnnxe.mp4"
            // }
            width="100%"
            height="500px"
            allow="autoplay"
            className="aspect-video overflow-hidden object-cover"
          ></iframe>
=======
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
>>>>>>> d6e14cc7face000fa94eb10bbbb078ad7ff9532d
        </div>
      </div>
    </div>
  );
};

export default CourseCart;
