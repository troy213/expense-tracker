const bcrypt = require('bcrypt')

const comparePassword = async (req, res, next) => {
  try {
    const { oldPassword } = req.body
    if (await bcrypt.compare(oldPassword, res.locals.password)) {
      next()
    } else {
      return res
        .status(403)
        .json({ success: false, message: 'invalid password' })
    }
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'failed to change password' })
  }
}

module.exports = comparePassword
