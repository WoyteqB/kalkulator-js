const displayFirstLine = document.querySelector('.kalkulator__display-first-line');
const displaySecondLine = document.querySelector(".kalkulator__display-second-line");

const buttons = document.querySelectorAll(".kalkulator__panel-bth button");
//const actionButtons = document.querySelectorAll(".kalkulator__panel-bth button.action");

//displayFirstLine.innerHTML = ""
//console.log(numberButtons);

let firstNumber = 0;
let secondNumber = 0;
let tmpNumber = "";
let lastAction = "";
let action = "";

let setDisplayFirstLine = (value) => {
    displayFirstLine.innerHTML = value;
}
let setDisplaySecondLine = (value) => {
    displaySecondLine.innerHTML = value;
}

buttons.forEach( button => button.addEventListener("click", (e)=> buttonClick(e.target.innerHTML, e.target.className)));
const buttonClick = (value, className) => {
    
    if(className === "number"){
        if(value === "," && tmpNumber.includes(",")){
            console.log("Error - już jest jeden przecinek w liczbie");
        }else if(value === "0" && tmpNumber ==="0"){
            console.log("Error - jedno zero na przodzie wystarczy");
        }else{

            tmpNumber ==="0" && value!=="0" ? tmpNumber = value : tmpNumber = tmpNumber + value;
            setDisplaySecondLine(tmpNumber);
        }
    }else if(className === "action"){

        if(lastAction === ""){
            firstNumber = parseInt(tmpNumber);
            setDisplayFirstLine(tmpNumber+" "+value);
            setDisplaySecondLine(0);
            tmpNumber="0";
            lastAction = value;
        }else{
            switch(value){
                case "=":
                    setDisplayFirstLine(firstNumber +" "+ lastAction +" "+ tmpNumber +" =");
                    firstNumber = makeAction(firstNumber, parseInt(tmpNumber), lastAction);
                    setDisplaySecondLine(firstNumber);
                    tmpNumber = "0"
                    brake;
                default:                 
                    setDisplayFirstLine(firstNumber +" "+ lastAction +" "+ tmpNumber);
                    firstNumber = makeAction(firstNumber, parseInt(tmpNumber), lastAction);
                    setDisplaySecondLine(firstNumber);
            }
        }

        
        
    }
}

let makeAction = (value1, value2, action) => {
    switch(action){
        case "+":
            return value1 + value2;
            break;
        case "-":
            return value1 - value2;
            break;
        default:
            console.log("MakeAction - brak działania");

    }
}