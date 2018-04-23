import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { TestInterface } from './TestInterface';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import Countdown from 'react-countdown-now';
import { UserFormContainer } from './UserForm/UserFormContainer';
import { UserModal } from './UserForm/UserModal';

//import maritime_logo from './maritime_logo.png';
let timerStyle = {
  fontSize: "25px",
  fontWeight: "bold",
  color: "#0000A0"
}


let allAnswerMapping = {
}

console.log(allAnswerMapping)

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      testStarted: false,
      showModal: false,
      endTestClicked: false
    }

    this.updateAppState = this.updateAppState.bind(this);
    this.endTest = this.endTest.bind(this);
    this.closeModal = this.closeModal.bind(this)
  }


closeModal(){
  this.setState({
    showModal: false,
    testStarted: false,
    endTestClicked: false
  })
  console.log(allAnswerMapping)
}

updateAppState(testStartedState){
    this.setState({
      testStarted: testStartedState
    })
}

endTest(){
  this.setState({
    showModal: true,
    endTestClicked: true
  })
}

  render() {
    let endTestModal = <UserModal title="Results Submitted!"
                                   body="Thank you for your time. Your results have been submitted."
                                   showModal={this.state.showModal}
                                   onClickModal={this.closeModal}
                                   buttonText={"OK"}
                                   />

    let testPage = (
      <div>
        <Grid>
            <Row>
              <Col xsOffset={11}>
                  <div style={timerStyle}>
                    <Countdown date={Date.now() + 3900000}/>
                    <Button onClick={this.endTest}>End Test</Button>
                  </div>
                </Col>
              </Row>
          </Grid>
          {this.state.endTestClicked === false ? <TestInterface answerMapping={allAnswerMapping}/> : endTestModal}
      </div>
    )
    let componentToDisplay = this.state.testStarted === true  ? testPage : <UserFormContainer onSubmit={this.updateAppState}/>
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Pre-Interview Assessment</h1>
        </header>
        <br/>
          {componentToDisplay}
      </div>
    );
  }
}

export default App;
