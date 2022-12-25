const db = require('../../config/db_config')

const checkCategory = (req, res, next) => {
  const { userId, type, value } = req.body
  const sql =
    'SELECT * FROM category_data WHERE id_user=? AND type=? AND value=?'

  if (userId && type && value) {
    db.query(sql, [userId, type, value], (err, result) => {
      if (err) return res.status(500).json({ success: false, message: err })
      if (result.length > 0) {
        res.status(409).json({
          success: false,
          message: 'Category name is already exist, please pick another name',
        })
      } else {
        next()
      }
    })
  } else {
    return res
      .status(400)
      .json({ success: false, message: 'one of the required field is missing' })
  }
}

module.exports = checkCategory
