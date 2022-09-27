import React from 'react'
import { Link,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from "react-i18next"

import {filter, favoriteArticle, unFavoriteArticle,fetchArticles} from "../../store/articleSlice"
import {fetchFeed} from '../../store/feedSlice';
import "./Article.css"
import { useState } from 'react';


function Article(props) {
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();
  const {articles} = useSelector(state => state.article);
  const { currentUser, isAuth } = useSelector(state => state.auth)
  const {item} = props;

  const [favoite, setFavorite] = useState(item.favorited);
  const [favoiteCount, setFavoriteCount] = useState(item.favoritesCount);
  const date = new Date(item.createdAt);

  const handleLike = ()=>{
    if(favoite){
      dispatch(unFavoriteArticle({token:currentUser.token,slug:item.slug}))
      setFavorite(!favoite)
      setFavoriteCount(favoiteCount-1)
  
    }else{
      dispatch(favoriteArticle({token:currentUser.token,slug:item.slug})) 
      setFavorite(!favoite)
      setFavoriteCount(favoiteCount+1)
    }
  }

    
  const filterArticles = (e)=>{
    const filterTag = e.target.value;
    let filteredArticels = articles.filter((currentItem)=>{
      let {tagList} = currentItem;
      if(tagList.includes(filterTag)){
        return item;
      }
     })
    //filteredArticels
    dispatch(filter(filteredArticels));
    console.log(articles);
  }
  
  return (
    <>
      <div className="flex-col post">
        {/*post head*/}
        <div className="flex-row post-head">
          <div>
            <Link className='user-name'  to={"/@"+item.author.username}>
            <img className='avatar' src={item.author.image} alt="johndoe" />
            </Link>
            <div className='info'>
              <Link to={"/@"+item.author.username}>{item.author.username}</Link>
              <time className="date" dateTime="2021-11-24T12:11:08.212Z">{date.toDateString()}</time>
            </div>
          </div>
          {isAuth && 
          <div>
            <button 
            onClick={handleLike}
            style={{cursor:"pointer"}} 
            className={`btn-like ${favoite ? "favorited":""}`}>{favoiteCount}
            </button>
          </div>}
        </div>

        {/*post body*/}
        <div className="post-body">
          <Link className='post-link' to={"/article/"+item.slug}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Link>
        </div>
        {/*post detail*/}
        <div className='post-detail flex-row'>
          <Link className='post-link' to={"/article/"+item.slug}> {t('home.readMore')} </Link>
          <div>
          {item.tagList.map((tag, index)=>(
            <button key={index} value={tag} onClick={filterArticles} className='btn-tag-post'>{tag}</button>
          ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Article