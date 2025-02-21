import { createSlice } from "@reduxjs/toolkit";
import { LoginCheckApi } from "../api/api";

const initialState = {
  isPageLoaded: false,
  isAuthenticated: false,
  currentUser: null,
};

const sessionLogin = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    login: (state: any, action: any) => {
      state.isPageLoaded = true;
      state.isAuthenticated = true;
      state.currentUser = action?.payload?.userInfo;
    },

    logout: (state: any) => {
      state.isPageLoaded = true;
      state.isAuthenticated = false;
      state.currentUser = null;
    },
  },
});

// const { isAuthenticated, isPageLoaded, currentUser } = useSelector(
//   (state: {
//     userAuth: { isAuthenticated: boolean; isPageLoaded: boolean, currentUser: any };
//   }) => state.userAuth
// );

export const { login, logout } = sessionLogin.actions;
export default sessionLogin.reducer;


export const initSession = () => async (dispatch: any) => {
  // console.log("initSession")
  getLoginInfo(dispatch);
};

export const logoutSession = () => async (dispatch: any) => {
  localStorage.removeItem("userToken");
  dispatch(logout({} as any));
};

const getLoginInfo = async (dispatch: any) => {
  const token = localStorage.getItem("userToken");
  // console.log(token)
  if (!token) {
    dispatch(logout());
    return;
  }

  try {
    const userInfo = await getLoginApiInfo();
    console.log(userInfo)
    if (userInfo) {
      dispatch(login({ userInfo: userInfo?.data } as any));
    }
  } catch (error: any) {
    if (error.response?.status === 401 || 500) {
      dispatch(logout());
      // localStorage.removeItem("userToken");
      // window.location.href = "/";
    } else {
      console.error("Error fetching login info:", error);
    }
  }
};

const getLoginApiInfo = async () => {
  return await LoginCheckApi();
};