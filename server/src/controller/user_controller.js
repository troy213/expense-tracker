const bcrypt = require('bcrypt')
const db = require('../config/db_config')
const {
  generateAccessToken,
  generateRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require('../token')

const userGet = (req, res) => {
  const sql = 'SELECT * FROM users'
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err })
    return res.status(200).json({ success: true, data: result })
  })
}

const updateRefreshToken = (req, res) => {
  const { id } = req.body
  const accessToken = generateAccessToken(id)
  const refreshToken = generateRefreshToken(id)
  const sql = 'UPDATE users SET refresh_token=? WHERE id=?'
  db.query(sql, [refreshToken, id], (err) => {
    if (err) return res.status(500).json({ success: false, message: err })
    sendRefreshToken(res, refreshToken)
    sendAccessToken(req, res, accessToken)
  })
}

const userDelete = (req, res) => {
  const { id } = req.params

  const sql = 'DELETE FROM users WHERE id=?'
  if (id) {
    db.query(sql, id, (err) => {
      if (err) return res.status(500).json({ success: false, message: err })
      return res.status(200).json({
        success: true,
        message: `users with id=${id} has been deleted successfully`,
      })
    })
  } else {
    return res
      .status(400)
      .json({ success: false, message: 'id field is missing' })
  }
}

const userPasswordPut = async (req, res) => {
  try {
    const { id, newPassword } = req.body
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    const sql = 'UPDATE users SET password=? WHERE id=?'
    if (id && hashedPassword) {
      db.query(sql, [hashedPassword, id], (err) => {
        if (err) throw err
        return res.status(200).json({
          success: true,
          message: 'password has been successfully changed',
        })
      })
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err })
  }
}

module.exports = {
  userGet,
  updateRefreshToken,
  userDelete,
  userPasswordPut,
}
