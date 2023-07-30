/** @jsxImportSource @emotion/react */

import { GameCss } from './Game.css.jsx'
import React, { useEffect } from 'react'
import Phaser from 'phaser'
import Preloader from './js/Preloader.js'
import Play from './js/Play.js'
import Menu from './js/Menu.js'

/**
 * The main game component.
 * Renders the Phaser game and handles its lifecycle.
 *
 * @returns {JSX.Element} The game component.
 */
export function Game() {
  useEffect(() => {
    // Create the Phaser game instance and append it to the container element
    const config = {
      type: Phaser.AUTO,
      width: 1080,
      height: 670,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
        },
      },
      scale: {
        mode: Phaser.Scale.FIT,
        width: 1080,
        height: 670,
      },
      scene: [Preloader, Menu, Play],
    }
    const game = new Phaser.Game(config)

    // Append the game canvas to the DOM element with the id of "phaser-container"
    const canvas = game.canvas
    const container = document.getElementById('phaser-container')
    container.appendChild(canvas)
    // Return a cleanup function to destroy the game instance when the component unmounts
    return () => {
      game.destroy(true)
    }
  }, [])

  return <div id="phaser-container" css={GameCss}></div>
}
