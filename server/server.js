const express = require ('express');
const bodyParser = require ('body-parser');
require ('./mysql/mysql_connection');
const template = require ('../template');

const userRoutes = require ('./routes/user.route');
const authRoutes = require ('./routes/auth.route');
const salonRoutes = require ('./routes/salon.route');
const staffRoutes = require ('./routes/staff.route');
const serviceRoutes = require ('./routes/service.route');
const salonTimeTableRoutes = require ('./routes/salonTimeTable.route');
const appointmentRoutes = require ('./routes/appointment.route');
const feedbackRoutes = require ('./routes/feedback.route');

const app = express ();
app.use (bodyParser.json ());
app.use (express.static ('dist'));

app.use ('/', userRoutes);
app.use ('/', authRoutes);
app.use ('/', salonRoutes);
app.use ('/', staffRoutes);
app.use ('/', serviceRoutes);
app.use ('/', salonTimeTableRoutes);
app.use ('/', appointmentRoutes);
app.use ('/', feedbackRoutes);

app.get ('*', (req, res) => {
  res.send (template ());
});

app.listen (3000, () => {
  console.log ('Server started on port 3000');
});
