import TransactionDate from './TransactionDate'

const TransactionMonth = (props) => {
  const { monthData } = props

  const total = monthData.data
    .map((value) => {
      const dateTotal = value.data.reduce((acc, curr) => {
        const amount = curr.type === 'income' ? curr.amount : curr.amount * -1
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
          {total >= 0 ? `Rp${total}` : `-Rp${total * -1}`}
        </p>
      </div>
      {monthData.data.map((dateData, index) => {
        return <TransactionDate dateData={dateData} key={index} />
      })}
    </div>
  )
}

export default TransactionMonth
