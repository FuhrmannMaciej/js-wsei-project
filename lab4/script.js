let container = document.querySelector("#container")
let addNoteButton = document.querySelector('#btnAddNote')

class Note {

  constructor(id, title, content, color, isPinned, createDate) {
    this.id = id
    this.title = title
    this.content = content
    this.color = color
    this.isPinned = isPinned
    this.createDate = createDate
  }
}

function randomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function addNote() {
  let noteObject = new Note(
    Math.floor(Math.random() * 100000),
    "",
    "",
    randomColor(),
    false, 
    Date.now()
    )

  const notes = getNotes();

  const noteElement = createNoteElement(noteObject.id, noteObject.title, noteObject.content, noteObject.color);

  container.insertBefore(noteElement, addNoteButton);

  notes.push(noteObject);
  saveNotes(notes);
}

getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.title, note.content, note.color);
  container.insertBefore(noteElement, addNoteButton);
});

function getNotes() {
  return JSON.parse(localStorage.getItem("pocket-notes") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("pocket-notes", JSON.stringify(notes));
}

function createNoteElement(id, title, content, color) {

  let note = document.createElement("div")
  note.className = "note"
  note.style.setProperty("background-color", color)

  let titleInput = document.createElement("input")
  titleInput.className = "title"
  titleInput.placeholder = "Title"
  titleInput.value = title
  let contentInput = document.createElement("input")
  contentInput.className = "content"
  contentInput.placeholder = "Content"
  contentInput.value = content

  let pinnedBtn = document.createElement("button")
  pinnedBtn.className = "pinnedBtn"
  let pinnedIcon = document.createElement("ion-icon")
  pinnedIcon.setAttribute("name", "pin-outline")

  container.appendChild(note)
  note.appendChild(titleInput)
  note.appendChild(contentInput)
  note.appendChild(pinnedBtn)
  pinnedBtn.appendChild(pinnedIcon)

  pinnedBtn.addEventListener("click", () => {
    pinNote(id)
  })

  note.addEventListener("change", () => {
    updateNote(id, titleInput.value, contentInput.value);
  });

  note.addEventListener("dblclick", () => {
    const doDelete = confirm(
      "Are you sure you wish to delete this note?"
    );

    if (doDelete) {
      deleteNote(id, note);
    }
  });

  return note;
}

function updateNote(id, newTitle, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];

  targetNote.title = newTitle;
  targetNote.content = newContent;
  saveNotes(notes);
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);

  saveNotes(notes);
  container.removeChild(element);
}

function pinNote(id) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];
  
  if (targetNote.isPinned) {
    targetNote.isPinned = false
  } else {
    targetNote.isPinned = true
  }

  container.insertBefore(targetNote, notes[0])

  saveNotes(notes);
}

