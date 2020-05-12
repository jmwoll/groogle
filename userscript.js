// ==UserScript==
// @name     Unnamed Script 103519
// @version  1
// @grant    none
// ==/UserScript==

var currentSelection = 0;
var i = 0;
var counterToLink = {};
var counterToElt = {};

var processSearchResult = function(elt){
  elt.innerHTML = i + elt.innerHTML;
  i += 1;
  counterToElt[i] = elt;
  var linkUrl = elt.children[0];//.href;
  counterToLink[i] = linkUrl;
};



//document.querySelectorAll("h3").forEach(elt => processGoogleLink(elt));//elt.innerHTML = ++i + elt.innerHTML);
var searchResults = document.getElementsByClassName("r");

for(var searchResultIndex = 0; searchResultIndex < searchResults.length; searchResultIndex += 1){
	processSearchResult(searchResults[searchResultIndex]);
}


var onKeyDown = function(evt){
  console.log(evt);
  if(evt.key == 'n' && evt.altKey){
   	console.log("switching to next link");
    console.log(currentSelection+"---->"+(currentSelection+1));
    currentSelection = (currentSelection + 1) % searchResults.length;
  }
  if(evt.key == 'N' && evt.altKey){
   	console.log("switching to next link");
    console.log(currentSelection+"---->"+(currentSelection-1));
    currentSelection = (currentSelection - 1) % searchResults.length;
  }
  counterToElt[currentSelection].setAttribute('tabindex', '-1');
  counterToElt[currentSelection].focus();
  
  if(evt.key == "Enter"){
    var newHref = counterToLink[currentSelection].href;
    window.location.href = newHref;
  }
};

document.addEventListener('keydown', onKeyDown);

