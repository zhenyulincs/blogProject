var articleApiKey = `https://api.airtable.com/v0/apph1eZbZp8qPEf7d/article?api_key=keyPBolSyO66VnA75`
var userApiKey = `https://api.airtable.com/v0/apph1eZbZp8qPEf7d/User?api_key=keyPBolSyO66VnA75`;
var page = window.location.search;
var page = page.substring(1);
var host = window.location.host
if (sessionStorage.getItem("userInfo") == null) {
    window.location.href = `http://` + host + `/blogProject/login.html`
}
if (page == "") {
    upload();
}
else if (page == 'edit') {
    $(document).ready(function () {
        $("#write").remove();
    })
    edit()
}

function edit() {
    
}

function upload() {
    $(document).ready(function () {
        $("#upload").click(function () {
            var title = $("#exampleInputTitle1").val();
            var article = $("#richtext").val();
            var email = $("#navbarDropdown")[0].innerText;
            var email = email.substring(0, email.length - 1)
            var arrayIndex = [];
            var userid = [];
            $.get(userApiKey, function (data) {
                $.each(data.records, function (index, val) {
                    arrayIndex.push(val.fields.email)
                    userid.push(val.id)
                })
                $.post(articleApiKey, {
                    "fields": {
                        "title": title,
                        "article": article,
                        "userid": userid[arrayIndex.indexOf(email)]
                    }
                }, function () {
                    alert("success")
                })
            })
        })
    })
    
}

