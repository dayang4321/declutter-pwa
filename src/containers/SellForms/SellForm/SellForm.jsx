import React from 'react';
import FormToolTip from '../../../components/UI/FormToolTip/FormToolTip';
import Input, { Checkbox, FileInput, Textbox } from '../../../components/UI/Input/Input';
import {Collapse} from 'react-bootstrap'
import {ReactComponent as RightArrow} from '../../../assets/img/svg/right-arrow.svg'


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

    const { isOpen,openHandler,id } = props;

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

    const [defected, setDefected] = React.useState(false);

    const[title, setTitle]=React.useState('');
    
    const handleDefectMode = (bool) => {
        setDefected(bool)
    }



    return (
        <div className="switch-collapse">
        <Collapse in={!isOpen} >
                <div onClick={()=>openHandler(id)} className="label-text">{title ? <span>{title}</span> : <span>&nbsp;</span>}<RightArrow className="collapse-arrow"/></div>
         </Collapse>

        <Collapse in={isOpen}>
        <div className="form-collapse mt-5">
                <div className="tooltip-group">    
                    <FormToolTip textArrIndex={0} />
                        <Input onChange={(e) => {
                           setTitle(e.target.value);                
                        }
                        } label="Name of Product" placeholder="eg. Ox standing fan, Living room couch." />                    
                </div>
                <div className="tooltip-group">    
                    <FormToolTip textArrIndex={1}/>
                    <Textbox label="Description" />                    
                </div>
                <div className="tooltip-group">   
                    <FormToolTip textArrIndex={2}/>
                    <Input label="Selling Price" defaultValue="&#8358;" />
                </div>
                <div className="d-flex justify-content-between"> 
                    <FileInput label="Add product video" capture="user" accept="video/*" />

                    <FileInput label="Add product pictures"  capture="user" accept="image/*" type="photo" />
                </div>

                <div className="tooltip-group">
                    <FormToolTip textArrIndex={3} />
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
            </div>   
            </Collapse>
        </div>
    );
}

export default SellForm;