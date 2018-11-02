function signUp() {
  btn = document.getElementById("signUpBtn");
  btn.addEventListener("click", function() {
    username = document.getElementById("usernameSignUp").value;
    password = document.getElementById("passwordSignup").value;
    postData("https://bcca-pingpong.herokuapp.com/api/register/", {
      name: username,
      pass: password
    })
      .then(data => console.log(JSON.stringify(data)))
      .catch(error => console.error(error));
  });
}

function postData(url = "", data = {}) {
  return fetch(url, {
    method: "Post",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(data)
  }).then(response => response.json());
}

signUp()
