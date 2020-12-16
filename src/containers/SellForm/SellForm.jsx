import React from 'react';
import FormToolTip from '../../components/UI/FormToolTip/FormToolTip';
import Input, { Checkbox, FileInput, Textbox } from '../../components/UI/Input/Input';
import { ReactComponent as PlusCircle } from '../../assets/img/svg/plus-circle.svg'
import {Collapse} from 'react-bootstrap'


// import { AuthContext } from '../../context/AuthContext'
// import {inputChangeHandler} from '../../shared/utility'

import './SellForm.css'


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


const SellForm = (props) => {

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


    const [defected, setDefected] = React.useState(false)
    
    const handleDefectMode = (bool) => {
        setDefected(bool)
    }


    return (
        <div className="d-flex align-items-center w-100 h-100 justify-content-center">       
            <form className="w-100" id="sellForm" onSubmit="">
                <div>    
                    <FormToolTip/>
                    <Input label="Name of Product" />                    
                </div>
                <div>    
                    <FormToolTip/>
                    <Textbox label="Description" />                    
                </div>
                <div>   
                    <FormToolTip/>
                    <Input label="Selling Price" defaultValue="&#8358;" />
                </div>
                <div className="d-flex justify-content-between"> 
                    <FileInput label="Add product video" />

                    <FileInput label="Add product pictures" type="photo" />
                </div>

                <div>
                    <FormToolTip />
                    <Checkbox label="This product has some defects" onChange={e => {
                        console.log(e.target.checked)
                        handleDefectMode(e.target.checked);
                    }} controlId="defectCheck"/>
                </div>

                <Collapse in={defected}>
                    <div className="p-0">
                    <div>
                        <Textbox label="Defect description" />                    
                    </div>
                    <div className="d-flex justify-content-between"> 
                    <FileInput label="Add defect video" />

                    <FileInput label="Add defect pictures" type="photo" />
                        </div>
                        </div>
                </Collapse> 


    <button className="another-btn py-2 px-3 w-100 text-center btn bg-transparent"><PlusCircle className="mr-3"/>Add another product</button>

        <button className="submit-btn btn btn-dark p-3 w-100"  type="submit">Done</button>
            </form>
        </div>
    );
}

export default SellForm;