import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchArticles, filter } from "../../store/articleSlice"
import { fetchFeed } from '../../store/feedSlice'
import { switchTheme } from '../../store/themeSlice'
import { Article } from "../../components"

import './Home.css';

function Home() {
  const dispatch = useDispatch()
  const authInfo = useSelector(state => state.auth);
  const [selectedTag, setSelectedTag] = useState("");
  const [activeToggle, setactiveToggle] = useState("global");

  const { articles, loading, filteredArticles } = useSelector(state => state.article)
  const { feedLoading, feedArticles } = useSelector(state => state.feeds)
  const {theme} = useSelector(state => state.theme)



  //fetch feed and global posts
  useEffect(() => {
    if (authInfo.isAuth) {
      dispatch(fetchArticles(authInfo.currentUser.token))
      setactiveToggle("yourFeed")
      dispatch(fetchFeed(authInfo.currentUser.token))
    }else{
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
            <p>A place to share your knowledge.</p>
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
                      Your Feed
                    </button>
                  </li>
                }
                <li><button
                  onClick={changeToggle}
                  value={"global"}
                  type='button'
                  className={"nav-btn" + (activeToggle === "global" ? " active" : "")}>
                  Global Feed
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
              <p>Popular Tags</p>
              <div className="tags">
                <button onClick={filterArticles} value="implementations" className='btn-tag'>implementations</button>
                <button onClick={filterArticles} value="welcome" className='btn-tag'>welcome</button>
                <button onClick={filterArticles} value="introduction" className='btn-tag'>introduction</button>
                <button onClick={filterArticles} value="codebaseShow" className='btn-tag'>codebaseShow</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;