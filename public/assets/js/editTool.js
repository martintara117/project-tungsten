$(document).ready(function () {
    $("#edit-profile").on("submit", function (e) {
      e.preventDefault();
      const name = $("#name").val();
      
      // const password = $("#password").val();
     
   
      console.log(name);
      console.log(id)
      $.ajax({
        method: "PUT",
        url: `/api/tools/${id}`,
        data: {
         name,
        },
      }).then((response) => {
        window.location.replace("/tools");
      });
    });
  });