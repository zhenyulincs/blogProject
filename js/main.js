var articleApiKey = `https://api.airtable.com/v0/apph1eZbZp8qPEf7d/article?api_key=keyPBolSyO66VnA75`
var userApiKey = `https://api.airtable.com/v0/apph1eZbZp8qPEf7d/User?api_key=keyPBolSyO66VnA75`;
var page = window.location.search
var page = page.substring(4)
if (page == '') {
    $(document).ready(function () {
        index();
    })
} else {
    $(document).ready(function () {
        $("#carouselExampleIndicators").remove()
        $(".cardbox").remove()

        article()
    })
}
$(document).ready(function() {
    if (sessionStorage.getItem("userInfo")!= null) {
        $("#user").html(`
        <li class="nav-item dropdown mr-auto">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true"
                aria-expanded="false">
                <script>$("#navbarDropdown").append(sessionStorage.getItem("userInfo"))</script>
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <button class='dropdown-item' id='logout'>Logout</button>
              </div>
            </li>
        `)
    }
    $('#logout').click(function() {
        sessionStorage.removeItem("userInfo")
        location.reload()
    })
})


function article() {
    var author = page.match(/(\S*)\&/)[1]
    var id = page.match(/\&(\S*)/)[1]
    id = id.substring(3)
    author = author.substring(4)
    console.log(author);
    console.log(id);


    var articleApiKeyWithId = articleApiKey.match(/(\S*)\?/)[1] + "/" + id + "?" + articleApiKey.match(/\?(\S*)/)[1]

    $.get(articleApiKeyWithId, function (data) {
        showArticle(data.fields.title, data.fields.article, author)
    })

    function showArticle(title, article, author) {
        $("article").html(`
        <h2 class='text-center'>${title}</h2>
        <p class='text-center'>Author: ${author}</p>
        <p>${article}</p>
        `)
    }
}


function index() {
    $.get(userApiKey, function (data) {
        var userIdWithUsername = [];
        $.each(data.records, function (index, val) {
            userIdWithUsername.push({
                'id': val.id,
                'username': val.fields.username
            })
        })
        $.get(articleApiKey, function (data) {
            $.each(data.records, function (index, val) {
                for (var i = 0; i < userIdWithUsername.length; i++) {
                    if (val.fields.userid == userIdWithUsername[i].id) {
                        card(val.fields.title, userIdWithUsername[i].username, val.id)
                    }
                }
            })
        })

    })

    function card(title, username, id) {
        $(".cardbox .row").append(`
        <div class="col-sm-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">Author: ${username}</p>
                    <a href="?author=${username}&id=${id}" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
              
        `)
    }
}



