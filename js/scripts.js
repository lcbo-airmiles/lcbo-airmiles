// =============================================================================
// DECLARE GLOBAL APP OBJECT & variables
// =============================================================================

var app = {};
// james' LCBO api key
app.jamesAPI = 'MDo1ZmMzNGQ0Yy0zYWVmLTExZTUtODFkYi02YmQ0ZWM1NzJlOTQ6RDNTeEVIS1M4Zlh1M0E1UUZjMlFuRzFMWkhzbzcyeUQ2bnRN';
// james' mapbox api key
app.jamesMapbox = 'pk.eyJ1Ijoiamltc2F1cnVzIiwiYSI6IjM0NmIzMjllNGQzYzBlODY4NTQwMjlkMTA4YmM1OWIzIn0.GzyjWKJ4nnZarMZpjPCanQ';
// booze type
app.boozeType = 'beer';


// =============================================================================
// STORES FUNCTION : returns stores closest to the user input
// =============================================================================
//take the users input location and return the closest store
app.stores = function(location){
	$.ajax({
		url: 'http://lcboapi.com/stores',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			access_key: app.jamesAPI,
			per_page: 5,
			//users location is passed into the api request
			geo: location
		}
		//data is the result of the api call....in this case it is an array with 5 objects representing locations
	}).then(function(data) {
		console.log('These are the 5 stores closest to the USER');
		//just grab the first location to start
		app.store1 = data.result[0];

		//	POPULATE THE ADDRESS INFO ====================
		//STORE 1
		$('.address1').text(data.result[0].address_line_1);
		$('.cityPostal1').text(data.result[0].city + ', ' + data.result[0].postal_code);
		$('.phoneNubmber1').text(data.result[0].telephone);
		$('.openHours1').text('11am - 9pm');
		//STORE 2
		$('.address2').text(data.result[1].address_line_1);
		$('.cityPostal2').text(data.result[1].city + ', ' + data.result[1].postal_code);
		$('.phoneNubmber2').text(data.result[1].telephone);
		$('.openHours2').text('11am - 9pm');

		//STORE 3
		$('.address3').text(data.result[2].address_line_1);
		$('.cityPostal3').text(data.result[2].city + ', ' + data.result[2].postal_code);
		$('.phoneNubmber3').text(data.result[2].telephone);
		$('.openHours3').text('11am - 9pm');

		//pass the closest store into a function to find beers on promo
		app.promoBeers(app.store1);
	}); //end results function
	
} // end stores function



// =============================================================================
// PRODUCTS FUNCTION : returns the products on promotion
// =============================================================================

//this function is passed a store and finds the 5 beers with the most airmiles reward miles
app.promoBeers = function(store){

	$.ajax({
		url: 'http://lcboapi.com/products',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			access_key: app.jamesAPI,
			per_page: 10,
			where: 'has_bonus_reward_miles',
			where_not: 'is_dead',
			order: 'bonus_reward_miles',
			q: app.boozeType
		}
	}).then(function(data) {
		//console.log('Beers on promotion!!');
		//console.log the 5 beers found
		//console.log(data.result);
		app.beers = data.result;
		//app.promoBeer_1 = data.result[0];
		//app.promoBeer_2 = data.result[1];
		//app.promoBeer_3 = data.result[2];
		//app.promoBeer_4 = data.result[3];
		//app.promoBeer_5 = data.result[4];
		//pass the resulting array of beer objects into a function to check the stock and pass in the store from before
		app.inStock(app.beers, store);
	});//end results function
	
}; //end TEST function


