var fetching = fetch("https://bcca-pingpong.herokuapp.com/api/register/");

function signUp() {
  var submitBtn = document.querySelector("#signUpBtn");
    submitBtn.addEventListener("click", function() {
        fetching
    })
}
