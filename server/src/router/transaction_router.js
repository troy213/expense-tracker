const express = require('express')
const router = express.Router()

const {
  transactionsGet,
  transactionsGetId,
  transactionsPost,
  transactionsPut,
  transactionsDelete,
} = require('../controller/transaction_controller')

router.get('/', transactionsGet)
router.get('/:userId', transactionsGetId)
router.put('/', transactionsPut)
router.post('/', transactionsPost)
router.delete('/:id', transactionsDelete)

module.exports = router
