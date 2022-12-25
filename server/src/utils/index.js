const { v4: uuidv4 } = require('uuid')
const db = require('../config/db_config')

const generateInitialCategory = (userId, res) => {
  const sql = `INSERT INTO category_data (id, id_user, type, value) VALUES ('${uuidv4()}', '${userId}','Outcome', 'Education'), ('${uuidv4()}', '${userId}','Outcome', 'Transportation'), ('${uuidv4()}', '${userId}','Outcome', 'Food & Beverages'), ('${uuidv4()}', '${userId}','Outcome', 'Entertainment'), ('${uuidv4()}', '${userId}','Outcome', 'Charity'), ('${uuidv4()}', '${userId}','Outcome', 'Other'), ('${uuidv4()}', '${userId}','Income', 'Salary'), ('${uuidv4()}', '${userId}','Income', 'Bonus'), ('${uuidv4()}', '${userId}','Income', 'Other');`
  db.query(sql, (err) => {
    if (err) throw err
    return res.status(200).json({ success: true, message: 'Sign Up success' })
  })
}

module.exports = {
  generateInitialCategory,
}
