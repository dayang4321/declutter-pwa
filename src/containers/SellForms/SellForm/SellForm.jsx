import React,{useState,useContext} from 'react';
import FormToolTip from '../../../components/UI/FormToolTip/FormToolTip';
import Input, { Checkbox, FileInput, Textbox } from '../../../components/UI/Input/Input';
import {Collapse} from 'react-bootstrap'
// import {ReactComponent as RightArrow} from '../../../assets/img/svg/right-arrow.svg'


import { AuthContext } from '../../../context/AuthContext'
import {inputChangeHandler} from '../../../shared/utility'

import './SellForm.css'
import MediaPreview from '../../../components/MediaPreview/MediaPreview';
//import useLongPress from '../../../hooks/useLongPress';
import Axios,{ setAuthToken } from '../../../declutter-axios-base';
import { Button } from 'react-bootstrap';


const sellFormObj = {
      product_name: {
      value: '',
      validation: {
          required: true,
      },
      valid: false,
      touched: false
    },
    description: {
        value: '',
        validation: {
            required: true,
        },
        valid: false,
        touched: false
    },
    price: {
        value: '',
        validation: {
            required: true,
            isNumber: true
        },
        valid: false,
        touched: false
    },

    video: {
        value: [],
        validation: {
            requiredArr: true,
        },
        valid: false,
        touched: false
    },
    images: {
        value: [],
        validation: {
            requiredArr: true,
        },
        valid: false,
        touched: false
    },
    defect_description: {
        value: '',
        validation: {
            required: false,
        },
        valid: false,
        touched: false
    },
    defect_video: {
        value: [],
        validation: {
            requiredArr: false,
        },
        valid: false,
        touched: false
    },
    defect_images: {
        value: [],
        validation: {
            requiredArr: false,
        },
        valid: false,
        touched: false
    },    

     formValidity: false
}


