import { useState } from 'react'
import { useSelector } from 'react-redux'
import { categoryAction } from '../../store/category-slice'

import { Modal, Form } from '../../components'
import { ADD_CATEGORY_FORM } from './const'

const Settings = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const categoryState = useSelector((state) => state.category)

  return (
    <div className='settings'>
      <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <p className='text--bold'>Add Category</p>
        <Form
          schema={ADD_CATEGORY_FORM}
          state={categoryState}
          action={categoryAction}
        />
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
