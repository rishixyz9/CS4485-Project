import React from 'react';

interface ScheduleViewerProps {
  courses: Course[];
}

const ScheduleViewer: React.FC<ScheduleViewerProps> = ({ courses }) => {
  // Group courses by day
  const groupedCourses: { [day: string]: Course[] } = {};
  courses.forEach(course => {
    course.days.forEach(day => {
      if (!groupedCourses[day]) {
        groupedCourses[day] = [];
      }
      groupedCourses[day].push(course);
    });
  });

  return (
    <div>
      <h3>Schedule Viewer</h3>
      {Object.entries(groupedCourses).map(([day, dayCourses]) => (
        <div key={day}>
          <h4>{day}</h4>
          <ul>
            {dayCourses.map((course, index) => (
              <li key={index}>
                <strong>{course.name}</strong> at {course.time}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ScheduleViewer;
