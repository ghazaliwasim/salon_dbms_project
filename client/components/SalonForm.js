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
  title: {
    fontWeight: 300,
    marginBottom: theme.spacing.unit * 5,
  },
  textField: {
    marginBottom: theme.spacing.unit * 2,
    width: 300,
  },
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing.unit * 2,
    textAlign: 'center',
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

class SalonForm extends React.Component {
  state = {
    name: this.props.salon ? this.props.salon.name : '',
    location: this.props.salon ? this.props.salon.location : '',
    contact_no: this.props.salon ? this.props.salon.contact_no : '',
    website_link: this.props.salon ? this.props.salon.website_link : '',
    email: this.props.salon ? this.props.salon.email : '',
    error: '',
  };

  handleFieldChange = field => {
    return e => {
      const value = e.target.value;
      this.setState(() => ({[field]: value}));
    };
  };

  handleSubmit = e => {
    if (
      !this.state.name ||
      !this.state.location ||
      !this.state.contact_no ||
      !this.state.website_link ||
      !this.state.email
    ) {
      this.setState(() => ({error: 'All fields are necessary!'}));
    } else {
      const salon = {
        name: this.state.name,
        location: this.state.location,
        contact_no: this.state.contact_no,
        website_link: this.state.website_link,
        email: this.state.email,
      };

      this.props.onSubmit(salon);
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
            label="Name"
            value={this.state.name}
            onChange={this.handleFieldChange('name')}
          />
          <br />
          <TextField
            className={classes.textField}
            variant="outlined"
            label="Location"
            value={this.state.location}
            onChange={this.handleFieldChange('location')}
          />
          <br />
          <TextField
            className={classes.textField}
            variant="outlined"
            label="Contact No"
            value={this.state.contact_no}
            onChange={this.handleFieldChange('contact_no')}
          />
          <br />
          <TextField
            className={classes.textField}
            variant="outlined"
            label="Website Link"
            value={this.state.website_link}
            onChange={this.handleFieldChange('website_link')}
          />
          <br />
          <TextField
            className={classes.textField}
            variant="outlined"
            label="Email"
            value={this.state.email}
            onChange={this.handleFieldChange('email')}
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
            onClick={this.handleSubmit}
            className={classes.button}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(SalonForm);
