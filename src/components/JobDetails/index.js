import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs' // Added missing import
import JonInformation from '../JonInformation'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    jobList: [],
    skillsList: [],
    similarJobList: [],
    appiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({appiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        companyLogoUrl: data.job_details.company_logo_url,
        rating: data.job_details.rating,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        title: data.job_details.title,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
        companyWebsiteUrl: data.job_details.company_website_url,
      }
      const updateSkills = data.job_details.skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      }))
      const updateSimilarData = data.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobList: updatedData,
        skillsList: updateSkills,
        similarJobList: updateSimilarData,
        appiStatus: apiStatusConstants.success,
      })
      console.log(data)
    } else {
      this.setState({appiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureApi = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-img-job"
        alt="failure view"
      />
      <h1 className="failure-heading-job">Oops! Something Went Wrong</h1>
      <p className="failure-paragraph-job">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="failure-btn-job">Retry</button>
    </div>
  )

  renderLoaderApi = () => (
    <button type="button" data-testid="searchButton">
      <BsSearch className="search-icon" />
    </button>
  )

  renderJobInfo = () => {
    const {jobList, skillsList, similarJobList} = this.state
    return (
      <>
        <JonInformation
          jobDetails={jobList}
          skillsList={skillsList}
          similarJobList={similarJobList}
        />
      </>
    )
  }

  renderAllProducts = () => {
    const {appiStatus} = this.state
    switch (appiStatus) {
      case apiStatusConstants.success:
        return this.renderJobInfo()
      case apiStatusConstants.failure:
        return this.renderFailureApi()
      case apiStatusConstants.inProgress:
        return this.renderLoaderApi()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderAllProducts()}</div>
  }
}

export default JobDetails
