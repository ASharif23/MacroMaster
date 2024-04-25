import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, Container, Typography, Grid } from '@mui/material';

function App() {
  const [foodData, setFoodData] = useState([]);
  const [foodQuery, setFoodQuery] = useState('');


  const handleFoodChange = (e) => {
    setFoodQuery(e.target.value);
  };


  const handleFoodSearch = async () => {
    const API_KEY = "s6IZPc5umHSS4q56qzDw9d2YkF6BqO1G6rgefhty"

    try {
      const response = await axios.post(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${API_KEY}`, {
        query: foodQuery,
      });
      const bestResponse = response.data.foods[0];
      var foods = [...foodData,{
        name: bestResponse.description,
        calories: bestResponse.foodNutrients.find(n => n.nutrientName === "Energy").value,
        protein: bestResponse.foodNutrients.find(n => n.nutrientName === "Protein").value,
        carbohydrates: bestResponse.foodNutrients.find(n => n.nutrientName === "Carbohydrate, by difference").value,
        fat: bestResponse.foodNutrients.find(n => n.nutrientName === "Total lipid (fat)").value,
      } ]
      setFoodData(foods);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h6" gutterBottom style={{ marginTop: 20 }}>
        Search for Food Nutrition
      </Typography>
      <TextField
        fullWidth
        label="Enter food name"
        value={foodQuery}
        onChange={handleFoodChange}
        style={{ marginBottom: 10 }}
      />
      <Button variant="contained" color="secondary"  onClick={handleFoodSearch}>Search Food</Button>

      {foodData && (
        <Paper style={{ marginTop: 20 }}>
          <Table>  
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Protein</TableCell>
                <TableCell align="right">Carbohydrates</TableCell>
                <TableCell align="right">Fat</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {foodData ? foodData.map((f) => {return (
                <TableRow key={f.name}>
                <TableCell component="th" scope="row">
                  {f.name}
                </TableCell>
                <TableCell align="right">{f.calories}</TableCell>
                <TableCell align="right">{f.protein}</TableCell>
                <TableCell align="right">{f.carbohydrates}</TableCell>
                <TableCell align="right">{f.fat}</TableCell>
              </TableRow>
              )}) : 
              <></>
            }
              
            </TableBody>
          </Table>
        </Paper>
      )}
    </Container>
  );
}

export default App;
