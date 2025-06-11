import { Outlet } from "react-router-dom"
import Header from "./Header"
import { Footer } from "./footer"
export const Layout = () => {
    return (
        <>
            <Header></Header>
            <Outlet />
            <Footer></Footer>
        </>
    )
} 