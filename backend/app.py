from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router
import os
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
UPLOAD_FOLDER = "uploads"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.include_router(router)
@app.get("/")
def root():
    return {"message": "API is working successfully!"}
@app.get("/version")
def version():
    return {"message": "API 1.0.0"}
