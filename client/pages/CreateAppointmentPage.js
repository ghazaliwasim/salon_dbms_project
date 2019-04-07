import React from 'react';
import _ from 'lodash';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

import {listServices} from '../api/service.api';
import {listStaffs} from '../api/staff.api';
import {isAuthenticated} from '../helpers/auth.helper';
import {createAppointment} from '../api/appointment.api';

const styles = theme => ({
  root: {
    maxWidth: 900,
    margin: 'auto',
    marginTop: theme.spacing.unit * 5,
  },
  title: {
    fontWeight: 300,
    marginBottom: theme.spacing.unit * 2,
  },
  section: {
    marginBottom: theme.spacing.unit * 5,
  },
});

class CreateAppointmentPage extends React.Component {
  state = {
    services: [],
    checkedServices: [],
    staffs: [],
    staff: '',
    totalCost: 0,
    startDate: new Date (),
  };

  componentDidMount () {
    const {token} = isAuthenticated ();
    const {salonId} = this.props.match.params;

    listServices (token, salonId).then (services => {
      this.setState (() => ({services}));
    });

    listStaffs (token, salonId).then (staffs => {
      this.setState (() => ({staffs}));
    });
  }

  handleDateChange = date => {
    this.setState (() => ({startDate: date}));
  };

  onFieldChange = e => {
    const value = parseInt (e.target.value, 10);
    if (e.target.checked) {
      this.setState (() => ({
        checkedServices: [
          ...this.state.checkedServices,
          this.state.services.find (service => service.id === value),
        ],
      }));
    } else {
      this.setState (() => ({
        checkedServices: _.pull (
          this.state.checkedServices,
          this.state.services.find (service => service.id === value)
        ),
      }));
    }
  };

  onStaffChange = e => {
    const staff = e.target.value;

    this.setState (() => ({staff}));
  };

  getTotalCost = () => {
    let totalCost = 0;
    this.state.checkedServices.forEach (service => {
      totalCost = totalCost + service.cost;
    });

    return totalCost;
  };

  handleSubmit = () => {
    const {user, token} = isAuthenticated ();
    const {salonId} = this.props.match.params;

    const appointment = {
      timing: this.state.startDate,
      user_id: user.id,
      salon_id: parseInt (salonId, 10),
      staff_id: parseInt (this.state.staff, 10),
      services: this.state.checkedServices.map (service => {
        return service.id;
      }),
    };

    console.log (appointment);
    console.log (typeof appointment.timing);
    createAppointment (token, appointment);
  };

  render () {
    const {classes} = this.props;

    return (
      <div className={classes.root}>

        <Typography color="primary" className={classes.title} variant="h4">
          Book Appointment
        </Typography>

        <div className={classes.section}>
          <Typography variant="h5">Choose Services</Typography>

          {this.state.services.map (service => (
            <div key={service.id}>

              <FormControlLabel
                control={
                  <Checkbox
                    value={JSON.stringify (service.id)}
                    onChange={this.onFieldChange}
                  />
                }
                label={
                  <Typography variant="subtitle1">{service.name}</Typography>
                }
              />
            </div>
          ))}

          <Typography variant="subtitle2">
            Total Cost - {this.getTotalCost ()}
          </Typography>
        </div>

        <div className={classes.section}>
          <Typography variant="h5">Choose Staff</Typography>

          <RadioGroup
            aria-label="Staff"
            name="staff"
            value={this.state.staff}
            onChange={this.onStaffChange}
          >
            {this.state.staffs.map (staff => (
              <FormControlLabel
                key={staff.id}
                value={JSON.stringify (staff.id)}
                control={<Radio />}
                label={
                  <Typography variant="subtitle1">
                    {staff.first_name}{' '}{staff.last_name}
                  </Typography>
                }
              />
            ))}
          </RadioGroup>
        </div>

        <div>
          <DatePicker
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={60}
            selected={this.state.startDate}
            onChange={this.handleDateChange}
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </div>

        <Button
          color="secondary"
          variant="contained"
          onClick={this.handleSubmit}
        >
          Book Appointment
        </Button>
      </div>
    );
  }
}

export default withStyles (styles) (CreateAppointmentPage);
