import {RiStarSFill} from 'react-icons/ri'
import {ImLocation2} from 'react-icons/im'
import {IoBag} from 'react-icons/io5'

import Header from '../Header'
import './index.css'

const JonInformation = props => {
  const {jobDetails, skillsList, similarJobList} = props
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    id,
    jobDescription,
    rating,
    location,
    packagePerAnnum,
    title,
    employmentType,
    description,
    imageUrl,
  } = jobDetails

  return (
    <>
      <Header />
      <div className="jobdata-container">
        <div className="jobdata-card">
          <div className="firster-side">
            <img
              src={companyLogoUrl}
              className="jobdata-img"
              alt="job details company logo"
            />
            <div>
              <h1 className="jobdata-heading">{title}</h1>
              <div className="rating-sider">
                <RiStarSFill className="jobdata-star-img" />
                <p className="jobdata-paragraph1">{rating}</p>
              </div>
            </div>
          </div>
          <div className="content-sider">
            <div className="sider-imges1">
              <div className="sider-imges">
                <ImLocation2 className="jobdata-location-img" />
                <p className="jobdata-paragraph2">{location}</p>
              </div>
              <div className="sider-imges">
                <IoBag className="jobdata-bag-img" />
                <p className="jobdata-paragraph2">{employmentType}</p>
              </div>
            </div>
            <p className="jobdata-paragraph3">{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="url-sider">
            <h1 className="jobdata-description">Description</h1>
            <a href={companyWebsiteUrl} target="_blank" rel="noreferrer">
              Visit
            </a>
          </div>
          <p className="jobdata-paragraph-description">{jobDescription}</p>
          <h1 className="jobdata-description">Skills</h1>
          <ul className="skills-unorder-list">
            {skillsList.map(eachItem => (
              <li className="skills-list">
                <img
                  src={eachItem.imageUrl}
                  alt={eachItem.name}
                  className="skills-imgs"
                />
                <p className="skills-paragraph">{eachItem.name}</p>
              </li>
            ))}
          </ul>
          <div className="life-companu-sider">
            <div>
              <h1 className="jobdata-description">Life at Company</h1>
              <p className="companu-life-description">{description}</p>
            </div>
            <img
              src={imageUrl}
              className="companu-life-img"
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="jobdata-description">Similar Jobs</h1>
        <ul className="unorder-similar-list">
          {similarJobList.map(eachJod => (
            <li className="similar-list-type">
              <div className="firster-side">
                <img
                  src={eachJod.companyLogoUrl}
                  className="jobdata-img"
                  alt="similar job company logo"
                />
                <div>
                  <h1 className="jobdata-heading">{eachJod.title}</h1>
                  <div className="rating-sider">
                    <RiStarSFill className="jobdata-star-img" />
                    <p className="jobdata-paragraph1">{eachJod.rating}</p>
                  </div>
                  <h1 className="jobdata-description">Description</h1>
                  <p className="jobdata-paragraph-description">
                    {eachJod.jobDescription}
                  </p>
                </div>
              </div>
              <div className="sider-imges1">
                <div className="sider-imges">
                  <ImLocation2 className="jobdata-location-img" />
                  <p className="jobdata-paragraph2">{eachJod.location}</p>
                </div>
                <div className="sider-imges">
                  <IoBag className="jobdata-bag-img" />
                  <p className="jobdata-paragraph2">{eachJod.employmentType}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default JonInformation