// =============================================================================
// INVENTORY FUNCTION : returns store inventory
// =============================================================================
app.inStock = function(items, store){
	console.log('inStock fired');
	console.log(items);
	console.log(store);
	//for each product on promotion we check the stock at the store
	$.each(items, function(index, value){
		$.ajax({
			url: 'http://lcboapi.com/stores/' + store.id + '/products/' + items[index].id + '/inventory',
			type: 'GET',
			dataType: 'jsonp',
			data: {
				access_key: app.jamesAPI,
			}
		}).then(function(data) {
			console.log(data);
			//now we have the stock of the items on promo at the closest store....lets display it!
			console.log('This is the inventory of ' + items[index].name + ' at ' + store.address_line_1 + ", " + store.city );
			// so if the quantity is greater than 0 display it!
			if( data.result.quantity > 0 ){
				console.log(data.result.quantity);
				//construct flickity slide

				var itemImg = $('<img>').attr('src', value.image_url);
				var itemName = $('<p>').text(value.name);
				var itemMiles = $('<p>').text('Bonus reward miles: ' + value.bonus_reward_miles);
				var itemPackage = $('<p>').text(value.package);

				var itemPrice = $('<p>').text('$' + ((value.price_in_cents / 100).toFixed(2)));

				var galleryCell = $('<div>').addClass('gallery-cell').append(itemImg, itemName, itemMiles, itemPackage, itemPrice);

				//default flickity stuff to get it working
				var $gallery = $('.gallery').flickity().flickity('next').flickity( 'select', 2 );

				$gallery.flickity('append', galleryCell);

				// ===================================================================
				//scroll page down to see results =====================================
			    $('html, body').animate({
			        scrollTop: $('.stores').offset().top
			    }, 1000);
				
			}else if ( ( data.result.quantity <= 0 ) || (!data.result) ){
				console.log('Sorry not in stock!');
			}
			
		}); //end results function
	});

}//instock function

//example: lcboapi.com/stores/634/products/388900/inventory
// app.inventories = function(){
// 	$.ajax({
// 		url: 'http://lcboapi.com/inventories',
// 		type: 'GET',
// 		dataType: 'jsonp',
// 		data: {
// 			access_key: app.jamesAPI,
// 			per_page: 100,
// 			store_id: 634,
// 			product_id: 388900
// 		}
// 	}).then(function(data) {
// 		console.log('This is the inventory');
// 		console.log(data.result);
		
// 	}); //end results function
// } // end stores function


//2. (as another option)We want the user to enable "geo location" to receive their location via 
//GoogleMaps / Map Box, by clicking a button.


//3. We want to 'smooth scroll' their results (whichever method they selected) further down the page.


//3. We want to 'smooth scroll' their results (whichever method they selected) further down the page. 

//4. We want to return 3 LCBO locations within their postal code parameters.


//5. We want to return a map displaying their LCBO locations using markers.

//use jquery to hide the div - > SHOW the hidden div BEFORE the map is revealed, make
//the map slide in after we have shown the div. make the div first AND THEN put the map on the page.



//6. Once a store has been selected by the user, we will 'smooth scroll' to display the airmiles promotions, further down the page.


//8. We want to display the available promotion information in a div (rgba) within the image.

//9. We want to create an option for the user to select another store.

//10. We wabt to create an option for the user to zoom to the top of the page if they wish to search again.

// =============================================================================
// LOCATION LISTENER FUNCTION
// =============================================================================
app.locationListener = function(){
	// when the postal code is submitted
	$( "#location" ).submit(function( event ) {
		//stop default action
		event.preventDefault();
		//get value from input field
		app.postal = $('.user-input').val();
		//just for test purposes so you don't have to keep putting in a place uncomment hamilton 
		//app.postal = 'hamilton';
		app.stores(app.postal);
	});
}

// =============================================================================
// INIT FUNCTION
// =============================================================================
app.init = function(){
	app.locationListener();
	//LEAFLET MAPBOX
	var alexID = 'alexandradavey.n42d3egc';
	var alexMap = 'https://a.tiles.mapbox.com/v4/alexandradavey.n42d3egc/page.html?access_token=pk.eyJ1IjoiYWxleGFuZHJhZGF2ZXkiLCJhIjoiNWI5NWYzY2Q0NTQyYjYyMmFjNWY5ZWEwZGE5MjAxZWMifQ.yQUY4RtfbkaeoUlcbsxy8g#4/45.89/-75.63';
	var alexkey = 'pk.eyJ1IjoiYWxleGFuZHJhZGF2ZXkiLCJhIjoiNWI5NWYzY2Q0NTQyYjYyMmFjNWY5ZWEwZGE5MjAxZWMifQ.yQUY4RtfbkaeoUlcbsxy8g';
	L.mapbox.accessToken = alexkey;
	app.map = L.mapbox.map('map',alexID).setView([44.129, -79.306], 8);

}; // end init function

// =============================================================================
// DOC READY RUN app.init()
// =============================================================================
$(function(){
	console.log('document ready!');
	app.init();
}); // end document ready





