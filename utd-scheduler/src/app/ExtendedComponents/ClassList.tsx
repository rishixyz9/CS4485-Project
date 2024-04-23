import React, { useState } from 'react';

interface Class {
  className: string;
  instructor: string;
  schedule: string;
}
// form for adding, storing, and editing class list
const ClassListForm: React.FC = () => {
  const [classList, setClassList] = useState<Class[]>([]);
  const [className, setClassName] = useState('');
  const [instructor, setInstructor] = useState('');
  const [schedule, setSchedule] = useState('');

  const handleAddClass = () => {
    if (className.trim() && instructor.trim() && schedule.trim()) {
      const newClass: Class = {
        className: className.trim(),
        instructor: instructor.trim(),
        schedule: schedule.trim(),
      };
      setClassList([...classList, newClass]);
      // Clear input fields after adding class
      setClassName('');
      setInstructor('');
      setSchedule('');
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <div>
      <h2>Class List</h2>
      <div>
        <input
          type="text"
          placeholder="Class Name"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Instructor"
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Schedule"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
        />
        <button onClick={handleAddClass}>Add Class</button>
      </div>
      <div>
        <h3>Class List</h3>
        <ul>
          {classList.map((cls, index) => (
            <li key={index}>
              <strong>{cls.className}</strong> - {cls.instructor} ({cls.schedule})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClassListForm;
