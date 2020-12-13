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
  //3.direct to callback function
}
