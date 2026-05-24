import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:3000/api/post`,
  withCredentials: true,
});

export const getFeed = async () => {
  try {
    const response = await api.get("/feed");
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
