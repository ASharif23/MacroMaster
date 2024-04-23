import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const ProgressForm = () => {
  const [weight, setWeight] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle weight update logic here
    alert(`Weight updated to: ${weight}`);
    setWeight('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off" sx={{ mt: 2 }}>
      <TextField
        label="Current Weight"
        variant="outlined"
        margin="normal"
        fullWidth
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <Button variant="contained" fullWidth sx={{ mt: 2 }} type="submit">
        Update Weight
      </Button>
    </Box>
  );
};

export default ProgressForm;