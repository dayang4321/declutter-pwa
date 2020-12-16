import React from 'react';
import Input from '../../components/UI/Input/Input';

// import { AuthContext } from '../../context/AuthContext'
// import {inputChangeHandler} from '../../shared/utility'
import { useHistory } from "react-router-dom";
import './Auth.css'


// const authFormObj = {
//       email: {
//       value: '',
//       validation: {
//           required: true,
//         isEmail: true,
//       },
//       valid: false,
//       touched: false
//     },
//     password: {
//         value: '',
//         validation: {
//             required: true,
//         },
//         valid: false,
//         touched: false
//       },

//      formValidity: false
// }


const Auth = (props) => {

    const history = useHistory();

    // const [
    //     //formLoading,
    //     setFormLoading] = useState(false);

    // // const [isSignedUp, setIsSignedUp] =  useState(false);

    // // const [hasError, setHasError] =  useState(false);

    // const [authForm, setAuthForm] = useState(authFormObj);

    // const authContext = useContext(AuthContext)
  
    // // const shouldValidate = (inputName) => {
    // //     if (!authForm[inputName].touched) {
    // //         return null
    // //     }
    // //     else return authForm[inputName].valid

    // // }
    // // const shouldInValidate = (inputName) => {
    // //     if (!authForm[inputName].touched) {
    // //         return null
    // //     }
    // //     else return !authForm[inputName].valid

    // // }

    // const handleSubmit = (event) => {     
    //     event.preventDefault();
    //     if (authForm.formValidity === false) {

    //      }

    //     else {
    //         setFormLoading(true);

    //         const postData = {
    //             email: authForm.email.value,
    //             password: authForm.password.value,
    //         };       
    //         authContext.signin(postData);
       
    //         setAuthForm(authFormObj)
    // }      
    // }





    return (
        <div className="d-flex align-items-center w-100 h-100 justify-content-center">       
        <form className="w-100" id="signinForm" onSubmit={()=>{history.push('/seller')}}>
                <Input label="Name"/>
                <Input label="Email Address" />
                <Input label="Phone Number" />
                <Input label="Pickup Address"/>
        <button className="submit-btn btn btn-dark p-3 w-100"  type="submit">Start Selling</button>
            </form>
        </div>
    );
}

export default Auth;