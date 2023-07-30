import Phaser from 'phaser'
import Player from './player'
import { createPlatforms } from './objects/platforms'
import { createWater } from './objects/water'
import { createClefs } from './objects/clefs'
import { createCoins } from './objects/coins'
import { createOtherObjects } from './objects/otherObjects'
import { createFire } from './objects/fire'
import eventEmitter from './eventEmitter'
import { createNoteImages } from './functions/createNoteImages'

/**
 * Play scene where the game is played.
 */
class Play extends Phaser.Scene {
  /**
   * Constructs the Play scene.
   */
  constructor() {
    super({ key: 'Play' })
  }

  /**
   * Creates the Play scene.
   */
  create() {
    this.selectedClef = this.registry.get('clef')
    this.particleEmitters = []
    this.noteImages = []
    this.musicNotStarted = true
    this.score = 0
    this.lastVisitedClef = null
    this.audio = this.registry.get('audio')
    this.cameras.main.setBounds(0, 0, 7238, 670)
    this.restartButton = null
    this.menuButton = null

    // Music
    this.music = this.sound.add('bgMusic', { volume: 0.2, loop: true })
    this.coinSound = this.sound.add('coinSound', { volume: 0.8 })
    this.deathSound = this.sound.add('deathSound', { volume: 0.1 })

    // Backgrund
    this.add.image(500, 335, 'background')
    this.add.image(1500, 335, 'background')
    this.add.image(2500, 335, 'background')
    this.add.image(3500, 335, 'background')
    this.add.image(4500, 335, 'background')
    this.add.image(5500, 335, 'background')
    this.add.image(6500, 335, 'background')
    this.add.image(7500, 335, 'background')

    this.water = createWater(this)
    this.water.setDepth(2)

    // Other objects
    this.otherObjects = createOtherObjects(this)

    this.platforms = createPlatforms(this)
    this.platforms.setDepth(2)

    this.player = new Player({
      scene: this,
      x: 100, // Start 100
      y: 426,
      audio: this.audio,
    })
    this.cameras.main.startFollow(this.player, false, 1, 0)
    this.player.body.setCollideWorldBounds(true)
    const worldBounds = this.physics.world.bounds
    const rightBound = 7238 // Same as camera bounds
    this.physics.world.setBounds(
      worldBounds.x, // Left boundary (default)
      worldBounds.y, // Top boundary (default)
      rightBound, // Right boundary
      worldBounds.height // Bottom boundary (default)
    )

    // Text
    this.scoreText = this.add.text(16, 16, 'Scores: 0', {
      fontSize: '32px',
      fill: '#000',
    })
    this.scoreText.setScrollFactor(0)
    this.livesText = this.add.text(900, 16, `Lives: ${this.player.lives}`, {
      fontSize: '32px',
      fill: '#000',
    })
    this.livesText.setScrollFactor(0)
    this.startText = this.add.text(100, 100, `Play any tone to start!`, {
      fontSize: '64px',
      fill: '#000',
    })

    this.menuButton = this.addButton(25, 645, 'homeButton')
      .setScrollFactor(0)
      .setScale(0.5)
      .setDepth(10)
    this.menuButton.on('pointerdown', () => {
      this.handleMenuButton()
      this.scene.stop('Play')
    })

    // Notes
    this.noteImages = createNoteImages(this.selectedClef)

    // Coins
    this.coins = createCoins(this)

    // Clefs
    this.clefs = createClefs(this, this.selectedClef)
    this.clefs.getChildren().forEach(function (clef) {
      // Shining
      const emitter = this.add.particles(0, 0, 'flare', {
        speed: 2,
        livespan: 1500,
        quantity: 1,
        scale: { start: 0.4, end: 0 },
        emitting: true,
        emitZone: { type: 'random', source: clef.getBounds() },
        duration: null,
      })
      emitter.start()
      if (!clef.visible) {
        emitter.setVisible(false)
      }
      this.particleEmitters.push(emitter)
    }, this)

    // Fire
    this.fire = createFire(this)

    // Start idle animation
    this.player.anims.play('idle')

    this.physics.add.collider(this.player, this.platforms)

    this.physics.add.overlap(
      this.player,
      this.clefs,
      this.showAndHideNotes,
      null,
      this
    )

    this.physics.add.overlap(
      this.player,
      this.water,
      this.playerDeath,
      null,
      this
    )

    this.physics.add.overlap(
      this.player,
      this.coins,
      this.collectCoin,
      null,
      this
    )

    this.physics.add.overlap(
      this.player,
      this.fire,
      this.playerBurnedInFire,
      null,
      this
    )

    this.physics.add.overlap(
      this.player,
      this.stone,
      this.playerDeathOfStone,
      null,
      this
    )

    // Handel wrnog played notes
    eventEmitter.on('wrongTone', this.dropTheStone, this)
    eventEmitter.on('playerWin', this.playerWin, this)
    eventEmitter.once('shutdown', this.shutDownListener, this)
  }

