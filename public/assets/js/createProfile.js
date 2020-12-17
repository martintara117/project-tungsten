$(document).ready(function () {
  console.log("My new profile form will go here.");



  $("#createForm").on("submit", function (e) {
    e.preventDefault();
    const email = $("#email").val();
    // const password = $("#password").val();
    const firstName = $("#first-name").val();
    const lastName = $("#last-name").val();
    const cityName = $("#cityName").val().trim();
    const tools = $("#tools").val();

    console.log(email);
    console.log(cityName);
    console.log(firstName);
    console.log(lastName);
    console.log(tools);

    

    $.ajax({
      method: "POST",
      url: "/api/profiles",
      data: {
        email,
        cityName,
        firstName,
        lastName,
        tools
      },
    }).then((response) => {
      window.location.replace("/profiles");
    });
  });
});
