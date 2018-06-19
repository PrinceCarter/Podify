var overlay = document.getElementById("overlay");

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

function loadCategories(){

  $.ajax({

    method: 'GET',
    url: 'https://gpodder.net/api/2/tags/20.json'


  }).done(function(res){

    console.log(res)

    makeButton(res)

  })

}

loadCategories()

function makeButton(jsonObj){

  var categories = document.getElementById('categories')

  var category = document.getElementById('category')

// Load out each card from the sort array
for (var i = 0; i < jsonObj.length; i++){

    var clone = category.cloneNode(true);
    //clone.firstChild.nextSibling.style.display = "block";
    clone.getElementsByTagName("a")[0].innerText = jsonObj[i].title;
    clone.getElementsByTagName("a")[0].href = '/search.html?q=' + jsonObj[i].tag;
    categories.appendChild(clone)

  }

}
