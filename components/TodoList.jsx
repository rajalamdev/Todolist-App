import { UseAppContext } from "../context/AppContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPen, faCircleCheck } from '@fortawesome/free-solid-svg-icons'

export const TodoList = () => {
    const context = UseAppContext();

    return (
        <section className="w-full text-left max-w-2xl mx-auto">
            <ul className="flex flex-col gap-4 px-6 max-w-full w-full mx-auto">
                {context.todos.map(todo => {
                    return (
                    <li key={todo.id} className="flex justify-between items-center p-6 rounded-xl shadow-md border border-border-primary">
                        <div className="text-lg font-semibold break-words w-1/2">
                            <h2>{todo.task}</h2>
                            <div className="flex text-sm font-normal items-center">
                                <p className="text-text-secondary">{todo.timestamp.split("T")[0]}</p>
                                <span className="h-6 w-[1px] rounded-full bg-text-secondary opacity-20 mx-2"></span>
                                <p className="text-text-secondary">{todo.timestamp.split("T")[1]}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <FontAwesomeIcon className="bg-primary text-red-600 border border-border-primary p-2 shadow-md rounded-full hover:outline hover:outline-1 transition-all duration-300 hover:rotate-12 active:scale-90 active:duration-150" icon={faTrashCan} size="lg" onClick={() => context.deleteHandler(todo.id, context.deletePopup.current, context.confirm.current)} />
                            <FontAwesomeIcon className="bg-primary text-text-primary border border-border-primary p-2 shadow-md rounded-full hover:outline hover:outline-1 transition-all duration-300 hover:-rotate-12 active:scale-90 active:duration-150" icon={faPen} size="lg" onClick={() => context.editHandler(todo)} />
                        </div>
                    </li>
                    )
                })}
            </ul>
        </section>
    )
}