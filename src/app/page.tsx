"use client";

import { useRef, useState } from "react";
import TypewriterText from "@/components/TypewriterText";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(true);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };
  return (
    <div className="flex min-h-[calc(100vh-7rem)] flex-col items-center justify-center gap-16 p-8 sm:p-20">
      <main className="flex w-full max-w-5xl flex-col items-center gap-8">
        {/* TypingName Component Above the Video */}
        <div className="flex justify-center items-center w-full">
          <TypewriterText text="Hello world! I'm Nicky ☁️" speed={75} />
        </div>

        {/* Video Component */}
        <div className="relative inline-block group">
          <video
            ref={videoRef}
            src="/animated-image.mp4"
            width={500}
            height={450}
            muted
            onClick={handleVideoClick}
            onPlay={() => setIsPaused(false)}
            onPause={() => setIsPaused(true)}
            onLoadedData={() =>
              setIsPaused(videoRef.current ? videoRef.current.paused : true)
            }
            loop
            className="cursor-pointer shadow-[35px_28px_13px_0px_rgba(59,_130,_246,_0.15)]"
          />
          {isPaused ? (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="rounded-full border border-white/40 bg-black/35 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/90 shadow-sm backdrop-blur-sm opacity-80">
                Click to Play
              </span>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
