import React from 'react';
import {Link} from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

import {isAuthenticated} from '../helpers/auth.helper';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    marginRight: theme.spacing.unit * 2,
  },
  link: {
    textDecoration: 'none',
  },
});

const Header = props => {
  const {classes} = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography className={classes.grow} variant="h6">
            Salon
          </Typography>

          {isAuthenticated ()
            ? <Button
                className={classes.button}
                color="secondary"
                variant="contained"
              >
                Logout
              </Button>
            : <div>
                <Link className={classes.link} to="/signup">
                  <Button
                    className={classes.button}
                    color="secondary"
                    variant="contained"
                  >
                    Signup
                  </Button>
                </Link>

                <Link className={classes.link} to="/login">
                  <Button
                    className={classes.button}
                    color="secondary"
                    variant="contained"
                  >
                    Login
                  </Button>
                </Link>
              </div>}

        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles (styles) (Header);
