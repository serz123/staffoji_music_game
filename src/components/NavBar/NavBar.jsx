/** @jsxImportSource @emotion/react */

import React from 'react'
import { useState } from 'react'
import {
  NavLink,
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import { Home } from '../Home/Home'
import { Game } from '../StaffojiGame/Game.jsx'
// import { HighScores } from '../HighScores'
// import { SingUp } from '../SingUp'
import { PageNotFound } from '../PageNotFound/PageNotFound'
import { NavBarCss } from './NavBar.css.jsx'

/**
 * Renders a navigation bar with links to different pages.
 *
 * @returns {JSX.Element} A navigation bar component.
 */
export function NavBar() {
  /**
   * State that tracks whether the checkbox is checked or not. Used to toggle the menu in mobile view.
   */
  const [checkChecked, setChecked] = useState(false)

  /**
   * Handles the change event of the checkbox.
   */
  function handelChecked() {
    setChecked(!checkChecked)
  }

  return (
    <div css={NavBarCss}>
      <Router basename="/staffoji">
        <div className="navigation">
          <input
            type="checkbox"
            id="checkbox_toggle"
            checked={checkChecked}
            onChange={() => setChecked(true)}
          />
          <label htmlFor="checkbox_toggle" className="hamburger">
            &#9776;
          </label>
          <ul className="menu">
            <li>
              <NavLink to="/" onClick={handelChecked}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/game" onClick={handelChecked}>
                Game
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

/* <li>
    <NavLink to="/high-scores" onClick={handelChecked}>
      High Scores
    </NavLink>
  </li>
  <li id="atRightSide">
    <NavLink to="/sign-up" onClick={handelChecked}>
      Create account
    </NavLink>
  </li> /*

  /* <Route path="/high-scores" element={<HighScores />} />
     <Route path="/sign-up" element={<SingUp />} /> */
