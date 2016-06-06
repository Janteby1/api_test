var buildResultChart = function(jsonData){
        var chart = c3.generate({
          data: {
              json: jsonData,
              type: 'bar',
          },
          axis: {
            y: {
              label: {
                 text: 'Travel Time (min)',
                 position: 'outer-center',
              }
            }
          }
      });
    // return chart;
};


$(document).ready(function(){
console.log("Hi there!")
var chart_data;

// goes to top of page on reload
$( window ).unload(function() {
  window.scrollTo(0, 0);
    console.log("again")
});

///// Chart /////
    $("#answer_div").on('click', '#chart_button',function(event){
    event.preventDefault();
    $('#message').html("Loading...");

    $.ajax({
        method: "POST",
        url: "api",
    }).done(function(data, status){

    if (data.success){
          var chart_data = data.data
            }
      else {
        alert ("Sorry, something doesnt seem right. Try again soon.")
        window.scrollTo(0, 0);
      }
      console.log("chart data", chart_data)
      $('#chart_div').css("height", "40em");
      $('#message').html("Done");

      buildResultChart(chart_data)
    });
  });

});



