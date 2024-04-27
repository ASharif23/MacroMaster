//App.js

import React, { useState, useEffect } from 'react';
import { AppBar, Box, Container, Grid, Paper, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import ProgressTracker from './components/ProgressTracker';
import axios from 'axios';



function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState(null);
  const [progress, setProgress] = useState(null);

  // This ID should come from user's session or authentication context
  const userId = '6616dbbecb3e0ede6b1543d9'; 

  useEffect(() => {

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
      
      {activeTab === 2 && <ProgressTracker progress={progress} activity={activity} stats={stats} />}
        
    </Container>
  );
}

export default App;