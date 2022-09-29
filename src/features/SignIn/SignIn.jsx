import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';

import { login } from "../../store/AuthSlice";
import "./SignIn.css"

function SignIn() {
    const {t, i18n} = useTranslation()
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
                        <h1>{t("signIn.signIn")}</h1>
                        <Link to="/signup">{t("signIn.needAnAccount")}</Link>
                        {errorList.length > 0 && errorList.map((item, index) => (<div key={index} style={{ color: "red", marginBottom: " 10px" }}>{errorList[index]}</div>))}
                        <form onSubmit={handleSubmit} >
                            <input value={email} onChange={handleEmail} type="name" placeholder='Email' />
                            <input value={password} onChange={handlePassword} type="password" placeholder='Password' />
                            <button>{t("signIn.signIn")}</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn