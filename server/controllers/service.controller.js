const connection = require ('../mysql/mysql_connection');

const create = (req, res) => {
  const service = req.body;

  connection.query ('INSERT INTO service SET ?', service, function (
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
      message: 'Service created successfully',
    });
  });
};

const list = (req, res) => {
  const {salonId} = req.query;

  sql = `
    SELECT
      service.id,
      service.name,
      service.tag,
      service.brand,
      service.benefits,
      service.points_to_remember,
      service.recommended_for,
      service.cost
    FROM service
    INNER JOIN salon
    ON salon.id = service.salon_id
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
      services: results,
    });
  });
};

const read = (req, res) => {
  const {serviceId} = req.params;

  const sql = `
    SELECT * FROM service
    WHERE id = ?
  `;

  connection.query (sql, parseInt (serviceId, 10), function (
    err,
    results,
    fields
  ) {
    if (err) {
      return res.status (400).json ({err});
    }

    res.status (200).json (results[0]);
  });
};

const update = (req, res) => {
  const {serviceId} = req.params;
  const updateObject = req.body;

  const sql = `
    UPDATE service
    SET ?
    WHERE id = ?
  `;

  connection.query (sql, [updateObject, parseInt (serviceId, 10)], function (
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
      maessage: 'Service updated.',
    });
  });
};

module.exports = {create, list, read, update};
