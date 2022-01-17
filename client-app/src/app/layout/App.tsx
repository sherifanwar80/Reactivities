import './styles.css';
//import axios from 'axios';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import ActivityForm from '../../features/form/ActivityForm';
import HomePage from '../../features/home/HomePage';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import LoadingCompmonent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';

function App() {

  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() => {

    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    }
    else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);
  
  if (!commonStore.appLoaded) return <LoadingCompmonent content='Loading app....' />
  
  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <ModalContainer />
      <Route exact path='/' component={HomePage} /> {/*the path is just to define a string route*/}
      <Route path={'/(.+)'}
        render={() => (
          <Container style={{marginTop:'7em'}}>
            <NavBar />
            <Switch>
              {/* <Routes> are to fill places with specified component */}
              <Route exact path='/activities' component={ActivityDashboard} />
              <Route path='/activities/:id' component={ActivityDetails} />
              <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} /> 
              <Route path='/errors' component={TestErrors} />
              <Route path='/server-error' component={ServerError} />
              <Route path='/login' component={LoginForm} />
              <Route component={NotFound} />
              {/**useLocation() to refresh the form when referenced by more than one path */}
            </Switch>
            
          </Container>
        )}
      />
    </>
  );
}

export default observer(App);
