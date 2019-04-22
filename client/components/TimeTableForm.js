import React from 'react';

class TimeTableForm extends React.Component {
  state = {
    monOpeningTime: '',
    monClosingTime: '',
    tueOpeningTime: '',
    tueClosingTime: '',
    wedOpeningTime: '',
    wedClosingTime: '',
    thurOpeningTime: '',
    thurClosingTime: '',
    friOpeningTime: '',
    friClosingTime: '',
    satOpeningTime: '',
    satClosingTime: '',
    sunOpeningTime: '',
    sunClosingTime: '',
  };

  onFieldChange = name => {
    return e => {
      const value = e.target.value;
      this.setState (() => ({[name]: value}));
    };
  };

  handleSubmit = () => {
    const {salonId} = this.props;

    const timeTable = [
      ['Monday', this.state.monOpeningTime, this.state.monClosingTime, salonId],
      [
        'Tuesday',
        this.state.tueOpeningTime,
        this.state.tueClosingTime,
        salonId,
      ],
      [
        'Wednesday',
        this.state.wedOpeningTime,
        this.state.wedClosingTime,
        salonId,
      ],
      [
        'Thursday',
        this.state.thurOpeningTime,
        this.state.thurClosingTime,
        salonId,
      ],
      ['Friday', this.state.friOpeningTime, this.state.friClosingTime, salonId],
      [
        'Saturday',
        this.state.satOpeningTime,
        this.state.satClosingTime,
        salonId,
      ],
      ['Sunday', this.state.sunOpeningTime, this.state.sunClosingTime, salonId],
    ];

    this.props.onSubmit (timeTable);
  };

  render () {
    return (
      <div>
        <h2>Add Time Table</h2>
        <h3>Monday</h3>
        <input
          type="text"
          placeholder="Opening Time"
          value={this.state.monOpeningTime}
          onChange={this.onFieldChange ('monOpeningTime')}
        />
        <input
          type="text"
          placeholder="Closing Time"
          value={this.state.monClosingTime}
          onChange={this.onFieldChange ('monClosingTime')}
        />
        <hr />
        <h3>Tuesday</h3>
        <input
          type="text"
          placeholder="Opening Time"
          value={this.state.tueOpeningTime}
          onChange={this.onFieldChange ('tueOpeningTime')}
        />
        <input
          type="text"
          placeholder="Closing Time"
          value={this.state.tueClosingTime}
          onChange={this.onFieldChange ('tueClosingTime')}
        />
        <hr />
        <h3>Wednesday</h3>
        <input
          type="text"
          placeholder="Opening Time"
          value={this.state.wedOpeningTime}
          onChange={this.onFieldChange ('wedOpeningTime')}
        />
        <input
          type="text"
          placeholder="Closing Time"
          value={this.state.wedClosingTime}
          onChange={this.onFieldChange ('wedClosingTime')}
        />
        <hr />
        <h3>Thursday</h3>
        <input
          type="text"
          placeholder="Opening Time"
          value={this.state.thurOpeningTime}
          onChange={this.onFieldChange ('thurOpeningTime')}
        />
        <input
          type="text"
          placeholder="Closing Time"
          value={this.state.thurClosingTime}
          onChange={this.onFieldChange ('thurClosingTime')}
        />
        <hr />
        <h3>Friday</h3>
        <input
          type="text"
          placeholder="Opening Time"
          value={this.state.friOpeningTime}
          onChange={this.onFieldChange ('friOpeningTime')}
        />
        <input
          type="text"
          placeholder="Closing Time"
          value={this.state.friClosingTime}
          onChange={this.onFieldChange ('friClosingTime')}
        />
        <hr />
        <h3>Saturday</h3>
        <input
          type="text"
          placeholder="Opening Time"
          value={this.state.satOpeningTime}
          onChange={this.onFieldChange ('satOpeningTime')}
        />
        <input
          type="text"
          placeholder="Closing Time"
          value={this.state.satClosingTime}
          onChange={this.onFieldChange ('satClosingTime')}
        />
        <hr />
        <h3>Sunday</h3>
        <input
          type="text"
          placeholder="Opening Time"
          value={this.state.sunOpeningTime}
          onChange={this.onFieldChange ('sunOpeningTime')}
        />
        <input
          type="text"
          placeholder="Closing Time"
          value={this.state.sunClosingTime}
          onChange={this.onFieldChange ('sunClosingTime')}
        />
        <hr />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

export default TimeTableForm;
