import axios from "axios";
import _ from "lodash";

const axiosInstance = axios.create({
  baseURL: "/",
});

axiosInstance.interceptors.response.use(
  ({ data }) => data,
  async (error) => {
    if (_.get(error, "response.status") === 401) {
      console.log("i got an error her");
      console.log(error);
      alert(
        "you are not authorized to do that action please identify your identity!"
      );
      localStorage.removeItem("jwtToken");
      window.location.href = "/login";

      return;
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
