import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { categoryAction } from '../../store/category-slice'

import useAuth from '../../hooks/useAuth'
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
  const { auth } = useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const goBack = () => navigate('/')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(categoryState)
  }

  const handleCancel = () => {
    dispatch(categoryAction.clearForm())
    setModalIsOpen(false)
  }

  return (
    <section className='settings'>
      <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <div className='modal__content--default'>
          <p className='text--bold'>Add Category</p>
          <Form
            schema={ADD_CATEGORY_FORM}
            state={categoryState}
            action={categoryAction}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel='Add'
          />
        </div>
      </Modal>

      <div className='settings__header'>
        <button className='settings__header-wrapper btn-link' onClick={goBack}>
          <ChevronLeftIcon />
          <p className='text--bold'>Settings</p>
        </button>
      </div>
      <p className='text--light'>
        Hi,{' '}
        <span className='text--bold text--capitalize'>{auth?.username}</span>
      </p>
      <Link to='/account' className='settings__link'>
        <UserIcon />
        <p className='text--bold'>Account Settings</p>
      </Link>
      <button
        className='settings__link btn-link'
        onClick={() => setModalIsOpen(true)}
      >
        <CategoryIcon />
        <p className='text--bold'>Edit Category</p>
      </button>
      <button className='settings__link btn-link'>
        <div className='settings__coming-soon'>
          <div>
            <BudgetIcon />
            <p className='text--bold'>Add Budget</p>
          </div>
          <p className='text--light text--3'>coming soon</p>
        </div>
      </button>
      <button className='settings__link btn-link'>
        <div className='settings__coming-soon'>
          <div>
            <ExportIcon />
            <p className='text--bold'>Export Data</p>
          </div>
          <p className='text--light text--3'>coming soon</p>
        </div>
      </button>
      <button className='settings__link btn-link mt-4'>
        <SignOutIcon />
        <p className='text--bold text--danger'>Sign Out</p>
      </button>
    </section>
  )
}

export default Settings
