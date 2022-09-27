import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux"
import { fetchArticleBySlug, favoriteArticle, unFavoriteArticle, createComment, fetchComments, deleteComment,deleteArticle } from "../../store/articleSlice"
import { followProfile, unFollowProfile, fetchProfile } from '../../store/ProfileSlice';

import "./Comment.css";

function Comment() {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { slug } = useParams()

  const [createDate, setCreateDate] = useState("")
  const authInfo = useSelector(state => state.auth);
  const { articleBySlugLoading, articleBySlugError, articleBySlugData, fetchCommentData } = useSelector(state => state.article)
  const { profileData, profileLoading, followLoading, unFollowLoading } = useSelector(state => state.profile)

  const [userComment, setUserComment] = useState("");

  useEffect(() => {
    if (articleBySlugData) {
      let customDate = new Date(articleBySlugData.createdAt);
      setCreateDate(customDate.toDateString());
    }

  }, [articleBySlugData])


  useEffect(() => {
    fetchAllComments();
    fetchArticles();
    fetchProfileData();
    
  }, [])

  const fetchProfileData = () => {
    if (authInfo.isAuth) {
      dispatch(fetchProfile({ token: authInfo.currentUser.token, username: authInfo.currentUser.username }))
    }
  }

  const fetchArticles = () => {
    if (authInfo.isAuth) {
      dispatch(fetchArticleBySlug({ token: authInfo.currentUser.token, slug }))
    } else {
      dispatch(fetchArticleBySlug({ slug }))
    }
  }
  const fetchAllComments = async () => {
    if (authInfo.isAuth) {
      await dispatch(fetchComments({ token: authInfo.currentUser.token, slug }))
    }
    else {
      await dispatch(fetchComments({ slug }))
    }
  }

  const handleFollow = async () => {
    if (articleBySlugData.author.following) {
      await dispatch(unFollowProfile({ token: authInfo.currentUser.token, username: articleBySlugData.author.username }))
    } else {
      await dispatch(followProfile({ token: authInfo.currentUser.token, username: articleBySlugData.author.username }))
    }
    fetchArticles()
  }
  const handleFavorite = async () => {
    if (articleBySlugData.favorited) {
      try {
        await dispatch(unFavoriteArticle({ token: authInfo.currentUser.token, slug: articleBySlugData.slug }))
      } catch (err) {
        console.log(err)

      }
    } else {
      try {
        await dispatch(favoriteArticle({ token: authInfo.currentUser.token, slug: articleBySlugData.slug }))
      } catch (err) {
        console.log(err)
      }
    }
    fetchArticles()
  }
  const handleComment = (e) => {
    setUserComment(e.target.value)
  }
  const handleCommentSubmit = async () => {
    await dispatch(createComment({ token: authInfo.currentUser.token, slug: articleBySlugData.slug, comment: userComment }))
    setUserComment("");
    fetchAllComments();
  }
  const handleDeleteComment = async (e) => {
    const id = e.target.value;
    await dispatch(deleteComment({ token: authInfo.currentUser.token, id, slug }))
    fetchAllComments();
  }

  const handleEditArticle = () => {
    navigate("/editor",{state: {articleBySlugData}})
  }

  const handleDeleteArticle = async () => {
    await dispatch(deleteArticle({ token: authInfo.currentUser.token,slug }))
    navigate("/",);
  }



  const buttons = () => {
      if(!authInfo.isAuth){
        return <>
        <button onClick={()=>{navigate("/signUp",)}} className='btn-article-light'>Sign Up</button>
        <span> or </span>
        <button onClick={()=>{navigate("/signIn",)}} className='btn-article-green'>Sign In</button>
        <span> to add comments on this article.</span>
        </>
      }
      else{
        if (authInfo.currentUser.username === articleBySlugData.author.username) {
          return <>
          <button onClick={handleEditArticle} className='btn-article-light'>Edit Article</button>
          <button onClick={handleDeleteArticle} className='btn-article-red'>Delete Article</button>
           </>
         }
         else {
           return <>
               <button onClick={handleFollow} className='btn-article-light'>{articleBySlugData.author.following ? "Unfollow" : "Follow"} Gerome</button>
               <button onClick={handleFavorite} className='btn-article-green'>{articleBySlugData.favorited ? "Unfavorite" : "Favorite"} Article {"(" + articleBySlugData.favoritesCount + ")"}</button>
             </>
         }
      }
  }
  return (
    <>
      {articleBySlugLoading && <div style={{ textAlign: "center" }}>loadign...</div>}
      {!articleBySlugLoading && articleBySlugData &&
        <>
          {/*banner*/}
          <div className="banner banner-article">
            <div className="container">
              <h1>{articleBySlugData.title}</h1>
              <div>
                <Link style={{ display: "inline-block" }} className='user-name' to={"/@" + articleBySlugData.author.username}>
                  <img className='avatar' src={articleBySlugData.author.image} alt="johndoe" />
                </Link>
                <div className='info info-article'>
                  <Link to={"/@johndoe"}>{articleBySlugData.author.username}</Link>
                  <time className="date" dateTime="2021-11-24T12:11:08.212Z">{createDate}</time>
                </div>
                {authInfo.isAuth && buttons()}
              </div>
            </div>
          </div>

          <div className="container">
            <div className="flex-col">
              {/*post section*/}
              <p className='article-post-detail'>
                {articleBySlugData.body}
                <br />
                <br />
                {articleBySlugData.tagList.map((item, index) => { return <button key={index} style={{ margin: "0px" }} className='btn-tag-post'>{item}</button> })}
                <br />
                <br />
              </p>
              <hr style={{ borderTop: "1px solid lightgray" }} /><br />

              <div className="article-main flex-col align-center justify-center">

                {/*author */}
                <div className='article-author'>
                  {authInfo.isAuth && <>
                    <Link style={{ display: "inline-block" }} className='user-name' to="/@johndoe">
                    <img className='avatar' src={articleBySlugData.author.image} alt="johndoe" />
                  </Link>
                  <div className='info info-article'>
                    <Link to="/@johndoe">{articleBySlugData.author.username}</Link>
                    <time className="date" dateTime="2021-11-24T12:11:08.212Z">{createDate}</time>
                  </div>
                  </>}
                  {buttons()}
                </div>

                {/*comment from */}
                {authInfo.isAuth && profileData && <>
                  <div className="comment-card">
                  <div className="comment-body">
                    <textarea value={userComment} onChange={handleComment} placeholder='Write a comment...'></textarea>
                  </div>
                  <div className="comment-footer">
                    <img src={profileData.image} alt="" />
                    <button onClick={handleCommentSubmit}>Post Comment</button>
                  </div>
                </div>
                </>}
                {/*comments */}
                {fetchCommentData && fetchCommentData.map((item, index) => {
                  const commentDate = new Date(item.createdAt)
                  return <>
                    <div className="comment-card">
                      <div className="comment-body">
                        <p>{item.body}</p>
                      </div>
                      <div className="comment-footer flex-row">
                        <div className='article-author'>
                          <Link style={{ display: "inline-block" }} className='user-name' to={"/@" + item.author.username}>
                            <img className='avatar' src={item.author.image} alt="johndoe" />
                          </Link>
                          <div className='info info-article'>
                            <Link style={{ display: "inline-block" }} to="/@johndoe">{item.author.username}</Link>
                            <time style={{ display: "inline-block", marginLeft: "10px" }} className="date" dateTime="2021-11-24T12:11:08.212Z">{commentDate.toDateString()}</time>
                          </div>
                        </div>
                        {authInfo.isAuth && authInfo.currentUser.username == item.author.username &&
                          <div className='delete-comment'>
                            <button value={item.id} onClick={handleDeleteComment}>x</button>
                          </div>}

                      </div>
                    </div>
                  </>
                })}
              </div>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default Comment