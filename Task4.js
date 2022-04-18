//Storing information
class Calculator {
    constructor(previousOpTextEl, currentOpTextEl) {
      this.previousOpTextEl = previousOpTextEl;
      this.currentOpTextEl = currentOpTextEl;
      this.reset = false;
      this.clear();
    }
    
    clear(){
      this.currentOperand = "";
      this.previousOperand = "";    
      this.operation = undefined
    }
   
    delete(){
      this.currentOperand = this.currentOperand.toString().slice(0 ,-1);
    }
    appendNumber(number){
      if (number === "." &&(this.currentOperand.includes("."))) return;
      this.currentOperand = this.currentOperand.toString() + number.toString();    
    }
    chooseOperation(operation){
      if(this.currentOperand === "") return;
      if(this.previousOperand !== "") {
        this.compute();
      }
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand="";      
    }
    compute(){
      let computedResult;
      const prev = parseFloat(this.previousOperand);
      const current = parseFloat(this.currentOperand);
      if(isNaN(prev) || isNaN(current)) return;
      switch(this.operation) {
        case '+':
          computedResult = prev + current ;
          break;
        case '-':
          computedResult = prev - current;
          break;
        case '*':
          computedResult = prev * current;
          break;
        case '÷':
          computedResult = prev / current;
          break;
        default:
          return;        
      }
      this.reset = true;
      this.currentOperand = computedResult;
      this.operation = undefined;
      this.previousOperand = "";
    }
  
    
    getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay;
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
  
    updateDisplay(){
      this.currentOpTextEl.innerText = this.getDisplayNumber(this.currentOperand);
      if(this.operation != null) {
        this.previousOpTextEl.innerText = 
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
      } else {
        this.previousOpTextEl.innerText = ""
      } 
    }
  }

  const numberBtns = document.querySelectorAll("[data-number]");
  const operationBtns = document.querySelectorAll("[data-operation]");
  const equalsBtn = document.querySelector("[data-equals]");
  const clearBtn = document.querySelector("[data-clear]");
  const deleteBtn = document.querySelector("[data-delete]");
  const previousOpTextEl = document.querySelector("[data-previous-operand]");
  const currentOpTextEl = document.querySelector("[data-current-operand]");
  
  const calculator = new Calculator(previousOpTextEl, currentOpTextEl);
  numberBtns.forEach(button => {
    button.addEventListener("click" ,()=> {
      if(calculator.previousOperand === "" && calculator.currentOperand !=="" &&calculator.reset){
        calculator.currentOperand = "";
        calculator.reset = false;
      }
      calculator.appendNumber(button.innerText);
      calculator.updateDisplay();
    })
  })
  operationBtns.forEach(button => {
    button.addEventListener("click", () => {
      calculator.chooseOperation(button.innerText);
      calculator.updateDisplay();
    })
  })
  
  equalsBtn.addEventListener("click", button => {
    calculator.compute();
    calculator.updateDisplay();
  })
  
  clearBtn.addEventListener("click", button => {
    calculator.clear();
    calculator.updateDisplay();
  })
  
  deleteBtn.addEventListener("click", button => {
    calculator.delete();
    calculator.updateDisplay();
  })