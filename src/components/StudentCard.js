import React from 'react';
import '../styles/studentCard.css';

const StudentCard = ({ student, onEdit, onDelete }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{student.name || 'No Name'}</h5>
        <p className="card-details">Student ID: {student.stuid || 'N/A'}</p>
        <p className="card-details">Age: {student.age || 'N/A'}</p>
        <p className="card-details">Gender: {student.gender || 'N/A'}</p>
        <p className="card-details">Major: {student.major || 'N/A'}</p>
        <div className="btn-container">
          <button className="btn btn-edit" onClick={() => onEdit(student)}>
            Edit
          </button>
          <button className="btn btn-delete" onClick={() => onDelete(student.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;

