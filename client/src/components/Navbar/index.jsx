import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { addTransactionAction } from '../../store/add-transaction-slice'
import { transactionsDataAction } from '../../store/transaction-data-slice'

import { Modal, Form } from '../'
import { ReportsIcon, AddIcon, UserIcon } from '../../assets/icons'
import { ADD_TRANSACTION_FORM } from './const'
import { checkEmptyField } from '../../utils'
import useAuth from '../../hooks/useAuth'
import useStorage from '../../hooks/useStorage'

const Navbar = () => {
  const { auth } = useAuth()
  const { storageCategoryData, setStorageTransactionsData } = useStorage()

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const addTransactionState = useSelector((state) => state.addTransaction)
  const { transactionsData } = useSelector((state) => state.transactionsData)
  const location = useLocation()
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    let isValid = checkEmptyField(
      addTransactionState,
      addTransactionAction,
      dispatch,
      ['error', 'description']
    )

    if (!isValid) return

    if (auth?.id === 'guest') {
      let data = []
      const newData = {
        id: uuidv4(),
        date: addTransactionState.date,
        type: addTransactionState.type,
        category: addTransactionState.category,
        description: addTransactionState.description,
        amount: parseInt(addTransactionState.amount),
      }

      data = [...transactionsData, newData]

      setStorageTransactionsData(data)
      handleCancel()
    }
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
            state={addTransactionState}
            dependecyState={{
              categoryData: storageCategoryData,
            }}
            action={addTransactionAction}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel='Add'
          />
        </div>
      </Modal>

      <Link
        to='/reports'
        className={`navbar__button${
          location.pathname === '/reports' ? ' active' : ''
        }`}
      >
        <ReportsIcon />
      </Link>
      <button
        className='navbar__button navbar__button-main'
        onClick={() => setModalIsOpen(true)}
      >
        <AddIcon />
      </button>
      <Link
        to='/settings'
        className={`navbar__button${
          location.pathname === '/settings' ? ' active' : ''
        }`}
      >
        <UserIcon />
      </Link>
    </div>
  )
}

export default Navbar
