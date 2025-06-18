import './index.css'

const NotFound = () => (
  <div className="notF-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="notF-img"
    />
    <h1 className="notF-heading">Page Not Found</h1>
    <p className="notF-paragraph">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
