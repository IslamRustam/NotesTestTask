import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import Note from "../Note";
import {addNote, editNote, getNotes, removeNote} from "../../utils/notesUtils";
import Editor from "../Editor";
import './styles.css';

const NotesList = () => {
  const [notes, setNotes] = useState(getNotes())
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isNoteEditing, setIsNoteEditing] = useState(false);

  const toggleEditorHandler = () => {
    setIsEditorOpen(!isEditorOpen);
  };

  const saveNoteHandler = (text, image) => {
    addNote(text, image);
    setNotes(getNotes());
    setIsEditorOpen(!isEditorOpen);
  };

  const startNoteEditingHandler = () => {
    setIsNoteEditing(true);
  };

  const editNoteHandler = (id, text, image) => {
    editNote(id, text, image);
    setNotes(getNotes());
  };

  const endNoteEditingHandler = () => {
    setIsNoteEditing(false);
  };

  const deleteNoteHandler = (id) => {
    removeNote(id);
    setNotes(getNotes());
  };

  return isEditorOpen ?
    <Editor saveNote={saveNoteHandler} closeEditor={toggleEditorHandler}  /> :
    (
    <div className="note-list__container">
      {
        notes.map(note => {
          return (
           <Note
             key={note.id}
             id={note.id}
             text={note.text}
             image={note.image}
             createdAt={note.created_at}
             startEditing={startNoteEditingHandler}
             endEditing={endNoteEditingHandler}
             editNote={editNoteHandler}
             deleteNote={deleteNoteHandler} />
          );
        })
      }
      {!isNoteEditing ?
        (
          <Button onClick={toggleEditorHandler} variant="success">
            Create note
          </Button>
        ) :
        null
      }
    </div>
  );
};

export default NotesList;
