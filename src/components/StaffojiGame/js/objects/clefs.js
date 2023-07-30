/**
 * Creates the clefs in the scene.
 * @param {Phaser.Scene} scene - The Phaser scene.
 * @param {string} selectedClef - The selected clef.
 * @returns {Phaser.Physics.Arcade.StaticGroup} The group of clefs.
 */
export function createClefs(scene, selectedClef) {
  const clefs = scene.physics.add.staticGroup()

  const specialFirstClef = clefs
    .create(30, 440, selectedClef)
    .setScale(0.75)
    .setDepth(2)
  specialFirstClef.directionInfo = {
    jumpDirection: 'right',
    noDirection: 'left',
  }
  specialFirstClef.setVisible(false)

  // platform x, y - 74
  clefs
    .create(716, 440, selectedClef)
    .setScale(0.75)
    .setDepth(2).directionInfo =
    // On first platform
    { jumpDirection: 'right' }

  clefs
    .create(1243, 284, selectedClef)
    .setScale(0.75)
    .setDepth(2).directionInfo =
    // On first flying platform
    { jumpDirection: 'right' }

  clefs
    .create(1798, 440, selectedClef)
    .setScale(0.75)
    .setDepth(2).directionInfo =
    // On second platform
    { jumpDirection: 'right', noDirection: 'right' }

  clefs
    .create(2576, 440, selectedClef)
    .setScale(0.75)
    .setDepth(2).directionInfo =
    // On second platform after stairs
    { jumpDirection: 'right', noDirection: 'left' }

  clefs
    .create(2944, 302, selectedClef)
    .setScale(0.75)
    .setDepth(2).directionInfo =
    // On second flying platform
    { jumpDirection: 'left', noDirection: 'left' }

  clefs
    .create(3262, 502, selectedClef)
    .setScale(0.75)
    .setDepth(2).directionInfo =
    // On third platform
    { jumpDirection: 'left' }

  clefs
    .create(3772, 502, selectedClef)
    .setScale(0.75)
    .setDepth(2).directionInfo =
    // On third platform
    { jumpDirection: 'right' }

  clefs
    .create(4274, 502, selectedClef)
    .setScale(0.75)
    .setDepth(2).directionInfo =
    // On fourth platform
    { jumpDirection: 'right' }

  clefs
    .create(4978, 502, selectedClef)
    .setScale(0.75)
    .setDepth(2).directionInfo =
    // On fourth platform
    { jumpDirection: 'right' }

  clefs
    .create(5616, 502, selectedClef)
    .setScale(0.75)
    .setDepth(2).directionInfo =
    // On fourth platform - end
    { jumpDirection: 'right' }

  clefs
    .create(6193, 308, selectedClef)
    .setScale(0.75)
    .setDepth(2).directionInfo =
    // On fourth platform - end
    { jumpDirection: 'right' }

  scene.tweens.add({
    targets: clefs.getChildren(),
    y: '+=10',
    duration: 2000,
    ease: 'Sine.easeInOut',
    yoyo: true,
    repeat: -1,
  })
  return clefs
}
