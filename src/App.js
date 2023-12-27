import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InputPage from './Pages/InputPage';
import ResultPage from './Pages/ResultPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" exact element={<InputPage />} />  
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
