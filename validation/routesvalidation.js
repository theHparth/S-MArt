const routeshopNamevalidation = (ShopName) =>{
    if(!ShopName)
    return 'The shop name is invalid';
    if(typeof ShopName!== 'string')
    return 'The Shop name is not a string';
    if(ShopName.length === 0)
    return 'Shop name must be provided';
    if(ShopName.trim().length ===0)
    return 'The shop name contains only white spaces';
}

const routeuserNamevalidation = (username) =>{
    if(!username)
    return 'The username is invalid';
    if(typeof username !== 'string')
    return 'The username is not a string';
    if(username.length === 0)
    return 'username must be provided';
    if(username.length < 4)
    return 'The username must be atleast 4 characters long';
    if(username.trim().length === 0)
    return 'username contains only white spaces';
    var regex =new RegExp(/[^A-Za-z0-9]/g);
     if(regex.test(username))
     return 'The username must contain only alpha numeric characters';
}

const routepasswordValidation = (password) =>{
    if(!password)
    return 'The password is invalid';
    if(typeof password !== 'string')
    return 'The password is not a string';
    if(password.length === 0)
    return 'password must be provided';
    if(password.length < 6)
    return 'password must be atleast 6 characters long';
    if(password.trim().length === 0)
    return 'password contains only white spaces';
    if(password.indexOf() !== -1)
    return 'password contains atleast one space in it';
}

const routefirstnamevalidation = (ownerFirstname) =>{
    if(!ownerFirstname)
    return 'The first name is invalid';
    if(typeof ownerFirstname !== 'string')
    return 'The first name is not a string';
    if(ownerFirstname.length === 0)
    return 'first name must be provided';
    if(ownerFirstname.trim().length ===0)
    return 'The first name contains only white spaces';
    // var regex =new RegExp(/^[A-Z]+$/);
    //  if((regex.test(ownerFirstname)))
    //  return 'The first name must contain only alphabets';
}

const routelastnamevalidation = (ownerLastname) =>{
    if(!ownerLastname)
    return 'The last name is invalid';
    if(typeof ownerLastname !== 'string')
    return 'The last name is not a string';
    if(ownerLastname.length === 0)
    return 'username must be provided';
    if(ownerLastname.trim().length ===0)
    return 'Thelast name contains only white spaces';
    // var regex =new RegExp(/^[A-Z]+$/);
    // if(!(regex.test(ownerLastname)))
    // return 'The last name must contain only alphabets ';
}

const routeemailvalidation = (email) =>{
    if(!email)
    return 'The email is invalid';
    if(typeof email !== 'string')
    return 'The email is not a string';
    if(email.length === 0)
    return 'email must be provided';
    if(email.trim().length ===0)
    return 'The email contains only white spaces';
    // var regex =new RegExp(/^[a-zA-Z0-9.!#$%&'*+\=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
    // if(!(regex.test(email)))
    // return 'The email must be in the correct format';
}

const routepincodevalidation = (pincode) =>{
    if(!pincode)
    return 'The pincode is invalid';
    if(typeof pincode !== 'string')
    return 'The pincode is not a string';
    if(pincode.length === 0)
    return 'pincode must be provided';
    if(pincode.trim().length ===0)
    return 'The pincode contains only white spaces';
    // var regex =new RegExp(/^[0-9]{5}(?:-[0-9]{4})?$/);
    // if(!(regex.test(pincode)))
    // return 'The pincode must be in the correct format';
}

const routephonenumbervalidation = (phoneNumber) =>{
    if(!phoneNumber)
    return 'The phone number is invalid';
    if(phoneNumber.length === 0)
    return 'phone number must be provided';
    if(phoneNumber.trim().length ===0)
    return 'The phone number contains only white spaces';
    // var regex =new RegExp(/^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/);
    // if(!(regex.test(phoneNumber)))
    // return 'The phone number must be in the correct format';
}



module.exports = {
    routeshopNamevalidation,
    routeuserNamevalidation,
    routepasswordValidation,
    routefirstnamevalidation,
    routelastnamevalidation,
    routeemailvalidation,
    routepincodevalidation,
    routephonenumbervalidation
}