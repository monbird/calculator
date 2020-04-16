import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

// main component of the app
class Calculator extends React.Component {
  constructor(props) {
    super(props);

    // define initial state
    this.state = {
      active: true,
      input: "0",
      output: "",
      decimalFlag: false,
      clearInputFlag: false,
      inputLimit: 20,
      numOfConsecutiveOperators: 0
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // attach event listener
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  // method executed following pressing keyboard buttons
  handleKeyPress(event) {
    event.preventDefault();
    this.handleClick(event.key);
  }

  // method executed following click events on Button components
  handleClick = (buttonName) => {
    // prevent button actions when digit limit exceeded
    if(!this.state.active) {
      return;
    }

    // setting local variables from State
    let input = this.state.input;
    let output = this.state.output;
    let decimalFlag = this.state.decimalFlag;
    let clearInputFlag = this.state.clearInputFlag;
    let numOfConsecutiveOperators = this.state.numOfConsecutiveOperators;
    let inputLimit = this.state.inputLimit;

    // helper function to reset the input and flags
    let clearInput = () => {
      input = "";
      output = "";
      numOfConsecutiveOperators = 0;
      decimalFlag = false;
      clearInputFlag = false;
    };

    // calculator logic
    if(buttonName === "AC" || buttonName === "Escape") {
      input = "0";
      output = "";
      decimalFlag = false;
      numOfConsecutiveOperators = 0;
    } else if(input.length < inputLimit) { // if input capacity has not been exceeded
        switch(buttonName){
          // handle digit inputs
          case "0":
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            if (clearInputFlag) { // clear input if "=" button has been pressed beforehand
              clearInput();
            }
            if (input !== "0") { // if input other than "0" append the input
              input += buttonName;
              numOfConsecutiveOperators = 0;
            } else { // else replace input with new input
              input = buttonName;
            }
            numOfConsecutiveOperators = 0;
            break;
          // handle operator inputs
          case "+":
          case "-":
          case "x":
          case "/":
            if(input.slice(-1) === "."){ // appends "0" when the input ends with ".", like . -> .0
              input += "0";
              numOfConsecutiveOperators = 0;
            }
            if(numOfConsecutiveOperators === 0) { // if no operator beforehand -> appends this operator
              output = "";
              input += buttonName;
              decimalFlag = false;
              numOfConsecutiveOperators++;
            } else if(buttonName === "-" && numOfConsecutiveOperators < 2) { // allow for "-" as a second operator (negative values)
              input = input + " " + buttonName;
              numOfConsecutiveOperators++;
            } else if(numOfConsecutiveOperators < 2) { // if the second operator is not "-" then replace the operator
                let slice = input.slice(0, input.length - 1);
                input = slice + buttonName;
            }
            clearInputFlag = false;
            break;
          // handle decimal inputs
          case ".":
            if (clearInputFlag) { // clear input if "=" button has been pressed beforehand
              clearInput();
            }

            if(!decimalFlag) { // ensures maximum one consecutive dot
              input += buttonName;
              decimalFlag = true;
            }
            break;
          // handle equals
          case "Enter":
          case "=":
            if(isNaN(input.slice(-1))) { // append zero when input does not end with a number (but operator or "." instead)
              input += '0';
            }
            output = input + '=';
            input = input.replace(/x/g, '*'); // replace 'x' for '*' as eval function does not recognise 'x's and throws an error
            input = String(Math.round(1000000000000 * eval(input)) / 1000000000000);
            decimalFlag = true;
            clearInputFlag = true;
            decimalFlag = false;
            numOfConsecutiveOperators = 0;
            break;
          default:
            break;
        }
    } else { // input capacity has been exceeded
        this.setState({
          input: "DIGIT LIMIT EXCEEDED",
          active: false
        })
        // display the message and block user from clicking for 2s
        setTimeout(() => this.setState({input: input, active: true}), 2000);
        return;
    }
    // set the new state
    this.setState({
      input: input,
      output: output,
      decimalFlag: decimalFlag,
      clearInputFlag: clearInputFlag,
      numOfConsecutiveOperators: numOfConsecutiveOperators
    });
  }

  // render child components
  render() {
    return (
      <div id="grid-container" className="calculator">
        <div id="displays">
          <Screen id="display1" display={this.state.output}/>
          <Screen id="display2" display={this.state.input}/>
        </div>
        <Button id="zero" name="0" handleClick={this.handleClick}/>
        <Button id="one" name="1" handleClick={this.handleClick}/>
        <Button id="two" name="2" handleClick={this.handleClick}/>
        <Button id="three" name="3" handleClick={this.handleClick}/>
        <Button id="four" name="4" handleClick={this.handleClick}/>
        <Button id="five" name="5" handleClick={this.handleClick}/>
        <Button id="six" name="6" handleClick={this.handleClick}/>
        <Button id="seven" name="7" handleClick={this.handleClick}/>
        <Button id="eight" name="8" handleClick={this.handleClick}/>
        <Button id="nine" name="9" handleClick={this.handleClick}/>
        <Button id="clear" name="AC" handleClick={this.handleClick}/>
        <Button id="equals" name="=" handleClick={this.handleClick}/>
        <Button id="decimal" name="." handleClick={this.handleClick}/>
        <Button id="add" name="+" handleClick={this.handleClick}/>
        <Button id="subtract" name="-" handleClick={this.handleClick}/>
        <Button id="multiply" name="x" handleClick={this.handleClick}/>
        <Button id="divide" name="/" handleClick={this.handleClick}/>
      </div>
    );
  };
}

// Screen component
class Screen extends React.Component {
  render() {
    return(
      <div id={this.props.id}>{this.props.display}</div>
    );
  }
}

// Button component
class Button extends React.Component {
  runParentHandleClick = () => {
    this.props.handleClick(this.props.name);
  }
  render() {
    return(
      <button id={this.props.id} onClick={this.runParentHandleClick}>{this.props.name}</button>
    );
  }
}

// render Calculator component in the prescribed node
ReactDOM.render(<Calculator />, document.getElementById('root'));
