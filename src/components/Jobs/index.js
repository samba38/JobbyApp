import {Component} from 'react'
import Header from '../Header'
import AllJobsSection from '../AllJobsSection'
import './index.css'

class Jobs extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="jobs-container">
          <AllJobsSection />
        </div>
      </>
    )
  }
}

export default Jobs
