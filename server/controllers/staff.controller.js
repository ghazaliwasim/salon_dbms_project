const connection = require ('../mysql/mysql_connection');

const create = (req, res) => {
  const staff = req.body;

  connection.query ('INSERT INTO staff SET ?', staff, function (
    err,
    results,
    fields
  ) {
    if (err) {
      return res.status (400).json ({
        err,
      });
    }

    res.status (200).json ({
      message: 'Staff created successfully',
    });
  });
};

const list = (req, res) => {
  const {salonId} = req.query;

  sql = `
    SELECT
      staff.id,
      staff.first_name,
      staff.last_name,
      staff.age,
      staff.gender,
      staff.contact_no
    FROM staff
    INNER JOIN salon
    ON salon.id = staff.salon_id
    WHERE salon.id = ?
  `;

  connection.query (sql, parseInt (salonId, 10), function (
    err,
    results,
    fields
  ) {
    if (err) {
      return res.status (400).json ({
        err,
      });
    }

    res.status (200).json ({
      staffs: results,
    });
  });
};

const update = (req, res) => {
  const {staffId} = req.params;
  const updateObject = req.body;

  const sql = `
    UPDATE staff
    SET ?
    WHERE id = ?
  `;

  connection.query (sql, [updateObject, parseInt (staffId, 10)], function (
    err,
    results,
    fields
  ) {
    if (err) {
      return res.status (400).json ({
        err,
      });
    }

    res.status (200).json ({
      maessage: 'Staff updated.',
    });
  });
};

const read = (req, res) => {
  const {staffId} = req.params;

  const sql = `
    SELECT * FROM staff
    WHERE id = ?
  `;

  connection.query (sql, parseInt (staffId, 10), function (
    err,
    results,
    fields
  ) {
    if (err) {
      return res.status (400).json ({
        err,
      });
    }

    res.status (200).json (results[0]);
  });
};

const remove = (req, res) => {
  const {staffId} = req.params;

  const sql = `
    DELETE FROM staff WHERE id = ?
  `;

  connection.query (sql, parseInt (staffId, 10), function (
    err,
    results,
    fields
  ) {
    if (err) {
      console.log (err);
      return res.status (400).json ({
        err,
      });
    }

    res.status (200).json ({
      message: 'Staff remove successfully!',
    });
  });
};

module.exports = {create, list, update, read, remove};
