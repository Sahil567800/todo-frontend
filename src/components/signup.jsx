import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import loginContext from "./context"

export const SignUp = () => {

    const navigate = useNavigate()
    const { toast } = useContext(loginContext)
    const [inputs, setInputs] = useState({ email: "", password: "", username: "" });
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
    const handleSignUp = async () => {

        const email = inputs.email.trim().toLowerCase();
        const password = inputs.password.trim();
        const username = inputs.username.trim();

        // Validation
        if (!username || !email || !password) {
            toast.warning("All fields are required");
            return;
        }

        if (username.length < 5) {
            toast.warning("Username must be at least 5 characters");
            return;
        }


        if (password.length < 8) {
            toast.warning("Password must be at least 8 characters");
            return;
        }
        try {
            setLoading(true);
            const req = await fetch("https://todo-backend.onrender.com/api/v1/signUp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, username })
            })
            const res = await req.json()
            if (!req.ok) {
                toast.error(res.message || "Sign up failed");
                return;
            }
            setInputs({ email: "", password: "", username: "" })
            toast.success(res.message)
            navigate('/login')

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong. Please try again.");
        }
        finally { setLoading(false) }
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
                                    <button className="btn bg-red text-white my-3 px-3 py-2" disabled={loading} onClick={handleSignUp}>Sign Up</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </>
    )
}