import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import { toast } from 'react-toastify';

// Firebase
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import {ReactComponent as ArrowRightIcon} from "../assets/svg/keyboardArrowRightIcon.svg"
import visibilityIcon from "../assets/svg/visibilityIcon.svg"

function SignIn() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const onChange = (e)=>{
    setFormData((prevState) =>{
      return {
        ...prevState, 
        [e.target.id]: e.target.value
      }}
    )
  }

  const onSubmit = async (e) =>{
    e.preventDefault()
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password)
      if(userCredential.user){
        navigate("/profile")
      }
    } catch (error) {
      toast.error("Wrong Credentials")
    }
  }

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome back</p>
        </header>

        <form onSubmit={onSubmit}>
          <input 
            type="email" 
            className='emailInput' 
            placeholder='Email' 
            id="email" 
            value={formData.email} 
            onChange={onChange} 
            />

          <div className='passwordInputDiv'>
            <input 
              type={showPassword? "text" : "password"}
              className="passwordInput"
              id="password"
              placeholder='Password'
              value={formData.password}
              onChange={onChange} 
            />
            <img 
              src={visibilityIcon} 
              alt="show password" 
              className='showPassword'
              onClick={()=>{setShowPassword((prevState)=> !prevState)}}
            />
          </div>

          <Link to="/forgot-password" className='forgotPasswordLink'>Forgot password</Link>

          <div className='signInBar'>
            <p className='signInText'>
              Sign In
            </p>
            <button className='signInButton'>
              <ArrowRightIcon fill="white" width="34px" height="34px" />
            </button>
          </div>
        </form>

        {/* To do: Google Auth */}

        <Link to="/sign-up" className='registerLink'>
          Sign Up Instead
        </Link>
      </div> 
    </>
  )
}

export default SignIn