// src/SignUp.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [alignment, setAlignment] = useState('lose');
  const [age, setAge] = useState();
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [gender, setGender] = useState();





  const { setIsAuthenticated, setUserId } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/signup', { username, password });
      if (response.data) { // Assuming you get a truthy value on successful sign-up
        setIsAuthenticated(true);
        setUserId(response.data.userId); 
        navigate('/'); // Navigate to the home page after sign in     
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Container component="main" maxWidth="xs" >
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '80vh', // Makes the Box take at least the full height of the viewport
      justifyContent: 'center', // Centers content vertically
      alignItems: 'center', // Centers content horizontally
      py: 2, // Adds padding at the top and bottom
    }}>
      <Box sx={{
        width: '100%', // Ensures the inner Box takes up the full width of the outer Box
        bgcolor: 'background.paper',
        boxShadow: 3,
        borderRadius: 2,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Ensures items inside this Box are centered horizontally
      }}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstname"
            label="First Name"
            name="firstname"
            autoComplete="firstname"
            autoFocus
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastname"
            label="Last Name"
            name="lastname"
            autoComplete="lastname"
            autoFocus
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
          color='secondary'
        >
          <ToggleButton value="lose" aria-label="left aligned">
            <Typography>Lose Weight</Typography>
          </ToggleButton>
          <ToggleButton value="maintain" aria-label="centered">
            <Typography>Maintain Weight</Typography>
          </ToggleButton>
          <ToggleButton value="gain" aria-label="right aligned">
          <Typography>Gain Weight</Typography>
          </ToggleButton>
        </ToggleButtonGroup>

        <Box

          sx={{
            '& .MuiTextField-root': { marginLeft: 3, width: '15ch' },
          }}
        >
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="age"
            label="Age"
            type="Number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="gender"
            label="Gender"
            type="text"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}

          /> 
          <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="weight"
          label="Weight (lbs)"
          type="number"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="height"
          label="Height (in)"
          type="number"
          id="height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        
        </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2">
              Already have an account?
              <Link to="/signin" style={{ marginLeft: 5 }}>Sign In</Link>
            </Typography>     
          </Box>   
        </Box>
      </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
