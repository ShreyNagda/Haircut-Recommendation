import Link from "next/link";

export default function Home() {
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
                <h1 className="text-4xl font-bold text-center text-gray-900">
                    AI-Powered Hairstyle Recommendation
                </h1>
                <p className="text-lg text-center text-gray-700 mt-4 max-w-2xl">
                    Discover the perfect hairstyle tailored to your facial
                    structure and personal style using AI and computer vision.
                </p>
                <Link
                    href={"/form"}
                    className="mt-6 bg-blue-400 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
                >
                    Get Started
                </Link>
            </div>
            <div className="bg-gray-100">Face Shapes</div>
        </>
    );
}
