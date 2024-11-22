import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/detailPage.css';

const DetailPage = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      const response = await axios.get(`https://672b298a976a834dd025df28.mockapi.io/students/${id}`);
      setStudent(response.data);
    } catch (error) {
      console.error('Error fetching student details:', error);
      alert('Invalid student ID provided.');
    }
  };

  return (
    <div className="container">
      {student ? (
        <>
          <h1 className="heading">Student Detail</h1>
          <div className="detail-card">
            <p><strong>ID:</strong> {student.stuid}</p>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Age:</strong> {student.age}</p>
            <p><strong>Gender:</strong> {student.gender}</p>
            <p><strong>Major:</strong> {student.major}</p>
          </div>
          <button className="btn btn-secondary" onClick={() => navigate('/list')}>
            Back to List
          </button>
        </>
      ) : (
        <p>Loading student details...</p>
      )}
    </div>
  );
};

export default DetailPage;


