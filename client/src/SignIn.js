// src/SignIn.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();
  const { setIsAuthenticated, setUserId } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:80/signin', { username, password });
      if (response.data) { // Assuming you get a truthy value on successful sign-in
        setIsAuthenticated(true);
        navigate('/'); // Navigate to the home page after sign in
        setUserId(response.data.userId); 
        
      }
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: 'background.paper', // White background
        boxShadow: 3, // Shadow around the form
        py: 3, // Padding vertical
        px: 2, // Padding horizontal
        borderRadius: 2, // Border radius
        backgroundColor: 'white', // White form
      }}>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
            Sign In
          </Button>
          <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2">
            Don't have an account?
            <Link to="/signup" style={{ marginLeft: 5 }}>Sign Up</Link>
          </Typography> 
          </Box>  
        </Box>
        {error && <Alert sx={{mt: 2}}severity="error">{error}</Alert>}

      </Box>
    </Container>
  );
}

export default SignIn;
