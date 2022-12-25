const { v4: uuidv4 } = require('uuid')
const db = require('../config/db_config')

const categoryGet = (req, res) => {
  const sql = 'SELECT id, id_user, type, value FROM category_data'
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err })
    return res.status(200).json({ success: true, data: result })
  })
}

const categoryGetId = (req, res) => {
  const { userId } = req.params

  const sql =
    'SELECT id, id_user, type, value FROM category_data WHERE id_user=?'
  if (userId) {
    db.query(sql, userId, (err, result) => {
      if (err) return res.status(500).json({ success: false, message: err })
      return res.status(200).json({ success: true, data: result })
    })
  } else {
    return res
      .status(400)
      .json({ success: false, message: 'one of the required field is missing' })
  }
}

const categoryPut = (req, res) => {
  const { id, userId, type, value } = req.body
  const sql =
    'UPDATE category_data SET type=?, value=? WHERE id=? AND id_user=?'
  if (id && userId && type && value) {
    db.query(sql, [type, value, id, userId], (err) => {
      if (err) return res.status(500).json({ success: false, message: err })
      return res.status(200).json({ success: true })
    })
  } else {
    return res
      .status(400)
      .json({ success: false, message: 'one of the required field is missing' })
  }
}

const categoryDelete = (req, res) => {
  const { id } = req.params

  const sql = 'DELETE FROM category_data WHERE id=?'
  if (id) {
    db.query(sql, id, (err) => {
      if (err) return res.status(500).json({ success: false, message: err })
      return res.status(200).json({
        success: true,
      })
    })
  } else {
    return res
      .status(400)
      .json({ success: false, message: 'one of the required field is missing' })
  }
}

const categoryPost = (req, res) => {
  const { userId, type, value } = req.body
  const id = uuidv4()
  const sql =
    'INSERT INTO category_data (id, id_user, type, value) VALUES(?, ?, ?, ?)'
  if (userId && type && value) {
    db.query(sql, [id, userId, type, value], (err) => {
      if (err) return res.status(500).json({ success: false, message: err })
      return res.status(200).json({ success: true })
    })
  } else {
    return res
      .status(400)
      .json({ success: false, message: 'one of the required field is missing' })
  }
}

module.exports = {
  categoryGet,
  categoryGetId,
  categoryPost,
  categoryPut,
  categoryDelete,
}
