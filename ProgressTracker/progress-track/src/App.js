import React, { useEffect, useState } from 'react';
import { getUserProgress, updateUserProgress } from './api';
import ProgressChart from './components/ProgressChart';
import ProgressForm from './components/ProgressForm';

function App() {
  const [progressData, setProgressData] = useState([]);
  const userId = 'user-id'; // Replace with actual user ID, or fetch from user context or session

  useEffect(() => {
    getUserProgress(userId)
      .then((response) => {
        setProgressData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching progress data:', error);
      });
  }, [userId]);

  const handleProgressUpdate = (newWeight) => {
    const updatedData = {
      currentWeight: newWeight,
      // Add any other fields that need to be updated
    };

    updateUserProgress(userId, updatedData)
      .then((response) => {
        // Update the local state to reflect the new data
        setProgressData(prevData => ({
          ...prevData,
          currentWeight: response.data.currentWeight,
          // Update other fields as necessary
        }));
        alert('Progress updated successfully!');
      })
      .catch((error) => {
        console.error('Failed to update progress:', error);
        alert('Failed to update progress.');
      });
  };

  // Prepare chart data based on progressData
  const chartData = {
    labels: progressData.map(entry => entry.date), // Ensure 'date' is in your data
    datasets: [
      {
        label: 'Weight Progress',
        data: progressData.map(entry => entry.currentWeight), // Replace 'currentWeight' if your field is named differently
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="App">
      <ProgressChart data={chartData} />
      <ProgressForm onSubmit={handleProgressUpdate} />
    </div>
  );
}

export default App;