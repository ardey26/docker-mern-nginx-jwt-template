import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal from "../components/ChangePasswordModal";
import { logout } from "../features/auth/authSlice";

import { toast } from "react-toastify";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [changePasswordModalShow, setChangePasswordModalShow] = useState(false);

  const { user, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      return navigate("/login");
    }
  }, [user, message, isError, navigate, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleChangePasswordModalShow = () => {
    setChangePasswordModalShow(true);
  };

  return (
    <>
      <div>
        <div className="display-1 text-center">Welcome, {user?.username}</div>

        <div className="d-flex justify-content-around mt-5">
          <button
            type="btn"
            className="btn btn-lg col-4 btn-outline-dark"
            onClick={handleChangePasswordModalShow}
          >
            change password
          </button>
          <button
            type="btn"
            className="btn btn-lg col-4 btn-outline-dark"
            onClick={handleLogout}
          >
            log out
          </button>
        </div>
        <ChangePasswordModal
          show={changePasswordModalShow}
          onHide={() => setChangePasswordModalShow(false)}
          user={user}
        />
      </div>
    </>
  );
}

export default Dashboard;
