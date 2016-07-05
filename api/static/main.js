
function geo_things(address, cb) {
    var geocoder = new google.maps.Geocoder();
    var location = {};

    geocoder.geocode({'address': address}, function(results, status) {
        // this takes the address we got and uses google api to get the geocode, then send the geocode to the google maps api
        if (status == google.maps.GeocoderStatus.OK) {
          // console.log('geo thing: ', results[0].geometry.location.lat())
            location.lat = results[0].geometry.location.lat();
            location.lng = results[0].geometry.location.lng();
            // callback to map function after locations are received
            cb(location);
        }
    });
};

// function geo_lat(address) {
//     var geocoder = new google.maps.Geocoder();
//     var latitude = 0;

//     geocoder.geocode({'address': address}, function(results, status) {
//         // this takes the address we got and uses google api to get the geocode, then send the geocode to the google maps api
//         if (status == google.maps.GeocoderStatus.OK) {
//           // console.log('geo thing: ', results[0].geometry.location.lat())
//             latitude = results[0].geometry.location.lat();
//             console.log(results[0].geometry.location.lat());
//             console.log(results[0].geometry.location.lng());
//             return latitude;
//             }
//       return latitude;
//     })
//     .then(function(res){
//       return latitude
//     }).done()
//     ;
//     console.log('outer scope latitude: ', latitude)
//   return latitude;
// };

function init_map(map_div, points) {
    var var_mapoptions = {
        // center: var_location,
        zoom: 10
    };

  var map = new google.maps.Map(map_div, var_mapoptions);

  var directionsDisplay = new google.maps.DirectionsRenderer({
    map: map
  });

  // Set destination, origin and travel mode.
  // mashed both objects together to add the travel mode as options tothe dict 
  var request = $.extend({travelMode: google.maps.TravelMode.DRIVING}, points);

  var directionsService = new google.maps.DirectionsService();
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      // Display the route on the map.
      directionsDisplay.setDirections(response);
    }
  });
  console.log("done");
};



