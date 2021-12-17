import React, { Fragment, useEffect } from 'react';
import './styles.css';
//import axios from 'axios';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingCompmonent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {

  const {activityStore} = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingCompmonent content='Loading...' />

  return (
    <>
      <NavBar />
      <Container style={{marginTop:'7rem'}}>

        <ActivityDashboard />
      </Container>
    </>
  );
}

export default observer(App);
