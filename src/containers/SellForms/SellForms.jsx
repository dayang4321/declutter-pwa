import React,{useState,useEffect, useCallback} from 'react';
import SellForm from './SellForm/SellForm';

import { ReactComponent as PlusCircle } from '../../assets/img/svg/plus-circle.svg'
import Tick from '../../assets/img/svg/tick.svg'
import './SellForms.css'

function SellForms() {

    const [isOpenArr, setIsOpenArr] = React.useState([true])

  const [isCompleted, setIsCompleted] =  React.useState(false)

    const [sellFormsArr, setSellFormsArr] = useState([])
    
    
    const formIndex = sellFormsArr.length;

   

    



    const addProductHandler = () => {
      //  setSellFormsArr([]);
        setIsCompleted(false)
        console.log(isOpenArr);

        console.log(sellFormsArr)
        
        if ( isOpenArr.length > 4 ){
            return
        }

    //    setSellFormsArr(sellFormsArr.concat(<SellForm isOpen={isOpenArr[formIndex]} key={formIndex} />));
        const newArr = isOpenArr.map((bool) => {
            return false
        }).concat(true);
        setIsOpenArr(newArr)
    }
    
    const openHandler = useCallback((id) => {

        console.log(id)
  const newArr =  isOpenArr.map((bool, index) => {
      if (index === id) {
               return true
      }
      else return false
  })
        setIsOpenArr([...newArr]);
    },[isOpenArr])

    const completedHandler = () => {
        setIsOpenArr([]);
        setIsCompleted(true)
    }

    useEffect(() => {
        const formArr = isOpenArr.map((bool,index) => {
            return (<SellForm isOpen={bool} key={index} id={index} complete={completedHandler} openHandler={openHandler} />)
       }) 

    setSellFormsArr(formArr)
 },[isOpenArr,openHandler])






    const completeMsg = (
        <div className="text-center">
        <img className="tick-svg mx-auto" src={Tick} alt="tick" />
            <h2 className="text-left">You would be notified once your products are verified</h2>
            <button className="another-btn w-100 text-center btn bg-transparent"
                    onClick={(e) => {
                        e.preventDefault();
                      
                        addProductHandler();
                        console.log(sellFormsArr)
                    }}>
                    <PlusCircle className="mr-3" />Add another product</button>
            </div>
    )



    console.log(isOpenArr, formIndex, sellFormsArr )

    return (
     <div>
   {!isCompleted && (      <h2 className="mb-4">
       Lets help you sell your product.
    </h2>  )}  
         
                {isCompleted? completeMsg : sellFormsArr}
        </div>
    );
}

export default SellForms;