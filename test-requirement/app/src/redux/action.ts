import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "./client";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserFilter {
  query?: string;
  ids?: string[];
  email?: string;
  phone?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  national?: string;
  role?: string;
  type?: string;
  language?: string;
  createdAtMin?: Date;
  createdAtMax?: Date;
  activatedAtMin?: Date;
  activatedAtMax?: Date;
  limit: number;
  page: number;
}

export interface User {
  id?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  email?: string;
  phone?: string;
  password?: string;
  role?: User.Role;
  joinDate?: Date;
  createdOn?: Date;
  modifiedOn?: Date;
  status?: User.Status;
  language?: User.Language;
  isNotification?: boolean;
  type?: User.Type;
  national?: string;
  createdByUserId?: string;
  termsAccepted?: boolean;
}

export namespace User {
  export type Role = "super_admin" | "trainer" | "member";
  export type Status = "activated" | "waiting" | "deleted";
  export type Language = "english" | "viet_nam";
  export type Type = "normal" | "premium";
}

export interface LoginResponse {
  user: User;
  token: string | null;
}

export interface FilterRequest {
  name?: string;
  size: number;
  number: number;
}

export interface EventFilterRequest {
  query?: string;
  authorId?: string;
}

export interface Event {
  id: number;
  author: string;
  verb: string;
  description: string;
  keyword: string;
  authorId: string;
  additional: string;
  happenedAt: Date;
}

export const login = createAsyncThunk(
  "user/login",
  async (request: LoginRequest, { rejectWithValue }) => {
    try {
      const res = await client.request<{ user: User; token: string | null }>({
        url: "/admin/users/login",
        method: "POST",
        data: request,
      });

      console.log(res);

      if (res.status !== 200) {
        return rejectWithValue(res.data);
      }

      return res.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }

      return rejectWithValue("Something went wrong");
    }
  }
);

export interface UserResponse {
  users: User[];
}

export const getAllUser = createAsyncThunk(
  "user/getAll",
  async (request: FilterRequest, { rejectWithValue }) => {
    try {
      const res = await client.get<UserResponse>(`/admin/users/search`, {
        params: {
          name: request.name,
          size: request.size,
          number: request.number,
        },
      });

      return res.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      return rejectWithValue("Something went wrong");
    }
  }
);

export const createUser = createAsyncThunk(
  "user/create",
  async (request: User, { rejectWithValue }) => {
    try {
      const res = await client.request<any>({
        url: "/admin/users/register",
        method: "POST",
        data: request,
      });

      console.log(res);

      if (res.status !== 200) {
        return rejectWithValue(res.data);
      }

      return res.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }

      return rejectWithValue("Something went wrong");
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (request: string, { rejectWithValue }) => {
    try {
      const res = await client.request<void>({
        url: "/admin/users/logout",
        method: "POST",
        params: {
          id: request,
        },
      });

      console.log(res);

      if (res.status !== 200) {
        return rejectWithValue(res.data);
      }

      return res.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }

      return rejectWithValue("Something went wrong");
    }
  }
);
