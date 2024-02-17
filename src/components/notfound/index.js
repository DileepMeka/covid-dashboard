import {Link} from 'react-router-dom'
import './index.css'

const NotFound = props => {
  const {history} = props
  const onHomeClick = () => {
    history.push('/state/AN')
  }
  return (
    <div className="body not-found">
      <img
        className="not-found-img"
        src="https://res.cloudinary.com/dhrxxm585/image/upload/v1707044257/Group_7484_liono7.png"
        alt="not-found-pic"
      />
      <h1 className="page-not-found">PAGE NOT FOUND</h1>
      <p className="not-found-content">
        we are sorry, the page you requested could not be found
      </p>
      <Link to="/state/AN">
        <button onClick={onHomeClick} className="button home-button">
          Home
        </button>
      </Link>
    </div>
  )
}
export default NotFound
