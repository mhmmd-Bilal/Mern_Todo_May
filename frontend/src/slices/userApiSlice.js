import { apiSlice } from "./apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/api/user",
        method: "POST",
        body: data,
      }),
    }),

    registerUser: builder.mutation({
      query: (data) => ({
        url: "/api/user/register",
        method: "POST",
        body: data,
      }),
    }),

    userLogout : builder.mutation({
      query : ()=>({
        url :'/api/user/logout',
        method : 'GET'
      })
    })
  }),
});



export const {
    useLoginUserMutation,
    useRegisterUserMutation,
    useUserLogoutMutation
} = userApiSlice