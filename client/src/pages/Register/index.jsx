import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { registerAction } from '../../store/register-slice'
import axios from '../../api/axios'

import { Modal } from '../../components'
import { REGEX } from './const'

const Register = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const registerState = useSelector((state) => state.register)
  const { email, password, rePassword, errorMessage, error } = registerState
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (email) {
      dispatch(
        registerAction.setError({
          field: 'email',
          value: !REGEX.email.test(email),
        })
      )
    }

    if (password) {
      dispatch(
        registerAction.setError({
          field: 'password',
          value: !REGEX.password.test(password),
        })
      )
    }

    dispatch(
      registerAction.setError({
        field: 'rePassword',
        value: password !== rePassword,
      })
    )
  }, [registerState])

  const handleChange = (field, value) => {
    dispatch(registerAction.setInputField({ field, value }))
  }

  const handleRedirect = () => {
    setModalIsOpen(false)
    navigate('/login')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    for (const properties in error) {
      if (error[properties]) return
    }

    try {
      const response = await axios.post(
        '/api/register',
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      setModalIsOpen(true)
      dispatch(registerAction.clearForm())
    } catch (err) {
      if (!err?.response) {
        dispatch(
          registerAction.setInputField({
            field: 'errorMessage',
            value: 'No server response',
          })
        )
      } else {
        dispatch(
          registerAction.setInputField({
            field: 'errorMessage',
            value: err.response?.data?.message,
          })
        )
      }
    }
  }

  return (
    <section className='register'>
      <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <div className='modal__content--default'>
          <p className='text--center'>Registration success</p>
          <button className='btn btn-primary mt-4' onClick={handleRedirect}>
            Ok
          </button>
        </div>
      </Modal>
      <div className='register__container'>
        <p className='text--center text--bold text--8'>Register</p>
        {errorMessage ? (
          <p className='text--danger mt-4'>{errorMessage}</p>
        ) : null}

        <form className='register__form' onSubmit={handleSubmit}>
          <div className='register__input-wrapper'>
            <label htmlFor='email' className='text--light'>
              Email
            </label>
            <input
              id='email'
              type='text'
              className={`register__input${
                error.email ? ' register__input--error' : ''
              }`}
              placeholder='user@mail.com'
              value={email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>

          {error.email ? (
            <p className='text--light text--3'>Invalid email format</p>
          ) : null}

          <div className='register__input-wrapper'>
            <label htmlFor='password' className='text--light'>
              Password
            </label>
            <input
              id='password'
              type='password'
              className={`register__input${
                error.password ? ' register__input--error' : ''
              }`}
              placeholder='password'
              value={password}
              onChange={(e) => handleChange('password', e.target.value)}
            />
          </div>

          {error.password ? (
            <p className='text--light text--3'>
              5 to 24 characters. Must include uppercase and lowercase letters,
              a number and a special characters. (!, @, #, $, %)
            </p>
          ) : null}

          <div className='register__input-wrapper'>
            <label htmlFor='re-password' className='text--light'>
              Re-type Password
            </label>
            <input
              id='re-password'
              type='password'
              className={`register__input${
                error.rePassword ? ' register__input--error' : ''
              }`}
              placeholder='re-type password'
              value={rePassword}
              onChange={(e) => handleChange('rePassword', e.target.value)}
            />
          </div>

          {error.rePassword ? (
            <p className='text--light text--3'>
              Must match with the password field
            </p>
          ) : null}

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
