import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { editTransactionAction } from '../../store/edit-transaction-slice'

import { Form, Modal } from '../'
import { EDIT_TRANSACTION_FORM } from './const'

const TransactionDetail = (props) => {
  const { transactionDetail } = props
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalContent, setModalContent] = useState('')
  const editTransaction = useSelector((state) => state.editTransaction)
  const dispatch = useDispatch()

  const handleModal = (content) => {
    setModalContent(content)
    setModalIsOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(editTransaction)
  }

  const handleCancel = () => {
    dispatch(editTransactionAction.clearForm())
    setModalIsOpen(false)
  }

  const renderModal = {
    editModal: (
      <div className='modal__content--default'>
        <p className='text--bold'>Edit Transaction</p>
        <Form
          schema={EDIT_TRANSACTION_FORM}
          state={editTransaction}
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
        <button className='btn btn-lg btn-danger'>Delete</button>
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
      {transactionDetail.map((data) => {
        const { id, type, category, description, amount } = data

        return (
          <div className='transaction-history__detail' key={id}>
            <div className='transaction-history__detail-header'>
              <p>{category}</p>
              <p
                className={`${
                  type === 'income' ? 'text--success' : 'text--danger'
                }`}
              >
                Rp{amount}
              </p>
            </div>
            <p className='text--light text--3'>
              {description ? description : '-'}
            </p>
            <div className='transaction-history__detail-action'>
              <button
                className='btn btn-info text--light'
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
        )
      })}
    </>
  )
}

export default TransactionDetail
