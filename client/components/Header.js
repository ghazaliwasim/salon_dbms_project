import React from 'react';
import {Link} from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {withStyles} from '@material-ui/core/styles';

import {isAuthenticated} from '../helpers/auth.helper';
import {IconButton, Menu, MenuItem} from '@material-ui/core';

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

class Header extends React.Component {
  state = {
    anchorEl: null,
  };

  handleMenu = e => {
    this.setState({anchorEl: e.currentTarget});
  };

  handleClose = () => {
    this.setState({anchorEl: null});
  };

  render() {
    const {classes} = this.props;
    const {anchorEl} = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography className={classes.grow} variant="h6">
              Salon
            </Typography>

            {isAuthenticated() ? (
              // (<Button
              //     className={classes.button}
              //     color="secondary"
              //     variant="contained"
              //   >
              //     Logout
              //   </Button>)
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>
                    <Link className={classes.link} to="/salon/create">
                      Create Salon
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              <div>
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
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
