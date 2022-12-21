import TransactionDate from './TransactionDate'
import { formatCurrency } from '../../utils'

const TransactionMonth = (props) => {
  const { monthData } = props

  const sortedData = monthData.data.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateB - dateA
  })

  const total = monthData.data
    .map((value) => {
      const dateTotal = value.data.reduce((acc, curr) => {
        const amount = curr.type === 'Income' ? curr.amount : curr.amount * -1
        return acc + amount
      }, 0)
      return dateTotal
    })
    .reduce((acc, curr) => acc + curr, 0)

  return (
    <div className='transaction-history__month mt-4'>
      <div className='transaction-history__month-wrapper'>
        <p className='text--bold'>{monthData.month}</p>
        <p
          className={`text--bold${
            total >= 0 ? ' text--success' : ' text--danger'
          }`}
        >
          {formatCurrency(total)}
        </p>
      </div>
      {sortedData.map((dateData, index) => {
        return <TransactionDate dateData={dateData} key={index} />
      })}
    </div>
  )
}

export default TransactionMonth
