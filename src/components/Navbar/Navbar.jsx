import React, { useState,useEffect } from 'react'
import { Link } from "react-router-dom";
import './Navbar.css'
import { useSelector, useDispatch } from "react-redux"
import { switchTheme } from "../../store/themeSlice"
import { useTranslation } from "react-i18next"

function Navbar() {
  const dispatch = useDispatch()
  const authInfo = useSelector(state => state.auth);
  const { theme } = useSelector(state => state.theme);

  const [topnav, setTopnav] = useState("topnav")
  const [lang, setLang] = useState("tr")
  useEffect(()=>{
    setLang(i18n.language)
  })


  const { t, i18n } = useTranslation();

  const authNav = (auth) => {
    if (auth == false) {
      return (
        <>
          <Link to="/signup" >{t('nav.signUp')}</Link>
          <Link to="/signin" >{t('nav.signIn')}</Link>
        </>
      )
    } else {
      return (
        <>
          <Link id='link-user' to={`/@${authInfo.currentUser.username}`} >
            {authInfo.currentUser.username}
          </Link>
          <Link to="/settings" >{t('nav.settings')}</Link>
          <Link to="/editor" >{t('nav.newPost')}</Link>
        </>
      )
    }
  }
  const changeTheme = () => {
    if (theme == "light") {
      dispatch(switchTheme("dark"))
    } else {
      dispatch(switchTheme("light"))
    }
  }
  const changeLang = () => {
    const newLang = (i18n.language === "tr") ? "en" :"tr";
    setLang(newLang);
    i18n.changeLanguage(newLang);

  }
  const handleNav = () => {
    (topnav == "topnav") ? setTopnav("topnav responsive") : setTopnav("topnav")
  }
  return (

    <div className="container">
      <div className={topnav}>
        <Link style={{ float: "left" }} id='logo' to="/">conduit</Link>
        <input onClick={changeTheme} type="checkbox" id="switch" /><label htmlFor="switch"  >Toggle</label>
        <a style={{cursor:"pointer"}} onClick={changeLang}>{lang}</a>
        
        {authNav(authInfo.isAuth)}
        <Link to="/" >{t('nav.home')}</Link>
        <a href="#" className="icon" onClick={handleNav}>
          <i className="fa fa-bars"></i>
        </a>
      </div>
    </div>
  )
}

export default Navbar
/*

<nav>
      <div className="container">
        <Link id='logo' to="/">conduit</Link>
        <ul>
          <li><Link to="/" >{t('nav.home')}</Link></li>
          {authNav(authInfo.isAuth)}
          <li><input onClick={changeTheme}  type="checkbox" id="switch" /><label htmlFor="switch"  >Toggle</label></li>
          <li><input onClick={changeLang}  type="checkbox" id="lang" /><label htmlFor="lang"  >language</label></li>
        </ul>
      </div>
    </nav>

 */