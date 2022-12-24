const express = require('express')
const router = express.Router()

const {
  userGet,
  updateRefreshToken,
  userDelete,
  userPasswordPut,
} = require('../controller/user_controller')

const checkEmail = require('../middleware/user_middleware/check_email')
const checkUser = require('../middleware/user_middleware/check_user')
const comparePassword = require('../middleware/user_middleware/compare_password')
const updateEmail = require('../middleware/user_middleware/update_email')
const updateName = require('../middleware/user_middleware/update_name')

router.get('/', userGet)
router.put(
  '/change-email',
  checkUser,
  checkEmail,
  updateEmail,
  updateRefreshToken
)
router.put('/change-name', checkUser, updateName, updateRefreshToken)
router.put('/change-password', checkUser, comparePassword, userPasswordPut)
router.delete('/:id', userDelete)

module.exports = router
