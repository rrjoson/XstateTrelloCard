import { Machine, actions } from "xstate";
const { assign } = actions;

export const todosMachine = Machine({
  id: "todos",
  initial: "all",
  context: {
    todo: "", // new todo
    todos: []
  },
  states: {
    all: { on: { "NEWTODO.OPEN": "adding" } },
    adding: {
      on: {
        "NEWTODO.CLOSE": "all",
        "NEWTODO.COMMIT": {
          target: "all",
          actions: [
            assign({
              todo: "", // clear todo
              todos: (ctx, e) => {
                const newTodo = { id: 1 };
                return ctx.todos.concat({
                  ...newTodo
                });
              }
            })
          ]
        },
        "NEWTODO.CHANGE": {
          actions: assign({
            todo: (ctx, e) => e.value
          })
        }
      }
    }
  }
});
