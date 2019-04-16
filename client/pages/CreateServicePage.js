import React from 'react';

import ServiceForm from '../components/ServiceForm';
import {isAuthenticated} from '../helpers/auth.helper';
import {create} from '../api/service.api';

class CreateServicePage extends React.Component {
  onSubmit = service => {
    const {token} = isAuthenticated ();
    const {salonId} = this.props.match.params;

    create (token, service).then (() => {
      this.props.history.push (`/salon/${salonId}`);
    });
  };

  render () {
    return (
      <ServiceForm
        onSubmit={service => {
          this.onSubmit (service);
        }}
        salonId={this.props.match.params.salonId}
        title="Create Service"
      />
    );
  }
}

export default CreateServicePage;
