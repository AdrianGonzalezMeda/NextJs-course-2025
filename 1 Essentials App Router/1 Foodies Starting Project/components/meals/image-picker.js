'use client' //onClick props are client side

import { useRef, useState } from 'react';
import classes from './image-picker.module.css'
import Image from 'next/image';

const ImagePicker = ({ label, name }) => {
    const [pickedImage, setPickedImage] = useState();
    const imageInput = useRef();

    const handlePickClick = () => {
        imageInput.current.click();
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (!file) {
            setPickedImage(null);
            return;
        }

        // Vanilla Js, not related to react or nextJs
        const fileReader = new FileReader();
        fileReader.onload = () => { // Callback function when the file was readed
            setPickedImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No picked image yet.</p>}
                    {pickedImage && <Image src={pickedImage} alt='The image selected by the user' fill />}
                </div>
                <input
                    ref={imageInput}
                    id={name}
                    name={name}
                    className={classes.input}
                    type='file'
                    accept='image/png, image/jpeg'
                    onChange={handleImageChange}
                    required
                />
                <button
                    className={classes.button}
                    type='button'
                    onClick={handlePickClick}
                >Pick an Image</button>
            </div>
        </div>
    )
}

export default ImagePicker
