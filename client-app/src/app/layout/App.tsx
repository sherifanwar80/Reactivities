import './styles.css';
//import axios from 'axios';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import ActivityForm from '../../features/form/ActivityForm';
import HomePage from '../../features/home/HomePage';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

function App() {

  const location = useLocation();
  return (
    <>
      <Route exact path='/' component={HomePage} /> {/*the path is just to define a string route*/}
      <Route path={'/(.+)'}
        render={() => (
          <Container style={{marginTop:'7em'}}>
            <NavBar />
            <Route exact path='/activities' component={ActivityDashboard} />
            <Route path='/activities/:id' component={ActivityDetails} />
            <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} /> 
            {/**useLocation() to refresh the form when referenced by more than one path */}
          </Container>  
        )}
      />
    </>
  );
}

export default observer(App);
