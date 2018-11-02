var PAGE_DATA = {};

function signUp() {
  btn = document.getElementById("signUpBtn");
  btn.addEventListener("submit", function() {
    username = document.getElementById("usernameSignUp").value;
    password = document.getElementById("passwordSignup").value;
    repeat = document.getElementById("passwordRepeatSignUp").value;
    postData("https://bcca-pingpong.herokuapp.com/api/register/", {
      username: username,
      password: password,
      password_repeat: repeat
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

function login() {
  btn = document.getElementById("loginBtn");
  btn.addEventListener("submit", function() {
    username = document.getElementById("usernameLogin").value;
    password = document.getElementById("passwordLogin").value;
    postData("https://bcca-pingpong.herokuapp.com/api/login/", {
      username: username,
      password: password
    })
      .then(data => {
        console.log(JSON.stringify(data));
        PAGE_DATA.token = token;
      })
      .catch(error => console.error(error));
  });
}

function seeData(url = "") {
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": `${PAGE_DATA.token}`
    },
  }).then(response => response.json());
}

function seeUsers() {
  btn = document.getElementById('userBtn');
  users = document.getElementById('userList')
  btn.addEventListener('click', function() {
    seeData("https://bcca-pingpong.herokuapp.com/api/users/")
  .then(data => {
    console.log(JSON.stringify(data));
    data.forEach(user => {
      users.innerText += `${user.username}\n`
    });
  })
  })
}

signUp();
login();
seeUsers();
