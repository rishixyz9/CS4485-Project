import React, { useState } from 'react';

// Define time slots from 8am to 11pm
const timeSlots = Array.from({ length: 16 }, (_, i) => {
  const hour = i + 8; // Start from 8am
  return `${hour < 10 ? '0' : ''}${hour}:00`;
});

const Schedule = () => {
  const [selectedSlot, setSelectedSlot] = useState('');

  const handleSlotClick = (slot: string) => {
    setSelectedSlot(slot);
  };

  return (
    <div>
      <h1>Schedule</h1>
      <div className="schedule">
        {timeSlots.map((slot, index) => (
          <div
            key={index}
            className={`time-slot ${selectedSlot === slot ? 'highlighted' : ''}`}
            onClick={() => handleSlotClick(slot)}
          >
            {slot}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
