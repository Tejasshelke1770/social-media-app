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

export const createPost = async (file, caption) => {
  try {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);

    const response = await api.post("/", formData);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const likePost = async (postId) => {
  try {
    if (!postId) return "post id is required";
    const response = await api.post(`/like/${postId}`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const disLikePost = async (postId) => {
  try {
    if (!postId) return "post id is required";
    const response = await api.post(`/dislike/${postId}`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
