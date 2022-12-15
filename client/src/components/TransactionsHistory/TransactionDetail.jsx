const TransactionDetail = (props) => {
  const { transactionDetail } = props

  return (
    <>
      {transactionDetail.map((data) => {
        const { id, type, category, description, amount } = data

        return (
          <div className='transaction-history__detail' key={id}>
            <div className='transaction-history__detail-header'>
              <p>{category}</p>
              <p
                className={`${
                  type === 'income' ? 'text--success' : 'text--danger'
                }`}
              >
                Rp{amount}
              </p>
            </div>
            <p className='text--light text--3'>
              {description ? description : '-'}
            </p>
            <div className='transaction-history__detail-action'>
              <button className='btn btn-info'>Edit</button>
              <button className='btn btn-danger'>Delete</button>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default TransactionDetail
