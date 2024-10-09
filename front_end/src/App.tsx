import React, { useState } from 'react';
import axios from 'axios';

const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  select: {
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  popup: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    textAlign: 'center',
  },
};

export default function App() {
  const [formData, setFormData] = useState({
    avg_glucose_level: '',
    bmi: '',
    age: '',
    hypertension: '0',
    heart_disease: '0',
    ever_married: 'yes',
    work_type: 'Private',
    Residence_type: 'Urban',
    smoking_status: 'formerly smoked'
  });

  const [response, setResponse] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8000/predict', formData);
      setResponse(res.data);
      setShowPopup(true);
      console.log('Response from backend:', res.data);
    } catch (err) {
      console.error('Error sending data to backend:', err);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={{ textAlign: 'center' }}>Stroke Risk Assessment</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Avg. Glucose Level:</label>
          <input
            type="number"
            name="avg_glucose_level"
            value={formData.avg_glucose_level}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>BMI:</label>
          <input
            type="number"
            name="bmi"
            value={formData.bmi}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Hypertension:</label>
          <select 
            name="hypertension" 
            value={formData.hypertension} 
            onChange={handleChange}
            style={styles.select}
          >
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Heart Disease:</label>
          <select 
            name="heart_disease" 
            value={formData.heart_disease} 
            onChange={handleChange}
            style={styles.select}
          >
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Ever Married:</label>
          <select 
            name="ever_married" 
            value={formData.ever_married} 
            onChange={handleChange}
            style={styles.select}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Work Type:</label>
          <select 
            name="work_type" 
            value={formData.work_type} 
            onChange={handleChange}
            style={styles.select}
          >
            <option value="Private">Private</option>
            <option value="Self-employed">Self-employed</option>
            <option value="Govt_job">Government Job</option>
            <option value="children">Children</option>
            <option value="Never_worked">Never worked</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Residence Type:</label>
          <select 
            name="Residence_type" 
            value={formData.Residence_type} 
            onChange={handleChange}
            style={styles.select}
          >
            <option value="Urban">Urban</option>
            <option value="Rural">Rural</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Smoking Status:</label>
          <select 
            name="smoking_status" 
            value={formData.smoking_status} 
            onChange={handleChange}
            style={styles.select}
          >
            <option value="formerly smoked">Formerly Smoked</option>
            <option value="never smoked">Never Smoked</option>
            <option value="smokes">Smokes</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>
        <button type="submit" style={styles.button}>Submit</button>
      </form>

      {showPopup && response && (
        <div style={styles.popup}>
          <div style={styles.popupContent}>
            <h2>Prediction Result</h2>
            <p>The prediction result is: {response.prediction === 1 ? 'High Risk' : 'Low Risk'}</p>
            <button onClick={() => setShowPopup(false)} style={styles.button}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}