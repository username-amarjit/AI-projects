// src/App.jsx
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: ''
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/predict/', formData);
      setPrediction(response.data);
    } catch (error) {
      console.error('There was an error making the prediction!', error);
    }
  };

  return (
    <div>
      <h1>Heart Disease Prediction</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
          <small>Age of the person</small>
        </div>
        <div>
          <label>Sex</label>
          <input
            type="number"
            name="sex"
            value={formData.sex}
            onChange={handleChange}
          />
          <small>Gender (1 = Male, 0 = Female)</small>
        </div>
        <div>
          <label>Chest Pain Type (cp)</label>
          <input
            type="number"
            name="cp"
            value={formData.cp}
            onChange={handleChange}
          />
          <small>Chest pain type (0,1,2,3)</small>
        </div>
        <div>
          <label>Resting Blood Pressure (trestbps)</label>
          <input
            type="number"
            name="trestbps"
            value={formData.trestbps}
            onChange={handleChange}
          />
          <small>Resting blood pressure in mmHg</small>
        </div>
        {/* Add other input fields similarly with descriptions */}
        <button type="submit">Submit</button>
      </form>

      {prediction && (
        <div>
          <h2>Prediction Results:</h2>
          <pre>{JSON.stringify(prediction, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
