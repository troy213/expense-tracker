import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { filterAction } from '../../store/filter-slice'

import { Form, Modal } from '../../components'
import { ChevronLeftIcon, FilterIcon } from '../../assets/icons'
import { FILTER_FORM } from './const'
import { REPORTS_DATA } from '../../data/reportsData'

const Reports = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const filterState = useSelector((state) => state.filter)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const goBack = () => navigate('/')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(filterState)
  }

  const handleCancel = () => {
    dispatch(filterAction.clearForm())
    setModalIsOpen(false)
  }

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
      <div className='reports__chart-container'></div>
      {REPORTS_DATA.map((report, reportIndex) => {
        const { type, data } = report
        const totalAmount = data.reduce((acc, obj) => acc + obj.amount, 0)

        return (
          <div className='reports__detail' key={reportIndex}>
            <div className='reports__detail-header'>
              <p className='text--bold'>
                {type === 'income' ? 'Total Income' : 'Total Outcome'}
              </p>
              <p
                className={`text--bold${
                  type === 'income' ? ' text--success' : ' text--danger'
                }`}
              >
                Rp{totalAmount}
              </p>
            </div>
            {data.map((item, index) => {
              const { category, amount } = item

              return (
                <div className='reports__detail-body' key={index}>
                  <p className='text--light text--3'>{category}</p>
                  <p className='text--light text--3'>Rp{amount}</p>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Reports
