import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { TestInterface } from './TestInterface';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import Countdown from 'react-countdown-now';
import { UserFormContainer } from './UserForm/Components/UserFormComponent';
import { UserModal } from './UserForm/Components/UserModal';
import fetch from 'isomorphic-fetch';
import { AdminComponent } from './AdminConsole/Components/AdminComponent';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
    this.handleTimerComplete = this.handleTimerComplete.bind(this);
    // this.authenticateUser = this.authenticateUser.bind(this);
    this.showTestPage = this.showTestPage.bind(this);
    this.endTestModal = this.endTestModal.bind(this);
    this.componentToDisplay = this.componentToDisplay.bind(this)
  }


closeModal(){
  this.setState({
    showModal: false,
    testStarted: false,
    endTestClicked: false
  })
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
  console.log(allAnswerMapping)
  fetch('http://127.0.0.1:5000/api/postResults', {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(allAnswerMapping)
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log)
}

handleTimerComplete(){
  this.endTest();
}

showTestPage(){
  return(
    <div>
          <Grid>
              <Row>
                <Col md={4} xsOffset={5}>
                    <div style={timerStyle}>
                        {/* <Countdown date={Date.now() + 100000} onComplete={this.handleTimerComplete}/> */}
                        <Countdown date={Date.now() + 3900000} onComplete={this.handleTimerComplete}/>
                    </div>
                </Col>
                <Col md={2}>
                  <Button onClick={this.endTest} className="pull-right" bsStyle="danger">End Test</Button>
                </Col>
                </Row>
            </Grid>
            {this.state.endTestClicked === false ? <TestInterface answerMapping={allAnswerMapping}/> : this.endTestModal()}
      </div>
  )
}

endTestModal() {
  return (
    <UserModal title="Results Submitted!"
                                   body="Thank you for your time. Your results have been submitted."
                                   showModal={this.state.showModal}
                                   onClickModal={this.closeModal}
                                   buttonText={"OK"}
                                   />
  )
}

componentToDisplay() {
  return this.state.testStarted === true  ? this.showTestPage() : <UserFormContainer onSubmit={this.updateAppState}/>
}
  render() {
    // let endTestModal = <UserModal title="Results Submitted!"
    //                                body="Thank you for your time. Your results have been submitted."
    //                                showModal={this.state.showModal}
    //                                onClickModal={this.closeModal}
    //                                buttonText={"OK"}
    //                                />

    // let testPage = (
    //   <div>
    //     <Grid>
    //         <Row>
    //           <Col md={4} xsOffset={5}>
    //               <div style={timerStyle}>
    //                   <Countdown date={Date.now() + 100000} onComplete={this.handleTimerComplete}/>
    //                   {/* <Countdown date={Date.now() + 3900000} onComplete={this.handleTimerComplete}/> */}
    //               </div>
    //           </Col>
    //           <Col md={2}>
    //             <Button onClick={this.endTest} className="pull-right" bsStyle="danger">End Test</Button>
    //           </Col>
    //           </Row>
    //       </Grid>
    //       {this.state.endTestClicked === false ? <TestInterface answerMapping={allAnswerMapping}/> : endTestModal}
    //   </div>
    // )
    //let componentToDisplay = this.state.testStarted === true  ? this.showTestPage() : <UserFormContainer onSubmit={this.updateAppState}/>
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Pre-Interview Assessment</h1>
          </header>
          <br/>
          <Switch>
            <Route exact path="/" component={this.componentToDisplay}/>
            <Route path="/admin" component={AdminComponent}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
