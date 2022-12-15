import { useState } from 'react'
import { Modal } from '../../components'

const Settings = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  return (
    <div className='settings'>
      <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        Add Category
      </Modal>

      <div className='settings__header'>
        <i>-icon-</i>
        <p className='text--bold'>Settings</p>
      </div>
      <p className='text--light'>
        Hi, <span className='text--bold'>User</span>
      </p>
      <a href='#' className='settings__link'>
        <i>-icon-</i>
        <p className='text--bold'>Account Settings</p>
      </a>
      <button
        className='settings__link btn-link'
        onClick={() => setModalIsOpen(true)}
      >
        <i>-icon-</i>
        <p className='text--bold'>Edit Category</p>
      </button>
      <button className='settings__link btn-link'>
        <i>-icon-</i>
        <p className='text--bold'>Add Budget</p>
      </button>
      <button className='settings__link btn-link'>
        <i>-icon-</i>
        <p className='text--bold'>Export Data</p>
      </button>
      <button className='settings__link btn-link'>
        <i>-icon-</i>
        <p className='text--bold text--danger'>Sign Out</p>
      </button>
    </div>
  )
}

export default Settings
