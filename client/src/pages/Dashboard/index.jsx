import { TRANSACTIONS_DATA } from '../../data/transactionData'
import { TransactionHistory, Navbar } from '../../components'
import { SearchIcon } from '../../assets/icons'

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <div className='dashboard__header'>
        <p className='text--light'>
          Hi, <span className='text--bold'>User</span>
        </p>
        <SearchIcon />
      </div>
      <section className='dashboard__widget-container'>
        <div className='dashboard__widget-big'>
          <p className='text--light text--3'>Total Balance</p>
          <p className='text--bold text--8'>Rp 7.670.000,00</p>
        </div>
        <div className='dashboard__widget-small-container'>
          <div className='dashboard__widget-small-left'>
            <p className='text--light text--3'>Total Income (Rp)</p>
            <p className='text--bold'>14.000.000,00</p>
          </div>
          <div className='dashboard__widget-small-right'>
            <p className='text--light text--3'>Total Outcome (Rp)</p>
            <p className='text--bold'>6.330.000,00</p>
          </div>
        </div>
      </section>

      <TransactionHistory transactionsData={TRANSACTIONS_DATA} />
    </div>
  )
}

export default Dashboard
