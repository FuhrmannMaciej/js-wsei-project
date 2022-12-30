let container = document.querySelector("#container")

class Note {

    constructor(title, content, color, isPinned, createDate) {
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
    let noteObject = new Note ("", "", randomColor(), false, Date.now())
    let note = document.createElement("div")
    note.className = "note"
    note.style.setProperty("background-color", noteObject.color)

    let title = document.createElement("input")
    title.className = "title"
    title.placeholder = "Title"
    let content = document.createElement("input")
    content.className = "content"
    content.placeholder = "Content"

    container.appendChild(note)
    note.appendChild(title)
    note.appendChild(content)
}