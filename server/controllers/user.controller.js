const connection = require('../mysql/mysql_connection');

const create = (req, res) => {
  const user = req.body;

  connection.query('INSERT INTO user SET ?', user, function(
    err,
    results,
    fields
  ) {
    if (err) {
      let errorMessage = 'Unable to create user';

      if (err.code === 'ER_DUP_ENTRY') {
        errorMessage = 'Email already exists';
      }

      res.status(400).json({
        errorMessage,
      });
    } else {
      res.status(200).json({
        message: 'Account created successfully',
      });
    }
  });
};

const currentUser = (req, res) => {
  res.status(200).json(req.auth);
};

const read = (req, res) => {
  const {userId} = req.params;

  const sql = `
    SELECT * FROM user
    WHERE id = ?
  `;

  connection.query(sql, parseInt(userId, 10), function(err, results, fields) {
    if (err) {
      return res.status(400).json({err});
    }

    res.status(200).json(results[0]);
  });
};

module.exports = {
  create,
  currentUser,
  read,
};
