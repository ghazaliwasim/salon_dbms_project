import React from 'react';

class FeedbackForm extends React.Component {
  state = {
    feedbackText: '',
    rating: 0,
  };

  onFieldChange = name => {
    return e => {
      const value = e.target.value;
      this.setState (() => ({[name]: value}));
    };
  };

  handleSubmit = () => {
    const feedback = {
      feedbackText: this.state.feedbackText,
      rating: this.state.rating,
    };

    this.props.onSubmit (feedback);
  };

  render () {
    return (
      <div>
        <input
          type="text"
          value={this.state.feedbackText}
          onChange={this.onFieldChange ('feedbackText')}
        />
        <input
          type="number"
          value={this.state.rating}
          onChange={this.onFieldChange ('rating')}
        />
        <button onClick={this.handleSubmit}>Add Feedback</button>
      </div>
    );
  }
}

export default FeedbackForm;
