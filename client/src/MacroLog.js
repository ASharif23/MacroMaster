import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Table, TableBody, TableFooter, TableCell, TableHead, TableRow, Paper, Container, Typography } from '@mui/material';
import { useAuth } from './AuthContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FitnessCalculator from './Fitness';
import FoodEntry from './food';
import MacroEntry from './Macro';

function MacroLog() {

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const [date, setDate] = useState('');
  const [cal, setCal] = useState('');
  const [protien, setProtien] = useState('');
  const [carb, setCarb] = useState('');
  const [fat, setFat] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(cal + ' | ' + protien + ' | ' + carb + ' | ' + fat + ' | ' + date);
  }
  
  return (
  
    <Container>
      <Tabs value={activeTab} onChange={handleTabChange} centered>
        <Tab label="Food Input" />
        <Tab label="Macro Input" />
        <Tab label="Activity Input"/>
      </Tabs>
      {/* Placeholder for other tabs' content */}
      {activeTab === 0 && (
        <FoodEntry />
      )}
      {activeTab === 1 && (
        <MacroEntry />
      )}
      {activeTab === 2 && (
        <FitnessCalculator />
      )}
    </Container>
  );
}
export default MacroLog;