import React from 'react';

import {listAppointments} from '../api/appointment.api';
import {isAuthenticated} from '../helpers/auth.helper';

import AppointmentCard from '../components/AppointmentCard';

class AppointmentsPage extends React.Component {
  state = {
    appointments: [],
  };

  componentDidMount() {
    const {token} = isAuthenticated();

    listAppointments(token).then(appointments => {
      this.setState(() => ({appointments}));
    });
  }

  render() {
    return (
      <div>
        {this.state.appointments.map((a, i) => (
          <AppointmentCard key={a.id} appointment={a} i={i} />
        ))}
      </div>
    );
  }
}

export default AppointmentsPage;
