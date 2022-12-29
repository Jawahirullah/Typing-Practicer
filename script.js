var elMinute, elSecond, minutes = 0, seconds = 0, totalSeconds=0, totalNumbers = 144, focussedBox, focussedBoxNumber = 2, correctAnswers = 0, wrongAnswers = 0, pauseTime = true, gameEnd = false;
var gameHolder, resultHolder, lettersTypeChooser, selectedType, btnRestart;
const wrongBox = "box red", correctBox = "box green", blueBox = "box blue", selectedBox = "box selected";

totalNumbers = 50;
var letterTypes = {
    alphabets: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    numbers: "1234567890",
    symbols1: ",<.>/?,:\'\"[{]}",
    symbols2: "!@#$%^&*()-_=+"
};


window.onload = function () {
    gameHolder = document.getElementById("wrapper");
    resultHolder = document.getElementById("result-wrapper");
    elTimer = document.getElementById("timer");
    elMinute = document.getElementById("min");
    elSecond = document.getElementById("sec");
    lettersTypeChooser = document.getElementById("letters-type-chooser");
    btnRestart = document.getElementById("restart");
    chooseLetterType();

    addLetters();

    startCounting();
    addGameController();
    addDropdownListener();
    addRestartListener();
}


function addLetters() {
    let i = 0;

    let div, span;

    while (i++ < totalNumbers) {
        div = document.createElement("div");
        div.className = "box blue";
        if (i == 1) {
            div.className = "box selected";
            focussedBox = div;
        }

        span = document.createElement("span");
        span.textContent = selectedType.charAt((Math.random() * selectedType.length));

        div.appendChild(span);

        gameHolder.appendChild(div);
    }
}


function startCounting() {

    var tmp;

    window.setInterval(function () {

        if (pauseTime) {
            return;
        }

        seconds++;
        totalSeconds++;

        if (seconds == 60) {
            minutes++;
            elMinute.innerHTML = "0" + minutes.toString();
            seconds = 0;
        }

        if (seconds.toString().length == 1) {
            elSecond.innerHTML = "0" + seconds.toString();
        }
        else {
            elSecond.innerHTML = seconds.toString();
        }


    }
        , 1000);
}


function addGameController() {
    document.addEventListener("keydown", function (event) {
        event.preventDefault();

        if (gameEnd) {
            return;
        }

        console.log("key pressed");
        let typedKey = event.key;

        if (typedKey == "Shift" || typedKey == "Enter") {
            pauseTime = !pauseTime;
            return;
        }

        if (pauseTime == true) {
            pauseTime = false;
        }

        // if(checkIfBackSpace(typedKey))
        // {
        //     return;
        // }

        checkTypedKey(typedKey);
        focussedBoxNumber++;
        if (focussedBoxNumber - 1 > totalNumbers) {
            gameEnded();
            return;
        }
        focussedBox = document.querySelector("#wrapper .box:nth-child(" + focussedBoxNumber + ")");
        focussedBox.className = selectedBox;

    });
}


function checkIfBackSpace(key) {
    if (key == "Backspace") {
        if (focussedBoxNumber == 2) {
            return true;
        }
        focussedBox.className = blueBox;
        focussedBoxNumber--;
        focussedBox = document.querySelector("#wrapper .box:nth-child(" + focussedBoxNumber + ")");
        focussedBox.className = selectedBox;
        return true;
    }
    return false;
}

function checkTypedKey(typedValue) {
    let crctValue = focussedBox.querySelector("span").textContent;

    if (typedValue == crctValue) {
        focussedBox.className = correctBox;
        correctAnswers++;
    }
    else {
        focussedBox.className = wrongBox;
        wrongAnswers++;
    }
}

function gameEnded() {

    gameEnd = true;
    createResult();
    resetData();
    gameHolder.style.display = "none";
    resultHolder.style.display = "flex";
    lettersTypeChooser.style.display = "none";
    console.log("game end");

}

function createResult() {
    
    document.getElementById("cpm").textContent = Math.round((correctAnswers/totalSeconds)*60);
    document.getElementById("wrong-answers").textContent = wrongAnswers.toString();

    let accuracy = ((correctAnswers / totalNumbers) * 100);
    console.log(accuracy);
    document.getElementById("accuracy").textContent = accuracy.toFixed(1) + "%";

    let totalTime = minutes + "m" + " : " +seconds + "s";
    document.getElementById("time-taken").textContent = totalTime;
}

function resetData() {
    pauseTime = true;
    focussedBoxNumber = 2;
    totalSeconds = 0;
    minutes = 0;
    seconds = 0;
    correctAnswers = 0;
    wrongAnswers = 0;

    let boxes = document.querySelectorAll('.box');
        boxes.forEach(element => {
        element.remove();
    });

    elSecond.innerHTML = "00";
    elMinute.innerHTML = "00";

}

function addDropdownListener() {
    lettersTypeChooser.addEventListener("change", function () {
        if (selectedType == lettersTypeChooser.value)
        return;

        chooseLetterType();

        let boxes = document.querySelectorAll('.box');
        boxes.forEach(element => {
            element.remove();
        });

        resetData();
        addLetters();

    });
}

function chooseLetterType() {
    let value = lettersTypeChooser.value;

    if (value == "alphabets") {
        selectedType = letterTypes.alphabets;
    }
    else if (value == "numbers") {
        selectedType = letterTypes.numbers;
    }
    else if (value == "symbols1") {
        selectedType = letterTypes.symbols1;
    }
    else if (value == "symbols2") {
        selectedType = letterTypes.symbols2;
    }

}

function addRestartListener(){
    btnRestart.addEventListener("click", function(){
        addLetters();
        gameEnd = false;
        gameHolder.style.display = "flex";
        resultHolder.style.display = "none";
        lettersTypeChooser.style.display = "block";
    });
}

