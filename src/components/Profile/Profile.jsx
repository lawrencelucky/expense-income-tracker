/* eslint-disable react/prop-types */
import "./profile.css";

const Profile = (props) => {
  return (
    <div className="profile-container">
      <img src={props.image} alt={props.image} className="image" />
      <div>
        <p className="name">{props.name}</p>
        <p className="matric">{props.matric}</p>
      </div>
    </div>
  );
};

export default Profile;
