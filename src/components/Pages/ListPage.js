import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StudentCard from '../StudentCard'; // 올바른 경로로 수정
import StudentFormModal from '../StudentFormModal'; // 올바른 경로로 수정

const ListPage = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleSave = async (student) => {
    try {
      if (student.id) {
        await axios.put(`https://672b298a976a834dd025df28.mockapi.io/students/${student.id}`, student);
      } else {
        await axios.post('https://672b298a976a834dd025df28.mockapi.io/students', student);
      }
      fetchStudents();
      closeModal();
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`https://672b298a976a834dd025df28.mockapi.io/students/${id}`);
        fetchStudents();
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  const openModal = (student = null) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <h1 className="heading">Student List</h1>
      <button className="btn btn-success mb-4" onClick={() => openModal({})}>
        Add New Student
      </button>
      <div className="row g-4">
        {students.map((student) => (
          <div key={student.id} className="col-12 col-md-6 col-lg-4">
            <StudentCard
              student={student}
              onEdit={() => openModal(student)}
              onDelete={handleDelete}
            />
          </div>
        ))}
      </div>
      {isModalOpen && (
        <StudentFormModal
          student={selectedStudent}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default ListPage;
