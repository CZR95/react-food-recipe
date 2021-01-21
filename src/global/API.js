import axios from "axios";

export async function apiGetUserList() {
  // GET user list
  axios.get(process.env.REACT_APP_API_GET_USER_LIST).then((response) => {
    if (response.data.message == "success") {
      return response.data.data;
    }
    console.log("userList: " + JSON.stringify(response.data.data));
  });
}
