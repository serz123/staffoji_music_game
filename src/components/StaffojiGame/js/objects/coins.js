/**
 * Creates and configures the coins in the scene.
 * @param {Phaser.Scene} scene - The Phaser scene.
 * @returns {Phaser.Physics.Arcade.StaticGroup} The group of coins.
 */
export function createCoins(scene) {
  // Check if the animation with the key "coinanim" already exists
  if (!scene.anims.exists('coinanim')) {
    scene.anims.create({
      key: 'coinanim',
      frames: scene.anims.generateFrameNumbers('coin', {
        start: 0,
        end: 5,
      }),
      frameRate: 6,
      repeat: -1,
      repeatDelay: 3000,
    })
  }

  const coins = scene.physics.add.staticGroup()
  const coin1 = coins.create(1100, 296).setScale(0.8)
  coin1.anims.play('coinanim', true)
  // On second flying platform
  const coin2 = coins.create(3020, 318).setScale(0.8) // Platform y - 62 ( + 8 / 9 if flying pl)
  coin2.anims.play('coinanim', true)
  const coin3 = coins.create(3070, 318).setScale(0.8) // Platform y - 62 ( + 8 / 9 if flying pl)
  coin3.anims.play('coinanim', true)
  const coin4 = coins.create(3120, 318).setScale(0.8) // Platform y - 62 ( + 8 / 9 if flying pl)
  coin4.anims.play('coinanim', true)

  // Under 4th flying platform
  const coin5 = coins.create(5148, 512).setScale(0.8)
  coin5.anims.play('coinanim', true)

  const coin6 = coins.create(5208, 512).setScale(0.8)
  coin6.anims.play('coinanim', true)

  const coin7 = coins.create(5268, 512).setScale(0.8)
  coin7.anims.play('coinanim', true)

  // on pl3 - flying
  const coin8 = coins.create(4468, 314).setScale(0.8)
  coin8.anims.play('coinanim', true)
  // last jump
  const coin9 = coins.create(6300, 160).setScale(0.8)
  coin9.anims.play('coinanim', true)
  const coin10 = coins.create(6350, 190).setScale(0.8)
  coin10.anims.play('coinanim', true)
  const coin11 = coins.create(6388, 232).setScale(0.8)
  coin11.anims.play('coinanim', true)
  const coin12 = coins.create(6407, 283).setScale(0.8)
  coin12.anims.play('coinanim', true)

  // Rotate
  scene.tweens.add({
    targets: coins.getChildren(),
    angle: -10,
    duration: 1000,
    yoyo: true,
    repeat: -1,
  })

  // Animation for moving coins
  scene.tweens.add({
    targets: coins.getChildren(),
    y: '+=1',
    x: '+=1',
    duration: 2000,
    ease: 'Sine.easeInOut',
    yoyo: true,
    repeat: -1,
  })

  return coins
}
