import React, { useState, useEffect } from "react";
import "./Registration.css"; // Update path if needed

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("registrations")) || [];
    setRegistrations(saved);
  }, []);

  const handleChange = (e) => {
    setFormData(
      (prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    })
  );
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name && formData.email && formData.password) {
      const updated = [...registrations, formData];
      setRegistrations(updated);
      localStorage.setItem("registrations", JSON.stringify(updated));
      setSubmitted(true);
      setFormData({ name: "", email: "", password: "" });

      setTimeout(() => setSubmitted(false), 3000);
    } else {
      alert("Please fill out all fields.");
    }
  };

  // ✅ Delete a registration by index
  const handleDelete = (indexToDelete) => {
    const updated = registrations.filter((_, index) => index !== indexToDelete);
    setRegistrations(updated);
    localStorage.setItem("registrations", JSON.stringify(updated));
  };

  return (
    <div className="registration-container">
      <h2 className="title">Register</h2>

      {submitted && <p className="success-message">Registration successful!</p>}

      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter a password"
          />
        </div>

        <button type="submit" className="submit-button">
          Register
        </button>
      </form>

      <h3 className="title">Registered Users</h3>
      {registrations.length === 0 ? (
        <p>No registrations yet.</p>
      ) : (
        <ul className="registration-list">
          {registrations.map((item, index) => ( 
            <li key={index} className="registration-item">
              <strong>{item.name}</strong> — {item.email}
              <button
                className="delete-button"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RegistrationForm;
