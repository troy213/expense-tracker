import { useState } from 'react'
import axios from '../../api/axios'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import useAuth from '../../hooks/useAuth'
import { loginAction } from '../../store/login-slice'
import { categoryDataAction } from '../../store/category-data-slice'

import { Spinner } from '../../components'
import { expenseTracker } from '../../assets/images'
import { CATEGORY_DATA } from '../../data/categoryData'

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const loginState = useSelector((state) => state.login)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { setAuth } = useAuth()
  const from = location.state?.from?.pathname || '/'

  const handleLoginGuest = () => {
    setAuth({ id: 'guest', name: 'guest', email: null, accessToken: null })
    localStorage.setItem('isGuest', true)
    localStorage.setItem('transactionsData', JSON.stringify([]))
    localStorage.setItem('categoryData', JSON.stringify(CATEGORY_DATA))
    dispatch(categoryDataAction.setCategoryData({ value: CATEGORY_DATA }))
    navigate('/')
  }

  const handleChange = (field, value) => {
    dispatch(loginAction.setInputField({ field, value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await axios.post(
        '/api/login',
        JSON.stringify({
          email: loginState.email,
          password: loginState.password,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      const accessToken = response?.data?.accessToken
      const name = response?.data?.name
      const email = response?.data?.email
      const id = response?.data?.id

      setAuth({ id, name, email, accessToken })
      dispatch(loginAction.clearForm())
      setIsLoading(false)
      navigate(from, { replace: true })
    } catch (err) {
      setIsLoading(false)
      if (!err?.response) {
        dispatch(
          loginAction.setInputField({
            field: 'errorMessage',
            value: 'No server response',
          })
        )
      } else {
        dispatch(
          loginAction.setInputField({
            field: 'errorMessage',
            value: err.response.data?.message,
          })
        )
      }
    }
  }

  if (isLoading) return <Spinner />

  return (
    <section className='login'>
      <div className='login__container'>
        <img src={expenseTracker} alt='logo' className='login__logo' />
        <p className='text--center text--bold text--8'>Sign In</p>
        {loginState.errorMessage ? (
          <p className='text--danger mt-4'>{loginState.errorMessage}</p>
        ) : null}
        <form className='login__form' onSubmit={handleSubmit}>
          <div className='login__input-wrapper'>
            <label htmlFor='email' className='text--light'>
              Email
            </label>
            <input
              id='email'
              type='text'
              className='login__input'
              placeholder='user@mail.com'
              value={loginState.email}
              onChange={(e) => handleChange('email', e.target.value)}
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
              value={loginState.password}
              onChange={(e) => handleChange('password', e.target.value)}
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
          <button
            className='btn-link link-danger text--bold text--center mt-4'
            onClick={handleLoginGuest}
          >
            Login as guest
          </button>
        </form>
      </div>
      <p className='login__footer text--light text--3'>
        Copyright © 2022 Tritera Erlangga. All Rights Reserved
      </p>
    </section>
  )
}

export default Login
