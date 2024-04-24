import React, { useState } from 'react';

interface CourseFormProps {
  onAddCourse: (course: Course) => void;
}
// course form to add course during set time
const CourseForm: React.FC<CourseFormProps> = ({ onAddCourse }) => {
  const [courseName, setCourseName] = useState('');
  const [days, setDays] = useState<string[]>([]);
  const [time, setTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const course: Course = { name: courseName, days, time };
    onAddCourse(course);
    setCourseName('');
    setDays([]);
    setTime('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Course Name:
        <input type="text" value={courseName} onChange={e => setCourseName(e.target.value)} />
      </label>
      <label>
        Days:
        <select multiple value={days} onChange={e => setDays(Array.from(e.target.selectedOptions, option => option.value))}>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
      </label>
      <label>
        Time:
        <input type="time" value={time} onChange={e => setTime(e.target.value)} />
      </label>
      <button type="submit">Add Course</button>
    </form>
  );
};

export default CourseForm;
