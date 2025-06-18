import './index.css'

const FilterJobs = props => {
  const {employmentTypesList, employmentTypes, changeEmploymentType} = props

  const onChangeEmployment = event => {
    changeEmploymentType(event.target.value)
  }
  const rendercheckInputs = () => (
    <div>
      <h1 className="types-emply-heading">Types Of Employment</h1>
      {employmentTypesList.map(eachItem => (
        <li className="check-boxes" key={eachItem.employmentTypeId}>
          <input
            type="checkbox"
            id={eachItem.employmentTypeId}
            className="boxes-int"
            value={eachItem.employmentTypeId}
            onChange={onChangeEmployment}
          />
          <label htmlFor={eachItem.employmentTypeId} className="boxes-label">
            {eachItem.label}
          </label>
        </li>
      ))}
    </div>
  )
  return <>{rendercheckInputs()}</>
}

export default FilterJobs
