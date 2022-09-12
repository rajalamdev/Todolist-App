import { useRef } from "react";
import { UseAppContext } from "../context/AppContext";
import { TodoList } from "./TodoList";

export const Form = () => {
  const context = UseAppContext();

  const inputTask = useRef(null);
  const inputTimestamp = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
    context.saveTodos(context.task, context.times, inputTask.current, inputTimestamp.current);
  };

  return (
    <div className="w-full mx-auto pb-12 pt-40 overflow-hidden text-center">
      <h1 className="text-xl font-semibold text-center mb-4">
        Add Your Todos!
      </h1>
      {context.message && <p className="text-red-600 text-sm">{context.message}</p>}
      <form onSubmit={submitHandler} className="flex flex-col mb-4 mx-auto gap-4 px-8 text-secondary max-w-xl">
        <input
          className="border border-text-primary bg-transparent text-white outline-none px-4 py-2 rounded-full focus:ring-1 focus:ring-text-primary placeholder:text-text-secondary brightness-75 focus:brightness-100 max-w-full w-[90%] focus:w-full transition-transform-width mx-auto duration-300"
          placeholder="add your todo..."
          id="task"
          type="text"
          value={context.task}
          autoComplete="off"
          ref={inputTask}
          onChange={(e) => {
            context.setTask(e.target.value);
          }}
        />
        <input
          className="border bg-transparent text-text-secondary border-text-primary outline-none px-4 py-2 rounded-full focus:ring-1 focus:ring-text-primary brightness-75 focus:brightness-100 max-w-full w-[90%] focus:w-full transition-transform-width mx-auto duration-300"
          type="datetime-local"
          id="timestamp"
          value={context.times}
          ref={inputTimestamp}
          onChange={(e) => {
            context.setTimes(e.target.value);
          }}
        />
        <div className="mx-auto">
          <input
            className="px-7 py-2 ml-2 rounded-full bg-button-primary text-primary active:outline active:outline-1 active:outline-text-primary hover:scale-105 transition-transform cursor-pointer duration-75"
            type="submit"
            value={context.edit.id ? "Save" : "Add"}
          />
          {context.edit.id && (
            <input
              className="border-text-primary px-4 py-2 ml-2 rounded-full bg-button-primary outline-1 active:outline active:outline-1 active:outline-text-primary hover:scale-105 transition-transform cursor-pointer duration-75"
              type="button"
              value="Cancel"
              onClick={context.cancelHandler}
            />
          )}
        </div>
      </form>
      <TodoList />
    </div>
  );
};
