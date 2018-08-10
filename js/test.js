var apiKey = `https://api.airtable.com/v0/apph1eZbZp8qPEf7d/User?api_key=keyPBolSyO66VnA75`;
// var item = [];
function test1() {
    // var item = [];
    $.ajax({
        url:apiKey,
        type:"GET",
        success:function (data) {
            return callback(data);
        }
    });
    function callback(data) {
        return data
    }
    
    
}
// test1();
console.log(test1());
// console.log(item.length);
// console.log(item instanceof Array);

