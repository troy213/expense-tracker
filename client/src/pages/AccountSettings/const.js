import { getMaxLengthRegex } from '../../utils/validator'

export const EDIT_NAME_FORM = [
  {
    id: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'name',
    validation: getMaxLengthRegex(16),
  },
]

export const EDIT_EMAIL_FORM = [
  {
    id: 'email',
    label: 'Email',
    type: 'text',
    placeholder: 'user@mail.com',
    helperText: 'Invalid email format',
  },
]

export const EDIT_PASSWORD_FORM = [
  {
    id: 'oldPassword',
    label: 'Old password',
    type: 'password',
    placeholder: 'old password',
  },
  {
    id: 'newPassword',
    label: 'New password',
    type: 'password',
    placeholder: 'new password',
    helperText:
      '5 to 24 characters. Must include uppercase and lowercase letters, a number and a special characters. (!, @, #, $, %)',
  },
  {
    id: 'rePassword',
    label: 'Re-type password',
    type: 'password',
    placeholder: 'retype password',
    helperText: 'Must match with new password field',
  },
]

export const REGEX = {
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{5,24}$/,
}
