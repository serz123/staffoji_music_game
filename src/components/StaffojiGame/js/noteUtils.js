import Phaser from 'phaser'

/**
 * Utility class for handling notes in the game.
 */
class NoteUtils {
  /**
   * Creates an instance of NoteUtils.
   * @param {Phaser.Physics.Arcade.Sprite} player - The player sprite.
   * @param {object[]} images - An array of image objects.
   * @param {Phaser.GameObjects.Particles.ParticleEmitter[]} emitters - An array of particle emitters.
   * @param {Phaser.Scene} scene - The game scene.
   */
  constructor(player, images, emitters, scene) {
    this.player = player
    this.images = images
    this.emitters = emitters
    this.scene = scene
    this.notes = null
    this.arrow = null
  }

  /**
   * Shows the notes associated with a clef and stops the associated emitter.
   * @param {Phaser.Physics.Arcade.Sprite} player - The player sprite.
   * @param {Phaser.Physics.Arcade.Sprite} clef - The clef sprite.
   */
  showNotes(player, clef) {
    clef.disableBody(true, true)
    const associatedEmitter = this.emitters.find(
      (emm) =>
        emm.emitting &&
        Phaser.Geom.Intersects.RectangleToRectangle(
          emm.emitZones[0].source,
          clef.getBounds()
        )
    )
    if (associatedEmitter) {
      associatedEmitter.stop()
    }

    this.showDirections()
  }

  /**
   * Shows the directions for the notes.
   */
  showDirections() {
    const randomNumber1 = Math.floor(Math.random() * 17)
    let randomNumber2 = Math.floor(Math.random() * 17)
    let randomNumber3 = Math.floor(Math.random() * 17)

    while (randomNumber2 === randomNumber1) {
      randomNumber2 = Math.floor(Math.random() * 17)
    }

    while (randomNumber3 === randomNumber1 || randomNumber3 === randomNumber2) {
      randomNumber3 = Math.floor(Math.random() * 17)
    }

    this.notes = this.physics.add.staticGroup()

    this.notes
      .create(
        this.player.x + 92,
        this.player.y + 2,
        this.images[randomNumber1].image
      )
      .setScale(0.9)
    this.notes
      .create(
        this.player.x - 92,
        this.player.y + 2,
        this.images[randomNumber2].image
      )
      .setScale(0.9)
    this.notes
      .create(
        this.player.x,
        this.player.y - 106,
        this.images[randomNumber3].image
      )
      .setScale(0.9)

    // Make mask for note
    this.notes.getChildren().forEach((note) => {
      const width = note.width * 0.9
      const height = note.height * 0.9
      const maska = this.make
        .graphics()
        .fillStyle(0xffffff)
        .fillRoundedRect(
          note.x - width / 2, // X position of upper left corner
          note.y - height / 2, // Y position of upper left corner
          width,
          height,
          { tl: 10, tr: 10, bl: 10, br: 10 }
        )
      note.setMask(maska.createGeometryMask())
    })

    this.arrow = this.physics.add.staticGroup()

    this.arrow.create(this.player.x + 92, this.player.y - 62, 'arrowRight')
    this.arrow
      .create(this.player.x - 92, this.player.y - 62, 'arrowRight')
      .setFlipX(true)
    this.arrow
      .create(this.player.x, this.player.y - 182, 'jumpRight')
      .setAngle(50)
  }
}

export default NoteUtils
