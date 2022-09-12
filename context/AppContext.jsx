import { useEffect, useRef } from "react";
import { createContext, useState } from "react";
import { useContext } from "react";

const AppContext = createContext();

const UseAppContext = () => useContext(AppContext);

const AppProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');
    const [times, setTimes] = useState('');
    const [edit, setEdit] = useState({});
    const [message, setMessage] = useState('');
    const [theme, setTheme] = useState([
        {color: '#FFEB3C'}, {color: '#FFFFFF'}, {color: '#3AB0FF'}, {color: '#72FFFF'}, 
        {color: '#00FFAB'}, {color: '#F07DEA'}, {color: '#764AF1'},
    ]);

    const [active, setActive] = useState(theme[0].color);
    const [storageTheme, setStorageTheme] = useState(null);
    const [storageTodos, setStorageTodos] = useState(null);
    const [deleteTarget, setDeteleTarget] = useState(null);

    const deletePopup = useRef(null);
    const confirm = useRef(null);
    const themeBtn = useRef(null);

    // storage
    
    function loadDataFromStorage(){
        let localStorageTodos = localStorage.getItem("todos");
        let localStorageTheme = localStorage.getItem("theme");
        
        if(localStorageTodos === null && localStorageTheme === null){
            setStorageTheme(theme[0].color);
            setStorageTodos(JSON.stringify(todos));  
            return;
        } 
        
        if(localStorageTheme === null){
            setStorageTheme(theme[0].color);
        }
        
        if(localStorageTodos !== null){
            setStorageTodos(localStorageTodos);
            let data = JSON.parse(localStorageTodos);
            setTodos(data);
        }

        if(localStorageTheme !== null){
            setStorageTheme(localStorageTheme);
            const root = document.querySelector(":root");
            root.style.setProperty('--text-primary', `${storageTheme}`);
        }
    }

    function storageExist(){
        if(typeof (Storage) === undefined){
            alert("Browser anda tidak mendukung localstorage");
            return false;
        }

        return true;
    }

    useEffect(() => {
        if(storageExist()){
            loadDataFromStorage();
        }
    }, [storageTodos, storageTheme])
    
    useEffect(() => {
        if(task.length >= 30){
            setTask(task.slice(0, 30));
        }

        if(task.length > 0 && times.length > 0){
            setMessage('');
        }

        if(task.length > 0) {
            document.querySelector("#task").classList.remove("error");
        } 

        if(times.length > 0){
            document.querySelector("#timestamp").classList.add("text-white");
            document.querySelector("#timestamp").classList.remove("text-text-secondary");
            document.querySelector("#timestamp").classList.remove("error");
        } else {
            document.querySelector("#timestamp").classList.add("text-text-secondary");
            document.querySelector("#timestamp").classList.remove("text-white");
        }
    }, [task, times, theme, active])

    const generateId = () => + new Date();

    const saveTodos = (inputTask, inputTimestamp, inputTaskComponent, inputTimestampComponent) => {
        if(task.length == 0 && times.length == 0){
            inputTaskComponent.classList.add("error", "animate-shake");
            inputTimestampComponent.classList.add("error", "animate-shake");
            setTimeout(() => {      
                inputTaskComponent.classList.remove("animate-shake");
                inputTimestampComponent.classList.remove("animate-shake");
            }, 300)
            return setMessage("Please fill the input!");
        }

        if(task.length == 0){
            setTask(inputTask);
            inputTaskComponent.classList.add("error", "animate-shake");
            setTimeout(() => {      
                inputTaskComponent.classList.remove("animate-shake");
            }, 300)
            return setMessage("Please fill the input!");
        }
        
        if(times.length == 0){
            setTimes(inputTimestamp);
            inputTimestampComponent.classList.add("error", "animate-shake");
            setTimeout(() => {      
                inputTimestampComponent.classList.remove("animate-shake");
            }, 300)
            return setMessage("Please fill the input!");
        }

        if(edit.id){
            const editedTodos = {
                ...edit,
                task: inputTask,
                timestamp: inputTimestamp
            }

            const findTodosIndex = todos.findIndex(todo => {
                return todo.id === edit.id;
            })

            const updatedTodos = [...todos];
            updatedTodos[findTodosIndex] = editedTodos;

            setTask("");
            setTimes("");
            setTodos(updatedTodos);
            const stringified = JSON.stringify(updatedTodos)
            localStorage.setItem("todos", stringified);
            return setEdit({});
        }

        setTodos([...todos, {
            id: generateId(),
            task: inputTask,
            timestamp: inputTimestamp,
            isDone: false,
        }]);

        const stringified = JSON.stringify([...todos, {
            id: generateId(),
            task: inputTask,
            timestamp: inputTimestamp,
            isDone: false,
        }]);

        localStorage.setItem("todos", stringified);
        setStorageTodos(stringified);

        setTask("");
        setTimes("");
    };

    const deleteHandler = (todoTarget, deletePopup, confirm) => {
        confirm.classList.remove("scale-0", "opacity-0");
        confirm.classList.add("scale-100", "opacity-100");
        deletePopup.classList.remove("opacity-0", "-z-10");
        deletePopup.classList.add("opacity-100", "z-[9999]");
        setDeteleTarget(todoTarget);
    }

    const deleteTodo = (deletePopup, confirm) => {
        const filteredTodos = todos.filter(todo => {
            return todo.id !== deleteTarget;
        })

        setTodos(filteredTodos);
        const stringified = JSON.stringify(filteredTodos);
        localStorage.setItem("todos", stringified);
        setEdit({});

        confirm.classList.remove("scale-100", "opacity-100");
        confirm.classList.add("scale-0", "opacity-0");
        deletePopup.classList.remove("opacity-100", "z-[9999]");
        deletePopup.classList.add("opacity-0", "-z-10");
    }

    const closeHandler = (deletePopup, confirm) => {
        confirm.classList.remove("scale-100", "opacity-100");
        confirm.classList.add("scale-0", "opacity-0");
        deletePopup.classList.remove("opacity-100", "z-[9999]");
        deletePopup.classList.add("opacity-0", "-z-10");
    }

    const editHandler = (todoTarget) => {
        setEdit(todoTarget);
        setTask(todoTarget.task);
        setTimes(todoTarget.timestamp);
    }

    const cancelHandler = () => {
        setEdit({});
        setTask('');
        setTimes('');
    }

    const themePopup = () => {
        const theme = document.querySelector("#theme");
        theme.classList.toggle("hidden");

        const themePath = themeBtn.current.querySelector("path");
        window.addEventListener("click", (e) => {
            if(e.target === themePath) return theme.classList.toggle("hidden");
        })
    }

    const themeHandler = (target) => {
        const root = document.querySelector(":root");
        root.style.setProperty('--text-primary', `${target.color}`);
        localStorage.setItem("theme", target.color);
        setStorageTheme(target.color)
    }

    const contextValue = {
        todos,
        saveTodos,
        times,
        setTimes,
        deleteHandler,
        editHandler,
        task,
        setTask,
        edit,
        cancelHandler,
        message,
        setMessage,
        closeHandler,
        themePopup,
        themeHandler,
        theme,
        setTheme,
        active,
        setActive,
        storageTheme,
        deletePopup,
        confirm,
        deleteTodo,
        themeBtn,
    }

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}

export { UseAppContext, AppProvider }