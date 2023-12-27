import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InputPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Age: 0,
    Income: 0,
    LoanAmount: 0,
    CreditScore: 0,
    MonthsEmployed: 0,
    NumCreditLines: 0,
    InterestRate: 0,
    DTIRatio: 0,
    HasMortgage: 0,
    HasDependents: 0,
    LoanPurpose: 0,
    HasCoSigner: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = isNaN(value) ? value : parseFloat(value); // Convertit en nombre si c'est possible
    setFormData({ ...formData, [name]: numericValue });
    console.log('formData after handleChange:', { ...formData, [name]: numericValue });
  };


  const handleSubmit = () => {
    fetch('http://localhost:5000/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Prediction result:', data.prediction);
        navigate('/result', { state: { prediction: data.prediction } });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="input-page-container">
      <h1>Prévision du Défaut de Crédit</h1>
      <form className="input-form">
        <div className="input-section">
          <label>Age:</label>
          <input
            type="number"
            name="Age"
            value={formData.Age}
            onChange={handleChange}
          />
          <br />
          <label>Income:  " Revenu annuel " </label>
          <input
            type="number"
            name="Income"
            value={formData.Income}
            onChange={handleChange}
          />
          <br />
          <label>LoanAmount: " Montant du prêt demandé " </label>
          <input
            type="number"
            name="LoanAmount"
            value={formData.LoanAmount}
            onChange={handleChange}
          />
          <br />
          <label>CreditScore: " Cote de crédit "</label>
          <input
            type="number"
            name="CreditScore"
            value={formData.CreditScore}
            onChange={handleChange}
          />
          <br />
          <label>MonthsEmployed: "  Nombre de mois d'emploi actuel " </label>
          <input
            type="number"
            name="MonthsEmployed"
            value={formData.MonthsEmployed}
            onChange={handleChange}
          />
          <br />
          <label>NumCreditLines: "  Nombre de lignes de crédit détenues "</label>
          <input
            type="number"
            name="NumCreditLines"
            value={formData.NumCreditLines}
            onChange={handleChange}
          />
          <br />

        </div>
        <div className="input-section">
          <label>InterestRate: " Taux d'intérêt du prêt "</label>
          <input
            type="number"
            name="InterestRate"
            value={formData.InterestRate}
            onChange={handleChange}
          />
          <br />
          <label>DTIRatio: " Ratio dette/revenu "</label>
          <input
            type="number"
            name="DTIRatio"
            value={formData.DTIRatio}
            onChange={handleChange}
          />
          <br />

          <label>HasMortgage: " Indicateur de prêt hypothécaire "</label>
          <select
            name="HasMortgage"
            value={formData.HasMortgage}
            onChange={handleChange}
          >
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </select>
          <br />
          <label>HasDependents: "  Indicateur de personnes à charge " </label>
          <select
            name="HasDependents"
            value={formData.HasDependents}
            onChange={handleChange}
          >
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </select>
          <br />
          <label>LoanPurpose: " Objectif du prêt " </label>
          <select
            name="LoanPurpose"
            value={formData.LoanPurpose}
            onChange={handleChange}
          >
            <option value={0}>Auto</option>
            <option value={1}>Business</option>
            <option value={2}>Education</option>
            <option value={3}>Home</option>
            <option value={4}>Other</option>
          </select>
          <br />
          <label>HasCoSigner: " Indicateur de co-emprunteur " </label>
          <select
            name="HasCoSigner"
            value={formData.HasCoSigner}
            onChange={handleChange}
          >
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </select>
          <br />
        </div>
      </form>
      <button type="button" onClick={handleSubmit} className="btn">
        Predict
      </button>
    </div>
  );
};

export default InputPage;
