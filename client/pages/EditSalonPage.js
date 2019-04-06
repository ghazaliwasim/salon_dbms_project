import React from 'react';

import SalonForm from '../components/SalonForm';
import {isAuthenticated} from '../helpers/auth.helper';
import {readSalon, updateSalon} from '../api/salon.api';

class EditSalonPage extends React.Component {
  state = {
    salon: null,
  };

  componentDidMount() {
    const {token} = isAuthenticated();
    const {salonId} = this.props.match.params;

    readSalon(token, salonId).then(salon => {
      this.setState(() => ({salon}));
    });
  }

  onSubmit = salon => {
    const {token} = isAuthenticated();
    const {salonId} = this.props.match.params;
    updateSalon(token, salonId, salon);
  };

  render() {
    return (
      <div>
        {this.state.salon && (
          <SalonForm
            title={'Update Salon Details'}
            onSubmit={salon => {
              this.onSubmit(salon);
            }}
            salon={this.state.salon}
          />
        )}
      </div>
    );
  }
}

export default EditSalonPage;
