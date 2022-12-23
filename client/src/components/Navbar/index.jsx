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

const Navbar = () => {
  const isGuest = JSON.parse(localStorage.getItem('isGuest'))
  const localStorageCategoryData = JSON.parse(
    localStorage.getItem('categoryData')
  )
  const localStorageTransactionsData = JSON.parse(
    localStorage.getItem('transactionsData')
  )

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

    console.log(isValid)

    if (!isValid) return

    if (isGuest) {
      let data = []
      const newData = {
        id: uuidv4(),
        date: addTransactionState.date,
        type: addTransactionState.type,
        category: addTransactionState.category,
        description: addTransactionState.description,
        amount: parseInt(addTransactionState.amount),
      }

      if (localStorageTransactionsData) {
        data = [...localStorageTransactionsData, newData]
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
            state={addTransactionState}
            dependecyState={{
              categoryData: localStorageCategoryData,
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
