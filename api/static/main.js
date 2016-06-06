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
      $('#message').html("Done, scroll down");

      buildResultChart(chart_data)
    });
  });

////Search Form ////
    $('#answer_div').on('submit', '#form',function(event){
    event.preventDefault();

    var query_string = $(this).serialize() //returns all the data in your form
    console.log(query_string)
        
    $.ajax({
        method: "POST",
        url: ("calc"),
        data: query_string,
    }).done(function(data, status){

    if (data.success){
          var time = data.data
            }
      else {
        alert ("Sorry, something doesnt seem right. Try again soon.")
        window.scrollTo(0, 0);
      }
      console.log("time", time)
      $('#result_div').html("Your Commute Time is: " + time + " minutes");

    });
  });



});



