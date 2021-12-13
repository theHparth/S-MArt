
$('#update_user_profile').submit(function(event) {
    $('#errorDiv').hide();
    $('#errorDiv').empty();

    try{
        
        firstname=$("#userfirstname").val().trim()
        lastname=$("#userlastname").val().trim()
        address=$("#useraddress").val().trim()
        city=$("#usercity").val().trim()
        zipcode=$("#userzipcode").val().trim()
        if(!firstname) throw "enter the first name"
        if(!lastname) throw "Enter last name"
        if(!address) throw "enter address"
        if(!city) throw "enter city"
        if(!zipcode) throw "enter zipcode"
        if(typeof firstname ==='boolean'|typeof lastname ==='boolean'|typeof address ==='boolean'|typeof city ==='boolean'|typeof zipcode ==='boolean'){
              throw "input cannot be a boolean"
          }
        if(typeof firstname === 'string'&typeof lastname === 'string'&typeof address === 'string'&typeof city === 'string'&typeof zipcode === 'string'){
              if(firstname.trim()==""|lastname.trim()==""|address.trim()==""|city.trim()==""|zipcode.trim()==""){
                  throw " it should not be an empty string"
              }
        }else{throw "firstname, lastname, email, website, priceRange should be a string"}

        function val(input,name) {
            if(/\s/g.test(input)==true){throw `${name} cannot have empty space`;}
        }
       
        val(firstname,'firstname')
        val(lastname,'lastname')
        val(zipcode,'zipcoe')
        var pat1=/(^\d{5}$)|(^\d{5}-\d{4}$)/
        if(pat1.test(zipcode)==false){
            throw "enter a valid zipcode"
        }
    
        
    }catch(e){
        event.preventDefault();
        
        $('#errorDiv').append(`<p>Error: ${e}</p>`);
        $('#errorDiv').show();
    }
    



})
