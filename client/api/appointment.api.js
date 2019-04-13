import axios from 'axios';

export const createAppointment = (token, appointment) => {
  return axios({
    method: 'post',
    url: '/api/appointment',
    data: JSON.stringify(appointment),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  }).then(({data}) => {
    console.log(data);
  });
};

export const listAppointments = token => {
  return axios({
    method: 'get',
    url: '/api/appointment',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }).then(({data}) => {
    return data.appointments;
  });
};

export const readAppointment = (token, appointmentId) => {
  return axios({
    method: 'get',
    url: `/api/appointment/${appointmentId}`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }).then(({data}) => {
    return data.services;
  });
};

export const removeAppointment = (token, appointmentId) => {
  return axios({
    method: 'delete',
    url: `/api/appointment/${appointmentId}`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }).then(({data}) => {
    console.log(data);
  });
};
