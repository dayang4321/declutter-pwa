export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
        return true;
    }

    
    if (rules.requiredArr) {
        isValid = value[0] && isValid;
    }


    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }
    if (rules.isAlphabet) {
        const pattern = /^[A-Za-z ]+$/;
        isValid = pattern.test(value) && isValid
    }
    if (rules.isAlphaNumeric) {
        const pattern = /^[A-Z0-9a-z ,'-]*$/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isPhone) {
        const pattern = /^[0]\d{10}$/;
        isValid = pattern.test(value) && isValid
    }
    return isValid;

};


export const inputChangeHandler = (event, inputIdentifier, Form, setForm) => {
   
    const updatedForm = { ...Form };
    const updatedFormElement = { ...Form[inputIdentifier] };
    updatedFormElement.value = inputIdentifier === "isSubscribed" ? event.target.checked : event.target.value;
    updatedFormElement.touched = true;
 
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
    
    updatedForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let elem in updatedForm) {
        if (updatedForm[elem].validation) { formIsValid = updatedForm[elem].valid && formIsValid }
    
        setForm({ ...updatedForm, formValidity: formIsValid });
    
    };

}

export const timeConvert = (time) => {
    
    const options1 = { weekday: 'long', year: "numeric", month: "long", day: "numeric" }
    const options2 =  {hour: "numeric", minute: "numeric"}
 
        return new Date(time).toLocaleDateString('en-US', options1) + ' at ' + new Date(time).toLocaleTimeString('en-US', options2)
}
