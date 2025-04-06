import { useEffect, useRef, useState } from "react";

const CameraCapture = ({ onCapture }: { onCapture: (file: File) => void }) => {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // Open Camera and Start Live Preview
    const openCamera = async () => {
        try {
            console.log("Opening camera...");
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { aspectRatio: 9 / 16 }, // Force Portrait Mode (9:16)
            });

            setStream(mediaStream);

            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
                videoRef.current.play();
                console.log("Video element found, setting stream.");
            } else {
                console.warn("Video element is still null");
            }
        } catch (error) {
            console.error("Error accessing camera:", error);
        }
    };

    // Ensure video element gets assigned correctly
    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            console.log("Video element assigned after re-render.");
        }
    }, [stream]);

    // Capture Photo with Fixed 300px Height and 9:16 Ratio
    const capturePhoto = () => {
        if (!videoRef.current || !canvasRef.current) {
            console.error("Video or canvas not found");
            return;
        }

        console.log("Capturing photo...");
        const canvas = canvasRef.current;
        const video = videoRef.current;
        const context = canvas.getContext("2d");

        const height = 300; // Fixed height
        const width = height * (9 / 16); // Maintain 9:16 ratio

        canvas.width = width;
        canvas.height = height;

        if (context) {
            context.save(); // Save the default state
            context.scale(-1, 1); // Flip horizontally to correct mirroring
            context.drawImage(video, -width, 0, width, height);
            context.restore(); // Restore the default state
        }

        canvas.toBlob((blob) => {
            if (!blob) {
                console.error("Failed to capture image");
                return;
            }
            const file = new File([blob], "captured_image.jpg", {
                type: "image/jpeg",
            });
            onCapture(file);
        }, "image/jpeg");
        stopCamera();
    };

    // Stop Camera
    const stopCamera = () => {
        console.log("Stopping camera...");
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
        }
        setStream(null);
    };

    return (
        <div className="flex flex-col items-center">
            {!stream ? (
                <button
                    onClick={openCamera}
                    className="border p-2 bg-indigo-500 text-white rounded"
                >
                    Open Camera
                </button>
            ) : (
                <>
                    {/* Video Preview with Fixed 300px Height */}
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="mt-2 border rounded"
                        style={{
                            width: "auto",
                            height: "300px",
                            transform: "scaleX(-1)",
                        }} // Flip preview for consistency
                    ></video>

                    {/* Hidden Canvas (9:16 Aspect Ratio, Fixed Height 300px) */}
                    <canvas ref={canvasRef} className="hidden"></canvas>

                    <button
                        onClick={capturePhoto}
                        className="border p-2 mt-2 bg-green-500 text-white rounded"
                    >
                        Capture Photo
                    </button>
                    <button
                        onClick={stopCamera}
                        className="border p-2 mt-2 bg-red-500 text-white rounded"
                    >
                        Close Camera
                    </button>
                </>
            )}
        </div>
    );
};

export default CameraCapture;
