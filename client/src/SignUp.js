// src/SignUp.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:80/signup', { username, password });
      if (response.data) { // Assuming you get a truthy value on successful sign-up
        setIsAuthenticated(true);
        // Navigate to home or another page post-signup if needed
      }
    } catch (error) {
      console.error(error);
    }
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