  /**
   * Updates the Play scene on every frame.
   */
  update() {
    this.player.update()
    if (this.player.readyForMusic && this.musicNotStarted) {
      this.music.play()
      this.startText.destroy() // When music starts for the first time, destroy the text
      this.musicNotStarted = false
    }
  }

  /**
   * Shows and hides the notes for a specific clef.
   * @param {Phaser.GameObjects.GameObject} player - The player object.
   * @param {Phaser.GameObjects.GameObject} clef - The clef object.
   */
  showAndHideNotes(player, clef) {
    if (!this.player.isDead) {
      this.fadeOutMusic()
      this.lastVisitedClef = clef
      clef.disableBody(true, true)
      const associatedEmitter = this.findAssociatedEmitter(clef)
      if (associatedEmitter) {
        associatedEmitter.stop()
      }

      this.showDirections(
        clef.directionInfo.jumpDirection,
        clef.directionInfo.noDirection
      )

      const showClefAgain = () => {
        const isOverlapping = this.checkOverlap(player, clef)
        if (!isOverlapping) {
          if (!this.music.isPlaying) {
            this.fadeInMusic()
          }
          this.removeDirections()
          clef.enableBody(true, clef.x, clef.y, true, true)
          if (associatedEmitter) {
            associatedEmitter.start()
          }
        } else {
          this.time.delayedCall(300, showClefAgain, [], this)
        }
      }

      this.time.delayedCall(1500, showClefAgain, [], this)
    }
  }

  /**
   * Fades out the background music.
   */
  fadeOutMusic() {
    this.tweens.add({
      targets: this.music,
      volume: 0.0001,
      duration: 1000,
      onComplete: function () {
        this.music.pause()
      },
      callbackScope: this,
    })
  }

  /**
   * Fades in the background music.
   */
  fadeInMusic() {
    this.music.resume()
    this.tweens.add({
      targets: this.music,
      volume: 0.2,
      duration: 1000,
      callbackScope: this,
    })
  }

  /**
   * Finds the associated particle emitter for a clef.
   * @param {Phaser.GameObjects.GameObject} clef - The clef object.
   * @returns {Phaser.GameObjects.Particles.ParticleEmitter|null} The associated particle emitter, or null if not found.
   */
  findAssociatedEmitter(clef) {
    return this.particleEmitters.find(
      (emm) =>
        emm.emitting &&
        Phaser.Geom.Intersects.RectangleToRectangle(
          emm.emitZones[0].source,
          clef.getBounds()
        )
    )
  }

