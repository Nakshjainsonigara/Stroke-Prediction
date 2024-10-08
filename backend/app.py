import nest_asyncio
nest_asyncio.apply()

from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
from sklearn.pipeline import Pipeline
from fastapi.middleware.cors import CORSMiddleware


# Load your pre-trained model and preprocessing pipeline
model = joblib.load('lda_model.pkl')
preprocessing_pipeline = joblib.load('preprocessing_pipeline.pkl')  # Assuming you saved the pipeline too

# Initialize FastAPI app
app = FastAPI()

# Allow your frontend to communicate with your backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update with your frontend URL if deployed
    allow_credentials=True,
    allow_methods=["*"],  # Or restrict methods like ['GET', 'POST']
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
