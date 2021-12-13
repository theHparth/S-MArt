$('#login-form').submit((event) => {
    console.log("SUBmitted form")
event.preventDefault();
const username = $("#username").val();
const password = $("#password").val();
const error_cred = $("#error-cred");

let requestConfig = {
    method : "POST",
    url : "/shop/login",
    data : {
        username : username,
        password : password,
    }
}
console.log(requestConfig)
$.ajax(requestConfig).then((responseMessage)=>{
    console.log(responseMessage);
    window.location.href = "/shopId/"+responseMessage.shopId
},
(responseMessage)=>{
    // let html = "<div><p>You have entered wrong credentials</p></div>";
    // $('.btn-dark').append(html);
    document.getElementById('pass-error').hidden = false;
})
})