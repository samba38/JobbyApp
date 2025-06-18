import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showSubmitError: false, errMsg: ''}

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onFailureMsg = errorMsg => {
    this.setState({showSubmitError: true, errMsg: errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onFailureMsg(data.error_msg)
    }
  }

  onChangeName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsernameField = () => (
    <>
      <div className="user-sider">
        <label htmlFor="inputBox" className="user-label">
          USERNAME
        </label>
        <input
          type="text"
          className="inpput-box"
          id="inputBox"
          onChange={this.onChangeName}
        />
      </div>
    </>
  )

  renderPasswordField = () => (
    <>
      <div className="user-sider">
        <label htmlFor="inputPas" className="user-label">
          PASSWORD
        </label>
        <input
          type="password"
          className="inpput-box"
          id="inputPas"
          onChange={this.onChangePassword}
        />
      </div>
    </>
  )

  render() {
    const {showSubmitError, errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="jobby-prime-container">
        <div className="jobby-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="website-img"
            alt="website logo"
          />
          <form onSubmit={this.submitForm}>
            {this.renderUsernameField()}
            {this.renderPasswordField()}
            <button className="login-btn" type="submit">
              Login
            </button>
            {showSubmitError && <p className="error-msg-paragraph">{errMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
