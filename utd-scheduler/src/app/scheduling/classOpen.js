// Function to send email alert to a user
function sendEmailAlertToUser(email, className) {
    // Simulate sending email by making a request to the backend API
    fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, className }),
    })
    .then(response => {
      if (response.ok) {
        alert(`Collaboration invite sent to ${email} for class ${className} successfully.`);
      } else {
        throw new Error('Failed to send collaboration alert.');
      }
    })
    .catch(error => {
      alert(error.message);
    });
  }
  
  // Function to send email alerts to users when a class opens up
  function sendEmailAlertsForClassOpening(classDetails) {
    const users = getUsersForClass(classDetails); // Function to get users interested in this class
    users.forEach(user => {
      sendEmailAlertToUser(user.email, classDetails.className);
    });
  }
  
  // Example function to get users interested in a class (Replace this with your own logic)
  function getUsersForClass(classDetails) {
    // Example: Get users from a database who are interested in this class
    // This function should return an array of user objects with email addresses
    // For demonstration purposes, we'll return a hardcoded list of users
    return [
      { email: 'user1@example.com' },
      { email: 'user2@example.com' },
      { email: 'user3@example.com' }
    ];
  }
  
  // Example class details
  const classDetails = {
    className: 'Math 101',
    instructor: 'John Doe',
    schedule: 'Monday 9:00 AM - 10:30 AM'
  };
  
  // Call the function to send email alerts when the class opens up
  sendEmailAlertsForClassOpening(classDetails);
  