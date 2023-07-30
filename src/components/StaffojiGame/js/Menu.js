import Phaser from 'phaser'
import AudioFrequencyDetector from './audio2.js'

/**
 * Represents the menu scene.
 */
class Menu extends Phaser.Scene {
  /**
   * Creates an instance of the Menu scene.
   */
  constructor() {
    super({ key: 'Menu' })
  }

  /**
   * Creates the menu scene.
   */
  create() {
    this.audio = new AudioFrequencyDetector()
    this.registry.set('audio', this.audio)
    this.musicMenu = this.sound.add('menuMusic', { volume: 0.2, loop: true })
    this.musicMenu.play()
    this.add.image(540, 335, 'menuBg') // Background
    this.selectedClef = 'treble' // Default clef

    const buttonPositions = [
      { x: 440, y: 500, texture: 'emptyButton', scale: 1 },
      { x: 540, y: 500, texture: 'disabledButton', scale: 0.8 },
      { x: 640, y: 500, texture: 'disabledButton', scale: 0.8 },
    ]

    this.radioButtons = buttonPositions.map(({ x, y, texture, scale }) =>
      this.addButton(x, y, texture, scale)
    )

    // Images for radio buttons
    this.add.image(440, 497, 'treble').setScale(0.6)
    this.add.image(540, 497, 'alto').setScale(0.6)
    this.add.image(640, 497, 'bass').setScale(0.6)

    this.radioButtons[0].selected = true // Set initial selection

    this.radioButtons.forEach((button, index) => {
      button.on('pointerdown', () => {
        this.handleRadioButtonClick(index)
      })
    })

    this.playButton = this.addButton(540, 335, 'playButton').setScale(1.1)
    this.playButton.on('pointerover', () => {
      this.playButton.setScale(1.2)
    })

    this.playButton.on('pointerout', () => {
      this.playButton.setScale(1.1)
    })

    this.playButton.on('pointerdown', () => {
      this.handlePlayButtonClick()
    })

    this.infoButton = this.addButton(1005, 75, 'infoButton').setScale(0.7)
    this.infoButton.on('pointerdown', () => {
      this.handleInstructionButtonClick(1.2)
    })
  }

  /**
   * Updates the menu scene.
   */
  update() {
    this.updateButtonImages()
    this.setSelectedClef()
  }

  /**
   * Sets the selected clef based on the radio button selection.
   */
  setSelectedClef() {
    if (this.radioButtons[0].selected) {
      this.selectedClef = 'treble'
    } else if (this.radioButtons[1].selected) {
      this.selectedClef = 'alto'
    } else if (this.radioButtons[2].selected) {
      this.selectedClef = 'bass'
    }
    this.registry.set('clef', this.selectedClef)
  }

  /**
   * Adds a button to the scene.
   * @param {number} x - The x-coordinate of the button.
   * @param {number} y - The y-coordinate of the button.
   * @param {string} texture - The texture key of the button.
   * @param {number} scale - The scale of the button.
   * @returns {Phaser.GameObjects.Image} The created button.
   */
  addButton(x, y, texture, scale) {
    const button = this.add
      .image(x, y, texture)
      .setInteractive()
      .setScale(scale)
    return button
  }

  /**
   * Handles the click event of a radio button.
   * @param {number} index - The index of the clicked radio button.
   */
  handleRadioButtonClick(index) {
    this.radioButtons.forEach((button, buttonIndex) => {
      button.selected = buttonIndex === index
      button.setScale(button.selected ? 1 : 0.8)
    })
  }

  /**
   * Handles the click event of the play button.
   */
  handlePlayButtonClick() {
    this.cameras.main.fadeOut(500) // Transition 500ms
    const event = new Event('startAudioContext')
    document.dispatchEvent(event) // ??????????????
    this.tweens.add({
      targets: this.musicMenu,
      volume: 0.0001,
      duration: 400,
      onComplete: function () {
        this.musicMenu.stop()
      },
      callbackScope: this,
    })
    this.cameras.main.on('camerafadeoutcomplete', () => {
      this.scene.start('Play')
      this.cameras.main.fadeIn(500) // Fade in into Play scene
    })
  }

  /**
   * Handles the click event of the instruction button.
   */
  handleInstructionButtonClick() {
    this.infowindow = this.add.image(540, 335, 'window')
    this.menuButton = this.addButton(540, 460, 'homeButton')
    this.menuButton.on('pointerdown', () => {
      this.handleReturnToMenuButton()
    })

    this.instructionText = this.add
      .text(
        278,
        217, // The text under this must be formated like that.
        `Play the first note to make the character start
moving. Once you stop playing, the character 
will advance towards the next musical clef. 
New notes will appear at the clef, indicating 
the available directions. Play the correct note 
corresponding to the desired direction to move. 
Make sure to tune your instrument A = 442.`,
        {
          fontSize: '18px',
          fill: '#000',
          lineSpacing: 10,
          align: 'justify',
        }
      )
      .setDepth(101)
  }

  /**
   * Handles the click event of the return to menu button.
   */
  handleReturnToMenuButton() {
    this.infowindow.destroy()
    this.menuButton.destroy()
    this.instructionText.destroy()
  }

  /**
   * Updates the images of the radio buttons based on their selection state.
   */
  updateButtonImages() {
    this.radioButtons.forEach((button, index) => {
      const texture = button.selected ? 'emptyButton' : 'disabledButton'
      button.setTexture(texture)
    })
  }
}

export default Menu
