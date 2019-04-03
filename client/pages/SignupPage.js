import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import {withStyles} from '@material-ui/core/styles';

import {create} from '../api/user.api';

const styles = theme => {
  console.log (theme.palette.tertiary);
  return {
    card: {
      maxWidth: 600,
      margin: 'auto',
      textAlign: 'center',
      marginTop: theme.spacing.unit * 5,
      marginBottom: theme.spacing.unit * 5,
    },
    title: {
      fontWeight: 300,
      marginBottom: theme.spacing.unit * 2,
    },
    textField: {
      width: 300,
      marginBottom: theme.spacing.unit * 2,
    },
    button: {
      margin: 'auto',
      marginBottom: theme.spacing.unit * 5,
      backgroundColor: theme.palette.tertiary.main,

      '&:hover': {
        backgroundColor: theme.palette.secondary.main,
      },
    },
    error: {
      color: red[500],
      fontWeight: 'bold',
    },
  };
};

class SignupPage extends React.Component {
  state = {
    firstName: '',
    middleName: '',
    lastName: '',
    gender: 'M',
    email: '',
    password: '',
    error: '',
  };

  onFieldChange = field => {
    return e => {
      const value = e.target.value;
      this.setState (() => ({[field]: value}));
    };
  };

  onSubmit = () => {
    if (
      !this.state.firstName ||
      !this.state.lastName ||
      !this.state.gender ||
      !this.state.email ||
      !this.state.password
    ) {
      this.setState (() => ({
        error: 'All fields are necessary.',
      }));
    } else {
      const user = {
        firstName: this.state.firstName,
        middleName: this.state.middleName || null,
        lastName: this.state.lastName,
        gender: this.state.gender,
        email: this.state.email,
        password: this.state.password,
      };

      create (user).then (data => {
        this.props.history.push ('/login?new=true');
      });
    }
  };

  render () {
    const {classes} = this.props;
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} variant="h4">
              Signup
            </Typography>
            <TextField
              variant="outlined"
              className={classes.textField}
              value={this.state.firstName}
              label="First Name"
              margin="normal"
              onChange={this.onFieldChange ('firstName')}
            />
            <br />
            <TextField
              variant="outlined"
              className={classes.textField}
              value={this.state.middleName}
              label="Middle Name (Optional)"
              margin="normal"
              onChange={this.onFieldChange ('middleName')}
            />
            <br />
            <TextField
              variant="outlined"
              className={classes.textField}
              value={this.state.lastName}
              label="Last Name"
              margin="normal"
              onChange={this.onFieldChange ('lastName')}
            />
            <br />
            <TextField
              variant="outlined"
              className={classes.textField}
              value={this.state.gender}
              select
              label="Gender"
              onChange={this.onFieldChange ('gender')}
            >
              <MenuItem value={'M'}>M</MenuItem>
              <MenuItem value={'F'}>F</MenuItem>
              <MenuItem value={'O'}>O</MenuItem>
            </TextField><br />
            <TextField
              variant="outlined"
              className={classes.textField}
              value={this.state.email}
              label="Email"
              margin="normal"
              onChange={this.onFieldChange ('email')}
            />
            <br />
            <TextField
              variant="outlined"
              className={classes.textField}
              value={this.state.password}
              label="Password"
              margin="normal"
              onChange={this.onFieldChange ('password')}
            />
            <br />
            {this.state.error &&
              <Typography variant="subtitle1" className={classes.error}>
                {this.state.error}
              </Typography>}
          </CardContent>
          <CardActions>
            <Button
              className={classes.button}
              variant="contained"
              onClick={this.onSubmit}
            >
              Submit
            </Button>
          </CardActions>
        </Card>

      </div>
    );
  }
}

export default withStyles (styles) (SignupPage);
