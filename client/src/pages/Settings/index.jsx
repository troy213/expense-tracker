import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { transactionsDataAction } from '../../store/transaction-data-slice'
import { categoryDataAction } from '../../store/category-data-slice'

import useAuth from '../../hooks/useAuth'
import useLogout from '../../hooks/useLogout'
import { Modal } from '../../components'
import {
  ChevronLeftIcon,
  UserIcon,
  CategoryIcon,
  BudgetIcon,
  ExportIcon,
  SignOutIcon,
} from '../../assets/icons'

const Settings = () => {
  const [modalIsOpen, setModalIsOpen] = useState()
  const { auth } = useAuth()
  const dispatch = useDispatch()
  const logout = useLogout()
  const navigate = useNavigate()

  const goBack = () => navigate('/')

  const handleLogout = async () => {
    if (auth?.id === 'guest') {
      setModalIsOpen(true)
    } else {
      dispatch(transactionsDataAction.setTransactionsData({ value: [] }))
      dispatch(categoryDataAction.setCategoryData({ value: [] }))
      await logout()
      navigate('/login')
    }
  }

  const handleRemoveStorage = () => {
    setModalIsOpen(false)
    localStorage.removeItem('isGuest')
    localStorage.removeItem('categoryData')
    localStorage.removeItem('transactionsData')
    navigate('/login')
  }

  return (
    <section className='settings'>
      <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <div className='modal__content--default'>
          <p className='text--bold'>Warning</p>
          <p className='text--light text--3'>
            You are in guest mode, all of your data will be deleted after you
            sign out.
          </p>
          <button
            className='btn btn-lg btn-danger'
            onClick={handleRemoveStorage}
          >
            Sign Out
          </button>
          <button
            className='btn btn-lg btn-primary-outline'
            onClick={() => setModalIsOpen(false)}
          >
            Cancel
          </button>
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
        <span className='text--bold text--capitalize'>
          {auth?.name ? auth.name : 'User'}
        </span>
      </p>
      {auth?.id !== 'guest' ? (
        <Link to='/account' className='settings__link'>
          <UserIcon />
          <p className='text--bold'>Account Settings</p>
        </Link>
      ) : null}

      <Link to='/edit-category' className='settings__link'>
        <CategoryIcon />
        <p className='text--bold'>Edit Category</p>
      </Link>
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
      <button className='settings__link btn-link mt-4' onClick={handleLogout}>
        <SignOutIcon />
        <p className='text--bold text--danger'>Sign Out</p>
      </button>
    </section>
  )
}

export default Settings
