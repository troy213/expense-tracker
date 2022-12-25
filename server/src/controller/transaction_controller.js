const { v4: uuidv4 } = require('uuid')
const db = require('../config/db_config')

const transactionsGet = (req, res) => {
  const sql =
    'SELECT id, id_user, date, type, category, description, amount FROM transactions_data'
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err })
    return res.status(200).json({ success: true, data: result })
  })
}

const transactionsGetId = (req, res) => {
  const { userId } = req.params
  const sql =
    'SELECT id, id_user, date, type, category, description, amount FROM transactions_data WHERE id_user=?'
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

const transactionsPut = (req, res) => {
  const { id, date, type, category, description, amount } = req.body
  const sql =
    'UPDATE transactions_data SET date=?, type=?, category=?, description=?, amount=? WHERE id=?'

  if (id && date && type && category && amount) {
    db.query(sql, [date, type, category, description, amount, id], (err) => {
      if (err) return res.status(500).json({ success: false, message: err })
      return res.status(200).json({ success: true })
    })
  } else {
    return res
      .status(400)
      .json({ success: false, message: 'one of the required field is missing' })
  }
}

const transactionsDelete = (req, res) => {
  const { id } = req.params
  const sql = 'DELETE FROM transactions_data WHERE id=?'
  if (id) {
    db.query(sql, id, (err) => {
      if (err) return res.status(500).json({ success: false, message: err })
      return res.status(200).json({ success: true })
    })
  } else {
    return res
      .status(400)
      .json({ success: false, message: 'one of the required field is missing' })
  }
}

const transactionsPost = (req, res) => {
  const { userId, date, type, category, description, amount } = req.body
  const id = uuidv4()
  const sql =
    'INSERT INTO transactions_data (id, id_user, date, type, category, description, amount) VALUES(?, ?, ?, ?, ?, ?, ?)'
  if (userId && date && type && category && amount) {
    db.query(
      sql,
      [id, userId, date, type, category, description, amount],
      (err) => {
        if (err) return res.status(500).json({ success: false, message: err })
        return res.status(200).json({ success: true })
      }
    )
  } else {
    return res
      .status(400)
      .json({ success: false, message: 'one of the required field is missing' })
  }
}

module.exports = {
  transactionsGet,
  transactionsGetId,
  transactionsPut,
  transactionsPost,
  transactionsDelete,
}
