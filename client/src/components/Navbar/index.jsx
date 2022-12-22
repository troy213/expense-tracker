import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { addTransactionAction } from '../../store/add-transaction-slice'

import { Modal, Form } from '../'
import { ReportsIcon, AddIcon, UserIcon } from '../../assets/icons'
import { ADD_TRANSACTION_FORM } from './const'
import { transactionsDataAction } from '../../store/transaction-data-slice'

const Navbar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const transactionState = useSelector((state) => state.addTransaction)
  const { transactionsData } = useSelector((state) => state.transactionsData)
  const location = useLocation()
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    let isValid = true
    const isGuest = JSON.parse(localStorage.getItem('isGuest'))
    const localStorageData = JSON.parse(
      localStorage.getItem('transactionsData')
    )

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

    if (!isValid) return

    if (isGuest) {
      let data = []
      const newData = {
        id: uuidv4(),
        date: transactionState.date,
        type: transactionState.type,
        category: transactionState.category,
        description: transactionState.description,
        amount: parseInt(transactionState.amount),
      }

      if (localStorageData) {
        data = [...localStorageData, newData]
      } else {
        data = [...transactionsData, newData]
      }

      localStorage.setItem('transactionsData', JSON.stringify(data))
      dispatch(transactionsDataAction.setTransactionsData({ value: data }))
      handleCancel()
    }

    if (location.pathname === '/reports') {
      window.location.reload()
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
            state={transactionState}
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
