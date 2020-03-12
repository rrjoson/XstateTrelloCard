import React from "react";
import { useMachine } from "@xstate/react";
import { todosMachine } from "./todosMachine";

const persistedTodosMachine = todosMachine.withContext({
  todos: [
    "Add colors",
    "Add background color",
    "Check the responsive layout on all devices"
  ]
});

export const TrelloCard = () => {
  const [state, send] = useMachine(persistedTodosMachine);

  const handleOpenInput = () => {
    send("NEWTODO.OPEN");
  };

  const handleInputChange = e => {
    send("NEWTODO.CHANGE", { value: e.target.value });
  };

  const handleSave = () => {
    send("NEWTODO.COMMIT");
  };

  return (
    <div class="bg-white h-screen w-screen flex items-center justify-center">
      <div class="rounded bg-grey-light flex-no-shrink w-64 p-2 mr-3">
        <div class="flex justify-between py-1">
          <h3 class="text-sm">New landing page</h3>
          <svg
            class="h-4 fill-current text-grey-dark cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" />
          </svg>
        </div>
        <div class="text-sm mt-2">
          {state.context.todos.map(e => {
            return (
              <div class="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
                {e}
              </div>
            );
          })}
          <p class="mt-3 text-grey-dark" onClick={handleOpenInput}>
            Add a card...
          </p>
          {state.matches("adding") && (
            <input
              onChange={handleInputChange}
              value={state.context.todo}
              onKeyPress={e => {
                if (e.key === "Enter") {
                  handleSave();
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
