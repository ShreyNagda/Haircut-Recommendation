FROM python:3.10

WORKDIR /app
COPY backend /app/backend

RUN pip install --no-cache-dir -r backend/requirements.txt

CMD ["uvicorn", "backend.app:app", "--host", "0.0.0.0", "--port", "8000"]
