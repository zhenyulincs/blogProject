var apiKey = `https://api.airtable.com/v0/apph1eZbZp8qPEf7d/User?api_key=keyPBolSyO66VnA75`;
var item = [];
$.ajax({
    url:apiKey,
    success:function(data) {
        $.each(data.records,function(index,val) {
            item.push(val.id)
        })
        console.log(item.toString());
    }
})
