//progresstracker.js

import { Box, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import LifetimeWeightLossChart from './LifetimeWeightLossChart';
import PhysicalActivityChart from './PhysicalActivityChart';
import StatsDisplay from './StatsDisplay';
import Achievements from './Achievements';

export default function ProgressTracker({ progress, activity, stats }) {
  return (
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
            Achievements
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}