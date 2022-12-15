import { useState } from 'react'
import { Modal } from '../'

const Navbar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  return (
    <div className='navbar'>
      <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        Add Transaction
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
