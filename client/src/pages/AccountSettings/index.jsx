import { useNavigate } from 'react-router-dom'

import { ChevronLeftIcon } from '../../assets/icons'

const AccountSettings = () => {
  const navigate = useNavigate()

  const goBack = () => navigate(-1)
  return (
    <section className='account-settings'>
      <div className='account-settings__header'>
        <button
          className='account-settings__header-wrapper btn-link'
          onClick={goBack}
        >
          <ChevronLeftIcon />
          <p className='text--bold'>Account Settings</p>
        </button>
      </div>
      <div className='account-settings__container'>
        <form className='account-settings__form'>
          <div className='account-settings__input-wrapper'>
            <label htmlFor='name' className='text--light'>
              Name
            </label>
            <input
              id='name'
              type='text'
              className='account-settings__input'
              placeholder='name'
            />
          </div>
          <div className='account-settings__input-wrapper'>
            <label htmlFor='email' className='text--light'>
              Email
            </label>
            <input
              id='email'
              type='text'
              className='account-settings__input'
              placeholder='user@mail.com'
            />
          </div>
          <div className='account-settings__input-wrapper'>
            <label htmlFor='old-password' className='text--light'>
              Old Password
            </label>
            <input
              id='old-password'
              type='password'
              className='account-settings__input'
              placeholder='old password'
            />
          </div>
          <div className='account-settings__input-wrapper'>
            <label htmlFor='new-password' className='text--light'>
              New Password
            </label>
            <input
              id='new-password'
              type='password'
              className='account-settings__input'
              placeholder='new password'
            />
          </div>
          <div className='account-settings__input-wrapper'>
            <label htmlFor='re-password' className='text--light'>
              Re-type Password
            </label>
            <input
              id='re-password'
              type='password'
              className='account-settings__input'
              placeholder='re-type password'
            />
          </div>
          <button
            type='submit'
            className='btn btn-lg btn-primary text--bold mt-4'
          >
            Update
          </button>
        </form>
      </div>
    </section>
  )
}

export default AccountSettings
