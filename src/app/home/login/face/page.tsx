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
    const accountId = json['Account ID'] || json['account_id'] || json['AccountID'];
    console.log(`Account ID: ${accountId}`);

    if (!accountId) {
      throw new Error("Account ID is missing from the API response.");
    }

    // Fetch the custom token from your backend
    const tokenResponse = await fetch("/api/generate-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId }),
    });

    if (!tokenResponse.ok) {
      throw new Error("Failed to fetch custom token from backend.");
    }

    const { customToken } = await tokenResponse.json();
    console.log("Custom token generated:", customToken);

    // Log in the user using the custom token
    const { getAuth, signInWithCustomToken } = await import("firebase/auth");
    const auth = getAuth();

    try {
      const userCredential = await signInWithCustomToken(auth, customToken);
      console.log("User logged in successfully:", userCredential.user);

      // Redirect to user profile page
      router.push("/login/userprofile");
    } catch (error) {
      console.error("Error logging in with custom token:", error);
    }
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

          video.onloadedmetadata = () => {
            // Check if video is already playing before calling play()
            const isPlaying =
              video.currentTime > 0 &&
              !video.paused &&
              !video.ended &&
              video.readyState > video.HAVE_CURRENT_DATA;

            if (!isPlaying) {
              const playPromise = video.play();
              if (playPromise !== undefined) {
                playPromise
                  .then(() => {
                    console.log("✅ Video playback started successfully.");
                  })
                  .catch((error) => {
                    console.warn("⚠️ Video playback prevented:", error);
                    // Optionally update UI to show paused state
                  });
              }
            }
          };
        } catch (err) {
          console.error("Error accessing webcam: ", err);
        }
      };

      getVideo();
    }

    // Use captureImage for periodic capture
    const interval = setInterval(() => {
      captureImage();
    }, 10000);

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
              muted
              autoPlay
              playsInline
              style={{ width: "100%", maxWidth: "500px" }}
            />
          </div>
        </div>
        <ButtonLinks />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
}