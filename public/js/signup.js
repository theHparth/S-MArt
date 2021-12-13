var readonly = true;
/*let profilebtn = document.getElementById('profilebtn');
let userfirstname = document.getElementById('userfirstname');




$(profilebtn).on('click', function() {
    $(userfirstname).attr('readonly', !readonly);

    readonly = !readonly;
    $(profilebtn).val()( readonly ? 'Edit' : 'Save' );
    return false;
})*/


$('#usersignup-form').submit(function(event) {
    $('#errorDiv').hide();
    $('#errorDiv').empty();
    try{
        email=$("#useremail").val().trim()
        firstname=$("#userfirstname").val().trim()
        lastname=$("#userlastname").val().trim()
        password=$("#password").val().trim()
        address=$("#useraddress").val().trim()
        city=$("#usercity").val().trim()
        zipcode=$("#userzipcode").val().trim()
        if(!firstname) throw "enter the first name"
        if(!lastname) throw "Enter last name"
        if(!password) throw "Enter password"
        if(!email) throw "enter email id"
        if(!address) throw "enter address"
        if(!city) throw "enter city"
        if(!zipcode) throw "enter zipcode"
        if(typeof firstname ==='boolean'|typeof lastname ==='boolean'|typeof email ==='boolean'|typeof address ==='boolean'|typeof city ==='boolean'|typeof zipcode ==='boolean'|typeof password ==='boolean'){
              throw "input cannot be a boolean"
          }
        if(typeof firstname === 'string'&typeof lastname === 'string'&typeof email === 'string'&typeof address === 'string'&typeof city === 'string'&typeof zipcode === 'string'&typeof password === 'string'){
              if(firstname.trim()==""|lastname.trim()==""|email.trim()==""|address.trim()==""|city.trim()==""|zipcode.trim()==""|password.trim()==""){
                  throw " it should not be an empty string"
              }
        }else{throw "firstname, lastname, email, website, priceRange should be a string"}

        function val(input,name) {
            if(/\s/g.test(input)==true){throw `${name} cannot have empty space`;}
        }
       
        val(firstname,'firstname')
        val(lastname,'lastname')
        val(password,'password')
        val(zipcode,'zipcoe')
        val(email,'email')
        var pat1=/(^\d{5}$)|(^\d{5}-\d{4}$)/
        if(pat1.test(zipcode)==false){
            throw "enter a valid zipcode"
        }
        if(password.length<6) throw "Password should have atleast 6 characters"


        const re =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (re.test(email.toLowerCase())==false) {
            throw `Email Address (${email}) is not valid`; }
        
    }catch(e){
        event.preventDefault();
        
        $('#errorDiv').append(`<p>Error: ${e}</p>`);
        $('#errorDiv').show();
    }
    



})
