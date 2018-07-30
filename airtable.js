var apiKey = `https://api.airtable.com/v0/apph1eZbZp8qPEf7d/User?api_key=keyPBolSyO66VnA75`;

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
                                    $.each(data.records, function (index, val) {
                                        test.push(val[id]);
                                    })
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
                    // $.each(data, function (index, val) {
                    //     test.push(val[records]);
                    // })
                    test.push(data[records])
                } else {
                    // $.each(data, function (index, val) {
                    //     test.push(val);
                    // })
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


var test1 = retrieve(apiKey,"recEXkVFZHdfM3fZZ");
console.log(test1)