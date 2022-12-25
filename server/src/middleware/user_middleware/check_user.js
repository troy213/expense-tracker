const db = require('../../config/db_config')

const checkUser = (req, res, next) => {
  const { id } = req.body
  const sql = 'SELECT * FROM users WHERE id=?'
  db.query(sql, id, (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err })
    if (result.length > 0) {
      res.locals.id = result[0].id
      res.locals.email = result[0].email
      res.locals.password = result[0].password
      res.locals.name = result[0].name
      next()
    } else {
      return res.status(400).json({ success: false, message: 'User not found' })
    }
  })
}

module.exports = checkUser
