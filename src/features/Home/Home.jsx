import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from "react-i18next"
import { fetchArticles, getTags, filter } from "../../store/articleSlice"
import { fetchFeed } from '../../store/feedSlice'
import { switchTheme } from '../../store/themeSlice'
import { Article } from "../../components"

import './Home.css';

function Home() {
  const dispatch = useDispatch()

  const authInfo = useSelector(state => state.auth);
  const { t, i18n } = useTranslation();


  const [selectedTag, setSelectedTag] = useState("");
  const [activeToggle, setactiveToggle] = useState("global");

  const { articles, loading, filteredArticles, getTagsData } = useSelector(state => state.article)
  const { feedLoading, feedArticles } = useSelector(state => state.feeds)
  const {theme} = useSelector(state => state.theme)




  //fetch feed and global posts
  useEffect(() => {
    if (authInfo.isAuth) {
      dispatch(getTags(authInfo.currentUser.token))
      dispatch(fetchArticles(authInfo.currentUser.token))
      setactiveToggle("yourFeed")
      dispatch(fetchFeed(authInfo.currentUser.token))
    }else{
      dispatch(getTags())
      dispatch(fetchArticles())
    }
  }, [])

  //select tag
  useEffect(() => {
    if (selectedTag !== "") {
      setactiveToggle("");
    }
  }, [selectedTag])

  const filterArticles = (e) => {
    setSelectedTag(e.target.value);
    const filterTag = e.target.value;
    let filteredArticels = articles.filter((currentItem) => {
      let { tagList } = currentItem;
      if (tagList.includes(filterTag)) {
        return currentItem;
      }
      return null;
    })
    //filteredArticels
    dispatch(filter(filteredArticels));
  }
  const changeToggle = (e) => {
    setactiveToggle(e.target.value);
    setSelectedTag("")
  }

  return (
    <>
      {/*banner */}
      {!authInfo.isAuth &&
        <div className="banner">
          <div className="container">
            <h1>conduit</h1>
            <p>{t('home.slug')}</p>
          </div>
        </div>
      }
      <div className="container mt-3">
        <div className="flex-row">
          {/*toggle bar*/}
          <div className="col-9">
            <div className="posts-toggle">
              <ul>
                {authInfo.isAuth &&
                  <li>
                    <button
                      onClick={changeToggle}
                      value={"yourFeed"}
                      type='button'
                      className={"nav-btn" + (activeToggle === "yourFeed" ? " active" : "")}>
                      {t('home.yourFeed')}
                    </button>
                  </li>
                }
                <li><button
                  onClick={changeToggle}
                  value={"global"}
                  type='button'
                  className={"nav-btn" + (activeToggle === "global" ? " active" : "")}>
                  {t('home.globalFeed')}
                </button></li>
                {selectedTag !== "" && <li>
                  <button type='button' className='nav-btn active'>{"#" + selectedTag}
                  </button></li>}
              </ul>
            </div>
            {/*post */}
            {loading && "loading..."}
            {!loading && selectedTag !== "" && filteredArticles.map((item, index) => <Article key={index} item={item} />)}
            {!loading && selectedTag === "" && activeToggle==="global" && articles.map((item, index) => <Article key={index} item={item} />)}
            {!feedLoading && selectedTag === "" && activeToggle==="yourFeed" && feedArticles.map((item, index) => <Article key={index} item={item} />)}
            {!feedLoading && selectedTag === "" && activeToggle==="yourFeed" && feedArticles.length === 0 && <div>No articles are here... yet.</div>}


          </div>
          {/*sidebar*/}
          <div className="col-3">
            <div className="sidebar">
              <p>{t('home.popularTags')}</p>
              <div className="tags">
                {getTagsData && getTagsData.map((tagItem)=> <button key={tagItem} onClick={filterArticles} value={tagItem} className='btn-tag'>{tagItem}</button> )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;