var api = `https://api.airtable.com/v0/apph1eZbZp8qPEf7d/User?api_key=keyPBolSyO66VnA75`;
function upload() {
    $("span").click(function () {
        var email = $('#exampleInputEmail1').val();
        var password = $('#exampleInputPassword1').val();
        var username = $('#exampleInputUsername1').val();
        $.getJSON(api, function (data) {
            var item = [];
            $.each(data.records, function (index, val) {
                item.push(val.fields.email);
            })
            if (email == "") {
                $("#message").empty();
                $("#message").append(`pleast type email`);
                $("#message").css(`color`,`red`)
            } else if (password == "") {
                $("#message").empty();
                $("#message").append(`pleast type password`);
                $("#message").css(`color`,`red`)
            } else {
                if (item.indexOf(email) == -1) {
                    ajaxForUpload(email, password,username);
                } else {
                    $("#message").empty();
                    $("#message").append(`user already exist`);
                    $("#message").css(`color`,`red`)
                }
            }
        })
    })
}

function ajaxForUpload(email, password,username) {
    $.ajax({
        url: api,
        type: "POST",
        data: {
            "fields": {
                "email": email,
                "password": password,
                "username": username
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
            alert(jqXHR.status);
            alert(jqXHR.readyState);
            alert(jqXHR.statusText);
            /*弹出其他两个参数的信息*/
            alert(textStatus);
            alert(errorThrown);
            
        },
        success: function (data) {
            if (data) {
                sessionStorage.setItem('userInfo',`${email}`)
                window.location.href="backstage.html"
            }
        }
    })
}