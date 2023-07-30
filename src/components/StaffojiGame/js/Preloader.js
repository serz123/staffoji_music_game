import Phaser from 'phaser'

// Menu
import menuMusic from '../audio/wlFantasy.mp3'
import menuBackground from '../images/bgGreen(1).png'
import emptyButton from '../images/menuButtons/emptyButton.png'
import playButton from '../images/menuButtons/playButton.png'
import restartButton from '../images/menuButtons/restartButton.png'
import homeButton from '../images/menuButtons/homeButton.png'
import infoButton from '../images/menuButtons/infoButton.png'
import largeEmptyButton from '../images/menuButtons/largeEmptyButton.png'
import disabledButton from '../images/menuButtons/disabledButton.png'
import windowPapper from '../images/menuButtons/window.png'

// Play
import bgMusic from '../audio/song18.mp3'
import coinSound from '../audio/completetask_0.mp3'
import deathSound from '../audio/surprisedchildmp3.mp3'

import background from '../images/bg.png'

import groundbrown1 from '../images/tiles/5.png'
import groundbrowngreen from '../images/tiles/2.png'
import groungbrowncurlyright from '../images/tiles/6.png'
import groundbrowngreencurlyright from '../images/tiles/3.png'
import groundbrowncurlyleft from '../images/tiles/4.png'
import groundbrowngreencurlyleft from '../images/tiles/1.png'
import groundFlyingLeft from '../images/tiles/13.png'
import groundFlyingMiddle from '../images/tiles/14.png'
import groundFlyingRight from '../images/tiles/15.png'
import groungbrowngreenupcurlyupright from '../images/tiles/7.png'
import groundbrowngreenupcurlyupleft from '../images/tiles/11.png'
import groundbrowncornerleft from '../images/tiles/8.png'
import groundbrowncornerright from '../images/tiles/10.png'
import groundflyingsquareleft from '../images/tiles/12.png'
import groundflyingsquareright from '../images/tiles/16.png'
import groundflyingsquaremiddle from '../images/tiles/9.png'

import water from '../images/tiles/18.png'
import watercurly from '../images/tiles/17.png'

// Objects
import tree1 from '../images/objects/Tree_1.png'
import tree2 from '../images/objects/Tree_2.png'
import tree3 from '../images/objects/Tree_3.png'
import coin from '../images/objects/Coin2.png'
import stone from '../images/objects/Stone.png'
import bush1 from '../images/objects/Bush (1).png'
import bush2 from '../images/objects/Bush (2).png'
import bush3 from '../images/objects/Bush (3).png'
import bush4 from '../images/objects/Bush (4).png'
import mushroom1 from '../images/objects/Mushroom_1.png'
import mushroom2 from '../images/objects/Mushroom_2.png'
import sign1 from '../images/objects/Sign_3.png'
import sign2 from '../images/objects/Sign_2.png'
import crate from '../images/objects/Crate.png'
import campfire from '../images/objects/fire.png'

// Player
import playerDead from '../images/player/dead.png'
import playerFall from '../images/player/fall.png'
import playerJump from '../images/player/jump.png'
import playerRun from '../images/player/run.png'
import playerHurt from '../images/player/hurt.png'
import playerIdle from '../images/player/idle.png'
import playerSlide from '../images/player/slide.png'
import playerWalk from '../images/player/walk.png'

// Clefs
import treble from '../images/clefs/treble.png' // 48 x 100
import alto from '../images/clefs/alto.png' // 67 x 86
import bass from '../images/clefs/bass.png' // 67 x 78 - It is too wide to have same proportions as treble
import flare from '../images/clefs/particle.png'

// Notes (treble)
import g from '../images/trebleNotes/g.webp'
import a from '../images/trebleNotes/a.webp'
import b from '../images/trebleNotes/b.webp'
import c1 from '../images/trebleNotes/c1.webp'
import d1 from '../images/trebleNotes/d1.webp'
import e1 from '../images/trebleNotes/e1.webp'
import fiss1 from '../images/trebleNotes/fiss1.webp'
import g1 from '../images/trebleNotes/g1.webp'
import a1 from '../images/trebleNotes/a1.webp'
import b1 from '../images/trebleNotes/b1.webp'
import ciss2 from '../images/trebleNotes/ciss2.webp'
import d2 from '../images/trebleNotes/d2.webp'
import e2 from '../images/trebleNotes/e2.webp'
import fiss2 from '../images/trebleNotes/fiss2.webp'
import giss2 from '../images/trebleNotes/giss2.webp'
import a2 from '../images/trebleNotes/a2.webp'
import b2 from '../images/trebleNotes/b2.webp'

