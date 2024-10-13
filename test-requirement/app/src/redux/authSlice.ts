import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createUser, getAllUser, login, LoginResponse, logout, User } from "./action";
import { toast } from "react-toastify";

interface AuthState {
  isAuthenticated: boolean;
  name?: string;
  email?: string;
  password?: string;
  token?: string | null;
  isLoading: boolean;
  error?: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  name: "",
  email: "",
  password: "",
  token: "",
  isLoading: false,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
     console.log(action)
        const response = action.payload;
        if (response) {
          state.name = response.user?.fullName;
          state.email = response.user?.email;
          const token = response?.token;
          
          localStorage.setItem("current_user_id", response?.user?.id || "");

          if (token) {
            console.log("save token");
            localStorage.setItem("token", token);
          } else {
            console.warn("Token is null or undefined");
          }

          console.log("action", action.payload);
          toast.success("Đăng nhập thành công");
        } else {
          toast.error("Có lỗi xảy ra");
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action);
        if (action.payload && (action.payload as any).message) {
          state.error = (action.payload as any).message;
          toast.error(`${(action.payload as any).message}`);
        } else {
          state.error = action.error.message;
          toast.error(`${action.error.message}`);
        }
      })
      .addCase(logout.fulfilled, (state, action) => {
        toast.success("Đăng xuất thành công!");
      })
  },
});

export const authReducer = authSlice.reducer;


interface UserState {
  users: User[],
  isLoading: Boolean
}

const initUsersState:UserState = {
  users:[],
  isLoading: false
}

const userSlice = createSlice({
  name: "users",
  initialState: initUsersState,
  reducers:{},
  extraReducers:builder => {
    builder
    .addCase(getAllUser.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(getAllUser.fulfilled, (state, action) => {
      state.isLoading = false;
    })
    .addCase(getAllUser.rejected, (state, action) => {
      state.isLoading = false;
      toast.error("Có lỗi xảy ra");
    })
    .addCase(createUser.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(createUser.fulfilled, (state, action) => {
      state.isLoading = false;
      toast.success("Đăng ký thành công");
    })
    .addCase(createUser.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload && (action.payload as any).message) {
        toast.error(`${(action.payload as any).message}`);
      } else {
        toast.error(`${action.error.message}`);
      }
    })
  }
})

export const userReducer = userSlice.reducer;

