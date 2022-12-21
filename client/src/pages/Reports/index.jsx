import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { filterAction } from '../../store/filter-slice'
import {
  ResponsiveContainer,
  LineChart,
  Legend,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts'

import { Form, Modal, Spinner } from '../../components'
import { ChevronLeftIcon, FilterIcon } from '../../assets/icons'
import { FILTER_FORM } from './const'
import { formatCurrency } from '../../utils'
import { getReportData, getChartData } from '../../utils'

const Reports = () => {
  const isGuest = JSON.parse(localStorage.getItem('isGuest'))
  const transactionsData = JSON.parse(localStorage.getItem('transactionsData'))

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [reportData, setReportData] = useState([])
  const [chartData, setChartData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const filterState = useSelector((state) => state.filter)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isGuest) return

    if (transactionsData && transactionsData.length) {
      setReportData(getReportData(transactionsData))
      setChartData(getChartData(transactionsData))
    }
    setIsLoading(false)
  }, [])

  const goBack = () => navigate('/')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(filterState)
  }

  const handleCancel = () => {
    dispatch(filterAction.clearForm())
    setModalIsOpen(false)
  }

  const renderLineChart = (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 5,
          right: 32,
          left: 16,
          bottom: 5,
        }}
      >
        <Line type='monotone' dataKey='income' stroke='#768c18' />
        <Line type='monotone' dataKey='outcome' stroke='#d95445' />
        <CartesianGrid stroke='#ccc' />
        <Legend />
        <XAxis dataKey='name' />
        <YAxis />
      </LineChart>
    </ResponsiveContainer>
  )

  if (isLoading)
    return (
      <div className='reports'>
        <Spinner />
      </div>
    )

  return (
    <div className='reports'>
      <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <div className='modal__content--default'>
          <p className='text--bold'>Filter</p>
          <Form
            schema={FILTER_FORM}
            state={filterState}
            action={filterAction}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel='Submit'
          />
        </div>
      </Modal>

      <div className='reports__header'>
        <button className='reports__header-wrapper btn-link' onClick={goBack}>
          <ChevronLeftIcon />
          <p className='text--bold'>Reports</p>
        </button>
        <button className='btn-link' onClick={() => setModalIsOpen(true)}>
          <FilterIcon />
        </button>
      </div>
      <p className='text--light text--3'>1 January 2022 - 31 March 2022</p>
      {transactionsData ? (
        <div className='reports__chart-container'>{renderLineChart}</div>
      ) : null}

      {reportData.length ? (
        reportData.map((report, reportIndex) => {
          const { type, data } = report
          const totalAmount = data.reduce((acc, obj) => acc + obj.amount, 0)

          return (
            <div className='reports__detail' key={reportIndex}>
              <div className='reports__detail-header'>
                <p className='text--bold'>
                  {type === 'Income' ? 'Total Income' : 'Total Outcome'}
                </p>
                <p
                  className={`text--bold${
                    type === 'Income' ? ' text--success' : ' text--danger'
                  }`}
                >
                  {formatCurrency(totalAmount)}
                </p>
              </div>
              {data.map((item, index) => {
                const { category, amount } = item

                return (
                  <div className='reports__detail-body' key={index}>
                    <p className='text--light text--3'>{category}</p>
                    <p className='text--light text--3'>
                      {formatCurrency(amount)}
                    </p>
                  </div>
                )
              })}
            </div>
          )
        })
      ) : (
        <div className='reports__empty'>
          <p className='text--light text--center'>There is no data</p>
        </div>
      )}
    </div>
  )
}

export default Reports
