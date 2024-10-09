import nest_asyncio
nest_asyncio.apply()

from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
from sklearn.pipeline import Pipeline
from fastapi.middleware.cors import CORSMiddleware
import os

current_directory = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_directory, 'lda_model.pkl')
preprocessing_path = os.path.join(current_directory, 'preprocessing_pipeline.pkl')

# Load the model
model = joblib.load(model_path)
preprocessing_pipeline = joblib.load(preprocessing_path)  # Assuming you saved the pipeline too

# Initialize FastAPI app
app = FastAPI()

# Allow your frontend to communicate with your backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this to your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define a root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to the Stroke Prediction API"}

# Define the request body using Pydantic
class StrokePredictionRequest(BaseModel):
    avg_glucose_level: float
    bmi: float
    age: float
    hypertension: int
    heart_disease: int
    ever_married: str
    work_type: str
    Residence_type: str
    smoking_status: str

@app.post('/predict')
def predict(request: StrokePredictionRequest):
    # Convert the request into a DataFrame
    data = pd.DataFrame([request.dict()])

    # Preprocess the input data (apply the same transformations as during training)
    X_transformed = preprocessing_pipeline.transform(data)

    # Make a prediction
    prediction = model.predict(X_transformed)

    # Return the prediction result
    return {'stroke_prediction': int(prediction[0])}

# Run the app in a separate thread
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host='127.0.0.1', port=8000)
