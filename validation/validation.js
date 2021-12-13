const shopNamevalidation = (ShopName) =>{
    if(!ShopName)
    throw 'The shop name is invalid';
    if(typeof ShopName!== 'string')
    throw 'The Shop name is not a string';
    if(ShopName.length === 0)
    throw 'Shop name must be provided';
    if(ShopName.trim().length ===0)
    throw 'The shop name contains only white spaces';
}

const userNamevalidation = (username) =>{
    if(!username)
    throw 'The username is invalid';
    if(typeof username !== 'string')
    throw 'The username is not a string';
    if(username.length === 0)
    throw 'username must be provided';
    if(username.length < 4)
    throw 'The username must be atleast 4 characters long';
    if(username.trim().length === 0)
    throw 'username contains only white spaces';
    var regex =new RegExp(/[^A-Za-z0-9]/g);
     if(regex.test(username))
     throw 'The username must contain only alpha numeric characters';
}

const passwordValidation = (password) =>{
    if(!password)
    throw 'The password is invalid';
    if(typeof password !== 'string')
    throw 'The password is not a string';
    if(password.length === 0)
    throw 'password must be provided';
    if(password.length < 6)
    throw 'password must be atleast 6 characters long';
    if(password.trim().length === 0)
    throw 'password contains only white spaces';
    if(password.indexOf() !== -1)
    throw 'password contains atleast one space in it';
}

const firstnamevalidation = (ownerFirstname) =>{
    if(!ownerFirstname)
    throw 'The first name is invalid';
    if(typeof ownerFirstname !== 'string')
    throw 'The first name is not a string';
    if(ownerFirstname.length === 0)
    throw 'first name must be provided';
    if(ownerFirstname.trim().length ===0)
    throw 'The first name contains only white spaces';
    // var regex =new RegExp(/^[A-Z]+$/);
    //  if(!(regex.test(ownerFirstname)))
    //  throw 'The first name must contain only alphabets';
}

const lastnamevalidation = (ownerLastname) =>{
    if(!ownerLastname)
    throw 'The last name is invalid';
    if(typeof ownerLastname !== 'string')
    throw 'The last name is not a string';
    if(ownerLastname.length === 0)
    throw 'username must be provided';
    if(ownerLastname.trim().length ===0)
    throw 'Thelast name contains only white spaces';
    // var regex =new RegExp(/^[A-Z]+$/);
    // if(!(regex.test(ownerLastname)))
    // throw 'The last name must contain only alphabets ';
}

const emailvalidation = (email) =>{
    if(!email)
    throw 'The email is invalid';
    if(typeof email !== 'string')
    throw 'The email is not a string';
    if(email.length === 0)
    throw 'email must be provided';
    if(email.trim().length ===0)
    throw 'The email contains only white spaces';
    // var regex =new RegExp(/^[a-zA-Z0-9.!#$%&'*+\=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
    // if(!(regex.test(email)))
    // throw 'The email must be in the correct format';
}

const pincodevalidation = (pincode) =>{
    if(!pincode)
    throw 'The pincode is invalid';
    if(typeof pincode !== 'string')
    throw 'The pincode is not a string';
    if(pincode.length === 0)
    throw 'pincode must be provided';
    if(pincode.trim().length ===0)
    throw 'The pincode contains only white spaces';
    // var regex =new RegExp(/^[0-9]{5}(?:-[0-9]{4})?$/);
    // if(!(regex.test(pincode)))
    // throw 'The pincode must be in the correct format';
}

const phonenumbervalidation = (phoneNumber) =>{
    if(!phoneNumber)
    throw 'The phone number is invalid';
    if(phoneNumber.length === 0)
    throw 'phone number must be provided';
    if(phoneNumber.trim().length ===0)
    throw 'The phone number contains only white spaces';
    // var regex =new RegExp(/^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/);
    // if(!(regex.test(phoneNumber)))
    // throw 'The phone number must be in the correct format';
}



module.exports = {
    shopNamevalidation,
    userNamevalidation,
    passwordValidation,
    firstnamevalidation,
    lastnamevalidation,
    emailvalidation,
    pincodevalidation,
    phonenumbervalidation
}