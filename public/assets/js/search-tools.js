console.log("search-tools.js loaded");

document
  .querySelector("#searchNav button")
  .addEventListener("click", toolSearch);

function toolSearch() {
  //1.collect user's search term
  let searchInput = document.querySelector("#searchNav input");
  let searchTerm = searchInput.value;
  searchInput.value = "";
  //2.make ajax call
  fetch("/api/search/" + searchTerm)
    .then((res) => res.json())
    //3.direct to callback function
    .then(searchResults);
}

function searchResults(json) {
  console.log(json);
  document.querySelector(
    "main h4"
  ).innerHTML = `Search results for <em>${json.search}</em>.`;
  let html = "";
  if (!json.results.length) {
    html = "<li>No results found.</li>";
  } else {
    //to do when search api is live
  }
  document.querySelector("main ol").innerHTML = html;
}
