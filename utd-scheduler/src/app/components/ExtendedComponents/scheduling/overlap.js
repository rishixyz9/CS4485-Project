// Define schedules with start and end times
const schedule1 = { startTime: '08:00', endTime: '10:00' };
const schedule2 = { startTime: '09:30', endTime: '11:00' };

function schedulesOverlap(schedule1, schedule2) {
  // Extract hours and minutes from start and end times
  const startTime1 = getTimeInMinutes(schedule1.startTime);
  const endTime1 = getTimeInMinutes(schedule1.endTime);
  const startTime2 = getTimeInMinutes(schedule2.startTime);
  const endTime2 = getTimeInMinutes(schedule2.endTime);

  // Check if schedule1 overlaps with schedule2
  if (
    (startTime1 >= startTime2 && startTime1 < endTime2) || // schedule1 starts during schedule2
    (endTime1 > startTime2 && endTime1 <= endTime2) || // schedule1 ends during schedule2
    (startTime1 <= startTime2 && endTime1 >= endTime2) // schedule1 contains schedule2
  ) {
    return true;
  }

  // Check if schedule2 overlaps with schedule1
  if (
    (startTime2 >= startTime1 && startTime2 < endTime1) || // schedule2 starts during schedule1
    (endTime2 > startTime1 && endTime2 <= endTime1) || // schedule2 ends during schedule1
    (startTime2 <= startTime1 && endTime2 >= endTime1) // schedule2 contains schedule1
  ) {
    return true;
  }

  // If none of the above conditions are met, schedules don't overlap
  return false;
}

function getTimeInMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

// Example usage
if (schedulesOverlap(schedule1, schedule2)) {
  console.log('Schedules overlap.');
} else {
  console.log('Schedules do not overlap.');
}
