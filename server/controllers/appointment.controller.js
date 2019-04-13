const connection = require('../mysql/mysql_connection');

const create = (req, res) => {
  const {timing, user_id, salon_id, staff_id, services} = req.body;

  const appointment = {
    timing: new Date(timing),
    user_id,
    salon_id,
    staff_id,
  };

  const sql1 = `
    INSERT INTO appointment SET ?
  `;

  connection.query(sql1, appointment, function(err, results, fields) {
    if (err) {
      console.log(err);
      return res.status(400).json({err});
    }

    const appointments = [];
    services.forEach(service => {
      appointments.push([results.insertId, service]);
    });

    const sql2 = `
      INSERT INTO appointment_service_info
      (appointment_id, service_id)
      VALUES
      ?
    `;

    console.log(appointments);

    connection.query(sql2, [appointments], function(err, results, fields) {
      if (err) {
        return res.status(400).json({
          err,
        });
      }

      res.status(200).json({
        message: 'Appointment created successfully!',
      });
    });
  });
};

const list = (req, res) => {
  console.log(req.auth);
  const sql = `
    SELECT * FROM appointment
    WHERE user_id = ?
  `;

  connection.query(sql, req.auth.id, function(err, results, fields) {
    if (err) {
      return res.status(400).json({
        errorMessage: 'Unable to fetch appointments',
      });
    }

    res.status(200).json({
      appointments: results,
    });
  });
};

const read = (req, res) => {
  const {appointmentId} = req.params;

  const sql = `
    SELECT service_id FROM appointment_service_info
    WHERE appointment_id = ?
  `;

  connection.query(sql, parseInt(appointmentId, 10), function(
    err,
    results,
    fields
  ) {
    if (err) {
      return res.status(400).json({
        err,
      });
    }

    res.status(200).json({
      services: results.map(r => {
        return r.service_id;
      }),
    });
  });
};

const remove = (req, res) => {
  const {appointmentId} = req.params;

  const sql = `
    DELETE FROM appointment_service_info
    WHERE appointment_id = ?
  `;

  connection.query(sql, parseInt(appointmentId), function(
    err1,
    results1,
    fields1
  ) {
    if (err1) {
      return res.status(400).json(err1);
    }

    const sql2 = `
      DELETE FROM appointment
      WHERE id =?
    `;

    connection.query(sql2, parseInt(appointmentId), function(
      err2,
      results2,
      fields2
    ) {
      if (err2) {
        return res.status(400).json(err2);
      }

      res.status(200).json({
        message: 'Appointment Deleted Successfully!',
      });
    });
  });
};

module.exports = {create, list, read, remove};
