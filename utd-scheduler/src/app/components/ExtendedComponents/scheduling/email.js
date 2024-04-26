// Function to send email alert
function sendEmailAlert(email) {
  // Call backend API to check if email exists
  fetch('/check-email', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
  })
  .then(response => {
      if (response.ok) {
          return response.json();
      } else {
          throw new Error('Failed to check email.');
      }
  })
  .then(data => {
      if (data.exists) {
          // Email exists, send collaboration invite
          sendCollaborationInvite(email);
      } else {
          alert('Email does not exist in the database.');
      }
  })
  .catch(error => {
      alert(error.message);
  });
}

// Function to send collaboration invite
function sendCollaborationInvite(email) {
  // Simulate sending email by making a request to the backend API
  fetch('/send-invite', {
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
          throw new Error('Failed to send collaboration invite.');
      }
  })
  .catch(error => {
      alert(error.message);
  });
}

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Simulated database of emails
const emailDatabase = ['example1@example.com', 'example2@example.com'];

// Endpoint to check if email exists
app.post('/check-email', (req, res) => {
    const { email } = req.body;
    const exists = emailDatabase.includes(email);
    res.json({ exists });
});

// Endpoint to send collaboration invite
app.post('/send-invite', (req, res) => {
    // Here you would implement the logic to send the collaboration invite
    // For demonstration purposes, just respond with success
    res.sendStatus(200);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
