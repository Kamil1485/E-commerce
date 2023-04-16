import React from "react";
import { useSelector } from "react-redux";
const Profile = () => {
  const userInfo = useSelector((state) => state.bazar.userInfo);


  return (
    <div>
      <div>
        <img style={{ width: "200px" }} src={userInfo?.image} alt="" />
        <p>Username:{userInfo?.name}</p>
        <p>Email:{userInfo?.email}</p>
      </div>
    </div>
  );
};

export default Profile;
