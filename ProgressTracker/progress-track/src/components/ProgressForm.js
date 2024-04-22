import React, { useState } from 'react';

const ProgressForm = ({ onSubmit }) => {
  const [weight, setWeight] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(weight);
    setWeight('');  // Reset the input field after submitting
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        placeholder="Enter new weight"
        required
      />
      <button type="submit">Update Weight</button>
    </form>
  );
};

export default ProgressForm;