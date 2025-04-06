// pages/form.tsx
"use client";
import { useState } from "react";
import GenderSelection from "../components/GenderSelection";
import { toast } from "react-toastify";
import axios from "axios";
import api from "../axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { X } from "lucide-react";
import { BeatLoader } from "react-spinners";
import CameraCapture from "../components/CameraCapture";

export default function Form() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        profession: "",
        hair_length: "",
        selfie: null as File | null,
        face_shape: "",
    });

    const handleNext = () => {
        if (step == 1) {
            if (!formData["name"]) {
                toast.error("Enter Name");
            } else if (!formData["age"]) {
                toast.error("Enter age");
            } else if (!formData["gender"]) {
                toast.error("Select gender");
            } else {
                setStep((prev) => prev + 1);
                console.log("Next");
            }
        } else if (step == 2) {
            if (formData["profession"] === "") {
                toast.error("Select Profession");
            } else if (formData["hair_length"] === "") {
                toast.error("Select Hair length");
            } else {
                setStep(3);
            }
        }
    };
    const handleBack = () => setStep(step - 1);
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        if (e.target.name === "age" && e.target.value <= "0") {
            return toast.error("Age should more than 1");
        }
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCameraCapture = (file: File) => {
        console.log(file);
        setFormData({ ...formData, selfie: file });
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({ ...formData, selfie: e.target.files[0] });
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        if (!formData.selfie) {
            toast.error("Please upload a selfie.");
            setLoading(false);
            return;
        }

        const formDataObj = new FormData();
        formDataObj.append("file", formData.selfie);

        try {
            const face_shape_response = await api.post(
                "/detect-face",
                formDataObj,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            const face_result = face_shape_response.data;
            setFormData({ ...formData, face_shape: face_result.face_shape });
            let age = "13-19";
            const _age = Number(formData["age"]);
            if (_age < 13) {
                age = "13-18";
            } else if (_age >= 13 && _age < 19) {
                age = "13-18";
            } else if (_age >= 19 && _age < 25) {
                age = "19-25";
            } else if (_age >= 26 && _age < 35) {
                age = "26-35";
            } else if (_age >= 36 && _age < 45) {
                age = "36-45";
            } else if (_age >= 45) {
                age = "36-45";
            }
            const formDataObj1 = new FormData();
            formDataObj1.append("face_shape", face_result.face_shape);
            formDataObj1.append("age", age);
            formDataObj1.append("gender", formData["gender"]);
            formDataObj1.append("hair_length", formData["hair_length"]);
            formDataObj1.append("profession", formData["profession"]);
            const hairstyle_response = await api.post(
                "/recommend-hairstyle",
                formDataObj1,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const hairstyle_result = hairstyle_response.data;
            console.log(hairstyle_result);
            setResult(hairstyle_result);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Upload failed", error);
            toast.error("Upload failed! " + error);
        }

        // console.log("Final Form Data:", formData);
        // alert("Form submitted successfully!");
        // router.push("/");
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-gray-600">
            <div className="absolute top-5 left-5">
                <Link href="/">
                    <X />
                </Link>
            </div>
            {loading && <BeatLoader color="blue" />}
            {!result && !loading && (
                <>
                    {step === 1 && (
                        <div className="w-full md:w-3/5 lg:w-[400px]">
                            <h2 className="text-2xl font-bold">
                                Step 1: Personal Details
                            </h2>
                            <input
                                name="name"
                                placeholder="Name"
                                onChange={handleChange}
                                value={formData["name"]}
                                className="border p-2 mt-2 w-full rounded-sm"
                            />
                            <input
                                name="age"
                                placeholder="Age"
                                type="number"
                                onChange={handleChange}
                                value={formData["age"]}
                                className="border p-2 mt-2 w-full rounded-sm"
                            />
                            <GenderSelection
                                handleChange={handleChange}
                                prevSelectedGender={formData["gender"]}
                            />
                            <div className="w-full flex items-end justify-end">
                                <button
                                    onClick={handleNext}
                                    className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="w-full md:w-3/5 lg:w-[400px]">
                            <h2 className="text-2xl font-bold">
                                Step 2: Select Profession & Hair length
                            </h2>
                            <select
                                name="profession"
                                onChange={handleChange}
                                value={formData["profession"]}
                                className="border p-2 rounded-sm pr-6 mt-2 w-full"
                            >
                                <option value="">Select Profession</option>
                                <option value="student">Student</option>
                                <option value="freelancer">Freelancer</option>
                                <option value="entrepreneur">
                                    Entrepreneur
                                </option>
                                <option value="professional">
                                    Professional
                                </option>
                                <option value="others">Others</option>
                            </select>
                            <select
                                name="hair_length"
                                onChange={handleChange}
                                className="border p-2 mt-2 w-full rounded-sm"
                                value={formData["hair_length"]}
                            >
                                <option value="">Select Hair Length</option>
                                <option value="short">Short</option>
                                <option value="medium">Medium</option>
                                <option value="long">Long</option>
                            </select>
                            <div className="flex justify-between gap-2 mt-4">
                                <button
                                    onClick={handleBack}
                                    className="bg-gray-600 text-white px-4 py-2 rounded"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="bg-indigo-500 text-white px-4 py-2 rounded"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="w-full md:w-3/5 lg:w-[400px]">
                            <h2 className="text-2xl font-bold">
                                Step 3: Upload Selfie
                            </h2>
                            {formData["selfie"] && (
                                <div className="flex flex-col items-center">
                                    <img
                                        src={URL.createObjectURL(
                                            formData["selfie"]!
                                        )}
                                        className="h-32 "
                                    />
                                    <p className="mt-2 text-gray-700">
                                        {formData["selfie"]?.name}
                                    </p>
                                </div>
                            )}
                            <div className="flex flex-col items-center">
                                {/* Hidden File Input */}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="fileInput"
                                />

                                {/* Button to Open File Dialog */}
                                <label
                                    htmlFor="fileInput"
                                    className="cursor-pointer border p-2 bg-indigo-500 text-white rounded"
                                >
                                    Choose a file
                                </label>

                                {/* File Name Display */}
                            </div>
                            <div className="flex justify-center pb-2">OR</div>
                            <CameraCapture onCapture={handleCameraCapture} />
                            <div className="flex justify-between gap-2 mt-4">
                                <button
                                    onClick={handleBack}
                                    className="bg-gray-600 text-white px-4 py-2 rounded"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="bg-green-600 text-white px-4 py-2 rounded"
                                >
                                    Get Recommendation
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}

            {result && !loading && (
                <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center justify-center gap-1">
                        <img
                            src={URL.createObjectURL(formData["selfie"]!)}
                            className="w-32 rounded-xl"
                        />
                        <div className="text-2xl font-bold text-center">
                            {formData["name"]}
                        </div>
                        <div className="text-lg md:text-xl">
                            Face Shape: {formData["face_shape"]}
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-center">
                        Recommended Hairstyles
                    </h2>
                    <ul className="flex flex-col gap-4 p-4 list-disc">
                        {Array.isArray(result["recommended_hairstyle"]) &&
                            (result?.["recommended_hairstyle"] ?? []).map(
                                (hr: any) => {
                                    console.log(hr);
                                    return <li key={hr}>{hr}</li>;
                                }
                            )}
                    </ul>
                    <Link
                        href={"/form"}
                        className="bg-blue-200 px-4 py-2 rounded-sm"
                    >
                        Back to Home
                    </Link>
                </div>
            )}
        </div>
    );
}
