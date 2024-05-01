import React, { useState } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useAuth } from './AuthContext';

function Chatbot() {

  return (
    <Container maxWidth='md'>
        <Typography variant="h5" gutterBottom style={{ marginTop: 20 }}> Link to Chatbot: https://keen-kataifi-924259.netlify.app/</Typography>      
    </Container>
  );
}

export default Chatbot;