import React from 'react';
import queryString from 'query-string';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';

import {login} from '../api/auth.api';
import {authenticate} from '../helpers/auth.helper';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters (),
    marginTop: theme.spacing.unit * 5,
    maxWidth: 600,
    margin: 'auto',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
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
});

class LoginPage extends React.Component {
  state = {
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

  handleSubmit = e => {
    if (!this.state.email || !this.state.password) {
      this.setState (() => ({error: 'All fields are necessary'}));
    } else {
      const user = {
        email: this.state.email,
        password: this.state.password,
      };

      login (user).then (data => {
        if (data.errorMessage) {
          this.setState (() => ({error: data.errorMessage}));
        } else {
          authenticate (data, () => {
            this.props.history.push ('/salon');
          });
        }
      });
    }
  };

  render () {
    const {classes} = this.props;
    const queries = queryString.parse (this.props.location.search);
    return (
      <div>

        {queries.new &&
          <Paper className={classes.paper} elevation={1}>
            <Typography color="primary" variant="h5">
              Account Created
            </Typography>
            <Typography component="p">
              Login to your account.
            </Typography>
          </Paper>}

        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} variant="h4">
              Login
            </Typography>
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
              color="primary"
              onClick={this.handleSubmit}
            >
              Login
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles (styles) (LoginPage);
