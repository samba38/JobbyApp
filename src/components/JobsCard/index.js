import {Link} from 'react-router-dom'
import {RiStarSFill} from 'react-icons/ri'
import {ImLocation2} from 'react-icons/im'
import {IoBag} from 'react-icons/io5'

import './index.css'

const JobsCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="jobers-link">
      <li className="jobs-lists-type">
        <div className="sider">
          <img
            src={companyLogoUrl}
            className="company-img"
            alt="company logo"
          />
          <div>
            <h1 className="jobs-company-heading">{title}</h1>
            <div className="sider">
              <RiStarSFill className="fill-img" />
              <p className="jobs-company-paragraph1">{rating}</p>
            </div>
          </div>
        </div>
        <div className="sider2">
          <div className="sider">
            <div className="sider-space">
              <ImLocation2 className="loco-img" />
              <p className="jobs-company-paragraph2">{location}</p>
            </div>
            <div className="sider-space">
              <IoBag className="bag-img" />
              <p className="jobs-company-paragraph3">{employmentType}</p>
            </div>
          </div>
          <p className="jobs-company-paragraph4">{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="jobs-company-description-heading">Description</h1>
        <p className="jobs-company-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobsCard
