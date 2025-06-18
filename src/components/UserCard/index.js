import './index.css'

const UserCard = props => {
  const {userInfo} = props
  const {name, profileImageUrl, shortBio} = userInfo

  return (
    <>
      <img src={profileImageUrl} className="user-profile-img" alt="profile" />
      <h1 className="user-profile-paragraph">{name}</h1>
      <p className="user-profile-bio">{shortBio}</p>
    </>
  )
}

export default UserCard
