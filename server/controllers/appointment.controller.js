const connection = require ('../mysql/mysql_connection');

const create = (req, res) => {
  const {timing, user_id, salon_id, staff_id, services} = req.body;

  const appointment = {
    timing: new Date (timing),
    user_id,
    salon_id,
    staff_id,
  };

  const sql1 = `
    INSERT INTO appointment SET ?
  `;

  connection.query (sql1, appointment, function (err, results, fields) {
    if (err) {
      console.log (err);
      return res.status (400).json ({err});
    }

    const appointments = [];
    services.forEach (service => {
      appointments.push ([results.insertId, service]);
    });

    const sql2 = `
      INSERT INTO appointment_service_info
      (appointment_id, service_id)
      VALUES
      ?
    `;

    console.log (appointments);

    connection.query (sql2, [appointments], function (err, results, fields) {
      if (err) {
        return res.status (400).json ({
          err,
        });
      }

      res.status (200).json ({
        message: 'Appointment created successfully!',
      });
    });
  });
};

const list = (req, res) => {
  const {salonId} = req.query;

  const sql = `
    SELECT * FROM appointment
    WHERE salon_id = ?
  `;

  connection.query (sql, parseInt (salonId, 10), function (
    err,
    results1,
    fields
  ) {
    if (err) {
      return res.status (400).json ({
        errorMessage: 'Unable to fetch appointments',
      });
    }

    const sql2 = `
      SELECT
        asi.appointment_id,
        asi.service_id
      FROM appointment AS a
      INNER JOIN appointment_service_info AS asi
      ON a.id = asi.appointment_id
      WHERE salon_id = ?
    `;

    connection.query (sql2, parseInt (salonId, 10), function (
      err,
      results2,
      fields
    ) {
      if (err) {
        return res.status (400).json ({
          errorMessage: 'Unable to fetch appointments',
        });
      }

      const appointments = results1.map (appointment => {
        return {
          ...appointment,
          services: results2.map (asi => {
            if (appointment.id === asi.appointment_id) {
              return asi.service_id;
            }
          }),
        };
      });

      res.status (200).json ({appointments});
    });
  });
};

module.exports = {create, list};
