import React from 'react';
import { AdminLoginContainer } from '../Containers/AdminLoginContainer';
import { UserInfoContainer } from '../Containers/UserInfoContainer';
import { Tabs, Tab } from 'react-bootstrap';
// import { ScheduleUsersContainer } from '../Containers/ScheduleUsersContainer';
import { TestResultsContainer } from '../Containers/TestResultsContainer';

export class AdminComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            authenticated: false
        }

        this.updateAuthenticationState = this.updateAuthenticationState.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
        this.scheduleTest = this.scheduleTest.bind(this);
    }

    updateAuthenticationState(value) {
        this.setState({
            authenticated: value
        })
    }

    handleDeleteUser(userID){
        // console.log(userID)
        console.log("Will delete: " + userID)
    }

    scheduleTest(userID){
        console.log("Test to schedule for: " + userID)
    }

    render(){
      let adminBody = (
            <Tabs defaultActiveKey={0} id="tab-body">
                <Tab key={0} eventKey={0} title={"User List"}>
                    <UserInfoContainer handleDeleteUser={this.handleDeleteUser}/>
                </Tab>
                <Tab key={2} eventKey={2} title={"Results"}>
                   <TestResultsContainer/>
                </Tab>
            </Tabs>
        )
       return this.state.authenticated === false ? <AdminLoginContainer handleAuth={this.updateAuthenticationState} authState={this.state.authenticated}/> :
                                                    adminBody    
   }
}