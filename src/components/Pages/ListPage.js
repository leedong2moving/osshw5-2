import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/ListPage.css';
import '../../styles/NavBar.css';

const ListPage = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('https://672b298a976a834dd025df28.mockapi.io/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  return (
    <div className="container">
      {}
      <nav className="navbar">
        <div className="navbar-container">
          <a href="#" className="navbar-logo">Student Management</a>
          <ul className="navbar-menu">
            <li className="navbar-item">
              <a href="#" className="navbar-link">Home</a>
            </li>
            <li className="navbar-item">
              <button className="navbar-link" onClick={() => navigate('/create')}>Add Student</button>
            </li>
            <li className="navbar-item">
              <button className="navbar-link" onClick={() => navigate('/list')}>Student List</button>
            </li>
          </ul>
        </div>
      </nav>

      <h1 className="heading">Student List</h1>
      <div className="student-list">
        {students.map((student) => (
          <div key={student.id} className="student-card">
            <h3 className="student-name" onClick={() => navigate(`/detail/${student.id}`)}>
              {student.name}
            </h3>
            <p className="student-age">Age: {student.age}</p>
            <div className="button-group">
              <button className="btn btn-primary small-button" onClick={() => navigate(`/update/${student.id}`)}>
                Edit
              </button>
              <button className="btn btn-danger small-button" onClick={() => navigate(`/delete/${student.id}`)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListPage;
