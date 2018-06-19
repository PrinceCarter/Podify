var overlay = document.getElementById("overlay");

window.addEventListener('load', function(){

  overlay.style.display = 'none';

})

function loadSuggestions(){

  $.ajax({

    method: 'GET',
    url: 'https://gpodder.net/api/2/tag/tech/6.json'


  }).done(function(res){

    console.log(res);

    makeCard(res)

  })

}

loadSuggestions()

$(function(){

  $('#searchForm').on('submit', function(e){

    e.preventDefault()

    var searchText = $('#search').val()

    window.location.href = '/search.html?q=' + searchText

  })

})

function makeCard(jsonObj){

  var body = document.getElementById('section');

  var card = document.getElementById('card1');

  var clone = card.cloneNode(true);

  card.remove()

var subs = []

// Load Subs array with all JSON objects
for (var i = 0; i < jsonObj.length; i++){

      subs.push(jsonObj[i])

}

function sortJSON(data, key, way) {
  return data.sort(function(a, b) {
      var x = a[key]; var y = b[key];
      if (way === '123' ) { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
      if (way === '321') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
  });
}

// Sort the JSON objects based on the subscriptions
sortJSON(subs, 'subscribers', '321')

// Load out each card from the sort array
for (var i = 0; i < subs.length; i++){

    var clone = card.cloneNode(true);
    clone.firstChild.nextSibling.style.display = "block";
    clone.getElementsByTagName("a")[0].innerText = subs[i].title;
    clone.getElementsByTagName("a")[0].href = jsonObj[i].website;
    clone.getElementsByTagName("a")[1].href = subs[i].mygpo_link;
    clone.getElementsByTagName("a")[2].innerText = 'Subscribers: ' + subs[i].subscribers;
    clone.getElementsByTagName('p')[0].innerText = subs[i].description;
    $(clone).find("#podcast-img").attr('src', ''+ subs[i].logo_url + '');
    console.log(subs)
    body.appendChild(clone);

  }

}
