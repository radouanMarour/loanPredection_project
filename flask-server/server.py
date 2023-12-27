from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)


# Charger le modèle de machine learning
model = joblib.load("./mlproject.joblib")


@app.route("/")
def home():
    return "Welcome to the ML Model API!"


@app.route("/api/predict", methods=["POST"])
def predict():
    data = request.get_json()

    features = [
        data.get("Age", 0),
        data.get("Income", 0),
        data.get("LoanAmount", 0),
        data.get("CreditScore", 0),
        data.get("MonthsEmployed", 0),
        data.get("NumCreditLines", 0),
        data.get("InterestRate", 0),
        data.get("DTIRatio", 0),
        data.get("HasMortgage", 0),
        data.get("HasDependents", 0),
        data.get("LoanPurpose", 0),
        data.get("HasCoSigner", 0),
    ]

    prediction = model.predict([features])
    response = {"prediction": prediction.tolist(), "other_info": "..."}
    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True)
