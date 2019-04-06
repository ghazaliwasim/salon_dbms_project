import React from 'react';

import {isAuthenticated} from '../helpers/auth.helper';
import {create} from '../api/staff.api';

import StaffForm from '../components/StaffForm';

class CreateStaffPage extends React.Component {
  onSubmit = staff => {
    const {token} = isAuthenticated();

    create(token, staff);
  };

  render() {
    return (
      <StaffForm
        title={'Create Staff'}
        salonId={this.props.match.params.salonId}
        onSubmit={staff => {
          this.onSubmit(staff);
        }}
      />
    );
  }
}

export default CreateStaffPage;
