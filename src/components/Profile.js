import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user: currentUser } = useSelector(state => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <h3>
        Welcome to your profile, <strong>{currentUser.user.name}!</strong>
      </h3>
      <br></br>
      <p>
        <strong>Name:</strong>
        &nbsp; {currentUser.user.name}
      </p>
      <br></br>
      <p>
        <strong>Email:</strong>
        &nbsp; {currentUser.user.email}
      </p>
      <br></br>
      <p>
        <strong>Token:</strong>
        &nbsp; {currentUser.jwt}
      </p>
      <br></br>
      <p>
        <strong>User Id:</strong>
        &nbsp; {currentUser.user.id}
      </p>
    </div>
  );
};

export default Profile;