const SellForm = (props) => {

    const { isOpen, success } = props;

    const [formLoading, setFormLoading] = useState(false);

    // // const [isSignedUp, setIsSignedUp] =  useState(false);

    // // const [hasError, setHasError] =  useState(false);

    const [sellForm, setSellForm] = useState(sellFormObj);

    const [formTouched, setFormTouched] = useState(false);
    const [defected, setDefected] = React.useState(false);

    //   const [title, setTitle] = React.useState('');
       
       const [photoFiles, setPhotoFiles] = React.useState([]);
   
       const [videoFile, setVideoFile] = React.useState([]);
   
       const [defectPhotoFiles, setDefectPhotoFiles] = React.useState([]);
   
       const [defectVideoFile, setDefectVideoFile] = React.useState([]);
   
   
   

    const authContext = useContext(AuthContext)
  
    const shouldValidate = (inputName) => {
        if (!sellForm[inputName].touched) {
            return null
        }
        else return sellForm[inputName].valid

    }
    const shouldInValidate = (inputName) => {
        if (!sellForm[inputName].touched && !formTouched) {
            return null
        }
        else return !sellForm[inputName].valid

    }

    const handleDefectMode = (bool) => {
        setDefected(bool)
    }

 


    const imagePreviewHandler = (e, type) => {

        if (photoFiles.length >2) {
            return
        }
        const fileList = e.target.files
        
        var fl = fileList.length;

            console.log(fl)
        var i = 0;
        
      
        
            while (i < fl) {
                // localize file var in the loop
                var file = fileList[i];
                var reader = new FileReader();
                // eslint-disable-next-line no-loop-func
                reader.onload = function (e) {
    
                    type==="defect"? setDefectPhotoFiles([...defectPhotoFiles, e.target.result]):  
                    setPhotoFiles([...photoFiles, e.target.result]);
                }
                reader.readAsDataURL(file);
                i++;
        };
   
     

    }



    const videoPreviewHandler = (e,type) => {
 
        if (e.target.files[0]) {
            let file = e.target.files[0];
            let blobURL = URL.createObjectURL(file);
            type==="defect"? setDefectVideoFile([blobURL]):  
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

    const handleSubmit = (event) => {     
        event.preventDefault();
        if (sellForm.formValidity === false) {
            setFormTouched(true)
         }

        else {
            setFormLoading(true);

            const formData = new FormData();
            formData.append("name", sellForm.product_name.value);
            formData.append("description", sellForm.description.value);
            formData.append("selling_price", sellForm.price.value);
            formData.append("video", videoFile);
            formData.append("images[]", [...photoFiles]);
            formData.append("defect[description]", sellForm.defect_description.value);
            formData.append("defect[video]", defectVideoFile);
            formData.append("defect[images][]",  defectPhotoFiles);
            // const postData = {
            //     name: sellForm.product_name.value,
            //     description: sellForm.description.value,
            //     selling_price: sellForm.price.value,
            //     video: sellForm.video.value,
            //     'image[]': sellForm.images.value,
            //     'defect[description]': sellForm.defect_description.value,
            //     'defect[video]': sellForm.defect_video.value,
            //     'defect[images][]': sellForm.defect_images.value,            
            // };       

            console.log(...formData)

            setAuthToken(authContext.token);
            console.log(authContext.token)

            Axios.post('/products', formData)
                .then((res) => {
                    setFormTouched(false)
                    setFormLoading(false)
                    setSellForm(sellFormObj)
                  success()
                })
                .catch((err) => {
                  
                    setFormLoading(false)
                
            })
         
       
         //   setSellForm(sellFormObj)
    }      
    }


console.log(photoFiles)
   




    return (
        <div className="switch-collapse">
        {/* <Collapse in={!isOpen} timeout={2000}>
                <div onClick={()=>openHandler(id)} className="label-text">{title ? <span>{title}</span> : <span>&nbsp;</span>}<RightArrow className="collapse-arrow"/></div>
         </Collapse> */}

            <Collapse in={isOpen} timeout={2000}>
            
    
               
                <div className="form-collapse d-flex align-items-center w-100 h-100 justify-content-center"> 
                <form className="w-100" noValidate id="sellForm" onSubmit={handleSubmit}>
                <div className="tooltip-group">    
                    <FormToolTip textArrIndex={0} />
                            <Input label="Name of Product" placeholder="eg. Ox standing fan, Living room couch." name="product_name" required={true}
                  value={sellForm.product_name.value}
                    onChange={(e) => inputChangeHandler(e, "product_name", sellForm, setSellForm)}
                    isValid={shouldValidate("product_name")}
                    isInvalid={shouldInValidate("product_name")}      />                    
                </div>
                <div className="tooltip-group">    
                    <FormToolTip textArrIndex={1}/>
                            <Textbox label="Description" name="description" required={true} 
                                value={sellForm.description.value}
                    onChange={(e) => inputChangeHandler(e, "description", sellForm, setSellForm)}
                    isValid={shouldValidate("description")}
                    isInvalid={shouldInValidate("description")}    />                    
                </div>
                <div className="tooltip-group">   
                    <FormToolTip textArrIndex={2}/>
                            <Input label="Selling Price" type="number" controlId="price" groupClass="price-group" required={true}
                                 value={sellForm.price.value}
                                onChange={(e) => inputChangeHandler(e, "price", sellForm, setSellForm)}
                    isValid={shouldValidate("price")}
                    isInvalid={shouldInValidate("price")} />
                </div>
                <div className="d-flex justify-content-between"> 
                            <FileInput onChange={(e) => {
                                videoPreviewHandler(e);
                                inputChangeHandler(e, "video", sellForm, setSellForm)
                            }} name="video"
                           

                            label="Add product video"  capture="environment" accept="video/*" />

                        <FileInput  name="images"
                             onChange={(e) => {
                                    imagePreviewHandler(e);
                                    inputChangeHandler(e, "images", sellForm, setSellForm)
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
                        <Textbox label="Defect description" required={true}
                                 value={sellForm.defect_description.value}
                                onChange={(e) => inputChangeHandler(e, "defect_description", sellForm, setSellForm)}
                    isValid={shouldValidate("defect_description")}
                    isInvalid={shouldInValidate("defect_description")} />                    
                    </div>
                    <div className="d-flex justify-content-between"> 
                                    <FileInput label="Add defect video" capture="environment" accept="video/*"
                    onChange={(e) => {
                        videoPreviewHandler(e,"defect");
                        inputChangeHandler(e, "defect_video", sellForm, setSellForm)
                    }} name="defect_video"                />

                                    <FileInput label="Add defect pictures" capture="environment" accept="image/*" type="photo"
                                     onChange={(e) => {
                                        imagePreviewHandler(e,"defect");
                                        inputChangeHandler(e, "defect_images", sellForm, setSellForm)
                                    }} name="defect_images" />
                            </div>
                            <MediaPreview photos={defectPhotoFiles} removeHandler={defectRemoveHandler}  video={defectVideoFile}/>
                        </div>
                        </Collapse> 
                        <Button className="submit-btn btn btn-dark p-3 w-100" disabled={formLoading} type="submit">{formLoading?'Submitting..':'Done'}</Button>
                        </form>
                           </div>  
                    
            </Collapse>
        </div>
    );
}

export default SellForm;