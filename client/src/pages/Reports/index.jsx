import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { filterAction } from '../../store/filter-slice'

import { Chart, Form, Modal, Spinner } from '../../components'
import { ChevronLeftIcon, FilterIcon } from '../../assets/icons'
import { FILTER_FORM, CHART_DATA_KEY, MONTHS } from './const'
import { formatCurrency } from '../../utils'
import {
  getReportData,
  getChartData,
  getFilterData,
  getFirstAndLastDate,
} from '../../utils'

const Reports = () => {
  const [reportData, setReportData] = useState([])
  const [chartData, setChartData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [filterDate, setFilterDate] = useState(null)

  const filterState = useSelector((state) => state.filter)
  const { transactionsData } = useSelector((state) => state.transactionsData)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (transactionsData && transactionsData.length) {
      setReportData(getReportData(transactionsData))
      setChartData(getChartData(transactionsData))
    }
    setIsLoading(false)
  }, [transactionsData])

  const goBack = () => navigate('/')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!transactionsData) return handleCancel()

    const date = getFirstAndLastDate({
      from: filterState.from,
      to: filterState.to,
    })

    setFilterDate(date)
    setReportData(getReportData(getFilterData(transactionsData, date)))
    setChartData(getChartData(getFilterData(transactionsData, date)))
    handleCancel()
  }

  const handleCancel = () => {
    dispatch(filterAction.clearForm())
    setModalIsOpen(false)
  }

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
      <p className='text--light text--3'>
        {filterDate
          ? `${MONTHS[new Date(filterDate.from).getMonth()]} ${new Date(
              filterDate.from
            ).getFullYear()} - ${
              MONTHS[new Date(filterDate.to).getMonth()]
            } ${new Date(filterDate.to).getFullYear()}`
          : ''}
      </p>
      {transactionsData.length ? (
        <div className='reports__chart-container'>
          <Chart chartData={chartData} dataKey={CHART_DATA_KEY} />
        </div>
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
