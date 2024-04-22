import React, { useState } from 'react';

const ProgressForm = ({ onSubmit }) => {
  const [weight, setWeight] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(weight);
    setWeight('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        placeholder="Current weight"
        required
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default ProgressForm;