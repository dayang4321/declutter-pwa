import React, { useState, useContext } from 'react';

import { AuthContext } from '../../context/AuthContext'
import {inputChangeHandler} from '../../shared/utility'

import './Auth.css'


const authFormObj = {
      email: {
      value: '',
      validation: {
          required: true,
        isEmail: true,
      },
      valid: false,
      touched: false
    },
    password: {
        value: '',
        validation: {
            required: true,
        },
        valid: false,
        touched: false
      },

     formValidity: false
}


const Auth = (props) => {

    const [
        //formLoading,
        setFormLoading] = useState(false);

    // const [isSignedUp, setIsSignedUp] =  useState(false);

    // const [hasError, setHasError] =  useState(false);

    const [authForm, setAuthForm] = useState(authFormObj);

    const authContext = useContext(AuthContext)
  
    // const shouldValidate = (inputName) => {
    //     if (!authForm[inputName].touched) {
    //         return null
    //     }
    //     else return authForm[inputName].valid

    // }
    // const shouldInValidate = (inputName) => {
    //     if (!authForm[inputName].touched) {
    //         return null
    //     }
    //     else return !authForm[inputName].valid

    // }

    const handleSubmit = (event) => {     
        event.preventDefault();
        if (authForm.formValidity === false) {

         }

        else {
            setFormLoading(true);

            const postData = {
                email: authForm.email.value,
                password: authForm.password.value,
            };       
            authContext.signin(postData);
       
            setAuthForm(authFormObj)
    }      
    }





    return (
        <div className="container d-flex align-items-center w-100 h-100 justify-content-center p-5">       
        <form className="form-signin" onSubmit={handleSubmit}>
        <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" id="inputEmail" className="form-control" placeholder="Email address"
                onChange={(e) => inputChangeHandler(e,"email",authForm, setAuthForm)} value={authForm.email.value}  required autoFocus />
        <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                 onChange={(e) => inputChangeHandler(e,"password",authForm, setAuthForm)} value={authForm.password.value}    required />
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        <p className="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
            </form>
        </div>
    );
}

export default Auth;