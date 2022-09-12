import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons'
import { UseAppContext } from "../context/AppContext";

export const DeletePopup = () => {
    const context = UseAppContext();

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 justify-center items-center backdrop-blur-md opacity-0 flex -z-10" ref={context.deletePopup}>
            <div className="bg-bg-primary opacity-0 max-w-md w-[90%] flex flex-col justify-center items-center px-4 py-12 rounded-lg gap-6 shadow-2xl relative scale-0 transition-all" ref={context.confirm}>
                <div className="absolute right-6 top-4 cursor-pointer hover:bg-slate-600/20 px-[10px] py-[4px] rounded-lg" onClick={() => context.closeHandler(context.deletePopup.current, context.confirm.current)}>
                    <FontAwesomeIcon icon={faXmark} size="lg" />
                </div>
                <FontAwesomeIcon icon={faTriangleExclamation} size="3x" />
                <p className="text-center">Are you sure want to delete this todo?</p>
                <div className="text-sm flex flex-wrap justify-center gap-3">
                    <button className="px-7 py-2 rounded-full bg-button-primary active:outline active:outline-1 hover:scale-105 transition-transform cursor-pointer duration-75" onClick={() => context.deleteTodo(context.deletePopup.current, context.confirm.current)}>Yes, i'm sure</button>
                    <button className="border px-4 py-2 border-border-primary rounded-full active:outline active:outline-1 hover:scale-105 transition-transform cursor-pointer duration-75" onClick={() => context.closeHandler(context.deletePopup.current, context.confirm.current)}>No, cancel</button>
                </div>
            </div>
        </div>
    )
}
