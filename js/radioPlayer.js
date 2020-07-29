export const radioPlayerInit = () => {

  // layout elements with which we have to interact
  const radio = document.querySelector('.radio')
  const radioCoverImg = document.querySelector('.radio-cover__img')
  const radioNavigation = document.querySelector('.radio-navigation')
  const radioHeaderBig = document.querySelector('.radio-header__big')
  const radioItem = document.querySelectorAll('.radio-item')
  const radioStop = document.querySelector('.radio-stop')

  // https://developer.mozilla.org/ru/docs/Web/API/HTMLAudioElement/Audio()
  // https://developer.mozilla.org/ru/docs/Web/API/HTMLMediaElement
  const audio = new Audio() // new HTMLAudioElement object
  audio.type = 'audio/aac'

  radioStop.disabled = true

  // Change icon play/stop & play or stop animation
  const changeIconPlay = () => {
    if (audio.paused) {
      radio.classList.remove('play')
      radioStop.classList.add('fa-play')
      radioStop.classList.remove('fa-stop')
    } else {
      radio.classList.add('play')
      radioStop.classList.add('fa-stop')
      radioStop.classList.remove('play')
    }
  }

  // Styling the icon of the station that is currently broadcasting
  const selectItem = elem => {
    radioItem.forEach(item => item.classList.remove('select'))
    elem.classList.add('select')
  }


  // Event handler for radio station selection
  radioNavigation.addEventListener('change', ({ target }) => {

    const parrent = target.closest('.radio-item')
    selectItem(parrent)

    //  broadcasting station name
    const title = parrent.querySelector('.radio-name').textContent
    radioHeaderBig.textContent = title

    // broadcasting station logo
    const imgSrc = parrent.querySelector('.radio-img').src
    radioCoverImg.src = imgSrc

    // broadcasting station url
    audio.src = target.dataset.radioStation
    radioStop.disabled = false
    audio.play()
    changeIconPlay()
  })

  // Stop or play the broadcast
  radioStop.addEventListener('click', () => {
    if (audio.paused) {
      audio.play()
    } else {
      audio.pause()
      changeIconPlay()
    }
  })

}