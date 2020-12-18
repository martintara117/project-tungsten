$(document).ready(function () {
  $("#edit-profile").on("submit", function (e) {
    e.preventDefault();
    const id = $(this).data("id");
    const email = $("#email").val();
    // const password = $("#password").val();
    const firstName = $("#firstName").val();
    const lastName = $("#lastName").val();
    const cityName = $("#cityName").val().trim();
    const tools = $("#tools").val();
    $.ajax({
      method: "PUT",
      url: "/api/profiles/${id}",
      data: {
        email,
        firstName,
        lastName,
        cityName,
        tools,
      },

      
    }).then((response) => {
      window.location.replace("/profiles");


    });
  });
});
