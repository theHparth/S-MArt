const editform = document.getElementById("edit-form");   
const e_user = document.getElementById("ed_username");
const e_user_error = document.getElementById("e_user_error");
const e_ownerfirst = document.getElementById("ed_ownerFirstname");
const e_first_error = document.getElementById("e_first_error");
const e_ownerlast = document.getElementById("ed_ownerLastname");
const e_last_error = document.getElementById("e_last_error");
const e_Address = document.getElementById("ed_Address");
const e_email = document.getElementById("ed_email");
const e_email_error = document.getElementById("e_email_error");
const e_pincode = document.getElementById("ed_pincode");
const e_phoneNumber = document.getElementById("ed_phoneNumber");
const e_phone_error = document.getElementById("e_phone_error");
const e_space = document.getElementById("e_space");
if(editform){
    editform.onsubmit = (event)=>{
        e_user.hidden = true;
        e_user_error.hidden = true;
        e_ownerfirst.hidden = true;
        e_first_error.hidden = true;
        e_ownerlast.hidden = true;
        e_Address.hidden = true;
        e_email.hidden = true;
        e_email_error.hidden = true;
        e_pincode.hidden = true;
        e_phoneNumber.hidden = true;
        e_phone_error.hidden = true;
        e_password.hidden = true;
        e_space.hidden = true;
    let e_user_text = document.getElementById("ed_username").value;
    if(e_user_text.length === 0){
        event.preventDefault();
        e_user.hidden =false;
        return;
    } 
    if(typeof e_user_text !== 'string'){
        event.preventDefault();
        e_user.hidden =false;
        return;
    }
    if(e_user_text.length< 4){
        event.preventDefault();
        e_user.hidden = false;
        return;
    }
    if(e_user_text.trim().length === 0){
        event.preventDefault();
        e_user.hidden = false;
        return;
    }
    var regex = new RegExp(/[^A-Za-z0-9]/g);
    if(regex.test(e_user_text)){
        event.preventDefault();
        e_user_error.hidden = false;
        return;
    }
    // if(e_user_text)
    //------user name -------//
   
    let e_first_text = document.getElementById("ed_ownerFirstname").value;
    if(e_first_text.length === 0){
        event.preventDefault();
        e_ownerfirst.hidden =false;
        return;
    } 
    if(typeof e_first_text !== 'string'){
        event.preventDefault();
        e_ownerfirst.hidden =false;
        return;
    }
    if(e_first_text.length< 4){
        event.preventDefault();
        e_ownerfirst.hidden = false;
        return;
    }
    if(e_first_text.trim().length === 0){
        event.preventDefault();
        e_ownerfirst.hidden = false;
        return;
    }
    var firstregex = new RegExp(/^[A-Za-z]+$/);
    if(!(firstregex.test(e_first_text))){
        event.preventDefault();
        e_first_error.hidden = false;
        return;
    }
    //------first name-------//

    let e_last_text = document.getElementById("ed_ownerLastname").value;
    if(e_last_text.length === 0){
        event.preventDefault();
        e_ownerlast.hidden =false;
        return;
    } 
    if(typeof e_last_text !== 'string'){
        event.preventDefault();
        e_ownerlast.hidden =false;
        return;
    }
    if(e_last_text.length< 4){
        event.preventDefault();
        e_ownerlast.hidden = false;
        return;
    }
    if(e_last_text.trim().length === 0){
        event.preventDefault();
        e_ownerlast.hidden = false;
        return;
    }
    var secondregex = new RegExp(/^[A-Za-z]+$/);
    if(!(secondregex.test(e_last_text))){
        event.preventDefault();
        e_last_error.hidden = false;
        return;
    }
    //----last name---//
    
    let e_add_text = document.getElementById("ed_Address").value;
    if(e_add_text.length === 0){
        event.preventDefault();
        e_Address.hidden =false;
        return;
    } 
    if(typeof e_add_text !== 'string'){
        event.preventDefault();
        e_Address.hidden =false;
        return;
    }
    if(e_add_text.length< 4){
        event.preventDefault();
        e_Address.hidden = false;
        return;
    }
    if(e_add_text.trim().length === 0){
        event.preventDefault();
        e_Address.hidden = false;
        return;
    }
    //------address-----//
    
    let e_email_text = document.getElementById("ed_email").value;
    if(e_add_text.length === 0){
        event.preventDefault();
        e_email.hidden =false;
        return;
    } 
    if(typeof e_email_text !== 'string'){
        event.preventDefault();
        e_email.hidden =false;
        return;
    }
    if(e_email_text.length< 4){
        event.preventDefault();
        e_email.hidden = false;
        return;
    }
    if(e_email_text.trim().length === 0){
        event.preventDefault();
        e_email.hidden = false;
        return;
    }
    var emailregex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+\=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i);
    if(!(emailregex.test(e_email_text))){
        event.preventDefault();
        e_email_error.hidden = false;
        return;
    }
    //----email----//
    
    let e_pin_text = document.getElementById("ed_pincode").value;
    if(e_pin_text.length === 0){
        
        event.preventDefault();
        e_pincode.hidden =false;
        return;
    } 
    if(typeof e_pin_text !== 'string'){
        event.preventDefault();
        e_pincode.hidden =false;
        return;
    }
    if(e_pin_text.length> 5 ){
        event.preventDefault();
        e_pincode.hidden = false;
        return;
    }
    if(e_pin_text.trim().length === 0){
        event.preventDefault();
        e_pincode.hidden = false;
        return;
    }
    //----pincode-----//
    
    let e_phone_text = document.getElementById("ed_phoneNumber").value;
    if(e_phone_text.length === 0){
        event.preventDefault();
        e_phoneNumber.hidden =false;
        return;
    } 
    if(typeof e_phone_text !== 'string'){
        event.preventDefault();
        e_phoneNumber.hidden =false;
        return;
    }
    if(e_phone_text.length< 4){
        event.preventDefault();
        e_phoneNumber.hidden = false;
        return;
    }
    if(e_phone_text.trim().length === 0){
        event.preventDefault();
        e_phoneNumber.hidden = false;
        return;
    }
    var phoneregex = new RegExp(/^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/);
    if(!(phoneregex.test(e_phone_text))){
        event.preventDefault();
        e_phone_error.hidden = false;
        return;
    }
    //----phone number----//
}
}