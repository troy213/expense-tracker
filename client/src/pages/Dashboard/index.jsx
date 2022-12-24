import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { searchAction } from '../../store/search-slice'
import { transactionsDataAction } from '../../store/transaction-data-slice'

import { TransactionHistory, Form, Modal, Spinner } from '../../components'
import { SearchIcon } from '../../assets/icons'
import { SEARCH_FORM } from './const'
import useAuth from '../../hooks/useAuth'
import { formatCurrency, getSearchData } from '../../utils'

const Dashboard = () => {
  const localStorageTransactionsData = JSON.parse(
    localStorage.getItem('transactionsData')
  )

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [totalIncome, setTotalIncome] = useState(0)
  const [totalOutcome, setTotalOutcome] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const searchState = useSelector((state) => state.search)
  const { transactionsData } = useSelector((state) => state.transactionsData)
  const dispatch = useDispatch()
  const { auth } = useAuth()

  useEffect(() => {
    const income = transactionsData.reduce((acc, curr) => {
      if (curr.type === 'Income') {
        return acc + curr.amount
      }
      return acc
    }, 0)
    const outcome = transactionsData.reduce((acc, curr) => {
      if (curr.type === 'Outcome') {
        return acc + curr.amount
      }
      return acc
    }, 0)

    setTotalIncome(income)
    setTotalOutcome(outcome)
    setIsLoading(false)
  }, [transactionsData])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!transactionsData.length) return handleCancel()

    dispatch(
      transactionsDataAction.setTransactionsData({
        value: getSearchData(
          searchState.description,
          localStorageTransactionsData
        ),
      })
    )
    handleCancel()
  }

  const handleCancel = () => {
    dispatch(searchAction.clearForm())
    setModalIsOpen(false)
  }

  if (isLoading)
    return (
      <div className='dashboard'>
        <Spinner />
      </div>
    )

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
          <p className='text--bold text--8'>
            {formatCurrency(totalIncome - totalOutcome)}
          </p>
        </div>
        <div className='dashboard__widget-small-container'>
          <div className='dashboard__widget-small-left'>
            <p className='text--light text--3'>Total Income (Rp)</p>
            <p className='text--bold'>{formatCurrency(totalIncome)}</p>
          </div>
          <div className='dashboard__widget-small-right'>
            <p className='text--light text--3'>Total Outcome (Rp)</p>
            <p className='text--bold'>{formatCurrency(totalOutcome)}</p>
          </div>
        </div>
      </section>

      <TransactionHistory transactionsData={transactionsData} />
    </div>
  )
}

export default Dashboard
