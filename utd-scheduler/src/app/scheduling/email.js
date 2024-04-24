// Function to send email alert
function sendEmailAlert(email) {
    // Simulate sending email by making a request to the backend API
    fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
    .then(response => {
      if (response.ok) {
        alert(`Collaboration invite sent to ${email} successfully.`);
      } else {
        throw new Error('Failed to send collaboration alert.');
      }
    })
    .catch(error => {
      alert(error.message);
    });
  }
  
  // Function to handle submitting the collaborator form
  function handleCollaboratorFormSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('collaborator-email').value;
  
    if (validateEmail(email)) {
      sendEmailAlert(email);
      // Clear form input after submission
      document.getElementById('collaborator-email').value = '';
    } else {
      alert('Please enter a valid email address.');
    }
  }
  
  // Email validation function
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Event listener for collaborator form submission
  const collaboratorForm = document.getElementById('collaborator-form');
  collaboratorForm.addEventListener('submit', handleCollaboratorFormSubmit);
  