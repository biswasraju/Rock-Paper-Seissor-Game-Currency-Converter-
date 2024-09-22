
let userScore = 0;
let compScore = 0;
let selection = document.querySelectorAll(".choice");
let msg = document.querySelector("#msg");


let genCompChoice = () => {
    let options = ["rock", "paper", "seissor"];
    let randomIdx= Math.floor(Math.random()*3);
    return options[randomIdx];
}

let drawGame = () => {
    console.log("game was draw");
    msg.innerHTML= "Game was draw. Please play again.";
    msg.style.backgroundColor = "#081b31";
}

let showWinner = (userWin, userChoice, compChoice) => {
    if(userWin) {
        console.log("User is winner");
        msg.innerHTML= `You won. Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
        userScore++;
        document.querySelector("#user-score").innerHTML = userScore;
    } else {
        console.log("User lost. Computer Win");
        msg.innerHTML = `You lost. ${compChoice} beats your ${userChoice}`;   
        msg.style.backgroundColor = "red";
        compScore++;
        document.querySelector("#comp-score").innerHTML = compScore;
    }
}

let playGame = (userChoice) => {
    console.log("User's choice is", userChoice);

    //Generate comp choice
    let compChoice = genCompChoice();
    console.log("Computer's choice is", compChoice);

    // Game Condition

    if(userChoice===compChoice) {
        return drawGame();
    } else {
        let userWin = true;
        if(userChoice==="rock") {
            //paper, seissor
            userWin = compChoice === "seissor" ? true : false;
        } else if (userChoice==="paper") {
            //rock, seissor
            userWin = compChoice === "rock" ? true : false;
        } else if (userChoice==="seissor") {
            //rock, paper
            userWin= compChoice=== "paper" ? true : false;
        }
        showWinner(userWin, userChoice, compChoice);
    }   
    
}

selection.forEach((choice) => {
    choice.addEventListener("click", () => {
        let userChoice= choice.getAttribute("id");
        playGame(userChoice);
    })
})


//Currency Converter

const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const currencyMsg = document.querySelector(".currency-msg");

for(let select of dropdowns) {
    for(let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if(select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}


let updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

let currencyBtn = document.querySelector("#currency-btn");

    const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal<1) {
        amtVal = 1;
        amount.value = "1";
    }

    //Updated URL Structure
    let URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response =  await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalAmount = amtVal * rate;
    currencyMsg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    console.log(currencyMsg.innerText);
    }

    currencyBtn.addEventListener("click", (evt) => {
        evt.preventDefault();
        updateExchangeRate();
    })

    window.addEventListener("load", () => {
        updateExchangeRate();
    })