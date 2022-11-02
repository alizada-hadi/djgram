import axios from "axios";

const fetch = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };
  const response = await axios.get("http://localhost:8000/", config);
  return response.data;
};

const upload = async (image) => {
  const user = JSON.parse(localStorage.getItem("user"));
  let progress = 0;
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: `Bearer ${user.token}`,
    },
    onUploadProgress: (progressEvent) => {
      progress = parseInt(
        Math.round((progressEvent.loaded * 100) / progressEvent.total)
      );
    },
  };
  const response = await axios.post(
    "http://localhost:8000/create/",
    image,
    config
  );
  const { data } = response;
  return { data, progress };
};

const galleryService = {
  fetch,
  upload,
};

export default galleryService;
