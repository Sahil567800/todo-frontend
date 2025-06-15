import { useState , useContext} from "react"
import { useNavigate } from "react-router-dom";
import loginContext from "./context";

export const LogIn = () => {

    const [inputs, setInputs] = useState({ email: "", password: "" })
    const [loading, setLoading] = useState(false);
    const history = useNavigate()
    const loginState = useContext(loginContext)
    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }
    const handleLogin = async () => {
       
        // Basic validation
        if (!inputs.email || !inputs.password) {
            loginState.toast.warning("Email and Password are required");
            return;
        }


        // Password length check
        if (inputs.password.length < 8) {
            loginState.toast.warning("Password must be at least 8 characters");
            return;
        }
        try {
            setLoading(true)
            const req = await fetch("http://todo-backend.onrender.com/api/v1/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inputs)
            })
            const res = await req.json()
            if (!req.ok) {
                loginState.toast.warning(res.message || "Login failed");
                return;
            }

            loginState.toast(`Welcome ${res.userData.username}`);
            loginState.setLogin(true);
            loginState.setUser(res.userData);
            localStorage.setItem("user", JSON.stringify(res.userData));
            history("/");
        } catch (error) {
            console.log(error)
            loginState.toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }

    }
    return (
        <>
            <section id="Login" className="py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            <div className="Login bg-white py-1 ">
                                <h3 className="text-center my-3 text-red fw-bold">Log In</h3>
                                <div className="email my-2 text-center">
                                    <input type="email" className="py-1 px-4" placeholder="Email" name="email" onChange={handleChange} value={inputs.email} />
                                </div>
                                <div className="pass my-3 text-center">
                                    <input type="password" className="py-1 px-4" placeholder="Password" name="password" onChange={handleChange} value={inputs.password} />
                                </div>
                                <div className="text-center">
                                    <button className="btn bg-red text-white my-2 px-3 py-2" disabled={loading} onClick={handleLogin}>Login</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </>
    )
}