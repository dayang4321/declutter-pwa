import React,{useState,useEffect, useCallback} from 'react';
import SellForm from './SellForm/SellForm';

import { ReactComponent as PlusCircle } from '../../assets/img/svg/plus-circle.svg'
import './SellForms.css'

function SellForms() {

    const [isOpenArr, setIsOpenArr] = React.useState([true])

  

    const [sellFormsArr, setSellFormsArr] = useState([])
    
    
    const formIndex = sellFormsArr.length;

   

    



    const addProductHandler=()=>{
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


    useEffect(() => {
        const formArr = isOpenArr.map((bool,index) => {
            return (<SellForm isOpen={bool} key={index} id={index} openHandler={openHandler} />)
       }) 

    setSellFormsArr(formArr)
 },[isOpenArr,openHandler])








    console.log(isOpenArr, formIndex, sellFormsArr )

    return (
        <div className="d-flex align-items-center w-100 h-100 justify-content-center">       
            <form className="w-100" id="sellForm">
                {sellFormsArr}
                <button className="another-btn py-2 px-3 w-100 text-center btn bg-transparent"
                    onClick={(e) => {
                        e.preventDefault();
                      
                        addProductHandler();
                        console.log(sellFormsArr)}}>
                    <PlusCircle className="mr-3"/>Add another product</button>
                    <button className="submit-btn btn btn-dark p-3 w-100"  type="submit">Done</button>
              </form>
        </div>
    );
}

export default SellForms;