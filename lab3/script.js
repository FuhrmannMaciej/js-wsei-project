document.addEventListener('keypress', onKeyPress)
const recordOne = document.querySelector('#a1')
const recordTwo = document.querySelector('#a2')
const recordThree = document.querySelector('#a3')
const recordFour = document.querySelector('#a4')

const playButton = document.querySelector('#playRecording')
const playAllButton = document.querySelector('#playAll')
const recordButton = document.querySelector('#toggleRecord')

const audioRecordings = document.querySelectorAll('.recording')

let recordingStartTime
let songNotes = []
let selectedAudio

let audioStorageOne = []
let audioStorageTwo = []
let audioStorageThree = []
let audioStorageFour = []


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
    if (isRecording()) {
        recordNote(sound)
    }
    const audioTag = document.querySelector(`#${sound}`)
    audioTag.currentTime = 0
    audioTag.play()
}

function toggleRecord() {
    recordButton.classList.toggle('active')
    if (isRecording()) {
        startRecording()
    } else {
        stopRecording()
    }
}

function isRecording() {
    return recordButton != null && recordButton.classList.contains('active')
  }

function startRecording() {
    recordingStartTime = Date.now()
    isAudioRecordingChecked()
    songNotes = []
}

function stopRecording() {
    saveToStorage()
}

function playRecording() {
    isAudioRecordingChecked()
    let storage = chooseStorage()
    if (storage.length === 0) return
    storage.forEach(note => {
      setTimeout(() => {
        playSound(note.key)
      }, note.startTime)
    })
  }

  function playAll() {
    let allAudio = [
        ...audioStorageOne, 
        ...audioStorageTwo, 
        ...audioStorageThree, 
        ...audioStorageFour
    ]
    if (allAudio.length === 0) return
    allAudio.forEach(note => {
      setTimeout(() => {
        playSound(note.key)
      }, note.startTime)
    })
  }

function chooseStorage() {
    switch (selectedAudio) {
        case "a1":
            return audioStorageOne
        case "a2":
            return audioStorageTwo
        case "a3":
            return audioStorageThree
        case "a4":
            return audioStorageFour

        default:
            break;
    }
}

function saveToStorage() {
    switch (selectedAudio) {
        case "a1":
            audioStorageOne = Array.from(songNotes)
            break;
        case "a2":
            audioStorageTwo = Array.from(songNotes)
            break;
        case "a3":
            audioStorageThree = Array.from(songNotes)
            break;
        case "a4":
            audioStorageFour = Array.from(songNotes)
            break;

        default:
            break;
    }
}

function recordNote(note) {
    songNotes.push({
        key: note,
        startTime: Date.now() - recordingStartTime
    })
}

function isAudioRecordingChecked() {
    for (const audio of audioRecordings) {
        if (audio.checked) {
            selectedAudio = audio.id
        }
    }
}