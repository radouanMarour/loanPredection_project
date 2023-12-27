import React from 'react';
import { useLocation } from 'react-router-dom';

const ResultPage = () => {
  const location = useLocation();
  const prediction = location.state?.prediction || 'No prediction';
  const isCreditApproved = prediction.includes(0);
  console.log('Prediction0 in ResultPage:', location.state?.prediction);
  console.log('Prediction in ResultPage:', prediction);

  return (
    <div className="result-page-container">
      {isCreditApproved ? (
        <p className="result-message success">Le prêt est approuvé. Félicitations !</p>
      ) : (
        <p className="result-message failure">Désolé, le prêt n'est pas approuvé en raison d'un défaut de crédit.</p>
      )}
    </div>
  );
};

export default ResultPage;
