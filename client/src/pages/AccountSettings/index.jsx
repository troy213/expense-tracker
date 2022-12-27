import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cogoToast from 'cogo-toast'
import { useSelector, useDispatch } from 'react-redux'
import { editAccountAction } from '../../store/edit-account-slice'

import { Form, Modal } from '../../components'
import { ChevronLeftIcon } from '../../assets/icons'
import { checkEmptyField } from '../../utils'
import {
  EDIT_NAME_FORM,
  EDIT_EMAIL_FORM,
  EDIT_PASSWORD_FORM,
  REGEX,
} from './const'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useLogout from '../../hooks/useLogout'

const AccountSettings = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalContent, setModalContent] = useState('')
  const editAccountState = useSelector((state) => state.editAccount)
  const { auth, setAuth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const logout = useLogout()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const goBack = () => navigate(-1)

  const handleModal = (content) => {
    setModalContent(content)
    setModalIsOpen(true)
  }

  const handleEditNameSubmit = (e) => {
    e.preventDefault()
    const isValid = checkEmptyField(
      editAccountState,
      editAccountAction,
      dispatch,
      ['error', 'email', 'newPassword', 'oldPassword', 'rePassword']
    )

    if (!isValid) return

    const data = { id: auth.id, name: editAccountState.name }

    submitForm('/api/users/change-name', data)
    handleCancel()
  }

  const handleEditEmailSubmit = (e) => {
    e.preventDefault()
    let isValid = checkEmptyField(
      editAccountState,
      editAccountAction,
      dispatch,
      ['error', 'name', 'newPassword', 'oldPassword', 'rePassword']
    )

    if (!REGEX.email.test(editAccountState.email)) {
      dispatch(editAccountAction.setError({ field: 'email', value: true }))
      isValid = false
    }

    if (!isValid) return

    const data = { id: auth.id, email: editAccountState.email }

    submitForm('/api/users/change-email', data)
    handleCancel()
  }

  const handleEditPasswordSubmit = (e) => {
    e.preventDefault()
    let isValid = checkEmptyField(
      editAccountState,
      editAccountAction,
      dispatch,
      ['error', 'email', 'name']
    )

    if (!REGEX.password.test(editAccountState.newPassword)) {
      dispatch(
        editAccountAction.setError({ field: 'newPassword', value: true })
      )
      isValid = false
    }

    if (editAccountState.newPassword !== editAccountState.rePassword) {
      dispatch(editAccountAction.setError({ field: 'rePassword', value: true }))
      isValid = false
    }

    if (!isValid) return

    const data = {
      id: auth.id,
      oldPassword: editAccountState.oldPassword,
      newPassword: editAccountState.newPassword,
    }

    submitForm('/api/users/change-password', data)
    handleCancel()
  }

  const handleCancel = () => {
    dispatch(editAccountAction.clearForm())
    setModalIsOpen(false)
  }

  const submitForm = async (url, data) => {
    try {
      const response = await axiosPrivate.put(url, JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })

      if (url !== '/api/users/change-password') {
        setAuth({
          ...auth,
          ...data,
        })
      } else {
        cogoToast.success('Password successfully changed')
        await logout()
      }
    } catch (err) {
      if (!err?.response) {
        cogoToast.error('No Server Response')
      } else {
        cogoToast.error(err.response?.data?.message)
      }
    }
  }

  const renderModal = {
    editName: (
      <div className='modal__content--default'>
        <p className='text--bold'>Edit Name</p>
        <Form
          schema={EDIT_NAME_FORM}
          state={editAccountState}
          action={editAccountAction}
          onSubmit={handleEditNameSubmit}
          onCancel={handleCancel}
          submitLabel='Update'
        />
      </div>
    ),
    editEmail: (
      <div className='modal__content--default'>
        <p className='text--bold'>Edit Email</p>
        <Form
          schema={EDIT_EMAIL_FORM}
          state={editAccountState}
          action={editAccountAction}
          onSubmit={handleEditEmailSubmit}
          onCancel={handleCancel}
          submitLabel='Update'
        />
      </div>
    ),
    editPassword: (
      <div className='modal__content--default'>
        <p className='text--bold'>Edit Password</p>
        <Form
          schema={EDIT_PASSWORD_FORM}
          state={editAccountState}
          action={editAccountAction}
          onSubmit={handleEditPasswordSubmit}
          onCancel={handleCancel}
          submitLabel='Update'
        />
      </div>
    ),
  }

  return (
    <section className='account-settings'>
      <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        {renderModal[modalContent]}
      </Modal>
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
        <div className='account-settings__item'>
          <p className='text--bold'>Name</p>
          <div className='account-settings__value'>
            <p className='text--light'>{auth?.name ? auth.name : 'User'}</p>
            <button
              className='btn btn-primary'
              onClick={() => handleModal('editName')}
            >
              Edit
            </button>
          </div>
        </div>
        <div className='account-settings__item'>
          <p className='text--bold'>Email</p>
          <div className='account-settings__value'>
            <p className='text--light'>{auth?.email}</p>
            <button
              className='btn btn-primary'
              onClick={() => handleModal('editEmail')}
            >
              Edit
            </button>
          </div>
        </div>
        <div className='account-settings__item mt-4'>
          <div className='account-settings__value'>
            <p className='text--bold'>Change password</p>
            <button
              className='btn btn-primary'
              onClick={() => handleModal('editPassword')}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AccountSettings
