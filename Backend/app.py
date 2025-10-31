# from flask import Flask, request, jsonify
# import joblib
# import pandas as pd

# app = Flask(__name__)

# # Load model and feature list
# model = joblib.load("fraud_detection_model.pkl")
# feature_columns = joblib.load("fraud_feature_columns.pkl")  # must match model features

# @app.route('/')
# def home():
#     return "welcome to ZapAI"

# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         # Get JSON data from request
#         data = request.get_json()

#         # Validate input
#         if not isinstance(data, list) or len(data) != len(feature_columns):
#             return jsonify({
#                 "error": f"Expected {len(feature_columns)} feature values, got {len(data)}."
#             }), 400

#         # Convert to DataFrame
#         input_df = pd.DataFrame([data], columns=feature_columns)

#         # Predict
#         prediction = model.predict(input_df)

#         # Return result as JSON
#         return jsonify({"prediction": [float(prediction[0])]})

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5001, debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS   # ✅ import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)  # ✅ Enable CORS for all routes (frontend can call API freely)

# Load model and feature list
model = joblib.load("fraud_detection_model.pkl")
feature_columns = joblib.load("fraud_feature_columns.pkl")  # must match model features

@app.route('/')
def home():
    return "Welcome to ZapAI Fraud Detection API 🚀"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get JSON data from request
        data = request.get_json()

        # Validate input
        if not isinstance(data, list) or len(data) != len(feature_columns):
            return jsonify({
                "error": f"Expected {len(feature_columns)} feature values, got {len(data)}."
            }), 400

        # Convert to DataFrame
        input_df = pd.DataFrame([data], columns=feature_columns)

        # Predict
        prediction = model.predict(input_df)
        probability = model.predict_proba(input_df)[0][1]

        # Return result as JSON
       #return jsonify({"prediction": [float(prediction[0])]})
        return jsonify({"prediction": [float(prediction[0])], "probability": probability})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    # ✅ Allow access from any IP and enable debug for development
    app.run(host="0.0.0.0", port=5001, debug=True)

