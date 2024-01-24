import { Link } from "react-router-dom";
import React, { useState } from "react";
import { signInUser } from "../../../apis/auth/login";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignInUser = () => {
        console.log(email, password);
        signInUser(email, password);
        // window.location.href = '/v1/auth/forgot-password'
    }

    const handleEmailInput = (e) => {
        setEmail(e);
        
    }
    
    const handlePasswordInput = (e) => {
        setPassword(e)
    }
    return (
        <div className="w-screen flex">

            {/* Hero Container */}
            <div className="hidden md:block w-5/12 h-screen bg-primary-color">

            </div>

            {/* Login Form Container */}
            <div className="w-full flex justify-center mt-[155px]">
                <div>
                    <h6>Login</h6>
                    <div className="mt-8">
                        <label>Email</label>
                        <input type="email" id="email" name="email" className="mt-1"  onChange={(e)=>handleEmailInput(e.target.value)}/>
                    </div>

                    <div className="mt-7">
                        <label>Password</label>
                        <input type="password" id="password" name="password" className="mt-1" onChange={(e)=>handlePasswordInput(e.target.value)} />
                    </div>

                    <div className="flex justify-between mt-5 mb-5">
                        <div>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="border-2 border-[#DDDDDD]"/> Remember Me
                            </label>
                        </div>

                        <div>
                            <Link to={'/v1/auth/forgot-password'}>Forgot Password</Link>
                        </div>
                    </div>

                    <div>
                        <button className={``} onClick={handleSignInUser}>Sign In</button>
                    </div>
                </div>
            </div>

        </div>
    )
}
