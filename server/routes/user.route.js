const express = require('express');
const userCtrl = require('../controllers/user.controller');
const authCtrl = require('../controllers/auth.controller.js');

const router = express.Router();

router.route('/api/user').post(userCtrl.create);

router.route('/api/user/:userId').get(userCtrl.read);

router
  .route('/api/current_user')
  .get(authCtrl.requireSignin, userCtrl.currentUser);

module.exports = router;
