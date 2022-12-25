const db = require('../../config/db_config')

const checkEmail = (req, res, next) => {
  const { email } = req.body
  const sql = 'SELECT email FROM users WHERE email=?'
  db.query(sql, email, (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err })
    if (result.length > 0) {
      res.status(409).json({
        success: false,
        message:
          'Sorry, the email address you entered has already been registered. Please try a different email address',
      })
    } else {
      next()
    }
  })
}

module.exports = checkEmail
