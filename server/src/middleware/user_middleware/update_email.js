const db = require('../../config/db_config')

const updateEmail = (req, res, next) => {
  const { id, email } = req.body

  const sql = 'UPDATE users SET email=? WHERE id=?'
  db.query(sql, [email, id], (err) => {
    if (err) return res.status(500).json({ success: false, message: err })
    next()
  })
}

module.exports = updateEmail
