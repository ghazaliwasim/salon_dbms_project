import axios from 'axios';

export const create = data => {
  return axios({
    method: 'post',
    url: '/api/user',
    data: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(({data}) => {
      return data;
    })
    .catch(err => {
      console.log(err.response);
    });
};

export const readUser = (token, userId) => {
  return axios({
    method: 'get',
    url: `/api/user/${userId}`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }).then(({data}) => {
    return data;
  });
};
