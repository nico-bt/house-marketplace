import React, {useState} from 'react'
import {Link} from "react-router-dom"
import {ReactComponent as ArrowRightIcon} from "../assets/svg/keyboardArrowRightIcon.svg"
import visibilityIcon from "../assets/svg/visibilityIcon.svg"

function SignUp() {
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
    console.log(formData)
  }

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome back</p>
        </header>

        <form>
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
              Sign In
            </p>
            <button className='signUpButton'>
              <ArrowRightIcon fill="white" width="34px" height="34px" />
            </button>
          </div>
        </form>

        {/* To do: Google Auth */}

        <Link to="/sign-in" className='registerLink'>
          Sign In Instead
        </Link>
      </div> 
    </>
  )
}

export default SignUp