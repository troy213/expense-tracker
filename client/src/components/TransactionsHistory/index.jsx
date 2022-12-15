import TransactionDetail from './TransactionDetail'
import getGroupedTransaction from '../../utils/getGroupedTransaction'

const TransactionHistory = (props) => {
  const { transactionsData } = props
  const transactions = getGroupedTransaction(transactionsData)

  return (
    <section className='transaction-history'>
      {transactions.map((monthData, monthIndex) => {
        return (
          <div className='transaction-history__month' key={monthIndex}>
            <p className='text--bold'>{monthData.month}</p>
            {monthData.data.map((dateData, dateIndex) => {
              return (
                <div className='transaction-history__date' key={dateIndex}>
                  <p className='text--light text--3'>{dateData.date}</p>
                  <TransactionDetail transactionDetail={dateData.data} />
                </div>
              )
            })}
          </div>
        )
      })}
    </section>
  )
}

export default TransactionHistory
