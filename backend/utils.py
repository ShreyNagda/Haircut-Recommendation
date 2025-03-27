# utils.py
import cv2
import numpy as np
import os
from backend.models import face_shape_model, hair_style_model, encoded_x_labels, encoded_y_labels

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}
UPLOAD_FOLDER = "uploads"

# Function to check allowed file extensions
def allowed_file(filename: str) -> bool:
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

# Function to detect face in an image
def detect_face(file_path: str) -> bool:
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
    img = cv2.imread(file_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
    return len(faces) > 0

# Function to get face shape
def get_face_shape(file_path: str) -> str:
    classes = ["diamond", "heart", "oblong", "oval", "round", "square", "triangle"]
    img = cv2.imread(file_path)
    img = cv2.resize(img, (256, 256))
    img = np.reshape(img, [1, 256, 256, 3])
    predictions = face_shape_model.predict(img)
    z = np.argmax(predictions)
    return classes[z]

def recommend_hairstyle(face_shape, age_range,profession, gender, hair_length):
    try:

        input_data = {
            "Face Shape": face_shape,
            "Age Range": age_range,
            "Profession": profession,
            "Gender": gender,
            "Hair Length": hair_length
        }

        # Check if encoders are loaded
        if not encoded_x_labels:
            raise ValueError("Encoded labels dictionary is empty!")

        # Encode the input data using preloaded encoders
        encoded_sample = []
        for col in encoded_x_labels:
            print(col)
            if input_data[col] not in encoded_x_labels[col].classes_:
                raise ValueError(f"Value '{input_data[col]}' not in known classes for column '{col}'")

            encoded_value = encoded_x_labels[col].transform([input_data[col]])[0]
            print(encoded_value)
            encoded_sample.append(encoded_value)

        encoded_sample = np.array(encoded_sample).reshape(1, -1)
        print("Encoded sample:", encoded_sample)

        # Predict hairstyle recommendations
        predicted_labels = hair_style_model.predict(encoded_sample)
        print("Predicted labels:", predicted_labels)

        # Decode predictions
        decoded_predictions = [
            encoded_y_labels[col].inverse_transform([predicted_labels[0][i]])[0]
            for i, col in enumerate(encoded_y_labels)
        ]

        return decoded_predictions

    except Exception as e:
        print(f"Error in recommendation: {str(e)}")
        return {"error": str(e)}
