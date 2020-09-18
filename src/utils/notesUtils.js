import {v4 as uuidv4} from "uuid";
import Notes from "../API/Notes";

const getCurrentUserEmail = () => {
  return localStorage.getItem('current_user');
};

export const getNotes = () => {
  const currentUser = getCurrentUserEmail();
  const notes = JSON.parse(localStorage.getItem(currentUser + '_notes')) || [];

  return notes;
};

export const addNote = (text, image) => {
  const notes = getNotes();
  const userEmail = getCurrentUserEmail();

  if (userEmail) {
    const newNote = {id: uuidv4(), text, image, created_at: (new Date()).toLocaleDateString()}

    notes.push(newNote);

    Notes.mockRequest(userEmail, notes);
  }
};

export const editNote = (id, text, image) => {
  const notes = getNotes();
  const userEmail = getCurrentUserEmail();

  if (userEmail) {
    const noteIndex = notes.findIndex(note => note.id === id);

    if (noteIndex === -1) {
      return;
    }

    notes[noteIndex].text = text;
    notes[noteIndex].image = image;

    Notes.mockRequest(userEmail, notes);
  }
};

export const removeNote = (id) => {
  const notes = getNotes();
  const userEmail = getCurrentUserEmail();

  if (userEmail) {
    const filteredNotes = notes.filter(note => note.id !== id);

    Notes.mockRequest(userEmail, filteredNotes);
  }
};

export const getBase64 = (file) => {
  return new Promise((resolve,reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}