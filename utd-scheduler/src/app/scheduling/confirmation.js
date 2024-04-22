// Define schedules with start and end times
const schedule1 = { startTime: '08:00', endTime: '10:00' };
const schedule2 = { startTime: '09:30', endTime: '11:00' };

function saveOverlapInfo(schedule1, schedule2) {
  const overlapInfo = {
    schedule1,
    schedule2
  };

  // Make a POST request to the server
  fetch('/saveOverlapInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(overlapInfo)
  })
  .then(response => {
    if (response.ok) {
      console.log('Overlap information saved successfully.');
    } else {
      throw new Error('Failed to save overlap information.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

// Example usage
saveOverlapInfo(schedule1, schedule2);
