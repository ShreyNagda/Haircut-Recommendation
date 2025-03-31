"use client";
import { useState } from "react";
import { motion, spring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const faceShapes = [
    { name: "Oval", image: "/oval.jpeg" },
    { name: "Round", image: "/round.jpeg" },
    { name: "Square", image: "/square.jpeg" },
    { name: "Heart", image: "/heart.jpeg" },
    { name: "Diamond", image: "/diamond.jpeg" },
    { name: "Oblong", image: "/oblong.jpeg" },
    { name: "Triangle", image: "/triangle.jpeg" },
];

const hairstyles = [
    { name: "Asymetric Wolf Cut", image: "/asymetric cut.jpeg" },
    { name: "Modern Quiff", image: "/modern quiff.jpeg" },
    { name: "Soft Layered Curls", image: "/soft layered curls.jpeg" },
    { name: "Buzz Cut", image: "/buzz cut.jpg" },
];

export default function HaircutLandingPage() {
    return (
        <div className="text-white min-h-screen">
            {/* Hero Section */}
            <section
                className="relative h-screen flex items-center justify-center bg-cover bg-center"
                style={{
                    backgroundImage: "url('/bg.jpg')",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/60 to-black"></div>
                <motion.div
                    className="relative text-center max-w-3xl p-6"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="text-2xl font-bold tracking-wide text-indigo-400 uppercase">
                        CUTCRAFT.AI
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mt-4">
                        Discover Your{" "}
                        <span className="text-indigo-400">Perfect Haircut</span>
                    </h1>

                    {/* Subtext */}
                    <p className="text-lg md:text-xl text-gray-300 mt-4 max-w-2xl">
                        Our AI analyzes your{" "}
                        <span className="font-semibold text-white">
                            face shape, age, gender, and profession
                        </span>{" "}
                        to recommend the most flattering hairstyle tailored just
                        for you.
                    </p>

                    {/* Call-to-Action */}
                    <div className="mt-8">
                        <Link
                            href={"/form"}
                            className="px-6 py-3 md:text-lg font-medium rounded-full bg-indigo-500 hover:bg-indigo-600 transition-all shadow-md"
                        >
                            Get Your AI Haircut Suggestion
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="min-h-screen flex justify-center flex-col px-6 text-center bg-gradient-to-b from-black via-black/50 to-gray-900">
                <h2 className="text-4xl font-bold mb-10">
                    Why Choose Our System?
                </h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <FeatureCard
                        title="AI-Powered Analysis"
                        description="Our advanced AI analyzes your facial features for the best haircut recommendations."
                    />
                    <FeatureCard
                        title="Personalized Suggestions"
                        description="Get tailored hairstyle suggestions based on your unique features."
                    />
                    <FeatureCard
                        title="Diverse Hairstyles"
                        description="Explore a variety of hairstyles that match your personality and lifestyle."
                    />
                </div>
            </section>

            {/* Face Shapes Section */}
            <section className="py-20 text-center bg-gradient-to-b from-gray-900 via-gray-900/50 to-black">
                <h2 className="text-4xl font-bold mb-10">
                    7 Face Shapes We Analyze
                </h2>
                <div className="flex flex-wrap gap-2 md:gap-6 justify-center w-full md:w-[600px] mx-auto">
                    {faceShapes.map((shape, index) => (
                        <div
                            key={index}
                            className="p-3 shadow bg-white rounded-md text-black space-y-2"
                        >
                            <img
                                src={`/faceshapes${shape.image}`}
                                alt=""
                                className="rounded-full scale-75 w-[70px] md:w-[90px]"
                            />
                            <div>{shape.name}</div>
                        </div>
                    ))}
                </div>
            </section>
            <section className="min-h-screen flex items-center justify-center flex-col text-center bg-gradient-to-b from-black via-black to bg-gray-900">
                <h2 className="text-4xl font-bold mb-10">
                    Some trendy haircuts
                </h2>
                <div className="p-2 grid grid-cols-2 md:grid-cols-4 gap-x-2 md:gap-x-6 justify-center w-full md:w-[600px] mx-auto overflow-hidden">
                    {hairstyles.map((style, index) => (
                        <motion.div
                            key={index}
                            initial={{
                                x: `${index + 1 > 2 ? "" : "-"}${1000}%`,
                            }}
                            animate={{ x: 0 }}
                            transition={{
                                delay: (0.2 * index) / 2,
                                duration: 2,
                                type: spring,
                                bounce: 0.2,
                            }}
                            className="p-3 shadow bg-white rounded-md text-black space-y-2"
                        >
                            <img
                                src={`/hairstyles${style.image}`}
                                alt=""
                                className="mx-auto w-[100px] h-[120px] object-top object-cover"
                            />
                            <div className="line-clamp-2"> {style.name}</div>
                        </motion.div>
                    ))}
                    <motion.div
                        className="text-end w-full col-span-4 py-2"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ delay: 5 * 0.2 }}
                    >
                        AND MANY MORE...
                    </motion.div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="py-6 bg-gray-900 text-center text-gray-400">
                <p>
                    &copy; 2025 Haircut Recommendation System. All rights
                    reserved.
                </p>
            </footer>
        </div>
    );
}

function FeatureCard({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <motion.div
            className="p-6 rounded-xl shadow-lg bg-white text-black"
            whileHover={{ scale: 1.05 }}
        >
            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            <p className="text-gray-600 line-clamp-4">{description}</p>
        </motion.div>
    );
}
