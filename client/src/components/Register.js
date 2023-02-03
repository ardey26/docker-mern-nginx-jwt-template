import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const validateName = (name) => {
    const re = /^[ a-zA-Z\-\’]+$/; //eslint-disable-line
    return re.test(name);
  };

  const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //eslint-disable-line
    return re.test(email);
  };

  const validateUsername = (username) => {
    const re = /^[A-Za-z][A-Za-z0-9_]{5,29}$/;
    return re.test(username);
  };

  const validatePassword = (password) => {
    const re =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/;
    return re.test(password);
  };

  const validatePassword2 = (password, password2) => {
    if (password) {
      const exp = password === password2;
      return exp;
    }
    return false;
  };
  const { name, username, email, password, password2 } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name && !username && !email && !password && !password2) {
      toast.error("Please fill in all the blanks");
    } else if (!validateName(name)) {
      toast.error("Name should only contain alpha characters");
    } else if (!validateUsername(username)) {
      toast.error(
        "Username should start with an alphanumeric character, and should be a minimum of 6 characters. Can contain underscores."
      );
    } else if (!validateEmail(email)) {
      toast.error("Invalid email format");
    } else if (!validatePassword(password)) {
      toast.error(
        "Password should contain atleast 1 lowercase character, 1 uppercase character, 1 numeric character, and 1 special character. Minimum length of 8 characters."
      );
    } else if (!validatePassword2(password, password2)) {
      toast.error("Password and confirmation of password do not match.");
    } else {
      const userData = {
        name,
        username,
        email,
        password,
        password2,
      };

      dispatch(register(userData));
    }
  };

  return (
    <form className="p-5" onSubmit={handleSubmit}>
      <div className="form-outline mb-1">
        <input
          name="name"
          type="text"
          id="registerName"
          placeholder="enter name..."
          className={
            validateName(formData.name) || !formData.name
              ? "form-control"
              : "form-control is-invalid"
          }
          onChange={onChange}
          value={formData.name}
        />
        <label className="form-label" htmlFor="registerName">
          name
        </label>
      </div>

      <div className="form-outline mb-1">
        <input
          name="username"
          type="text"
          id="registerUsername"
          placeholder="enter username..."
          className={
            validateUsername(formData.username) || !formData.username
              ? "form-control"
              : "form-control is-invalid"
          }
          onChange={onChange}
        />
        <label className="form-label" htmlFor="registerUsername">
          username
        </label>
      </div>

      <div className="form-outline mb-1">
        <input
          name="email"
          type="text"
          id="registerEmail"
          placeholder="enter email..."
          className={
            validateEmail(formData.email) || !formData.email
              ? "form-control"
              : "form-control is-invalid"
          }
          onChange={onChange}
        />
        <label className="form-label" htmlFor="registerEmail">
          email
        </label>
      </div>

      <div className="form-outline mb-1">
        <input
          name="password"
          type="password"
          id="registerPassword"
          placeholder="enter password..."
          className={
            validatePassword(formData.password) || !formData.password
              ? "form-control"
              : "form-control is-invalid"
          }
          onChange={onChange}
        />
        <label className="form-label" htmlFor="registerPassword">
          password
        </label>
      </div>

      <div className="form-outline mb-4">
        <input
          name="password2"
          type="password"
          id="registerRepeatPassword"
          placeholder="confirm password..."
          className={
            validatePassword2(formData.password2) || !formData.password2
              ? "form-control"
              : "form-control is-invalid"
          }
          onChange={onChange}
        />
        <label className="form-label" htmlFor="registerRepeatPassword">
          confirm password
        </label>
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="btn btn-block btn-large btn-outline-dark"
        >
          Sign up
        </button>
      </div>
    </form>
  );
};

export default Register;
