/** @jsxImportSource @emotion/react */
import React from 'react'
import { NavLink } from 'react-router-dom'
import { HomeCss } from './Home.css.jsx'

/**
 * Renders the Home component, which displays the main page of the Staffoji game.
 *
 * @returns {JSX.Element} A Home component.
 */
export function Home() {
  return (
    <div css={HomeCss}>
      <h1>Welcome to Staffoji!</h1>
      <p>
        Get ready to rock and roll with Staffoji! Tune up your instruments and
        get ready to play the game that's taking the music world by storm!
      </p>
      <p>
        To fully enjoy the game and save your results and high scores, we
        recommend creating an account. Simply click on the "Create account"
        button to get started. By creating account, you can compete with other
        players and see how you rank on the leaderboard.
      </p>

      <p className="buttons">
        <NavLink to="/game">
          <button>Play Staffoji</button>
        </NavLink>
      </p>
    </div>
  )
}

/* TEXT FOR LOGGED USERS */
/*  <NavLink to="/sign-up">
    <button>Create account</button>
    </NavLink> p*/
