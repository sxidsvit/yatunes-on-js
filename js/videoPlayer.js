// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
// https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events

export const videoPlayerInit = () => {

  const videoPlayer = document.querySelector('.video-player')
  const videoButtonPlay = document.querySelector('.video-button__play')
  const videoButtonStop = document.querySelector('.video-button__stop')
  const videoTimePassed = document.querySelector('.video-time__passed')
  const videoProgress = document.querySelector('.video-progress')
  const videoTimeTotal = document.querySelector('.video-time__total')

  const toggleIcon = () => {
    if (videoPlayer.paused) {
      videoButtonPlay.classList.remove('fa-pause')
      videoButtonPlay.classList.add('fa-play')
    } else {
      videoButtonPlay.classList.add('fa-pause')
      videoButtonPlay.classList.remove('fa-play')
    }
  }

  const togglePlay = () => {
    if (videoPlayer.paused) {
      videoPlayer.play()
    } else {
      videoPlayer.pause()
    }
  }

  const stopPlay = () => {
    videoPlayer.pause()
    videoPlayer.current = 0
  }

  const addZero = n => n < 10 ? '0' + n : n

  videoPlayer.addEventListener('click', togglePlay)
  videoButtonPlay.addEventListener('click', togglePlay)

  videoPlayer.addEventListener('play', toggleIcon)
  videoPlayer.addEventListener('pause', toggleIcon)

  videoButtonStop.addEventListener('click', stopPlay)

  videoPlayer.addEventListener('timeupdate', () => {
    const currentTime = videoPlayer.currentTime
    const duration = videoPlayer.duration

    videoProgress.value = (currentTime / duration) * 100

    const minutesPassed = Math.floor(currentTime / 60)
    const secondsPassed = Math.floor(currentTime % 60)

    const minutesTotal = Math.floor(duration / 60)
    const secondsTotal = Math.floor(duration % 60)

    videoTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`
    videoTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`
  })

  videoProgress.addEventListener('change', () => {
    const duration = videoPlayer.duration
    const value = videoProgress.value

    videoPlayer.currentTime = (value * duration) / 100
  })

}