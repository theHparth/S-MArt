$('#loginForm').submit(function(event) {
    $('#errorDiv').hide();
    $('#errorDiv').empty();

    try{
        email=$("#email").val().trim()
        password=$("#password").val().trim()
        
        if(!password) throw "Enter password"
        if(!email) throw "enter email id"
        
        if(typeof email ==='boolean'|typeof password ==='boolean'){
              throw "input cannot be a boolean"
          }
        if(typeof email === 'string'&typeof password === 'string'){
              if(email.trim()==""|password.trim()==""){
                  throw " it should not be an empty string"
              }
        }else{throw "firstname, lastname, email, website, priceRange should be a string"}

        function val(input,name) {
            if(/\s/g.test(input)==true){throw `${name} cannot have empty space`;}
        }
       
        
        val(password,'password')
        val(email,'email')
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
