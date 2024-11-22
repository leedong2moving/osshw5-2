import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function DetailPage() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const response = await axios.get(`https://672b298a976a834dd025df28.mockapi.io/students/${id}`);
      setStudent(response.data);
    } catch (error) {
      console.error("Error fetching student:", error);
    }
  };

  return (
    <div className="container">
      {student ? (
        <div>
          <h1>{student.name}</h1>
          <p>Age: {student.age}</p>
          <p>Gender: {student.gender}</p>
          <p>Major: {student.major}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default DetailPage;