// Notes - alt
import calto from '../images/altNotes/c.webp'
import dalto from '../images/altNotes/d.webp'
import ealto from '../images/altNotes/e.webp'
import falto from '../images/altNotes/f.webp'
import galto from '../images/altNotes/g.webp'
import aalto from '../images/altNotes/a.webp'
import balto from '../images/altNotes/b.webp'
import c1alto from '../images/altNotes/c1.webp'
import d1alto from '../images/altNotes/d1.webp'
import e1alto from '../images/altNotes/e1.webp'
import fiss1alto from '../images/altNotes/fiss1.webp'
import g1alto from '../images/altNotes/g1.webp'
import a1alto from '../images/altNotes/a1.webp'
import b1alto from '../images/altNotes/b1.webp'
import ciss2alto from '../images/altNotes/ciss2.webp'
import d2alto from '../images/altNotes/d2.webp'
import e2alto from '../images/altNotes/e2.webp'

// Notes (bass)
import C from '../images/bassNotes/C.webp'
import D from '../images/bassNotes/D.webp'
import E from '../images/bassNotes/E.webp'
import F from '../images/bassNotes/F.webp'
import G from '../images/bassNotes/G.webp'
import A from '../images/bassNotes/A.webp'
import B from '../images/bassNotes/B.webp'
import c from '../images/bassNotes/c-small.webp'
import d from '../images/bassNotes/d-small.webp'
import e from '../images/bassNotes/e-small.webp'
import fiss from '../images/bassNotes/fiss-small.webp'
import gBass from '../images/bassNotes/g-small.webp'
import aBass from '../images/bassNotes/a-small.webp'
import bBass from '../images/bassNotes/b-small.webp'
import ciss1Bass from '../images/bassNotes/ciss1.webp'
import d1Bass from '../images/bassNotes/d1.webp'

// Arrows
import arrowRight from '../images/arrows/right.png'
import jumpRight from '../images/arrows/jumpRight.png'

/**
 * The preloader scene responsible for loading game assets.
 */
class Preloader extends Phaser.Scene {
  /**
   * Creates an instance of Preloader.
   */
  constructor() {
    super('Preloader')
  }

