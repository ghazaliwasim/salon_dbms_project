import React from 'react';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

import {listSalons} from '../api/salon.api';
import {isAuthenticated} from '../helpers/auth.helper';
import SalonItem from '../components/SalonItem';

const styles = theme => ({
  root: {
    maxWidth: 900,
    margin: 'auto',
    marginTop: theme.spacing.unit * 5,
  },
  title: {
    fontWeight: 300,
    paddingLeft: theme.spacing.unit * 2,
  },
  list: {
    marginTop: theme.spacing.unit * 2,
  },
  textField: {
    marginTop: theme.spacing.unit * 2,
  },
  searchButton: {
    marginTop: theme.spacing.unit * 2,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
});

class SalonListPage extends React.Component {
  state = {
    salons: [],
    searchQuery: '',
  };

  componentDidMount () {
    const {token} = isAuthenticated ();

    listSalons (token).then (salons => {
      this.setState (() => ({salons}));
    });
  }

  onSearchQueryChange = e => {
    const value = e.target.value;
    this.setState (() => ({searchQuery: value}));
  };

  handleSearch = () => {
    const {token} = isAuthenticated ();
    listSalons (token, this.state.searchQuery).then (salons => {
      this.setState (() => ({salons}));
    });
  };

  render () {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <Typography className={classes.title} variant="h4">Salons</Typography>
        <div className={classes.flex}>
          <TextField
            className={classes.textField}
            label="Search salon"
            variant="outlined"
            value={this.state.searchQuery}
            onChange={this.onSearchQueryChange}
          />
          <Button
            variant="outlined"
            color="primary"
            className={classes.searchButton}
            onClick={this.handleSearch}
          >
            Search
          </Button>
        </div>
        <List className={classes.list}>
          {this.state.salons.length > 0 &&
            this.state.salons.map (salon => (
              <SalonItem key={salon.id} salon={salon} />
            ))}
        </List>
      </div>
    );
  }
}

export default withStyles (styles) (SalonListPage);
