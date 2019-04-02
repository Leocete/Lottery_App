import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import styled from 'styled-components';
import Headers from './components/headers'
import InputArea from './components/inputArea'
import UserResults from './components/userResults'

const LotteryPage = styled.section`
    width: 80%;
    border: 3px solid black;
    border-style : inset;
    margin-top: 50px;
    padding: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const ErrorMessage = styled.h1`
  padding: 30px;
  margin-top: 30px;
  color: #9e1e1e;
`


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      hasError: false
    }
  }

  onSubmit = (results) => {
    axios.post("http://localhost:8080/simulate/", results)
      .then( (response) => this.setState({results: response.data.results}))
      .catch( (error) => this.setState({results: error.response.data, hasError: true}));
  }

  //----------------------------------------------------------------------------------------
  /* onSubmit = async (results) => {
    try {
      const response = await axios.post("http://localhost:8080/simulate/", results)
      this.setState({results: response.data.results})
    } catch (error) {
      this.setState({results: error.response.data, hasError: true})
    }
  }*/
  //-----------------------------------------------------------------------------------------
  /* onSubmit = (results) => {
    fetch('http://localhost:8080/simulate/', {
      method: 'POST',
      body: JSON.stringify(results),
      headers: {'Content-Type': 'application/json'}
    })
      .then(res => res.json())
      .then( (response) => {
        this.setState({results: response.results})
      } )
      .catch( (error) => this.setState({results: error.data, hasError: true}) )
  } */
  //----------------------------------------------------------------------------------------
  /* onSubmit = async (results) => {
    try {
      const response = await fetch("http://localhost:8080/simulate/", {
        method: 'POST',
        body: JSON.stringify(results),
        headers: {"Content-Type": "application/json"}
      })
      .then(res => res.json())
      this.setState({results: response.results})
    } catch (error) {
      this.setState({results: error.data, hasError: true})
    }
  } */

  render() {    
    return (
        <LotteryPage>

          <Headers />
          <InputArea onSubmit={this.onSubmit} />
          {this.state.hasError ? <ErrorMessage>{this.state.results}</ErrorMessage> :
            this.state.results !== null && <UserResults resultsObject={this.state.results} />}
          
        </LotteryPage>
    );
  }
}

export default App;
