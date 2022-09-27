const displayFirstLine = document.querySelector('.kalkulator__display-first-line');
const displaySecondLine = document.querySelector(".kalkulator__display-second-line");

const buttons = document.querySelectorAll(".kalkulator__panel-bth button");
//const actionButtons = document.querySelectorAll(".kalkulator__panel-bth button.action");

//displayFirstLine.innerHTML = ""
//console.log(numberButtons);

buttons.forEach( button => button.addEventListener("click", (e)=> buttonClick(e.target.innerHTML, e.target.className)));
const buttonClick = (value, className) => {
    
    if(className === "number"){
        displayFirstLine.innerHTML = value;
    }else if(className === "action"){
        displaySecondLine.innerHTML = value;
    }
}