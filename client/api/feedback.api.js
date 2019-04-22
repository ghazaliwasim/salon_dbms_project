import axios from 'axios';

export const createFeedback = (token, feedback) => {
  return axios({
    method: 'post',
    url: '/api/feedback',
    data: JSON.stringify(feedback),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  }).then(({data}) => {
    console.log(data);
  });
};

export const listFeedback = (token, salonId) => {
  return axios({
    method: 'get',
    url: `/api/feedback?salonId=${salonId}`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }).then(({data}) => {
    console.log(data);
    return data.feedbacks;
  });
};
