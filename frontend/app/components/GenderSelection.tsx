import { useState } from "react";

const GenderSelection = ({
    handleChange,
    prevSelectedGender,
}: {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    prevSelectedGender: string | null;
}) => {
    const [selectedGender, setSelectedGender] = useState<string | null>(
        prevSelectedGender
    );

    const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedGender(e.target.value);
        handleChange(e); // Pass data to the parent handler
    };

    return (
        <div className="mt-2">
            <div className="flex justify-center gap-3">
                {["male", "female"].map((gender) => (
                    <label
                        key={gender}
                        className={`cursor-pointer px-6 py-3 rounded-lg border text-center w-32
                            ${
                                selectedGender === gender
                                    ? "text-gray-700 border-blue-500 border-2"
                                    : "bg-white text-gray-700 border-gray-300 "
                            }`}
                    >
                        <input
                            type="radio"
                            name="gender"
                            value={gender}
                            onChange={handleGenderChange}
                            className="hidden"
                        />
                        {gender.charAt(0).toUpperCase() + gender.slice(1)}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default GenderSelection;
