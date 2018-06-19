var overlay = document.getElementById("overlay");


// Loading animation
window.addEventListener('load', function(){

  overlay.style.display = 'none';

})

// Search Podcast
$(function(){

  $('#searchForm').on('submit', function(e){

    e.preventDefault()

    var searchText = $('#search').val()

    window.location.href = '/search.html?q=' + searchText

  })

})

// Get top 20 categories from gPodder
function loadCategories(){

  $.ajax({

    method: 'GET',
    url: 'https://gpodder.net/api/2/tags/20.json'


  }).done(function(res){

    makeButton(res)

  })

}

loadCategories()

function makeButton(jsonObj){

//Get Categories section
var categories = document.getElementById('categories')

//Get Categories button
var category = document.getElementById('category')

// Load out each card from the sort array
for (var i = 0; i < jsonObj.length; i++){
    var clone = category.cloneNode(true);
    clone.firstChild.style.display = 'block'
    clone.getElementsByTagName("a")[0].innerText = jsonObj[i].title;
    clone.getElementsByTagName("a")[0].href = '/search.html?q=' + jsonObj[i].tag;
    //Fix Youtube's href
    if (jsonObj[i].title === 'Youtube'){

      clone.getElementsByTagName("a")[0].innerText = jsonObj[i].title;
      clone.getElementsByTagName("a")[0].href = '/search.html?q=youtube';

    }
    categories.appendChild(clone)
  }

}
