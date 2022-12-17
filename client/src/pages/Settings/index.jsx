import { useState } from 'react'
import { useSelector } from 'react-redux'
import { categoryAction } from '../../store/category-slice'

import { Modal, Form } from '../../components'
import {
  ChevronLeftIcon,
  UserIcon,
  CategoryIcon,
  BudgetIcon,
  ExportIcon,
  SignOutIcon,
} from '../../assets/icons'
import { ADD_CATEGORY_FORM } from './const'

const Settings = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const categoryState = useSelector((state) => state.category)

  return (
    <div className='settings'>
      <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <div className='modal__content--default'>
          <p className='text--bold'>Add Category</p>
          <Form
            schema={ADD_CATEGORY_FORM}
            state={categoryState}
            action={categoryAction}
          />
        </div>
      </Modal>

      <div className='settings__header'>
        <ChevronLeftIcon />
        <p className='text--bold'>Settings</p>
      </div>
      <p className='text--light'>
        Hi, <span className='text--bold'>User</span>
      </p>
      <a href='#' className='settings__link'>
        <UserIcon />
        <p className='text--bold'>Account Settings</p>
      </a>
      <button
        className='settings__link btn-link'
        onClick={() => setModalIsOpen(true)}
      >
        <CategoryIcon />
        <p className='text--bold'>Edit Category</p>
      </button>
      <button className='settings__link btn-link'>
        <BudgetIcon />
        <p className='text--bold'>Add Budget</p>
      </button>
      <button className='settings__link btn-link'>
        <ExportIcon />
        <p className='text--bold'>Export Data</p>
      </button>
      <button className='settings__link btn-link mt-4'>
        <SignOutIcon />
        <p className='text--bold text--danger'>Sign Out</p>
      </button>
    </div>
  )
}

export default Settings
