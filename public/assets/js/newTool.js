
$(document).ready(function () {
    console.log("My new game form will go here.");
  
    $("#new-tool").on("submit", function (e) {
      e.preventDefault();
      console.log("You submitted the new tool form.");
      const name = $("#name").val();
      const category = $("#category").val();
    //   const maxNumPlayers = $("#maxNumPlayers").val();
    //   const minNumPlayers = $("#minNumPlayers").val();
  
      $.ajax({
        method: "POST",
        url: "/api/tools",
        data: {
          name,
          category,
        //   maxNumPlayers,
        //   minNumPlayers,
        },
      }).then((response) => {
        window.location.replace("/tools");
      });
    });
  });