import axiosInstance from "../config/axios.config";

class AuthService {
  login = async (credentials) => {
    try {
      let response = await axiosInstance.post("/auth/login", credentials);
      return response;
    } catch (error) {
      throw error;
    }
  };

  register = async (data) => {
    try {
      let response = await axiosInstance.post("/auth/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (exception) {
      throw exception;
    }
  };

  getUserByToken = async (token) => {
    try {
      let response = await axiosInstance.post(
        "/auth/activate/" + token,
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    } catch (exception) {
      throw exception;
    }
  };

  forgetPassword = async (email) => {
    try {
      const response = await axiosInstance.post(
        "/auth/forget-password",
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  resetPassword = async (userEmail, newPassword) => {
    try {
      const response = await axiosInstance.post(
        "/auth/reset-password",
        { email: userEmail, newPassword },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status) {
        return response.data;
      } else {
        throw new Error(response.data.msg);
      }
    } catch (error) {
      throw error;
    }
  };

  getLoggedInUser = async () => {
    try {
      let token = localStorage.getItem("accessToken");
      if (!token) {
        throw "Token not set...";
      }
      let userInfo = await axiosInstance.get("/auth/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-type": "application/json",
        },
      });
      return userInfo;
    } catch (exception) {}
  };
}

export default AuthService;
