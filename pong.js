var PAGE_DATA = {};

function signUp() {
    btn = document.getElementById("signUpBtn");
    btn.addEventListener("click", function() {
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
        window.location = "#login";
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
    btn.addEventListener("click", function() {
        username = document.getElementById("usernameLogin").value;
        password = document.getElementById("passwordLogin").value;
        postData("https://bcca-pingpong.herokuapp.com/api/login/", {
            username: username,
            password: password
        })
            .then(data => {
                console.log(JSON.stringify(data));
                PAGE_DATA.token = data.token;
            })
            .catch(error => console.error(error));
        window.location = "#profile";
    });
}

function seeData(url = "") {
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Token ${PAGE_DATA.token}`
        }
    }).then(response => response.json());
}
function startGame(url = "", data = {}) {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Token ${PAGE_DATA.token}`
        },
        body: JSON.stringify(data)
    }).then(response => response.json());
}

function startingGame() {
    playerOne = document.getElementById("playerOneId").value;
    playerTwo = document.getElementById("playerTwoId").value;
    startBtn = document.getElementById("startGameBtn");
    startBtn.addEventListener("click", function() {
        startGame("https://bcca-pingpong.herokuapp.com/api/new-game/", {
            player_1: playerOne,
            player_2: playerTwo
        })
            .then(data => {
                console.log(JSON.stringify(data));
                PAGE_DATA.game = data;
                console.log(PAGE_DATA);
            })
            .catch(error => console.error(error));
        document.getElementById("playerForms").hidden = true;
        document.getElementById("userList").hidden = true;
        document.getElementById("scoreArea").hidden = false;
    });
}

function seeUsers() {
    btn = document.getElementById("userBtn");
    users = document.getElementById("userList");
    btn.addEventListener("click", function() {
        seeData("https://bcca-pingpong.herokuapp.com/api/users/").then(data => {
            console.log(JSON.stringify(data));
            PAGE_DATA.users = data;
            PAGE_DATA.users.forEach(user => {
                document.getElementById("playerForms").hidden = false;
                users.hidden = false;
                users.innerText += `ID: ${user.id} \n\tUser: ${
                    user.username
                }\n\n`;
                btn.style.display = "none";
            });
            console.log(PAGE_DATA);
        });
    });
}

function keepingScore() {
  leftBtn = document.getElementById('leftScoreBtn');
  rightBtn = document.getElementById('rightScoreBtn');
  leftBtn.addEventListener('click', function () {
    leftScore = Number(leftBtn.innerText) + 1;
    leftBtn.innerText = leftScore;
    PAGE_DATA.game.points.push(PAGE_DATA.game.player_1)
  });
  rightBtn.addEventListener('click', function() {
    rightScore = Number(rightBtn.innerText) + 1;
    rightBtn.innerText = rightScore;
    PAGE_DATA.game.points.push(PAGE_DATA.game.player_2)
  })
}

window.location = '#login'

signUp();
login();
seeUsers();
startingGame();
keepingScore();
