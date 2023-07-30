import AudioContext from './contexts/AudioContext'

/**
 * Represents an audio frequency detector.
 */
class AudioFrequencyDetector {
  /**
   * Creates an instance of AudioFrequencyDetector.
   */
  constructor() {
    this.audioCtx = null
    this.analyserNode = null
    this.buf = null
    this.noteStrings = null
    this.source = null
    this.frequencyes = []
    this.toneDetected = false
    this.detectedTone = null
    this.toneDetectedTimeout = null // Added timeout property
    // Add a click event listener to the document
    document.addEventListener('startAudioContext', this.handleClick.bind(this))
  }

  /**
   * Handles the click event.
   */
  async handleClick() {
    this.audioCtx = AudioContext.getAudioContext()
    this.analyserNode = AudioContext.getAnalyser()
    const buflen = 2048
    this.buf = new Float32Array(buflen)
    this.noteStrings = [
      'C',
      'C#',
      'D',
      'D#',
      'E',
      'F',
      'F#',
      'G',
      'G#',
      'A',
      'A#',
      'B',
    ]
    this.start()

    // Remove the click event listener after the first click
    document.removeEventListener('click', this.handleClick.bind(this))
  }

  /**
   * Gets the microphone input.
   * @returns {Promise<MediaStream>} A promise that resolves with the microphone input stream.
   */
  getMicInput() {
    return navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        autoGainControl: false,
        noiseSuppression: false,
        latency: 0,
      },
    })
  }

  /**
   * Performs auto-correlation on the audio buffer to detect pitch.
   * @param {Float32Array} buf - The audio buffer.
   * @param {number} sampleRate - The sample rate of the audio.
   * @returns {number} The detected frequency.
   */
  autoCorrelate(buf, sampleRate) {
    let SIZE = buf.length
    const rms = this.checkVolumen(SIZE, buf)
    // Change this to adjust the sensitivity!!!!!!!!! // MAke it back to 0.13 later
    if (rms < 0.03)
      // not enough signal
      return -1

    let r1 = 0
    let r2 = SIZE - 1
    const thres = 0.2

    for (let i = 0; i < SIZE / 2; i++)
      if (Math.abs(buf[i]) < thres) {
        r1 = i
        break
      }
    for (let i = 1; i < SIZE / 2; i++)
      if (Math.abs(buf[SIZE - i]) < thres) {
        r2 = SIZE - i
        break
      }

    buf = buf.slice(r1, r2)
    SIZE = buf.length

    const c = new Array(SIZE).fill(0)
    for (let i = 0; i < SIZE; i++)
      for (let j = 0; j < SIZE - i; j++) c[i] = c[i] + buf[j] * buf[j + i]

    let d = 0
    while (c[d] > c[d + 1]) d++
    let maxval = -1,
      maxpos = -1
    for (let i = d; i < SIZE; i++) {
      if (c[i] > maxval) {
        maxval = c[i]
        maxpos = i
      }
    }
    let T0 = maxpos

    const x1 = c[T0 - 1],
      x2 = c[T0],
      x3 = c[T0 + 1]
    const a = (x1 + x3 - 2 * x2) / 2
    const b = (x3 - x1) / 2
    if (a) T0 = T0 - b / (2 * a)

    return sampleRate / T0
  }

  /**
   * Checks the volume of the audio signal.
   * @param {number} SIZE - The size of the buffer.
   * @param {Float32Array} buf - The audio buffer.
   * @returns {number} The volume level.
   */
  checkVolumen(SIZE, buf) {
    let rms = 0
    let val = 0
    for (let i = 0; i < SIZE; i++) {
      val = buf[i]
      rms += val * val
    }
    rms = Math.sqrt(rms / SIZE)
    return rms
  }

  /**
   * Converts a frequency to a note.
   * @param {number} frequency - The frequency value.
   * @returns {number} The note number.
   */
  noteFromPitch(frequency) {
    const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2))
    return Math.round(noteNum) + 69
  }

  /**
   * Starts the audio processing.
   */
  async start() {
    const input = await this.getMicInput()
    if (this.audioCtx.state === 'suspended') {
      await this.audioCtx.resume()
    }
    this.source = this.audioCtx.createMediaStreamSource(input)
    this.source.connect(this.analyserNode)
    this.updatePitch() // Start updating pitch after the source is connected
  }

  /**
   * Dispatches a custom event with the detected tone.
   * @param {string} tone - The detected tone.
   */
  dispatchToneDetectedEvent(tone) {
    // Dispatch a custom event with the detected tone
    const event = new CustomEvent('toneDetected', {
      detail: { tone },
    })
    document.dispatchEvent(event)
  }

  /**
   * Updates the pitch detection and detects tones.
   */
  updatePitch() {
    this.analyserNode.getFloatTimeDomainData(this.buf)
    const ac = this.autoCorrelate(this.buf, this.audioCtx.sampleRate)
    // Clear the previous timeout if exists
    clearTimeout(this.toneDetectedTimeout)
    if (ac > -1) {
      if (!this.toneDetected) {
        clearTimeout(this.waitingToneTimeout)
        const note = this.noteFromPitch(ac)
        const sym = this.noteStrings[note % 12]
        const scl = Math.floor(note / 12) - 1
        // console.log(note, sym, scl, ac)
        // Check if the frequency has been higher than -1 for cirka 1500 milliseconds
        if (this.frequencyes.length === 10) {
          // 15 fungerar for violin and 6 for piano max
          // Dispatch the tone detected event
          this.detectedTone = `${sym}${scl}`
          this.frequencyes = [] // Reset the frequencyes array
          this.toneDetected = true
          this.sendPitch()
        } else {
          // Add the frequency to the array if it is the same tone
          const areEqual = this.frequencyes.every(
            (item) => item.sym === sym && item.scl === scl
          )
          if (areEqual) {
            this.frequencyes.push({ sym, scl })
          } else {
            // Delete all the items in the array if the tone is different
            this.frequencyes = []
          }
          // console.log(this.frequencyes)
          this.toneDetectedTimeout = setTimeout(() => {
            this.updatePitch()
          }, 30) // Call updatePitch again after 1 millisecond or 20????
          // Change back to 1 if there is a problem with pitch detection
          // I put 30 beacause I do not want to send the pitch to often but it is still fast enough (33 times in 1 sec)
        }
      }
    } else {
      // If it is too quite and no tone detected, just update the pitch
      this.waitingToneTimeout = setTimeout(() => {
        this.updatePitch()
      }, 100)
    }
  }

  /**
   * Sends the detected pitch to the document.
   */
  sendPitch() {
    this.analyserNode.getFloatTimeDomainData(this.buf)
    const volumen = this.checkVolumen(this.buf.length, this.buf)
    if (volumen > 0.03) {
      this.sendPitchTimeout = setTimeout(() => {
        this.sendPitch()
      }, 300)
    } else {
      clearTimeout(this.sendPitchTimeout)
      this.dispatchToneDetectedEvent(this.detectedTone)
      this.toneDetected = false
      this.detectedTone = null
    }
  }
}

export default AudioFrequencyDetector
/*
// WrITE LICENCE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! https://alexanderell.is/posts/tuner/
// Remove audioContext!!!!!!!!!!!!!!!!!!!!!!!
// Povecati threchold ili dodati da se ton detektuje tek nakon 1000ms
*/
