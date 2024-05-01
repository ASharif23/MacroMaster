import React, { useState } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useAuth } from './AuthContext';

function MacroEntry() {
  const [date, setDate] = useState('');
  const [cal, setCal] = useState('');
  const [protein, setProtien] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [result, setResult] = useState(null);
  const { userId } = useAuth();


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/macroInput', { date, cal, protein, carbs, fat, userId });
      console.log(response)
      setResult(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setResult({ error: 'Failed to fetch data' });
    }
  };

  return (
    <Container maxWidth='md'>
        <Typography variant="h5" gutterBottom style={{ marginTop: 20 }}> Daily Totals: </Typography>      
        <Paper style={{ marginTop: 20 }}>
          <Table>  
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Remaining Calories</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Protein</TableCell>
                <TableCell align="right">Carbs</TableCell>
                <TableCell align="right">Fat</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                <TableCell component="th" scope="row">{12}</TableCell>
                <TableCell component="th" scope="row">{11}</TableCell>
                <TableCell align="right">{10}</TableCell>
                <TableCell align="right">{9}</TableCell>
                <TableCell align="right">{8}</TableCell>
                <TableCell align="right">{7}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>



      <Typography variant="h6" component="h1" style={{ marginTop: 20 }} gutterBottom>Enter Daily Macros:</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          type='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          label="Calories (g)"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          value={cal}
          onChange={(e) => setCal(e.target.value)}
        />
        <TextField
          label="Protien (g)"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          value={protein}
          onChange={(e) => setProtien(e.target.value)}
        />
        <TextField
          label="Carbs (g)"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          value={carbs}
          onChange={(e) => setCarbs(e.target.value)}
        />
        <TextField
          label="Fat (g)"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          value={fat}
          onChange={(e) => setFat(e.target.value)}
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

    <Typography variant="h6" gutterBottom style={{ marginTop: 20 }}>Past Macros:</Typography>            
      <Paper style={{ marginTop: 30 }}>
          <Table>  
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Protein</TableCell>
                <TableCell align="right">Carbs</TableCell>
                <TableCell align="right">Fat</TableCell>
              </TableRow>
            </TableHead>
            </Table>
        </Paper>

    </Container>
  );
}

export default MacroEntry;