const express = require ('express');
const authCtrl = require ('../controllers/auth.controller');
const feedbackCtrl = require ('../controllers/feedback.controller');

const router = express.Router ();

router
  .route ('/api/feedback')
  .post (authCtrl.requireSignin, feedbackCtrl.create);

module.exports = router;
