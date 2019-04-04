const connection = require ('../mysql/mysql_connection');

const create = (req, res) => {
  const {feedback_text, rating, salon_id} = req.body;
  const feedback = {
    feedback_text,
    rating,
    salon_id,
    user_id: req.auth.id,
  };

  const sql = `
    INSERT INTO feedback SET ?
  `;

  connection.query (sql, feedback, function (err, results, fields) {
    if (err) {
      return res.status (400).json ({err});
    }

    res.status (200).json ({
      message: 'Feedback created successfully!',
    });
  });
};

module.exports = {
  create,
};
