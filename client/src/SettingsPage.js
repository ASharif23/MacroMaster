import React from 'react'
import { useState } from 'react'
import { AppBar, Container, Tab, Tabs, Toolbar, Typography, Paper, TextField, Grid, styled, Button } from '@mui/material';
import { blue } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';



function SettingsPage(user) {

    const DemoPaper = styled(Paper)(({ theme }) => ({
        width: 700,
      }));

return (
    <div style={{justifyContent:'center'}}>
        <DemoPaper height={10} widthelevation={3} square={false}>
            <h2>Settings</h2>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={6}>
                    <Typography 
                        variant="span" 
                        component="div" 
                        sx={{ textAlign: 'start', marginLeft:24, color: 'black' }}>
                        Weight in Lbs:
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="standard-helperText"
                        label="Helper text"
                        defaultValue="Default Value"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={6}>
                    <Typography 
                        variant="span" 
                        component="div" 
                        sx={{ textAlign: 'start', marginLeft:24, color: 'black' }}>
                        Height in In:
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="standard-helperText"
                        label="Helper text"
                        defaultValue="Default Value"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={6}>
                    <Typography 
                        variant="span" 
                        component="div" 
                        sx={{ textAlign: 'start', marginLeft:24, color: 'black' }}>
                        Objective:
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                    >
                    <FormControlLabel value="losing" control={<Radio />} label="Losing" />
                    <FormControlLabel value="maintaining" control={<Radio />} label="Maintaining" />
                    <FormControlLabel value="gaining" control={<Radio />} label="Gaining" />
                    </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
            <p></p>
            <Button variant="contained" size='small'>Save Changes</Button>
            <p></p>

            <label style={{textDecoration: 'underline', color: 'blue'}}>Sign Out</label>
        </DemoPaper>
        
        
    </div>
        
    );   
}

export default SettingsPage;
