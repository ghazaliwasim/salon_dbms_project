import React from 'react';
import {Link} from 'react-router-dom';

import Button from '@material-ui/core/Button';

import {read} from '../../api/salon.api';
import {list} from '../../api/staff.api';
import {listServices} from '../../api/service.api';
import {listTimeTable} from '../../api/salonTimeTable.api';
import {isAuthenticated} from '../../helpers/auth.helper';

class SalonPage extends React.Component {
  state = {
    salon: null,
    staffs: [],
    services: [],
    timeTable: [],
  };

  componentDidMount () {
    const {token} = isAuthenticated ();
    const {salonId} = this.props.match.params;
    read (token, salonId).then (salon => {
      this.setState (() => ({salon}));
    });

    list (token, salonId).then (staffs => {
      this.setState (() => ({staffs}));
    });

    listServices (token, salonId).then (services => {
      this.setState (() => ({services}));
    });

    listTimeTable (token, salonId).then (timeTable => {
      this.setState (() => ({timeTable}));
    });
  }

  render () {
    const {salon} = this.state;
    return (
      <div>
        {this.state.salon
          ? <div>
              <h2>Salon Details</h2>
              <p>Name: {salon.name}</p>
              {this.state.salon.user_id === isAuthenticated ().user.id &&
                <Link to={`/salon/${this.state.salon.id}/update`}>Edit</Link>}

              <Link to={`/salon/${salon.id}/appointment`}>
                Book Appointment
              </Link>

              <hr />
              <div>
                <h2>Staffs</h2>
                {this.state.staffs.map (staff => (
                  <li key={staff.id}>
                    <span>{staff.first_name}{' '}{staff.last_name}</span>
                    {this.state.salon.user_id === isAuthenticated ().user.id &&
                      <button
                        onClick={() => {
                          this.props.history.push (
                            `/salon/${this.state.salon.id}/staff/${staff.id}`
                          );
                        }}
                      >
                        Edit
                      </button>}

                  </li>
                ))}
                {this.state.salon.user_id === isAuthenticated ().user.id &&
                  <Link to={`/salon/${salon.id}/staff/create`}>
                    <Button>Add Staff</Button>
                  </Link>}

              </div>
              <hr />
              <h2>Services</h2>
              {this.state.services.map (service => (
                <li key={service.id}>
                  <span>{service.name} - {service.cost}</span>
                  {/* <button
                    onClick={() => {
                      this.props.history.push (
                        `/salon/${this.state.salon.id}/staff/${staff.id}`
                      );
                    }}
                  >
                    Edit
                  </button> */}
                </li>
              ))}

              {this.state.salon.user_id === isAuthenticated ().user.id &&
                <Link to={`/salon/${salon.id}/service/create`}>
                  Add service
                </Link>}

              <hr />

              <h2>Salon Time Table</h2>
              {this.state.timeTable.map (tt => (
                <li key={tt.day}>
                  <span>{tt.day}-{tt.opening_time}-{tt.closing_time}</span>
                </li>
              ))}
              <Link to={`/salon/${salon.id}/time_table/create`}>
                Add Time table
              </Link>

              <hr />

              <h2>Feedback</h2>
              <Link to={`/salon/${salon.id}/feedback/create`}>
                Add feedback
              </Link>

            </div>
          : <div>Loading</div>}
      </div>
    );
  }
}

export default SalonPage;
