import TransactionDetail from './TransactionDetail'

const TransactionDate = (props) => {
  const { dateData } = props

  const total = dateData.data.reduce((acc, curr) => {
    const amount = curr.type === 'income' ? curr.amount : curr.amount * -1
    return acc + amount
  }, 0)

  return (
    <div className='transaction-history__date'>
      <p className='text--light text--3'>{dateData.date}</p>

      {dateData.data.map((transactionDetail, index) => {
        return (
          <TransactionDetail
            transactionDetail={transactionDetail}
            key={index}
          />
        )
      })}
    </div>
  )
}

export default TransactionDate
