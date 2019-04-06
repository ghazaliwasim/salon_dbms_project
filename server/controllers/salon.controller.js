const connection = require('../mysql/mysql_connection');

const create = (req, res) => {
  const salon = {
    ...req.body,
    user_id: req.auth.id,
  };

  connection.query('INSERT INTO salon SET ?', salon, function(
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
      message: 'Salon created successfully',
    });
  });
};

const list = (req, res) => {
  if (req.query.limit) {
    const {limit} = req.query;

    connection.query(
      'SELECT * FROM salon LIMIT ?',
      parseInt(limit, 10),
      function(err, results, fields) {
        if (err) {
          return res.status(400).json({
            err,
          });
        }

        res.status(200).json({
          salons: results,
        });
      }
    );
  } else {
    connection.query('SELECT * FROM salon', function(err, results, fields) {
      if (err) {
        return res.status(400).json({
          err,
        });
      }

      res.status(200).json({
        salons: results,
      });
    });
  }
};

const read = (req, res) => {
  const {salonId} = req.params;

  connection.query(
    'SELECT * FROM salon WHERE id = ?',
    parseInt(salonId, 10),
    function(err, results, fields) {
      if (err) {
        return res.status(400).json({
          err,
        });
      }

      res.status(200).json(results[0]);
    }
  );
};

const update = (req, res) => {
  const {salonId} = req.params;
  const updateObject = req.body;

  const sql = `
    UPDATE salon
    SET ?
    WHERE id = ?
  `;

  connection.query(sql, [updateObject, parseInt(salonId, 10)], function(
    err,
    results,
    fields
  ) {
    if (err) {
      console.log(err);
      return res.status(400).json({
        err,
      });
    }

    res.status(200).json({
      maessage: 'Salon updated.',
    });
  });
};

module.exports = {create, list, read, update};
