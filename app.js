const displayFirstLine = document.querySelector('.kalkulator__display-first-line');
const displaySecondLine = document.querySelector(".kalkulator__display-second-line");

const buttons = document.querySelectorAll(".kalkulator__panel-bth button");
//const actionButtons = document.querySelectorAll(".kalkulator__panel-bth button.action");

//displayFirstLine.innerHTML = ""
//console.log(numberButtons);

let firstNumber = 0;
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
    if(className.includes("number")){
        
        if(lastAction === "="){
            setDisplayFirstLine("");
            lastAction = "";
            firstNumber = 0;
            tmpNumber=""
            console.log("liczba po =");
        }

        if(value === "," && tmpNumber.includes(".")){
            console.log("Error - już jest jeden przecinek w liczbie");
        }else if(value === "0" && tmpNumber ==="0"){
            console.log("Error - jedno zero na przodzie wystarczy");
        }else if( value === "DEL"){
            if(tmpNumber !== "0"){
                tmpNumber.length === 1 ? tmpNumber = "0" : tmpNumber = tmpNumber.slice(0,tmpNumber.length-1);
                setDisplaySecondLine(tmpNumber);
            }
        }else if( value === "CE"){
            tmpNumber = "0";
            setDisplaySecondLine(tmpNumber);
        }else if( value === "+/-"){
            tmpNumber = (parseInt(tmpNumber) * -1).toString();
            setDisplaySecondLine(tmpNumber);
        }else if( value === ","){
            tmpNumber = tmpNumber + ".";
            setDisplaySecondLine(tmpNumber);
        }else{
            tmpNumber ==="0" && value!=="0" ? tmpNumber = value : tmpNumber = tmpNumber + value;
            setDisplaySecondLine(tmpNumber);
        }
    }else if(className.includes("action")){
        console.log("Akcja (L1:"+firstNumber+", L2: "+tmpNumber+", Last action: "+lastAction+", Action: "+ value +")")
        if(value == "C"){
            console.log("action C");
            setDisplayFirstLine("");
            setDisplaySecondLine(0);
            tmpNumber="0";
            firstNumber = 0;
            lastAction = "";
            action=""
        }else if( value === "√"){
            if(lastAction === ""){
                setDisplayFirstLine("√("+tmpNumber+")");
                tmpNumber = Math.sqrt(parseInt(tmpNumber));
                setDisplaySecondLine(tmpNumber);
            }else{
                setDisplayFirstLine(firstNumber +" "+lastAction+" √("+tmpNumber+")");
                tmpNumber = Math.sqrt(parseInt(tmpNumber));
                setDisplaySecondLine(tmpNumber);
            }

        }else if( value === "x<sup>2</sup>"){
            if(lastAction === ""){
                setDisplayFirstLine("sqr("+tmpNumber+")");
                tmpNumber = Math.pow(parseInt(tmpNumber),2);
                setDisplaySecondLine(tmpNumber);
            }else{
                setDisplayFirstLine(firstNumber +" "+lastAction+" "+tmpNumber+"<sup>2</sup>");
                tmpNumber = Math.pow(parseInt(tmpNumber),2);
                setDisplaySecondLine(tmpNumber);
            }
        }else if( value === "<sup>1</sup>/<sub>x</sub>"){
            if(lastAction === ""){
                setDisplayFirstLine("1/"+tmpNumber+")");
                tmpNumber = 1/parseInt(tmpNumber);
                setDisplaySecondLine(tmpNumber);
            }else{
                setDisplayFirstLine(firstNumber +" "+lastAction+" 1/"+tmpNumber);
                tmpNumber = 1/parseInt(tmpNumber);
                setDisplaySecondLine(tmpNumber);
            }
        }else if(lastAction === ""){
            console.log("last action empty");
            firstNumber = parseInt(tmpNumber);
            setDisplayFirstLine(tmpNumber+" "+value);
            setDisplaySecondLine(0);
            tmpNumber="0";
            lastAction = value;
        }else if(lastAction === "="){
            console.log("last action =");
            setDisplayFirstLine(firstNumber+" "+value);
            setDisplaySecondLine(0);
            tmpNumber="0";
            lastAction = value;
        }else{
            switch(value){
                case "=":
                    console.log("action =");
                    setDisplayFirstLine(firstNumber +" "+ lastAction +" "+ tmpNumber +" =");
                    firstNumber = makeAction(firstNumber, parseInt(tmpNumber), lastAction);
                    setDisplaySecondLine(firstNumber);
                    lastAction="=";
                    break;
                default: 
                    console.log("action def "+ value);
                    if(tmpNumber === 0 && lastAction === "/"){
                        setDisplayFirstLine("");
                        setDisplaySecondLine("Nie można dzielic przez 0");
                        firstNumber=0;
                        lastAction="";
                        
                    }else{     
                        firstNumber = makeAction(firstNumber, parseInt(tmpNumber), lastAction);
                        setDisplayFirstLine(firstNumber +" "+ value);
                        setDisplaySecondLine("0");
                        tmpNumber = "0"
                        lastAction = value;
                    }
                    break;    
                    
            }
        }

        
        
    }
}

let makeAction = (value1, value2, action) => {
    switch(action){
        case "+":
            return value1+value2;
            break;
        case "-":
            return value1 - value2;
            break;
        case "x":
            return value1 * value2;
            break;
        case "/":
            return value1 / value2;
            break;
        default:
            console.log("MakeAction - brak działania");

    }
}