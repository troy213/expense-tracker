import { useNavigate, Link } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'
import {
  ChevronLeftIcon,
  UserIcon,
  CategoryIcon,
  BudgetIcon,
  ExportIcon,
  SignOutIcon,
} from '../../assets/icons'

const Settings = () => {
  const { auth } = useAuth()
  const navigate = useNavigate()

  const goBack = () => navigate('/')

  return (
    <section className='settings'>
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
      <button className='settings__link btn-link mt-4'>
        <SignOutIcon />
        <p className='text--bold text--danger'>Sign Out</p>
      </button>
    </section>
  )
}

export default Settings
