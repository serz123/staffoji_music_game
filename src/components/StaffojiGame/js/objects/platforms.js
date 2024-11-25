/**
 * Creates and configures the platforms in the scene.
 * @param {Phaser.Scene} scene - The Phaser scene.
 * @returns {Phaser.Physics.Arcade.StaticGroup} The group of platforms.
 */
export function createPlatforms(scene) {
  const platforms = scene.physics.add.staticGroup()

  // Pl1
  platforms.create(32, 638, 'groundBrown')
  platforms.create(32, 574, 'groundBrown')
  platforms.create(32, 514, 'groundBrownGreenUp')
  platforms.create(96, 638, 'groundBrown')
  platforms.create(96, 574, 'groundBrown')
  platforms.create(96, 514, 'groundBrownGreenUp')
  platforms.create(160, 638, 'groundBrown')
  platforms.create(160, 574, 'groundBrown')
  platforms.create(160, 514, 'groundBrownGreenUp')
  platforms.create(204, 638, 'groundBrown')
  platforms.create(204, 574, 'groundBrown')
  platforms.create(204, 514, 'groundBrownGreenUp')
  platforms.create(268, 638, 'groundBrown')
  platforms.create(268, 574, 'groundBrown')
  platforms.create(268, 514, 'groundBrownGreenUp')
  platforms.create(332, 638, 'groundBrown')
  platforms.create(332, 574, 'groundBrown')
  platforms.create(332, 514, 'groundBrownGreenUp')
  platforms.create(396, 638, 'groundBrown')
  platforms.create(396, 574, 'groundBrown')
  platforms.create(396, 514, 'groundBrownGreenUp')
  platforms.create(460, 638, 'groundBrown')
  platforms.create(460, 574, 'groundBrown')
  platforms.create(460, 514, 'groundBrownGreenUp')
  platforms.create(524, 638, 'groundBrown')
  platforms.create(524, 574, 'groundBrown')
  platforms.create(524, 514, 'groundBrownGreenUp')
  platforms.create(588, 638, 'groundBrown')
  platforms.create(588, 574, 'groundBrown')
  platforms.create(588, 514, 'groundBrownGreenUp')
  platforms.create(652, 638, 'groundBrown')
  platforms.create(652, 574, 'groundBrown')
  platforms.create(652, 514, 'groundBrownGreenUp')
  platforms.create(714, 638, 'groundBrownCurlyRight')
  platforms.create(714, 574, 'groundBrownCurlyRight')
  platforms.create(714, 514, 'groundBrownGreenCurlyRight')

  // pl1 - flying
  platforms.create(869, 350, 'groundFlyingLeft')
  platforms.create(933, 350, 'groundFlyingMiddle')
  platforms.create(997, 350, 'groundFlyingMiddle')
  platforms.create(1061, 350, 'groundFlyingMiddle')
  platforms.create(1125, 350, 'groundFlyingMiddle')
  platforms.create(1189, 350, 'groundFlyingMiddle')
  platforms.create(1243, 350, 'groundFlyingRight')

  //pl2 - ground
  platforms.create(1520, 638, 'groundBrownCurlyLeft')
  platforms.create(1520, 574, 'groundBrownCurlyLeft')
  platforms.create(1520, 514, 'groundBrownGreenCurlyLeft')
  platforms.create(1562, 638, 'groundBrown')
  platforms.create(1562, 574, 'groundBrown')
  platforms.create(1562, 514, 'groundBrownGreenUp')
  platforms.create(1626, 638, 'groundBrown')
  platforms.create(1626, 574, 'groundBrown')
  platforms.create(1626, 514, 'groundBrownGreenUp')
  platforms.create(1690, 638, 'groundBrown')
  platforms.create(1690, 574, 'groundBrown')
  platforms.create(1690, 514, 'groundBrownGreenUp')
  platforms.create(1754, 638, 'groundBrown')
  platforms.create(1754, 574, 'groundBrown')
  platforms.create(1754, 514, 'groundBrownGreenUp')
  platforms.create(1818, 638, 'groundBrown')
  platforms.create(1818, 574, 'groundBrown')
  platforms.create(1818, 514, 'groundBrownGreenUpCurlyUpRight')
  platforms.create(1882, 638, 'groundBrown')
  platforms.create(1882, 574, 'groundBrown')
  platforms.create(1882, 514, 'groundBrownCornerLeft')
  platforms.create(1882, 450, 'groundBrownCurlyLeft') // little shorter 63 (all curly left and right)
  platforms.create(1882, 386, 'groundBrownCurlyLeft')
  platforms.create(1882, 322, 'groundBrownGreenCurlyLeft')
  // Stairs
  platforms.create(1944, 638, 'groundBrown')
  platforms.create(1944, 574, 'groundBrown')
  platforms.create(1944, 514, 'groundBrown')
  platforms.create(1944, 450, 'groundBrown')
  platforms.create(1944, 386, 'groundBrown')
  platforms.create(1944, 322, 'groundBrownGreenUp')
  platforms.create(2006, 638, 'groundBrown')
  platforms.create(2006, 574, 'groundBrown')
  platforms.create(2006, 514, 'groundBrown')
  platforms.create(2006, 450, 'groundBrown')
  platforms.create(2006, 386, 'groundBrownCornerRight')
  platforms.create(2006, 322, 'groundBrownGreenCurlyRight')
  // 2nd stair
  platforms.create(2070, 638, 'groundBrown')
  platforms.create(2070, 574, 'groundBrown')
  platforms.create(2070, 514, 'groundBrown')
  platforms.create(2070, 450, 'groundBrown')
  platforms.create(2070, 386, 'groundBrownGreenUpCurlyUpLeft')
  platforms.create(2134, 638, 'groundBrown')
  platforms.create(2134, 574, 'groundBrown')
  platforms.create(2134, 514, 'groundBrown')
  platforms.create(2134, 450, 'groundBrown')
  platforms.create(2134, 386, 'groundBrownGreenUp')
  platforms.create(2196, 638, 'groundBrown')
  platforms.create(2196, 574, 'groundBrown')
  platforms.create(2196, 514, 'groundBrown')
  platforms.create(2196, 450, 'groundBrownCornerRight')
  platforms.create(2196, 386, 'groundBrownGreenCurlyRight')
  // 3rd stair
  platforms.create(2260, 638, 'groundBrown')
  platforms.create(2260, 574, 'groundBrown')
  platforms.create(2260, 514, 'groundBrown')
  platforms.create(2260, 450, 'groundBrownGreenUpCurlyUpLeft')
  platforms.create(2324, 638, 'groundBrown')
  platforms.create(2324, 574, 'groundBrown')
  platforms.create(2324, 514, 'groundBrown')
  platforms.create(2324, 450, 'groundBrownGreenUp')
  platforms.create(2386, 638, 'groundBrown')
  platforms.create(2386, 574, 'groundBrown')
  platforms.create(2386, 514, 'groundBrownCornerRight')
  platforms.create(2386, 450, 'groundBrownGreenCurlyRight')
  // End of stairs
  platforms.create(2450, 638, 'groundBrown')
  platforms.create(2450, 574, 'groundBrown')
  platforms.create(2450, 514, 'groundBrownGreenUpCurlyUpLeft')
  platforms.create(2514, 638, 'groundBrown')
  platforms.create(2514, 574, 'groundBrown')
  platforms.create(2514, 514, 'groundBrownGreenUp')
  platforms.create(2576, 638, 'groundBrownCurlyRight')
  platforms.create(2576, 574, 'groundBrownCurlyRight')
  platforms.create(2576, 514, 'groundBrownGreenCurlyRight')

  // pl3 - ground
  platforms.create(2816, 638, 'groundBrownCurlyLeft')
  platforms.create(2816, 574, 'groundBrownGreenCurlyLeft')
  platforms.create(2878, 638, 'groundBrown')
  platforms.create(2878, 574, 'groundBrownGreenUp')
  platforms.create(2942, 638, 'groundBrown')
  platforms.create(2942, 574, 'groundBrownGreenUp')
  platforms.create(3006, 638, 'groundBrown')
  platforms.create(3006, 574, 'groundBrownGreenUp')
  platforms.create(3070, 638, 'groundBrown')
  platforms.create(3070, 574, 'groundBrownGreenUp')
  platforms.create(3134, 638, 'groundBrown')
  platforms.create(3134, 574, 'groundBrownGreenUp')
  platforms.create(3198, 638, 'groundBrown')
  platforms.create(3198, 574, 'groundBrownGreenUp')
  platforms.create(3262, 638, 'groundBrown')
  platforms.create(3262, 574, 'groundBrownGreenUp')
  platforms.create(3326, 638, 'groundBrown')
  platforms.create(3326, 574, 'groundBrownGreenUp') // Clef
  platforms.create(3390, 638, 'groundBrown')
  platforms.create(3390, 574, 'groundBrownGreenUp')
  platforms.create(3454, 638, 'groundBrown')
  platforms.create(3454, 574, 'groundBrownGreenUp')
  platforms.create(3518, 638, 'groundBrown')
  platforms.create(3518, 574, 'groundBrownGreenUp')
  platforms.create(3582, 638, 'groundBrown')
  platforms.create(3582, 574, 'groundBrownGreenUp')
  platforms.create(3646, 638, 'groundBrown')
  platforms.create(3646, 574, 'groundBrownGreenUp')
  platforms.create(3710, 638, 'groundBrown')
  platforms.create(3710, 574, 'groundBrownGreenUp')
  platforms.create(3772, 638, 'groundBrownCurlyRight')
  platforms.create(3772, 574, 'groundBrownGreenCurlyRight') // Clef

  // pl2 - flying
  platforms.create(3110, 370, 'groundFlyingRight')
  platforms.create(3048, 370, 'groundFlyingMiddle')
  platforms.create(2984, 370, 'groundFlyingMiddle')
  platforms.create(2920, 370, 'groundFlyingMiddle')
  platforms.create(2858, 370, 'groundFlyingLeft')

  // pl4
  platforms.create(4020, 638, 'groundBrownCurlyLeft')
  platforms.create(4020, 574, 'groundBrownGreenCurlyLeft')
  platforms.create(4082, 638, 'groundBrown')
  platforms.create(4082, 574, 'groundBrownGreenUp')
  platforms.create(4146, 638, 'groundBrown')
  platforms.create(4146, 574, 'groundBrownGreenUp')
  platforms.create(4210, 638, 'groundBrown')
  platforms.create(4210, 574, 'groundBrownGreenUp')
  platforms.create(4274, 638, 'groundBrown')
  platforms.create(4274, 574, 'groundBrownGreenUp') // clef
  platforms.create(4338, 638, 'groundBrown')
  platforms.create(4338, 574, 'groundBrownGreenUp')
  platforms.create(4402, 638, 'groundBrown')
  platforms.create(4402, 574, 'groundBrownGreenUp') // fire 1
  platforms.create(4466, 638, 'groundBrown')
  platforms.create(4466, 574, 'groundBrownGreenUp') // fire 2
  platforms.create(4530, 638, 'groundBrown')
  platforms.create(4530, 574, 'groundBrownGreenUp')
  platforms.create(4594, 638, 'groundBrown')
  platforms.create(4594, 574, 'groundBrownGreenUp')
  platforms.create(4658, 638, 'groundBrown')
  platforms.create(4658, 574, 'groundBrownGreenUp')
  platforms.create(4722, 638, 'groundBrown')
  platforms.create(4722, 574, 'groundBrownGreenUp')
  platforms.create(4786, 638, 'groundBrown')
  platforms.create(4786, 574, 'groundBrownGreenUp')
  platforms.create(4850, 638, 'groundBrown')
  platforms.create(4850, 574, 'groundBrownGreenUp')
  platforms.create(4914, 638, 'groundBrown')
  platforms.create(4914, 574, 'groundBrownGreenUp')
  platforms.create(4978, 638, 'groundBrown')
  platforms.create(4978, 574, 'groundBrownGreenUp') // clef
  platforms.create(5042, 638, 'groundBrown')
  platforms.create(5042, 574, 'groundBrownGreenUp')
  platforms.create(5106, 638, 'groundBrown')
  platforms.create(5106, 574, 'groundBrownGreenUp')
  platforms.create(5170, 638, 'groundBrown')
  platforms.create(5170, 574, 'groundBrownGreenUp')
  platforms.create(5234, 638, 'groundBrown')
  platforms.create(5234, 574, 'groundBrownGreenUp')
  platforms.create(5298, 638, 'groundBrown')
  platforms.create(5298, 574, 'groundBrownGreenUp')
  platforms.create(5362, 638, 'groundBrown')
  platforms.create(5362, 574, 'groundBrownGreenUp')
  platforms.create(5426, 638, 'groundBrown')
  platforms.create(5426, 574, 'groundBrownGreenUp')
  platforms.create(5490, 638, 'groundBrown')
  platforms.create(5490, 574, 'groundBrownGreenUp')
  platforms.create(5554, 638, 'groundBrown')
  platforms.create(5554, 574, 'groundBrownGreenUp')
  platforms.create(5616, 638, 'groundBrownCurlyRight')
  platforms.create(5616, 574, 'groundBrownGreenCurlyRight') // clef

  // pl3 - flying
  platforms.create(4434, 370, 'groundFlyingLeft')
  platforms.create(4498, 370, 'groundFlyingRight')

  // pl4 - flying
  platforms.create(5121, 398, 'groundFlyingSquareLeft').setAngle(5)
  platforms.create(5121, 375, 'groundBrownGreenCurlyLeft')
  platforms.create(5177, 398, 'groundFlyingSquareMiddle')
  platforms.create(5177, 375, 'groundBrownGreenUp')
  platforms.create(5295, 398, 'groundFlyingSquareRight').setAngle(-5) // Coins are under this pl
  platforms.create(5295, 375, 'groundBrownGreenCurlyRight')
  platforms.create(5241, 398, 'groundFlyingSquareMiddle')
  platforms.create(5241, 375, 'groundBrownGreenUp')

  // Pl 5
  platforms.create(5802, 638, 'groundBrownCurlyLeft')
  platforms.create(5802, 574, 'groundBrownCurlyLeft')
  platforms.create(5802, 510, 'groundBrownCurlyLeft')
  platforms.create(5802, 446, 'groundBrownCurlyLeft')
  platforms.create(5802, 382, 'groundBrownGreenCurlyLeft')
  platforms.create(5864, 638, 'groundBrown')
  platforms.create(5864, 574, 'groundBrown')
  platforms.create(5864, 510, 'groundBrown')
  platforms.create(5864, 446, 'groundBrown')
  platforms.create(5864, 382, 'groundBrownGreenUp')
  platforms.create(5928, 638, 'groundBrown')
  platforms.create(5928, 574, 'groundBrown')
  platforms.create(5928, 510, 'groundBrown')
  platforms.create(5928, 446, 'groundBrown')
  platforms.create(5928, 382, 'groundBrownGreenUp')
  platforms.create(5992, 638, 'groundBrown')
  platforms.create(5992, 574, 'groundBrown')
  platforms.create(5992, 510, 'groundBrown')
  platforms.create(5992, 446, 'groundBrown')
  platforms.create(5992, 382, 'groundBrownGreenUp')
  platforms.create(6056, 638, 'groundBrown')
  platforms.create(6056, 574, 'groundBrown')
  platforms.create(6056, 510, 'groundBrown')
  platforms.create(6056, 446, 'groundBrown')
  platforms.create(6056, 382, 'groundBrownGreenUp')
  platforms.create(6120, 638, 'groundBrown')
  platforms.create(6120, 574, 'groundBrown')
  platforms.create(6120, 510, 'groundBrown')
  platforms.create(6120, 446, 'groundBrown')
  platforms.create(6120, 382, 'groundBrownGreenUp')
  platforms.create(6182, 638, 'groundBrown')
  platforms.create(6182, 574, 'groundBrownCornerRight')
  platforms.create(6182, 510, 'groundBrownCurlyRight')
  platforms.create(6182, 446, 'groundBrownCurlyRight')
  platforms.create(6182, 382, 'groundBrownGreenCurlyRight') // Clef
  platforms.create(6246, 638, 'groundBrown')
  platforms.create(6246, 574, 'groundBrownGreenUpCurlyUpLeft')
  platforms.create(6310, 638, 'groundBrown')
  platforms.create(6310, 574, 'groundBrownGreenUp')
  platforms.create(6374, 638, 'groundBrown')
  platforms.create(6374, 574, 'groundBrownGreenUp')
  platforms.create(6438, 638, 'groundBrown')
  platforms.create(6438, 574, 'groundBrownGreenUp')
  platforms.create(6502, 638, 'groundBrown')
  platforms.create(6502, 574, 'groundBrownGreenUp')
  platforms.create(6566, 638, 'groundBrown')
  platforms.create(6566, 574, 'groundBrownGreenUp')
  platforms.create(6630, 638, 'groundBrown')
  platforms.create(6630, 574, 'groundBrownGreenUp')
  platforms.create(6694, 638, 'groundBrown')
  platforms.create(6694, 574, 'groundBrownGreenUp')
  platforms.create(6758, 638, 'groundBrown')
  platforms.create(6758, 574, 'groundBrownGreenUp') // End sign
  platforms.create(6822, 638, 'groundBrown')
  platforms.create(6822, 574, 'groundBrownGreenUp')
  platforms.create(6886, 638, 'groundBrown')
  platforms.create(6886, 574, 'groundBrownGreenUp')
  platforms.create(6950, 638, 'groundBrown')
  platforms.create(6950, 574, 'groundBrownGreenUp')
  platforms.create(7014, 638, 'groundBrown')
  platforms.create(7014, 574, 'groundBrownGreenUp')
  platforms.create(7078, 638, 'groundBrown')
  platforms.create(7078, 574, 'groundBrownGreenUp')
  platforms.create(7142, 638, 'groundBrown')
  platforms.create(7142, 574, 'groundBrownGreenUp')
  platforms.create(7206, 638, 'groundBrown')
  platforms.create(7206, 574, 'groundBrownGreenUp')
  platforms.create(7270, 638, 'groundBrown')
  platforms.create(7270, 574, 'groundBrownGreenUp')

  platforms.refresh()

  return platforms
}
