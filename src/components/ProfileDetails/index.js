import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs' // Added missing import
import Cookies from 'js-cookie'
import UserCard from '../UserCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileDetails extends Component {
  state = {userDetails: {}, appiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({appiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        userDetails: updatedData,
        appiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({appiStatus: apiStatusConstants.failure})
    }
  }

  onRetryApi = () => {
    this.getProducts()
  }

  renderFailureStatus = () => (
    <button className="retry-btn" onClick={this.onRetryApi}>
      Retry
    </button>
  )

  renderLoaderBtn = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderUserDetails = () => {
    const {userDetails} = this.state

    return (
      <div className="user-card">
        <UserCard userInfo={userDetails} />
      </div>
    )
  }

  renderAllProducts = () => {
    const {appiStatus} = this.state
    switch (appiStatus) {
      case apiStatusConstants.success:
        return this.renderUserDetails()
      case apiStatusConstants.failure:
        return this.renderFailureStatus()
      case apiStatusConstants.inProgress:
        return this.renderLoaderBtn()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderAllProducts()}</div>
  }
}

export default ProfileDetails
