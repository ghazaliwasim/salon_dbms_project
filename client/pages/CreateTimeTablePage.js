import React from 'react';
import TimeTableForm from '../components/TimeTableForm';

import {isAuthenticated} from '../helpers/auth.helper';
import {create} from '../api/salonTimeTable.api';

class CreateTimeTablePage extends React.Component {
  onSubmit = timeTable => {
    const {token} = isAuthenticated ();

    create (token, timeTable);
  };

  render () {
    return (
      <TimeTableForm
        salonId={this.props.match.params.salonId}
        onSubmit={timeTable => {
          this.onSubmit (timeTable);
        }}
      />
    );
  }
}

export default CreateTimeTablePage;
