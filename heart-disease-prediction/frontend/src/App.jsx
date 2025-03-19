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
        <div>
          <label>Cholesterol (chol)</label>
          <input
            type="number"
            name="chol"
            value={formData.chol}
            onChange={handleChange}
          />
          <small>Serum cholesterol in mg/dl</small>
        </div>
        <div>
          <label>Fasting Blood Sugar (fbs)</label>
          <input
            type="number"
            name="fbs"
            value={formData.fbs}
            onChange={handleChange}
          />
          <small>Fasting blood sugar {'>'} 120 mg/dl (1 = true; 0 = false)</small>
        </div>
        <div>
          <label>Resting Electrocardiographic Results (restecg)</label>
          <input
            type="number"
            name="restecg"
            value={formData.restecg}
            onChange={handleChange}
          />
          <small>Resting electrocardiographic results (0,1,2)</small>
        </div>
        <div>
          <label>Maximum Heart Rate Achieved (thalach)</label>
          <input
            type="number"
            name="thalach"
            value={formData.thalach}
            onChange={handleChange}
          />
          <small>Maximum heart rate achieved</small>
        </div>
        <div>
          <label>Exercise Induced Angina (exang)</label>
          <input
            type="number"
            name="exang"
            value={formData.exang}
            onChange={handleChange}
          />
          <small>Exercise induced angina (1 = yes; 0 = no)</small>
        </div>
        <div>
          <label>ST Depression Induced by Exercise (oldpeak)</label>
          <input
            type="number"
            name="oldpeak"
            value={formData.oldpeak}
            onChange={handleChange}
          />
          <small>ST depression induced by exercise relative to rest</small>
        </div>
        <div>
          <label>Slope of the Peak Exercise ST Segment (slope)</label>
          <input
            type="number"
            name="slope"
            value={formData.slope}
            onChange={handleChange}
          />
          <small>Slope of the peak exercise ST segment (0,1,2)</small>
        </div>
        <div>
          <label>Number of Major Vessels (ca)</label>
          <input
            type="number"
            name="ca"
            value={formData.ca}
            onChange={handleChange}
          />
          <small>Number of major vessels (0-3) colored by fluoroscopy</small>
        </div>
        <div>
          <label>Thalassemia (thal)</label>
          <input
            type="number"
            name="thal"
            value={formData.thal}
            onChange={handleChange}
          />
          <small>Thalassemia (3 = normal; 6 = fixed defect; 7 = reversible defect)</small>
        </div>
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