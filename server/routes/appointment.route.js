const express = require('express');
const authCtrl = require('../controllers/auth.controller');
const appointmentCtrl = require('../controllers/appointment.controller');

const router = express.Router();

router
  .route('/api/appointment')
  .post(authCtrl.requireSignin, appointmentCtrl.create)
  .get(authCtrl.requireSignin, appointmentCtrl.list);

router
  .route('/api/appointment/:appointmentId')
  .get(authCtrl.requireSignin, appointmentCtrl.read)
  .delete(authCtrl.requireSignin, appointmentCtrl.remove);

module.exports = router;
