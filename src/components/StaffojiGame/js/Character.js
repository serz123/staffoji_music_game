import Phaser from 'phaser'
import eventEmitter from './eventEmitter'

/**
 * Player class extends Phaser.GameObjects.Sprite.
 * Represents the player character in the game.
 */
class Player extends Phaser.GameObjects.Sprite {
  /**
   * Constructs a new Player object.
   * @param {object} config - The configuration object.
   * @param {Phaser.Scene} config.scene - The scene the player belongs to.
   * @param {number} config.x - The initial x position of the player.
   * @param {number} config.y - The initial y position of the player.
   * @param {object} config.audio - The audio configuration for the player.
   */
  constructor(config) {
    super(config.scene, config.x, config.y, 'playerIdle')
    // Clear all not necessery listeners and try catch - make !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1

    this.scene.add.existing(this)
    this.scene = config.scene
    this.scene.physics.world.enable(this)
    this.lives = 3
    this.hasStartedDoingFirstMOve = false // Add a flag to track the first move
    this.madeFirstMove = false // Add a flag to track the first move
    this.audio = config.audio
    this.detectedTone = null
    this.leftDirection = null
    this.rightDirection = null
    this.upDirection = null
    this.jumpDirection = null
    this.stopJump = false
    this.isDead = false
    this.readyForMusic = false
    // this.cursor = this.scene.input.keyboard.createCursorKeys()

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('playerIdle', {
        start: 0,
        end: 9,
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'player_walk',
      frames: this.anims.generateFrameNumbers('playerWalk', {
        start: 0,
        end: 9,
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'player_jump',
      frames: this.anims.generateFrameNumbers('playerJump', {
        start: 0,
        end: 7,
      }),
      frameRate: 5,
      repeat: -1,
    })

    this.anims.create({
      key: 'player_death',
      frames: this.anims.generateFrameNumbers('playerDeath', {
        start: 0,
        end: 8,
      }),
      frameRate: 10,
      repeat: 0,
    })

    this.anims.play('idle')
    this.body.setGravityY(500)

    document.addEventListener('toneDetected', (event) => {
      this.detectedTone = event.detail.tone
      // console.log('Tone detected: ', this.detectedTone)
    })
  }

  /**
   * Update method called every frame.
   * Handles player movement and behavior.
   */
  update() {
    // Start listening for the any tone to activate the first move
    if (!this.hasStartedDoingFirstMOve && this.detectedTone === null) {
      this.scene.time.delayedCall(
        1000,
        () => {
          // Add a timeout to give the audio context time to start
          this.audio.updatePitch()
          this.hasStartedDoingFirstMOve = true
        },
        [],
        this
      )
    }

    /* if (this.cursor.up.isDown && this.body.touching.down) {
      this.body.setVelocityY(-590)
      this.anims.play('player_jump', true)
    }*/

    if (!this.madeFirstMove && this.detectedTone !== null) {
      // First move
      this.readyForMusic = true
      this.body.setVelocityX(160)
      this.flipX = false
      this.anims.play('player_walk', true)
    } /* else if (this.cursor.left.isDown) {
      this.body.setVelocityX(-160)
      this.flipX = true
      this.anims.play('player_walk', true)
    } */ else if (
      this.detectedTone !== null &&
      this.detectedTone === this.leftDirection
    ) {
      this.body.setVelocityX(-160)
      this.flipX = true
      this.anims.play('player_walk', true)
    } /* else if (this.cursor.right.isDown) {
      this.body.setVelocityX(160)
      this.flipX = false
      this.anims.play('player_walk', true)
    } */ else if (
      this.detectedTone !== null &&
      this.detectedTone === this.rightDirection
    ) {
      this.body.setVelocityX(160)
      this.flipX = false
      this.anims.play('player_walk', true)
    } else if (
      this.detectedTone !== null &&
      this.detectedTone === this.upDirection &&
      this.body.touching.down &&
      !this.stopJump
    ) {
      this.body.setVelocityY(-590)
      if (this.jumpDirection === 'right') {
        this.anims.play('player_jump', true).flipX = false
      } else if (this.jumpDirection === 'left') {
        this.anims.play('player_jump', true).flipX = true
      }
      // Reset the detected tone to null to prevent continuous jumping
      this.stopJump = true
    } else if (
      this.detectedTone !== null &&
      this.detectedTone === this.upDirection &&
      this.stopJump
    ) {
      // Move left or right while jumping
      if (this.jumpDirection === 'left') this.body.setVelocityX(-160)
      else if (this.jumpDirection === 'right') {
        this.body.setVelocityX(160)
      }
      if (this.body.touching.down) {
        this.anims.play('player_walk', true)
      }
    } else if (
      this.detectedTone === null &&
      this.body.touching.down &&
      !this.isDead
    ) {
      this.body.setVelocityX(0)
      this.anims.play('idle')
    } else if (
      this.detectedTone !== null &&
      this.detectedTone !== this.leftDirection &&
      this.detectedTone !== this.rightDirection &&
      this.detectedTone !== this.upDirection &&
      this.madeFirstMove
    ) {
      // Wrong note played
      this.body.setVelocityX(0)
      this.body.setVelocityY(0)
      // If the wrong note is played, the player dies
      eventEmitter.emit('wrongTone')
      this.detectedTone = null // Reset the detected tone to null to prevent continuous dying
    }
    if (this.x >= 6950) {
      // Player reached the desired x position (the end of the game), start jumping
      this.detectedTone = null
      eventEmitter.emit('playerWin')
    }
    // Remove tone after the frquvbc is detected
  }

  /**
   * Sets the tones to detect for player movement.
   * @param {string} left - The tone to detect for moving left.
   * @param {string} right - The tone to detect for moving right.
   * @param {string} up - The tone to detect for jumping.
   * @param {string} dir - The direction of the jump ('left' or 'right').
   */
  setTonesForDetection(left, right, up, dir) {
    this.leftDirection = left
    this.rightDirection = right
    this.upDirection = up
    this.jumpDirection = dir
    /* console.log(
      'Tones to detected: ',
      this.leftDirection,
      this.rightDirection,
      this.upDirection
    ) */
    this.audio.updatePitch()
  }
}

export default Player

// REMOVE EVENT LISTENER AT THE END!!!!!!!!!!!!!!!!!
