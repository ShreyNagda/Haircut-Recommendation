# models.py
from tensorflow.keras.models import load_model
import joblib
import os

# Load the pre-trained models
# face_shape_model = load_model(os.path.join("output", "faceshape.keras"))
hair_style_model = joblib.load(os.path.join("output", "hairstyle_model.pkl"))
encoded_x_labels = joblib.load(os.path.join("output", "encoded_x_labels.pkl"))
encoded_y_labels = joblib.load(os.path.join("output", "encoded_y_labels.pkl"))
