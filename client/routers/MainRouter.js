import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';

import PrivateRoute from './PrivateRouter';

import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';
import Header from '../components/Header';
// import HomePage from '../Home/pages/HomePage';
import HomePage from '../pages/HomePage';
import SalonListPage from '../pages/SalonListPage';
// import SalonPage from '../Salon/pages/SalonPage';
import SalonPage from '../pages/SalonPage';
import CreateStaffPage from '../pages/CreateStaffPage';
import EditStaffPage from '../pages/EditStaffPage';
import CreateSalonPage from '../pages/CreateSalonPage';
import EditSalonPage from '../pages/EditSalonPage';
import CreateServicePage from '../pages/CreateServicePage';
import EditServicePage from '../pages/EditServicePage';
// import AddTimeTablePage from '../Salon/pages/AddTimeTablePage';
import CreateTimeTablePage from '../pages/CreateTimeTablePage';
import CreateAppointmentPage from '../pages/CreateAppointmentPage';
import AddFeedbackPage from '../Salon/pages/AddFeedbackPage';
import AppointmentsPage from '../pages/AppointmentsPage';

const history = createBrowserHistory ();

const MainRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <PrivateRoute exact path="/" component={HomePage} />
        <PrivateRoute
          path="/salon/:salonId/service/create"
          component={CreateServicePage}
        />
        <PrivateRoute
          path="/salon/:salonId/service/:serviceId"
          component={EditServicePage}
        />
        <PrivateRoute
          path="/salon/:salonId/feedback/create"
          component={AddFeedbackPage}
        />
        <PrivateRoute
          path="/salon/:salonId/staff/create"
          component={CreateStaffPage}
        />
        <PrivateRoute
          path="/salon/:salonId/staff/:staffId"
          component={EditStaffPage}
        />
        <PrivateRoute
          path="/salon/:salonId/time_table/create"
          component={CreateTimeTablePage}
        />
        <PrivateRoute
          path="/salon/:salonId/appointment"
          component={CreateAppointmentPage}
        />
        <PrivateRoute path="/salon/create" component={CreateSalonPage} />
        <PrivateRoute path="/salon/:salonId/edit" component={EditSalonPage} />
        <PrivateRoute path="/salon/:salonId" component={SalonPage} />
        <PrivateRoute path="/appointments" component={AppointmentsPage} />
        <PrivateRoute path="/salon" component={SalonListPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </div>
  </Router>
);

export default MainRouter;
