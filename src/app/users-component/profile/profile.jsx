import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { NavLink } from "react-router-dom"

export const Profile = () => {

    return (
        <div>
            <Card className={`bg-white w-72 border-none rounded-none`}>
                <CardHeader className="flex flex-row justify-between items-center border-b h-10">
                    <NavLink className="">New Coustomer?</NavLink>
                    <Button variant="secondary" className="text-blue-600 shadow-none" type="button">Sign Up</Button>
                </CardHeader>
                <CardContent className="p-0">
                    <ul className="flex flex-col items-start gap-2 w-full">
                        <li className="hover:bg-gray-50 w-full py-1 px-4">
                            <NavLink>Profile</NavLink>
                        </li>
                        <li className="hover:bg-gray-50 w-full py-1 px-4">
                            <NavLink>Order</NavLink>
                        </li>
                        <li className="hover:bg-gray-50 w-full py-1 px-4">
                            <NavLink>WishList</NavLink>
                        </li>
                        <li className="hover:bg-gray-50 w-full py-1 px-4">
                            <NavLink>Rewards</NavLink>
                        </li>
                        <li className="hover:bg-gray-50 w-full py-1 px-4">
                            <NavLink>Gifts Card</NavLink>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
}

