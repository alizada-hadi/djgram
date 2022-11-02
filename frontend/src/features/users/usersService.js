import axios from "axios";

const register = async (data) => {
  const response = await axios.post(
    "http://localhost:8000/api/users/register/",
    data
  );
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (data) => {
  const response = await axios.post(
    "http://localhost:8000/api/users/login/",
    data
  );
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = async () => {
  localStorage.removeItem("user");
};

const profile = async (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(data);
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: `Bearer ${user.token}`,
    },
  };
  const response = await axios.post(
    "http://localhost:8000/api/users/profile/update/",
    data,
    config
  );
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const usersService = {
  register,
  login,
  logout,
  profile,
};

export default usersService;
