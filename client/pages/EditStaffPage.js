import React from 'react';

import StaffForm from '../components/StaffForm';
import {readStaff, update} from '../api/staff.api';
import {isAuthenticated} from '../helpers/auth.helper';

class EditStaffPage extends React.Component {
  state = {
    staff: null,
    salonId: null,
    staffId: null,
  };

  componentDidMount () {
    const {salonId, staffId} = this.props.match.params;
    const {token} = isAuthenticated ();

    readStaff (token, staffId).then (staff => {
      this.setState (() => ({staff, salonId, staffId}));
    });
  }

  onSubmit = staff => {
    const {token} = isAuthenticated ();
    const {salonId} = this.props.match.params;
    update (token, this.state.staffId, staff).then (() => {
      this.props.history.push (`/salon/${salonId}`);
    });
  };

  render () {
    return (
      <div>
        {this.state.staff &&
          <StaffForm
            title={'Update Staff'}
            staff={this.state.staff}
            salonId={this.state.salonId}
            onSubmit={staff => {
              this.onSubmit (staff);
            }}
          />}
      </div>
    );
  }
}

export default EditStaffPage;
