import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addTransactionAction } from '../../store/add-transaction-slice'

import { Modal, Form } from '../'
import { ReportsIcon, AddIcon, UserIcon } from '../../assets/icons'
import { ADD_TRANSACTION_FORM } from './const'

const Navbar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const transactionState = useSelector((state) => state.addTransaction)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    let isValid = true

    for (const obj in transactionState) {
      const EXCEPTION = ['error', 'description', 'modalValue']
      if (EXCEPTION.includes(obj)) continue

      if (!transactionState[obj]) {
        isValid = false
        dispatch(
          addTransactionAction.setError({
            field: `${obj}`,
            value: true,
          })
        )
      } else {
        dispatch(
          addTransactionAction.setError({
            field: `${obj}`,
            value: false,
          })
        )
      }
    }

    console.log(transactionState)
  }

  const handleCancel = () => {
    dispatch(addTransactionAction.clearForm())
    setModalIsOpen(false)
  }

  return (
    <div className='navbar'>
      <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <div className='modal__content--default'>
          <p className='text--bold'>Add Transaction</p>
          <Form
            schema={ADD_TRANSACTION_FORM}
            state={transactionState}
            action={addTransactionAction}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel='Add'
          />
        </div>
      </Modal>

      <Link to='/reports' className='navbar__button'>
        <ReportsIcon />
      </Link>
      <button
        className='navbar__button navbar__button-main'
        onClick={() => setModalIsOpen(true)}
      >
        <AddIcon />
      </button>
      <Link to='/settings' className='navbar__button'>
        <UserIcon />
      </Link>
    </div>
  )
}

export default Navbar
