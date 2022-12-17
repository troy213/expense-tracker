const Register = () => {
  return (
    <section className='register'>
      <div className='register__container'>
        <p className='text--center text--bold text--8'>Register</p>
        <form className='register__form'>
          <div className='register__input-wrapper'>
            <label htmlFor='email' className='text--light'>
              Email
            </label>
            <input
              id='email'
              type='text'
              className='register__input'
              placeholder='user@mail.com'
            />
          </div>
          <div className='register__input-wrapper'>
            <label htmlFor='password' className='text--light'>
              Password
            </label>
            <input
              id='password'
              type='password'
              className='register__input'
              placeholder='password'
            />
          </div>
          <div className='register__input-wrapper'>
            <label htmlFor='re-password' className='text--light'>
              Re-type Password
            </label>
            <input
              id='re-password'
              type='password'
              className='register__input'
              placeholder='re-type password'
            />
          </div>
          <button
            type='submit'
            className='btn btn-lg btn-primary text--bold mt-4'
          >
            Register
          </button>
        </form>
      </div>
      <p className='register__footer text--light text--3'>
        Copyright © 2022 Tritera Erlangga. All Rights Reserved
      </p>
    </section>
  )
}

export default Register
