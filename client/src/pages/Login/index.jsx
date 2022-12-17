import { Link } from 'react-router-dom'

import { expenseTracker } from '../../assets/images'

const Login = () => {
  return (
    <section className='login'>
      <div className='login__container'>
        <img src={expenseTracker} alt='logo' className='login__logo' />
        <p className='text--center text--bold text--8'>Sign In</p>
        <form className='login__form'>
          <div className='login__input-wrapper'>
            <label htmlFor='email' className='text--light'>
              Email
            </label>
            <input
              id='email'
              type='text'
              className='login__input'
              placeholder='user@mail.com'
            />
          </div>
          <div className='login__input-wrapper'>
            <label htmlFor='password' className='text--light'>
              Password
            </label>
            <input
              id='password'
              type='password'
              className='login__input'
              placeholder='password'
            />
          </div>
          <button
            type='submit'
            className='btn btn-lg btn-primary text--bold mt-4'
          >
            Login
          </button>
          <Link
            to='/register'
            className='btn btn-lg btn-primary-outline text--bold'
          >
            Register
          </Link>
          <Link to='/' className='link-danger text--bold text--center mt-4'>
            Login as guest
          </Link>
        </form>
      </div>
      <p className='login__footer text--light text--3'>
        Copyright © 2022 Tritera Erlangga. All Rights Reserved
      </p>
    </section>
  )
}

export default Login
