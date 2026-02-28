import { Profile } from "@/app/users-component/profile/profile";
import { ChevronDown, ShoppingCart, Users } from "lucide-react"
import { useState } from "react"
import { NavLink } from "react-router-dom"

export const UserNavbar = () => {
    const [showProfile, setShowProfile] = useState(false);

    return (
        <div className="w-full shadow-md shadow-gray-100 bg-[#2874f0] px-4 py-3">
            <nav className="flex items-center gap-4 justify-between">
                <div className="w-[20%] flex items-center gap-2 justify-between">
                    <NavLink>logo</NavLink>
                </div>
                <div className="w-[50%]">
                    <input className="w-full h-9 border border-gray-200 p-2 bg-white text-gray-600 outline-0 rounded"  placeholder="Search for products brands and more"/>
                </div>
                <div className="w-[30%] flex items-center gap-2 justify-between">
                    <NavLink className={`/login`} to={"/login"} onMouseEnter={() => setShowProfile(true)} onMouseLeave={() => setShowProfile(false)} >
                        <div className="flex items-center gap-2 hover:bg-[#2a55e5] py-2 px-4 rounded-lg hover:text-white font-semibold">
                            <span className="border rounded-full p-[2px]"><Users size={12} /></span>
                            <span>Login</span>
                            <span><ChevronDown size={14} /></span>
                        </div>
                        {
                            showProfile && (
                                <div className="absolute top-13">
                                    <Profile />
                                </div>
                            )
                        }
                    </NavLink>
                    <NavLink>
                        <div className="flex items-center gap-2">
                            <span className=""><ShoppingCart size={16} /></span>
                            <span>Cart</span>
                        </div>
                    </NavLink>
                    <NavLink>Beacome best seller</NavLink>
                </div>
            </nav>
        </div>
    )
}