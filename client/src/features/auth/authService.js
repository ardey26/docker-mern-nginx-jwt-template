import axios from "axios";

const API_URL = "/api/user/";

const mountToken = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return config;
};

// REGISTER
const register = async (user) => {
  const response = await axios.post(API_URL + "register", user);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// LOGIN
const login = async (user) => {
  const response = await axios.post(API_URL + "login", user);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// LOGOUT
const logout = () => {
  return localStorage.removeItem("user");
};

const changePassword = async (userData, token) => {
  const response = await axios.patch(
    API_URL + "change",
    userData,
    mountToken(token)
  );

  return response.data;
};

const authService = {
  register,
  logout,
  login,
  changePassword,
};

export default authService;
