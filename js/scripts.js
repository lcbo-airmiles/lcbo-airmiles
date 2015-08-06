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