import React, { Fragment, useEffect, useState } from 'react';
import './styles.css';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/Activities')
      .then(response => {
        setActivities(response.data);
      })
  }, []);
  
  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  return (
    <>
      <NavBar />
      <Container style={{marginTop:'7rem'}}>
        <ActivityDashboard 
          activities={activities} 
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
        />
      </Container>
    </>
  );
}

export default App;
