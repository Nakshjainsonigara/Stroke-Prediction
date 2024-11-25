# Stroke Prediction Model

This project is an end-to-end **Stroke Prediction Model** deployed on the web. It predicts the likelihood of a stroke based on various health and demographic factors such as age, hypertension, heart disease, and more. The model was trained using a supervised machine learning algorithm and hosted on a web platform for easy access and usability.

You can access the deployed model [here](https://stroke-prediction.vercel.app/).

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Model Pipeline](#model-pipeline)
- [Installation](#installation)

## Overview
The project focuses on predicting the likelihood of a stroke for patients using a machine learning model. The data used includes attributes such as gender, age, hypertension, heart disease, average glucose level, and BMI. The model has been integrated into a web app where users can input their data to get predictions in real-time.

## Features
- **Prediction:** Predicts whether a person is likely to experience a stroke based on health metrics.
- **User-Friendly Interface:** Simple UI to input the necessary data and get predictions.
- **Deployed Model:** Accessible online, making it easy to share and use.

## Tech Stack
### Frontend:
- **React.js**: A JavaScript library for building the user interface.
- **CSS3**: Styling the interface for a clean, user-friendly experience.

### Backend:
- **Python**: Core programming language for model development.
- **FastAPI**: A modern, fast (high-performance) web framework used for the backend API.

### Machine Learning:
- **Scikit-learn**: Used for model building and evaluation. The model is based on **Linear Discriminant Analysis (LDA)** for classification.
- **Pandas & NumPy**: Data preprocessing and manipulation.
- **Joblib**: For saving and loading the trained model efficiently.

### Deployment:
- **Render**: For deploying the backend API.
- **Vercel**: For deploying the React frontend.

## Model Pipeline
1. **Data Preprocessing**:
   - Handle missing data.
   - Feature scaling and encoding for categorical data.
   
2. **Model Building**:
   - Implemented **Linear Discriminant Analysis (LDA)** for classification.
   - Evaluated with metrics like accuracy, precision, recall, and F1-score.
   
3. **Deployment**:
   - The model was saved using `joblib`.
   - Backend deployed using FastAPI on **Render**.
   - Frontend deployed using React on **Vercel**.

## Installation
To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/stroke-prediction.git
