import './index.css'

const FilterSalary = props => {
  const {salaryRangesList, salaryRanges, onChangeRadioInput} = props

  const renderFilterRadios = () =>
    salaryRangesList.map(eachSalary => {
      const onChangeRadio = event => onChangeRadioInput(event.target.value)
      return (
        <li key={eachSalary.salaryRangeId} className="radio-circles">
          <input
            type="radio"
            name="salary"
            id={eachSalary.salaryRangeId}
            value={eachSalary.salaryRangeId}
            className="radio-input"
            onChange={onChangeRadio}
          />
          <label htmlFor={eachSalary.salaryRangeId} className="radio-label">
            {eachSalary.label}
          </label>
        </li>
      )
    })
  return (
    <div>
      <h1 className="Salary-heading">Salary Range</h1>
      {renderFilterRadios()}
    </div>
  )
}

export default FilterSalary
