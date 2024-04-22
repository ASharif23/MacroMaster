import React, { useEffect, useState } from 'react';
import { getUserProgress, updateUserProgress } from './api';
import ProgressChart from './components/ProgressChart';
import ProgressForm from './components/ProgressForm';

function App() {
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    const userId = 'user-id'; // Replace with actual user ID
    getUserProgress(userId)
      .then((response) => {
        setProgressData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching progress data:', error);
      });
  }, []);

  const handleProgressUpdate = (weight) => {
    // Call updateUserProgress here
  };

  // Prepare chart data based on progressData

  return (
    <div className="App">
      <ProgressChart data={chartData} />
      <ProgressForm onSubmit={handleProgressUpdate} />
    </div>
  );
}

export default App;