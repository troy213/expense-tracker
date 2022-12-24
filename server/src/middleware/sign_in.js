const db = require('../config/db_config')

const signIn = (req, res, next) => {
  const { email } = req.body
  const sql = 'SELECT * FROM users WHERE email=?'
  if (email) {
    db.query(sql, email, (err, result) => {
      if (err) return res.status(500).json({ success: false, message: err })
      if (result.length > 0) {
        res.locals.id = result[0].id
        res.locals.hashedPassword = result[0].password
        res.locals.name = result[0].name
        next()
      } else {
        return res
          .status(400)
          .json({ success: false, message: 'Invalid Email or Password' })
      }
    })
  } else {
    return res
      .status(400)
      .json({ success: false, message: 'Email or Password is empty!' })
  }
}

module.exports = signIn
