const loginform = document.getElementById("login-form");
const user_error = document.getElementById("user-error");
const pass_error = document.getElementById("pass-error");
if(loginform){
    loginform.onsubmit = (event) =>{
        user_error.hidden = true;
        pass_error.hidden = true;
        // login_error.hidden = true;
        let user_text = document.getElementById("username").value;
        if(user_text.length === 0){
            event.preventDefault();
            user_error.hidden =false;
            return;
        } 
        if(typeof user_text !== 'string'){
            event.preventDefault();
            user_error.hidden =false;
            return;
        }
        if(user_text.length< 4){
            event.preventDefault();
            user_error.hidden = false;
            return;
        }
        if(user_text.trim().length === 0){
            event.preventDefault();
            user_error.hidden = false;
            return;
        }
        //------ login user name---//
        let pass_text = document.getElementById("password").value;
        if(pass_text.length === 0){
            event.preventDefault();
            pass_error.hidden =false;
            return;
        } 
        if(typeof pass_text !== 'string'){
            event.preventDefault();
            pass_error.hidden =false;
            return;
        }
        // if(pass_text.length < 6){
        //     event.preventDefault();
        //     user_error.hidden = false;
        //     return;
        // }
        if(pass_text.trim().length === 0){
            event.preventDefault();
            pass_error.hidden = false;
            return;
        }
        if(pass_text.indexOf() !== -1){
            event.preventDefault();
            pass_error.hidden = false;
            return;
        }
        //-----login password---//
        
    }
}