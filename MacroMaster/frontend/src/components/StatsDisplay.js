//StatsDisplay.js

import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const StatsDisplay = ({ stats }) => {
if (!stats) return (
    <Box>
    <Typography variant="subtitle1">Error loading stats</Typography>
    </Box>
);
return (
    <Box>
    <Typography variant="subtitle1">Start Weight: {stats.startWeight} Lbs</Typography>
    <Typography variant="subtitle1">Goal Weight: {stats.goalWeight} Lbs</Typography>
    <Typography variant="subtitle1">Current Weight: {stats.currentWeight} Lbs</Typography>
    <Typography variant="subtitle1">Weight Lost: {stats.weightLoss} Lbs</Typography>
    </Box>
);
};

export default StatsDisplay;