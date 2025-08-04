"use client";

import Image from "next/image";
import { useRef } from "react";
import TypewriterText from "@/components/TypewriterText";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* TypingName Component Above the Video */}
        <div className="flex justify-center items-center w-full">
          <TypewriterText text="Hello world! I'm Nicky ☁️" speed={75} />
        </div>

        {/* Video Component */}
        <video
          ref={videoRef}
          src="/animated-image.mp4"
          width={500}
          height={450}
          muted
          onClick={handleVideoClick}
          loop
          className="cursor-pointer shadow-[35px_28px_13px_0px_rgba(59,_130,_246,_0.15)]"
        />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.linkedin.com/in/nickyjchoi/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/linkedin.svg"
            alt="LinkedIn icon"
            width={16}
            height={16}
          />
          LinkedIn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/blog"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/blog-48.png"
            alt="Blog icon"
            width={16}
            height={16}
          />
          Blog
        </a>
      </footer>
    </div>
  );
}
