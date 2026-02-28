import { Button } from "@/components/ui/button"
import { NavLink } from "react-router-dom"

export const Login = () => {


    return (
        <main>
            <div className="mt-8 flex items-start m-auto w-[60%] box-border h-[70vh] shadow-lg">
                <div className="bg-[#2874f0] w-[40%] h-full px-6 py-10">
                    <div className="h-[40%]">
                        <h2 className="text-3xl text-white font-semibold">Login</h2>
                        <p className="text-xl mt-3 text-gray-200">Get access your account</p>
                    </div>
                    <div className="h-[60%]">
                        <img src="login.png" className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="bg-white w-[60%] h-full p-8 flex flex-col justify-between items-center">
                    <form className="w-full">
                        <div>
                            <label htmlFor="" className="text-[#898989] text-lg font-semibold mb-2">Enter Email / Mobile Number</label>
                            <input placeholder="please enter email or text" type="text" className="border-b border-gray-300 w-full outline-none py-1" />
                        </div>
                        <div className="mt-4">
                            <p className="mt-10 text-sm font-medium text-[#898989]">By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</p>
                            <Button className="rounded-sm font-semibold w-full text-white mt-3 p-6">Request For OTP</Button>
                        </div>
                    </form>
                    <div>
                        <NavLink to="/register" className="text-blue-600 font-semibold">New to Flipkart? Create an account</NavLink>
                    </div>                    
                </div>
            </div>
        </main>
    )
}