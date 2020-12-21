import React,{useState,useContext} from 'react';
import Input from '../../components/UI/Input/Input';

import { AuthContext } from '../../context/AuthContext'
import {inputChangeHandler} from '../../shared/utility'
import { useHistory } from "react-router-dom";
import './Auth.css'
import { Button } from 'react-bootstrap';


const authFormObj = {
    name: {
        value: '',
        validation: {
            required: true,
        },
        valid: false,
        touched: false
      },
      email: {
      value: '',
      validation: {
          required: true,
        isEmail: true,
      },
      valid: false,
      touched: false
    },
    phone: {
        value: '',
        validation: {
            required: true,
            isPhone:true,
        },
        valid: false,
        touched: false
    },
    address: {
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

    const history = useHistory();

     const [isSignedUp, setIsSignedUp] =  useState(false);

    // // const [hasError, setHasError] =  useState(false);

    const [authForm, setAuthForm] = useState(authFormObj);

    const [formTouched, setFormTouched] =  useState(false);

     const authContext = useContext(AuthContext)
  
    const shouldValidate = (inputName) => {
        if (!authForm[inputName].touched) {
            return null
        }
        else return authForm[inputName].valid

    }
    const shouldInValidate = (inputName) => {
        if (!authForm[inputName].touched && !formTouched) {
            return null
        }
        else return !authForm[inputName].valid

    }

    const handleSubmit = (event) => {     
        event.preventDefault();
        if (authForm.formValidity === false) {
                setFormTouched(true)
         }

        else {
            const postData = {
                name: authForm.name.value,
                email: authForm.email.value,
                phone: authForm.phone.value,
                pickup_address: authForm.address.value,
            };       
            authContext.signin(postData);
       if (authContext.completed){
         return setAuthForm(authFormObj) }
    }      
    }





    return (
        <div className="d-flex align-items-center w-100 h-100 justify-content-center">       
        <form className="w-100" noValidate id="signinForm" onSubmit={handleSubmit}>
                <Input label="Name" type="text" value={authForm.name.value} name="name" required={true}
                    onChange={(e) => inputChangeHandler(e, "name", authForm, setAuthForm)}
                    isValid={shouldValidate("name")}
                    isInvalid={shouldInValidate("name")}                 
                />
                <Input label="Email Address" type="email" value={authForm.email.value} required={true}
                    onChange={(e) => inputChangeHandler(e, "email", authForm, setAuthForm)}
                    isValid={shouldValidate("email")}
                    isInvalid={shouldInValidate("email")} />
                <Input label="Phone Number"  type="tel" value={authForm.phone.value} required={true}
                    onChange={(e) => inputChangeHandler(e, "phone", authForm, setAuthForm)}
                    isValid={shouldValidate("phone")}
                    isInvalid={shouldInValidate("phone")} />
                <Input label="Pickup Address"  value={authForm.address.value}  required={true}
                    onChange={(e) => inputChangeHandler(e, "address", authForm, setAuthForm)}
                    isValid={shouldValidate("address")}
                    isInvalid={shouldInValidate("address")}/>
        <Button className="submit-btn btn btn-dark p-3 w-100" disabled={authContext.authLoading}  type="submit">{authContext.authLoading? 'Starting...':' Start Selling'}</Button>
            </form>
        </div>
    );
}

export default Auth;