  /**
   * Preloads game assets.
   */
  preload() {
    // Menu and buttons
    this.load.audio('menuMusic', menuMusic) //90 x 90
    this.load.image('menuBg', menuBackground)
    this.load.image('emptyButton', emptyButton)
    this.load.image('playButton', playButton)
    this.load.image('infoButton', infoButton)
    this.load.image('largeEmptyButton', largeEmptyButton)
    this.load.image('restartButton', restartButton)
    this.load.image('homeButton', homeButton)
    this.load.image('disabledButton', disabledButton)
    this.load.image('window', windowPapper) // 625 x 500

    // Music
    this.load.audio('bgMusic', bgMusic)
    this.load.audio('coinSound', coinSound)
    this.load.audio('deathSound', deathSound)

    this.load.image('background', background)

    // Ground 64x64
    this.load.image('groundBrown', groundbrown1)
    this.load.image('groundBrownGreenUp', groundbrowngreen)
    this.load.image('groundBrownCurlyRight', groungbrowncurlyright)
    this.load.image('groundBrownGreenCurlyRight', groundbrowngreencurlyright)
    this.load.image('groundBrownCurlyLeft', groundbrowncurlyleft)
    this.load.image('groundBrownGreenCurlyLeft', groundbrowngreencurlyleft)
    this.load.image(
      'groundBrownGreenUpCurlyUpRight',
      groungbrowngreenupcurlyupright
    )
    this.load.image(
      'groundBrownGreenUpCurlyUpLeft',
      groundbrowngreenupcurlyupleft
    )
    this.load.image('groundBrownCornerLeft', groundbrowncornerleft)
    this.load.image('groundBrownCornerRight', groundbrowncornerright)

    this.load.image('groundFlyingLeft', groundFlyingLeft) // 64 x 47
    this.load.image('groundFlyingMiddle', groundFlyingMiddle)
    this.load.image('groundFlyingRight', groundFlyingRight)
    this.load.image('groundFlyingSquareLeft', groundflyingsquareleft)
    this.load.image('groundFlyingSquareRight', groundflyingsquareright)
    this.load.image('groundFlyingSquareMiddle', groundflyingsquaremiddle)

    // Water
    this.load.image('water', water)
    this.load.image('waterCurly', watercurly)

    // Objects
    this.load.image('tree1', tree1)
    this.load.image('tree2', tree2) // 282 x 301
    this.load.image('tree3', tree3) // 282 x 275
    this.load.image('bush1', bush1) // 133 x 65
    this.load.image('bush2', bush2) // 133 x 65
    this.load.image('bush3', bush3) // 73 x 46
    this.load.image('bush4', bush4) // 73 x 46
    this.load.image('mushroom1', mushroom1) // 49 * 41
    this.load.image('mushroom2', mushroom2) // 50 x 41
    this.load.image('sign1', sign1) // 63 x 65
    this.load.image('sign2', sign2) // 63 x 65
    this.load.image('crate', crate) // 64 x 64

    this.load.spritesheet('campFire', campfire, {
      frameWidth: 64,
      frameHeight: 64,
    }) // 64 x 64

    this.load.image('stone', stone)

    this.load.spritesheet('coin', coin, {
      frameWidth: 60,
      frameHeight: 60, // If coin3 or coin4, frameHeight: 61
    })

    this.load.spritesheet('playerIdle', playerIdle, {
      frameWidth: 68,
      frameHeight: 108,
    })

    this.load.spritesheet('playerDeath', playerDead, {
      frameWidth: 137,
      frameHeight: 120,
    })

    this.load.spritesheet('playerFall', playerFall, {
      frameWidth: 128,
      frameHeight: 100,
      frameSpacing: { x: 0, y: 4 },
    })

    //68x113
    this.load.spritesheet('playerJump', playerJump, {
      frameWidth: 68,
      frameHeight: 110,
    })

    this.load.spritesheet('playerRun', playerRun, {
      frameWidth: 128,
      frameHeight: 100,
      frameSpacing: { x: 0, y: 4 },
    })

    this.load.spritesheet('playerHurt', playerHurt, {
      frameWidth: 128,
      frameHeight: 100,
      frameSpacing: { x: 0, y: 4 },
    })

    this.load.spritesheet('playerSlide', playerSlide, {
      frameWidth: 128,
      frameHeight: 100,
      frameSpacing: { x: 0, y: 4 },
    })

    // 68x113
    this.load.spritesheet('playerWalk', playerWalk, {
      frameWidth: 67.9,
      frameHeight: 109,
      frameSpacing: { x: 0, y: 4 },
    })

    // Clefs
    this.load.image('treble', treble)
    this.load.image('alto', alto)
    this.load.image('bass', bass)
    this.load.image('flare', flare) // Sparcle

    // Notes (treble) 112 x 112
    this.load.image('g', g)
    this.load.image('a', a)
    this.load.image('b', b)
    this.load.image('c1', c1)
    this.load.image('d1', d1)
    this.load.image('e1', e1)
    this.load.image('f#1', fiss1)
    this.load.image('g1', g1)
    this.load.image('a1', a1)
    this.load.image('b1', b1)
    this.load.image('c#2', ciss2)
    this.load.image('d2', d2)
    this.load.image('e2', e2)
    this.load.image('f#2', fiss2)
    this.load.image('g#2', giss2)
    this.load.image('a2', a2)
    this.load.image('b2', b2)

    // Notes (alto) 112 x 112
    this.load.image('c-Alto', calto)
    this.load.image('d-Alto', dalto)
    this.load.image('e-Alto', ealto)
    this.load.image('f-Alto', falto)
    this.load.image('g-Alto', galto)
    this.load.image('a-Alto', aalto)
    this.load.image('b-Alto', balto)
    this.load.image('c1-Alto', c1alto)
    this.load.image('d1-Alto', d1alto)
    this.load.image('e1-Alto', e1alto)
    this.load.image('fiss1-Alto', fiss1alto)
    this.load.image('g1-Alto', g1alto)
    this.load.image('a1-Alto', a1alto)
    this.load.image('b1-Alto', b1alto)
    this.load.image('ciss2-Alto', ciss2alto)
    this.load.image('d2-Alto', d2alto)
    this.load.image('e2-Alto', e2alto)

    // Notes (bass) 112 x 112
    this.load.image('C-Bass', C)
    this.load.image('D-Bass', D)
    this.load.image('E-Bass', E)
    this.load.image('F-Bass', F)
    this.load.image('G-Bass', G)
    this.load.image('A-Bass', A)
    this.load.image('B-Bass', B)
    this.load.image('c-Bass', c)
    this.load.image('d-Bass', d)
    this.load.image('e-Bass', e)
    this.load.image('fiss-Bass', fiss)
    this.load.image('g-Bass', gBass)
    this.load.image('a-Bass', aBass)
    this.load.image('b-Bass', bBass)
    this.load.image('ciss1-Bass', ciss1Bass)
    this.load.image('d1-Bass', d1Bass)

    // Arrows 50 x 28
    this.load.image('arrowRight', arrowRight)
    this.load.image('jumpRight', jumpRight)

    /* this.load.audio('bongo', 'bongojam_f.mp3');
    this.load.audio('pop', 'pop.mp3');
    this.load.audio('draw', 'draw.mp3');

    this.load.image('font', 'font/font.png');
    this.load.json('fontData', 'font/font.json');

    this.load.atlas('tomato', 'tomato/tomato.png', 'tomato/tomato_atlas.json');
    this.load.animation('tomatoAnim', 'tomato/tomato_anim.json'); 

    this.load.on('complete', () => {

        this.sound.play('bongo', { loop: true });

        const fontData = this.cache.json.get('fontData');
        this.cache.bitmapFont.add('pixelFont', Phaser.GameObjects.RetroFont.Parse(this, fontData));

        this.scene.start('Menu');
    });*/
    this.load.on('complete', () => {
      this.scene.start('Menu', { audio: this.audio })
    })
  }
}
export default Preloader
