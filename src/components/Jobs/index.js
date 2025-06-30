import {Component} from 'react'
import Header from '../Header'
import AllJobsSection from '../AllJobsSection'
import './index.css'

class Jobs extends Component {
  render() {
    return (
      <>
        <div>
          <Header />
        </div>
        <div className="jobs-container">
          <AllJobsSection />
        </div>
      </>
    )
  }
}

export default Jobs
