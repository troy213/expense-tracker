import { REPORTS_DATA } from '../../data/reportsData'

const Reports = () => {
  return (
    <div className='reports'>
      <div className='reports__header'>
        <div className='reports__title'>
          <i>-icon-</i>
          <p className='text--bold'>Reports</p>
        </div>
        <i>-icon-</i>
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
              <p className='text--bold'>Rp{totalAmount}</p>
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
