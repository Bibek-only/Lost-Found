type Todo = {
  id: string;
  title: string;
  desc: string;
  isCompleted: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};




type AllTodo = Todo[];

export type {Todo, AllTodo}
