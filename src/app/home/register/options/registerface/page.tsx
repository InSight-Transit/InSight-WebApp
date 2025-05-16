"use client";
import { useEffect, useRef } from "react";
import NavHeader from "@/app/header";
import ButtonLinks from "@/app/components/ButtonLinks";
import { useRouter } from "next/navigation";

import { auth } from "../../../../../../firebaseConfig";
 // Ensure you import Firebase
import authWrapper from "@/app/components/authWrapper";
import { signOut } from "../../../../../../auth.js";
import { useTranslation } from "react-i18next";

// changed to function to apply auth (user required)
function Welcome() {
  const { t } = useTranslation("common");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  
    // Original:
    // const [_base64Image, setBase64Image] = useState('');
    // const [, setBase64Image] = useState('');
  
    // const captureImage = () => {
    //   // Flush variable states when you click verify
    //   const video = videoRef.current;
    //   const canvas = canvasRef.current;
  
    //   if (!canvas) {
    //     console.error("Canvas element is not available.");
    //     return;
    //   }
    //   if (!video) {
    //     console.error("Video element is not available.");
    //     return;
    //   }
  
    //   const context = canvas.getContext('2d');
    //   if (!context) {
    //     console.error("Context element is not available.");
    //     return;
    //   }
  
    //   canvas.width = video.videoWidth;
    //   canvas.height = video.videoHeight;
  
    //   context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
    //   const base64Img = canvas.toDataURL('image/png');
    //   setBase64Image(base64Img);
  
    //   // Only send the image after it's set
    //   if (base64Img && base64Img !== "") {
    //     verify(base64Img);
    //   }
    // };
  
    // Convert base64 string to FormData and send it
    async function verify(base64Img: string) {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/addface`;
      console.log("API URL:", url);
      if (!url) {
        console.error("API base URL is not defined in environment variables.");
        return;
      }
  
      try {
        const user = auth.currentUser;
        if (!user) {
          console.error("User not authenticated");
          return;
        }

        // Convert base64 to Blob
        const byteCharacters = atob(base64Img.split(',')[1]);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset++) {
          byteArrays.push(byteCharacters.charCodeAt(offset));
        }
        const blob = new Blob([new Uint8Array(byteArrays)], { type: 'image/png' });
  
        // Create a FormData object and append the Blob
        const formData = new FormData();
        formData.append('file', blob, 'captured_image.png'); // 'file' matches the FastAPI UploadFile parameter name
        formData.append('user_id', user.uid); // Convert integer to string

        // Send the request with FormData
        const response = await fetch(url, {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
  
        const json = await response.json();
        console.log(json);

        await signOut(auth); // Sign out the user after creating
        router.push("/home/login");
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
      }, 10000);

      return () => clearInterval(interval);
    }, []);


  return (
    <div className="bg-sky-700 min-h-screen w-full">
      <NavHeader hideLogout/>
      <div className="flex flex-1 justify-center items-center">
        <h1 className="text-white text-[8vw] font-bold p-[5vw]">InSight</h1>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <h2 className="text-white text-[3vw] font-bold pb-[4vw]">{t("removeCover")}</h2>
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

      <ButtonLinks/>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
}

export default authWrapper(Welcome);