import React from 'react'
import { Form } from 'react-bootstrap'

import { ReactComponent as VideoIcon } from '../../../assets/img/svg/form-video.svg'
import { ReactComponent as PhotoIcon } from '../../../assets/img/svg/form-photo.svg'
import './Input.css'




function Input(props) {

    const {controlId, label, labelProps, ...inputProps } = props;

        return (
            <Form.Group className="my-input"  controlId={controlId}>
                <Form.Label {...(labelProps && { ...labelProps })} >{label}</Form.Label>
            <Form.Control {...inputProps} />
            </Form.Group>
        )
    }

export default Input



export function Checkbox(props) {

    const {controlId, label, labelProps, ...inputProps } = props;
    return (
        <Form.Group className="my-input" controlId={controlId}>
        <Form.Check 
        custom
        type='checkbox'
        label={label}
        {...inputProps}
      />
        </Form.Group>
    )
}  


export function Textbox(props) {
    const {controlId, label, labelProps, ...inputProps } = props;
    return (
        <Form.Group className="my-input" controlId={controlId}>
            <Form.Label  {...(labelProps && { ...labelProps })}>{label}</Form.Label>
        <Form.Control as="textarea" rows={5} {...inputProps} />
      </Form.Group>
    )
}  

export function FileInput(props) {
    const { controlId, label, labelProps, type, ...inputProps } = props;
    
    let svg = <VideoIcon />;

    if (type === "photo") {
        svg = <PhotoIcon />
    }
      // will hold a reference for our real input file
  let inputFile = '';

  // function to trigger our input file click
  const uploadClick = (e) => {
    e.preventDefault();
    inputFile.click();
    return false;
  };

    return (
        <Form.Group  className="my-input file-input" controlId={controlId}>
            <Form.File className="file" {...inputProps} label={label}
                ref={input => {inputFile = input}} multiple />
            <div onClick={uploadClick}>{svg}</div>
            <p className="text-center mt-4">{label}</p>
        </Form.Group>
    )
} 
 

