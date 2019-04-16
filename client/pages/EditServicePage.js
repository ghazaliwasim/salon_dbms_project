import React from 'react';

import ServiceForm from '../components/ServiceForm';
import {readService, updateService} from '../api/service.api';
import {isAuthenticated} from '../helpers/auth.helper';

class EditServicePage extends React.Component {
  state = {
    service: null,
  };

  componentDidMount () {
    const {salonId, serviceId} = this.props.match.params;
    const {token} = isAuthenticated ();

    readService (token, serviceId).then (service => {
      this.setState (() => ({service}));
    });
  }

  onSubmit = payload => {
    const {salonId, serviceId} = this.props.match.params;
    const {token} = isAuthenticated ();
    updateService (token, serviceId, payload).then (() => {
      this.props.history.push (`/salon/${salonId}`);
    });
  };

  render () {
    return (
      <div>
        {this.state.service &&
          <ServiceForm
            title="Edit Service"
            service={this.state.service}
            onSubmit={payload => {
              this.onSubmit (payload);
            }}
          />}
      </div>
    );
  }
}

export default EditServicePage;
