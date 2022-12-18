export const EDIT_TRANSACTION_FORM = [
  {
    id: 'date',
    label: 'Date',
    type: 'date',
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
    type: 'dropdown',
    options: [
      {
        value: 'Education',
        category: 'outcome',
      },
      {
        value: 'Transportation',
        category: 'outcome',
      },
      {
        value: 'Food & Beverages',
        category: 'outcome',
      },
      {
        value: 'Entertainment',
        category: 'outcome',
      },
      {
        value: 'Charity',
        category: 'outcome',
      },
      {
        value: 'Salary',
        category: 'income',
      },
      {
        value: 'Bonus',
        category: 'income',
      },
    ],
  },
  {
    id: 'description',
    label: 'Description',
    type: 'text',
  },
  {
    id: 'amount',
    label: 'Amount (Rp)',
    type: 'number',
  },
]
