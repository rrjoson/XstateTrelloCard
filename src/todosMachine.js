import { Machine, actions } from "xstate";
const { assign } = actions;

export const todosMachine = Machine({
  id: "todos",
  initial: "initializing",
  context: {
    todo: "",
    todos: []
  },
  states: {
    initializing: {
      entry: assign({
        todos: (ctx, e) => {
          return ctx.todos;
        }
      }),
      on: {
        "": "all"
      }
    },
    all: { on: { "NEWTODO.OPEN": "adding" } },
    adding: {
      on: {
        "NEWTODO.CLOSE": "all",
        "NEWTODO.COMMIT": {
          target: "all",
          actions: [
            assign({
              todo: "",
              todos: (ctx, e) => {
                return ctx.todos.concat(ctx.todo);
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
