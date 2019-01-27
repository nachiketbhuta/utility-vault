if ($) {
  $("#submit").click(function(e) {
    e.preventDefault();

    var from_type = $("#from")
      .val()
      .toUpperCase();
    var from_amt = $("#from_amt").val();
    var to_type = $("#to")
      .val()
      .toUpperCase();

    const API_KEY = "g941JYvtybNOm9VPylWFzbwtOMNXDsTl";

    const URL = `https://forex.1forge.com/1.0.3/convert?from=${from_type}&to=${to_type}
                &quantity=${from_amt}&api_key=${API_KEY}`;

    $.get({
      url: URL,
      cors: true,
      secure: true,
      success: function(data) {
        console.log(data);
        $("#to_amt").val(data.value);
        $("#to_amt").attr("disabled", "disabled");
      },
      error: function(error) {
        console.log(error);
      }
    });
  });
} else {
  console.log("No Jquery");
}