  /**
   * Checks if the player overlaps with a clef.
   * @param {Phaser.GameObjects.GameObject} player - The player object.
   * @param {Phaser.GameObjects.GameObject} clef - The clef object.
   * @returns {boolean} True if there is an overlap, false otherwise.
   */
  checkOverlap(player, clef) {
    const playerBounds = player.getBounds()
    const clefBounds = clef.getBounds()
    return Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, clefBounds)
  }

  /**
   * Removes the note directions.
   */
  removeDirections() {
    this.notes.clear(true, true)
    this.arrow.clear(true, true)
  }

  /**
   * Shows the note directions for a specific clef.
   * @param {string} jumpDirection - The jump direction.
   * @param {string} noDirection - The no direction.
   */
  showDirections(jumpDirection, noDirection) {
    this.time.delayedCall(
      300,
      () => {
        this.stopPlayer()
        this.setRandomNotes(jumpDirection, noDirection)
        this.createNoteMasks()
        this.createArrows(jumpDirection, noDirection)
      },
      [],
      this
    )
  }

  /**
   * Stops the player.
   */
  stopPlayer() {
    this.player.madeFirstMove = true
    this.player.detectedTone = null
    this.player.body.setVelocityX(0)
    this.player.anims.play('idle')
    this.player.stopJump = false
  }

  /**
   * Sets random notes for the next move.
   * @param {string} jumpDirection - The jump direction.
   * @param {string} noDirection - The no direction.
   */
  setRandomNotes(jumpDirection, noDirection) {
    let numberOfNoteImages = 0
    switch (this.selectedClef) {
      case 'treble':
        numberOfNoteImages = 17
        break
      case 'alto':
        numberOfNoteImages = 17
        break
      case 'bass':
        numberOfNoteImages = 16
        break
      default:
        break
    }
    const randomNumber1 = Math.floor(Math.random() * numberOfNoteImages)
    let randomNumber2 = Math.floor(Math.random() * numberOfNoteImages)
    let randomNumber3 = Math.floor(Math.random() * numberOfNoteImages)

    while (randomNumber2 === randomNumber1) {
      randomNumber2 = Math.floor(Math.random() * numberOfNoteImages)
    }

    while (randomNumber3 === randomNumber1 || randomNumber3 === randomNumber2) {
      randomNumber3 = Math.floor(Math.random() * numberOfNoteImages)
    }

    this.notes = this.physics.add.staticGroup()

    if (noDirection !== 'right') {
      this.createNote(
        this.player.x + 92,
        this.player.y + 2,
        this.noteImages[randomNumber1].image
      )
    }

    if (noDirection !== 'left') {
      this.createNote(
        this.player.x - 92,
        this.player.y + 2,
        this.noteImages[randomNumber2].image
      )
      this.player.flipX = false
    }

    this.createNote(
      this.player.x,
      this.player.y - 106,
      this.noteImages[randomNumber3].image
    )

    let rightNote = this.noteImages[randomNumber1].name
    if (noDirection === 'right') {
      rightNote = null
    }
    let leftNote = this.noteImages[randomNumber2].name
    if (noDirection === 'left') {
      leftNote = null
    }
    let upNote = this.noteImages[randomNumber3].name
    if (noDirection === 'up') {
      upNote = null
    }

    this.player.setTonesForDetection(leftNote, rightNote, upNote, jumpDirection)
  }

  /**
   * Creates a note at the specified position.
   * @param {number} x - The x-coordinate of the note.
   * @param {number} y - The y-coordinate of the note.
   * @param {string} image - The image key of the note.
   */
  createNote(x, y, image) {
    const note = this.notes.create(x, y, image).setScale(0.9)
    note.setMask(this.createNoteMask(note))
  }

  /**
   * Creates a mask for a note.
   * @param {Phaser.GameObjects.Sprite} note - The note sprite.
   * @returns {Phaser.Display.Masks.GeometryMask} The note mask.
   */
  createNoteMask(note) {
    const width = note.width * 0.9
    const height = note.height * 0.9

    return this.make
      .graphics()
      .fillStyle(0xffffff)
      .fillRoundedRect(note.x - width / 2, note.y - height / 2, width, height, {
        tl: 10,
        tr: 10,
        bl: 10,
        br: 10,
      })
      .createGeometryMask()
  }

  /**
   * Creates masks for all the notes.
   */
  createNoteMasks() {
    this.notes.getChildren().forEach((note) => {
      note.setMask(this.createNoteMask(note))
    })
  }

  /**
   * Creates arrows for the note directions.
   * @param {string} jumpDirection - The jump direction.
   * @param {string} noDirection - The no direction.
   */
  createArrows(jumpDirection, noDirection) {
    this.arrow = this.physics.add.staticGroup()

    if (noDirection !== 'right') {
      this.arrow.create(this.player.x + 92, this.player.y - 62, 'arrowRight')
    }

    if (noDirection !== 'left') {
      this.arrow
        .create(this.player.x - 92, this.player.y - 62, 'arrowRight')
        .setFlipX(true)
    }

    if (jumpDirection === 'right') {
      this.arrow
        .create(this.player.x, this.player.y - 182, 'jumpRight')
        .setAngle(50)
    } else if (jumpDirection === 'left') {
      this.arrow
        .create(this.player.x, this.player.y - 182, 'jumpRight')
        .setAngle(-50)
        .setFlipX(true)
    }
  }

  /**
   * Creates a button at the specified position.
   * @param {number} x - The x-coordinate of the button.
   * @param {number} y - The y-coordinate of the button.
   * @param {string} texture - The texture key of the button.
   * @param {number} scale - The scale of the button.
   * @returns {Phaser.GameObjects.Image} The button object.
   */
  addButton(x, y, texture, scale) {
    const button = this.add
      .image(x, y, texture)
      .setInteractive()
      .setScale(scale)
    return button
  }

  /**
   * Handles the player's death in water.
   */
  playerDeath() {
    // DEATH IN GELERAL (WATER, ENEMY, FALLING)
    if (this.player.isDead) {
      return // The player is already dead
    }
    this.player.isDead = true
    this.music.pause()
    this.player.detectedTone = null
    this.player.body.setVelocityX(0)
    this.player.body.setVelocityY(0)
    this.player.lives--
    this.livesText.setText(`Lives: ${this.player.lives}`)
    if (this.player.lives > 0) {
      this.time.addEvent({
        delay: 2000,
        callback: this.returnPlayer,
        callbackScope: this,
      })
    } else {
      this.gameOver()
    }
  }

  /**
   * Returns the player to the last visited clef after death.
   */
  returnPlayer() {
    if (this.stone) {
      this.stone.destroy()
    }
    if (this.lastVisitedClef) {
      this.player.setPosition(this.lastVisitedClef.x, 100)
    }
    this.player.setVisible(true)
    this.cameras.main.startFollow(this.player)

    this.player.isDead = false // Set player status to alive
  }

  /**
   * Handles the player's death when hit by a falling stone.
   */
  playerDeathOfStone() {
    // Storing the current camera position
    const cameraScrollX = this.cameras.main.scrollX
    const cameraScrollY = this.cameras.main.scrollY
    // Setting the camera to the stored position
    this.cameras.main.stopFollow(this.player)
    this.cameras.main.setScroll(cameraScrollX, cameraScrollY)
    this.player.setVisible(false)
    this.playerDeath()
  }

  /**
   * Handles the player's death when burned in fire.
   */
  playerBurnedInFire() {
    this.time.delayedCall(
      500,
      () => {
        // Let player come into the fire
        this.player.detectedTone = null // Stop moving the player
        this.player.setVisible(false)
        this.playerDeath()
      },
      [],
      this
    )
  }

  /**
   * Collects a coin and increases the score.
   * @param {Phaser.GameObjects.GameObject} player - The player object.
   * @param {Phaser.GameObjects.GameObject} coin - The coin object.
   */
  collectCoin(player, coin) {
    this.coinSound.play()
    this.score += 10
    this.scoreText.setText(`Scores: ${this.score}`)
    coin.disableBody(true, true)
  }

  /**
   * Drops a stone to punish the player for playing the wrong note.
   */
  dropTheStone() {
    if (this.player.isDead) {
      return
    }
    this.stone = this.physics.add.image(this.player.x, 0, 'stone')
    this.stone.setGravityY(300)
    this.physics.add.collider(this.stone, this.platforms)
    this.physics.add.overlap(
      this.player,
      this.stone,
      this.playerDeathOfStone,
      null,
      this
    )
  }

  /**
   * Handles the game over state.
   */
  gameOver() {
    this.music.stop()
    this.gameOverWindow = this.add
      .image(500, 335, 'window')
      .setScrollFactor(0)
      .setDepth(100)
    this.gameOverText = this.add
      .text(500, 335, `Game over! \nYour scores: ${this.score}`, {
        fontSize: '32px',
        fill: '#000',
      })
      .setDepth(101)
    this.gameOverText.setOrigin(0.5).setScrollFactor(0)
    this.restartButton = this.addButton(
      this.gameOverWindow.x - 80,
      this.gameOverWindow.y + 120,
      'restartButton'
    )
      .setScrollFactor(0)
      .setDepth(102)
    this.restartButton.on('pointerdown', () => {
      this.restartGame()
    })
    this.menuButton = this.addButton(
      this.gameOverWindow.x + 80,
      this.gameOverWindow.y + 120,
      'menuButton'
    )
      .setScrollFactor(0)
      .setDepth(102)
    this.menuButton.on('pointerdown', () => {
      this.handleMenuButton()
    })
  }

  /**
   * Handles the player's win state.
   */
  playerWin() {
    this.winText = this.add.text(
      100,
      335,
      `You won! Your scores: ${this.score}`,
      { fontSize: '64px', fill: '#000' }
    )
    this.winText.setScrollFactor(0)
  }

  /**
   * Restarts the game.
   */
  restartGame() {
    this.scene.restart()
  }

  /**
   * Handles the menu button click.
   */
  handleMenuButton() {
    this.scene.start('Menu')
  }

  /**
   * Shuts down the event listeners.
   */
  shutDownListener() {
    eventEmitter.off('wrongTone', this.dropTheStone, this)
    eventEmitter.off('playerWin', this.playerWin, this)
  }

  /**
   * Cleans up and destroys the Play scene.
   */
  destroy() {}
}

export default Play

// MAKE SOUNDS CONTRIBUTIONS
// https://opengameart.org/content/completion-sound za completetask i gamae.waw
// bg music https://opengameart.org/content/woodland-fantasy
// song 18 https://opengameart.org/content/crystal-cave-song18
// THE MUSIC CONTINUE PLAYING IF I PRESS MENU BUTTON WHILE CHARACTER IS MOVING
// YOU WIN AND YOU LOST TEXT
