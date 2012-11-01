

$(function() {
  $("[data-x^='+'], [data-y^='+']").each(function() {
    console.log(this);
  });

  impress().init();

  $("#alloy").on("keyup", "textarea", function(e) {
    e.stopPropagation();
  });
});