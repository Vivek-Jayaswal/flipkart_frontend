import { Button } from "@/components/ui/button"
import { NavLink, useNavigate } from "react-router-dom"

export const Signup = () => {
    const navigate = useNavigate();


    const handleBackToLogin = () => {
        navigate("/login")
    }

    return (
        <main>
            <div className="mt-8 flex items-start m-auto w-[60%] box-border h-[70vh] shadow-lg">
                <div className="bg-[#2874f0] w-[40%] h-full px-6 py-10">
                    <div className="h-[40%]">
                        <h2 className="text-3xl text-white font-semibold">Looks like you're new here!</h2>
                        <p className="text-xl mt-3 text-gray-200">Sign up with your mobile number to get started</p>
                    </div>
                    <div className="h-[60%]">
                        <img src="login.png" className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="bg-white w-[60%] h-full p-8">
                    <form className="w-full">
                        <div>
                            <label htmlFor="" className="text-[#898989] text-lg font-semibold mb-2">Enter Email / Mobile Number</label>
                            <input placeholder="please enter email or text" type="text" className="border-b border-gray-300 w-full outline-none py-1" />
                        </div>
                        <div className="mt-4">
                            <p className="mt-10 text-sm font-medium text-[#898989]">By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</p>
                            <Button className="rounded-sm font-semibold w-full text-white mt-3 p-6">Request For OTP</Button>
                            <Button type="button" onClick={handleBackToLogin} className="rounded-sm font-semibold w-full mt-3 p-6 text-blue-600 shadow-[0_0_5px_rgba(0,0,0,0.15)]" variant="destructive">
                                Existing User? Log in
                            </Button>
                        </div>
                    </form>                  
                </div>
            </div>
        </main>
    )
}