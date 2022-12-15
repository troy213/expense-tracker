import { useNavigate } from 'react-router-dom'

const Unauthorized = () => {
  const navigate = useNavigate()

  const goBack = () => navigate(-1)

  return (
    <section className='unauthorized'>
      <h1>401 Unauthorized</h1>
      <p>You do not have access to the requested page.</p>
      <br />
      <button onClick={goBack}>Go Back</button>
    </section>
  )
}

export default Unauthorized
