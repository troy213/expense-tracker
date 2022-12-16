import { useState } from 'react'
import { useSelector } from 'react-redux'
import { addTransactionAction } from '../../store/add-transaction-slice'

import { Modal, Form } from '../'
import { ADD_TRANSACTION_FORM } from './const'

const Navbar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const transactionState = useSelector((state) => state.addTransaction)

  return (
    <div className='navbar'>
      <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <p className='text--bold'>Add Transaction</p>
        <Form
          schema={ADD_TRANSACTION_FORM}
          state={transactionState}
          action={addTransactionAction}
        />
      </Modal>

      <button className='navbar__button'>-icon-</button>
      <button className='navbar__button' onClick={() => setModalIsOpen(true)}>
        -icon-
      </button>
      <button className='navbar__button'>-icon-</button>
    </div>
  )
}

export default Navbar
