import { useState } from "react"
import {useNavigate} from "react-router-dom"
import { useContext } from "react"
import loginContext from "./context"
export const SignUp = () => {
    const navigate = useNavigate()
    const {toast} = useContext(loginContext)
    const [inputs, setInputs] = useState({ email: "", password: "", username: "" });
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
    const handleSubmit = async () => {
        if(inputs.username.trim()==="" || inputs.password.trim()===""||inputs.email.trim()===""){
            return
        }
        try {
             setLoading(true);
            const req = await fetch("http://localhost:3000/api/v1/signUp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputs)
        })
        const res = await req.json()
        if(res.message==="User Already exists"){
            toast.error(res.message)
        }
        else{
            setInputs({ email: "", password: "", username: "" })
            toast.success(res.message)
            navigate('/login')
        }
        } catch (error) {
            console.log(error)
        }
        finally{setLoading(false)}
    }
    return (
        <>
            <section id="signup" className="py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            <div className="signup bg-white py-1">
                                <h3 className="text-center  text-red fw-bold my-3">Sign Up</h3>
                                <div className="name my-3 text-center ">
                                    <input type="text" placeholder="Full Name" name="username" onChange={handleChange} value={inputs.username} className="py-1 px-4" />
                                </div>
                                <div className="email my-3 text-center">
                                    <input type="email" className="py-1  px-4" placeholder="Email" name="email" onChange={handleChange} value={inputs.email} />
                                </div>
                                <div className="pass my-3 text-center">
                                    <input type="password" className="py-1  px-4" placeholder="Password" name="password" onChange={handleChange} value={inputs.password} />
                                </div>
                                <div className="text-center">
                                    <button className="btn bg-red text-white my-3 px-3 py-2 " disabled={loading} onClick={handleSubmit}>Sign Up</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </>
    )
}