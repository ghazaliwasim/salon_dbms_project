import React from 'react';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
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
});

class SalonListPage extends React.Component {
  state = {
    salons: [],
  };

  componentDidMount () {
    const {token} = isAuthenticated ();

    listSalons (token).then (salons => {
      this.setState (() => ({salons}));
    });
  }

  render () {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <Typography className={classes.title} variant="h4">Salons</Typography>
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