$(document).ready(function(){
console.log("Hi there!")
var chart_data;

// goes to top of page on reload
$( window ).unload(function() {
  window.scrollTo(0, 0);
    console.log("again")
});


////Search Form ////
    $('#answer_div').on('submit', '#form',function(event){
    event.preventDefault();

    var query_string = $(this).serialize() //returns all the data in your form
    console.log(query_string)


    // find the origin and destination from the query string
    var params = query_string.split("=")
    var origin = params[1].split ("&")[0]
    var destination = params[2]
    // var origin = ($(this).find("[name='origin']").attr("value")); // find tells it where in the this object to look for the value
    // var destination = ($(this).find("[name='destination']").attr("value"));
    console.log(origin)
    console.log(destination)

    $.ajax({
        method: "POST",
        url: ("calc"),
        data: query_string,
    }).done(function(data, status){

    if (data.success){
          var miles = data.data
          if (miles == "error"){
            alert ("Sorry, something doesnt seem right. Try again.")
              }
            }
      else {
        alert ("Sorry, something doesnt seem right. Try again.")
        window.scrollTo(0, 0);
      }
      console.log("miles", miles)
      $('#result_div').html("<p id='red'><em>The Total Distance is  </em>" + "<strong>" + miles + "les </strong></p>");

    });

    ///// Map Display /////
      var map_div = $(".map_div");

      var buildMap = function(points){
        map_div.css({"height":"20em", "width":"33em", "margin":"1.2em", "margin-left":"auto", "margin-right":"auto"});
        console.log(points);
        init_map(map_div.get(0), points);
      };
      
      // iife
      (function(){
        var container = {};
        
        // waits for each value to come back from cb
        geo_things(origin, function(location){
          container.origin = location;
          // checks that both oigin and destination are here before we call the map 
          if (Object.keys(container).length===2){
            buildMap(container);
          }
        });
        
        // waits for each value to come back from cb
        geo_things(destination, function(location){
          container.destination = location;
          // checks that both oigin and destination are here before we call the map 
          if (Object.keys(container).length===2){
            buildMap(container);
          }
        });
      })();// end iife

  });


var availableTags = ["Birmingham International Airport  BHM","Dothan Regional Airport DHM","Huntsville International Airport  HSV","Mobile  MOB","Montgomery  MGM","Anchorage International Airport ANC","Fairbanks International Airport FAI","Juneau International Airport  JNU","Flagstaff FLG","Phoenix, Phoenix Sky Harbor International Airport PHX","Tucson International Airport  TUS","Yuma International Airport  YUM","Fayetteville  FYV","Little Rock National Airport  LIT","Burbank BUR","Fresno  FAT","Long Beach  LGB","Los Angeles International Airport LAX","Oakland OAK","Ontario ONT","Palm Springs  PSP","Sacramento  SMF","San Diego SAN","San Francisco International Airport SFO","San Jose  SJC","Santa Ana SNA","Aspen ASE","Colorado Springs  COS","Denver International Airport  DEN","Grand Junction  GJT","Pueblo  PUB","Hartford  BDL","Washington, Dulles International Airport  IAD","Washington National Airport DCA","Daytona Beach DAB","Fort Lauderdale-Hollywood International Airport FLL","Fort Meyers RSW","Jacksonville  JAX","Key West International Airport  EYW","Miami International Airport MIA","Orlando MCO","Pensacola PNS","St. Petersburg  PIE","Sarasota  SRQ","Tampa TPA","West Palm Beach PBI","Panama City-Bay County International Airport  PFN","Atlanta Hartsfield International Airport  ATL","Augusta AGS","Savannah  SAV","Hilo  ITO","Honolulu International Airport  HNL","Kahului OGG","Kailua  KOA","Lihue LIH","Idaho ID","Boise BOI","Chicago Midway Airport  MDW","Chicago, O'Hare International Airport Airport ORD","Moline  MLI","Peoria  PIA","Evansville  EVV","Fort Wayne  FWA","Indianapolis International Airport  IND","South Bend  SBN","Cedar Rapids  CID","Des Moines  DSM","Wichita ICT","Kentucky  KY","Lexington LEX","Louisville  SDF","Baton Rouge BTR","New Orleans International Airport MSY","Shreveport  SHV","Augusta AUG","Bangor  BGR","Portland  PWM","Baltimore BWI","Massachusetts MA","Boston, Logan International Airport BOS","Hyannis HYA","Nantucket ACK","Worcester ORH","Battlecreek BTL","Detroit Metropolitan Airport  DTW","Detroit DET","Flint FNT","Grand Rapids  GRR","Kalamazoo-Battle Creek International Airport  AZO","Lansing LAN","Saginaw MBS","Duluth  DLH","Minneapolis/St.Paul International Airport MSP","Rochester RST","Gulfport  GPT","Jackson JAN","Kansas City MCI","St Louis, Lambert International Airport STL","Springfield SGF","Billings  BIL","Lincoln LNK","Omaha OMA","Las Vegas, Las Vegas McCarran International Airport LAS","Reno-Tahoe International Airport  RNO","Manchester  MHT","Atlantic City International Airport ACY","Newark International Airport  EWR","Trenton TTN","Albuquerque International Airport ABQ","Alamogordo  ALM","Albany International Airport  ALB","Buffalo BUF","Islip ISP","New York, John F Kennedy International Airport  JFK","New York, La Guardia Airport  LGA","Newburgh  SWF","Rochester ROC","Syracuse  SYR","Westchester HPN","Asheville AVL","Charlotte/Douglas International Airport CLT","Fayetteville  FAY","Greensboro  GSO","Raleigh RDU","Winston-Salem INT","Bismark BIS","Fargo FAR","Akron CAK","Cincinnati  CVG","Cleveland CLE","Columbus  CMH","Dayton  DAY","Toledo  TOL","Oklahoma City OKC","Tulsa TUL","Eugene  EUG","Portland International Airport  PDX","Portland, Hillsboro Airport HIO","Salem SLE","Allentown ABE","Erie  ERI","Harrisburg  MDT","Philadelphia  PHL","Pittsburgh  PIT","Scranton  AVP","Providence - T.F. Green Airport PVD","Charleston  CHS","Columbia  CAE","Greenville  GSP","Myrtle Beach  MYR","Pierre  PIR","Rapid City  RAP","Sioux Falls FSD","Bristol TRI","Chattanooga CHA","Knoxville TYS","Memphis MEM","Nashville BNA","Amarillo  AMA","Austin Bergstrom International Airport  AUS","Corpus Christi  CRP","Dallas Love Field Airport DAL","Dallas/Fort Worth International Airport DFW","El Paso ELP","Houston, William B Hobby Airport  HOU","Houston, George Bush Intercontinental Airport IAH","Lubbock LBB","Midland MAF","San Antonio International Airport SAT","Salt Lake City  SLC","Burlington  BTV","Montpelier  MPV","Rutland RUT","Dulles  IAD","Newport News  PHF","Norfolk ORF","Richmond  RIC","Roanoke ROA","Pasco, Pasco/Tri-Cities Airport PSC","Seattle, Tacoma International Airport SEA","Spokane International Airport GEG","Charleston  CRW","Clarksburg  CKB","Green Bay GRB","Madison MSN","Milwaukee MKE","Casper  CPR","Cheyenne  CYS","Jackson Hole  JAC","Rock Springs  RKS"]

$(".tags" ).autocomplete({ 
    source: availableTags,
});




});



