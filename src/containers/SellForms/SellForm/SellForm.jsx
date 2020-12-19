import React from 'react';
import FormToolTip from '../../../components/UI/FormToolTip/FormToolTip';
import Input, { Checkbox, FileInput, Textbox } from '../../../components/UI/Input/Input';
import {Collapse} from 'react-bootstrap'
import {ReactComponent as RightArrow} from '../../../assets/img/svg/right-arrow.svg'


// import { AuthContext } from '../../context/AuthContext'
// import {inputChangeHandler} from '../../shared/utility'

import './SellForm.css'
import MediaPreview from '../../../components/MediaPreview/MediaPreview';
import useLongPress from '../../../hooks/useLongPress';


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

    const [title, setTitle] = React.useState('');
    
    const [photoFiles, setPhotoFiles] = React.useState([]);

    const [videoFile, setVideoFile] = React.useState([]);
    
    const handleDefectMode = (bool) => {
        setDefected(bool)
    }

    const [defectPhotoFiles, setDefectPhotoFiles] = React.useState([]);

    const [defectVideoFile, setDefectVideoFile] = React.useState([]);




    const imagePreviewHandler = (e) => {

        console.log('previewed')

        const fileList =  e.target.files

        console.log(e.target.files)

        
        //var fileName = e.target.files[0].name;
        // $("#file").val(fileName);
  
        //     if(e.target.files[0].size > 201000){
        //      return $('.upload .invalid-feedback').toggle()
        //     }
        //   else
        
        var fl = fileList.length;

            console.log(fl)
            var i = 0;
        
            while (i < fl) {
                console.log("looped")
                // localize file var in the loop
                var file = fileList[i];
                var reader = new FileReader();
                // eslint-disable-next-line no-loop-func
                reader.onload = function (e) {
        
        
                    console.log('loading')
       
                    console.log('loaded')
                
                    setPhotoFiles([...photoFiles, e.target.result]); 

                }
                reader.readAsDataURL(file);
                i++;
        };
   
     

    }



    const videoPreviewHandler = (e) => {
 
        if (e.target.files[0]) {
            let file = e.target.files[0];
        let blobURL = URL.createObjectURL(file);
            setVideoFile([blobURL]);
        }
        return
    }


    const mediaRemoveHandler = (type, id) => {
        
        if (type === "photo") {
            const  newState =  photoFiles.filter((data, index) => {
                return  index!==id
         })
              setPhotoFiles([...newState]);
        }

        if (type === "video") {
            const  newState =  videoFile.filter((data, index) => {
                return  index!==id
         })
              setVideoFile([...newState]);
        } 
        
    }
    const defectRemoveHandler = (type, id) => {
        
        if (type === "photo") {
            const  newState =  defectPhotoFiles.filter((data, index) => {
                return  index!==id
         })
              setPhotoFiles([...newState]);
        }

        if (type === "video") {
            const  newState =  defectVideoFile.filter((data, index) => {
                return  index!==id
         })
              setVideoFile([...newState]);
        } 
        
    }


    

 

   




    return (
        <div className="switch-collapse">
        {/* <Collapse in={!isOpen} timeout={2000}>
                <div onClick={()=>openHandler(id)} className="label-text">{title ? <span>{title}</span> : <span>&nbsp;</span>}<RightArrow className="collapse-arrow"/></div>
         </Collapse> */}

            <Collapse in={isOpen} timeout={2000}>
            
    
               
                <div className="form-collapse d-flex align-items-center w-100 h-100 justify-content-center"> 
                <form className="w-100" id="sellForm">
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
                        <FileInput onChange={(e) => {
                           videoPreviewHandler(e)
                        }}
                            label="Add product video" capture="environment" accept="video/*" />

                        <FileInput
                             onChange={(e) => {
                                imagePreviewHandler(e)
                            }}
                            label="Add product pictures" capture="environment" accept="image/*" type="photo" />
                    </div>


                
                    <MediaPreview photos={photoFiles} removeHandler={mediaRemoveHandler}  video={ videoFile}/>
                
                

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
                    <FileInput label="Add defect video" capture="environment" accept="video/*" />

                    <FileInput label="Add defect pictures" capture="environment" accept="image/*" type="photo" />
                            </div>
                            <MediaPreview photos={defectPhotoFiles} removeHandler={defectRemoveHandler}  video={defectVideoFile}/>
                        </div>
                        </Collapse> 
                        <button className="submit-btn btn btn-dark p-3 w-100" onClick={e => {
                            e.preventDefault();
                        props.complete()}} type="submit">Done</button>
                        </form>
                           </div>  
                    
            </Collapse>
        </div>
    );
}

export default SellForm;