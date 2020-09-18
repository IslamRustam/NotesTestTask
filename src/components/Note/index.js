import React, {useState} from 'react';
import {Button, Image} from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import Editor from "../Editor";
import './styles.css';

const Note = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const startEditingHandler = () => {
    setIsEditing(true);
    props.startEditing();
  };

  const closeEditorHandler = () => {
    setIsEditing(false);
    props.endEditing();
  };

  const endEditingHandler = (id, text, image) => {
    closeEditorHandler();
    props.endEditing();
    props.editNote(id, text, image)
  };

  return isEditing ?
    (
      <Editor
        id={props.id}
        text={props.text}
        image={props.image}
        isEditing={isEditing}
        endEditing={endEditingHandler}
        closeEditor={closeEditorHandler} />
    ) :
    (
      <div className="note__container" key={props.id}>
        <p className="note__date">{props.createdAt}</p>
        <div className="note__body">
          <ReactMarkdown source={props.text.substring(0, 14)} />
          {
            props.image &&
            <div className="note__image__container">
              <Image src={props.image} rounded className="note__image" />
            </div>
          }
        </div>
        <div className="note__buttons">
          <Button
            onClick={startEditingHandler}
            className="note__button">
            Edit
          </Button>
          <Button
            onClick={() => props.deleteNote(props.id)}
            className="note__button"
            variant="danger">
            Delete
          </Button>
        </div>
      </div>
    )
};

export default Note;
