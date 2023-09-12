import axios from "axios";

const apiUrl = "https://jsonplaceholder.typicode.com/posts";
export const getPosts = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw error;
  }
};
