//achievements.js

import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Achievements = ({ achievements }) => {
  return (
    <Box>
      {achievements && achievements.length > 0 ? (
        achievements.map((achievement, index) => (
          <Typography key={index}>{achievement}</Typography>
        ))
      ) : (
        <Box>
        <Typography>Lost 5 Pounds!</Typography>
        <Typography>Lost 10 Pounds!</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Achievements;