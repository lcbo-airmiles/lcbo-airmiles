// =============================================================================
// DECLARE GLOBAL APP OBJECT & variables
// =============================================================================





//1. We want the user to enter their postal code.

//2. (as another option)We want the user to enable "geo location" to receive their location via 
//GoogleMaps / Map Box, by clicking a button.

//3. We want to 'smooth scroll' their results (whichever method they selected) further down the page.

//4. We want to return 3 LCBO locations within their postal code parameters.
//4a) We will make an AJAX call to LBCO to bring back their locations
//4b) We will drop the LCBO locations in proximity to their postal code or geolocation.

//5. We want to return a map displaying their LCBO locations using markers.

//use jquery to hide the div - > SHOW the hidden div BEFORE the map is revealed, make
//the map slide in after we have shown the div. make the div first AND THEN put the map on the page.

var app = {};
//LEAFLET MAPBOX
var alexID = 'alexandradavey.n42d3egc';
var alexMap = 'https://a.tiles.mapbox.com/v4/alexandradavey.n42d3egc/page.html?access_token=pk.eyJ1IjoiYWxleGFuZHJhZGF2ZXkiLCJhIjoiNWI5NWYzY2Q0NTQyYjYyMmFjNWY5ZWEwZGE5MjAxZWMifQ.yQUY4RtfbkaeoUlcbsxy8g#4/45.89/-75.63';
var alexkey = 'pk.eyJ1IjoiYWxleGFuZHJhZGF2ZXkiLCJhIjoiNWI5NWYzY2Q0NTQyYjYyMmFjNWY5ZWEwZGE5MjAxZWMifQ.yQUY4RtfbkaeoUlcbsxy8g';
L.mapbox.accessToken = alexkey;
app.map = L.mapbox.map('map',alexID).setView([44.129, -79.306], 7);




//6. Once a store has been selected by the user, we will 'smooth scroll' to display the airmiles promotions, further down the page.

//7. We want to display the available promotion images in a flickity gallery.
//8. We want to display the available promotion information in a div (rgba) within the image.

//9. We want to create an option for the user to select another store.
//10. We wabt to create an option for the user to zoom to the top of the page if they wish to search again.

// =============================================================================
// INIT FUNCTION
// =============================================================================
app.init = function(){

}; // end init function

// =============================================================================
// DOC READY RUN app.init()
// =============================================================================
$(function(){
	console.log('document ready!');
	app.init();
}); // end document ready