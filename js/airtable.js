var apiKey = `https://api.airtable.com/v0/apph1eZbZp8qPEf7d/User?api_key=keyPBolSyO66VnA75`;
/**
 * The first parameter is necessary and the second and third one are optional.
 * The first parameter is apikey link without the "id"
 * The second parameter is id or fields
 * The third parameter is fields
 * HERE is example:
 * ================================================================================
 * ================================================================================
 * 
 */


function retrieve(apiKey, id, records) {

    var test = [];
    var apiKeyWithId = apiKey.match(/(\S*)\?/)[1];
    var api_key = apiKey.match(/\?(\S*)/)[1];
    var apiKeyWithId = apiKeyWithId + "/" + id + "?" + api_key
    if (id) {
        $.ajax({
            url: apiKeyWithId,
            error: function (jqXHR) {
                if (jqXHR.status == 404) {
                    $.ajax({
                        url: apiKey,
                        success: function (data) {
                            if (id) {
                                // $.each(data.records, function (index, val) {
                                //     test.push(val[id]['password']);
                                // })
                                test.push("123")
                            } else {
                                $.each(data.records, function (index, val) {
                                    test.push(val);
                                })
                            }
                        }
                    })
                }
            },
            success: function (data) {
                if (records) {
                    test.push(data[records])
                } else {
                    test.push(data)
                }
            }
        })
        return test;

    } else {
        $.ajax({
            url: apiKey,
            success: function (data) {
                if (records) {
                    $.each(data.records, function (index, val) {
                        test.push(val[records]);
                    })
                } else {
                    $.each(data.records, function (index, val) {
                        test.push(val);
                    })
                }
            }
        })
        return test;
    }

}


var test1 = retrieve(apiKey, `fields`);
// test1=JSON.stringify(test1)
// test1=test1.toString();  
console.log(test1.length)
