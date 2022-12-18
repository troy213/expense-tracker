import DatePicker from 'react-datepicker'
import { useDispatch } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css'

const Form = (props) => {
  const {
    schema,
    state,
    action,
    onSubmit,
    onCancel,
    submitLabel = 'Submit',
    isCancelable = true,
  } = props
  const dispatch = useDispatch()

  const handleChange = (field, value) => {
    dispatch(action.setInputField({ field, value }))
  }

  return (
    <form className='form' onSubmit={onSubmit}>
      {schema.map((field, fieldIndex) => {
        const { id, label, type } = field

        return (
          <div key={fieldIndex} className='form__input-wrapper'>
            <label htmlFor={id} className='text--light text--3'>
              {label}
            </label>

            {type === 'date' ? (
              <DatePicker
                id={id}
                selected={state[id] && new Date(state[id])}
                onChange={(date) => handleChange(id, date.toISOString())}
                className={`form__input`}
              />
            ) : null}

            {type === 'dropdown' ? (
              <select
                id={id}
                onChange={(e) => handleChange(id, e.target.value)}
                value={state[id]}
                className={`form__input`}
              >
                <option value=''>-select-</option>
                {field.options.map((option, index) => {
                  return (
                    <option value={option.value} key={index}>
                      {option.value}
                    </option>
                  )
                })}
              </select>
            ) : null}

            {type === 'text' ? (
              <input
                type='text'
                id={id}
                value={state[id]}
                onChange={(e) => handleChange(id, e.target.value)}
                className={`form__input`}
              />
            ) : null}

            {type === 'number' ? (
              <input
                type='number'
                id={id}
                value={state[id]}
                onChange={(e) => handleChange(id, e.target.value)}
                className={`form__input`}
              />
            ) : null}
          </div>
        )
      })}
      <button type='submit' className='btn btn-lg btn-primary mt-4'>
        {submitLabel}
      </button>
      {isCancelable ? (
        <button className='btn btn-lg btn-primary-outline' onClick={onCancel}>
          Cancel
        </button>
      ) : null}
    </form>
  )
}

export default Form
