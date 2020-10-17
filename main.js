let res = document.querySelector("#result");
let equals = document.querySelector("#calc-equ"), // Equal button
    theNum = "", // Current number
    oldNum = "", // First number
    resultNum = "0", // Result
    operator; // Batman

let holder = document.querySelector("#holder");

let clickables = document.querySelectorAll('.calc-button');

clickables.forEach((elem) => {
    elem.addEventListener("click", function clickButton(button) {
        let buttonValue = this.attributes.value.value,
            id = this.id,
            l = theNum.length,
            lth;

        function Animations() {     // button animations ( regular ones & for operator buttons)

            if(id !== "calc-opr") {
                elem.style.transition = "0.15s"
                elem.style.opacity = "0.5"
                setTimeout(function(){
                    elem.style.opacity = "1"
                },150)
                let i = 0;
                while(i < 4){
                    let oprStyle = document.querySelectorAll("#calc-opr")[i];
                    oprStyle.style = "";
                    ++i;
                }
            }else {
                elem.style.backgroundColor = "#909090";
                elem.style.color = "white";
            }
        }
        Animations();

        function Display() {

            if(buttonValue === "." && res.value.includes(".")) return;

            if (res.value == "") { // If a result was displayed, reset number
                theNum = buttonValue;
              }else if(l < 9) { // Otherwise, add digit to previous number (this is a string!)
                theNum += buttonValue;
              }
            
              res.value = theNum; // Display current number
        }
        if(id == "calc-num" || id == "calc-zero") Display();

        function Operator() {
            // When: Operator is clicked. Pass number to oldNum and save operator
            if(id == "calc-opr"){
                holder.value = res.value + " " + buttonValue + " ";
                oldNum = res.value;
                theNum = "";
                operator = buttonValue;
            }
        }
        Operator();

        function Calculate(oldNum) {

            switch (operator) {
                case "+":
                  res.value = +oldNum + +theNum;
                  break;
          
                case "-":
                  res.value = +oldNum - +theNum;
                  break;
          
                case "×":
                  res.value = +oldNum * +theNum;
                  break;
          
                case "÷":
                  res.value= +oldNum / +theNum;
                  break;
          
                  // If equal is pressed without an operator, keep number and continue
                default:
                  resultNum = theNum;
              }

            holder.value = res.value;
        }
        if(id == "calc-equ") Calculate(oldNum);

        let Sqrt = function() {
            if(buttonValue === "√") {
                res.value = Math.sqrt(res.value);
                holder.value = res.value;
                lth = Math.sqrt(res.value).toString().length;
                if(lth > 9) {
                    res.style.fontSize = "50px";
                    holder.style.fontSize = "25px";
                }
            }
        }
        Sqrt();

        let Clear = function() {
            if(buttonValue == "AC") {
                holder.value = res.value = "";  
                res.style.fontSize = "100px";
                holder.style.fontSize ="50px";
            }else if(buttonValue == "C") {
                res.value = res.value.slice(0, -1);
                theNum = theNum.slice(0, -1);
                }
        }
        Clear();

    });
})