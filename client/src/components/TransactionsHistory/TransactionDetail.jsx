import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { editTransactionAction } from '../../store/edit-transaction-slice'
import { transactionsDataAction } from '../../store/transaction-data-slice'

import { Form, Modal } from '../'
import { EDIT_TRANSACTION_FORM } from './const'
import { formatCurrency } from '../../utils'

const TransactionDetail = (props) => {
  const { id, type, category, description, amount } = props.transactionDetail

  const localStorageData = JSON.parse(localStorage.getItem('transactionsData'))

  const [isActive, setIsActive] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalContent, setModalContent] = useState('')
  const editTransactionState = useSelector((state) => state.editTransaction)
  const dispatch = useDispatch()

  const handleCollapse = () => {
    setIsActive(!isActive)
  }

  const handleModal = (content) => {
    setModalContent(content)
    setModalIsOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(editTransactionState)
  }

  const handleCancel = () => {
    dispatch(editTransactionAction.clearForm())
    setModalIsOpen(false)
  }

  const handleDelete = (id) => {
    const newData = localStorageData.filter(
      (transaction) => transaction.id !== id
    )
    localStorage.setItem('transactionsData', JSON.stringify(newData))
    dispatch(transactionsDataAction.setTransactionsData({ value: newData }))
    setModalIsOpen(false)
  }

  const renderModal = {
    editModal: (
      <div className='modal__content--default'>
        <p className='text--bold'>Edit Transaction</p>
        <Form
          schema={EDIT_TRANSACTION_FORM}
          state={editTransactionState}
          action={editTransactionAction}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitLabel='Update'
        />
      </div>
    ),
    deleteModal: (
      <div className='modal__content--default'>
        <p className='text--bold'>Confirmation</p>
        <p className='text--light text--3'>
          Are you sure you want to delete this transaction?
        </p>
        <button
          className='btn btn-lg btn-danger'
          onClick={() => handleDelete(id)}
        >
          Delete
        </button>
        <button
          className='btn btn-lg btn-primary-outline'
          onClick={() => setModalIsOpen(false)}
        >
          Cancel
        </button>
      </div>
    ),
  }

  return (
    <>
      <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        {renderModal[modalContent]}
      </Modal>
      <div className='transaction-history__detail' onClick={handleCollapse}>
        <div className='transaction-history__detail-header'>
          <p>{category}</p>
          <p
            className={`${
              type === 'Income' ? 'text--success' : 'text--danger'
            }`}
          >
            {formatCurrency(amount)}
          </p>
        </div>
        <p className='text--light text--3'>{description ? description : '-'}</p>
        <div
          className={`transaction-history__detail-action${
            isActive ? ' collapse' : ''
          }`}
        >
          <button
            className='btn btn-primary text--light'
            onClick={() => handleModal('editModal')}
          >
            Edit
          </button>
          <button
            className='btn btn-danger text--light'
            onClick={() => handleModal('deleteModal')}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  )
}

export default TransactionDetail
