import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Login from "../components/Login";
import Register from "../components/Register";
import { reset } from "../features/auth/authSlice";

function Landing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [register, setRegister] = useState(false);
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleLoginClick = (e) => {
    e.preventDefault();
    setRegister(false);
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    setRegister(true);
  };

  return (
    <div className="">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="card my-5 col-lg-6 col-md-8 col-xs-12 shadow-lg">
            <div className="align-items-center">
              <div className="card-body text-black">
                <div className=" align-items-center">
                  <span className="display-5 fw-light text-center mx-auto">
                    <p>
                      <button
                        className={register ? "text-secondary" : "text-primary"}
                        style={{
                          textDecoration: "none",
                          border: "none",
                          backgroundColor: "white",
                        }}
                        onClick={handleLoginClick}
                      >
                        login
                      </button>
                      /
                      <button
                        className={register ? "text-primary" : "text-secondary"}
                        style={{
                          textDecoration: "none",
                          border: "none",
                          backgroundColor: "white",
                        }}
                        onClick={handleRegisterClick}
                      >
                        register
                      </button>
                    </p>
                  </span>
                </div>
                {register ? <Register /> : <Login />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
