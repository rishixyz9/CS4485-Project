import React, { useState } from 'react';

interface Collaborator {
  email: string;
}
// form for collaboration
const CollaboratorForm: React.FC = () => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [email, setEmail] = useState('');

  const handleAddCollaborator = () => {
    if (validateEmail(email)) {
      const newCollaborator: Collaborator = {
        email: email.trim(),
      };
      setCollaborators([...collaborators, newCollaborator]);
      // Clear input field after adding collaborator
      setEmail('');
    } else {
      alert('Please enter a valid email address.');
    }
  };

  const validateEmail = (email: string) => {
    // Simple email validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div>
      <h2>Collaborators</h2>
      <div>
        <input
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleAddCollaborator}>Add Collaborator</button>
      </div>
      <div>
        <h3>Collaborator List</h3>
        <ul>
          {collaborators.map((collaborator, index) => (
            <li key={index}>{collaborator.email}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CollaboratorForm;
