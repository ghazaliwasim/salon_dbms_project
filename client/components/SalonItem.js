import React from 'react';
import {Link} from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemtext';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  link: {
    textDecoration: 'none',
  },
});

const SalonItem = ({salon, classes}) => (
  <ListItem>
    <ListItemText
      primary={
        <Link className={classes.link} to={`/salon/${salon.id}`}>
          <Typography color="primary" variant="h5" component="span">
            {salon.name}
          </Typography>
        </Link>
      }
      secondary={
        <React.Fragment>
          <Typography variant="subtitle1" component="span">
            {salon.location}
          </Typography>
          <Typography variant="subtitle2" component="span">
            {salon.website_link}
          </Typography>
        </React.Fragment>
      }
    />
  </ListItem>
);

export default withStyles (styles) (SalonItem);
