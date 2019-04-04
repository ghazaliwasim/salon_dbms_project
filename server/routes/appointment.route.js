const express = require ('express');
const appointmentCtrl = require ('../controllers/appointment.controller');

const router = express.Router ();

router
  .route ('/api/appointment')
  .post (appointmentCtrl.create)
  .get (appointmentCtrl.list);

module.exports = router;
