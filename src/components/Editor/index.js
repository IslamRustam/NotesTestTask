import React, {useState} from 'react';
import ReactMarkdown from 'react-markdown';
import {FormControl, Button, Image} from "react-bootstrap";
import ImageCrop from 'react-image-crop-component';
import {getBase64} from "../../utils/notesUtils";
import './styles.css';

const Editor = (props) => {
  const [text, setText] = useState(props.isEditing ? props.text : '');
  const [image, setImage] = useState(props.isEditing ? props.image : '');
  const [croppedImage, setCroppedImage] = useState('');

  const handleTextChange = (event) => {
    setText(event.target.value)
  };

  const imageUpload = async (e) => {
    const image = e.target.files[0];
    const base64Image = await getBase64(image);

    setImage(base64Image);
  };

  const rotateImage = (isClockwise) => {
    const offScreenCanvas = document.createElement('canvas');
    const offScreenCanvasCtx = offScreenCanvas.getContext('2d');

    let img = document.getElementsByClassName('editor__image')[0];
    img.src = image;

    offScreenCanvas.height = img.width;
    offScreenCanvas.width = img.height;

    if (isClockwise) {
      offScreenCanvasCtx.rotate(90 * Math.PI / 180);
      offScreenCanvasCtx.translate(0, -offScreenCanvas.width);
    } else {
      offScreenCanvasCtx.rotate(-90 * Math.PI / 180);
      offScreenCanvasCtx.translate(-offScreenCanvas.height, 0);
    }

    offScreenCanvasCtx.drawImage(img, 0, 0);


    setImage(offScreenCanvas.toDataURL("image/jpeg", 100))
  };

  const cropImage = () => {
    if (croppedImage) {
      setImage(croppedImage);
    }
  };

  const onCropped = (e) => {
    setCroppedImage(e.image);
  }

  return (
    <div className="editor__container">
      <div className="editor__body">
        <div className="editor__markdown__container">
          <FormControl
            value={text}
            onChange={handleTextChange}
            as="textarea" className='
            editor__textarea' />
          <div className="editor__markdown">
            <ReactMarkdown source={text} />
          </div>
        </div>
        <input
          type="file"
          id="imageFile"
          name='imageFile'
          onChange={imageUpload} />
        {image &&
          <div>
            <div className="editor__image__container">
              <ImageCrop
                src={image}
                square={false}
                resize={true}
                maxHeight={"400px"}
                maxWidth={"400px"}
                onCrop={onCropped}/>
              <Image src={image} rounded className="editor__image" />
            </div>
            <div className="editor__image__buttons">
              <Button onClick={() => rotateImage(false)}>
                Rotate to the left
              </Button>
              <Button onClick={cropImage}>
                Crop
              </Button>
              <Button onClick={() => rotateImage(true)}>
                Rotate to the right
              </Button>
            </div>
          </div>
        }
      </div>
      <div className="editor__footer">
        <Button onClick={() => {
          if (props.isEditing && text) {
            props.closeEditor();
            props.endEditing(props.id, text, image);
            return;
          }
          if (text) {
            props.saveNote(text, image)
          }
        }}>
          Save
        </Button>
        <Button onClick={props.closeEditor} variant="danger">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Editor;
