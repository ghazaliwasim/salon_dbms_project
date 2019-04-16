import axios from 'axios';

export const create = (token, service) => {
  return axios ({
    method: 'post',
    url: '/api/service',
    data: JSON.stringify (service),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  }).then (({data}) => {
    console.log (data);
  });
};

export const listServices = (token, salonId) => {
  return axios ({
    method: 'get',
    url: `/api/service?salonId=${salonId}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  }).then (({data}) => {
    return data.services;
  });
};

export const readService = (token, serviceId) => {
  return axios ({
    method: 'get',
    url: `/api/service/${serviceId}`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }).then (({data}) => {
    return data;
  });
};

export const updateService = (token, serviceId, payload) => {
  return axios ({
    method: 'post',
    url: `/api/service/${serviceId}`,
    data: JSON.stringify (payload),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  }).then (({data}) => {
    console.log (data);
  });
};

export const removeService = (token, serviceId) => {
  return axios ({
    method: 'delete',
    url: `/api/service/${serviceId}`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }).then (({data}) => {
    console.log (data);
  });
};
