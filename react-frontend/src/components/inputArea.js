import React from 'react';
import styled from 'styled-components';
import TextValidator from './textValidator'
import { ValidatorForm } from 'react-form-validator-core';
import './inputArea.css';

const InputWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`
const Label = styled.label`
    display: block;
    text-align: center;
`

const Button = styled.button`
    border: 1px solid #23723c;
    color: #fdfdfd !important;
    letter-spacing: 3px;
    background: rgb(11, 56, 33);
    font-weight: 700;
    margin-top: 30px;
    padding: 20px;
    text-transform: uppercase;
    border-radius: 6px;
    display: inline-block;
    width: 200px;

    &: hover {
    cursor: pointer;
    background: rgb(47, 110, 78);
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    transition: all 0.3s ease 0s;
    }
`
const NumberWrapper = styled.div`
    position: relative;
`
const ValueArray = [];
let inputArr = ["user_number_1", "user_number_2", "user_number_3", "user_number_4", "user_number_5", "user_number_6"];

// Validation rule - checks if all input numbers are different
ValidatorForm.addValidationRule('isInputNotEqual', (value) => {
  let filterNum = ValueArray.filter(item => item === value).length;  
  if (filterNum >= 2) {
    return false;
  }
  return true;

});

export default class InputArea extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      draw_number: '',
      user_number_1: '',
      user_number_2: '',
      user_number_3: '',
      user_number_4: '',
      user_number_5: '',
      user_number_6: '',
    }


  }

  submitHandler = () => {
    let { draw_number, ...rest } = this.state;
    let request = {
      numbers: Object.keys(rest).map(key => parseInt(rest[key])),
      draws: parseInt(draw_number)
    };
    this.props.onSubmit(request);
  }

  inputHandler = event => {
    let indexField = inputArr.indexOf(event.target.name);
    this.setState({[event.target.name]: event.target.value});
    ValueArray.splice(indexField, 1, event.target.value);
  };

  render() {
      return (
        <ValidatorForm ref="form" onSubmit={this.submitHandler} className="validator-form">
          <InputWrapper>

            {Object.entries(this.state).map(([key, value]) => {
              if (key.includes("user_number")) {
                return (
                  <NumberWrapper key={key}>
                    <Label>Number {key.replace(/\D*/, '')}</Label>
                    <TextValidator
                      name={key} 
                      type="number" 
                      maxLength="2" 
                      value={value} 
                      onChange={this.inputHandler} 
                      validators={['required', 'minNumber:1', 'maxNumber:52', 'isInputNotEqual']}
                      errorMessages={['This field is required', 'The number can not be negative or null', 'Please, write numbers from 1 to 52 only', 'All lottery numbers should be different']} 
                    />
                    <span className="focus-border">
                        <i></i>
                    </span>
                  </NumberWrapper>
                )
              }
            })}
            <NumberWrapper>
              <Label>Number of draws:</Label>
              <TextValidator 
                name="draw_number" 
                type="number" 
                value={this.state.draw_number} 
                onChange={this.inputHandler} 
                className="draw-number" 
                validators={['required', 'minNumber:1', 'maxNumber:99999']}
                errorMessages={['This field is required', 'Number of draws can not be negative or null', 'You can play not more than 99.999 draws']}
              />
              <span className="focus-border">
                <i></i>
              </span>
            </NumberWrapper>
            
          </InputWrapper>
          <Button type="submit">Let's win!</Button>
        </ValidatorForm>
      )
  }
}
