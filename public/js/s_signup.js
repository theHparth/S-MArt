const signupform =document.getElementById("signup-form");
const shopname = document.getElementById("Shopname");
const s_user = document.getElementById("s_username");
const s_user_error = document.getElementById("s_user_error");
const s_ownerfirst = document.getElementById("s_ownerFirstname");
const s_first_error = document.getElementById("s_first_error");
const s_ownerlast = document.getElementById("s_ownerLastname");
const s_last_error = document.getElementById("s_last_error");
const s_Address = document.getElementById("s_Address");
const s_email = document.getElementById("s_email");
const s_email_error = document.getElementById("s_email_error");
const s_pincode = document.getElementById("s_pincode");
const s_pin = document.getElementById("s_pin");
const s_phoneNumber = document.getElementById("s_phoneNumber");
const s_phone_error = document.getElementById("s_phone_error");
const s_password = document.getElementById("s_password");
const s_space = document.getElementById("s_space");

if(signupform){
    signupform.onsubmit = (event) =>{
        // event.preventDefault();
        shopname.hidden = true;
        s_user.hidden = true;
        s_user_error.hidden = true;
        s_ownerfirst.hidden = true;
        s_first_error.hidden = true;
        s_ownerlast.hidden = true;
        s_Address.hidden = true;
        s_email.hidden = true;
        s_email_error.hidden = true;
        s_pincode.hidden = true;
        s_pin.hidden = true;
        s_phoneNumber.hidden = true;
        s_phone_error.hidden = true;
        s_password.hidden = true;
        s_space.hidden = true;
        let shopname_text = document.getElementById("shopName").value;
        if(shopname_text.length === 0){
            event.preventDefault();
            shopname.hidden =false;
            return;
        } 
        if(typeof shopname_text !== 'string'){
            event.preventDefault();
            shopname.hidden =false;
            return;
        }
        if(shopname_text.length< 4){
            event.preventDefault();
            shopname.hidden = false;
            return;
        }
        if(shopname_text.trim().length === 0){
            event.preventDefault();
            shopname.hidden = false;
            return;
        }
        //--------Shop name------//
        
        let s_user_text = document.getElementById("username").value;
        if(s_user_text.length === 0){
            event.preventDefault();
            s_user.hidden =false;
            return;
        } 
        if(typeof s_user_text !== 'string'){
            event.preventDefault();
            s_user.hidden =false;
            return;
        }
        if(s_user_text.length< 4){
            event.preventDefault();
            s_user.hidden = false;
            return;
        }
        if(s_user_text.trim().length === 0){
            event.preventDefault();
            s_user.hidden = false;
            return;
        }
        var regex = new RegExp(/[^A-Za-z0-9]/g);
        if(regex.test(s_user_text)){
            event.preventDefault();
            s_user_error.hidden = false;
            return;
        }
        // if(s_user_text)
        //------user name -------//
       
        let s_first_text = document.getElementById("ownerFirstname").value;
        if(s_first_text.length === 0){
            event.preventDefault();
            s_ownerfirst.hidden =false;
            return;
        } 
        if(typeof s_first_text !== 'string'){
            event.preventDefault();
            s_ownerfirst.hidden =false;
            return;
        }
        if(s_first_text.length< 4){
            event.preventDefault();
            s_ownerfirst.hidden = false;
            return;
        }
        if(s_first_text.trim().length === 0){
            event.preventDefault();
            s_ownerfirst.hidden = false;
            return;
        }
        var firstregex = new RegExp(/^[A-Za-z]+$/);
        if(!(firstregex.test(s_first_text))){
            event.preventDefault();
            s_first_error.hidden = false;
            return;
        }
        //------first name-------//

        let s_last_text = document.getElementById("ownerLastname").value;
        if(s_last_text.length === 0){
            event.preventDefault();
            s_ownerlast.hidden =false;
            return;
        } 
        if(typeof s_last_text !== 'string'){
            event.preventDefault();
            s_ownerlast.hidden =false;
            return;
        }
        if(s_last_text.length< 4){
            event.preventDefault();
            s_ownerlast.hidden = false;
            return;
        }
        if(s_last_text.trim().length === 0){
            event.preventDefault();
            s_ownerlast.hidden = false;
            return;
        }
        var secondregex = new RegExp(/^[A-Za-z]+$/);
        if(!(secondregex.test(s_last_text))){
            event.preventDefault();
            s_last_error.hidden = false;
            return;
        }
        //----last name---//
        
        let s_add_text = document.getElementById("Address").value;
        if(s_add_text.length === 0){
            event.preventDefault();
            s_Address.hidden =false;
            return;
        } 
        if(typeof s_add_text !== 'string'){
            event.preventDefault();
            s_Address.hidden =false;
            return;
        }
        if(s_add_text.length< 4){
            event.preventDefault();
            s_Address.hidden = false;
            return;
        }
        if(s_add_text.trim().length === 0){
            event.preventDefault();
            s_Address.hidden = false;
            return;
        }
        //------address-----//
        
        let s_email_text = document.getElementById("email").value;
        if(s_add_text.length === 0){
            event.preventDefault();
            s_email.hidden =false;
            return;
        } 
        if(typeof s_email_text !== 'string'){
            event.preventDefault();
            s_email.hidden =false;
            return;
        }
        if(s_email_text.length< 4){
            event.preventDefault();
            s_email.hidden = false;
            return;
        }
        if(s_email_text.trim().length === 0){
            event.preventDefault();
            s_email.hidden = false;
            return;
        }
        var emailregex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+\=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i);
        if(!(emailregex.test(s_email_text))){
            event.preventDefault();
            s_email_error.hidden = false;
            return;
        }
        //----email----//
        
        let s_pin_text = document.getElementById("pincode").value;
        if(s_pin_text.length === 0){
            event.preventDefault();
            s_pincode.hidden =false;
            return;
        } 
        if(typeof s_pin_text !== 'string'){
            event.preventDefault();
            s_pincode.hidden =false;
            return;
        }
        if(s_pin_text.trim().length === 0){
            event.preventDefault();
            s_pincode.hidden = false;
            return;
        }
        if(s_pin_text.length>5){
            event.preventDefault();
            s_pincode.hidden = false;
            return;
        }
        // var pinregex =new RegExp(/^[0-9]{5}(?:-[0-9]{4})?$/);
        // if(!(pinregex.test(s_pin_text))){
        //     s_pin.hidden = false;
        //     return;
        // }
        //----pincode-----//
        
        let s_phone_text = document.getElementById("phoneNumber").value;
        if(s_phone_text.length === 0){
            event.preventDefault();
            s_phoneNumber.hidden =false;
            return;
        } 
        if(typeof s_phone_text !== 'string'){
            event.preventDefault();
            s_phoneNumber.hidden =false;
            return;
        }
        if(s_phone_text.length< 4){
            event.preventDefault();
            s_phoneNumber.hidden = false;
            return;
        }
        if(s_phone_text.trim().length === 0){
            event.preventDefault();
            s_phoneNumber.hidden = false;
            return;
        }
        var phoneregex = new RegExp(/^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/);
        if(!(phoneregex.test(s_phone_text))){
            event.preventDefault();
            s_phone_error.hidden = false;
            return;
        }
        //----phone number----//
        
        let s_pass_text = document.getElementById("spassword").value;
        if(s_pass_text.length === 0){
            event.preventDefault();
            s_password.hidden =false;
            return;
        } 
        if(typeof s_pass_text !== 'string'){
            event.preventDefault();
            s_password.hidden =false;
            return;
        }
        if(s_pass_text.length< 6){
            event.preventDefault();
            s_password.hidden = false;
            return;
        }
        if(s_pass_text.trim().length === 0){
            event.preventDefault();
            s_password.hidden = false;
            return;
        }
        if((s_pass_text.indexOf() !== -1)){
            event.preventDefault();
            s_space.hidden = false;
            return;
        }
        //----password----//
    }
}
