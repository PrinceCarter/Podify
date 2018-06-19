
	var overlay = document.getElementById("overlay");

// Loading animation
	window.addEventListener('load', function(){

  	overlay.style.display = 'none';

	})
// Get the Top 15 podcast from gPodder
	function loadTopPodcast(){

		$.ajax({

			method: 'GET',
			url: 'https://gpodder.net/toplist/15.json'


		}).done(function(res){

			makeCard(res)

		})


	}

  loadTopPodcast()

// Search for Podcast
	$(function(){

		$('#searchForm').on('submit', function(e){

			e.preventDefault()

			var searchText = $('#search').val()

			window.location.href = '/search.html?q=' + searchText

		})

	})

// Create Podcast Cards
	function makeCard(jsonObj){

		var body = document.getElementById('section');

		var card = document.getElementById('card1');

    var clone = card.cloneNode(true);

    card.remove()

		for (var i = 0; i < jsonObj.length; i++){

			var clone = card.cloneNode(true);
			console.log(jsonObj[i])
      clone.firstChild.nextSibling.style.display = "block";
			clone.getElementsByTagName("a")[0].innerText = jsonObj[i].title;
			clone.getElementsByTagName("a")[0].href = jsonObj[i].website;
      clone.getElementsByTagName("a")[1].href = jsonObj[i].mygpo_link;
      clone.getElementsByTagName("a")[2].innerText = 'Subscribers: ' + jsonObj[i].subscribers;
      clone.getElementsByTagName('p')[0].innerText = jsonObj[i].description;
      $(clone).find("#podcast-img").attr('src', ''+ jsonObj[i].logo_url + '');
			body.appendChild(clone);

		}

	}
