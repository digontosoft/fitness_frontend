const CourseCart = ({ video }) => {
  return (
    <div className="w-full px-4">
      <h1 className="text-center py-6 text-2xl font-bold">
        {video?.videoTitle}
      </h1>
      <div className="w-full flex justify-center">
        <div className="w-full md:w-3/4 lg:w-2/3">
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

          {/* <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/iajv8y-6n3Q?si=BR-YRbRtp3r8r_hG"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe> */}
        </div>
      </div>
    </div>
  );
};

export default CourseCart;
