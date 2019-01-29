/*
  API FROM https://www.exchangerate-api.com
*/

$(() => {
    const API_KEY = "362a95f4b044739b89c01431";
    const CURRENCIES = `INR AED ALL AMD ANG AOA ARS AUD AZN BBD BDT BGN BHD BRL BSD BWP BYN CAD CHF CLP CNY COP CZK DKK
                        DOP DZD EGP ETB EUR FJD GBP GEL GHS GNF GTQ HKD HNL HRK HUF IDR ILS IQD IRR ISK JMD JOD JPY KES
                        KHR KRW KWD KZT LAK LBP LKR MAD MDL MKD MMK MUR MXN MYR NAD NGN NOK NZD OMR PAB PEN PGK PHP PKR
                        PLN PYG QAR RON RSD RUB SAR SCR SEK SGD THB TJS TND TRY TTD TWD TZS UAH USD UYU UZS VEF VND XAF
                        XCD XOF XPF ZAR ZMW`.split(/\s+/);

    $.get('../services/misc/curr_data.json',function(data){
        curr_data = data;
    },'json');

    $.each(CURRENCIES, function (index, value) {
        $('#from').append($("<option></option>")
            .attr("value", value)
            .text(value));
        $('#to').append($("<option></option>")
            .attr("value", value)
            .text(value));
    });

    $('#from_amt').keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            ((e.keyCode === 65 || e.keyCode === 67 || e.keyCode === 86) && (e.ctrlKey === true ||
            e.metaKey === true)) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode >
                105)) {
            e.preventDefault();
        }
    });

    $('select').change(function(){
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

        const CUSTOM_URL = `https://v3.exchangerate-api.com/bulk/${API_KEY}/${from_type}`;
        $.get({
            url: CUSTOM_URL,
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