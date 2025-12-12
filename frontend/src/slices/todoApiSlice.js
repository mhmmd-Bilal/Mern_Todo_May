import { apiSlice } from "./apiSlice";

const todoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTodo: builder.mutation({
      query: (data) => ({
        url: "/api/todo/create",
        method: "POST",
        body: data,
      }),
    }),
    getTodos: builder.query({
      query: () => ({
        url: "/api/todo",
      }),
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/api/todo/delete/${id}`,
        method: "DELETE",
        body: id,
      }),
    }),
  }),
});

export const { useCreateTodoMutation, useGetTodosQuery,useDeleteTodoMutation } = todoApiSlice;
