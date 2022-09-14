import React, { useState,useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../store/signUpSlice';
import "./SignUp.css";

function SignUp() {
  const Dispatch = useDispatch()
  const Navigate = useNavigate()
  const { loading, isSucces, error } = useSelector(state => state.register)

  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorList, setErrorList] = useState([]);

  //list error
  useEffect(()=>{
   if(error ){
    console.log(error)
    setErrorList(
      Object.keys(error).map((key)=>{
        return `${key} ${error[key]}`
      })
    )
   }
  },[error])

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
  }
  const handleUserName = (e) => {
    setUserName(e.target.value);
  }

  const onRegisterHandler = (e) => {
    e.preventDefault();
    setErrorList([]);
    Dispatch(register({user:{username,email,password}}))
  }

  return (
    <>
      <div className="container">
        <div className="flex-row justify-center">
          <div className="sign col-6">
            <h1>Sign Up</h1>
            <Link to="/signin">Have you an account?</Link>
            {errorList.length > 0  && errorList.map((item,index)=>(<div  key={index} style={{color:"red", marginBottom:" 10px"}}>{errorList[index]}</div>))}
            {isSucces && <div style={{color:"#5cb85c", marginBottom:" 10px"}}>user successfully created</div> }
            <form action="">
              <input value={username} onChange={handleUserName} placeholder='Username' type="text" />
              <input value={email} onChange={handleEmail} placeholder='Email' type="text" />
              <input value={password} onChange={handlePassword} type="password" placeholder='Password' />
              <button onClick={onRegisterHandler}>Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp