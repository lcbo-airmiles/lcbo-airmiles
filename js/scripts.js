// =============================================================================
// DECLARE GLOBAL APP OBJECT & variables
// =============================================================================

var app = {};
// james' LCBO api key
app.jamesAPI = 'MDo1ZmMzNGQ0Yy0zYWVmLTExZTUtODFkYi02YmQ0ZWM1NzJlOTQ6RDNTeEVIS1M4Zlh1M0E1UUZjMlFuRzFMWkhzbzcyeUQ2bnRN';
// james' mapbox api key
app.jamesMapbox = 'pk.eyJ1Ijoiamltc2F1cnVzIiwiYSI6IjM0NmIzMjllNGQzYzBlODY4NTQwMjlkMTA4YmM1OWIzIn0.GzyjWKJ4nnZarMZpjPCanQ';
// user input variable
app.userInput = '';

// =============================================================================
// PRODUCTS FUNCTION : returns the products on promotion
// =============================================================================
app.products = function(){
	$.ajax({
		url: 'http://lcboapi.com/products',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			access_key: app.jamesAPI,
			per_page: 100,
			where: 'has_bonus_reward_miles',
			where_not: 'is_dead'
		}
	}).then(function(data) {
		console.log(data.result);
	});//end results function
}; //end TEST function


// =============================================================================
// STORES FUNCTION : returns stores closest to the user input
// =============================================================================
//4. We want to return 3 LCBO locations within their postal code parameters.
//4a) We will make an AJAX call to LBCO to bring back their locations
//4b) We will drop the LCBO locations in proximity to their postal code or geolocation.

app.stores = function(){
	$.ajax({
		url: 'http://lcboapi.com/stores',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			access_key: app.jamesAPI,
			per_page: 5,
			geo: app.userInput
			//lat: 43.647777,
			//lon:-79.369978
		}
	}).then(function(data) {

		console.log(data.result);
		
	}); //end results function
} // end stores function

//1. We want the user to enter their postal code.

//2. (as another option)We want the user to enable "geo location" to receive their location via 
//GoogleMaps / Map Box, by clicking a button.


//3. We want to 'smooth scroll' their results (whichever method they selected) further down the page.


//3. We want to 'smooth scroll' their results (whichever method they selected) further down the page. 

//4. We want to return 3 LCBO locations within their postal code parameters.


//5. We want to return a map displaying their LCBO locations using markers.

//use jquery to hide the div - > SHOW the hidden div BEFORE the map is revealed, make
//the map slide in after we have shown the div. make the div first AND THEN put the map on the page.

var app = {};
//LEAFLET MAPBOX
var alexID = 'alexandradavey.n42d3egc';
var alexMap = 'https://a.tiles.mapbox.com/v4/alexandradavey.n42d3egc/page.html?access_token=pk.eyJ1IjoiYWxleGFuZHJhZGF2ZXkiLCJhIjoiNWI5NWYzY2Q0NTQyYjYyMmFjNWY5ZWEwZGE5MjAxZWMifQ.yQUY4RtfbkaeoUlcbsxy8g#4/45.89/-75.63';
var alexkey = 'pk.eyJ1IjoiYWxleGFuZHJhZGF2ZXkiLCJhIjoiNWI5NWYzY2Q0NTQyYjYyMmFjNWY5ZWEwZGE5MjAxZWMifQ.yQUY4RtfbkaeoUlcbsxy8g';
L.mapbox.accessToken = alexkey;
app.map = L.mapbox.map('#map',alexID).setView([44.129, -79.306], 7);




//6. Once a store has been selected by the user, we will 'smooth scroll' to display the airmiles promotions, further down the page.


//8. We want to display the available promotion information in a div (rgba) within the image.

//9. We want to create an option for the user to select another store.

//10. We wabt to create an option for the user to zoom to the top of the page if they wish to search again.


// =============================================================================
// INIT FUNCTION
// =============================================================================
app.init = function(){

//7. We want to display the available promotion images in a flickity gallery.
$('.gallery').flickity({
	 	  // options
	 	  cellAlign: 'left',
	  	contain: true
		});

	app.products();
	app.stores();


}; // end init function

// =============================================================================
// DOC READY RUN app.init()
// =============================================================================
$(function(){
	console.log('document ready!');
	app.init();
}); // end document ready