import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { TestInterface } from './TestInterface';
import { Grid, Row, Col } from 'react-bootstrap';
import Countdown from 'react-countdown-now';
import { UserFormContainer } from './UserForm/UserFormContainer';

//import maritime_logo from './maritime_logo.png';
let timerStyle = {
  fontSize: "25px",
  fontWeight: "bold",
  color: "#0000A0"
}

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      formCompleted: false
    }

    this.updateAppState = this.updateAppState.bind(this);
  }


updateAppState(formCompletedState){
    this.setState({
      formCompleted: formCompletedState
    })
}

  render() {
    let testPage = (
      <div>
        <Grid>
            <Row>
              <Col xsOffset={11}>
                  <div style={timerStyle}>
                    <Countdown date={Date.now() + 3900000}/>
                  </div>
                </Col>
              </Row>
          </Grid>
          <TestInterface/>
      </div>
    )
    let componentToDisplay = this.state.formCompleted === true ? testPage : <UserFormContainer onSubmit={this.updateAppState}/>
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Pre-Interview Assessment</h1>
        </header>
        <br/>
        {componentToDisplay}
        {/* <Grid>
          <Row>
            <Col xsOffset={11}>
                <div style={timerStyle}>
                  <Countdown date={Date.now() + 3900000}/>
                </div>
              </Col>
            </Row>
        </Grid>
          <UserFormContainer/>
          <TestInterface/> */}
      </div>
    );
  }
}

export default App;
