import { useState, useEffect } from 'react'
import { FaPlus,} from "react-icons/fa6";
import { FaEdit, FaTimes } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useContext } from "react";
import loginContext from "./context";

const Todo = () => {

    const [input, setInput] = useState("")
    const [editId, setEditId] = useState(null);
    const { login, user, toast,setUser,setLogin,todos,setTodos } = useContext(loginContext)

    useEffect(() => {
        const fetchTodos = async () => {
           if (!login || !user || !user._id) return;
            try {
                const req = await fetch("http://localhost:3000/api/v2/getTodos", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ user: user._id })
                });
                const data = await req.json();
                setTodos(data.todos);
            } catch (error) {
                console.error("Failed to fetch todos:", error);
            }
        };
        fetchTodos();
    }, [login, user]);

    useEffect(()=>{
        const savedUser = localStorage.getItem('user');
        if(savedUser){
            setUser(JSON.parse(savedUser));
            setLogin(true)
        }
    },[])

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const handleAdd = async () => {
        if (input.trim() === "") {
            return;
        }
        if (!login) {
            toast.warning("Please Login First")
            return
        }
        try {
            let req = await fetch("http://localhost:3000/api/v2/addTodo",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ todos: input, email: user.email })

                })
            let data = await req.json()
            setTodos([...todos, data.newTodo])
            setInput("")
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {
        try {
            const req = await fetch(`http://localhost:3000/api/v2/deleteTodo/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: user.email })
            })
            const data = await req.json()
            setTodos(todos.filter((todo) => todo._id !== id))
            toast.success(data.message)
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong");
        }
    }
    const handleEdit = (todo) => {
        setInput(todo.todos); // set input value
        setEditId(todo._id);   // remember the ID for update
    };
    const handleUpdate = async () => {
        if (!editId) {
            return;
        }
        try {
            const req = await fetch(`http://localhost:3000/api/v2/updateTodo/${editId}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ todos: input, email: user.email })
                })
            const data = await req.json()
            toast.success(data.message)
            setTodos(todos.map(todo =>
                todo._id === editId ? data.updateTodo : todo
            ))
            setInput("");
            setEditId(null);
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong");
        }
    }
    return (
        <>
            <section id="main-sec" className='py-5'>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="todo text-center bg-white py-1">
                            <h3 className="text-red my-3 fw-bold"> TO-DO LIST</h3>
                            <div className="input-bar d-flex justify-content-center">
                                <input type="text" value={input} onChange={handleChange} className="py-1 px-4 my-2"  placeholder="Enter a todo..." />
                                <button onClick={editId ? handleUpdate : handleAdd} className="btn bg-red add text-white fw-bold hover px-4">{editId ? <FaEdit /> : <FaPlus />}</button>

                            </div>
                            <ul>
                                {todos && todos.map((item) => {
                                    return <div style={{ color: editId === item._id ? "#ff6666" : "black" }} className='d-flex my-3 justify-content-center ' key={item._id} ><li className='align-self-center'>{item.todos}</li>
                                        <button className={`btn bg-red text-white mx-2 `} onClick={() => {
                                            if (editId === item._id) {
                                                setEditId(null); // Cancel edit
                                                setInput("");    // Optional: clear input
                                            } else {
                                                handleEdit(item); // Start editing
                                            }
                                        }}>{editId === item._id ? <FaTimes /> : <FaEdit />}</button>

                                        <button className='btn bg-red text-white mx-2' onClick={() => handleDelete(item._id)}><MdDelete /></button></div>
                                })}
                            </ul>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Todo;