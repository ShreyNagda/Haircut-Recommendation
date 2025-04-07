from fastapi import APIRouter, File, UploadFile, HTTPException, Form
from fastapi.responses import JSONResponse
from werkzeug.utils import secure_filename
import os
from utils import allowed_file, detect_face,  recommend_hairstyle
from face_shape import analyze_face_shape

router = APIRouter()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# 📍 Route 1: Upload Image & Detect Face Shape
@router.post("/api/detect-face")
async def detect_face_shape(file: UploadFile = File(...)):
    """
    Uploads an image, detects if a face is present, and returns the detected face shape.
    """
    filename = secure_filename(file.filename)

    if not allowed_file(filename):
        raise HTTPException(status_code=400, detail="File type not allowed")

    file_path = os.path.join(UPLOAD_FOLDER, filename)

    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    if not detect_face(file_path):
        raise HTTPException(status_code=400, detail="No face detected in the image")

    face_shape = analyze_face_shape(file_path)
    # print(face_shape)
    return JSONResponse(content=face_shape)

@router.post("/api/recommend-hairstyle")
async def get_hairstyle_recommendation(
    face_shape: str = Form(...),
    age: str = Form(...),
    gender: str = Form(...),
    hair_length: str = Form(...),
    profession: str = Form(...)
):
    """
    Takes face shape, age, gender, hair length, and profession to recommend hairstyles.
    """
    recommended_hairstyle = recommend_hairstyle(face_shape, age,profession, gender, hair_length)
    print(recommended_hairstyle)
    return JSONResponse(content={
        "face_shape": face_shape,
        "recommended_hairstyle": recommended_hairstyle
    })
    pass
