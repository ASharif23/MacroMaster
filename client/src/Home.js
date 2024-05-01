//App.js

import React, { useState, useEffect } from 'react';
import { AppBar, Container, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import ProgressTracker from './components/ProgressTracker';
import MacroLog from './MacroLog';
import Chatbot from './chatbot';
import SettingsPage from './SettingsPage';
import axios from 'axios';

function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState(null);
  const [progress, setProgress] = useState(null);
  const [achievements, setAchievements] = useState(null);

  // This ID should come from user's session or authentication context
  const userId = '6616dbbecb3e0ede6b1543d9'; 

  useEffect(() => {

    const fetchStats = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/Stats/`+ userId);
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats data", error);
      }
    };

    const fetchActivity = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/Activity/`+ userId);
        setActivity(response.data);
      } catch (error) {
        console.error("Error fetching activity data", error);
      }
    };

    const fetchProgress = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/Progress/`+ userId);
        setProgress(response.data);
      } catch (error) {
        console.error("Error fetching progress data", error);
      }

    };const fetchAchievements = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/Achievements/`+ userId);
        setAchievements(response.data);
      } catch (error) {
        console.error("Error fetching achievements data", error);
      }
    };

    fetchStats();
    fetchActivity();
    fetchProgress();
    fetchAchievements();
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
            sx={{ flexGrow: 1, textAlign: 'center', color: 'black' }}>
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
      {activeTab === 0 && (
        <Container>
          <Typography style={{ marginTop: 20 }}
          variant="h2" 
          component="div" 
          sx={{ flexGrow: 1, color: 'black' }}>
          Welcome to MacroMaster!
          </Typography>
          <Typography style={{ marginTop: 20 }}
          variant="h4" 
          component="div" 
          sx={{ flexGrow: 1, color: 'black' }}>
          Our goal is to help you achieve your goals. We understand that tracking your macros can be a daunting process, but rest assured, we have your back. MacroMaster is a simple to use tool designed to guide you through your weight journey.
          </Typography>
          <Typography style={{ marginTop: 20 }}
          variant="h4" 
          component="div" 
          sx={{ flexGrow: 1, color: 'black' }}>
          Best Regards,
          </Typography>
          <Typography
          variant="h4" 
          component="div" 
          sx={{ flexGrow: 1, color: 'black' }}>
          MacroMaster Team
          </Typography>
      </Container>
      )}
      {activeTab === 1 && (<MacroLog />)}
      {activeTab === 2 && <ProgressTracker progress={progress} activity={activity} stats={stats} achievements={achievements} />}
      {activeTab === 3 && (<Chatbot />)}
      {activeTab === 4 && (<SettingsPage />)}

    </Container>
  );
}

export default Home;