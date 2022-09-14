import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { login } from "../../store/AuthSlice";
import "./SignIn.css"

function SignIn() {
    const dispatch = useDispatch()
    const Navigate = useNavigate();
    const { isAuth, error } = useSelector(state => state.auth)// {"isAuth": true,"loading": false,"currentUser": {"email": "ferhat@ferhat1234.com","username": "ferhat","bio": "ornekBio", "image": "ornekBio","token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"},"error": "" }

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorList, setErrorList] = useState([]);


    useEffect(() => {
        if (isAuth) {
            Navigate("/")
        }
    }, [isAuth])

    //list error
    useEffect(() => {
        if (error) {
            setErrorList(
                Object.keys(error).map((key) => {
                    return `${key} ${error[key]}`
                })
            )
        }
    }, [error])

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(login({ user: { email, password } }));
    }

    return (
        <>
            <div className="container">
                <div className="flex-row justify-center">
                    <div className="sign col-6">
                        <h1>Sign In</h1>
                        <Link to="/signup">Need an account?</Link>
                        {errorList.length > 0 && errorList.map((item, index) => (<div key={index} style={{ color: "red", marginBottom: " 10px" }}>{errorList[index]}</div>))}
                        <form onSubmit={handleSubmit} >
                            <input value={email} onChange={handleEmail} type="name" placeholder='Email' />
                            <input value={password} onChange={handlePassword} type="password" placeholder='Password' />
                            <button>Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn