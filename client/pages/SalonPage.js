import React from 'react';
import {Link} from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import DirectionsIcon from '@material-ui/icons/Directions';
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
import WebIcon from '@material-ui/icons/Web';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

import {readSalon} from '../api/salon.api';
import {listStaffs} from '../api/staff.api';
import {listServices} from '../api/service.api';
import {isAuthenticated} from '../helpers/auth.helper';

const styles = theme => ({
  root: {
    maxWidth: 900,
    margin: 'auto',
    marginTop: theme.spacing.unit * 5,
  },
  title: {
    fontWeight: 300,
    marginBottom: theme.spacing.unit * 2,
  },
  section: {
    marginBottom: theme.spacing.unit * 3,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  detail: {
    paddingLeft: theme.spacing.unit * 2,
  },
  staffItem: {
    marginBottom: theme.spacing.unit * 2,
  },
  button: {
    marginTop: theme.spacing.unit * 2,
  },
  link: {
    textDecoration: 'none',
  },
});

class SalonPage extends React.Component {
  state = {
    salon: null,
    staffs: [],
    services: [],
  };

  componentDidMount() {
    const {token} = isAuthenticated();
    const {salonId} = this.props.match.params;

    readSalon(token, salonId).then(salon => {
      this.setState(() => ({salon}));
    });

    listStaffs(token, salonId).then(staffs => {
      this.setState(() => ({staffs}));
    });

    listServices(token, salonId).then(services => {
      this.setState(() => ({services}));
    });
  }

  render() {
    const {classes} = this.props;
    const {salon} = this.state;
    return (
      <div className={classes.root}>
        {salon && (
          <div>
            <Typography color="primary" className={classes.title} variant="h3">
              {salon.name}
            </Typography>

            <div className={classes.section}>
              <Typography color="secondary" variant="h5" gutterBottom>
                Details
              </Typography>
              <Typography variant="body1" className={classes.flex}>
                <DirectionsIcon />
                <span className={classes.detail}>{salon.location}</span>
              </Typography>
              <Typography variant="body1" className={classes.flex}>
                <CallIcon />
                <span className={classes.detail}>{salon.contact_no}</span>
              </Typography>
              <Typography variant="body1" className={classes.flex}>
                <WebIcon />
                <span className={classes.detail}>{salon.website_link}</span>
              </Typography>
              <Typography variant="body1" className={classes.flex}>
                <EmailIcon />
                <span className={classes.detail}>{salon.email}</span>
              </Typography>
              {this.state.salon.user_id === isAuthenticated().user.id && (
                <Link
                  className={classes.link}
                  to={`/salon/${this.state.salon.id}/edit`}
                >
                  <Button
                    className={classes.button}
                    variant="outlined"
                    color="secondary"
                  >
                    Edit Salon Details
                  </Button>
                </Link>
              )}
            </div>

            <div>
              <Typography color="secondary" variant="h5" gutterBottom>
                Staffs
              </Typography>
              {this.state.staffs.map(staff => (
                <div className={classes.staffItem} key={staff.id}>
                  <Typography variant="h6">
                    {staff.first_name} {staff.last_name}
                  </Typography>
                  <Typography variant="body2">{staff.age} Years</Typography>
                  <Typography variant="body2" gutterBottom>
                    {staff.gender === 'M' && 'Male'}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {staff.gender === 'F' && 'Female'}
                  </Typography>
                  <Divider variant="fullWidth" />
                </div>
              ))}
            </div>

            <div>
              <Typography color="secondary" variant="h5" gutterBottom>
                Services
              </Typography>
              {this.state.services.map(service => (
                <div key={service.id}>
                  <Typography variant="h6">{service.name}</Typography>
                  <Typography variant="subtitle1">
                    Brand: {service.brand}
                  </Typography>
                  <Typography variant="subtitle1">
                    Benefits: {service.benefits}
                  </Typography>
                  <Typography variant="subtitle1">
                    Points To Remember: {service.points_to_remember}
                  </Typography>
                  <Typography variant="subtitle1">
                    Recommended For: {service.recommended_for}
                  </Typography>
                  <Typography variant="subtitle1">
                    Cost: &#8377; {service.cost}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(SalonPage);
