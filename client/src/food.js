import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, Container, Typography } from '@mui/material';
import { useAuth } from './AuthContext';

function FoodEntry() {
  const [foodData, setFoodData] = useState([]);
  const [foodItem, setFoodItem] = useState({});
  const [foodQuery, setFoodQuery] = useState('');
  const [dataSent, setDataSent] = useState(false);
  const { userId } = useAuth();


    

  useEffect(() => {
    if (userId) {
      const fetchFoods = async () => {
        try {
          // Update the URL to use query parameters
          const response = await axios.get(`http://localhost:4000/foods`, {
            params: { userId: userId }
          });
          setFoodData([...response.data]);
          console.log(foodData)
        } catch (error) {
          console.error('Failed to fetch foods', error);
          // Optionally handle errors and display messages as needed
        }
      };

      fetchFoods();
    }
  }, [userId, dataSent]);

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
      var foods = {
        name: bestResponse.description,
        calories: bestResponse.foodNutrients.find(n => n.nutrientName === "Energy").value,
        protein: bestResponse.foodNutrients.find(n => n.nutrientName === "Protein").value,
        carbohydrates: bestResponse.foodNutrients.find(n => n.nutrientName === "Carbohydrate, by difference").value,
        fat: bestResponse.foodNutrients.find(n => n.nutrientName === "Total lipid (fat)").value,
      }
      setFoodItem(foods);
      console.log(foodItem)
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  const saveFoodData = async () => {
    if (!userId) {
      alert('You must be signed in to save food data.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/saveFood', { ...foodItem, userId });
      console.log('Response:', response.data); // Log the successful response message
      setDataSent (!dataSent);
      alert('Food data saved successfully!');
    } catch (error) {
      console.error('Failed to save food data:', error.response ? error.response.data : error);
      alert('Failed to save food data: ' + (error.response ? error.response.data.message : 'Server error'));
    }
  };

  
  return (
    <Container>
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

      <Typography variant="h6" gutterBottom style={{ marginTop: 20 }}>
        Search for Food Nutrition:
      </Typography>
      <TextField
        fullWidth
        label="Enter food name"
        value={foodQuery}
        onChange={handleFoodChange}
        style={{ marginBottom: 10 }}
      />
      <Button variant="contained"  onClick={handleFoodSearch} style={{marginBottom: 10}}>Search Food</Button>
      {foodItem.name && (
        <>      
      <Typography variant="h6" gutterBottom style={{ marginTop: 20 }}>
        Searched Meal:
      </Typography>        
      <Paper style={{ marginTop: 20 }}>
          <Table>  
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Protein</TableCell>
                <TableCell align="right">Carbs</TableCell>
                <TableCell align="right">Fat</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                <TableRow key={foodItem.name}>
                <TableCell component="th" scope="row">
                {foodItem.name}
                </TableCell>
                <TableCell align="right">{foodItem.calories}</TableCell>
                <TableCell align="right">{foodItem.protein}</TableCell>
                <TableCell align="right">{foodItem.carbohydrates}</TableCell>
                <TableCell align="right">{foodItem.fat}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
        <Button style={{marginBottom: 40, marginTop: 10}} variant="contained" onClick={saveFoodData}>Submit</Button> 
        </>
      )}
      {foodData && (
        <>
      <Typography variant="h6" gutterBottom style={{ marginTop: 20 }}>Past Meals:</Typography>            
      <Paper style={{ marginTop: 30 }}>
          <Table>  
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Protein</TableCell>
                <TableCell align="right">Carbs</TableCell>
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
        </>
      )}
    </Container>

  );
}

export default FoodEntry;