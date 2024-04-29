import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useAuth } from './AuthContext';

function CalorieCalculator() {
  const [activity, setActivity] = useState('');
  const [time, setTime] = useState('');
  const [result, setResult] = useState(null);
  const { userId } = useAuth();


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:80/burnedCalories', { activity, time, userId });
      console.log(response)
      setResult(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setResult({ error: 'Failed to fetch data' });
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Calorie Calculator
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Activity"
          variant="outlined"
          fullWidth
          margin="normal"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        />
        <TextField
          label="Time in Minutes"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Calculate
        </Button>
      </form>
      {result && (
        <Typography variant="h6" color="textSecondary" marginTop={2}>
          {result.error ? result.error : `Calories burned: ${result.calories_burned}`}
        </Typography>
      )}
    </Container>
  );
}

export default CalorieCalculator;
