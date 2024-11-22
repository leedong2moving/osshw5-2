import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/UpdatePage.css';

const UpdatePage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    stuid: '',
    name: '',
    age: '',
    gender: '',
    major: '',
  });
  const navigate = useNavigate();
  const [editCount, setEditCount] = useState(0);

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      const response = await axios.get(`https://672b298a976a834dd025df28.mockapi.io/students/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setEditCount((prevCount) => prevCount + 1);

    try {
      await axios.put(`https://672b298a976a834dd025df28.mockapi.io/students/${id}`, {
        ...formData,
        [name]: value,
      });
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Edit Student</h1>
      <form className="form-container">
        <input
          type="text"
          name="stuid"
          value={formData.stuid}
          onChange={handleChange}
          className="form-control"
          placeholder="Student ID"
        />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-control"
          placeholder="Name"
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="form-control"
          placeholder="Age"
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
      </form>
      <div className="edit-count">Edit count: {editCount}</div>
      <button className="btn btn-secondary" onClick={() => navigate('/list')}>
        Back to List
      </button>
    </div>
  );
};

export default UpdatePage;

