import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/createPage.css';

const CreatePage = () => {
  const [formData, setFormData] = useState({
    stuid: '',
    name: '',
    age: '',
    gender: '',
    major: '',
  });

  const navigate = useNavigate();
  const nameRef = useRef();
  const ageRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      nameRef.current.focus();
      alert('Name is required');
      return;
    }
    if (!formData.age) {
      ageRef.current.focus();
      alert('Age is required');
      return;
    }

    try {
      await axios.post('https://672b298a976a834dd025df28.mockapi.io/students', formData);
      navigate('/list');
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Add New Student</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          name="stuid"
          placeholder="Student ID"
          value={formData.stuid}
          onChange={handleChange}
          className="form-control"
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          ref={nameRef}
          className="form-control"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          ref={ageRef}
          className="form-control"
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="form-control"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select
          name="major"
          value={formData.major}
          onChange={handleChange}
          className="form-control"
        >
          <option value="">Select Major</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Life Science">Life Science</option>
          <option value="Management">Management</option>
          <option value="Law">Law</option>
          <option value="Economy">Economy</option>
        </select>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default CreatePage;


