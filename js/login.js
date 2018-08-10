var api = `https://api.airtable.com/v0/apph1eZbZp8qPEf7d/User?api_key=keyPBolSyO66VnA75`;
var airtable_email = [];
var airtable_password = [];
function check() {
    $.getJSON(api, function (data) {
        $.each(data.records, function (index, val) {
            airtable_email.push(val.fields.email);
            airtable_password.push(val.fields.password);
        })
        $("span").click(function () {
            var email = $('#exampleInputEmail1').val();
            var password = $('#exampleInputPassword1').val();
            if (email == "") {
                $(".message").empty();
                $(".message").append("please type email")
            } else if (password == "") {
                $(".message").empty();
                $(".message").append("please type password")
            } else {
                if (airtable_email.indexOf(email) != -1) {
                    airtable_emailIndex = airtable_email.indexOf(email);
                    if (airtable_password[airtable_emailIndex] == password) {
                        sessionStorage.setItem('userInfo',`${email}`)
                        window.location.href='backstage.html'
    
                    } else {
                        $(".message").empty();
                        $(".message").append("wrong password")

                    }
                } else {
                    $(".message").empty();
                    $(".message").append("wrong email")

                }
            }
        })

        // console.log(airtable_email[0])
        // console.log(airtable_password)
    });
}



