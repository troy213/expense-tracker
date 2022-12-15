import { expenseTracker } from '../../assets/images'

const Login = () => {
  return (
    <section className='login'>
      <div className='login__container'>
        <img src={expenseTracker} alt='logo' className='login__logo' />
        <p className='text--center text--bold text--8'>Sign In</p>
        <form className='login__form'>
          <label htmlFor='email' className='text--light'>
            Email
          </label>
          <input
            id='email'
            type='text'
            className='login__input'
            placeholder='user@mail.com'
          />
          <label htmlFor='password' className='text--light'>
            Password
          </label>
          <input
            id='password'
            type='password'
            className='login__input'
            placeholder='password'
          />
          <button type='submit' className='btn btn-primary'>
            Login
          </button>
          <button className='btn btn-primary-outline'>Register</button>
          <a href='#' className='link-danger'>
            Login as guest
          </a>
        </form>
      </div>
      <p className='login__footer text--light text--3'>
        Copyright © 2022 Tritera Erlangga. All Rights Reserved
      </p>
    </section>
  )
}

export default Login
