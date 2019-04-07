const express = require ('express');
const authCtrl = require ('../controllers/auth.controller');
const staffCtrl = require ('../controllers/staff.controller');

const router = express.Router ();

router
  .route ('/api/staff')
  .post (authCtrl.requireSignin, staffCtrl.create)
  .get (authCtrl.requireSignin, staffCtrl.list);

router
  .route ('/api/staff/:staffId')
  .post (authCtrl.requireSignin, staffCtrl.update)
  .get (authCtrl.requireSignin, staffCtrl.read)
  .delete (authCtrl.requireSignin, staffCtrl.remove);

module.exports = router;
