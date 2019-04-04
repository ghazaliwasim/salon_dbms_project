import React from 'react';

import FeedbackForm from '../components/FeedbackForm';
import {createFeedback} from '../../api/feedback.api';
import {isAuthenticated} from '../../helpers/auth.helper';

class AddFeedbackPage extends React.Component {
  onSubmit({feedbackText, rating}) {
    const {salonId} = this.props.match.params;
    const {token} = isAuthenticated ();

    const feedback = {
      feedback_text: feedbackText,
      rating,
      salon_id: salonId,
    };

    createFeedback (token, feedback);
  }

  render () {
    return (
      <FeedbackForm
        onSubmit={payload => {
          this.onSubmit (payload);
        }}
      />
    );
  }
}

export default AddFeedbackPage;
