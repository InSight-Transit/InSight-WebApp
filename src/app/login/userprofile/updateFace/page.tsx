/*
  updateface page
  Deletes existing facial data in MongoDB and scans new facial data after confirmation.
*/

"use client";
import { useEffect, useRef, useState } from "react";
import NavHeader from "@/app/header";
import ButtonLinks from "@/app/components/ButtonLinks";
import { auth } from "../../../../../firebaseConfig";
import authWrapper from "@/app/components/authWrapper";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

function Welcome() {
  const { t } = useTranslation("common");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showConfirmation, setShowConfirmation] = useState(true);
  const router = useRouter();


  async function deleteFaceData() {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/deletefacedata`;

    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("User not authenticated");
        return;
      }

      const formData = new FormData();
      formData.append("user_id", user.uid);

      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);

      setShowConfirmation(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred.");
      }
    }
  }

  async function verify(base64Img: string) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/addface`;

    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("User not authenticated");
        return;
      }

      const byteCharacters = atob(base64Img.split(',')[1]);
      const byteArrays = [];
      for (let offset = 0; offset < byteCharacters.length; offset++) {
        byteArrays.push(byteCharacters.charCodeAt(offset));
      }
      const blob = new Blob([new Uint8Array(byteArrays)], { type: 'image/png' });

      const formData = new FormData();
      formData.append('file', blob, 'captured_image.png');
      formData.append('user_id', user.uid);

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);

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
                    console.log("Video playback started successfully.");
                  })
                  .catch((error) => {
                    console.warn("Video playback prevented:", error);
                    // Optionally update UI to show paused state
                  });
              }
            }
          };
        } catch (err) {
          console.error("Error accessing webcam:", err);
        }
      };

      getVideo();
    }

    const interval = setInterval(() => {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      if (!canvas || !video) {
        console.error("Canvas or video element is not available.");
        return;
      }

      const context = canvas.getContext('2d');
      if (!context) {
        console.error("Context is not available.");
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const base64Img = canvas.toDataURL('image/png');
      if (base64Img && base64Img !== "") {
        verify(base64Img);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

    return (
    <div className="bg-sky-700 min-h-screen w-full">
      <NavHeader />
      <div className="flex flex-1 justify-center items-center">
        <h1 className="text-white text-[8vw] font-bold p-[5vw]">InSight</h1>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <h2 className="text-white text-[3vw] font-bold pb-[4vw]">{t("removeCover")}</h2>
      </div>
      <div className="flex flex-col items-center justify-center flex-grow">
        {showConfirmation ? (
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-black text-lg font-semibold mb-4">
              {t("Are you sure you want to delete your face data?")}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  deleteFaceData();
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                {t("Confirm")}
              </button>
              <button
                onClick={() => router.push("/login/userprofile")}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                {t("Cancel")}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <div className="bg-sky-700 p-6 rounded-lg">
                <video ref={videoRef} style={{ width: "100%", maxWidth: "500px" }} autoPlay />
              </div>
            </div>
            <ButtonLinks />
            <canvas ref={canvasRef} style={{ display: "none" }} />
          </>
        )}
      </div>
    </div>
  );
}

export default authWrapper(Welcome);