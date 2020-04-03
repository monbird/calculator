import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentExpression: "0",
      operatorFlag: false,
      decimalFlag: false,
      inputLimit: 20
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (buttonName) => {
    let currentExpression = this.state.currentExpression;
    let operatorFlag = this.state.operatorFlag;
    let decimalFlag = this.state.decimalFlag;

    switch(buttonName){
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
        if (this.state.currentExpression !== "0"){
          currentExpression += buttonName;
          operatorFlag = false;
        } else{
          currentExpression = buttonName;
        }
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        if(!this.state.operatorFlag){
          currentExpression += buttonName;
          operatorFlag = true;
          decimalFlag = false;
        } else{
          let slice = currentExpression.slice(0, currentExpression.length - 1);
          currentExpression = slice + buttonName;
        }
        break;
      case ".":
        if(!this.state.decimalFlag){
          currentExpression += buttonName;
          decimalFlag = true;
        }
        break;
      case "AC":
        currentExpression = "0";
        operatorFlag = false;
        decimalFlag = false;
        break;
      case "=":
        currentExpression = Math.round(1000000000000 * eval(currentExpression)) / 1000000000000;
        operatorFlag = false;
        decimalFlag = true;
        break;
    }
    
    this.setState({
      currentExpression: currentExpression,
      operatorFlag: operatorFlag,
      decimalFlag: decimalFlag
    })
  }

  render() {
    return (
      <div>
        <div id="grid-container">
        <Screen id="display" currentExpression={this.state.currentExpression} />
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
        <Button id="multiply" name="*" handleClick={this.handleClick}/>
        <Button id="divide" name="/" handleClick={this.handleClick}/>
        </div>
      </div>
    );
  };
}

class Screen extends React.Component {
  render(){
    return(
      <div id={this.props.id}>{this.props.currentExpression}</div>
    );
  }
}

class Button extends React.Component {
  runParentHandleClick = () => {
    this.props.handleClick(this.props.name)
  }
  render() {
    return(
      <button id={this.props.id} onClick={this.runParentHandleClick}>{this.props.name}</button>
    );
  }
}


ReactDOM.render(<Calculator />, document.getElementById('root'));
