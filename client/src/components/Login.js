import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const dispatch = useDispatch();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onLoginSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };
  return (
    <form onSubmit={onLoginSubmit} className="p-5">
      <div className="form-outline mb-4">
        <input
          type="text"
          className="form-control"
          id="email"
          name="email"
          value={email}
          placeholder="enter email / username"
          onChange={onChange}
        />
        <label className="form-label" htmlFor="email">
          email address
        </label>
      </div>
      <div className="form-outline mb-4">
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={password}
          placeholder="enter password"
          onChange={onChange}
        />
        <label className="form-label" htmlFor="password">
          password
        </label>
      </div>

      <div className="pt-1 mb-5 text-center">
        <button
          type="submit"
          className="btn btn-block btn-large btn-outline-dark"
        >
          submit
        </button>
      </div>
    </form>
  );
};

export default Login;
