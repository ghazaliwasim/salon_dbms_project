import React from 'react';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing.unit * 5,
    textAlign: 'center',
    marginBottom: theme.spacing.unit * 5,
  },
  textField: {
    width: 300,
    marginBottom: theme.spacing.unit * 2,
  },
  title: {
    fontWeight: 300,
    marginBottom: theme.spacing.unit * 5,
  },
  button: {
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2,
  },
  error: {
    color: red[500],
    fontWeight: 'bold',
  },
});

class StaffForm extends React.Component {
  state = {
    first_name: this.props.staff ? this.props.staff.first_name : '',
    last_name: this.props.staff ? this.props.staff.last_name : '',
    age: this.props.staff ? this.props.staff.age : '',
    gender: this.props.staff ? this.props.staff.gender : '',
    contact_no: this.props.staff ? this.props.staff.contact_no : '',
    error: '',
  };

  onFieldChange = name => {
    return e => {
      const value = e.target.value;
      this.setState(() => ({[name]: value}));
    };
  };

  onSubmit = () => {
    const {salonId} = this.props;

    if (
      !this.state.first_name ||
      !this.state.last_name ||
      !this.state.age ||
      !this.state.gender ||
      !this.state.contact_no
    ) {
      this.setState(() => ({error: 'All fields are necessary!'}));
    } else {
      const staff = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        age: this.state.age,
        gender: this.state.gender,
        contact_no: this.state.contact_no,
        salon_id: parseInt(salonId, 10),
      };

      this.props.onSubmit(staff);
    }
  };

  render() {
    const {classes} = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} variant="h4">
            {this.props.title}
          </Typography>
          <TextField
            className={classes.textField}
            variant="outlined"
            type="text"
            label="First Name"
            value={this.state.first_name}
            onChange={this.onFieldChange('first_name')}
          />
          <br />
          <TextField
            className={classes.textField}
            variant="outlined"
            type="text"
            label="Last Name"
            value={this.state.last_name}
            onChange={this.onFieldChange('last_name')}
          />
          <br />
          <TextField
            className={classes.textField}
            variant="outlined"
            type="text"
            label="Age"
            value={this.state.age}
            onChange={this.onFieldChange('age')}
          />
          <br />
          <TextField
            className={classes.textField}
            variant="outlined"
            type="text"
            label="Gender"
            value={this.state.gender}
            onChange={this.onFieldChange('gender')}
          />
          <br />
          <TextField
            className={classes.textField}
            variant="outlined"
            type="text"
            label="Contact Number"
            value={this.state.contact_no}
            onChange={this.onFieldChange('contact_no')}
          />
          <br />
          {this.state.error && (
            <Typography className={classes.error}>
              {this.state.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={this.onSubmit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(StaffForm);
