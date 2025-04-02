"use client";
import { useEffect, useRef } from "react";
import ButtonLinks from "@/app/components/ButtonLinks";
import NavHeader from "@/app/header";

export default function Welcome() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const getVideo = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          video.srcObject = stream;
          await video.play();
        } catch (err) {
          console.error("Error accessing webcam: ", err);
        }
      };
      getVideo();
    }
  }, []);

  return (
    <div className="bg-sky-700 min-h-screen w-full">
      <NavHeader />
      <div className="flex flex-1 justify-center items-center">
        <h1 className="text-white text-[8vw] font-bold p-[5vw]">InSight</h1>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <h2 className="text-white text-[3vw] font-bold pb-[4vw]">Please scan your face</h2>
      </div>
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="flex flex-col items-center">
          <div className="bg-sky-700 p-6 rounded-lg">
            <video ref={videoRef} style={{ width: "100%", maxWidth: "500px" }} autoPlay />
          </div>
        </div>
        <ButtonLinks />
      </div>
    </div>
  );
}