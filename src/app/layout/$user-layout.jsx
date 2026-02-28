import { UserNavbar } from "@/app/navbar/user-navbar"
import { Outlet } from "react-router-dom"

export const UserLayout = () => {

    return (
        <main>
            <UserNavbar/>
            <Outlet/>
        </main>
    )
}