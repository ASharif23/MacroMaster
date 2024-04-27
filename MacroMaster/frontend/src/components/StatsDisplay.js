//StatsDisplay.js

import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

//placeholders just in case it doesnt work
const StatsDisplay = ({ stats }) => {
if (!stats) return (
    <Box>
    <Typography variant="subtitle1">Start Weight: 230  Lbs</Typography>
    <Typography variant="subtitle1">Goal Weight: 180  Lbs</Typography>
    <Typography variant="subtitle1">Current Weight: 210 Lbs</Typography>
    <Typography variant="subtitle1">Weight Lost: 20 Lbs</Typography>
      {/* Add more stats as needed */}
    </Box>
);
return (
    <Box>
    <Typography variant="subtitle1">Start Weight: {stats.startWeight} Lbs</Typography>
    <Typography variant="subtitle1">Goal Weight: {stats.goalWeight} Lbs</Typography>
    <Typography variant="subtitle1">Current Weight: {stats.currentWeight} Lbs</Typography>
    <Typography variant="subtitle1">Weight Lost: {stats.weightLost} Lbs</Typography>
      {/* Add more stats as needed */}
    </Box>
);
};

export default StatsDisplay;