import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/UpdatePage.css';

const UpdatePage = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({
    name: '',
    age: '',
    stuid: '',
    gender: '',
    major: ''
  });
  const [updateCount, setUpdateCount] = useState(0);
  const navigate = useNavigate();

  const fetchStudent = useCallback(async () => {
    try {
      const response = await axios.get(`https://672b298a976a834dd025df28.mockapi.io/students/${id}`);
      setStudent(response.data);
    } catch (error) {
      console.error('Error fetching student details:', error);
      alert('Invalid student ID provided.');
    }
  }, [id]);

  useEffect(() => {
    fetchStudent();
  }, [fetchStudent]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setUpdateCount((prevCount) => prevCount + 1);

    try {
      await axios.put(`https://672b298a976a834dd025df28.mockapi.io/students/${id}`, {
        ...student,
        [name]: value,
      });
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Update Student</h1>
      <form className="update-form">
        <div className="form-group">
          <label htmlFor="stuid">Student ID</label>
          <input
            type="text"
            id="stuid"
            name="stuid"
            value={student.stuid}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={student.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={student.age}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={student.gender}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="major">Major</label>
          <select
            id="major"
            name="major"
            value={student.major}
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
        </div>
      </form>
      <p>Total Updates Made: {updateCount}</p>
      <button className="btn btn-secondary" onClick={() => navigate('/list')}>
        Back to List
      </button>
    </div>
  );
};

export default UpdatePage;
