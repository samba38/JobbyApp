import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt=" website logo"
          className="header-website-img"
        />
      </Link>
      <ul className="unorder-head-list">
        <Link to="/" className="nav-link">
          <li className="list-head-items">Home</li>
        </Link>
        <Link to="/jobs" className="nav-link">
          <li className="list-head-items">jobs</li>
        </Link>

        <li className="btn-list-retry">
          <button className="logout-btn" type="button" onClick={onClickLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
