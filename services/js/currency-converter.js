/*
  API FROM https://www.exchangerate-api.com
*/

$(() => {
    const API_KEY = "362a95f4b044739b89c01431";
    const URL = `https://v3.exchangerate-api.com/bulk/${API_KEY}/INR`;

    $.get('../services/misc/curr_data.json',function(data){
        curr_data = data;
    },'json');

    $.get({
        url: URL,
        cors: true,
        secure: true,
        success: function (data) {
            if (data.result == "success") {
                $.each(data.rates, function (key, value) {
                    $('#from').append($("<option></option>")
                        .attr("value", key)
                        .text(key));
                    $('#to').append($("<option></option>")
                        .attr("value", key)
                        .text(key));
                });
            }
        },
        error: function (error) {
            console.log(error);
        }
    });

    $('select').change(function(){
        console.log(this);
        var id = $(this).prop("id");
        var select_val = $.trim($(this).val()).toUpperCase();
        var curr_full = "";
        $.each(curr_data, function(index, value){
            if(value['curr_short'] == select_val){
                curr_full = value['curr_full'];
            }
        });
        if(id == "from"){
            $('#from_curr_help').css("display", "block");
            $('#from_curr_help').text(curr_full);
        }else if(id == "to"){
            $('#to_curr_help').css("display", "block");
            $('#to_curr_help').text(curr_full);
        }
    });

    $("#submit").click(function (e) {
        e.preventDefault();

        var from_type = $("#from")
            .val()
            .toUpperCase();
        var from_amt = $("#from_amt").val();
        var to_type = $("#to")
            .val()
            .toUpperCase();

        $.get({
            url: URL,
            cors: true,
            secure: true,
            success: function (data) {
                if (data.result == "success") {
                    $("#to_amt").val(data.rates[to_type] * from_amt);
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});