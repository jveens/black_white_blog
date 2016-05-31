
// url of API key and secret : http://addb.absolutdrinks.com/docs/signup/show/2529

var drinkApp = function() {};

drinkApp.init = function() {

	drinkApp.getDrinks();
	drinkApp.modSpirit();
	drinkApp.tastes();

	$('.legalButton').on('click', function(e) {
		e.preventDefault();
    $('html, body').animate({
         scrollTop: $("#formPage").offset().top
    }, 500);
    });

    // drinkApp.twitterButton();		
}
// later we will be able to run it with artApp.init();

drinkApp.getDrinks = function() {
	$.ajax ({
		url : 'https://addb.absolutdrinks.com/quicksearch/drinks/t/', 
		dataType : 'jsonp',
		type : 'GET',
		data : {
			apikey : drinkApp.key,
			pageSize : 2000
		},
		success : function(drinkResult) {
			// console.log("Success! (drinks)");
			// console.log(drinkResult);
			$('.loader').addClass('remove');
			$('.formSection').removeClass('hide');
			drinkApp.findCocktail(drinkResult);
		}
	});

	// In the success statement, compare them to base1, mod1, taste1
}

////////////////////////////////////////////
// ASSEMBLE THE LIST AND GET THE COCKTAIL
////////////////////////////////////////////

drinkApp.findCocktail = function(drinkResult) {
	var cocktail = drinkResult.result;

	$('.formSection, .refreshSection').on('submit', function(e){
		// run this code
		e.preventDefault();

		$('html, body').animate({
		// Scroll to the position of the id in the page
	    scrollTop: $('#drinkSection').offset().top
		}, 500);

		$('.twitterShare').attr('href', '');

		var drinkMaster = [];

		// clear out the old results
		$('.drinkContainer').html('');

		// grab the value out of the output and store it in a variable
		var base = $('.baseMenu').val();
		var mod = $('.modMenu').val();
		var taste = $('.tasteMenu').val();
		console.log(base + taste + mod);

		for (var i=0; i < cocktail.length; i++) {
			if (cocktail[i].ingredients[1].type == base && (cocktail[i].ingredients[3] == mod || cocktail[i].ingredients[4] == mod || cocktail[i].ingredients[5] == mod) && (cocktail[i].tastes[0] == taste || cocktail[i].tastes[1] == taste || cocktail[i].tastes[2] == taste)) {
				drinkMaster.push(cocktail[i].name);
			}
			else if (cocktail[i].ingredients[1].type == base){
				drinkMaster.push(cocktail[i].name)
			}
		}

		console.log(drinkMaster);
		var randomNumber = Math.floor(Math.random() * drinkMaster.length);
		var drinkMe = drinkMaster[randomNumber];
		console.log(drinkMe);

		for (var i=0; i < cocktail.length; i++) {
			if (cocktail[i].name == drinkMe) {
				var h2 = $('<h2>').addClass('drinkTitle').text(cocktail[i].name);
				var mix = $('<p>').addClass('instruction').text(cocktail[i].descriptionPlain);
				var drinkImageUrl = 'http://assets.absolutdrinks.com/drinks/300x400/' + cocktail[i].id + '.png';
				var drinkImage = $('<img>').attr('src', drinkImageUrl);
				var ingredients = $('<div>').addClass('ingredientsList')
				for (var l=0; l < cocktail[i].ingredients.length; l++) {
					
					var p = $('<p>').addClass('ingredient').text(cocktail[i].ingredients[l].textPlain);
						$(ingredients).append(p);
				}	

				var str = cocktail[i].name;
			var cocktailURL = str.replace(' ', '%20');
			}
			$('.drinkContainer').append(h2, ingredients, drinkImage, mix);

			

		}

		$('a.twitterShare').attr({
    	href: 'https://twitter.com/intent/tweet?hashtags=HeyBartender&original_referer=https%3A%2F%2Fabout.twitter.com%2Fresources%2Fbuttons&text=Tonight%20my%20signature%20cocktail%20is%3A%20' + cocktailURL + '.%20What%27s%20yours%3F%20&via=jennyveens&url=http%3A%2F%2Fjennyveens.com%2Fheybartender'
    	});

	});	
	
	

} // end findCocktail

////////////////////////////////////////////
// THIS CREATES THE MODIFIER SPIRIT DROPDOWN
////////////////////////////////////////////

// create a function that will go to the datamod and get the types of modSpirit
drinkApp.modSpirit = function() {
	$.ajax({
		url : 'http://addb.absolutdrinks.com/ingredients/',
		type : 'GET',
		dataType : 'jsonp', 
		data : {
			apiKey : drinkApp.key,
			pageSize : 500
		},
		success : function(modResult) {
			drinkApp.selectMod(modResult);
		}
	}); // end ajax
} // end tastes()

drinkApp.selectMod = function(modResult) {
	var modArray = modResult.result;

	for (var i = 0; i < modArray.length; i++) {
		if (modArray[i].isAlcoholic === true && modArray[i].type === 'spirits-other') {
			var option = $('<option>').attr('value', modArray[i].id).text(modArray[i].name);
			$('.modMenu').append(option);
		} // end if	
	} // end for loop
} // end selectMod()

////////////////////////////////////////////
// THIS CREATES THE 'TASTE' DROPDOWN
////////////////////////////////////////////

// create a function that will go to the database and get the types of taste
drinkApp.tastes = function() {
	$.ajax({
		url : 'http://addb.absolutdrinks.com/tastes/',
		type : 'GET',
		dataType : 'jsonp', 
		data : {
			apiKey : drinkApp.key,
			pageSize : 100
		},
		success : function(tasteResult) {
			drinkApp.selectTaste(tasteResult);
		}
	}); // end ajax
} // end tastes()

drinkApp.selectTaste = function(tasteResult) {
	var tasteArray = tasteResult.result;

	for (var i = 0; i < tasteArray.length; i++) {
		var option = $('<option>').attr('value', tasteArray[i].id).text(tasteArray[i].name);
			$('.tasteMenu').append(option);
	} // end for loop
} // end selectTaste



////////////////////////////////////////////
// OTHER STUFF
////////////////////////////////////////////

drinkApp.key = '42f8ec39118a47589d362570c51b566b';

$(function() {
	drinkApp.init();
	
});