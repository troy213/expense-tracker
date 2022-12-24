const db = require('../config/db_config')

const signUp = (req, res, next) => {
  const { email } = req.body
  const sql = 'SELECT * FROM users WHERE email=?'
  if (email) {
    db.query(sql, email, (err, result) => {
      if (err) return res.status(500).json({ success: false, message: err })
      if (result.length > 0)
        return res.status(409).json({
          success: false,
          message: 'Email has been already registered',
        })
      next()
    })
  } else {
    return res
      .status(400)
      .json({ success: false, message: 'Email or Password is empty!' })
  }
}

module.exports = signUp
