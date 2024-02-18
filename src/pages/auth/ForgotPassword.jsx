import { useState } from "react";
import { Link } from "react-router-dom"

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isProgress, setIsProgress] = useState(false);
    const [message, setMessage] = useState({});

    const handleEmailInput = (e) => {
        setEmail(e);

    }

    const handleForgotPassword = async () => {
        setIsProgress(true);
        // const result =  await forgotPassword(email);
        
        // if (result.success) {
        //     setMessage(result);
        //     setIsProgress(false);
        // }
        // else {
        //     setMessage(result);
        //     setIsProgress(false);
        // }
    }

    return (
        <div className="w-screen flex">

            {/* Hero Container */}
            <div className="hidden md:block w-5/12 h-screen bg-primary-color">

            </div>

            {/* Forgot Passowrd Form Container */}
            <div className="w-full flex justify-center mt-[155px]">
                <div className="w-[400px]">
                    <div className="flex flex-col gap-y-4">
                        <h6>Forgot Password</h6>
                        <p>Enter your email address and we will send you instructions on how to create a new password.</p>
                    </div>
                    <div className="mt-3">
                        <span className={message.success ? "text-green-500" : "text-red-500"}>{message.message}</span>
                    </div>
                    <div className="flex flex-col gap-y-7">
                        <div className="mt-8">
                            <label>Email</label>
                            <input type="email" id="email" name="email" className="mt-1 w-[400px] border-2" onChange={(e) => handleEmailInput(e.target.value)} />
                        </div>

                        <div>
                        <button className={`${isProgress ? "loading" : ""} btn w-full font-sen tracking-tighter bg-blue-500 text-white`} onClick={handleForgotPassword}>{isProgress ? 'Sending you a email' : 'Forgot Password'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}