import { addZero } from './utils.js'

export const musicPlayerInit = () => {

  // layout elements with which we have to interact
  const audio = document.querySelector('.audio')
  const audioImg = document.querySelector('.audio-img')
  const audioHeader = document.querySelector('.audio-header')
  const audioPlayer = document.querySelector('.audio-player')
  const audioNavigation = document.querySelector('.audio-navigation')
  const audioButtonPlay = document.querySelector('.audio-button__play')
  const audioProgress = document.querySelector('.audio-progress')
  const audioProgressTiming = document.querySelector('.audio-progress__timing')
  const audioTimePassed = document.querySelector('.audio-time__passed')
  const audioTimeTotal = document.querySelector('.audio-time__total')

  const playlist = ['flow', 'hello', 'speed']
  let trackIndex = 0

  //  Switch to a new music track & preparing it for playback
  const loadTrack = () => {
    const isPlayed = audioPlayer.paused
    const track = playlist[trackIndex]

    audioPlayer.src = `./audio/${track}.mp3`
    audioImg.src = `./audio/${track}.jpg`
    audioHeader.textContent = track.toUpperCase()

    if (isPlayed) {
      audioPlayer.pause()
    } else {
      audioPlayer.play()
    }
  }

  // preparing the previous melody for playback
  const prevTrack = () => {
    if (trackIndex !== 0) {
      trackIndex--
    } else {
      trackIndex = playlist.length - 1
    }
    loadTrack()
  }

  //  preparing the next melody for playback
  const nextTrack = () => {
    if (trackIndex == playlist.length - 1) {
      trackIndex = 0
    } else {
      trackIndex++
    }
    loadTrack()
  }

  audioNavigation.addEventListener('click', ({ target }) => {

    if (target.classList.contains('audio-button__play')) {

      audio.classList.toggle('play')
      audioButtonPlay.classList.toggle('fa-play')
      audioButtonPlay.classList.toggle('fa-pause')

      if (audioPlayer.paused) {
        audioPlayer.play()
      } else {
        audioPlayer.pause()
      }

      const track = playlist[trackIndex]
      audioHeader.textContent = track.toUpperCase()
    }

    if (target.classList.contains('audio-button__prev')) {
      prevTrack()
    }

    if (target.classList.contains('audio-button__next')) {
      nextTrack()
    }
  })

  /* more about the events ended & timeupdate loook here 
  */ https://developer.mozilla.org/ru/docs/Web/API/HTMLMediaElement

  //  ended event fires when playback stops
  audioPlayer.addEventListener('ended', () => {
    nextTrack()
    audioPlayer.play()
  })

  //  the timeudate event is fired when the time indicated by the currentTime attribute has been updated
  audioPlayer.addEventListener('timeupdate', () => {
    const duration = audioPlayer.duration
    const currentTime = audioPlayer.currentTime
    const progress = (currentTime / duration) * 100

    audioProgressTiming.style.width = progress + '%'

    const minutesPassed = Math.floor(currentTime / 60 || '0')
    const secondsPassed = Math.floor(currentTime % 60 || '0')

    const minutesTotal = Math.floor(duration / 60 || '0')
    const secondsTotal = Math.floor(duration % 60 || '0')

    audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`
    audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`
  })

  // change the start time of the track
  audioProgress.addEventListener('click', ({ offsetX }) => {
    const x = offsetX
    const allWidth = audioProgress.clientWidth
    const progress = (x / allWidth) * audioPlayer.duration
    audioPlayer.currentTime = progress

  })

  musicPlayerInit.stop = () => {
    console.dir(musicPlayerInit);
    if (!audioPlayer.paused) {
      audioPlayer.pause()
    }
  }

}