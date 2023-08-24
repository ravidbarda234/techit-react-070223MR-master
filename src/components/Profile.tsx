import { FunctionComponent, useEffect, useState } from "react";
import { deleteUser, getUserDetails } from "../services/usersService";
import User from "../interfaces/User";
import Navbar from "./Navbar";
import { successMsg } from "../services/feedbacksService";
import { useNavigate } from "react-router-dom";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
  let [userInfo, setUserInfo] = useState<User>();
  let [userChanged, setuserChanged] = useState<boolean>(false);
  const navigate = useNavigate();

  let render = () => {
    setuserChanged(!userChanged);
  };

  useEffect(() => {
    getUserDetails()
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  let handleDelete = (id: string) => {
    if (window.confirm("Are you sure?")) {
      deleteUser(id)
        .then((res) => {
          successMsg("Product deleted successfully!");
          navigate("/");
          render();
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <h1>Profile</h1>
      <div style={{ marginTop: 5 }} className="card">
        <h6>Name: {userInfo?.name}</h6>
        <h6>Email: {userInfo?.email}</h6>
        <h6>{userInfo?.isAdmin ? <p>Admin</p> : <p>Regular User</p>}</h6>
        <div>
          <button
            style={{ marginBottom: 5 }}
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(userInfo?._id as string)}
          >
            Delete User
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
