document.addEventListener('keypress', onKeyPress)

const KeyToSound = {
    'a': 's1',
    's': 's2',
    'd': 's3',
    'f': 's4',
    'g': 's5',
    'h': 's6'
}
function onKeyPress(ev) {
    const sound = KeyToSound[ev.key]

    playSound(sound)
}

function playSound(sound) {
    if (!sound) {
        return
    }
    const audioTag = document.querySelector(`#${sound}`)
    audioTag.currentTime = 0
    audioTag.play()
}

function record() {

}
// Date.now()