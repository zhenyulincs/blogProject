var articleApiKey = `https://api.airtable.com/v0/apph1eZbZp8qPEf7d/article?api_key=keyPBolSyO66VnA75`
var userApiKey = `https://api.airtable.com/v0/apph1eZbZp8qPEf7d/User?api_key=keyPBolSyO66VnA75`;
var page = window.location.search;
var page = page.substring(1);
var host = window.location.host
if (sessionStorage.getItem("userInfo") == null) {
    window.location.href = `http://` + host + `/blogProject/login.html`
}
if (page == "") {
    $(document).ready(function () {
        $("#tableShow").remove();
        upload();
    })
}
else if (page == 'edit') {
    $(document).ready(function () {
        $("#writingarea").remove();
        $("#writelink").removeClass("active");
        $("#editlink").addClass("active")
        edit()
    })

}
else if (page == 'delete') {
    $(document).ready(function () {
        $("#writingarea").remove();
        $("#writelink").removeClass("active");
        $("#deletelink").addClass("active");
        del();
    })
}
else if (page == 'check') {
    $(document).ready(function () {
        $("#writingarea").remove();
        $("#writelink").removeClass("active");
        $("#checklink").addClass("active");
        $("#exampleModal").remove();
        check();
    })
}

$(document).ready(function() {
    $('#logout').click(function() {
        sessionStorage.removeItem("userInfo")
        location.reload()
    })
})

function check() {
    var email = $("#navbarDropdown")[0].innerText;
    var email = email.substring(0, email.length - 1)
    var arrayIndex = [];
    var allUserId = [];
    $.get(userApiKey, function (data) {
        $.each(data.records, function (index, val) {
            arrayIndex.push(val.fields.email)
            allUserId.push(val.id)
        })
        var currentUserId = allUserId[arrayIndex.indexOf(email)]
        var number = 0
        var userApiKeyWithId = userApiKey.match(/(\S*)\?/)[1] + "/" + currentUserId + "?" + userApiKey.match(/\?(\S*)/)[1]
        $.get(articleApiKey, function (data) {
            $.each(data.records, function (index, val) {
                if (currentUserId == val.fields.userid) {
                    number++
                    $("#tbody").append(
                        `<tr style='cursor:pointer' data-toggle="modal" data-target="#exampleModal">` +
                        `<th scope='row'>${number}</th>` +
                        `<td>${val.fields.title}</td>` +
                        `<input type='hidden' value='${val.id}'>` +
                        `</tr>`
                    )
                }
            })            
            $("tbody").on("click", "tr", function () {
                var id = $(this).children("input:hidden").val()
                var userApiKeyWithId = userApiKey.match(/(\S*)\?/)[1] + "/" + currentUserId + "?" + userApiKey.match(/\?(\S*)/)[1]
                $.get(userApiKeyWithId, function (data) {
                    window.location.href = `https://` + host + `/blogProject?author=${data.fields.username}&id=${id}`
                })
            })
        })
    })
}

function del() {
    var email = $("#navbarDropdown")[0].innerText;
    var email = email.substring(0, email.length - 1)
    var arrayIndex = [];
    var allUserId = [];
    $("#modalForEdit").html(`
    <p>Are you sure delete this article?</p>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="submitFordel">Sure</button>
              </div>
    `)
    $.get(userApiKey, function (data) {
        $.each(data.records, function (index, val) {
            arrayIndex.push(val.fields.email)
            allUserId.push(val.id)
        })
        var currentUserId = allUserId[arrayIndex.indexOf(email)]
        var number = 0
        $.get(articleApiKey, function (data) {
            $.each(data.records, function (index, val) {
                if (currentUserId == val.fields.userid) {
                    number++
                    $("#tbody").append(
                        `<tr style='cursor:pointer' data-toggle="modal" data-target="#exampleModal">` +
                        `<th scope='row'>${number}</th>` +
                        `<td>${val.fields.title}</td>` +
                        `<input type='hidden' value='${val.id}'>` +
                        `</tr>`
                    )
                }
            })
            $("tbody").on("click", "tr", function () {
                var currentArticleId = $(this).children("input:hidden").val()
                var articleApiKeyWithId = articleApiKey.match(/(\S*)\?/)[1] + "/" + currentArticleId + "?" + articleApiKey.match(/\?(\S*)/)[1]
                $("#submitFordel").click(function () {
                    $.ajax({
                        url: articleApiKeyWithId,
                        type: "DELETE",
                        success: function () {
                            location.reload()
                            alert("success")
                        }
                    })

                })
            })
        })
    })
}

function edit() {
    var email = $("#navbarDropdown")[0].innerText;
    var email = email.substring(0, email.length - 1)
    var arrayIndex = [];
    var allUserId = [];
    $("#modalForEdit").html(`<div class="form-group">
    <label for="exampleInputTitle1">Title</label>
    <input type="text" class="form-control" id="inputTitleForEdit" placeholder="Title">
  </div>
  <textarea id="writeForEdit"cols="30" rows="10"></textarea>
  <script>
    $(function () {
      $('textarea').froalaEditor({
        imageUpload: false,
        videoUpload: false,
        fileUpload: false,
        quickInsertButtons: ['table', 'ul', 'ol', 'hr']
      })
    });  </script>
</div>
<div class="modal-footer">
<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
<button type="button" class="btn btn-primary" id="submitForEdit">Save changes</button>
</div>`)
    $.get(userApiKey, function (data) {
        $.each(data.records, function (index, val) {
            arrayIndex.push(val.fields.email)
            allUserId.push(val.id)
        })
        var currentUserId = allUserId[arrayIndex.indexOf(email)]
        var number = 0
        $.get(articleApiKey, function (data) {
            $.each(data.records, function (index, val) {
                if (currentUserId == val.fields.userid) {
                    number++
                    $("#tbody").append(
                        `<tr style='cursor:pointer' data-toggle="modal" data-target="#exampleModal">` +
                        `<th scope='row'>${number}</th>` +
                        `<td>${val.fields.title}</td>` +
                        `<input type='hidden' value='${val.id}'>` +
                        `</tr>`
                    )
                }
            })

            $("tbody").on('click', 'tr', function () {
                var currentArticleId = $(this).children("input:hidden").val()
                var articleApiKeyWithId = articleApiKey.match(/(\S*)\?/)[1] + "/" + currentArticleId + "?" + articleApiKey.match(/\?(\S*)/)[1]
                $.get(articleApiKeyWithId, function (data) {
                    $("#inputTitleForEdit").val(data.fields.title)
                    $(".fr-element").html(data.fields.article)
                    $("#submitForEdit").click(function () {
                        $.ajax({
                            url: articleApiKeyWithId,
                            type: "PATCH",
                            data: {
                                fields: {
                                    title: $("#inputTitleForEdit").val(),
                                    article: $(".fr-element")[0].innerHTML,
                                }
                            },
                            success: function () {
                                location.reload();
                                alert("success")
                            }
                        })
                    })
                })
            })
        })

    })
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
                    location.reload()
                    alert("success")
                })
            })
        })
    })

}

