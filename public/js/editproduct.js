$('#updateitemform').submit(function(event) {
    $('#errorDiv').hide();
    $('#errorDiv').empty()
    try{
        productname=$("#prodn").val().trim().toString()
        productdetails=$("#prodd").val().trim().toString()
        producthighlights=$("#prodh").val().trim().toString()
        price=$("#prodp").val().trim().toString()
        quantityremaining=$("#prodq").val().trim().toString()
        dateofmanufacture=$("#prodm").val().trim().toString()
        dateofexpiry=$("#prode").val().trim().toString()
       
        var message;

    var todayDate = new Date().toISOString().slice(0, 10);

    // mDate = new Date(dateofmanufacture);
    // eData = new Date(dateofexpiry);
    var qtyRem = parseInt(quantityremaining)

    //else if (/^\s+$/.test(keyword))
    if (!productname ) {
        message = ('Please enter product name');
        throw message
    }
    if (!productdetails ) {
        message = ('Please enter product details');
        throw message
    }
    if (!producthighlights ) {
        message = ('Please enter product highlights');
        throw message
    }
    if (!price || (/^\s+$/.test(price))) {
        message = ('Please enter price');
        throw message
    }
    if (!quantityremaining || (/^\s+$/.test(quantityremaining))) {
        message = ('Please enter quantity remaining');
        throw message
    }
    if (!dateofmanufacture || (/^\s+$/.test(dateofmanufacture))) {
        message = ('Please enter date of manufacture');
        throw message
    }
    if (!dateofexpiry || (/^\s+$/.test(dateofexpiry))) {
        message = ('Please enter date of expiry');
        throw message
    }

    if (dateofmanufacture > todayDate) {
        message = ('Date of Manufacture can\'t be future data');
        throw message
    }
    if (dateofexpiry < todayDate) {
        message = ('Date of Expire can\'t be past date');
        throw message
    }

    if ((!productname) || typeof productname != 'string') {
        message = `productname "${productname}" is not valid.`
        throw message
    }
    if ((!productdetails) || typeof productdetails != 'string' || (!productdetails.match(/^[0-9A-z ]{5,}$/))) {
        message = `productdetails "${productdetails}" is not valid.`
        throw message
    }
    if ((!producthighlights) || typeof producthighlights != 'string') {
        message = `producthighlights "${producthighlights}" is not valid.`
        throw message
    }

    if ((!price) || (!price.match(/^(?!0\d)\d*(\.\d+)?$/))) {
        message = `Price "${price}" is not valid`
        throw message
    }

    if ((!quantityremaining) || typeof qtyRem != 'number' ) {
        message = 'Enter valid number of Qty. is remine'
        throw message
    }


    }catch(e){
        event.preventDefault();
        
        $('#errorDiv').append(`<p>Error: ${e}</p>`);
        $('#errorDiv').show();
    }


})
