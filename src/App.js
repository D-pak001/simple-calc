import React, { Component } from 'react'
import update from 'immutability-helper'
import math from 'mathjs'
import './App.css'
import Button from './component/Button/button'
import ShowResult from './component/Screen/screen';

class App extends Component {
  constructor() {
    super()
    this.state = { userInput: [] }
  }

  calculate = () => {
    let userInput = this.state.userInput;
    if (userInput.length) {
      let flag = 0;
      let j;
      for (let i = 0; i < userInput.length; i++) {
        if (isNaN(userInput[i])) {
          if (j === (i - 1) || i === 0) {
            flag = 1;
            break;
          }
          j = i;
        }
      }
      if (flag) {
        this.setState({ userInput:['Input format error'] })
      }
      else {
        userInput = userInput.join('');
        let result = math.eval(userInput);
        result = math.format(result, { precision: 12 });
        this.setState({
          userInput: [result],
        });
      }
    }
  }

  handleClick = e => {
    const value = e.target.getAttribute('value')
    switch (value) {
      case 'clear':
        this.setState({
          userInput: [],
        })
        break
      case 'equal':
        this.calculate()
        break
      case 'sqrt':
        let result = this.state.userInput.join('');
        if (result) {
          result = math.sqrt(result);
          result = math.format(result, { precision: 12 });
          this.setState({ userInput: [result] });
        }
        break
      case 'back':
        const onBackSpace = this.state.userInput;
        onBackSpace.pop();
        this.setState({
          userInput: onBackSpace,
        });
        break;
      default:
        const newInput = update(this.state.userInput, {
          $push: [value],
        })
        this.setState({
          userInput: newInput,
        })
        break
    }
  }


  render() {
    return (
      <div className="App">

        <ShowResult data={this.state.userInput} />
        <div className='buttons'>
          <Button onClick={this.handleClick} label="C" value="clear" />
          <Button onClick={this.handleClick} label="7" value="7" />
          <Button onClick={this.handleClick} label="4" value="4" />
          <Button onClick={this.handleClick} label="1" value="1" />
          <Button onClick={this.handleClick} label="0" value="0" />

          <Button onClick={this.handleClick} label={<i class="fas fa-square-root-alt"></i>} value="sqrt" />
          <Button onClick={this.handleClick} label="8" value="8" />
          <Button onClick={this.handleClick} label="5" value="5" />
          <Button onClick={this.handleClick} label="2" value="2" />
          <Button onClick={this.handleClick} label="." value="." />
          <Button onClick={this.handleClick} label="/" value="/" />

          <Button onClick={this.handleClick} label="9" value="9" />
          <Button onClick={this.handleClick} label="6" value="6" />
          <Button onClick={this.handleClick} label="3" value="3" />
          <Button onClick={this.handleClick} label={<i class="fas fa-backspace"></i>} value="back" />
          <Button onClick={this.handleClick} label="x" value="*" />

          <Button onClick={this.handleClick} label="-" value="-" />
          <Button onClick={this.handleClick} label="+" value="+" />
          <Button onClick={this.handleClick} label="=" value="equal" />
        </div>
      </div>
    )
  }
}

export default App;