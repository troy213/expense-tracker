import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { searchAction } from '../../store/search-slice'

import { TRANSACTIONS_DATA } from '../../data/transactionData'
import { TransactionHistory, Form, Modal } from '../../components'
import { SearchIcon } from '../../assets/icons'
import { SEARCH_FORM } from './const'
import useAuth from '../../hooks/useAuth'
import { formatCurrency } from '../../utils/formatCurrency'

const Dashboard = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const searchState = useSelector((state) => state.search)
  const dispatch = useDispatch()
  const { auth, setAuth } = useAuth()

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('isGuest'))) {
      setAuth({
        id: 'guest',
        username: 'guest',
        email: null,
        accessToken: null,
      })
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(searchState)
  }

  const handleCancel = () => {
    dispatch(searchAction.clearForm())
    setModalIsOpen(false)
  }

  return (
    <div className='dashboard'>
      <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <div className='modal__content--default'>
          <p className='text--bold'>Search</p>
          <Form
            schema={SEARCH_FORM}
            state={searchState}
            action={searchAction}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel='Search'
          />
        </div>
      </Modal>
      <div className='dashboard__header'>
        <p className='text--light'>
          Hi,{' '}
          <span className='text--bold text--capitalize'>{auth?.username}</span>
        </p>
        <button
          className='dashboard__header-btn btn btn-link'
          onClick={() => setModalIsOpen(true)}
        >
          <SearchIcon />
        </button>
      </div>
      <section className='dashboard__widget-container'>
        <div className='dashboard__widget-big'>
          <p className='text--light text--3'>Total Balance</p>
          <p className='text--bold text--8'>{formatCurrency(7670000)}</p>
        </div>
        <div className='dashboard__widget-small-container'>
          <div className='dashboard__widget-small-left'>
            <p className='text--light text--3'>Total Income (Rp)</p>
            <p className='text--bold'>{formatCurrency(14000000)}</p>
          </div>
          <div className='dashboard__widget-small-right'>
            <p className='text--light text--3'>Total Outcome (Rp)</p>
            <p className='text--bold'>{formatCurrency(6330000)}</p>
          </div>
        </div>
      </section>

      <TransactionHistory transactionsData={TRANSACTIONS_DATA} />
    </div>
  )
}

export default Dashboard
