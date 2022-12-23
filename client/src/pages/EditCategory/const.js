import { getMaxLengthRegex } from '../../utils/validator'

export const ADD_CATEGORY_FORM = [
  {
    id: 'type',
    label: 'Type',
    type: 'dropdown',
    options: [
      {
        value: 'Outcome',
      },
      {
        value: 'Income',
      },
    ],
  },
  {
    id: 'value',
    label: 'Category Name',
    type: 'text',
    placeholder: 'category name',
    validation: getMaxLengthRegex(30),
  },
]

export const EDIT_CATEGORY_FORM = [
  {
    id: 'type',
    label: 'Type',
    type: 'dropdown',
    options: [
      {
        value: 'Outcome',
      },
      {
        value: 'Income',
      },
    ],
  },
  {
    id: 'value',
    label: 'Category Name',
    type: 'text',
    placeholder: 'category name',
    validation: getMaxLengthRegex(30),
  },
]
