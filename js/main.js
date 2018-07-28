// URL from airtable
var airtable_list_api = "https://api.airtable.com/v0/appAyqnyuWEoJ5g6F/Table%201?api_key=keyPBolSyO66VnA75";
// This is where I get the JSON data from airtable

var airtable_item = [];
$.getJSON(airtable_list_api, function (data) {
    $.each(data.records,function (index,val) {
        airtable_item.push("<h2>"+val.fields.article+"</h2>");
    })
    $(".article").append(airtable_item);
    console.log(airtable_item);
})