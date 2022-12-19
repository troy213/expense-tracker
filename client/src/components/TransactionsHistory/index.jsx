import TransactionMonth from './TransactionMonth'
import getGroupedTransaction from '../../utils/getGroupedTransaction'

const TransactionHistory = (props) => {
  const { transactionsData } = props
  const transactions = getGroupedTransaction(transactionsData)

  return (
    <section className='transaction-history'>
      {transactions.map((monthData, index) => {
        return <TransactionMonth monthData={monthData} key={index} />
      })}
    </section>
  )
}

export default TransactionHistory
