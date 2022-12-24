import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { editTransactionAction } from '../../store/edit-transaction-slice'

import { Form, Modal } from '../'
import { EDIT_TRANSACTION_FORM } from './const'
import { formatCurrency, checkEmptyField } from '../../utils'
import useAuth from '../../hooks/useAuth'
import useStorage from '../../hooks/useStorage'

const TransactionDetail = (props) => {
  const { id, type, category, description, amount } = props.transactionDetail

  const [isActive, setIsActive] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalContent, setModalContent] = useState('')
  const editTransactionState = useSelector((state) => state.editTransaction)
  const { transactionsData } = useSelector((state) => state.transactionsData)
  const { categoryData } = useSelector((state) => state.categoryData)
  const { auth } = useAuth()
  const { setStorageTransactionsData } = useStorage()
  const dispatch = useDispatch()

  const handleCollapse = () => {
    setIsActive(!isActive)
  }

  const handleModal = (content, id) => {
    if (content === 'editModal') {
      const data = transactionsData.find((value) => value.id === id)
      for (const field in data) {
        const EXCEPTION = ['id']
        if (EXCEPTION.includes(field)) continue

        dispatch(
          editTransactionAction.setInputField({ field, value: data[field] })
        )
      }
    }

    setModalContent(content)
    setModalIsOpen(true)
  }

  const handleSubmit = (e, id) => {
    e.preventDefault()
    const isValid = checkEmptyField(
      editTransactionState,
      editTransactionAction,
      dispatch,
      ['error', 'description']
    )

    if (!isValid) return

    if (auth?.id === 'guest') {
      let data = []
      const updatedData = {
        id,
        date: editTransactionState.date,
        type: editTransactionState.type,
        category: editTransactionState.category,
        description: editTransactionState.description,
        amount: parseInt(editTransactionState.amount),
      }

      const index = transactionsData.findIndex(
        (transaction) => transaction.id === id
      )
      data = [
        ...transactionsData.slice(0, index),
        updatedData,
        ...transactionsData.slice(index + 1),
      ]

      setStorageTransactionsData(data)
      handleCancel()
    }
  }

  const handleCancel = () => {
    dispatch(editTransactionAction.clearForm())
    setModalIsOpen(false)
  }

  const handleDelete = (id) => {
    const newData = transactionsData.filter(
      (transaction) => transaction.id !== id
    )
    setStorageTransactionsData(newData)
    setModalIsOpen(false)
  }

  const renderModal = {
    editModal: (
      <div className='modal__content--default'>
        <p className='text--bold'>Edit Transaction</p>
        <Form
          schema={EDIT_TRANSACTION_FORM}
          state={editTransactionState}
          dependecyState={{ categoryData }}
          action={editTransactionAction}
          onSubmit={(e) => handleSubmit(e, id)}
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
            onClick={() => handleModal('editModal', id)}
          >
            Edit
          </button>
          <button
            className='btn btn-danger text--light'
            onClick={() => handleModal('deleteModal', id)}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  )
}

export default TransactionDetail
