/**
 * Creates and configures the fire in the scene.
 * @param {Phaser.Scene} scene - The Phaser scene.
 * @returns {Phaser.Physics.Arcade.StaticGroup} The group of fire.
 */
export function createFire(scene) {
  const fire = scene.physics.add.staticGroup()

  // Check if the animation with the key "fireanim" already exists
  if (!scene.anims.exists('fireanim')) {
    scene.anims.create({
      key: 'fireanim',
      frames: scene.anims.generateFrameNumbers('campFire', {
        start: 0,
        end: 59,
      }),
      frameRate: 10,
      repeat: -1,
    })
  }

  // On 4th platform
  const fire1 = fire.create(4438, 493).setScale(2)
  fire1.anims.play('fireanim', true)
  const fire2 = fire.create(4498, 493).setScale(2)
  fire2.anims.play('fireanim', true)

  return fire
}
