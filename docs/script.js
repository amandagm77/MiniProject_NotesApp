console.log("JS is connected!");
let currentEditIndex = null;
let notesArray = [];

function addNote() {
    const newNote = {
        title: 'New Note',
        content: 'Note content'
    };

    if (validateNoteData(newNote)) {
        notesArray.push(newNote);
        renderNotes(notesArray);
        saveNotes();
    }
}

function updateNote(index) {
    currentEditIndex = index;

    const form = document.getElementById('note-form');
    const titleInput = document.getElementById('note-title');
    const contentInput = document.getElementById('note-content');

    titleInput.value = notesArray[index].title;
    contentInput.value = notesArray[index].content;

    form.classList.remove('hidden');
}
function deleteNote(index) {
    notesArray.splice(index, 1);
    renderNotes(notesArray);
    saveNotes();
}

function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    notesArray = savedNotes;
    renderNotes(notesArray);
}

function renderNotes(notes) {
    const noteContainer = document.getElementById('note-container');
    noteContainer.innerHTML = '';

    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';

        noteElement.innerHTML = `
            <h2>${note.title}</h2>
            <p>${note.content}</p>
            <button class="update-button">Update</button>
            <button class="delete-button">Delete</button>
        `;

        attachUpdateListener(noteElement, index);
        attachDeleteListener(noteElement, index);

        noteContainer.appendChild(noteElement);
    });
    if (notes.length === 0) {
    noteContainer.innerHTML = '<p>No notes yet. Click the + button to add one!</p>';
    return;
}
}

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notesArray));
}

function validateNoteData(note) {
    if (!note.title.trim()) {
        alert('Title cannot be empty.');
        return false;
    }
    if (!note.content.trim()) {
        alert('Content cannot be empty.');
        return false;
    }
    return true;
}

function attachUpdateListener(noteElement, noteIndex) {
    const updateButton = noteElement.querySelector('.update-button');
    updateButton.addEventListener('click', () => {
        updateNote(noteIndex);
    });
}

function attachDeleteListener(noteElement, noteIndex) {
    const deleteButton = noteElement.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => {
        deleteNote(noteIndex);
    });
}

function init() {
    const searchInput = document.getElementById('search');
    const addNoteButton = document.getElementById('add-note');

    const form = document.getElementById('note-form');
    const titleInput = document.getElementById('note-title');
    const contentInput = document.getElementById('note-content');
    const saveButton = document.getElementById('save-note');
    const cancelButton = document.getElementById('cancel-note');

    loadNotes();

    addNoteButton.addEventListener('click', () => {
        currentEditIndex = null;
        titleInput.value = '';
        contentInput.value = '';
        form.classList.remove('hidden');
    });

    saveButton.addEventListener('click', () => {
        const newNote = {
            title: titleInput.value,
            content: contentInput.value
        };

        if (!validateNoteData(newNote)) return;

        if (currentEditIndex !== null) {
            notesArray[currentEditIndex] = newNote;
        } else {
            notesArray.push(newNote);
        }

        saveNotes();
        renderNotes(notesArray);
        form.classList.add('hidden');
    });

    cancelButton.addEventListener('click', () => {
        form.classList.add('hidden');
    });

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();

        const filteredNotes = notesArray.filter(note =>
            note.title.toLowerCase().includes(query) ||
            note.content.toLowerCase().includes(query)
        );

        renderNotes(filteredNotes);
    });
}
document.addEventListener('DOMContentLoaded', init);