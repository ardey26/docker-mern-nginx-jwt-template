import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { changePassword } from "../features/auth/authSlice";

const ChangePasswordModal = ({ show, onHide, user }) => {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    newPassword: "",
  });

  const handleSubmit = () => {
    dispatch(changePassword(userData));
    window.href = "/";
  };
  return (
    <Modal show={show} onHide={onHide} size="sm" centered>
      <Modal.Header>change password</Modal.Header>
      <Modal.Body>
        <div className="form-outline mb-4">
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            value={userData.email}
            placeholder="enter email"
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          <label className="form-label" htmlFor="email">
            email address
          </label>
        </div>
        <div className="form-outline mb-4">
          <input
            type="password"
            className="form-control"
            id="oldPassword"
            name="oldPassword"
            value={userData.password}
            placeholder="enter old password"
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
          <label className="form-label" htmlFor="oldPassword">
            old password
          </label>
        </div>
        <div className="form-outline mb-4">
          <input
            type="password"
            className="form-control"
            id="newPassword"
            name="newPassword"
            value={userData.newPassword}
            placeholder="enter new password"
            onChange={(e) =>
              setUserData({ ...userData, newPassword: e.target.value })
            }
          />
          <label className="form-label" htmlFor="newPassword">
            new password
          </label>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-outline-dark"
            onClick={handleSubmit}
            disabled={
              !userData.email || !userData.password || !userData.newPassword
            }
          >
            submit
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ChangePasswordModal;
