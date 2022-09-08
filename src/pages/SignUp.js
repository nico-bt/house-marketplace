import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import { toast } from 'react-toastify';

// Firebase
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config.js"

import {ReactComponent as ArrowRightIcon} from "../assets/svg/keyboardArrowRightIcon.svg"
import visibilityIcon from "../assets/svg/visibilityIcon.svg"
import OAuth from '../components/OAuth.js';

function SignUp() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
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

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      // Auth with Firebase
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)

      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: formData.name
      })
      
      // Add user to db CloudFireStore
      // 1) Create object without password and add timestamp
      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()
      
      // 2) Add document to Database in the "users" collection
      await setDoc(doc(db,"users", user.uid), formDataCopy)

      navigate("/profile")

    } catch (error) {
      toast.error(error.message)
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
            type="text" 
            className='nameInput' 
            placeholder='Name' 
            id="name" 
            value={formData.name} 
            onChange={onChange} 
            />

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

          <Link to="forgot-password" className='forgotPasswordLink'>Forgot password</Link>

          <div className='signUpBar'>
            <p className='signUpText'>
              Sign Up
            </p>
            <button className='signUpButton'>
              <ArrowRightIcon fill="white" width="34px" height="34px" />
            </button>
          </div>
        </form>

        <OAuth />

        <Link to="/sign-in" className='registerLink'>
          Sign In Instead
        </Link>
      </div> 
    </>
  )
}

export default SignUp