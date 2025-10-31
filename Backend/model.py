import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib

# 1️⃣ Load dataset
df = pd.read_csv("fraud_detection.csv")

# 2️⃣ Features and target
X = df.drop(["is_fraud", "Fraud_Risk_Score"], axis=1)
y = df["is_fraud"]

# 3️⃣ Split into train and test
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

# 4️⃣ Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 5️⃣ Evaluate
y_pred = model.predict(X_test)
print("✅ Accuracy:", accuracy_score(y_test, y_pred))
print("\nClassification Report:\n", classification_report(y_test, y_pred))

# 6️⃣ Save trained model and feature list
joblib.dump(model, "fraud_detection_model.pkl")
joblib.dump(list(X.columns), "fraud_feature_columns.pkl")
print("\n🎯 Model and feature columns saved!")

# 7️⃣ Example: Predict using 22 features
# ⚠️ Replace with your actual feature values in correct order
input_data = pd.DataFrame([[
    # Example values (replace with your own 22 numeric or categorical values)
    *X.columns.map(lambda c: 0)  # Creates dummy 0s for all 22 columns
]], columns=X.columns)

# Predict fraud (0 = normal, 1 = fraud)
prediction = model.predict(input_data)[0]
print("\n🔍 Prediction for given input:", "🚨 FRAUD" if prediction == 1 else "✅ NORMAL")
