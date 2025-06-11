import { Footer } from './components/footer'
import './App.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Header from './components/Header'
import Todo from './components/todo'
import { SignUp } from './components/signup'
import { LogIn } from './components/login'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { Layout } from './components/layout'
import { useState } from 'react'
import  loginContext  from './components/context'
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/ReactToastify.css"
function App() {

const [login,setLogin] = useState(false)
  const [user, setUser] = useState({ email: "" });
   const [todos, setTodos] = useState([])
  return (
    <>
  <loginContext.Provider value ={{login,setLogin, user, setUser ,toast,todos,setTodos}}>
    <ToastContainer/>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />} >

        <Route index element={<Todo />}></Route>
        <Route path='/Login' element={<LogIn />}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
    </loginContext.Provider>
    </>
  )
}

export default App
