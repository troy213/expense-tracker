const express = require('express')
const router = express.Router()

const {
  categoryGet,
  categoryGetId,
  categoryPost,
  categoryPut,
  categoryDelete,
} = require('../controller/category_cotroller')

const checkCategory = require('../middleware/category_middleware/check_category')

router.get('/', categoryGet)
router.get('/:userId', categoryGetId)
router.put('/', checkCategory, categoryPut)
router.post('/', checkCategory, categoryPost)
router.delete('/:id', categoryDelete)

module.exports = router
