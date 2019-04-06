import axios from 'axios';

export const create = (salon, token) => {
  return axios({
    method: 'post',
    url: '/api/salon',
    data: JSON.stringify(salon),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  }).then(({data}) => {
    console.log(data);
  });
};

export const listSalons = (token, limit) => {
  if (limit) {
    return axios({
      method: 'get',
      url: `/api/salon?limit=${limit}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }).then(({data}) => {
      return data.salons;
    });
  } else {
    return axios({
      method: 'get',
      url: `/api/salon`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }).then(({data}) => {
      return data.salons;
    });
  }
};

export const readSalon = (token, salonId) => {
  return axios({
    method: 'get',
    url: `/api/salon/${salonId}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  }).then(({data}) => {
    return data;
  });
};

export const updateSalon = (token, salonId, payload) => {
  console.log(salonId);
  console.log(payload);
  return axios({
    method: 'post',
    url: `/api/salon/${salonId}`,
    data: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  }).then(({data}) => {
    console.log(data);
  });
};
