$(function() {
  console.log('app.js loaded');

  // get a random wikipedia article
  $('#randomButton').click(function() {
    console.log('random article');

    var myUrl = 'http://en.wikipedia.org/wiki/Special:Random'; 
    var myHtml = '<div class="article"><a href="' + myUrl + 
                 '" target="_blank" title="Random Article">' + 
                 'Random Article</a></div>';
    $('.searchResults').empty().html(myHtml); 
  });

  // search for wikipedia articles
  $('#searchButton').click(function() {
    // get search term
    var searchTerm = $('#searchTerm').val();    
    searchWikipediaArticles(searchTerm);
  });

  // press enter to search
  $('#searchTerm').keypress(function(event) {
    if(event.which === 13) {
      var searchTerm = $('#searchTerm').val();
      searchWikipediaArticles(searchTerm);
    }

  });
});

function searchWikipediaArticles(searchTerm) {
  if(!searchTerm) return false;

  var myUrl = 'http://en.wikipedia.org/w/api.php?action=query&srsearch=' + searchTerm + '&list=search&format=json';

  $.ajax({
    type: 'GET',
    url: myUrl, 
    dataType: 'jsonp'
  }).done(function(data) {
    var myTitleArray = [];

    for(var i = 0; i < data['query']['search'].length; i++) {
      myTitleArray.push(data['query']['search'][i]['title']);
    }

    console.log(myTitleArray);
    displayInformation(myTitleArray);
  });
}

function displayInformation(titleArray) {
  var myHtml = '';

  // create html for each of the titles
  for(var i = 0; i < titleArray.length; i++) {
    var currentLink = 'https://en.wikipedia.org/wiki/' + titleArray[i];

    myHtml += '<div class="article"><a href="' + currentLink + '"' + 
              'alt="' + titleArray[i] + 'link to Article" target="_blank">' + titleArray[i] + 
              '</a></div>';
  }
  // add the html into the document
  $('.searchResults').empty().html(myHtml);
}
