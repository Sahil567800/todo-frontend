import { Link } from "react-router-dom"
import { useContext } from "react";
import loginContext from "./context";
import { FaCircleUser, FaBars } from "react-icons/fa6"

const Header = () => {

    const { login, setLogin, user, setUser, toast, setTodos } = useContext(loginContext)

    const handleLogout = () => {
        setLogin(false)
        setUser("")
        localStorage.removeItem("user");
        setTodos([]);
        toast.success("Logged Out Successfully")
    }
    return (
        <>
            <header className="py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-3">
                            <div className="logo">
                                <Link to="/" className="text-white text-decoration-none ">
                                    <h3 className="fw-bold text-red"> TODOOSH</h3>
                                </Link>
                            </div>
                        </div>
                        <div className="col-9">
                            <ul className="nav justify-content-end d-none d-sm-none d-md-flex d-lg-flex">
                                <Link to="/Signup">
                                    <button className="btn bg-white text-red fw-bold mx-2 border-red">Sign Up</button>
                                </Link>
                                {login ? <button className="btn bg-red text-white fw-bold mx-2" onClick={handleLogout}>Log Out</button> : <Link to="/Login">
                                    <button className="btn bg-red text-white fw-bold mx-2">Log in</button>
                                </Link>}

                                {login && user ? (
                                    <li className="text-red fw-bold"> <FaCircleUser className="mx-2 my-1  font-large" />Welcome , {user.username.toUpperCase()}</li>
                                ) : (
                                    <li className="text-red fw-bold"><FaCircleUser className="mx-2 my-1 font-large" />Please log in</li>
                                )}
                            </ul>
                            <ul className="mob-nav d-flex justify-content-end d-block d-sm-block d-md-none d-lg-none">
                                <button className="btn bg-red text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                                    <FaBars />
                                </button>

                                <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                                    <div className="offcanvas-header border-down">
                                        {login && user ? (
                                            <li className="text-red fw-bold "> <FaCircleUser className="mx-2 my-1  font-large" />Welcome , {user.username.toUpperCase()}</li>
                                        ) : (
                                            <li className="text-red fw-bold"><FaCircleUser className="mx-2 my-1 font-large" />Please log in</li>
                                        )}
                                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>
                                    <div className="offcanvas-body ">
                                        <div className="d-flex">
                                            <Link to="/Signup">
                                                <button className="btn bg-white text-red fw-bold mx-2 border-red" data-bs-dismiss="offcanvas" aria-label="Close">Sign Up</button>
                                            </Link>
                                            {login ? <button onClick={handleLogout} className="btn bg-red text-white fw-bold mx-2" data-bs-dismiss="offcanvas" aria-label="Close">Log Out</button> : <Link to="/Login">
                                                <button className="btn bg-red text-white fw-bold mx-2" data-bs-dismiss="offcanvas" aria-label="Close">Log in</button>
                                            </Link>}
                                        </div>

                                    </div>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header