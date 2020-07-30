import { musicPlayerInit } from './musicPlayer.js'
import { radioPlayerInit } from './radioPlayer.js'
import { videoPlayerInit } from './videoPlayer.js'

const playerBtn = document.querySelectorAll('.player-btn')
const playerBlock = document.querySelectorAll('.player-block')
const temp = document.querySelector('.temp')


const deactivatePlayer = () => {
  temp.style.display = 'none'
  playerBtn.forEach(item => item.classList.remove('active'))
  playerBlock.forEach(item => item.classList.remove('active'))

  // stop playback when switching tabs
  videoPlayerInit.stop()
  musicPlayerInit.stop()
  radioPlayerInit.stop()
}

playerBtn.forEach((btn, i) => btn.addEventListener('click', () => {
  deactivatePlayer()
  btn.classList.add('active')
  playerBlock[i].classList.add('active')
}))

videoPlayerInit()
musicPlayerInit()
radioPlayerInit()
