"use client";
import { useEffect, useRef, useState } from "react";
import ButtonLinks from "@/app/components/ButtonLinks";
import NavHeader from "@/app/header";
import { auth } from "../../../../../firebaseConfig"; // Ensure you import Firebase
import authWrapper from "@/app/components/authWrapper";

// changed to function to apply auth (user required)
function Welcome() {
  const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
  
    const [base64Image, setBase64Image] = useState('');
  
    const captureImage = () => {
      // Flush variable states when you click verify
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
  
      // Only send the image after it's set
      if (base64Img && base64Img !== "") {
        verify(base64Img);
      }
    };
  
    // Convert base64 string to FormData and send it
    async function verify(base64Img: string) {
      const url = "http://127.0.0.1:8000/api/addface";
  
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
  
        // Create formdata object for sending to API
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
    }, []);

  return (
    <div className="bg-sky-700 min-h-screen w-full">
      <NavHeader/>
      <div className="flex flex-1 justify-center items-center">
        <h1 className="text-white text-[8vw] font-bold p-[5vw]">InSight</h1>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <h2 className="text-white text-[3vw] font-bold pb-[4vw]">Please remove facial coverings</h2>
      </div>
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="flex flex-col items-center">
          <div className="bg-sky-700 p-6 rounded-lg">
            <video ref={videoRef} style={{ width: "100%", maxWidth: "500px" }} autoPlay />
          </div>
        </div>

      <ButtonLinks/>
      <button onClick={() => captureImage()}> Capture </button>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {/*base64Image && <img src={base64Image} alt="Captured frame" />*/}
      </div>
    </div>
  );
}

export default authWrapper(Welcome);