const db = require('../../config/db_config')

const updateName = (req, res, next) => {
  const { id, name } = req.body

  const sql = 'UPDATE users SET name=? WHERE id=?'
  db.query(sql, [name, id], (err) => {
    if (err) return res.status(500).json({ success: false, message: err })
    next()
  })
}

module.exports = updateName
