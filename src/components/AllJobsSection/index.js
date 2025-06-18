import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs' // Added missing import
import {IoSearchOutline} from 'react-icons/io5'
import JobsCard from '../JobsCard'
import FilterJobs from '../FilterJobs'
import FilterSalary from '../FilterSalary'
import ProfileDetails from '../ProfileDetails'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobsSection extends Component {
  state = {
    jobsList: [],
    employmentTypes: employmentTypesList[0].employmentTypeId,
    salaryRanges: salaryRangesList[0].salaryRangeId,
    searchInput: '',
    appiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({appiStatus: apiStatusConstants.inProgress})
    const {employmentTypes, salaryRanges, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypes}&minimum_package=${salaryRanges}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedData,
        appiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({appiStatus: apiStatusConstants.failure})
    }
  }

  changeEmploymentType = id => {
    this.setState({employmentTypes: id}, this.getProducts)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value}, this.getProducts)
  }

  onChangeSearch = event => {
    if (event.key === 'Enter') {
      this.getProducts()
    }
  }

  onChangeRadioInput = id => {
    this.setState({salaryRanges: id}, this.getProducts)
  }

  oncahngeApi = () => {
    this.getProducts()
  }

  renderNoData = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        className="failure-img"
        alt="no jobs"
      />
      <h1 className="failure-heading">No Jobs Found</h1>
      <p className="failure-paragraph">
        We could not find any jobs.Try other filters
      </p>
    </div>
  )

  renderjobsData = () => {
    const {jobsList} = this.state
    const isTrueJob = jobsList.length > 0
    return (
      <ul>
        {jobsList.map(eachItem => (
          <JobsCard key={eachItem.id} jobDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderFunction = () => {
    const {jobsList} = this.state
    const isTrueJob = jobsList.length > 0
    return <div>{isTrueJob ? this.renderjobsData() : this.renderNoData()}</div>
  }

  renderProfileDetails = () => <ProfileDetails />

  renderFailureApi = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-img"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-paragraph">
        We cannot seem to find the page you are looking for
      </p>
      <button className="failure-btn" onClick={this.oncahngeApi}>
        Retry
      </button>
    </div>
  )

  renderLoaderApi = () => (
    <button type="button" data-testid="searchButton">
      <BsSearch className="search-icon" />
    </button>
  )

  renderAllProducts = () => {
    const {appiStatus} = this.state
    switch (appiStatus) {
      case apiStatusConstants.success:
        return this.renderFunction()
      case apiStatusConstants.failure:
        return this.renderFailureApi()
      case apiStatusConstants.inProgress:
        return this.renderLoaderApi()
      default:
        return null
    }
  }

  render() {
    const {jobsList, employmentTypes, salaryRanges, searchInput} = this.state
    return (
      <div className="siding-jobs-card">
        <div>
          {this.renderProfileDetails()}
          <hr />
          <FilterJobs
            employmentTypesList={employmentTypesList}
            changeEmploymentType={this.changeEmploymentType}
          />
          <hr />
          <FilterSalary
            salaryRangesList={salaryRangesList}
            onChangeRadioInput={this.onChangeRadioInput}
          />
        </div>
        <div>
          <div className="search-container">
            <input
              type="search"
              className="search-input"
              placeholder="Search"
              value={searchInput}
              onChange={this.onChangeSearchInput}
              onKeyDown={this.onChangeSearch}
            />
            <IoSearchOutline className="search-icon-img" />
          </div>
          {this.renderAllProducts()}
        </div>
      </div>
    )
  }
}

export default AllJobsSection
