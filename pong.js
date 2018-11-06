var PAGE_DATA = {};

function signUp() {
    var btn = document.getElementById("signUpBtn");
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
    var btn = document.getElementById("loginBtn");
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
function postGame(url = "", data = {}, method = "".toUpperCase()) {
    return fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Token ${PAGE_DATA.token}`
        },
        body: JSON.stringify(data)
    }).then(response => response.json());
}

function startingGame() {
    var playerOne = document.getElementById("playerOneId").value;
    var playerTwo = document.getElementById("playerTwoId").value;
    var startBtn = document.getElementById("startGameBtn");
    startBtn.addEventListener("click", function() {
        postGame(
            "https://bcca-pingpong.herokuapp.com/api/new-game/",
            {
                player_1: playerOne,
                player_2: playerTwo
            },
            "POST"
        )
            .then(data => {
                console.log(JSON.stringify(data));
                PAGE_DATA.game = data;
                console.log(PAGE_DATA);
                nameFinder();
            })
            .catch(error => console.error(error));
        document.getElementById("playerForms").hidden = true;
        document.getElementById("userList").hidden = true;
        document.getElementById("scoreArea").hidden = false;
    });
}

function seeUsers() {
    var btn = document.getElementById("userBtn");
    var users = document.getElementById("userList");
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
                btn.hidden = true;
            });
            console.log(PAGE_DATA);
        });
    });
}

function keepingScore() {
    var leftBtn = document.getElementById("leftScoreBtn");
    var rightBtn = document.getElementById("rightScoreBtn");
    var leftScore = document.getElementById("leftScore");
    var rightScore = document.getElementById("rightScore");
    leftBtn.addEventListener("click", function() {
        leftScoreValue = Number(leftScore.innerText) + 1;
        leftScore.innerText = leftScoreValue;
        PAGE_DATA.game.points.push(PAGE_DATA.game.player_1);
        weHaveAWinner();
    });
    rightBtn.addEventListener("click", function() {
        rightScoreValue = Number(rightScore.innerText) + 1;
        rightScore.innerText = rightScoreValue;
        PAGE_DATA.game.points.push(PAGE_DATA.game.player_2);
        weHaveAWinner();
    });
    endGame();
}

function endGame() {
    var finishBtn = document.getElementById("finishBtn");
    finishBtn.addEventListener("click", function() {
        document.getElementById("scoreArea").hidden = true;
        document.getElementById("userBtn").hidden = false;
        winnerWinnerChickenDinner();
        postGame(
            `https://bcca-pingpong.herokuapp.com/api/score-game/${
                PAGE_DATA.game.id
            }/`,
            { winner: PAGE_DATA.winner, loser: PAGE_DATA.loser },
            "PUT"
        ).then(data => {
            console.log(JSON.stringify(data));
        });
        document.getElementById("leftScore").innerText = "0";
        document.getElementById("rightScore").innerText = "0";
        weHaveAWinner();
    });
}

function winnerWinnerChickenDinner() {
    var playerOne = 0;
    var playerTwo = 0;
    var points = PAGE_DATA.game.points;
    for (var i = 0; i < points.length; ++i) {
        if (points[i] == PAGE_DATA.game.player_1) {
            playerOne++;
        } else {
            playerTwo++;
        }
    }
    if (playerOne > playerTwo) {
        PAGE_DATA.winner = PAGE_DATA.game.player_1;
        PAGE_DATA.loser = PAGE_DATA.game.player_2;
    } else {
        PAGE_DATA.winner = PAGE_DATA.game.player_2;
        PAGE_DATA.loser = PAGE_DATA.game.player_1;
    }
}

function weHaveAWinner() {
    var rightBtn = document.getElementById("rightScoreBtn");
    var leftBtn = document.getElementById("leftScoreBtn");
    var rightScore = Number(document.getElementById('rightScore').innerText)
    var leftScore = Number(document.getElementById('leftScore').innerText)
    if (rightScore === 10 || leftScore === 10) {
        rightBtn.disabled = true;
        leftBtn.disabled = true;
    } else {
        rightBtn.disabled = false;
        leftBtn.disabled = false;
    }
}

function nameFinder() {
    var playerOne = PAGE_DATA.game.player_1;
    var playerTwo = PAGE_DATA.game.player_2;
    var leftPlayer = document.getElementById("leftPlayer");
    var rightPlayer = document.getElementById("rightPlayer");
    PAGE_DATA.users.forEach(user => {
        if (user.id === playerOne) {
            leftPlayer.innerText = user.username;
        }
    });
    PAGE_DATA.users.forEach(user => {
        if (user.id === playerTwo) {
            rightPlayer.innerText = user.username;
        }
    });
}

window.location = "#login";

signUp();
login();
seeUsers();
startingGame();
keepingScore();
