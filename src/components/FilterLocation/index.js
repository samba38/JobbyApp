import './index.css'

const FilterLocation = props => {
  const {locationBased, onChangeLocation} = props
  const onChangeTypeLocation = event => {
    onChangeLocation(event.target.value)
  }
  return (
    <div>
      <h1 className="location-heading">Location</h1>
      {locationBased.map(eachLoction => (
        <li key={eachLoction.locationId} className="location-type-list">
          <input
            type="checkbox"
            id={eachLoction.locationId}
            className="location-input"
            value={eachLoction.locationId}
            onClick={onChangeTypeLocation}
          />
          <label
            htmlFor={eachLoction.locationId}
            className="location-type-label"
          >
            {eachLoction.location}
          </label>
        </li>
      ))}
    </div>
  )
}

export default FilterLocation
