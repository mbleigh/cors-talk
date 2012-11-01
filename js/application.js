

$(function() {
  $("[data-x^='+'], [data-y^='+']").each(function() {
    console.log(this);
  });

  impress().init();
});