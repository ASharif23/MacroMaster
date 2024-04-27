//App.js

import React, { useState, useEffect } from 'react';
import { AppBar, Box, Container, Grid, Paper, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import LifetimeWeightLossChart from './components/LifetimeWeightLossChart';
import PhysicalActivityChart from './components/PhysicalActivityChart';
import StatsDisplay from './components/StatsDisplay';
import Achievements from './components/Achievements';
import axios from 'axios';

const placeholderAchievements = [
  "Lost first 5 pounds",
  "Lost first 10 pounds"
];

function App() {
  const [activeTab, setActiveTab] = useState(2); // Set to the index of 'Progress Tracker' tab
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState(null);
  const [progress, setProgress] = useState(null);

  // This ID should come from user's session or authentication context
  const userId = '6616dbbecb3e0ede6b1543d9'; 

  useEffect(() => {


    const placeholderProgress = [
      { week: 1, weight: 200 },
      { week: 2, weight: 195 },
      { week: 3, weight: 193 },
      { week: 4, weight: 190 },
      { week: 5, weight: 188 },
      { week: 6, weight: 185 },
      { week: 7, weight: 183 },
    ];

    const placeholderActivity = [
      { day: 'Mon', minutes: 30 },
      { day: 'Tues', minutes: 45 },
      { day: 'Wed', minutes: 25 },
      { day: 'Thurs', minutes: 50 },
      { day: 'Fri', minutes: 60 },
      { day: 'Sat', minutes: 40 },
      { day: 'Sun', minutes: 0 },
    ];

    const placeholderStats = {
      startWeight: 200,
      goalWeight: 180,
      currentWeight: 183,
      weightLost: 17,
    };



    setStats(placeholderStats);
    setActivity(placeholderActivity);
    setProgress(placeholderProgress);

    const fetchStats = async () => {
      try {
        const response = await axios.get(`/api/Stats/${userId}`);
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats data", error);
      }
    };

    const fetchActivity = async () => {
      try {
        const response = await axios.get(`/api/activity/${userId}`);
        setActivity(response.data);
      } catch (error) {
        console.error("Error fetching activity data", error);
      }
    };

    const fetchProgress = async () => {
      try {
        const response = await axios.get(`/api/progress/${userId}`);
        setProgress(response.data);
      } catch (error) {
        console.error("Error fetching progress data", error);
      }
    };

    //fetchStats();
    //fetchActivity();
    //fetchProgress();
  }, [userId]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="">
      <AppBar position="static" sx={{ backgroundColor: '#98FF98' }}>
        <Toolbar>
          <Typography 
            variant="h4" 
            component="div" 
            sx={{ flexGrow: 1, textAlign: 'center', color: 'black' }} // Changed color to black
          >
            MacroMaster
          </Typography>
        </Toolbar>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Home" />
          <Tab label="Macro Logger" />
          <Tab label="Progress Tracker" />
          <Tab label="Chatbot" />
          <Tab label="Settings" />
        </Tabs>
      </AppBar>
      
      {activeTab === 2 && (
        <Box sx={{ my: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Lifetime Weight Loss
                </Typography>
                <LifetimeWeightLossChart progress={progress} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Last 7 Days of Activity
                </Typography>
                <PhysicalActivityChart activity={activity} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Your Stats
                </Typography>
                <StatsDisplay stats={stats} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Achievements
                </Typography>
                <Achievements achievements={placeholderAchievements} />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}
      {/* Add content for other tabs here based on the activeTab state */}
    </Container>
  );
}

export default App;