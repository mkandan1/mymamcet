import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Google from '../assets/uploads/search.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { app, auth } from '../FirebaseConfig';
import { useLayoutEffect } from 'react';

export const LoginPage = () => {
  // Error indicators value
  const [hasError, setHasError] = useState({
    email: false,
    password: false,
    invalid_mail_or_password: false
  });
  const [hasEntryStarted, setHasEntryStarted] = useState({
    email: false,
    password: false
  })

  // Input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    console.log('Validating auth user');
    onAuthStateChanged(auth, user => {
      if (user) {
        console.log('Redirecting to home page');
        return window.location.href = '/';
      }
    })
  }, [])

  // Handle user email input
  const handleEmailChange = (e) => {
    setHasEntryStarted((prev) => ({
      ...prev,
      email: true
    }))
    const emailValue = e.target.value;
    setEmail(emailValue);
    // Implement email validation logic here, e.g., check for a valid email format
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
    setHasError((prevState) => ({
      ...prevState,
      email: !isValidEmail
    }));
  };

  // Handle user password input
  const handlePasswordChange = (e) => {
    setHasEntryStarted((prev) => ({
      ...prev,
      password: true
    }))
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    // Implement password validation logic here
    // For example, check if the password meets certain criteria
    const isValidPassword = passwordValue.length >= 8;
    setHasError((prevState) => ({
      ...prevState,
      password: !isValidPassword
    }));
  };

  // Handle the form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Check if email and password are valid
    if (!hasError.email && !hasError.password && email != '' && password != '') {
      // Perform login or other actions here
      signInWithEmailAndPassword(auth, email, password)
        .then((userCrendential) => {
          console.log("Authentication successful");
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error occurred while authenticating!");
          if (err.message === 'auth/invalid-login-credentials') {
            setHasError((prev) => ({
              ...prev,
              invalid_mail_or_password: true
            }))
            setIsLoading(false);
          }
        })
    } else {
      console.log('Email or password is invalid.');
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className='w-full min-h-screen p-2 md:p-0 bg-[#DDE6EB]'>

        <div className='flex justify-between pt-10 p-2 sm:p-5 mb-10'>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-md sm:text-lg font-inter text-[#858C91]'>my<span className='font-bold'>MAMCET</span></h3>
            </div>
          </div>

          <div className='flex justify-between'>
            <p className='font-inter text-xs sm:text-sm text-gray-500 font-normal tracking-tight'>Don't have an account? <Link to={`/v1/auth/signup`} className='text-blue-400'>Signup</Link></p>
          </div>
        </div>

        <div className='w-full h-full flex justify-center items-center'>
          <div className='w-full h-120 sm:w-120 sm:h-120 bg-slate-50 shadow-md rounded-md pt-10 p-5 sm:p-20'>
            <div className='text-center grid grid-cols-1 grid-rows-2 gap-2 sm:gap-3'>
              <h3 className='font-bold tracking-tighter text-md sm:text-xl font-manrope text-slate-900'>Login</h3>
              <p className='font-inter text-sm sm:text-md text-gray-400 tracking-tight'>Please enter the below details to proceed login</p>
            </div>
            {/* Display error */}
            <div className={`w-full h-10 bg-red-300 border-red-500 mt-5 transition-all duration-150 ${hasError.invalid_mail_or_password ? '' : 'hidden'}`}>

            </div>

            {/* Email */}
            <div className='grid grid-cols-1 mt-10'>
              <label className='font-manrope tracking-tight text-sm sm:text-md font-medium text-[#4A4A4A]'>Email</label>
              <div className='relative w-full h-full'>
                <input
                  type='email'
                  spellCheck={false}
                  placeholder='example@domain.com'
                  value={email}
                  onChange={handleEmailChange}
                  className={`${hasEntryStarted.email ? (hasError.email ? 'border-red-600' : 'border-green-600') : 'border-gray-300'
                    } w-full h-10 sm:h-12 pl-5 mt-2 font-inter bg-[#EDEDED] rounded-md border outline-none`}
                ></input>
                <div
                  className={`${hasEntryStarted.email ? (hasError.email ? 'bg-red-600' : 'bg-green-600') : 'border-gray-300'
                    } w-10 absolute top-2 right-0 h-10 sm:h-12 flex items-center justify-center rounded-r-md`}
                >
                  <FontAwesomeIcon className={hasEntryStarted.email ? 'text-white' : 'text-gray-400'} icon={hasEntryStarted.email ? (hasError.email ? faCircleXmark : faCircleCheck) : faEnvelope} />
                </div>

              </div>
            </div>

            {/* Password */}
            <div className='grid grid-cols-1 mt-6'>
              <label className='font-manrope tracking-tight text-sm sm:text-md font-medium text-[#4A4A4A]'>Password</label>
              <div className='relative w-full h-full'>
                <input
                  type='password'
                  placeholder='8 character password'
                  value={password}
                  onChange={handlePasswordChange}
                  className={`${hasEntryStarted.password ? (hasError.password ? 'border-red-600' : 'border-green-600') : 'border-gray-300'
                    } w-full h-10 sm:h-12 pl-5 mt-2 font-inter bg-[#EDEDED] rounded-md border outline-none`}
                ></input>
                <div
                  className={`${hasEntryStarted.password ? (hasError.password ? 'bg-red-600' : 'bg-green-600') : 'border-gray-300'
                    } w-10  absolute top-2 right-0 h-10 sm:h-12 flex items-center justify-center rounded-r-md`}
                >
                  <FontAwesomeIcon className={hasEntryStarted.password ? 'text-white' : 'text-gray-400'} icon={hasEntryStarted.password ? (hasError.password ? faCircleXmark : faCircleCheck) : faLock} />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className='w-full h-10 sm:h-12 mt-10'>
              <button
                onClick={handleFormSubmit}
                className='w-full h-full bg-[#048BD7] text-white tracking-tighter font-inter text-sm sm:text-md rounded-md'
              >
                {isLoading ? <span>Please wait</span> : <span>Log In</span>}
              </button>
            </div>

            {/* Or */}
            <div className='mt-10 flex items-center'>
              <div className='w-full h-[1.5px] bg-slate-200'></div>
              <div className='ml-4 mr-4'>
                <h4 className='uppercase text-xs sm:text-sm font-medium text-slate-300'>Or</h4>
              </div>
              <div className='w-full h-[1.5px] bg-slate-200'></div>
            </div>

            {/* Continue with Google */}
            <div className='w-full h-12 mt-5'>
              <button className='w-full h-full  border rounded-full tracking-tight sm:tracking-tighter font-inter text-xs sm:text-sm bg-white relative'><img src={Google} alt='google' className='w-5 absolute left-12'></img>Signin with Google</button>
            </div>

            {/* Agreement */}
            <p className='text-gray-400 text-xs sm:text-sm text-center mt-5 font-red-hat'>By logging into myMAMCET you’re agree to our <Link to={`/user/terms`} className='text-blue-500'>Terms & Condition</Link> and <Link to={`/user/privacy`} className='text-blue-500'>Privacy Policy</Link></p>

          </div>
        </div>

      </div>


    </div >
  )
}
