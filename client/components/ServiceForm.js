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

class ServiceForm extends React.Component {
  state = {
    name: this.props.service.name ? this.props.service.name : '',
    brand: this.props.service.brand ? this.props.service.brand : '',
    benefits: this.props.service.benefits ? this.props.service.benefits : '',
    points_to_remember: this.props.service.points_to_remember
      ? this.props.service.points_to_remember
      : '',
    recommended_for: this.props.service.recommended_for
      ? this.props.service.recommended_for
      : '',
    cost: this.props.service.cost ? this.props.service.cost : '',
  };

  onFieldChange = name => {
    return e => {
      const value = e.target.value;
      this.setState (() => ({[name]: value}));
    };
  };

  handleSubmit = () => {
    if (
      !this.state.name ||
      !this.state.brand ||
      !this.state.benefits ||
      !this.state.points_to_remember ||
      !this.state.recommended_for ||
      !this.state.cost
    ) {
      this.setState (() => ({error: 'All fields are necessary!'}));
    } else {
      const service = {
        name: this.state.name,
        brand: this.state.brand,
        benefits: this.state.benefits,
        points_to_remember: this.state.points_to_remember,
        recommended_for: this.state.recommended_for,
        cost: this.state.cost,
        salon_id: this.props.salonId,
      };

      this.props.onSubmit (service);
    }
  };

  render () {
    const {classes} = this.props;
    return (
      <Card className={classes.card}>
        <Typography className={classes.title} variant="h4">
          {this.props.title}
        </Typography>
        <CardContent>
          <TextField
            className={classes.textField}
            variant="outlined"
            label="Name"
            value={this.state.name}
            onChange={this.onFieldChange ('name')}
          />
          <br />
          <TextField
            className={classes.textField}
            variant="outlined"
            type="text"
            label="Brand"
            value={this.state.brand}
            onChange={this.onFieldChange ('brand')}
          />
          <br />
          <TextField
            className={classes.textField}
            variant="outlined"
            rows="5"
            label="Benefits"
            value={this.state.benefits}
            onChange={this.onFieldChange ('benefits')}
          />
          <br />
          <TextField
            className={classes.textField}
            variant="outlined"
            rows="5"
            label="Points To Remember"
            value={this.state.points_to_remember}
            onChange={this.onFieldChange ('points_to_remember')}
          />
          <br />
          <TextField
            className={classes.textField}
            variant="outlined"
            rows="5"
            label="Recommended For"
            value={this.state.recommended_for}
            onChange={this.onFieldChange ('recommended_for')}
          />
          <br />
          <TextField
            className={classes.textField}
            variant="outlined"
            type="number"
            label="Cost"
            value={this.state.cost}
            onChange={this.onFieldChange ('cost')}
          />
          <br />
          {this.state.error &&
            <Typography className={classes.error}>
              {this.state.error}
            </Typography>}
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles (styles) (ServiceForm);
