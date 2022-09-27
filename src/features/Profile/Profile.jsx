import React, { useState, useEffect } from 'react'
import { Link,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchArticles } from '../../store/articleSlice';
import { fetchProfile, followProfile, unFollowProfile } from '../../store/ProfileSlice';
import { Article } from '../../components';
import "./Profile.css"

function Profile() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const authInfo = useSelector(state => state.auth);
  const { articles, loading } = useSelector(state => state.article)
  const { profileData, profileLoading, followLoading, unFollowLoading } = useSelector(state => state.profile)

  const [activeToggle, setactiveToggle] = useState("MyArticles");

  const { username } = useParams();//Gerome

  useEffect(() => {
    if (!authInfo.currentUser) {
      dispatch(fetchArticles())
      dispatch(fetchProfile({ username }))
    } else {
      dispatch(fetchArticles(authInfo.currentUser.token))
      dispatch(fetchProfile({ token: authInfo.currentUser.token, username }))
    }

  }, [])

  useEffect(() => {
    if (!authInfo.currentUser) {
      dispatch(fetchProfile({ username }))
    } else {
      dispatch(fetchProfile({ token: authInfo.currentUser.token, username }))
    }
  }, [followLoading, unFollowLoading, username])

  const changeActiveToggle = (e) => {
    setactiveToggle(e.target.value);
  }
  const handleFollow = () => {
    if (profileData.following) {
      dispatch(unFollowProfile({ token: authInfo.currentUser.token, username }))
    } else {
      dispatch(followProfile({ token: authInfo.currentUser.token, username }))
    }
  }
  const goToSettings = ()=>{
    navigate("/settings")
  }
  const goToDashboard = ()=>{
    navigate("/dashboard")
  }

  const followSettingBtn = () => {
    if (authInfo.isAuth) {
      if (profileData.username === authInfo.currentUser.username) {
        return (
          <>
          <button
          onClick={goToDashboard}
          style={{float: "right", marginRight: "80px", marginLeft:"10px"}}
          className='btn-article-light'>
          Dashboard
        </button>
          <button
            onClick={goToSettings}
            style={{float: "right", margin:"0px !important"}}
            className='btn-article-light'>
            Edit Profile Settings
          </button>
          
          </>
        )
      } else {
        return (
          <button
            onClick={handleFollow}
            style={{float: "right", marginRight: "80px" }}
            className='btn-article-light'>
            {`${profileData.following ? "Unfollow" : "Follow"} ${profileData.username}`}
          </button>
        )
      }
    }
    return (<button>asdfasda</button>)
  }
  return (
    <>
      {profileLoading && !profileData && <div style={{ "textAlign": "center" }}>profile loading...</div>}

      {profileData && <>{/*banner */}
        <div className="banner banner-profile">
          <div className="container">
            <img src={profileData.image} alt="" />
            <h1>{profileData.username}</h1>
            <p>{profileData.bio}</p>

            {followSettingBtn()}

          </div>
        </div>
        {/*main */}
        <div className='container'>
          <div className="main-profile flex-col">

            {/*toggle bar*/}
            <div className="col-9">
              <div className="posts-toggle">
                <ul>
                  <li>
                    <button
                      onClick={changeActiveToggle}
                      value={"MyArticles"}
                      type='button'
                      className={"nav-btn" + (activeToggle === "MyArticles" ? " active" : "")}>
                      My Articles
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={changeActiveToggle}
                      value={"FavoritedArticles"}
                      type='button'
                      className={"nav-btn" + (activeToggle === "FavoritedArticles" ? " active" : "")}>
                      Favorited Articles
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            {/*post */}
            {loading && "loading..."}
            {!loading && activeToggle === "MyArticles" && articles.map((item, index) => {
              if (item.author.username === username) {
                return <Article key={index} item={item} />
              }
            })
            }
            {!loading && activeToggle === "FavoritedArticles" && <div>no articles yet</div>}
          </div>
        </div>
      </>
      }
    </>
  )
}

export default Profile

