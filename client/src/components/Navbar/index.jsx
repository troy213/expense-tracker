import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import cogoToast from 'cogo-toast'
import { addTransactionAction } from '../../store/add-transaction-slice'
import { transactionsDataAction } from '../../store/transaction-data-slice'

import { Modal, Form } from '../'
import { ReportsIcon, AddIcon, UserIcon } from '../../assets/icons'
import { ADD_TRANSACTION_FORM } from './const'
import { checkEmptyField } from '../../utils'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useAuth from '../../hooks/useAuth'
import useStorage from '../../hooks/useStorage'

const Navbar = () => {
  const { auth } = useAuth()
  const { setStorageTransactionsData } = useStorage()

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const addTransactionState = useSelector((state) => state.addTransaction)
  const { transactionsData } = useSelector((state) => state.transactionsData)
  const { categoryData } = useSelector((state) => state.categoryData)
  const axiosPrivate = useAxiosPrivate()
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

    const newData = {
      id: uuidv4(),
      userId: auth.id,
      date: addTransactionState.date,
      type: addTransactionState.type,
      category: addTransactionState.category,
      description: addTransactionState.description,
      amount: parseInt(addTransactionState.amount),
    }

    if (auth?.id === 'guest') {
      const data = [...transactionsData, newData]

      setStorageTransactionsData(data)
    } else {
      submitForm(newData)
    }
    handleCancel()
  }

  const submitForm = async (data) => {
    try {
      const response = await axiosPrivate.post(
        '/api/transaction',
        JSON.stringify(data)
      )
      dispatch(
        transactionsDataAction.setTransactionsData({
          value: [...transactionsData, data],
        })
      )
    } catch (err) {
      if (!err?.response) {
        cogoToast.error('No Server Response')
      } else {
        cogoToast.error(err.response?.data?.message)
      }
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
              categoryData: categoryData,
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
