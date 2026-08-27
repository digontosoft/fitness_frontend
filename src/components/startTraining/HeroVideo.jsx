import React from "react";
import ReactPlayer from "react-player";
import { twMerge } from "tailwind-merge";

const HeroVideo = ({
  videoUrl,
  className,
  compact = false,
  playing,
  muted = false,
}) => {
  return (
    <div className={twMerge("w-full rounded-lg", className)}>
      <div
        className={twMerge(
          "w-full overflow-hidden rounded-xl border border-gray-200 bg-black/5 relative",
          compact ? "aspect-video" : "sm:h-[500px] h-60"
        )}
      >
        {videoUrl ? (
          <div className="absolute inset-0">
            <ReactPlayer
              url={videoUrl}
              width="100%"
              height="100%"
              controls
              muted={muted}
              {...(typeof playing === "boolean" ? { playing } : {})}
            />
          </div>
        ) : (
          <div className="w-full h-full min-h-[160px] flex items-center justify-center text-sm text-gray-400">
            אין וידאו
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroVideo;
