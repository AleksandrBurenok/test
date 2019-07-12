$('.navbar-category').on('click', function () {
  $('.menu__all').toggleClass('menu__all__active');
});

$(function() {
  $("#accordion").accordion({
    collapsible: true,
    heightStyle: "content"
  });
});

$( function() {
  $( "#slider-range" ).slider({
    range: true,
    step: 0.01,
    min: 0,    
    max: 2000,
    values: [ 238.72, 971.62 ],
    slide: function( event, ui ) {
      $("#amount" ).val( "$ " + ui.values[ 0 ]);
      $("#amount-two" ).val( "$ " + ui.values[ 1 ] );
    }
  });
  $( "#amount" ).val( "$ " + $( "#slider-range" ).slider( "values", 0 ));
    $( "#amount-two" ).val( "$ " + $( "#slider-range" ).slider( "values", 1 ));
} );

$(".sort-tabs").on("click", ".sort-tab", function(){
  $(".sort-tabs .sort-tab").removeClass("active");
  $(this).addClass("active");
});

// Модальное окно
var modal = document.getElementById('signModal');
var btn = document.getElementById("btn-modal");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
} 

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(e) {
    if (e.target === modal) {
        modal.style.display = "none";
    }
}