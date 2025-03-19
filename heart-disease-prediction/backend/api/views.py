# api/views.py
import pickle
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from sklearn.preprocessing import StandardScaler
import numpy as np

# Load the models from pickle files
with open(r'D:\test\github\AI-Nutrionist-using-Gemini-Pro\heart-disease-prediction\resources\jupyter notebook\models\k_neighbors_classifiers_model.pkl', 'rb') as f:
    decision_tree_model = pickle.load(f)

with open(r'D:\test\github\AI-Nutrionist-using-Gemini-Pro\heart-disease-prediction\resources\jupyter notebook\models\random_forest_classifier_model.pkl', 'rb') as f:
    random_forest_model = pickle.load(f)

with open(r'D:\test\github\AI-Nutrionist-using-Gemini-Pro\heart-disease-prediction\resources\jupyter notebook\models\logistic_regression_model.pkl', 'rb') as f:
    logistic_regression_model = pickle.load(f)

# Input validation can be added based on parameter types (optional)

@api_view(['POST'])
def predict(request):
    try:
        data = request.data
        features = np.array([
            data['age'],
            data['sex'],
            data['cp'],
            data['trestbps'],
            data['chol'],
            data['fbs'],
            data['restecg'],
            data['thalach'],
            data['exang'],
            data['oldpeak'],
            data['slope'],
            data['ca'],
            data['thal']
        ]).reshape(1, -1)

        # Standardize the features (important for some models like logistic regression)
        scaler = StandardScaler()
        features_scaled = scaler.fit_transform(features)

        # Get predictions from all models
        predictions = {
            "decision_tree": decision_tree_model.predict(features_scaled)[0],
            "random_forest": random_forest_model.predict(features_scaled)[0],
            "logistic_regression": logistic_regression_model.predict(features_scaled)[0]
        }

        return Response(predictions)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
