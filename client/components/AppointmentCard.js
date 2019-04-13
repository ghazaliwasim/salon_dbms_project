import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

import {readAppointment, removeAppointment} from '../api/appointment.api';
import {readSalon} from '../api/salon.api';
import {readStaff} from '../api/staff.api';
import {readService} from '../api/service.api';
import {isAuthenticated} from '../helpers/auth.helper';

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
});

class AppointmentCard extends React.Component {
  state = {
    salon: {},
    staff: {},
    services: [],
  };

  componentDidMount() {
    const {token} = isAuthenticated();
    const {appointment} = this.props;

    readSalon(token, appointment.salon_id).then(salon => {
      this.setState(() => ({salon}));
    });

    readStaff(token, appointment.staff_id).then(staff => {
      this.setState(() => ({staff}));
    });

    readAppointment(token, appointment.id).then(services => {
      services.forEach(s => {
        readService(token, s).then(data => {
          this.setState(() => ({services: [...this.state.services, data]}));
        });
      });
    });
  }

  handleCancelAppointment = () => {
    const {token} = isAuthenticated();
    const {appointment} = this.props;

    removeAppointment(token, appointment.id);
  };

  render() {
    const {i, classes} = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5">Appointment #{i + 1}</Typography>
          <Typography>Salon: {this.state.salon.name}</Typography>
          <Typography>
            Staff: {this.state.staff.first_name} {this.state.staff.last_name}
          </Typography>
          <Typography>Services: </Typography>
          {this.state.services.map(s => {
            return <Typography key={s.id}>{s.name}</Typography>;
          })}
        </CardContent>
        <CardActions>
          <Button onClick={this.handleCancelAppointment}>
            Cancel Appointment
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(AppointmentCard);
