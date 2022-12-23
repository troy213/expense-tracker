import { getCurrencyRegex, getMaxLengthRegex } from '../../utils/validator'

export const ADD_TRANSACTION_FORM = [
  {
    id: 'date',
    label: 'Date',
    type: 'date',
    placeholder: 'dd/MM/yyyy',
  },
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
    id: 'category',
    label: 'Category',
    type: 'conditional-dropdown',
    dependency: 'type',
    options: 'categoryData',
  },
  {
    id: 'description',
    label: 'Description',
    type: 'text',
    placeholder: 'description',
    validation: getMaxLengthRegex(30),
  },
  {
    id: 'amount',
    label: 'Amount (Rp)',
    type: 'text',
    placeholder: '100.000,00',
    validation: getCurrencyRegex(12),
  },
]
