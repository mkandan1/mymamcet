import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Auth } from "../../apis/auth/Auth";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../redux/actions/authActions";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isProgress, setIsProgress] = useState(false);
    const [message, setMessage] = useState({});
    const dispatch = useDispatch();

    const handleSignInUser = async () => {
        try {
            setIsProgress(true);
            if (email == '' || password == '') {
                setIsProgress(false)
                return setMessage({ success: false, message: "Please enter valid email or password" });
            }
            const result = await Auth.signInWithEmailAndPassword({ email, password });

            if (result.success) {
                setMessage(result);
                console.log(result.message);
                setTimeout(() => {
                        dispatch(setLoggedIn({user: result.user}))
                }, 1000);
            } else {
                setMessage(result);
            }
            setIsProgress(false);
        } catch (error) {
            console.error(error);
            setIsProgress(false);
            setMessage({ success: false, message: 'Error signing in. Please try again.' });
        }
    };


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
                    <div className="mt-3">
                        <span className={message.success ? "text-green-500" : "text-red-500"}>{message.message}</span>
                    </div>
                    <div className="mt-3">
                        <label>Email</label>
                        <input type="email" id="email" name="email" className="mt-1 w-[400px] border-2" onChange={(e) => handleEmailInput(e.target.value)} />
                    </div>

                    <div className="mt-7">
                        <label>Password</label>
                        <input type="password" id="password" name="password" className="mt-1 w-[400px] border-2" onChange={(e) => handlePasswordInput(e.target.value)} />
                    </div>

                    <div className="flex justify-between mt-5 mb-5">
                        <div>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="border-2 border-[#DDDDDD]" /> Remember Me
                            </label>
                        </div>

                        <div>
                            <Link to={'/v1/auth/forgot-password'} className="text-blue-600 tracking-tighter">Forgot Password</Link>
                        </div>
                    </div>

                    <div>
                        <button className={`${isProgress ? "loading" : ""} w-full font-sen tracking-tighter bg-blue-500 text-white`} onClick={handleSignInUser}>{isProgress ? 'Singing in you...' : 'Sign In'}</button>
                    </div>
                </div>
            </div>

        </div>
    )
}
