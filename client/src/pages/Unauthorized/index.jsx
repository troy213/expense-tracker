import { useNavigate } from 'react-router-dom'

const Unauthorized = () => {
  const navigate = useNavigate()

  const goBack = () => navigate(-1)

  return (
    <section className='unauthorized'>
      <div className='unauthorized__content'>
        <div className='unauthorized__content-wrapper'>
          <p className='text--bold text--8'>401 Unauthorized</p>
          <p className='text--light'>
            You do not have access to the requested page
          </p>
        </div>
        <div className='unauthorized__btn-wrapper'>
          <button className='btn btn-light-outline' onClick={goBack}>
            Back
          </button>
        </div>
      </div>
      <p className='text--center text--light text--3'>
        Copyright © 2022 Tritera Erlangga. All Rights Reserved
      </p>
    </section>
  )
}

export default Unauthorized
