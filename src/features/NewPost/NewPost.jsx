import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { createArticle } from '../../store/articleSlice'
import "./NewPost.css"


function NewPost() {
  const {t, i18n} = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const authInfo = useSelector(state => state.auth)

  const [article, setArticle] = useState({
    title: "",
    description: "",
    body: "",
    tagList: "",
  })

  useEffect(() => {
    if (location.state != null) {
      const {title, description,body, tagList} = location.state.articleBySlugData;
      setArticle({
        title,
        description,
        body,
        tagList,
      })
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tagArray = article.tagList.split(" ");
    const postData = {
      article: { ...article, "tagList": tagArray },
      token: authInfo.currentUser.token
    }
    await dispatch(createArticle(postData))
    navigate("/");
  }
  const handleChange = (event) => {
    const key = event.target.name ? event.target.name : "body"

    const value = event.target.value;
    setArticle({
      ...article,
      [key]: value
    })
  }
  return (
    <>
      <div className="container">
        <div className="flex-row justify-center">
          <div className="new-post col-9">
            <form action="">
              <div>
                <input
                  name='title'
                  value={article.title}
                  onChange={handleChange}
                  placeholder='Article Title' type="text" />
              </div>
              <div>
                <input
                  name='description'
                  value={article.description}
                  onChange={handleChange}
                  placeholder={"What's this article about?"} type="text" />
              </div>
              <div>
                <textarea
                  name="body"
                  value={article.body}
                  onChange={(e) => { handleChange(e, "body") }}
                  placeholder='Write your article (in markdown)' name="" />
              </div>
              <div>
                <input
                  name='tagList'
                  value={article.tagList}
                  onChange={handleChange}
                  placeholder='Enter tags' type="text" />
              </div>
              <button onClick={handleSubmit} >{t("newPost.publishArticle")}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewPost