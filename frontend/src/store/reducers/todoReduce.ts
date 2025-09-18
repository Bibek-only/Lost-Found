// import { createSlice } from "@reduxjs/toolkit";

// import type { Todo } from "../../types/todoSchema";

// import {
//   getTodo,
//   addTodo,
//   updateTodo,
//   deleteTodo,
// } from "./api/todosAsyncThunk";

// interface todoState {
//   todos: Todo[];
//   loading: boolean;
//   error: string | null;
//   isEditing: boolean;
//   id: string;
//   title: string;
//   desc: string;
// }
// const initialState: todoState = {
//   todos: [],
//   loading: false,
//   error: null,
//   isEditing: false,
//   id: "",
//   title: "",
//   desc: "",
// };
// const todoSlice = createSlice({
//   name: "todoSlice",
//   initialState,
//   reducers: {
//     //normal reducer to do normal synchronous task
//     setId: (state, action) => {
//       state.id = action.payload;
//     },
//     setTitle: (state, action) => {
//       state.title = action.payload;
//     },
//     setDesc: (state, action) => {
//       state.desc = action.payload;
//     },
//     setIsEditing: (state, action) => {
//       state.isEditing = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getTodo.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getTodo.fulfilled, (state, action) => {
//         state.loading = false;
//         state.todos = action.payload;
//       })
//       .addCase(getTodo.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Can't get the todos";
//       })
//       .addCase(addTodo.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(addTodo.fulfilled, (state, action) => {
//         state.loading = false;
//         state.todos = [...state.todos, action.payload];
//       })
//       .addCase(addTodo.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Can't add the todo";
//       })
//       .addCase(updateTodo.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(updateTodo.fulfilled, (state, action) => {
//         state.todos = state.todos.map((todo) =>
//           todo.id === action.payload.id ? action.payload : todo
//         );
//         state.loading = false;
//         state.isEditing = false;
//       })
//       .addCase(updateTodo.rejected, (state, action) => {
//         state.loading = false;
//         state.isEditing = false;
//         state.error = action.error.message || "Can't update the todo";
//         state.title = "";
//         state.desc = "";
//       })
//       .addCase(deleteTodo.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(deleteTodo.fulfilled, (state, action) => {
//         state.loading = false;
//         state.todos = state.todos.filter(
//           (todo) => todo.id !== action.payload.id
//         );
//       })
//       .addCase(deleteTodo.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Can't delete the todo";
//       });
//   },
// });

// export default todoSlice.reducer;
// export const { setTitle, setDesc, setId, setIsEditing } = todoSlice.actions;
