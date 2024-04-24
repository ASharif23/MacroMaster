import React, { useState } from 'react';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ProgressChart from './components/ProgressChart';
import ProgressForm from './components/ProgressForm';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

function App() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MacroMaster
          </Typography>
          {/* Placeholder for future login/logout functionality */}
        </Toolbar>
      </AppBar>
      <Tabs value={activeTab} onChange={handleTabChange} centered>
        <Tab label="Home" />
        <Tab label="Log Macros" />
        <Tab label="Progress Tracker" />
        <Tab label="Meal Builder" />
        <Tab label="MacroBot" />
      </Tabs>
      {activeTab === 2 && ( // Only render this if 'Progress Tracker' tab is active
        <Box sx={{ my: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Monthly Stats
                </Typography>
                {/* Placeholder for Monthly Stats Chart */}
                <ProgressChart />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Weekly Stats
                </Typography>
                {/* Placeholder for Weekly Stats Chart */}
                <ProgressChart />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <ProgressForm />
            </Grid>
          </Grid>
        </Box>
      )}
      {/* Placeholder for other tabs' content */}
    </Container>
  );
}

export default App;