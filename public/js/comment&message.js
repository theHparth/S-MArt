$('#commentsection').submit(function (event) {
    $('#errorDiv').hide();
    $('#errorDiv').empty()
    try {
        comment = $("#usercomment").val().trim().toString()
        if (comment == "" | (!typeof comment === 'string')) {
            throw " enter a valid comment"
        }


    } catch (e) {
        event.preventDefault();

        $('#errorDiv').append(`<p>Error: ${e}</p>`);
        $('#errorDiv').show();
    }


})
$('#userToShopMessaage').submit(function (event) {
    $('#errorDiv1').hide();
    $('#errorDiv1').empty()
    try {
        comment = $("#usermessage").val().trim().toString()
        if (comment == "" | (!typeof comment === 'string')) {
            throw " enter a valid message"
        }


    } catch (e) {
        event.preventDefault();

        $('#errorDiv1').append(`<p>Error: ${e}</p>`);
        $('#errorDiv1').show();
    }


})
$('#shopToUserMessaage').submit(function (event) {
    $('#errorDiv1').hide();
    $('#errorDiv1').empty()
    try {
        comment = $("#shopmessage").val().trim().toString()
        if (comment == "" | (!typeof comment === 'string')) {
            throw " enter a valid message"
        }


    } catch (e) {
        event.preventDefault();

        $('#errorDiv1').append(`<p>Error: ${e}</p>`);
        $('#errorDiv1').show();
    }


})