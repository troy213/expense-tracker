import TransactionMonth from './TransactionMonth'
import getGroupedTransaction from '../../utils/getGroupedTransaction'

const TransactionHistory = (props) => {
  const { transactionsData } = props
  const transactions = getGroupedTransaction(transactionsData)

  return (
    <section className='transaction-history'>
      {transactions.length ? (
        transactions.map((monthData, index) => {
          return <TransactionMonth monthData={monthData} key={index} />
        })
      ) : (
        <div className='transaction-history__empty'>
          <p className='text--light'>There is no data</p>
        </div>
      )}
    </section>
  )
}

export default TransactionHistory
