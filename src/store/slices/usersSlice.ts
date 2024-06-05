// features/users/usersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUserList, IUser } from "../interfaces";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ limit = 10, skip = 0 }: { limit?: number; skip?: number }) => {
    const response = await axios.get("https://dummyjson.com/users", {
      params: { limit, skip },
    });
    return response.data as IUserList;
  }
);

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async ({ id }: { id: string }) => {
    const response = await axios.get(`https://dummyjson.com/users/${id}`);
    return response.data as IUser;
  }
);

export interface IUsersState {
  list: IUserList | null;
  selectedUser: IUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: IUsersState = {
  list: null,
  selectedUser: null,
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const selectUsers = (state: { users: IUsersState }) => state.users;

export default usersSlice.reducer;
