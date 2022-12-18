import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  const goBack = () => navigate(-1)

  return (
    <section className='not-found'>
      <div className='not-found__content'>
        <div className='not-found__content-wrapper'>
          <p className='text--bold text--8'>404 Not Found</p>
          <p className='text--light'>
            Oops, we can't find the page you looking for
          </p>
        </div>
        <div className='not-found__btn-wrapper'>
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

export default NotFound
