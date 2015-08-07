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

//4. We want to return 3 LCBO locations within their postal code parameters.

//5. We want to return a map displaying their LCBO locations using markers.

//6. Once a store has been selected by the user, we will 'smooth scroll' to display the airmiles promotions, further down the page.

//7. We want to display the available promotion images in a flickity gallery.

//8. We want to display the available promotion information in a div (rgba) within the image.

//9. We want to create an option for the user to select another store.

//10. We wabt to create an option for the user to zoom to the top of the page if they wish to search again.


// =============================================================================
// INIT FUNCTION
// =============================================================================
app.init = function(){
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