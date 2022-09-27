import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { logOut,updateToken,updateUserName } from '../../store/AuthSlice'
import { fetchProfile, updateProfile,resetUpdateData } from '../../store/ProfileSlice'
import "./Settings.css"

function Settings() {
  const dispatch = useDispatch()
  const Navigate = useNavigate()

  const authInfo = useSelector(state => state.auth)
  let {profileData, profileLoading,updateProfileData ,updateProfileError}  = useSelector(state => state.profile)

  const [err, setErr] = useState(false)
  const [user, setUser] = useState({
    email: "",
    username: "",
    bio: "",
    image: "",
    password: ""
  })

  useEffect(() => {
    fetchProfileData()
    setErr(false)
  }, [])

  useEffect(()=>{
    if(profileData){
      setUser({
        ...user,
        email: authInfo.currentUser.email,
        username: authInfo.currentUser.username,
        bio: authInfo.currentUser.bio,
        image: profileData.image
      })
    }
    
  },[profileData])

  useEffect(()=>{
    if(updateProfileData && !updateProfileError){
      dispatch(updateUserName(user.username))
      dispatch(updateToken(updateProfileData.token))
      dispatch(resetUpdateData())
      Navigate(`/@${user.username}`)
    }
    
  },[updateProfileData])

  const fetchProfileData = async ()=>{
     await dispatch(fetchProfile({token: authInfo.currentUser.token, username: authInfo.currentUser.username}))
  }

  const handleLogOut = () => {
    dispatch(logOut())
    Navigate("/signin")
  }

  const handleChange = (event) => {
    const key = event.target.name ? event.target.name : "bio"
    const value = event.target.value;
    setUser({
      ...user,
      [key]: value
    })
  }

  const handleSubmit = async (e)=>{

    e.preventDefault()
    const newUser = {}
    const keys = Object.keys(user)
    keys.map((key)=>{
      if(user[key] !==""){
       newUser[key] =  user[key];
      }
    })
    
    await dispatch(updateProfile({user:newUser, token: authInfo.currentUser.token}))
    setErr(true)
  }
  const fetchEnd = ()=>{
    return (
    <>
    <div className="container">
        <div className="flex-row justify-center">
          <div className="sign settings-page col-6">
            <h1>Your Settings</h1>
            { err && updateProfileError && <p className='error'>{updateProfileError}</p>}
            <form action="">
              <input
                name='image'
                value={user.image}
                onChange={handleChange}
                placeholder='URL of profile picture' type="text" />
              <input
                name='username'
                value={user.username}
                onChange={handleChange}

                placeholder='Username' type="text" />
              <textarea
                name='bio'
                value={user.bio}
                onChange={handleChange}
                placeholder='Short bio about you' type="text" />
              <input
                name='email'
                value={user.email}
                onChange={handleChange}
                type="text" placeholder='Email' />
              <input
                name='password'
                value={user.password}
                onChange={handleChange}
                type="password"
                placeholder='New Password' />
              <button onClick={handleSubmit}>Update Settings</button>
            </form>
            <div className='clear'></div>
            <hr />
            <button onClick={handleLogOut} className='btn-logout'>OR click here to logout</button>
          </div>
        </div>
      </div>
    </>)
  }
  return (
    <>
    {profileLoading && <div style={{textAlign:"center"}}>loading...</div> }
    {!profileLoading && profileData && fetchEnd()} 
    </>
  )
}

export default Settings