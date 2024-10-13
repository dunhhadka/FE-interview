import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { Event, EventFilterRequest, User, UserFilter } from "../redux/action";
import client from "../redux/client";
import { toast } from "react-toastify";


export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token"); 
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); 
      }
      return headers;
    },
  }),
  tagTypes: ["User"], // Thêm tag 'User'
  endpoints: (build) => ({
    searchUserWithCount: build.query<
      { users: User[]; count: number },
      UserFilter
    >({
      queryFn: async (filter, api, extraOptions, baseQuery) => {
        try {
          const [{ data: users }, { data: count }] = await Promise.all([
            client.request<User[]>({
              url: "/admin/users/search",
              params: filter,
              method: "GET",
            }),
            client.request<number>({
              url: "/admin/users/search/count",
              params: filter,
              method: "GET",
            }),
          ]);
      
          return {
            data: {
              users: users,
              count: count,
            },
          };
        } catch (err) {
          console.log(err);
          const error = err as { response?: { status?: number; data?: { message?: string } } };
          if (error.response?.status === 401) {
            toast.error(error.response.data?.message);
          }
          return {
            error: {
              status: error.response?.status || 500,
              data: error.response?.data?.message || "Unknown error", 
            },
          };
        }
      },
      providesTags: (result) =>
        result
          ? [
              { type: "User", id: "LIST" }, 
            ]
          : [],
    }),
    getUserById: build.query<User, string>({
      query: (id) => ({
        url: "/admin/users/" + id,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    activeUserById: build.mutation<User, string>({
      query: (id) => ({
        url: `/admin/users/${id}/active`,
        method: "POST",
      }),
      invalidatesTags: [
        { type: "User", id: "LIST" },
        { type: "User", id: "SPECIFIC" },
      ],
    }),
    deleteUserById: build.mutation<User, string>({
      query: (id) => ({
        url: `/admin/users/${id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUserById: build.mutation<User, { id: string; user: User }>({
      query: (request) => ({
        url: `/admin/users/${request.id}`,
        method: "PUT",
        body: request.user,
      }),
      invalidatesTags: [
        { type: "User", id: "LIST" },
        { type: "User", id: "SPECIFIC" },
      ],
    }),
    createUser: build.mutation<User, User>({
      query: (request) => ({
        url: "/admin/users",
        method:"POST",
        body: request
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    searchEvent: build.query<Event[], EventFilterRequest>({
      query: (request) => ({
        url: "/admin/events",
        method:"GET",
        params: request
      })
    })
  }),
});

export const {
  useSearchUserWithCountQuery,
  useGetUserByIdQuery,
  useActiveUserByIdMutation,
  useDeleteUserByIdMutation,
  useUpdateUserByIdMutation,
  useCreateUserMutation,
  useSearchEventQuery
} = adminApi;
