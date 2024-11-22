import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdatePage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ name: '', age: '', gender: '', major: '' });
  const [updateCount, setUpdateCount] = useState(0);

  const nameRef = useRef();
  const ageRef = useRef();

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const response = await axios.get(`https://672b298a976a834dd025df28.mockapi.io/students/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching student:', error);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setUpdateCount((prevCount) => prevCount + 1);

    try {
      await axios.put(`https://672b298a976a834dd025df28.mockapi.io/students/${id}`, {
        ...formData,
        [name]: value,
      });
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nameRef.current.value) {
      alert('Name is required');
      return;
    }
    if (!ageRef.current.value) {
      alert('Age is required');
      return;
    }
  };

  return (
    <div className="container">
      <h1>Update Student</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            ref={nameRef}
            className="form-control"
          />
        </div>
        <div className="form-group mb-3">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            ref={ageRef}
            className="form-control"
          />
        </div>
        <div className="form-group mb-3">
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-group mb-3">
          <label>Major</label>
          <input
            type="text"
            name="major"
            value={formData.major}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <p>Total Updates: {updateCount}</p>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};

export default UpdatePage;
