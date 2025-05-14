"use client";
import { useEffect, useRef, useState } from "react";
import ButtonLinks from "@/app/components/ButtonLinks";
import NavHeader from "@/app/header";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function Welcome() {
  const { t } = useTranslation("common");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  const setBase64Image = useState('')[1];

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!canvas) {
      console.error("Canvas element is not available.");
      return;
    }
    if (!video) {
      console.error("Video element is not available.");
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      console.error("Context element is not available.");
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64Img = canvas.toDataURL('image/png');
    setBase64Image(base64Img);

    if (base64Img && base64Img !== "") {
      verify(base64Img);
    }
  };

  async function verify(base64Img: string) {
    const url = "http://127.0.0.1:8000/api/search";

    try {
      const byteCharacters = atob(base64Img.split(',')[1]);
      const byteArrays = [];
      for (let offset = 0; offset < byteCharacters.length; offset++) {
        byteArrays.push(byteCharacters.charCodeAt(offset));
      }
      const blob = new Blob([new Uint8Array(byteArrays)], { type: 'image/png' });

      const formData = new FormData();
      formData.append('file', blob, 'captured_image.png');

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json['Account ID']);
      // Redirect to user profile page
      setTimeout(() => {
      router.push("/login/userprofile");
      }, 5000);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred.");
      }
    }
  }

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

    // Automatically capture and verify every 3 seconds
    const interval = setInterval(() => {
      captureImage();
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-sky-700 min-h-screen w-full">
      <NavHeader />
      <div className="flex flex-1 justify-center items-center">
        <h1 className="text-white text-[8vw] font-bold p-[5vw]">InSight</h1>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <h2 className="text-white text-[3vw] font-bold pb-[4vw]">{t("pleaseScan")}</h2>
      </div>
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="flex flex-col items-center">
          <div className="bg-sky-700 p-6 rounded-lg">
            <video
              ref={videoRef}
              style={{ width: "100%", maxWidth: "500px", transform: "scaleX(-1)" }}
              autoPlay
            />
          </div>
        </div>
        <ButtonLinks />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
}